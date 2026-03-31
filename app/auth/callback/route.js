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
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          },
        },
      }
    );

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (!exchangeError) {
      // Verificar si el usuario ya tiene perfil
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: perfil } = await supabase
          .from("perfiles")
          .select("id")
          .eq("id", user.id)
          .single();

        // Si ya tiene perfil → feed, si no → onboarding
        if (perfil) {
          return NextResponse.redirect(`${origin}/feed`);
        } else {
          return NextResponse.redirect(`${origin}/onboarding`);
        }
      }
    }
  }

  return NextResponse.redirect(`${origin}/login`);
}