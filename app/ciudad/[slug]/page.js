import { ciudades, getCiudadBySlug } from "../../ciudades/ciudades";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export async function generateStaticParams() {
  return ciudades.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ciudad = getCiudadBySlug(slug);
  if (!ciudad) return {};

  return {
    title: `Compañeros de piso Erasmus en ${ciudad.nombre} — GoFlatt`,
    description: `Encuentra compañeros de piso para tu Erasmus o intercambio en ${ciudad.nombre}. Grupos reales buscando estudiantes compatibles. Sin WhatsApp eternos.`,
    keywords: [
      `compañeros de piso erasmus ${ciudad.nombre.toLowerCase()}`,
      `grupo piso erasmus ${ciudad.nombre.toLowerCase()}`,
      `buscar compañeros intercambio ${ciudad.nombre.toLowerCase()}`,
      `roommate erasmus ${ciudad.nombre.toLowerCase()}`,
      `piso compartido estudiantes ${ciudad.nombre.toLowerCase()}`,
    ],
    openGraph: {
      title: `Compañeros de piso Erasmus en ${ciudad.nombre} — GoFlatt`,
      description: `Encuentra tu grupo de piso en ${ciudad.nombre} antes de llegar. ${ciudad.grupos} grupos activos ahora mismo.`,
      url: `https://goflatt.vercel.app/ciudad/${ciudad.slug}`,
    },
  };
}

export default async function CiudadPage({ params }) {
  const { slug } = await params;
  const ciudad = getCiudadBySlug(slug);
  if (!ciudad) notFound();

  const ciudadesRelacionadas = ciudades
    .filter(c => c.slug !== ciudad.slug)
    .slice(0, 6);

  return (
    <main style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      color: "#1e3a4a",
    }}>
      <Navbar />

      {/* HERO */}
      <section style={{
        background: "linear-gradient(160deg, #f8f9ff 0%, #fff5f0 100%)",
        padding: "140px 24px 80px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(232,132,90,0.1)",
            border: "1px solid rgba(232,132,90,0.2)",
            borderRadius: "100px", padding: "8px 18px",
            fontSize: "13px", fontWeight: 600, color: "#e8845a",
            marginBottom: "24px",
          }}>
            <span style={{ fontSize: "20px" }}>{ciudad.flag}</span>
            {ciudad.pais}
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900,
            letterSpacing: "-2px", lineHeight: 1.05, marginBottom: "20px",
          }}>
            Compañeros de piso<br />
            <span style={{ color: "#e8845a" }}>Erasmus en {ciudad.nombre}</span>
          </h1>

          <p style={{
            fontSize: "clamp(15px, 2vw, 18px)", color: "#666",
            lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 16px",
          }}>
            {ciudad.descripcion} Encuentra tu grupo de piso ideal antes de llegar.
          </p>

          <p style={{ fontSize: "14px", color: "#999", marginBottom: "40px" }}>
            <strong style={{ color: "#e8845a" }}>{ciudad.grupos} grupos activos</strong> ahora mismo en {ciudad.nombre} · {ciudad.estudiantes} estudiantes internacionales
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/login" style={{
              background: "linear-gradient(135deg, #1e3a4a, #2a5568)",
              color: "white", fontWeight: 700, padding: "18px 40px",
              borderRadius: "100px", textDecoration: "none", fontSize: "16px",
              boxShadow: "0 8px 32px rgba(30,58,74,0.3)",
            }}>
              Ver grupos en {ciudad.nombre} →
            </a>
            <a href="/login" style={{
              background: "white", color: "#1e3a4a", fontWeight: 500,
              padding: "18px 40px", borderRadius: "100px",
              textDecoration: "none", fontSize: "16px",
              border: "1.5px solid #e8e8e8",
            }}>
              Crear mi grupo
            </a>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "white", padding: "60px 24px" }}>
        <div style={{
          maxWidth: "800px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px", textAlign: "center",
        }}>
          {[
            { num: ciudad.grupos, label: "grupos activos", sub: `en ${ciudad.nombre}` },
            { num: ciudad.estudiantes, label: "estudiantes internacionales", sub: "cada año" },
            { num: "<5min", label: "para encontrar grupo", sub: "de media" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "#f8f9ff", borderRadius: "20px",
              padding: "28px 20px", border: "1.5px solid #eef0f8",
            }}>
              <div style={{
                fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900,
                color: "#e8845a", letterSpacing: "-1px", marginBottom: "8px",
              }}>{s.num}</div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e3a4a", marginBottom: "4px" }}>
                {s.label}
              </div>
              <div style={{ fontSize: "12px", color: "#999" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section style={{ background: "#f8f9ff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 900,
            letterSpacing: "-1px", marginBottom: "12px", color: "#1e3a4a",
          }}>
            Encuentra tu grupo en {ciudad.nombre}<br />en 4 pasos
          </h2>
          <p style={{ color: "#888", fontSize: "16px", marginBottom: "48px" }}>
            Sin WhatsApp eternos. Sin perfiles falsos. Solo estudiantes reales.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
            {[
              { step: "01", title: `Regístrate gratis`, desc: `Entra con Google en 10 segundos. Sin formularios eternos.` },
              { step: "02", title: `Crea tu perfil de estudiante`, desc: `Presupuesto, estilo de vida, universidad. Solo lo esencial.` },
              { step: "03", title: `Explora grupos en ${ciudad.nombre}`, desc: `Ve grupos reales buscando 1, 2 o 3 personas más. Filtra por presupuesto y zona.` },
              { step: "04", title: `Conecta y busca piso juntos`, desc: `Cuando hay match os ponemos en contacto. A partir de ahí, sois vosotros.` },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: "16px", alignItems: "flex-start",
                background: "white", borderRadius: "16px",
                padding: "20px 24px", border: "1.5px solid #eef0f8",
              }}>
                <div style={{
                  minWidth: "44px", height: "44px",
                  background: "linear-gradient(135deg, #1e3a4a, #2a5568)",
                  borderRadius: "14px", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: 900, fontSize: "12px", flexShrink: 0,
                }}>{s.step}</div>
                <div>
                  <h3 style={{
                    fontSize: "15px", fontWeight: 800, color: "#1e3a4a",
                    marginBottom: "4px",
                  }}>{s.title}</h3>
                  <p style={{ color: "#888", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SEO */}
      <section style={{ background: "white", padding: "80px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900,
            letterSpacing: "-1px", marginBottom: "40px", color: "#1e3a4a",
            textAlign: "center",
          }}>
            Preguntas frecuentes sobre<br />Erasmus en {ciudad.nombre}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              {
                q: `¿Cómo encuentro compañeros de piso para Erasmus en ${ciudad.nombre}?`,
                a: `GoFlatt es la plataforma más rápida para encontrar compañeros de piso para tu Erasmus en ${ciudad.nombre}. Crea tu perfil, filtra por presupuesto y estilo de vida, y contacta con grupos que ya están buscando personas como tú.`,
              },
              {
                q: `¿Cuánto cuesta vivir en ${ciudad.nombre} siendo Erasmus?`,
                a: `Los grupos activos en GoFlatt para ${ciudad.nombre} tienen presupuestos entre 400€ y 900€/mes por persona en piso compartido. El coste varía según la zona y el número de compañeros.`,
              },
              {
                q: `¿Cuándo debo empezar a buscar piso para Erasmus en ${ciudad.nombre}?`,
                a: `Te recomendamos empezar a buscar compañeros de piso al menos 3 meses antes de llegar a ${ciudad.nombre}. Con GoFlatt puedes formar el grupo primero y luego buscar piso juntos, lo que hace el proceso mucho más rápido.`,
              },
              {
                q: `¿Es seguro usar GoFlatt para encontrar compañeros de piso en ${ciudad.nombre}?`,
                a: `Todos los usuarios de GoFlatt se registran con su cuenta de Google verificada. Puedes ver el perfil completo de cada persona antes de contactar, incluyendo su universidad, presupuesto y estilo de vida.`,
              },
            ].map((faq, i) => (
              <div key={i} style={{
                background: "#f8f9ff", borderRadius: "16px",
                padding: "24px", border: "1.5px solid #eef0f8",
              }}>
                <h3 style={{
                  fontSize: "15px", fontWeight: 800, color: "#1e3a4a",
                  marginBottom: "10px", lineHeight: 1.4,
                }}>{faq.q}</h3>
                <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTRAS CIUDADES */}
      <section style={{ background: "#f8f9ff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900,
            letterSpacing: "-0.5px", marginBottom: "32px", color: "#1e3a4a",
            textAlign: "center",
          }}>
            También disponible en otras ciudades
          </h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px",
          }}>
            {ciudadesRelacionadas.map((c, i) => (
              <Link key={i} href={`/ciudad/${c.slug}`} style={{
                background: "white", borderRadius: "16px",
                padding: "20px 16px", textAlign: "center",
                textDecoration: "none", border: "1.5px solid #eef0f8",
                transition: "all 0.2s", display: "block",
              }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{c.flag}</div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#1e3a4a", marginBottom: "4px" }}>
                  {c.nombre}
                </div>
                <div style={{ fontSize: "11px", color: "#e8845a", fontWeight: 600 }}>
                  {c.grupos} grupos
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{
        background: "linear-gradient(135deg, #1e3a4a, #2a5568)",
        padding: "80px 24px", textAlign: "center",
      }}>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900,
          color: "white", letterSpacing: "-1.5px",
          lineHeight: 1.1, marginBottom: "16px",
        }}>
          ¿Listo para tu Erasmus<br />
          <span style={{ color: "#e8845a" }}>en {ciudad.nombre}?</span>
        </h2>
        <p style={{
          color: "rgba(255,255,255,0.6)", fontSize: "16px",
          marginBottom: "36px", maxWidth: "400px", margin: "0 auto 36px",
        }}>
          Gratis. Sin tarjeta. En menos de 5 minutos.
        </p>
        <a href="/login" style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #e8845a, #d46b3f)",
          color: "white", fontWeight: 700, padding: "18px 48px",
          borderRadius: "100px", textDecoration: "none", fontSize: "16px",
          boxShadow: "0 8px 40px rgba(232,132,90,0.4)",
        }}>
          Empezar gratis →
        </a>
      </section>

      <Footer />
    </main>
  );
}