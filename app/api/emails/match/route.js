import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { emailCreador, emailSolicitante, nombreCreador, nombreSolicitante, ciudad } = await request.json();

  try {
    const emailHtml = (nombreDestinatario, nombreOtro) => `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body style="margin:0;padding:0;background:#f8f9ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
        <div style="max-width:560px;margin:0 auto;padding:40px 16px;">

          <div style="text-align:center;margin-bottom:32px;">
            <div style="font-size:24px;font-weight:800;color:#1e3a4a;letter-spacing:-1px;">goflatt</div>
          </div>

          <div style="background:white;border-radius:24px;padding:40px;box-shadow:0 4px 24px rgba(0,0,0,0.06);text-align:center;">

            <div style="font-size:64px;margin-bottom:20px;">🎉</div>

            <h1 style="font-size:26px;font-weight:800;color:#1e3a4a;margin:0 0 12px;letter-spacing:-0.5px;">
              ¡Tienes un nuevo compañero!
            </h1>

            <p style="color:#999;font-size:15px;margin:0 0 28px;line-height:1.6;">
              Hola <strong style="color:#1e3a4a;">${nombreDestinatario}</strong>, acabas de hacer match con 
              <strong style="color:#e8845a;">${nombreOtro}</strong> para un piso en ${ciudad}.
            </p>

            <div style="background:linear-gradient(135deg,rgba(232,132,90,0.08),rgba(90,172,184,0.06));border:1.5px solid rgba(232,132,90,0.2);border-radius:16px;padding:24px;margin-bottom:28px;text-align:left;">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:12px;">
                <div style="font-size:24px;">🏠</div>
                <p style="margin:0;font-size:15px;font-weight:700;color:#1e3a4a;">¿Qué hacer ahora?</p>
              </div>
              <p style="margin:0 0 10px;font-size:14px;color:#555;line-height:1.6;">
                1. Entra en GoFlatt y contacta con <strong>${nombreOtro}</strong>
              </p>
              <p style="margin:0 0 10px;font-size:14px;color:#555;line-height:1.6;">
                2. Poneos de acuerdo para buscar piso juntos
              </p>
              <p style="margin:0;font-size:14px;color:#555;line-height:1.6;">
                3. ¡Disfrutad de la experiencia! 🌍
              </p>
            </div>

            <div style="background:#f8f9ff;border-radius:14px;padding:16px;margin-bottom:28px;">
              <p style="margin:0;font-size:13px;color:#999;line-height:1.5;">
                📍 Ciudad: <strong style="color:#1e3a4a;">${ciudad}</strong>
              </p>
            </div>

            <a href="http://localhost:3000/feed" style="display:inline-block;background:linear-gradient(135deg,#e8845a,#d46b3f);color:white;font-weight:700;font-size:15px;padding:16px 36px;border-radius:100px;text-decoration:none;box-shadow:0 6px 24px rgba(232,132,90,0.3);">
              Ir a GoFlatt →
            </a>

          </div>

          <p style="text-align:center;font-size:12px;color:#bbb;margin-top:24px;line-height:1.6;">
            GoFlatt · Encuentra tu grupo antes de llegar<br>
            <a href="#" style="color:#bbb;text-decoration:underline;">Cancelar suscripción</a>
          </p>

        </div>
      </body>
      </html>
    `;

    // Email al creador
    await resend.emails.send({
      from: "GoFlatt <onboarding@resend.dev>",
      to: process.env.NODE_ENV === "development" ? "infobeatsmora@gmail.com" : emailCreador,
      subject: `¡Match con ${nombreSolicitante} en ${ciudad}! 🎉`,
      html: emailHtml(nombreCreador, nombreSolicitante),
    });

    // Email al solicitante
    await resend.emails.send({
      from: "GoFlatt <onboarding@resend.dev>",
      to: process.env.NODE_ENV === "development" ? "infobeatsmora@gmail.com" : emailSolicitante,
      subject: `¡${nombreCreador} ha aceptado tu solicitud! 🎉`,
      html: emailHtml(nombreSolicitante, nombreCreador),
    });

    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}