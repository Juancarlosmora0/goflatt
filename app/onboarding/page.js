"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import styles from "./onboarding.module.css";

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const totalSteps = 5;

  const [data, setData] = useState({
    intencion: "",
    ciudad: "",
    cuando: "",
    nombre: "",
    edad: "",
    genero: "",
    vidasocial: "",
    limpieza: "",
    ruido: "",
    intereses: [],
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      // Pre-rellenar nombre si viene de Google
      if (user.user_metadata?.full_name) {
        setData(prev => ({ ...prev, nombre: user.user_metadata.full_name.split(" ")[0] }));
      }
    };
    getUser();
  }, []);

  const update = (key, value) => setData(prev => ({ ...prev, [key]: value }));

  const toggleInteres = (interes) => {
    setData(prev => ({
      ...prev,
      intereses: prev.intereses.includes(interes)
        ? prev.intereses.filter(i => i !== interes)
        : [...prev.intereses, interes]
    }));
  };

  const guardarPerfil = async () => {
    if (!user) return;
    setLoading(true);

    try {
      const { error } = await supabase
  .from("perfiles")
  .upsert({
    id: user.id,
    nombre: data.nombre,
    edad: data.edad ? parseInt(data.edad) : null,
    genero: data.genero,
    ciudad: data.ciudad,
    semestre: data.cuando,
    programa: data.intencion,
    bio: "",
    estilo: [data.vidasocial, data.limpieza, data.ruido].filter(Boolean),
    email: user.email, 
  });

      if (error) {
        console.error("Error guardando perfil:", error);
      } else {
        router.push("/feed");
      }
    } catch (e) {
      console.error("Error:", e);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < totalSteps - 1) setStep(step + 1);
    else guardarPerfil();
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
    else router.push("/");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.logo} onClick={() => router.push("/")}>
        goflatt
      </div>

      <div className={styles.card}>

        {/* PROGRESS */}
        {step > 0 && (
          <div className={styles.progressBar}>
            {Array.from({ length: totalSteps }).map((_, i) => (
              <div key={i} className={`${styles.progressDot} ${
                i < step ? styles.progressDone :
                i === step ? styles.progressActive : ""
              }`} />
            ))}
          </div>
        )}

        {step > 0 && (
          <button className={styles.btnBack} onClick={prevStep}>
            ← Volver
          </button>
        )}

        {/* STEP 0 — INTENCIÓN */}
        {step === 0 && (
          <>
            <div className={styles.welcomeBadge}>👋 Bienvenido/a a GoFlatt</div>
            <h2 className={styles.stepTitle}>¿Qué estás<br />buscando?</h2>
            <p className={styles.stepSub}>Cuéntanos qué necesitas y te lo ponemos fácil</p>
            <div className={styles.intentionGrid}>
              {[
                { key: "unirse", emoji: "🔍", title: "Unirme a un grupo", sub: "Hay grupos buscando personas como tú" },
                { key: "crear", emoji: "➕", title: "Crear un grupo", sub: "Tengo amigos y busco completar el grupo" },
                { key: "explorar", emoji: "👀", title: "Explorar primero", sub: "Quiero ver qué hay antes de decidir" },
              ].map(i => (
                <div
                  key={i.key}
                  className={`${styles.intentionCard} ${data.intencion === i.key ? styles.intentionCardSelected : ""}`}
                  onClick={() => { update("intencion", i.key); setTimeout(nextStep, 300); }}
                >
                  <div className={styles.intentionEmoji}>{i.emoji}</div>
                  <div>
                    <div className={styles.intentionTitle}>{i.title}</div>
                    <div className={styles.intentionSub}>{i.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* STEP 1 — CIUDAD */}
        {step === 1 && (
          <>
            <div className={styles.stepNumber}>Paso 1 de 4</div>
            <h2 className={styles.stepTitle}>¿A dónde<br />te mudas?</h2>
            <p className={styles.stepSub}>Filtramos todo por tu ciudad y fecha</p>
            <div className={styles.cityGrid}>
              {[
                { key: "Milan", flag: "🇮🇹", name: "Milán", count: "34 grupos" },
                { key: "Lisboa", flag: "🇵🇹", name: "Lisboa", count: "28 grupos" },
                { key: "Berlin", flag: "🇩🇪", name: "Berlín", count: "21 grupos" },
                { key: "Amsterdam", flag: "🇳🇱", name: "Ámsterdam", count: "19 grupos" },
                { key: "Paris", flag: "🇫🇷", name: "París", count: "17 grupos" },
                { key: "Praga", flag: "🇨🇿", name: "Praga", count: "15 grupos" },
              ].map(c => (
                <div
                  key={c.key}
                  className={`${styles.cityCard} ${data.ciudad === c.key ? styles.cityCardSelected : ""}`}
                  onClick={() => update("ciudad", c.key)}
                >
                  <div className={styles.cityFlag}>{c.flag}</div>
                  <div className={styles.cityName}>{c.name}</div>
                  <div className={styles.cityCount}>{c.count}</div>
                </div>
              ))}
            </div>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>¿Cuándo llegas?</label>
              <div className={styles.semestreGrid}>
                {[
                  { key: "1c2025", label: "1er cuatrimestre 2025", sub: "Sep — Ene" },
                  { key: "2c2026", label: "2º cuatrimestre 2026", sub: "Feb — Jul" },
                  { key: "1c2026", label: "1er cuatrimestre 2026", sub: "Sep — Ene" },
                  { key: "2c2027", label: "2º cuatrimestre 2027", sub: "Feb — Jul" },
                ].map(s => (
                  <div
                    key={s.key}
                    className={`${styles.semCard} ${data.cuando === s.key ? styles.semCardSelected : ""}`}
                    onClick={() => update("cuando", s.key)}
                  >
                    <div className={styles.semTitle}>{s.label}</div>
                    <div className={styles.semSub}>{s.sub}</div>
                  </div>
                ))}
              </div>
            </div>
            <button
              className={styles.btnPrimary}
              onClick={nextStep}
              disabled={!data.ciudad || !data.cuando}
            >
              Continuar →
            </button>
          </>
        )}

        {/* STEP 2 — PERFIL */}
        {step === 2 && (
          <>
            <div className={styles.stepNumber}>Paso 2 de 4</div>
            <h2 className={styles.stepTitle}>Cuéntanos<br />quién eres</h2>
            <p className={styles.stepSub}>Solo lo esencial. Rápido y sin rollos.</p>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Tu nombre</label>
              <input
                className={styles.fieldInput}
                type="text"
                placeholder="¿Cómo te llamas?"
                value={data.nombre}
                onChange={e => update("nombre", e.target.value)}
                autoFocus
              />
            </div>
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel}>Edad</label>
                <input
                  className={styles.fieldInput}
                  type="number"
                  placeholder="22"
                  value={data.edad}
                  onChange={e => update("edad", e.target.value)}
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.fieldLabel}>Género</label>
                <select
                  className={styles.fieldInput}
                  value={data.genero}
                  onChange={e => update("genero", e.target.value)}
                >
                  <option value="">Selecciona</option>
                  <option value="hombre">Hombre</option>
                  <option value="mujer">Mujer</option>
                  <option value="otro">Prefiero no decir</option>
                </select>
              </div>
            </div>
            <button
              className={styles.btnPrimary}
              onClick={nextStep}
              disabled={!data.nombre}
            >
              Continuar →
            </button>
          </>
        )}

        {/* STEP 3 — ESTILO DE VIDA */}
        {step === 3 && (
          <>
            <div className={styles.stepNumber}>Paso 3 de 4</div>
            <h2 className={styles.stepTitle}>¿Cómo eres<br />en casa?</h2>
            <p className={styles.stepSub}>Esto nos ayuda a encontrarte gente compatible</p>
            <div className={styles.lifeSection}>
              <label className={styles.fieldLabel}>Vida social</label>
              <div className={styles.chipsRow}>
                {[
                  { key: "fiesta", label: "🎉 Fiesta frecuente" },
                  { key: "equilibrado", label: "⚖️ Equilibrado" },
                  { key: "chill", label: "🛋️ Chill en casa" },
                ].map(c => (
                  <div
                    key={c.key}
                    className={`${styles.chip} ${data.vidasocial === c.key ? styles.chipSelected : ""}`}
                    onClick={() => update("vidasocial", c.key)}
                  >
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.lifeSection}>
              <label className={styles.fieldLabel}>Limpieza</label>
              <div className={styles.chipsRow}>
                {[
                  { key: "muy", label: "✨ Muy limpio/a" },
                  { key: "normal", label: "👍 Normal" },
                  { key: "relajado", label: "😌 Relajado/a" },
                ].map(c => (
                  <div
                    key={c.key}
                    className={`${styles.chip} ${data.limpieza === c.key ? styles.chipSelected : ""}`}
                    onClick={() => update("limpieza", c.key)}
                  >
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.lifeSection}>
              <label className={styles.fieldLabel}>Ruido en casa</label>
              <div className={styles.chipsRow}>
                {[
                  { key: "silencio", label: "🤫 Silencio total" },
                  { key: "moderado", label: "🎵 Moderado" },
                  { key: "animado", label: "🔊 Animado" },
                ].map(c => (
                  <div
                    key={c.key}
                    className={`${styles.chip} ${data.ruido === c.key ? styles.chipSelected : ""}`}
                    onClick={() => update("ruido", c.key)}
                  >
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
            <button
              className={styles.btnPrimary}
              onClick={nextStep}
              disabled={!data.vidasocial || !data.limpieza || !data.ruido}
            >
              Continuar →
            </button>
          </>
        )}

        {/* STEP 4 — ACTIVACIÓN */}
        {step === 4 && (
          <>
            <div className={styles.welcomeBadge}>🎉 ¡Ya casi estás!</div>
            <h2 className={styles.stepTitle}>
              {data.nombre ? `${data.nombre}, estás` : "Estás"}<br />
              <span style={{ color: "#e8845a" }}>listo/a para entrar</span>
            </h2>
            <p className={styles.stepSub}>
              Hay <strong>grupos activos en {data.ciudad || "tu ciudad"}</strong> esperándote.
              ¿Qué quieres hacer primero?
            </p>
            <div className={styles.activationGrid}>
              {[
                { key: "feed", emoji: "🔍", title: "Ver grupos disponibles", sub: "Explora los grupos de tu ciudad", action: () => guardarPerfil() },
                { key: "crear", emoji: "➕", title: "Crear mi grupo", sub: "Publica tu grupo y recibe solicitudes", action: () => guardarPerfil().then(() => router.push("/grupos/crear")) },
                { key: "invitar", emoji: "📩", title: "Invitar amigos", sub: "Comparte GoFlatt con tus amigos", action: () => guardarPerfil() },
              ].map(a => (
                <div
                  key={a.key}
                  className={styles.activationCard}
                  onClick={a.action}
                >
                  <div className={styles.activationEmoji}>{a.emoji}</div>
                  <div>
                    <div className={styles.activationTitle}>{a.title}</div>
                    <div className={styles.activationSub}>{a.sub}</div>
                  </div>
                  <span className={styles.activationArrow}>→</span>
                </div>
              ))}
            </div>
            {loading && (
              <p style={{ textAlign: "center", fontSize: "13px", color: "#999", marginTop: "16px" }}>
                Guardando tu perfil...
              </p>
            )}
            <div className={styles.activationNote}>
              💡 Puedes completar tu perfil más tarde desde tu cuenta
            </div>
          </>
        )}

      </div>
    </div>
  );
}