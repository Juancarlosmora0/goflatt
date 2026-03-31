"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import styles from "./grupo.module.css";

const avatarColors = ["#e8845a", "#5aacb8", "#1e3a4a", "#9b59b6", "#2ecc71", "#f39c12"];

export default function GrupoDetalle({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [grupo, setGrupo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUsuario(user);
      await cargarGrupo();
    };
    init();
  }, [id]);

  const cargarGrupo = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
  .from("grupos")
  .select(`
    *,
    creador:perfiles(id, nombre, universidad, edad, bio, estilo)
  `)
  .eq("id", id)
  .single();

      if (error || !data) {
        console.error("Error cargando grupo:", error);
        setGrupo(null);
      } else {
        setGrupo(data);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEnviar = async () => {
    if (!mensaje.trim() || !usuario) return;
    setEnviando(true);

    try {
      const { error } = await supabase
        .from("solicitudes")
        .insert({
          grupo_id: id,
          solicitante_id: usuario.id,
          mensaje: mensaje,
          estado: "pendiente",
        });

      if (error) {
        console.error("Error enviando solicitud:", error);
        alert("Error al enviar la solicitud. Inténtalo de nuevo.");
      } else {
        setEnviado(true);
        // Obtener datos del creador para enviar email
const { data: creadorData } = await supabase
  .from("perfiles")
  .select("nombre")
  .eq("id", grupo.creador_id)
  .single();

const { data: creadorAuth } = await supabase
  .from("perfiles")
  .select("id")
  .eq("id", grupo.creador_id)
  .single();

// Obtener email del solicitante
const { data: { user: currentUser } } = await supabase.auth.getUser();

// Enviar email al creador
await fetch("/api/emails/solicitud", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    emailCreador: grupo.creador?.email || "",
    nombreCreador: grupo.creador?.nombre || "Usuario",
    nombreSolicitante: currentUser?.user_metadata?.full_name || "Un estudiante",
    ciudad: grupo.ciudad,
    mensaje: mensaje,
  }),
});
      }
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", fontFamily: "sans-serif"
      }}>
        <div style={{
          width: "32px", height: "32px",
          border: "3px solid #f0f0f0", borderTopColor: "#e8845a",
          borderRadius: "50%", animation: "spin 0.8s linear infinite"
        }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!grupo) {
    return (
      <div style={{ textAlign: "center", padding: "80px 24px", fontFamily: "sans-serif" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
        <h2 style={{ color: "#1e3a4a", marginBottom: "8px" }}>Grupo no encontrado</h2>
        <button onClick={() => router.push("/feed")} style={{
          background: "#e8845a", color: "white", border: "none",
          borderRadius: "12px", padding: "12px 24px", cursor: "pointer",
          fontFamily: "inherit", fontWeight: 700, marginTop: "16px"
        }}>
          Volver al feed
        </button>
      </div>
    );
  }

  const esCreador = usuario?.id === grupo.creador_id;

  return (
    <div className={styles.wrapper}>

      {/* TOPBAR */}
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => router.push("/feed")}>
          ← Volver
        </button>
        <span className={styles.topbarTitle}>Detalle del grupo</span>
        <button className={styles.shareBtn}>&#128279;</button>
      </div>

      <div className={styles.container}>

        {/* HERO */}
        <div className={styles.heroCard}>
          <div className={styles.heroAccent} />
          <div className={styles.heroBadgeRow}>
            <span className={styles.heroBadge}>📍 {grupo.ciudad}</span>
            <span className={styles.heroBadge}>📅 {grupo.semestre?.replace("1c", "1er cuatrimestre ").replace("2c", "2º cuatrimestre ")}</span>
            <span className={`${styles.statusBadge} ${grupo.cuantos_buscamos === 1 ? styles.statusGreen : styles.statusAmber}`}>
              <span className={styles.statusDot} />
              {grupo.cuantos_buscamos} {grupo.cuantos_buscamos === 1 ? "plaza libre" : "plazas libres"}
            </span>
          </div>
          <h1 className={styles.heroTitle}>
            {grupo.creador?.nombre
              ? `${grupo.creador.nombre} busca ${grupo.cuantos_buscamos} ${grupo.cuantos_buscamos === 1 ? "persona más" : "personas más"}`
              : `Grupo busca ${grupo.cuantos_buscamos} ${grupo.cuantos_buscamos === 1 ? "persona" : "personas"}`
            }
          </h1>
          <div className={styles.heroMeta}>
            {grupo.presupuesto_max && (
              <span className={styles.heroMetaItem}>
                💰 {grupo.presupuesto_min ? `${grupo.presupuesto_min}–` : ""}{grupo.presupuesto_max}€/mes
              </span>
            )}
            {grupo.zona && <span className={styles.heroMetaItem}>📍 {grupo.zona}</span>}
            <span className={styles.heroMetaItem}>
              🏠 {grupo.estado_piso === "encontrado" ? "Piso encontrado ✅" :
                   grupo.estado_piso === "visitando" ? "Visitando pisos" : "Buscando piso"}
            </span>
          </div>
        </div>

        {/* MIEMBROS */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Miembros del grupo</div>
          <div className={styles.memberRow}>
            <div className={styles.memberAvatar} style={{ background: avatarColors[0] }}>
              {grupo.creador?.nombre?.charAt(0).toUpperCase() || "?"}
            </div>
            <div className={styles.memberInfo}>
              <div className={styles.memberName}>{grupo.creador?.nombre || "Usuario"}</div>
              <div className={styles.memberSub}>
                {[grupo.creador?.edad && `${grupo.creador.edad} años`, grupo.creador?.universidad].filter(Boolean).join(" · ")}
              </div>
            </div>
            <span className={styles.memberBadge}>Creador/a</span>
          </div>
          {Array.from({ length: Math.max(0, grupo.cuantos_somos - 1) }).map((_, i) => (
            <div key={i} className={styles.memberRow}>
              <div className={styles.memberAvatar} style={{ background: avatarColors[i + 1] }}>?</div>
              <div className={styles.memberInfo}>
                <div className={styles.memberName}>Miembro del grupo</div>
                <div className={styles.memberSub}>Información no disponible</div>
              </div>
            </div>
          ))}
          {Array.from({ length: grupo.cuantos_buscamos }).map((_, i) => (
            <div key={`slot-${i}`} className={styles.slotEmpty}>
              <div className={styles.slotAvatar}>+</div>
              <span className={styles.slotText}>Plaza libre — podrías ser tú</span>
            </div>
          ))}
        </div>

        {/* PREFERENCIAS */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Preferencias</div>
          <div className={styles.prefGrid}>
            <div className={styles.prefItem}>
              <div className={styles.prefLabel}>Perfil buscado</div>
              <div className={styles.prefValue}>
                {grupo.perfil_buscado === "chicas" ? "Solo chicas" :
                 grupo.perfil_buscado === "chicos" ? "Solo chicos" : "Mixto"}
              </div>
            </div>
            {grupo.presupuesto_max && (
              <div className={styles.prefItem}>
                <div className={styles.prefLabel}>Presupuesto</div>
                <div className={styles.prefValue}>
                  {grupo.presupuesto_min ? `${grupo.presupuesto_min}–` : ""}{grupo.presupuesto_max}€/mes
                </div>
              </div>
            )}
            {grupo.zona && (
              <div className={styles.prefItem}>
                <div className={styles.prefLabel}>Zona</div>
                <div className={styles.prefValue}>{grupo.zona}</div>
              </div>
            )}
            <div className={styles.prefItem}>
              <div className={styles.prefLabel}>Estado piso</div>
              <div className={styles.prefValue}>
                {grupo.estado_piso === "encontrado" ? "Piso encontrado ✅" :
                 grupo.estado_piso === "visitando" ? "Visitando pisos" : "Buscando piso"}
              </div>
            </div>
          </div>
        </div>

        {/* ESTILO + BIO */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Sobre el grupo</div>
          {grupo.estilo?.length > 0 && (
            <div className={styles.tagsRow} style={{ marginBottom: "14px" }}>
              {grupo.estilo.map((t, i) => (
                <span key={i} className={styles.tag}>{t}</span>
              ))}
            </div>
          )}
          <p className={styles.bioText}>{grupo.bio}</p>
        </div>

        {/* JOIN o ES CREADOR */}
        {esCreador ? (
          <div className={styles.joinCard}>
            <div className={styles.joinTitle}>Este es tu grupo</div>
            <div className={styles.joinSub}>
              Gestiona las solicitudes que recibas desde tu perfil.
            </div>
            <button
              className={styles.btnSend}
              onClick={() => router.push("/solicitudes")}
            >
              Ver solicitudes →
            </button>
          </div>
        ) : (
          <div className={styles.joinCard}>
            {!enviado ? (
              <>
                <div className={styles.joinTitle}>¿Te interesa este grupo?</div>
                <div className={styles.joinSub}>
                  Escribe un mensaje presentándote. Si hay match, os pondremos en contacto.
                </div>
                <textarea
                  className={styles.joinTextarea}
                  rows={3}
                  placeholder="Hola, me llamo... estudio... y me parece que encajaría bien porque..."
                  value={mensaje}
                  onChange={e => setMensaje(e.target.value)}
                />
                <button
                  className={styles.btnSend}
                  onClick={handleEnviar}
                  disabled={!mensaje.trim() || enviando}
                  style={{ opacity: mensaje.trim() ? 1 : 0.5 }}
                >
                  {enviando ? "Enviando..." : "Enviar solicitud →"}
                </button>
                <p className={styles.joinNote}>Solo el creador del grupo verá tu mensaje</p>
              </>
            ) : (
              <div style={{ textAlign: "center", padding: "16px 0" }}>
                <div style={{ fontSize: "48px", marginBottom: "16px" }}>🎉</div>
                <div style={{ fontSize: "18px", fontWeight: 800, color: "#1e3a4a", marginBottom: "8px" }}>
                  ¡Solicitud enviada!
                </div>
                <div style={{ fontSize: "14px", color: "#999", lineHeight: 1.6 }}>
                  El grupo recibirá tu mensaje y te contactarán si hay match.
                </div>
                <button
                  onClick={() => router.push("/feed")}
                  style={{
                    marginTop: "20px", background: "none",
                    border: "1.5px solid #eef0f8", borderRadius: "12px",
                    padding: "12px 24px", cursor: "pointer",
                    fontFamily: "inherit", fontWeight: 600,
                    color: "#1e3a4a", fontSize: "14px"
                  }}
                >
                  Seguir explorando →
                </button>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}