import Image from "next/image";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Testimonios from "./components/Testimonios";
import styles from "./landing.module.css";

export const metadata = {
  title: "GoFlatt — Find Erasmus Roommates Before You Arrive",
  description:
    "Stop scrolling through chaotic WhatsApp groups. Find compatible flatmates for your Erasmus or exchange in Milan, Lisbon, Berlin, Amsterdam and more. Free.",
  alternates: {
    canonical: "https://goflatt.com",
  },
  openGraph: {
    title: "GoFlatt — Find Erasmus Roommates Before You Arrive",
    description: "Form your flat group with compatible students before arriving. No chaos. No fake profiles. Just real Erasmus students.",
    url: "https://goflatt.com",
    images: [{ url: "/api/og", width: 1200, height: 630 }],
  },
};

export default function Home() {
  return (
    <main style={{
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      background: "#fff",
      color: "#1e3a4a",
      overflowX: "hidden",
    }}>
      <Navbar />
      <h1 style={{
        position: "absolute", width: "1px", height: "1px",
        padding: 0, margin: "-1px", overflow: "hidden",
        clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0,
      }}>
        GoFlatt — Find Erasmus Roommates Before You Arrive
      </h1>

      {/* ===== HERO ===== */}
      <section className={styles.heroSection}>

        {/* IZQUIERDA */}
        <div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            background: "rgba(232,132,90,0.1)",
            border: "1px solid rgba(232,132,90,0.25)",
            borderRadius: "100px", padding: "8px 18px",
            fontSize: "13px", fontWeight: 600, color: "#e8845a",
            marginBottom: "32px",
          }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "#e8845a", display: "inline-block",
            }} />
            🔥 The app Erasmus students use to find flatmates
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 4vw, 64px)", fontWeight: 900,
            lineHeight: 1.05, letterSpacing: "-2px", marginBottom: "24px",
          }}>
            Your Erasmus starts<br />
            <span style={{ color: "#e8845a" }}>with the<br />right people.</span>
          </h1>

          <p style={{
            fontSize: "clamp(15px, 1.5vw, 18px)", color: "#666",
            lineHeight: 1.7, marginBottom: "12px", maxWidth: "480px",
          }}>
            Stop scrolling through endless WhatsApp groups.
            Find <strong style={{ color: "#1e3a4a" }}>compatible Erasmus flatmates</strong> before you even pack your bags.
          </p>

          <p style={{ fontSize: "13px", color: "#999", marginBottom: "40px" }}>
            Erasmus · Master's · Exchange · Internship abroad 🌍
          </p>

          <div style={{
            display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "48px",
          }}>
            <a href="/login" style={{
              background: "linear-gradient(135deg, #1e3a4a, #2a5568)",
              color: "white", fontWeight: 700, padding: "18px 40px",
              borderRadius: "100px", textDecoration: "none", fontSize: "16px",
              boxShadow: "0 8px 32px rgba(30,58,74,0.3)",
            }}>
              Find My Group →
            </a>
            <a href="#como-funciona" style={{
              background: "white", color: "#1e3a4a", fontWeight: 500,
              padding: "18px 40px", borderRadius: "100px",
              textDecoration: "none", fontSize: "16px",
              border: "1.5px solid #e8e8e8",
            }}>
              How it works
            </a>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div style={{ display: "flex" }}>
              {[["A","#e8845a"],["M","#5aacb8"],["S","#1e3a4a"],["K","#e8845a"],["R","#5aacb8"]].map(([l,c],i) => (
                <div key={i} style={{
                  width: "36px", height: "36px", borderRadius: "50%",
                  background: c, border: "3px solid white",
                  marginLeft: i > 0 ? "-8px" : "0",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontSize: "13px", fontWeight: 700,
                }}>{l}</div>
              ))}
            </div>
            <div>
              <p style={{ fontSize: "13px", color: "#555", fontWeight: 600, margin: 0 }}>
  +240 students already found their group
</p>
              <div style={{ display: "flex", gap: "2px", marginTop: "3px" }}>
                {"★★★★★".split("").map((s,i) => (
                  <span key={i} style={{ color: "#e8845a", fontSize: "13px" }}>{s}</span>
                ))}
                <span style={{ fontSize: "12px", color: "#999", marginLeft: "4px" }}>4.9/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* DERECHA — Imagen */}
        <div className={styles.heroImg}>
          <Image
            src="/img-hero.jpg"
            alt="Estudiantes encontrando grupo de piso con GoFlatt"
            fill
            style={{ objectFit: "cover", objectPosition: "center top" }}
            priority
          />
          <div className={styles.heroImgOverlay}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                background: "linear-gradient(135deg, #e8845a, #d46b3f)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "white", fontWeight: 700, fontSize: "16px", flexShrink: 0,
              }}>S</div>
              <div style={{ flex: 1 }}>
               <p style={{ margin: 0, fontSize: "13px", fontWeight: 700, color: "#1e3a4a" }}>
  Sara found her group in Milan
</p>
<p style={{ margin: 0, fontSize: "11px", color: "#999" }}>
  2 hours ago · 1 spot left
</p>
              </div>
              <div style={{
                background: "rgba(46,204,113,0.1)",
                border: "1px solid rgba(46,204,113,0.3)",
                borderRadius: "100px", padding: "4px 10px",
                fontSize: "11px", fontWeight: 700, color: "#27ae60",
              }}>✓ Match</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== EL PROBLEMA ===== */}
      <section className={styles.problemaSection}>
        <div className={styles.problemaImg}>
          <Image
            src="/img-problema.jpg"
            alt="Estudiantes buscando piso juntos"
            fill
            style={{ objectFit: "cover" }}
          />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to right, transparent, #1e3a4a)",
          }} />
        </div>

        <div className={styles.problemaTexto}>
          <p style={{
  fontSize: "12px", fontWeight: 700, color: "#5aacb8",
  letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px",
}}>Sound familiar?</p>

<h2 style={{
  fontSize: "clamp(22px, 3vw, 38px)", fontWeight: 900,
  color: "white", letterSpacing: "-1px",
  lineHeight: 1.2, marginBottom: "40px",
}}>
  "Erasmus Milan group 🇮🇹<br />
  <span style={{ color: "#e8845a" }}>anyone for a flat? 3 of us... or 2... 🤦"</span>
</h2>

{[
  { icon: "😩", text: "200 messages with no answer on WhatsApp" },
  { icon: "👻", text: "Fake profiles or people who ghost you" },
  { icon: "🤷", text: "No filters — you don't know who you'll live with" },
  { icon: "⏰", text: "Flats run out while you're still forming your group" },
].map((p, i) => (
  <div key={i} style={{
    display: "flex", alignItems: "center", gap: "16px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "14px", padding: "14px 18px",
  }}>
    <span style={{ fontSize: "22px", flexShrink: 0 }}>{p.icon}</span>
    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.8)", margin: 0, lineHeight: 1.5 }}>
      {p.text}
    </p>
  </div>
))}
<p style={{
  fontSize: "17px", color: "white", fontWeight: 700, marginTop: "28px",
}}>
  GoFlatt fixes it in under 5 minutes. 🚀
</p>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section style={{ padding: "80px 24px", background: "white" }}>
        <div className={styles.statsGrid}>
          {[
            { num: "+240", label: "groups formed", sub: "this semester" },
{ num: "+6", label: "active cities", sub: "across Europe" },
{ num: "4.9★", label: "average rating", sub: "from our users" },
{ num: "<5min", label: "to find your group", sub: "on average" },
          ].map((s,i) => (
            <div key={i} style={{ padding: "16px" }}>
              <div style={{
                fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 900,
                color: "#e8845a", letterSpacing: "-1px", marginBottom: "8px",
              }}>{s.num}</div>
              <div style={{ fontSize: "15px", fontWeight: 700, color: "#1e3a4a", marginBottom: "4px" }}>
                {s.label}
              </div>
              <div style={{ fontSize: "12px", color: "#999" }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className={styles.featuresSection}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "64px" }}>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900,
              letterSpacing: "-1px", marginBottom: "16px", color: "#1e3a4a",
            }}>
              Stop searching on WhatsApp. Start finding.
            </h2>
            <p style={{ color: "#888", fontSize: "17px", maxWidth: "500px", margin: "0 auto" }}>
              Everything you need to find your perfect Erasmus flatmates
            </p>
          </div>

          <div className={styles.featuresInner}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {[
               { icon: "👥", title: "Real groups, not random profiles", desc: "See already-formed groups looking for 1, 2 or 3 more people. No ghost profiles, no endless swiping.", tag: "Why #1" },
{ icon: "🎯", title: "Compatibility before you even talk", desc: "Filter by budget, lifestyle and city. You only contact people who actually match you.", tag: "Why #2" },
{ icon: "⚡", title: "No long forms, no drama", desc: "Sign in with Google in 10 seconds. Basic profile in 2 minutes. Groups available instantly.", tag: "Why #3" },
              ].map((f,i) => (
                <div key={i} style={{
                  background: "white", borderRadius: "20px", padding: "24px",
                  border: "1.5px solid #eef0f8",
                  display: "flex", gap: "16px", alignItems: "flex-start",
                }}>
                  <div style={{
                    width: "48px", height: "48px", borderRadius: "14px",
                    background: "rgba(232,132,90,0.1)", display: "flex",
                    alignItems: "center", justifyContent: "center",
                    fontSize: "22px", flexShrink: 0,
                  }}>{f.icon}</div>
                  <div>
                    <div style={{
                      fontSize: "10px", fontWeight: 700, color: "#e8845a",
                      letterSpacing: "1px", textTransform: "uppercase", marginBottom: "6px",
                    }}>{f.tag}</div>
                    <h3 style={{
                      fontSize: "16px", fontWeight: 800, color: "#1e3a4a",
                      marginBottom: "8px",
                    }}>{f.title}</h3>
                    <p style={{ color: "#888", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.featuresImg}>
              <Image
                src="/img-features.jpg"
                alt="Estudiantes usando GoFlatt"
                fill
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== CÓMO FUNCIONA ===== */}
      <section id="como-funciona" style={{ padding: "100px 24px", background: "white" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900,
            letterSpacing: "-1px", marginBottom: "16px", color: "#1e3a4a",
          }}>
            From zero to group in less than 5 minutes
          </h2>
          <p style={{ color: "#888", fontSize: "16px", marginBottom: "56px" }}>
            No drama. No endless registration.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
            {[
              { step: "01", emoji: "🌍", title: "Pick your city and when you arrive", desc: "Milan, Lisbon, Berlin, Amsterdam... Select your destination and semester." },
{ step: "02", emoji: "👤", title: "Create your profile in 2 minutes", desc: "Just the essentials: budget, lifestyle, university. No endless forms." },
{ step: "03", emoji: "🔍", title: "Browse groups or create yours", desc: "See groups looking for someone like you. Or post yours and receive requests." },
{ step: "04", emoji: "🎉", title: "Connect and start the adventure", desc: "When there's a match, we connect you. From there, it's up to you." },
            ].map((s,i) => (
              <div key={i} style={{
                display: "flex", gap: "20px", alignItems: "flex-start",
                background: "#f8f9ff", borderRadius: "20px",
                padding: "24px 28px", border: "1.5px solid #eef0f8",
              }}>
                <div style={{
                  minWidth: "52px", height: "52px",
                  background: "linear-gradient(135deg, #1e3a4a, #2a5568)",
                  borderRadius: "16px", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: 900, fontSize: "13px", flexShrink: 0,
                }}>{s.step}</div>
                <div>
                  <div style={{ fontSize: "18px", marginBottom: "6px" }}>{s.emoji}</div>
                  <h4 style={{
                    fontSize: "16px", fontWeight: 800, color: "#1e3a4a", marginBottom: "6px",
                  }}>{s.title}</h4>
                  <p style={{ color: "#888", fontSize: "14px", lineHeight: 1.6, margin: 0 }}>
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CIUDADES ===== */}
      <section id="ciudades" style={{ padding: "100px 24px", background: "#f8f9ff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "56px" }}>
            <h2 style={{
              fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900,
              letterSpacing: "-1px", marginBottom: "16px", color: "#1e3a4a",
            }}>
              Already active in +6 cities
            </h2>
            <p style={{ color: "#888", fontSize: "16px" }}>
              Where the most international students land every semester
            </p>
          </div>

          <div className={styles.ciudadesGrid}>
            {[
              { flag: "🇮🇹", city: "Milan", groups: "34 groups", hot: true },
{ flag: "🇵🇹", city: "Lisbon", groups: "28 groups", hot: true },
{ flag: "🇩🇪", city: "Berlin", groups: "21 groups", hot: false },
{ flag: "🇳🇱", city: "Amsterdam", groups: "19 groups", hot: false },
{ flag: "🇫🇷", city: "Paris", groups: "17 groups", hot: false },
{ flag: "🇨🇿", city: "Prague", groups: "15 groups", hot: false },

            ].map((c,i) => (
              <a key={i} href="/login" style={{
                background: "white", border: "1.5px solid #eef0f8",
                borderRadius: "20px", padding: "24px 16px",
                textAlign: "center", textDecoration: "none",
                display: "block", position: "relative", overflow: "hidden",
              }}>
                {c.hot && (
                  <div style={{
                    position: "absolute", top: "10px", right: "10px",
                    background: "#e8845a", color: "white",
                    fontSize: "9px", fontWeight: 700,
                    padding: "2px 7px", borderRadius: "100px",
                  }}>HOT</div>
                )}
                <div style={{ fontSize: "32px", marginBottom: "10px" }}>{c.flag}</div>
                <div style={{ fontWeight: 800, fontSize: "14px", color: "#1e3a4a", marginBottom: "4px" }}>
                  {c.city}
                </div>
                <div style={{ fontSize: "12px", color: "#e8845a", fontWeight: 700 }}>
                  {c.groups}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIOS ===== */}
      <Testimonios />

      {/* ===== CTA FINAL ===== */}
      <section style={{
        position: "relative", overflow: "hidden",
        minHeight: "500px", display: "flex", alignItems: "center",
      }}>
        <Image
          src="/img-ciudad.jpg"
          alt="Estudiantes en Europa con GoFlatt"
          fill
          style={{ objectFit: "cover" }}
        />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(135deg, rgba(30,58,74,0.92), rgba(30,58,74,0.75))",
        }} />
        <div style={{
          position: "relative", zIndex: 1,
          width: "100%", textAlign: "center", padding: "80px 24px",
        }}>
          <p style={{
            fontSize: "12px", fontWeight: 700, color: "#5aacb8",
            letterSpacing: "2px", textTransform: "uppercase", marginBottom: "20px",
          }}>
            Your next adventure starts here
          </p>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 900,
            color: "white", letterSpacing: "-2px",
            lineHeight: 1.1, marginBottom: "20px",
          }}>
            Ready to find<br />
            <span style={{ color: "#e8845a" }}>your people?</span>
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.7)", fontSize: "17px",
            marginBottom: "40px", maxWidth: "400px", margin: "0 auto 40px",
          }}>
            Free. No credit card. Under 5 minutes.
          </p>
          <a href="/login" style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #e8845a, #d46b3f)",
            color: "white", fontWeight: 700, padding: "20px 52px",
            borderRadius: "100px", textDecoration: "none", fontSize: "17px",
            boxShadow: "0 8px 40px rgba(232,132,90,0.45)",
          }}>
            Start for free →
          </a>
          <p style={{
            color: "rgba(255,255,255,0.4)", fontSize: "13px", marginTop: "20px",
          }}>
            +240 students are already inside 🎓
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}