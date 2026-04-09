import { ciudades, getCiudadBySlug } from "../../ciudades/ciudades";
import { notFound } from "next/navigation";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { createClient } from "@supabase/supabase-js";

// ISR — revalida cada hora para datos frescos
export const revalidate = 3600;

const supabaseServer = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Keywords por ciudad según el briefing
const KEYWORDS_POR_CIUDAD = {
  milan: {
    en: ["erasmus roommates milan", "find flatmates milan", "student shared flat milan", "erasmus housing milan 2026"],
    local: ["cercare coinquilini erasmus milano", "appartamento condiviso studenti milano", "compagni di stanza erasmus milano"],
  },
  lisbon: {
    en: ["erasmus roommates lisbon", "find flatmates lisbon", "student housing lisbon", "shared flat erasmus lisbon"],
    local: ["procurar colegas de quarto erasmus lisboa", "alojamento estudantes lisboa", "quarto partilhado erasmus lisboa"],
  },
  berlin: {
    en: ["erasmus roommates berlin", "find flatmates berlin", "student wg berlin", "shared flat erasmus berlin"],
    local: ["WG suche erasmus berlin", "mitbewohner erasmus berlin", "studentenwohnung berlin"],
  },
  amsterdam: {
    en: ["erasmus roommates amsterdam", "find flatmates amsterdam", "student housing amsterdam"],
    local: ["kamer zoeken amsterdam studenten", "huisgenoten erasmus amsterdam"],
  },
  paris: {
    en: ["erasmus roommates paris", "find flatmates paris", "student shared flat paris"],
    local: ["colocation erasmus paris", "chercher colocataires erasmus paris", "logement etudiant paris"],
  },
  barcelona: {
    en: ["erasmus roommates barcelona", "find flatmates barcelona", "student flat barcelona"],
    local: ["buscar compañeros piso erasmus barcelona", "piso compartido estudiantes barcelona"],
  },
  madrid: {
    en: ["erasmus roommates madrid", "find flatmates madrid", "shared flat erasmus madrid"],
    local: ["buscar compañeros piso erasmus madrid", "piso compartido estudiantes madrid"],
  },
  praga: {
    en: ["erasmus roommates prague", "find flatmates prague", "student housing prague"],
    local: ["spolubydleni erasmus praha", "hledam spolubydliciho praha"],
  },
  roma: {
    en: ["erasmus roommates rome", "find flatmates rome", "student shared flat rome"],
    local: ["cercare coinquilini erasmus roma", "stanza studenti roma"],
  },
  budapest: {
    en: ["erasmus roommates budapest", "find flatmates budapest", "student housing budapest"],
    local: ["erasmus szállás budapest", "lakotárs keresés budapest"],
  },
  varsovia: {
    en: ["erasmus roommates warsaw", "find flatmates warsaw", "student flat warsaw"],
    local: ["szukam współlokatora erasmus warszawa", "mieszkanie studenckie warszawa"],
  },
  viena: {
    en: ["erasmus roommates vienna", "find flatmates vienna", "student wg wien"],
    local: ["WG suche erasmus wien", "mitbewohner erasmus wien"],
  },
};

export async function generateStaticParams() {
  return ciudades.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const ciudad = getCiudadBySlug(slug);
  if (!ciudad) return {};

  const keywords = KEYWORDS_POR_CIUDAD[slug] || { en: [], local: [] };

  return {
    title: `Find Erasmus Roommates in ${ciudad.nombre} 2026 | GoFlatt`,
    description: `Join ${ciudad.grupos} students forming flat groups in ${ciudad.nombre}. Find compatible Erasmus flatmates, create your group, and search for flats together. Free. No scams. No chaos.`,
    keywords: [...keywords.en, ...keywords.local],
    alternates: {
      canonical: `https://goflatt.com/city/${ciudad.slug}`,
      languages: {
        "en": `https://goflatt.com/city/${ciudad.slug}`,
        "es": `https://goflatt.com/ciudad/${ciudad.slug}`,
      },
    },
    openGraph: {
      title: `Find Your Erasmus Flatmates in ${ciudad.nombre} | GoFlatt`,
      description: `${ciudad.grupos} students are forming flat groups in ${ciudad.nombre} right now. Join them. Free.`,
      url: `https://goflatt.com/city/${ciudad.slug}`,
      images: [{ url: "/api/og", width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Find Erasmus Roommates in ${ciudad.nombre} 2026 | GoFlatt`,
      description: `Form your flat group in ${ciudad.nombre} before you arrive. Free.`,
      images: ["/api/og"],
    },
  };
}

// Función para obtener datos reales de Supabase (server-side)
async function getDatosCiudad(nombreCiudad) {
  try {
    const { data: grupos, count: totalGrupos } = await supabaseServer
      .from("grupos")
      .select("id, ciudad, presupuesto_min, presupuesto_max, cuantos_somos, cuantos_buscamos, semestre, bio, creador:perfiles(nombre)", { count: "exact" })
      .eq("ciudad", nombreCiudad)
      .eq("activo", true)
      .limit(5);

    const { count: totalEstudiantes } = await supabaseServer
      .from("perfiles")
      .select("*", { count: "exact", head: true })
      .contains("ciudades_interes", [nombreCiudad]);

    return {
      gruposActivos: totalGrupos || 0,
      estudiantesRegistrados: totalEstudiantes || 0,
      gruposPreview: grupos || [],
    };
  } catch {
    return { gruposActivos: 0, estudiantesRegistrados: 0, gruposPreview: [] };
  }
}

export default async function CityPage({ params }) {
  const { slug } = await params;
  const ciudad = getCiudadBySlug(slug);
  if (!ciudad) notFound();

  // Datos reales de Supabase — server rendered para SEO
  const { gruposActivos, estudiantesRegistrados, gruposPreview } = await getDatosCiudad(ciudad.nombre);

  const ciudadesRelacionadas = ciudades
    .filter(c => c.slug !== ciudad.slug)
    .slice(0, 6);

  const keywords = KEYWORDS_POR_CIUDAD[slug] || { en: [], local: [] };

  return (
    <main style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      color: "#1e3a4a",
    }}>
      <Navbar />

      {/* SCHEMA WebPage + FAQ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `Find Erasmus Roommates in ${ciudad.nombre} — GoFlatt`,
            description: `Find compatible flatmates for your Erasmus in ${ciudad.nombre}. ${gruposActivos} active groups right now.`,
            url: `https://goflatt.com/city/${ciudad.slug}`,
            inLanguage: "en",
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "GoFlatt", item: "https://goflatt.com" },
                { "@type": "ListItem", position: 2, name: "Cities", item: "https://goflatt.com/city" },
                { "@type": "ListItem", position: 3, name: ciudad.nombre, item: `https://goflatt.com/city/${ciudad.slug}` },
              ],
            },
            mainEntity: {
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: `How do I find Erasmus roommates in ${ciudad.nombre}?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `With GoFlatt you can find Erasmus roommates in ${ciudad.nombre} in less than 5 minutes. Create your free profile, set your budget and arrival date, and browse groups of compatible students already forming in ${ciudad.nombre}.`,
                  },
                },
                {
                  "@type": "Question",
                  name: `How much does it cost to live in ${ciudad.nombre} as an Erasmus student?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Active groups on GoFlatt for ${ciudad.nombre} have budgets ranging from €400 to €900/month per person in shared flats. The price depends on the neighborhood and number of flatmates.`,
                  },
                },
                {
                  "@type": "Question",
                  name: `When should I start looking for flatmates for Erasmus in ${ciudad.nombre}?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `We recommend starting 3-4 months before arriving in ${ciudad.nombre}. With GoFlatt you form your group first, then search for a flat together — which is much faster and less stressful.`,
                  },
                },
                {
                  "@type": "Question",
                  name: "Is GoFlatt free?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes, GoFlatt is 100% free. No credit card, no subscription, no hidden fees. Just sign in with Google and start browsing groups.",
                  },
                },
              ],
            },
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
            {ciudad.pais} · {gruposActivos > 0 ? `${gruposActivos} open groups right now` : `${ciudad.grupos} active groups`}
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 6vw, 64px)", fontWeight: 900,
            letterSpacing: "-2px", lineHeight: 1.05, marginBottom: "20px",
          }}>
            Find Erasmus Roommates<br />
            <span style={{ color: "#e8845a" }}>in {ciudad.nombre}</span>
          </h1>

          <p style={{
            fontSize: "clamp(15px, 2vw, 18px)", color: "#666",
            lineHeight: 1.7, maxWidth: "560px", margin: "0 auto 16px",
          }}>
            Going to {ciudad.nombre} for Erasmus and don't have flatmates yet?
            On GoFlatt you form your group <strong style={{ color: "#1e3a4a" }}>before you even pack your bags.</strong> No WhatsApp chaos, no fake profiles.
          </p>

          <p style={{ fontSize: "14px", color: "#999", marginBottom: "40px" }}>
            <strong style={{ color: "#e8845a" }}>
              {gruposActivos > 0 ? gruposActivos : ciudad.grupos} open groups
            </strong> in {ciudad.nombre} right now ·{" "}
            {estudiantesRegistrados > 0 ? `${estudiantesRegistrados} students registered` : `${ciudad.estudiantes} international students/year`}
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/login" style={{
              background: "linear-gradient(135deg, #1e3a4a, #2a5568)",
              color: "white", fontWeight: 700, padding: "18px 40px",
              borderRadius: "100px", textDecoration: "none", fontSize: "16px",
              boxShadow: "0 8px 32px rgba(30,58,74,0.3)",
            }}>
              Browse Groups in {ciudad.nombre} →
            </a>
            <a href="/login" style={{
              background: "white", color: "#1e3a4a", fontWeight: 500,
              padding: "18px 40px", borderRadius: "100px",
              textDecoration: "none", fontSize: "16px",
              border: "1.5px solid #e8e8e8",
            }}>
              Create My Group
            </a>
          </div>
        </div>
      </section>

      {/* STATS DINÁMICOS */}
      <section style={{ background: "white", padding: "60px 24px" }}>
        <div style={{
          maxWidth: "800px", margin: "0 auto",
          display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
          gap: "24px", textAlign: "center",
        }}>
          {[
            {
              num: gruposActivos > 0 ? gruposActivos : ciudad.grupos,
              label: "open groups",
              sub: `looking for flatmates in ${ciudad.nombre}`
            },
            {
              num: estudiantesRegistrados > 0 ? estudiantesRegistrados : ciudad.estudiantes,
              label: "students registered",
              sub: `interested in ${ciudad.nombre}`
            },
            { num: "<5min", label: "to find your group", sub: "average on GoFlatt" },
          ].map((s, i) => (
            <div key={i} style={{
              background: "#f8f9ff", borderRadius: "20px",
              padding: "28px 20px", border: "1.5px solid #eef0f8",
            }}>
              <div style={{
                fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900,
                color: "#e8845a", letterSpacing: "-1px", marginBottom: "8px",
              }}>{s.num}</div>
              <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e3a4a", marginBottom: "4px" }}>{s.label}</div>
              <div style={{ fontSize: "12px", color: "#999" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* GRUPOS PREVIEW — datos reales de Supabase */}
      {gruposPreview.length > 0 && (
        <section style={{ background: "#f8f9ff", padding: "60px 24px" }}>
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <h2 style={{
              fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900,
              letterSpacing: "-0.5px", marginBottom: "8px", color: "#1e3a4a",
              textAlign: "center",
            }}>
              Open groups in {ciudad.nombre} right now
            </h2>
            <p style={{ textAlign: "center", color: "#999", fontSize: "15px", marginBottom: "32px" }}>
              Sign up to see your compatibility score with each group
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {gruposPreview.map((g, i) => (
                <div key={g.id} style={{
                  background: "white", borderRadius: "16px",
                  padding: "18px 20px", border: "1.5px solid #eef0f8",
                  display: "flex", alignItems: "center", gap: "16px",
                }}>
                  <div style={{
                    width: "44px", height: "44px", borderRadius: "12px",
                    background: ["#e8845a", "#5aacb8", "#1e3a4a", "#9b59b6", "#2ecc71"][i % 5],
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 700, fontSize: "16px", flexShrink: 0,
                  }}>
                    {g.creador?.nombre?.charAt(0).toUpperCase() || "?"}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: "14px", fontWeight: 700, color: "#1e3a4a", marginBottom: "3px" }}>
                      {g.cuantos_somos} {g.cuantos_somos === 1 ? "person" : "people"} looking for {g.cuantos_buscamos} more in {ciudad.nombre}
                    </div>
                    <div style={{ fontSize: "12px", color: "#999" }}>
                      {g.presupuesto_max ? `€${g.presupuesto_min || ""}${g.presupuesto_min ? "–" : "Up to €"}${g.presupuesto_max}/mo` : "Budget to agree"} · {g.semestre || "Next semester"}
                    </div>
                  </div>
                  <div style={{
                    background: "rgba(46,204,113,0.1)", border: "1px solid rgba(46,204,113,0.25)",
                    borderRadius: "100px", padding: "4px 10px",
                    fontSize: "11px", fontWeight: 700, color: "#27ae60", flexShrink: 0,
                  }}>
                    {g.cuantos_buscamos} {g.cuantos_buscamos === 1 ? "spot" : "spots"} left
                  </div>
                </div>
              ))}
            </div>
            <div style={{ textAlign: "center", marginTop: "24px" }}>
              <a href="/login" style={{
                display: "inline-block",
                background: "linear-gradient(135deg, #e8845a, #d46b3f)",
                color: "white", fontWeight: 700, padding: "14px 32px",
                borderRadius: "100px", textDecoration: "none", fontSize: "14px",
              }}>
                See all groups + compatibility score →
              </a>
            </div>
          </div>
        </section>
      )}

      {/* WHY GOFLATT */}
      <section style={{ background: "white", padding: "80px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 900,
            letterSpacing: "-1px", marginBottom: "12px", color: "#1e3a4a",
          }}>
            Stop searching on WhatsApp.<br />Start finding.
          </h2>
          <p style={{ color: "#888", fontSize: "16px", marginBottom: "48px" }}>
            Finding Erasmus flatmates in {ciudad.nombre} shouldn't be this hard.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
            {[
              {
                icon: "😩",
                title: "The WhatsApp problem",
                desc: `200 messages, nobody agrees, and the best flats in ${ciudad.nombre} are gone while you're still forming your group.`
              },
              {
                icon: "✅",
                title: "The GoFlatt solution",
                desc: `Filter by budget, lifestyle and university. You only connect with people who actually match you in ${ciudad.nombre}.`
              },
              {
                icon: "⚡",
                title: "Under 5 minutes",
                desc: "Sign in with Google, create your profile and browse real groups looking for someone like you. No endless forms."
              },
            ].map((f, i) => (
              <div key={i} style={{
                display: "flex", gap: "16px", alignItems: "flex-start",
                background: "#f8f9ff", borderRadius: "16px",
                padding: "20px 24px", border: "1.5px solid #eef0f8",
              }}>
                <div style={{ fontSize: "28px", flexShrink: 0 }}>{f.icon}</div>
                <div>
                  <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#1e3a4a", marginBottom: "6px" }}>{f.title}</h3>
                  <p style={{ color: "#888", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ background: "#f8f9ff", padding: "80px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 900,
            letterSpacing: "-1px", marginBottom: "12px", color: "#1e3a4a",
          }}>
            From zero to group in {ciudad.nombre}<br />in less than 5 minutes
          </h2>
          <p style={{ color: "#888", fontSize: "16px", marginBottom: "48px" }}>
            No drama, no endless registration, no fake profiles.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", textAlign: "left" }}>
            {[
              { step: "01", emoji: "🚀", title: "Sign in free with Google", desc: "No passwords, no forms. You're in in 10 seconds." },
              { step: "02", emoji: "👤", title: "Create your Erasmus profile", desc: `University, budget, lifestyle. Just the essentials to find the right group in ${ciudad.nombre}.` },
              { step: "03", emoji: "🔍", title: `Browse groups in ${ciudad.nombre}`, desc: "See real groups with budget, vibe and your compatibility score. Filter by neighborhood and arrival date." },
              { step: "04", emoji: "🎉", title: "Match and find a flat together", desc: `When there's a match we connect you. From there you search for a flat in ${ciudad.nombre} as a team.` },
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
                  <div style={{ fontSize: "18px", marginBottom: "4px" }}>{s.emoji}</div>
                  <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#1e3a4a", marginBottom: "4px" }}>{s.title}</h3>
                  <p style={{ color: "#888", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "white", padding: "80px 24px" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <h2 style={{
            fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900,
            letterSpacing: "-1px", marginBottom: "40px", color: "#1e3a4a",
            textAlign: "center",
          }}>
            Everything you need to know about<br />finding an Erasmus flat in {ciudad.nombre}
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {[
              {
                q: `How do I find Erasmus roommates in ${ciudad.nombre}?`,
                a: `With GoFlatt it's super easy. Create your free profile, set your budget and when you arrive in ${ciudad.nombre}, and the algorithm shows you compatible groups. Send a message to request joining — if there's a match, we connect you.`,
              },
              {
                q: `How much does it cost to live in ${ciudad.nombre} as an Erasmus student?`,
                a: `Active groups on GoFlatt for ${ciudad.nombre} have budgets ranging from €400 to €900/month per person in shared flats. Price varies a lot by neighborhood — city center is always more expensive. Best to filter by budget directly on the platform.`,
              },
              {
                q: `When should I start looking for a flat for Erasmus in ${ciudad.nombre}?`,
                a: `As early as possible. Flats in ${ciudad.nombre} go fast, especially for September. We recommend starting 3-4 months before arriving. With GoFlatt you form your group first and then search for a flat together — much faster and less stressful.`,
              },
              {
                q: "Is GoFlatt free?",
                a: "Yes, 100% free. No credit card, no subscription, no small print. Just sign in with Google and you can see all open groups in your city.",
              },
              {
                q: `What makes GoFlatt different from WhatsApp groups for Erasmus in ${ciudad.nombre}?`,
                a: `In WhatsApp you don't know who you'll be living with until it's too late. GoFlatt shows you each person's full profile — university, budget, lifestyle — and calculates your compatibility % before you even contact each other. No surprises.`,
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
                <p style={{ color: "#666", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
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
            letterSpacing: "-0.5px", marginBottom: "8px", color: "#1e3a4a",
            textAlign: "center",
          }}>
            Not sure which city you're going to?
          </h2>
          <p style={{ textAlign: "center", color: "#999", fontSize: "15px", marginBottom: "32px" }}>
            Add multiple destinations and we'll show you groups in all of them
          </p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: "12px",
          }}>
            {ciudadesRelacionadas.map((c, i) => (
              <Link key={i} href={`/city/${c.slug}`} style={{
                background: "white", borderRadius: "16px",
                padding: "20px 16px", textAlign: "center",
                textDecoration: "none", border: "1.5px solid #eef0f8",
                display: "block",
              }}>
                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{c.flag}</div>
                <div style={{ fontWeight: 700, fontSize: "14px", color: "#1e3a4a", marginBottom: "4px" }}>{c.nombre}</div>
                <div style={{ fontSize: "11px", color: "#e8845a", fontWeight: 600 }}>{c.grupos} active groups</div>
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
          {gruposActivos > 0 ? gruposActivos : ciudad.grupos} groups waiting for you in {ciudad.nombre}
        </p>
        <h2 style={{
          fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900,
          color: "white", letterSpacing: "-1.5px",
          lineHeight: 1.1, marginBottom: "16px",
        }}>
          Your Erasmus in {ciudad.nombre}<br />
          <span style={{ color: "#e8845a" }}>is better with the right crew.</span>
        </h2>
        <p style={{
          color: "rgba(255,255,255,0.6)", fontSize: "16px",
          marginBottom: "36px", maxWidth: "400px", margin: "0 auto 36px",
        }}>
          Free. No credit card. Under 5 minutes.
        </p>
        <a href="/login" style={{
          display: "inline-block",
          background: "linear-gradient(135deg, #e8845a, #d46b3f)",
          color: "white", fontWeight: 700, padding: "18px 48px",
          borderRadius: "100px", textDecoration: "none", fontSize: "16px",
          boxShadow: "0 8px 40px rgba(232,132,90,0.4)",
        }}>
          Find Roommates in {ciudad.nombre} →
        </a>
      </section>

      <Footer />
    </main>
  );
}