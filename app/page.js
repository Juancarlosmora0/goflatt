import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Testimonios from "./components/Testimonios";

export default function Home() {
  return (
    <main style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif', background: "#fff", color: "#1e3a4a" }}>

      <Navbar />
      {/* HERO */}
      <section style={{
        background: "linear-gradient(135deg, #f8f9ff 0%, #fff5f0 100%)",
        padding: "100px 48px 80px", textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        {/* Decorative circles */}
        <div style={{
          position: "absolute", width: "500px", height: "500px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,132,90,0.08) 0%, transparent 70%)",
          top: "-100px", right: "-100px", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(90,172,184,0.08) 0%, transparent 70%)",
          bottom: "-100px", left: "-100px", pointerEvents: "none"
        }} />

        <div style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(232,132,90,0.1)", border: "1px solid rgba(232,132,90,0.2)",
          borderRadius: "100px", padding: "6px 18px", marginBottom: "32px"
        }}>
          <span style={{ width: "7px", height: "7px", background: "#e8845a", borderRadius: "50%", display: "inline-block" }}></span>
          <span style={{ fontSize: "13px", color: "#e8845a", fontWeight: 600 }}>Para estudiantes que se mudan a una ciudad nueva</span>
        </div>

        <h1 style={{ fontSize: "clamp(42px, 6vw, 72px)", fontWeight: 800, lineHeight: 1.1, marginBottom: "24px", letterSpacing: "-2px" }}>
          Encuentra tu grupo.<br />
          <span style={{ color: "#e8845a" }}>Antes de reservar.</span>
        </h1>

        <p style={{ fontSize: "18px", color: "#666", maxWidth: "520px", margin: "0 auto 40px", lineHeight: 1.7 }}>
          Deja el caos de WhatsApp. Forma tu grupo de piso con 
estudiantes compatibles en tu ciudad de destino, antes de llegar.
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/login" style={{
            background: "#1e3a4a", color: "white", fontWeight: 700,
            padding: "16px 36px", borderRadius: "100px", textDecoration: "none",
            fontSize: "15px", boxShadow: "0 8px 32px rgba(30,58,74,0.25)"
          }}>Buscar grupo →</a>
          <a href="#como-funciona" style={{
            background: "white", color: "#1e3a4a", fontWeight: 500,
            padding: "16px 36px", borderRadius: "100px", textDecoration: "none",
            fontSize: "15px", border: "1.5px solid #e8e8e8"
          }}>Cómo funciona</a>
        </div>

        {/* Social proof */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", marginTop: "48px" }}>
          <div style={{ display: "flex" }}>
            {[["A","#e8845a"],["M","#5aacb8"],["S","#1e3a4a"],["K","#e8845a"],["R","#5aacb8"]].map(([l,c], i) => (
              <div key={i} style={{
                width: "36px", height: "36px", borderRadius: "50%", background: c,
                border: "2px solid white", marginLeft: i > 0 ? "-8px" : "0",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontSize: "12px", fontWeight: 700
              }}>{l}</div>
            ))}
          </div>
          <span style={{ fontSize: "13px", color: "#999" }}>
            <strong style={{ color: "#555" }}>+240 estudiantes</strong> ya han encontrado grupo este semestre
          </span>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "80px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-1px", marginBottom: "12px" }}>
            Por fin, orden en el caos
          </h2>
          <p style={{ color: "#888", fontSize: "16px" }}>Todo lo que necesitas para encontrar a tus compañeros perfectos</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
          {[
            { icon: "🎯", title: "Grupos reales", desc: "Ve quiénes ya están y cuántas plazas quedan libres. Sin perfiles fantasma.", color: "#fff5f0", border: "rgba(232,132,90,0.2)" },
            { icon: "🤝", title: "Compatibilidad real", desc: "Filtra por presupuesto, horarios y estilo de vida antes de contactar a nadie.", color: "#f0f9fa", border: "rgba(90,172,184,0.2)" },
            { icon: "✅", title: "Sin caos", desc: "Nada de grupos de Telegram eternos. Todo organizado, claro y en un solo sitio.", color: "#f0f4f7", border: "rgba(30,58,74,0.15)" },
          ].map((f, i) => (
            <div key={i} style={{
              background: f.color, border: `1.5px solid ${f.border}`,
              borderRadius: "20px", padding: "32px", transition: "transform 0.2s, box-shadow 0.2s"
            }}>
              <div style={{ fontSize: "36px", marginBottom: "16px" }}>{f.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px" }}>{f.title}</h3>
              <p style={{ color: "#777", fontSize: "14px", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section id="como-funciona" style={{ background: "#f8f9ff", padding: "80px 48px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-1px", marginBottom: "12px" }}>
            Cómo funciona
          </h2>
          <p style={{ color: "#888", fontSize: "16px", marginBottom: "56px" }}>En menos de 5 minutos tienes tu grupo</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "24px", textAlign: "left" }}>
            {[
              { step: "01", title: "Elige tu destino y semestre", desc: "Selecciona la ciudad donde vas de Erasmus y cuándo llegas. Filtramos todo automáticamente." },
              { step: "02", title: "Crea tu perfil en 2 minutos", desc: "Universidad, presupuesto, estilo de vida. Lo justo para que otros sepan con quién van a vivir." },
              { step: "03", title: "Explora grupos o crea el tuyo", desc: "Ve los grupos incompletos en tu destino. Solicita unirte o crea tu propio grupo desde cero." },
              { step: "04", title: "Conecta y forma tu grupo", desc: "Cuando hay match, os ponemos en contacto. A partir de ahí, sois vosotros los que decidís." },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: "24px", alignItems: "flex-start",
                background: "white", borderRadius: "16px", padding: "24px 28px",
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)"
              }}>
                <div style={{
                  minWidth: "48px", height: "48px", background: "#1e3a4a",
                  borderRadius: "14px", display: "flex", alignItems: "center",
                  justifyContent: "center", color: "white", fontWeight: 800, fontSize: "14px"
                }}>{s.step}</div>
                <div>
                  <h4 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px" }}>{s.title}</h4>
                  <p style={{ color: "#888", fontSize: "14px", lineHeight: 1.6 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CIUDADES */}
      <section id="ciudades" style={{ padding: "80px 48px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <h2 style={{ fontSize: "36px", fontWeight: 800, letterSpacing: "-1px", marginBottom: "12px" }}>
            Ciudades disponibles
          </h2>
          <p style={{ color: "#888", fontSize: "16px" }}>Disponible en las ciudades con más estudiantes internacionales</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px" }}>
          {[
            { flag: "🇮🇹", city: "Milán", groups: "34 grupos" },
            { flag: "🇵🇹", city: "Lisboa", groups: "28 grupos" },
            { flag: "🇩🇪", city: "Berlín", groups: "21 grupos" },
            { flag: "🇳🇱", city: "Ámsterdam", groups: "19 grupos" },
            { flag: "🇫🇷", city: "París", groups: "17 grupos" },
            { flag: "🇨🇿", city: "Praga", groups: "15 grupos" },
          ].map((c, i) => (
            <div key={i} style={{
              background: "#f8f9ff", border: "1.5px solid #eef0f8",
              borderRadius: "16px", padding: "24px 16px", textAlign: "center",
              cursor: "pointer", transition: "all 0.2s"
            }}>
              <div style={{ fontSize: "32px", marginBottom: "10px" }}>{c.flag}</div>
              <div style={{ fontWeight: 700, fontSize: "15px", marginBottom: "4px" }}>{c.city}</div>
              <div style={{ fontSize: "12px", color: "#e8845a", fontWeight: 600 }}>{c.groups}</div>
            </div>
          ))}
        </div>
      </section>

     {/* TESTIMONIOS */}
<Testimonios />

      {/* CTA FINAL */}
      <section style={{
        background: "#1e3a4a", padding: "80px 48px", textAlign: "center"
      }}>
        <h2 style={{ fontSize: "40px", fontWeight: 800, color: "white", letterSpacing: "-1px", marginBottom: "16px" }}>
          ¿Listo para encontrar<br />tu grupo ideal?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "16px", marginBottom: "36px" }}>
          Gratis. Sin registro complicado. En menos de 5 minutos.
        </p>
        <a href="/login" style={{
          background: "#e8845a", color: "white", fontWeight: 700,
          padding: "18px 48px", borderRadius: "100px", textDecoration: "none",
          fontSize: "16px", boxShadow: "0 8px 32px rgba(232,132,90,0.4)"
        }}>Empezar gratis →</a>
      </section>

      {/* FOOTER */}
      <Footer />

    </main>
  );
}