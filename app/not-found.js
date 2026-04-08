import Link from "next/link";

export default function NotFound() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#f8f9ff",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px",
    }}>
      <div style={{ textAlign: "center", maxWidth: "480px" }}>

        {/* Número 404 */}
        <div style={{
          fontSize: "clamp(80px, 20vw, 140px)",
          fontWeight: 900,
          color: "#1e3a4a",
          letterSpacing: "-6px",
          lineHeight: 1,
          marginBottom: "8px",
        }}>
          404
        </div>

        {/* Emoji */}
        <div style={{ fontSize: "48px", marginBottom: "24px" }}>🏠</div>

        {/* Título */}
        <h1 style={{
          fontSize: "clamp(22px, 4vw, 28px)",
          fontWeight: 800,
          color: "#1e3a4a",
          letterSpacing: "-0.5px",
          marginBottom: "12px",
        }}>
          Esta página no existe
        </h1>

        {/* Subtítulo */}
        <p style={{
          fontSize: "16px",
          color: "#999",
          lineHeight: 1.6,
          marginBottom: "40px",
        }}>
          Parece que este grupo o página ya no está disponible.
          Pero hay muchos más grupos esperándote en el feed. 🚀
        </p>

        {/* Botones */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/feed" style={{
            background: "linear-gradient(135deg, #1e3a4a, #2d5a73)",
            color: "white",
            textDecoration: "none",
            padding: "16px 32px",
            borderRadius: "14px",
            fontSize: "15px",
            fontWeight: 700,
            boxShadow: "0 4px 20px rgba(30,58,74,0.25)",
          }}>
            Ver grupos →
          </Link>
          <Link href="/" style={{
            background: "white",
            color: "#1e3a4a",
            textDecoration: "none",
            padding: "16px 32px",
            borderRadius: "14px",
            fontSize: "15px",
            fontWeight: 600,
            border: "1.5px solid #eef0f8",
          }}>
            Ir al inicio
          </Link>
        </div>

        {/* Logo */}
        <div style={{
          marginTop: "48px",
          fontSize: "18px",
          fontWeight: 900,
          color: "#1e3a4a",
          letterSpacing: "-0.5px",
          opacity: 0.4,
        }}>
          goflatt
        </div>

      </div>
    </main>
  );
}