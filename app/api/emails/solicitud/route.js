import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  const { emailCreador, nombreCreador, nombreSolicitante, ciudad, mensaje } = await request.json();

  try {
    const { data, error } = await resend.emails.send({
      from: "GoFlatt <onboarding@resend.dev>",
      to: process.env.NODE_ENV === "development" ? "infobeatsmora@gmail.com" : emailCreador,
      subject: `${nombreSolicitante} quiere unirse a tu grupo 🏠`,
      html: `
        <!DOCTYPE html>
        <html>
        <body style="margin:0;padding:0;background:#f8f9ff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <div style="max-width:560px;margin:0 auto;padding:40px 16px;">

            <div style="background:white;border-radius:24px;padding:40px;box-shadow:0 4px 24px rgba(0,0,0,0.06);">
              
              <div style="text-align:center;margin-bottom:28px;">
                <div style="font-size:48px;margin-bottom:16px;">📩</div>
                <h1 style="font-size:22px;font-weight:800;color:#1e3a4a;margin:0 0 8px;">
                  Nueva solicitud para tu grupo
                </h1>
                <p style="color:#999;font-size:14px;margin:0;">
                  Hola ${nombreCreador}, alguien quiere unirse a tu grupo en ${ciudad}
                </p>
              </div>

              <div style="background:#f8f9ff;border-radius:16px;padding:20px;margin-bottom:24px;">
                <div style="display:flex;align-items:center;gap:14px;margin-bottom:16px;">
                  <div style="width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#e8845a,#d46b3f);display:flex;align-items:center;justify-content:center;color:white;font-size:20px;font-weight:700;flex-shrink:0;">
                    ${nombreSolicitante.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p style="margin:0;font-size:16px;font-weight:700;color:#1e3a4a;">${nombreSolicitante}</p>
                    <p style="margin:0;font-size:13px;color:#999;">Quiere unirse a tu grupo en ${ciudad}</p>
                  </div>
                </div>
                <div style="background:white;border-radius:12px;padding:16px;border-left:3px solid #e8845a;">
                  <p style="margin:0;font-size:14px;color:#555;line-height:1.6;font-style:italic;">
                    "${mensaje}"
                  </p>
                </div>
              </div>

              <div style="text-align:center;">
                <a href="https://goflatt.com/solicitudes" style="display:inline-block;background:linear-gradient(135deg,#1e3a4a,#2a5568);color:white;font-weight:700;font-size:15px;padding:16px 36px;border-radius:100px;text-decoration:none;box-shadow:0 6px 24px rgba(30,58,74,0.3);">
                  Ver solicitud →
                </a>
              </div>

            </div>

            <p style="text-align:center;font-size:12px;color:#bbb;margin-top:24px;">
              GoFlatt · Encuentra tu grupo antes de llegar
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