import Link from "next/link";

export const metadata = {
  title: "Términos y Condiciones | GoFlatt",
  description: "Lee los términos y condiciones de uso de la plataforma GoFlatt.",
};

export default function TermsPage() {
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
          Términos y Condiciones
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
            title: "1. Aceptación de los términos",
            content: <>Al acceder o usar GoFlatt (<a href="https://goflatt.com" style={{ color: "#e8845a" }}>goflatt.com</a>), aceptas estos Términos y Condiciones en su totalidad. Si no estás de acuerdo, te pedimos que no utilices la plataforma.</>
          },
          {
            title: "2. Descripción del servicio",
            content: "GoFlatt es una plataforma digital que conecta a personas que buscan compañeros de piso en ciudades europeas. Facilitamos el contacto entre usuarios, pero no somos parte de ningún acuerdo de arrendamiento ni intermediarios inmobiliarios."
          },
          {
            title: "3. Requisitos para usar GoFlatt",
            content: (<ul style={{ paddingLeft: "20px", margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>Debes tener al menos <strong>18 años</strong> para registrarte.</li>
              <li>Debes proporcionar información veraz y actualizada en tu perfil.</li>
              <li>Eres responsable de mantener la seguridad de tu cuenta.</li>
            </ul>)
          },
          {
            title: "4. Normas de uso aceptable",
            content: (<><p style={{ margin: "0 0 12px" }}>Al usar GoFlatt, te comprometes a <strong>no</strong>:</p>
              <ul style={{ paddingLeft: "20px", margin: "0 0 12px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <li>Publicar información falsa, engañosa o fraudulenta.</li>
                <li>Acosar, amenazar o discriminar a otros usuarios.</li>
                <li>Usar la plataforma para actividades ilegales.</li>
                <li>Intentar acceder a cuentas de otros usuarios sin autorización.</li>
                <li>Publicar contenido ofensivo o que infrinja derechos de terceros.</li>
                <li>Usar bots o scrapers sin permiso expreso.</li>
              </ul>
              <p style={{ margin: 0 }}>GoFlatt se reserva el derecho de suspender cuentas que incumplan estas normas.</p></>)
          },
          {
            title: "5. Contenido del usuario",
            content: "Eres el único responsable del contenido que publicas. Al subir contenido, nos otorgas una licencia no exclusiva y gratuita para mostrarlo dentro de la plataforma con el único fin de prestar el servicio."
          },
          {
            title: "6. Propiedad intelectual",
            content: "Todo el contenido de GoFlatt (diseño, código, logo, textos) está protegido por derechos de autor y es propiedad de GoFlatt. No puedes reproducirlo ni modificarlo sin autorización expresa."
          },
          {
            title: "7. Limitación de responsabilidad",
            content: (<><p style={{ margin: "0 0 12px" }}>GoFlatt actúa como plataforma de conexión y <strong>no garantiza</strong> la veracidad de los perfiles ni el éxito de ningún acuerdo entre usuarios.</p>
              <p style={{ margin: 0 }}>Te recomendamos verificar la identidad de las personas con quienes contactes antes de firmar cualquier acuerdo de convivencia.</p></>)
          },
          {
            title: "8. Cancelación de cuenta",
            content: <>Puedes cancelar tu cuenta en cualquier momento desde tu perfil o contactando en <a href="mailto:privacy@goflatt.com" style={{ color: "#e8845a" }}>privacy@goflatt.com</a>. GoFlatt también puede cancelar cuentas que incumplan estos términos.</>
          },
          {
            title: "9. Modificaciones del servicio",
            content: "GoFlatt puede modificar, suspender o interrumpir el servicio en cualquier momento, con o sin previo aviso."
          },
          {
            title: "10. Ley aplicable y jurisdicción",
            content: "Estos términos se rigen por la legislación española y de la Unión Europea. Cualquier disputa se someterá a los tribunales competentes de España."
          },
          {
            title: "11. Contacto",
            content: <>¿Tienes preguntas? Escríbenos a <a href="mailto:privacy@goflatt.com" style={{ color: "#e8845a" }}>privacy@goflatt.com</a>.</>
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
          display: "flex", gap: "24px", fontSize: "14px"
        }}>
          <Link href="/privacy" style={{ color: "#e8845a", textDecoration: "none" }}>Política de Privacidad</Link>
          <Link href="/" style={{ color: "#e8845a", textDecoration: "none" }}>Volver al inicio</Link>
        </div>
      </div>
    </main>
  );
}