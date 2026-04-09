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
    title: `Roommates Erasmus en ${ciudad.nombre} 2026 — GoFlatt`,
    description: `¿Te vas de Erasmus a ${ciudad.nombre} y aún no tienes compañeros de piso? En GoFlatt encuentras tu grupo antes de llegar. ${ciudad.grupos} grupos activos ahora. Gratis.`,
    keywords: [
      `compañeros de piso erasmus ${ciudad.nombre.toLowerCase()}`,
      `roommate erasmus ${ciudad.nombre.toLowerCase()}`,
      `buscar piso erasmus ${ciudad.nombre.toLowerCase()}`,
      `grupo piso erasmus ${ciudad.nombre.toLowerCase()}`,
      `flatmate ${ciudad.nombre.toLowerCase()} erasmus`,
      `find erasmus roommate ${ciudad.nombre.toLowerCase()}`,
      `coinquilini erasmus ${ciudad.nombre.toLowerCase()}`,
      `colocation erasmus ${ciudad.nombre.toLowerCase()}`,
      `piso compartido estudiantes ${ciudad.nombre.toLowerCase()}`,
      `erasmus ${ciudad.nombre.toLowerCase()} 2026`,
    ],
    alternates: {
      canonical: `https://goflatt.com/ciudad/${ciudad.slug}`,
    },
    openGraph: {
      title: `Roommates Erasmus en ${ciudad.nombre} 2026 — GoFlatt`,
      description: `Encuentra compañeros de piso para tu Erasmus en ${ciudad.nombre} antes de llegar. ${ciudad.grupos} grupos activos ahora mismo. Gratis y sin drama.`,
      url: `https://goflatt.com/ciudad/${ciudad.slug}`,
      images: [{ url: "/api/og", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Roommates Erasmus en ${ciudad.nombre} 2026 — GoFlatt`,
      description: `Encuentra tu grupo de piso para Erasmus en ${ciudad.nombre}. Gratis.`,
      images: ["/api/og"],
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

      {/* SCHEMA JSON-LD específico de ciudad */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Roommates Erasmus en ${ciudad.nombre} — GoFlatt`,
            description: `Encuentra compañeros de piso para tu Erasmus en ${ciudad.nombre} antes de llegar.`,
            url: `https://goflatt.com/ciudad/${ciudad.slug}`,
            mainEntity: {
              "@type": "Service",
              name: "GoFlatt",
              description: `Plataforma para encontrar compañeros de piso Erasmus en ${ciudad.nombre}`,
              areaServed: ciudad.nombre,
              audience: {
                "@type": "Audience",
                audienceType: "Estudiantes Erasmus e intercambio",
              },
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
              },
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "GoFlatt", item: "https://goflatt.com" },
                { "@type": "ListItem", position: 2, name: "Ciudades", item: "https://goflatt.com/ciudad" },
                { "@type": "ListItem", position: 3, name: ciudad.nombre, item: `https://goflatt.com/ciudad/${ciudad.slug}` },
              ],
            },
          }),
        }}
      />

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: `¿Cómo encuentro compañeros de piso para Erasmus en ${ciudad.nombre}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Con GoFlatt puedes encontrar compañeros de piso para tu Erasmus en ${ciudad.nombre} en menos de 5 minutos. Crea tu perfil gratis, filtra por presupuesto y estilo de vida, y únete a grupos reales que ya están buscando personas como tú.`,
                },
              },
              {
                "@type": "Question",
                name: `¿Cuánto cuesta vivir en ${ciudad.nombre} siendo Erasmus?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Los grupos activos en GoFlatt para ${ciudad.nombre} tienen presupuestos entre 400€ y 900€/mes por persona en piso compartido. El precio varía según la zona y el número de compañeros.`,
                },
              },
              {
                "@type": "Question",
                name: `¿Cuándo debo empezar a buscar piso para Erasmus en ${ciudad.nombre}?`,
                acceptedAnswer: {
                  "@type": "Answer",
                  text: `Lo ideal es empezar 3 meses antes de llegar a ${ciudad.nombre}. En GoFlatt puedes formar el grupo primero y luego buscar piso juntos, lo que hace el proceso mucho más rápido y menos estresante.`,
                },
              },
            ],
          }),
        }}
      />

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
            {ciudad.pais} · {ciudad.grupos} grupos activos ahora
          </div>

          {/* H1 optimizado con keyword principal */}
          <h1 style={{
            fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900,
            letterSpacing: "-2px", lineHeight: 1.05, marginBottom: "20px",
          }}>
            Encuentra roommates<br />
            <span style={{ color: "#e8845a" }}>Erasmus en {ciudad.nombre}</span>
          </h1>

          <p style={{
            fontSize: "clamp(15px, 2vw, 18px)", color: "#666",
            lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 16px",
          }}>
            ¿Te vas de Erasmus a {ciudad.nombre} y aún no tienes compañeros de piso?
            En GoFlatt formas tu grupo <strong style={{ color: "#1e3a4a" }}>antes de coger el avión.</strong> Sin WhatsApp eternos, sin perfiles falsos.
          </p>

          <p style={{ fontSize: "14px", color: "#999", marginBottom: "40px" }}>
            <strong style={{ color: "#e8845a" }}>{ciudad.grupos} grupos activos</strong> ahora mismo en {ciudad.nombre} · {ciudad.estudiantes} estudiantes internacionales al año
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
            { num: ciudad.grupos, label: "grupos activos", sub: `buscando roommates en ${ciudad.nombre}` },
            { num: ciudad.estudiantes, label: "Erasmus al año", sub: `llegan a ${ciudad.nombre}` },
            { num: "<5min", label: "para encontrar grupo", sub: "de media en GoFlatt" },
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

      {/* POR QUÉ GOFLATT */}
      <section style={{ background: "#f8f9ff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 900,
            letterSpacing: "-1px", marginBottom: "12px", color: "#1e3a4a",
          }}>
            Para de buscar en WhatsApp.<br />Empieza a encontrar.
          </h2>
          <p style={{ color: "#888", fontSize: "16px", marginBottom: "48px" }}>
            Buscar roommates para Erasmus en {ciudad.nombre} no debería ser tan complicado.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
            {[
              { icon: "😩", title: "El problema con WhatsApp", desc: `200 mensajes, nadie se aclara y los pisos en ${ciudad.nombre} se agotan mientras tú sigues buscando grupo.` },
              { icon: "✅", title: "La solución GoFlatt", desc: `Filtra por presupuesto, estilo de vida y universidad. Solo contactas a quien de verdad encaja contigo en ${ciudad.nombre}.` },
              { icon: "⚡", title: "En menos de 5 minutos", desc: "Entra con Google, crea tu perfil y ya ves grupos reales buscando personas como tú. Sin formularios eternos." },
            ].map((f, i) => (
              <div key={i} style={{
                display: "flex", gap: "16px", alignItems: "flex-start",
                background: "white", borderRadius: "16px",
                padding: "20px 24px", border: "1.5px solid #eef0f8",
              }}>
                <div style={{ fontSize: "28px", flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <h3 style={{
                    fontSize: "15px", fontWeight: 800, color: "#1e3a4a", marginBottom: "6px",
                  }}>{f.title}</h3>
                  <p style={{ color: "#888", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section style={{ background: "white", padding: "80px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 900,
            letterSpacing: "-1px", marginBottom: "12px", color: "#1e3a4a",
          }}>
            De cero a grupo en {ciudad.nombre}<br />en menos de 5 minutos
          </h2>
          <p style={{ color: "#888", fontSize: "16px", marginBottom: "48px" }}>
            Sin rollos, sin registros eternos, sin perfiles falsos.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
            {[
              {
                step: "01", emoji: "🚀",
                title: "Entra gratis con Google",
                desc: "Sin contraseñas, sin formularios. En 10 segundos estás dentro."
              },
              {
                step: "02", emoji: "👤",
                title: "Crea tu perfil Erasmus",
                desc: `Universidad, presupuesto, estilo de vida. Solo lo importante para encontrar el grupo perfecto en ${ciudad.nombre}.`
              },
              {
                step: "03", emoji: "🔍",
                title: `Explora grupos en ${ciudad.nombre}`,
                desc: "Ve grupos reales con fotos, presupuesto y % de compatibilidad contigo. Filtra por zona y fecha de llegada."
              },
              {
                step: "04", emoji: "🎉",
                title: "Match y a buscar piso juntos",
                desc: `Cuando hay match os ponemos en contacto. A partir de ahí, buscáis piso en ${ciudad.nombre} como equipo.`
              },
            ].map((s, i) => (
              <div key={i} style={{
                display: "flex", gap: "16px", alignItems: "flex-start",
                background: "#f8f9ff", borderRadius: "16px",
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
                  <div style={{ fontSize: "18px", marginBottom: "4px" }}>{s.emoji}</div>
                  <h3 style={{
                    fontSize: "15px", fontWeight: 800, color: "#1e3a4a", marginBottom: "4px",
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

      {/* FAQ SEO — con schema ya incluido arriba */}
      <section style={{ background: "#f8f9ff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900,
            letterSpacing: "-1px", marginBottom: "40px", color: "#1e3a4a",
            textAlign: "center",
          }}>
            Todo lo que necesitas saber sobre<br />buscar piso Erasmus en {ciudad.nombre}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              {
                q: `¿Cómo encuentro roommates para Erasmus en ${ciudad.nombre}?`,
                a: `Con GoFlatt es super fácil. Creas tu perfil gratis, pones tu presupuesto y cuándo llegas a ${ciudad.nombre}, y el algoritmo te muestra grupos compatibles contigo. Puedes solicitar unirte con un mensaje y si hay match os ponemos en contacto.`,
              },
              {
                q: `¿Cuánto cuesta vivir en ${ciudad.nombre} siendo Erasmus?`,
                a: `En los grupos activos de GoFlatt para ${ciudad.nombre} los presupuestos van de 400€ a 900€/mes por persona en piso compartido. Depende mucho de la zona — el centro siempre es más caro. Lo mejor es filtrar por presupuesto directamente en la plataforma.`,
              },
              {
                q: `¿Cuándo tengo que empezar a buscar piso para Erasmus en ${ciudad.nombre}?`,
                a: `Cuanto antes mejor. Los pisos en ${ciudad.nombre} vuelan, especialmente los de septiembre. Te recomendamos empezar 3-4 meses antes de llegar. Con GoFlatt primero formas el grupo y luego buscáis piso juntos, lo que es mucho más rápido.`,
              },
              {
                q: `¿Es gratis GoFlatt para buscar compañeros de piso en ${ciudad.nombre}?`,
                a: `Sí, 100% gratis. Sin tarjeta, sin suscripción, sin letra pequeña. Solo te registras con Google y ya puedes ver todos los grupos activos en ${ciudad.nombre}.`,
              },
              {
                q: `¿Qué diferencia a GoFlatt de los grupos de WhatsApp de Erasmus?`,
                a: `En WhatsApp no sabes con quién vas a vivir hasta que ya es demasiado tarde. GoFlatt te muestra el perfil completo de cada persona — universidad, presupuesto, estilo de vida — y te calcula el % de compatibilidad antes de que contactéis. Nada de sorpresas.`,
              },
            ].map((faq, i) => (
              <div key={i} style={{
                background: "white", borderRadius: "16px",
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
      <section style={{ background: "white", padding: "80px 24px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900,
            letterSpacing: "-0.5px", marginBottom: "8px", color: "#1e3a4a",
            textAlign: "center",
          }}>
            ¿Aún no sabes a qué ciudad vas?
          </h2>
          <p style={{ textAlign: "center", color: "#999", fontSize: "15px", marginBottom: "32px" }}>
            Puedes añadir varios destinos y te mostramos grupos en todos ellos
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px",
          }}>
            {ciudadesRelacionadas.map((c, i) => (
              <Link key={i} href={`/ciudad/${c.slug}`} style={{
                background: "#f8f9ff", borderRadius: "16px",
                padding: "20px 16px", textAlign: "center",
                textDecoration: "none", border: "1.5px solid #eef0f8",
                display: "block", transition: "all 0.2s",
              }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{c.flag}</div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#1e3a4a", marginBottom: "4px" }}>
                  {c.nombre}
                </div>
                <div style={{ fontSize: "11px", color: "#e8845a", fontWeight: 600 }}>
                  {c.grupos} grupos activos
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
        <p style={{
          fontSize: "12px", fontWeight: 700, color: "#5aacb8",
          letterSpacing: "2px", textTransform: "uppercase", marginBottom: "16px",
        }}>
          {ciudad.grupos} grupos esperándote en {ciudad.nombre}
        </p>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900,
          color: "white", letterSpacing: "-1.5px",
          lineHeight: 1.1, marginBottom: "16px",
        }}>
          Tu Erasmus en {ciudad.nombre}<br />
          <span style={{ color: "#e8845a" }}>mola más con la gente correcta.</span>
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
          Buscar roommates en {ciudad.nombre} →
        </a>
      </section>

      <Footer />
    </main>
  );
}