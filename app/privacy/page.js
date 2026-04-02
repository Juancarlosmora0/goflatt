import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad | GoFlatt",
  description: "Conoce cómo GoFlatt gestiona y protege tus datos personales.",
};

export default function PrivacyPage() {
  return (
    <main style={{ minHeight: "100vh", background: "#f8f9ff" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1e3a4a 0%, #2d5a73 100%)",
        padding: "64px 24px",
        textAlign: "center",
        color: "white"
      }}>
        <Link href="/" style={{
          display: "inline-block", marginBottom: "24px",
          color: "rgba(255,255,255,0.7)", fontSize: "14px",
          textDecoration: "none", fontWeight: 500
        }}>
          ← Volver a GoFlatt
        </Link>
        <h1 style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 800, margin: "0 0 8px" }}>
          Política de Privacidad
        </h1>
        <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "16px", margin: 0 }}>
          Última actualización: 2 de abril de 2025
        </p>
      </div>

      {/* Content */}
      <div style={{
        maxWidth: "760px", margin: "0 auto",
        padding: "64px 24px", color: "#1e3a4a", lineHeight: 1.8
      }}>
        {[
          {
            title: "1. ¿Quiénes somos?",
            content: <>GoFlatt es una plataforma de búsqueda de compañeros de piso para jóvenes en Europa. El responsable del tratamiento de tus datos es <strong>GoFlatt</strong>, accesible en <a href="https://goflatt.com" style={{ color: "#e8845a" }}>https://goflatt.com</a>.</>
          },
          {
            title: "2. ¿Qué datos recopilamos?",
            content: (<><p style={{ margin: "0 0 12px" }}>Recopilamos los siguientes datos cuando usas GoFlatt:</p>
              <ul style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                <li><strong>Datos de cuenta:</strong> nombre, foto de perfil y email (a través de Google OAuth o registro manual).</li>
                <li><strong>Datos de perfil:</strong> ciudad de interés, presupuesto, preferencias de convivencia y descripción personal.</li>
                <li><strong>Datos de uso:</strong> grupos creados, solicitudes enviadas y recibidas.</li>
                <li><strong>Datos técnicos:</strong> dirección IP, tipo de navegador y páginas visitadas, para mejorar el servicio.</li>
              </ul></>)
          },
          {
            title: "3. ¿Para qué usamos tus datos?",
            content: (<ul style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Gestionar tu cuenta y autenticación.</li>
              <li>Mostrarte grupos de pisos compatibles con tu búsqueda.</li>
              <li>Enviarte notificaciones y correos relacionados con tus solicitudes y matches.</li>
              <li>Mejorar la plataforma y detectar posibles abusos.</li>
              <li>Cumplir con obligaciones legales aplicables.</li>
            </ul>)
          },
          {
            title: "4. Base legal del tratamiento",
            content: "Tratamos tus datos con base en la ejecución del contrato de servicio (Art. 6.1.b RGPD), tu consentimiento explícito al registrarte (Art. 6.1.a RGPD) y el interés legítimo para mejorar y proteger la plataforma (Art. 6.1.f RGPD)."
          },
          {
            title: "5. ¿Compartimos tus datos?",
            content: (<><p style={{ margin: "0 0 12px" }}>No vendemos tus datos. Solo los compartimos con:</p>
              <ul style={{ paddingLeft: "20px", margin: "0 0 12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li><strong>Supabase:</strong> base de datos y autenticación (servidores en UE).</li>
                <li><strong>Vercel:</strong> infraestructura de alojamiento.</li>
                <li><strong>Resend:</strong> envío de correos transaccionales.</li>
                <li><strong>Google:</strong> autenticación OAuth (solo si usas "Iniciar sesión con Google").</li>
              </ul>
              <p style={{ margin: 0 }}>Todos nuestros proveedores cumplen con el RGPD.</p></>)
          },
          {
            title: "6. ¿Cuánto tiempo guardamos tus datos?",
            content: "Conservamos tus datos mientras tu cuenta esté activa. Si eliminas tu cuenta, tus datos personales serán eliminados en un plazo máximo de 30 días, salvo obligación legal en contrario."
          },
          {
            title: "7. Tus derechos",
            content: (<><p style={{ margin: "0 0 12px" }}>Conforme al RGPD, tienes derecho a:</p>
              <ul style={{ paddingLeft: "20px", margin: "0 0 12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li><strong>Acceso:</strong> saber qué datos tenemos sobre ti.</li>
                <li><strong>Rectificación:</strong> corregir datos incorrectos.</li>
                <li><strong>Supresión:</strong> solicitar el borrado de tus datos ("derecho al olvido").</li>
                <li><strong>Portabilidad:</strong> recibir tus datos en formato estructurado.</li>
                <li><strong>Oposición y limitación:</strong> oponerte a ciertos tratamientos.</li>
              </ul>
              <p style={{ margin: 0 }}>Para ejercer estos derechos, escríbenos a <a href="mailto:privacy@goflatt.com" style={{ color: "#e8845a" }}>privacy@goflatt.com</a>.</p></>)
          },
          {
            title: "8. Cookies",
            content: "GoFlatt utiliza cookies técnicas esenciales para el funcionamiento de la plataforma (sesión, autenticación). No utilizamos cookies de seguimiento o publicidad de terceros."
          },
          {
            title: "9. Seguridad",
            content: "Aplicamos medidas técnicas y organizativas para proteger tus datos: cifrado HTTPS, control de acceso y auditorías periódicas. Sin embargo, ningún sistema es completamente infalible."
          },
          {
            title: "10. Cambios en esta política",
            content: "Podemos actualizar esta política ocasionalmente. Te notificaremos por correo electrónico o mediante un aviso en la app si los cambios son significativos."
          },
          {
            title: "11. Contacto",
            content: <>Si tienes cualquier duda, contáctanos en <a href="mailto:privacy@goflatt.com" style={{ color: "#e8845a" }}>privacy@goflatt.com</a>.</>
          },
        ].map((section, i) => (
          <section key={i} style={{ marginBottom: "40px" }}>
            <h2 style={{
              fontSize: "20px", fontWeight: 700,
              color: "#1e3a4a", marginBottom: "12px"
            }}>{section.title}</h2>
            <div style={{ color: "#4a6070" }}>{section.content}</div>
          </section>
        ))}

        {/* Footer */}
        <div style={{
          paddingTop: "32px", borderTop: "1px solid #e0e8f0",
          display: "flex", gap: "24px", fontSize: "14px", color: "#8a9bb0"
        }}>
          <Link href="/terms" style={{ color: "#e8845a", textDecoration: "none" }}>Términos y Condiciones</Link>
          <Link href="/" style={{ color: "#e8845a", textDecoration: "none" }}>Volver al inicio</Link>
        </div>
      </div>
    </main>
  );
}