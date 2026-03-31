import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { email, nombre } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "GoFlatt <onboarding@resend.dev>",
      to: process.env.NODE_ENV === "development" ? "infobeatsmora@gmail.com" : email,
      subject: "¡Bienvenido/a a GoFlatt! 🏠",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
        </head>
        <body style="margin:0;padding:0;background:#f8f9ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <div style="max-width:560px;margin:0 auto;padding:40px 16px;">
            
           <div style="font-size:24px;font-weight:800;color:#1e3a4a;letter-spacing:-1px;">goflatt</div>
            <div style="background:white;border-radius:24px;padding:40px;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
              
              <div style="text-align:center;margin-bottom:28px;">
                <div style="font-size:48px;margin-bottom:16px;">👋</div>
                <h1 style="font-size:24px;font-weight:800;color:#1e3a4a;margin:0 0 8px;letter-spacing:-0.5px;">
                  ¡Hola, ${nombre}!
                </h1>
                <p style="color:#999;font-size:15px;margin:0;line-height:1.5;">
                  Bienvenido/a a GoFlatt. Ya eres parte de la comunidad.
                </p>
              </div>

              <div style="background:#f8f9ff;border-radius:16px;padding:24px;margin-bottom:28px;">
                <p style="font-size:14px;color:#555;line-height:1.7;margin:0;">
                  GoFlatt es la plataforma donde estudiantes de intercambio encuentran 
                  a sus compañeros de piso ideales <strong>antes de llegar a su destino</strong>. 
                  Sin caos, sin grupos de WhatsApp eternos.
                </p>
              </div>

              <div style="margin-bottom:28px;">
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                  <div style="width:36px;height:36px;background:#fff5f0;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🔍</div>
                  <p style="margin:0;font-size:14px;color:#555;">Explora grupos disponibles en tu ciudad de destino</p>
                </div>
                <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px;">
                  <div style="width:36px;height:36px;background:#f0f9fa;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🤝</div>
                  <p style="margin:0;font-size:14px;color:#555;">Conecta con estudiantes compatibles contigo</p>
                </div>
                <div style="display:flex;align-items:center;gap:12px;">
                  <div style="width:36px;height:36px;background:#f8f9ff;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;">🏠</div>
                  <p style="margin:0;font-size:14px;color:#555;">Forma tu grupo antes de reservar el piso</p>
                </div>
              </div>

              <div style="text-align:center;">
                <a href="https://goflatt.com/feed" style="display:inline-block;background:linear-gradient(135deg,#e8845a,#d46b3f);color:white;font-weight:700;font-size:15px;padding:16px 36px;border-radius:100px;text-decoration:none;box-shadow:0 6px 24px rgba(232,132,90,0.3);">
                  Explorar grupos →
                </a>
              </div>

            </div>

            <p style="text-align:center;font-size:12px;color:#bbb;margin-top:24px;line-height:1.6;">
              GoFlatt · Encuentra tu grupo antes de llegar<br>
              <a href="#" style="color:#bbb;">Cancelar suscripción</a>
            </p>

          </div>
        </body>
        </html>
      `,
    });

    if (error) return Response.json({ error }, { status: 400 });
    return Response.json({ success: true, data });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}