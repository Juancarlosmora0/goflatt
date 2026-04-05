"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import styles from "./login.module.css";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
  access_type: "offline",
  prompt: "select_account",
},
      },
    });
    if (error) {
      setError("Error al iniciar sesión. Inténtalo de nuevo.");
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>

      {/* ===== IZQUIERDA ===== */}
      <div className={styles.left}>
        <div className={styles.blob1} />
        <div className={styles.blob2} />

        {/* Logo */}
        <div className={styles.leftLogo}>
          <a href="/">
            <Image
              src="/logo.png"
              alt="GoFlatt"
              width={160}
              height={48}
              style={{ height: "34px", width: "auto", objectFit: "contain", filter: "brightness(0) invert(1)" }}
            />
          </a>
        </div>

        {/* Contenido */}
        <div className={styles.leftContent}>
          <h2 className={styles.leftTitle}>
            Tu próximo grupo<br />
            <span className={styles.leftTitleAccent}>empieza aquí.</span>
          </h2>
          <p className={styles.leftDesc}>
            Miles de estudiantes Erasmus, de máster e intercambio ya encontraron sus compañeros de piso antes de llegar.
          </p>

          {/* Stats */}
          <div className={styles.stats}>
            {[
              { num: "+240", label: "grupos formados" },
              { num: "6", label: "ciudades activas" },
              { num: "4.9★", label: "valoración" },
            ].map((s, i) => (
              <div key={i}>
                <div className={styles.statNum}>{s.num}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* iPhone Mockup */}
          <div className={styles.mockupWrap}>
            <div className={styles.iphone}>
              <div className={styles.iphoneNotch} />
              <div className={styles.iphoneScreen}>

                {/* Header app */}
                <div className={styles.iphoneHeader}>
                  <div className={styles.iphoneAppIcon}>gf</div>
                  <div className={styles.iphoneAppName}>GoFlatt</div>
                  <div className={styles.iphoneTime}>ahora</div>
                </div>

                {/* Notificación de match */}
                <div className={styles.iphoneNotification}>
                  <div className={styles.iphoneNotifTitle}>🎉 ¡Tienes un match!</div>
                  <div className={styles.iphoneNotifBody}>
                    Sara ha aceptado tu solicitud para el grupo en Milán.
                  </div>
                  <div className={styles.iphoneMatchBadge}>
                    ✓ Match confirmado
                  </div>
                </div>

                {/* Card grupo */}
                <div className={styles.iphoneGroup}>
                  <div className={styles.iphoneGroupTitle}>Grupo Milán · 1 plaza libre</div>
                  <div className={styles.iphoneGroupSub}>500–700€/mes · Centro · Tranquilo</div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Testimonio */}
        <div className={styles.testimonial}>
          <p className={styles.testimonialText}>
            "Encontré a mis dos compañeras de piso en menos de una semana. Imposible haberlo hecho tan rápido por WhatsApp."
          </p>
          <div className={styles.testimonialAuthor}>
            <div className={styles.testimonialAvatar}>S</div>
            <div>
              <div className={styles.testimonialName}>Sara M.</div>
              <div className={styles.testimonialUni}>Máster en Milán · UC3M</div>
            </div>
            <div className={styles.testimonialStars}>★★★★★</div>
          </div>
        </div>
      </div>

      {/* ===== DERECHA ===== */}
      <div className={styles.right}>
        <div className={styles.formWrap}>
          {/* Logo móvil */}
<div style={{ marginBottom: "32px", display: "block" }}>
  <a href="/">
    <Image
      src="/logo.png"
      alt="GoFlatt"
      width={140}
      height={44}
      style={{ height: "32px", width: "auto", objectFit: "contain" }}
    />
  </a>
</div>

          {/* Volver */}
          <a href="/" className={styles.backLink}>
            ← Volver al inicio
          </a>

          {/* Header */}
          <div className={styles.formHeader}>
            <h1 className={styles.formTitle}>Bienvenido/a 👋</h1>
            <p className={styles.formSubtitle}>
              Accede con Google y empieza a encontrar tu grupo de piso ideal.
            </p>
          </div>

          {/* Features */}
          <div className={styles.featuresList}>
            {[
              { icon: "🔍", title: "Grupos reales", desc: "Ve quiénes ya están y cuántas plazas quedan" },
              { icon: "🎯", title: "Compatibilidad real", desc: "Filtra por presupuesto y estilo de vida" },
              { icon: "⚡", title: "En 5 minutos", desc: "Sin formularios eternos ni perfiles falsos" },
            ].map((f, i) => (
              <div key={i} className={styles.featureItem}>
                <div className={styles.featureIcon}>{f.icon}</div>
                <div>
                  <div className={styles.featureTitle}>{f.title}</div>
                  <div className={styles.featureDesc}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className={styles.divider}>
            <div className={styles.dividerLine} />
            accede con tu cuenta
            <div className={styles.dividerLine} />
          </div>

          {/* Google Button */}
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "24px 0" }}>
              <div className={styles.spinner} />
              <span style={{ fontSize: "14px", color: "#999" }}>Conectando con Google...</span>
            </div>
          ) : (
            <button onClick={handleGoogleLogin} className={styles.btnGoogle}>
              <svg width="20" height="20" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continuar con Google
            </button>
          )}

          {error && <p className={styles.errorMsg}>{error}</p>}

          {/* Trust */}
          <div className={styles.trustRow}>
            {[
              { icon: "🔒", text: "Seguro" },
              { icon: "⚡", text: "Gratis" },
              { icon: "🌍", text: "+240 estudiantes" },
            ].map((t, i) => (
              <div key={i} className={styles.trustItem}>
                <span>{t.icon}</span>
                <span>{t.text}</span>
              </div>
            ))}
          </div>

          {/* Legal */}
          <p className={styles.legal}>
            Al continuar aceptas nuestros{" "}
            <a href="/terms" className={styles.legalLink}>Términos</a>
            {" "}y{" "}
            <a href="/privacy" className={styles.legalLink}>Privacidad</a>
          </p>

        </div>
      </div>
    </div>
  );
}