import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=${error}`);
  }

  if (code) {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll() { return cookieStore.getAll(); },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
              });
            } catch (e) {
              // ignorar errores de cookies en middleware
            }
          },
        },
      }
    );

    const { data: sessionData, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
      console.error("Error exchanging code:", exchangeError);
      return NextResponse.redirect(`${origin}/login?error=auth`);
    }

    if (sessionData?.user) {
      try {
        const { data: perfil } = await supabase
          .from("perfiles")
          .select("id")
          .eq("id", sessionData.user.id)
          .single();

        if (perfil) {
          return NextResponse.redirect(`${origin}/feed`);
        } else {
          return NextResponse.redirect(`${origin}/onboarding`);
        }
      } catch (e) {
        // Si falla la consulta del perfil, mandamos al onboarding
        return NextResponse.redirect(`${origin}/onboarding`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}