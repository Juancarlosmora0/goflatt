import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1e3a4a 0%, #2d5a73 60%, #1e3a4a 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Círculos decorativos */}
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "rgba(232,132,90,0.15)", display: "flex",
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", left: "-60px",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "rgba(90,172,184,0.12)", display: "flex",
        }} />

        {/* Logo */}
        <div style={{
          fontSize: "52px", fontWeight: 900, color: "white",
          letterSpacing: "-2px", marginBottom: "20px",
          display: "flex",
        }}>
          goflatt
        </div>

        {/* Tagline */}
        <div style={{
          fontSize: "32px", fontWeight: 700, color: "white",
          textAlign: "center", maxWidth: "800px",
          lineHeight: 1.3, marginBottom: "16px", display: "flex",
          flexDirection: "column", alignItems: "center",
        }}>
          Encuentra tu grupo de piso
          <span style={{ color: "#e8845a" }}>antes de llegar</span>
        </div>

        {/* Subtítulo */}
        <div style={{
          fontSize: "20px", color: "rgba(255,255,255,0.65)",
          textAlign: "center", marginBottom: "40px", display: "flex",
        }}>
          Para Erasmus, másters e intercambios en Europa
        </div>

        {/* Ciudades */}
        <div style={{
          display: "flex", gap: "12px", flexWrap: "wrap",
          justifyContent: "center", maxWidth: "700px",
        }}>
          {["🇮🇹 Milán", "🇵🇹 Lisboa", "🇩🇪 Berlín", "🇳🇱 Ámsterdam", "🇫🇷 París", "🇨🇿 Praga"].map((c) => (
            <div key={c} style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              borderRadius: "100px", padding: "8px 18px",
              fontSize: "16px", color: "white", display: "flex",
            }}>
              {c}
            </div>
          ))}
        </div>

        {/* URL */}
        <div style={{
          position: "absolute", bottom: "32px",
          fontSize: "16px", color: "rgba(255,255,255,0.4)",
          display: "flex",
        }}>
          goflatt.com
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}