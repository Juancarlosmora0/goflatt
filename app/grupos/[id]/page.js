"use client";

import { useState, useEffect, use, useMemo } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import styles from "./grupo.module.css";

const avatarColors = ["#e8845a", "#5aacb8", "#1e3a4a", "#9b59b6", "#2ecc71", "#f39c12"];

const CIUDAD_EMOJIS = {
  "Milán": "🇮🇹", "Lisboa": "🇵🇹", "Berlín": "🇩🇪",
  "Ámsterdam": "🇳🇱", "París": "🇫🇷", "Praga": "🇨🇿",
  "Barcelona": "🇪🇸", "Madrid": "🇪🇸", "Roma": "🇮🇹",
  "Varsovia": "🇵🇱", "Viena": "🇦🇹", "Budapest": "🇭🇺",
};

const calcularCompatibilidad = (perfil, grupo) => {
  if (!perfil) return 0;
  let score = 0;
  const ciudadesInteres = perfil.ciudades_interes || (perfil.ciudad ? [perfil.ciudad] : []);
  if (ciudadesInteres.includes(grupo.ciudad)) score += 40;
  const pMin = perfil.presupuesto_min || 0;
  const pMax = perfil.presupuesto_max || 9999;
  const gMin = grupo.presupuesto_min || 0;
  const gMax = grupo.presupuesto_max || 9999;
  if (pMin <= gMax && gMin <= pMax) {
    const overlap = Math.min(pMax, gMax) - Math.max(pMin, gMin);
    const maxRange = Math.max(pMax - pMin, gMax - gMin, 1);
    score += Math.round((overlap / maxRange) * 25);
  }
  if (perfil.semestre && grupo.semestre && perfil.semestre === grupo.semestre) score += 20;
  const estiloUsuario = perfil.estilo || [];
  const estiloGrupo = grupo.estilo || [];
  const coincidencias = estiloUsuario.filter(e => estiloGrupo.includes(e)).length;
  if (estiloUsuario.length > 0) score += Math.round((coincidencias / estiloUsuario.length) * 10);
  const generoUsuario = perfil.genero;
  const perfilBuscado = grupo.perfil_buscado;
  if (!perfilBuscado || perfilBuscado === "mixto" || perfilBuscado === "indiferente") score += 5;
  else if (generoUsuario === "mujer" && perfilBuscado === "chicas") score += 5;
  else if (generoUsuario === "hombre" && perfilBuscado === "chicos") score += 5;
  return Math.min(score, 100);
};

const getScoreInfo = (score) => {
  if (score >= 80) return { label: "Match alto", color: "#27ae60", bg: "rgba(46,204,113,0.08)", emoji: "🔥" };
  if (score >= 60) return { label: "Buen match", color: "#e8845a", bg: "rgba(232,132,90,0.08)", emoji: "⭐" };
  if (score >= 40) return { label: "Match parcial", color: "#5aacb8", bg: "rgba(90,172,184,0.08)", emoji: "✨" };
  return { label: "Match bajo", color: "#bbb", bg: "rgba(0,0,0,0.04)", emoji: "💡" };
};

const formatSemestre = (s) => {
  if (!s) return "Próximo semestre";
  return s.replace("1c", "1er cuatrimestre ").replace("2c", "2º cuatrimestre ");
};

export default function GrupoDetalle({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [grupo, setGrupo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [yaSolicito, setYaSolicito] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUsuario(user);

      const { data: perfilData } = await supabase
        .from("perfiles")
        .select("*")
        .eq("id", user.id)
        .single();
      setPerfil(perfilData);

      await cargarGrupo();

      // Verificar si ya envió solicitud
      const { data: solicitud } = await supabase
        .from("solicitudes")
        .select("id")
        .eq("grupo_id", id)
        .eq("solicitante_id", user.id)
        .single();
      if (solicitud) setYaSolicito(true);
    };
    init();
  }, [id]);

  const cargarGrupo = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("grupos")
        .select(`*, creador:perfiles(id, nombre, universidad, edad, bio, estilo, tipo_estancia, ciudad)`)
        .eq("id", id)
        .single();
      if (error || !data) setGrupo(null);
      else setGrupo(data);
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
        alert("Error al enviar la solicitud. Inténtalo de nuevo.");
      } else {
        setEnviado(true);
        const { data: { user: currentUser } } = await supabase.auth.getUser();
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

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{
        width: "32px", height: "32px", border: "3px solid #f0f0f0",
        borderTopColor: "#e8845a", borderRadius: "50%", animation: "spin 0.8s linear infinite"
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );

  if (!grupo) return (
    <div style={{ textAlign: "center", padding: "80px 24px", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: "48px", marginBottom: "16px" }}>🔍</div>
      <h2 style={{ color: "#1e3a4a", marginBottom: "8px" }}>Grupo no encontrado</h2>
      <button onClick={() => router.push("/feed")} style={{
        background: "#e8845a", color: "white", border: "none",
        borderRadius: "12px", padding: "12px 24px", cursor: "pointer",
        fontFamily: "inherit", fontWeight: 700, marginTop: "16px"
      }}>Volver al feed</button>
    </div>
  );

  const score = grupo ? calcularCompatibilidad(perfil, grupo) : 0;
  const scoreInfo = getScoreInfo(score);
  const esCreador = usuario?.id === grupo?.creador_id;

  return (
    <div className={styles.wrapper}>

      {/* TOPBAR */}
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => router.push("/feed")}>← Volver</button>
        <span className={styles.topbarTitle}>Grupo en {grupo.ciudad}</span>
        <button className={styles.shareBtn} onClick={() => {
          if (navigator.share) navigator.share({ title: "GoFlatt", url: window.location.href });
          else navigator.clipboard.writeText(window.location.href);
        }}>🔗</button>
      </div>

      <div className={styles.container}>

        {/* COMPATIBILIDAD — solo si tiene perfil y no es creador */}
        {!esCreador && perfil && score > 0 && (
          <div className={styles.scoreCard} style={{ background: scoreInfo.bg }}>
            <div className={styles.scoreCardLeft}>
              <span style={{ fontSize: "22px" }}>{scoreInfo.emoji}</span>
              <div>
                <div className={styles.scoreCardLabel} style={{ color: scoreInfo.color }}>
                  {scoreInfo.label} con tu perfil
                </div>
                <div className={styles.scoreCardSub}>
                  Basado en ciudad, presupuesto y estilo de vida
                </div>
              </div>
            </div>
            <div className={styles.scoreCardNum} style={{ color: scoreInfo.color }}>
              {score}%
            </div>
          </div>
        )}

        {/* HERO */}
        <div className={styles.heroCard}>
          <div className={styles.heroAccent} />

          {/* Ciudad + precio destacados */}
          <div className={styles.heroCiudadRow}>
            <div className={styles.heroCiudad}>
              <span style={{ fontSize: "32px" }}>{CIUDAD_EMOJIS[grupo.ciudad] || "🏙️"}</span>
              <div>
                <div className={styles.heroCiudadNombre}>{grupo.ciudad}</div>
                {grupo.zona && <div className={styles.heroCiudadZona}>{grupo.zona}</div>}
              </div>
            </div>
            <div className={styles.heroPrecio}>
              {grupo.presupuesto_min && grupo.presupuesto_max
                ? `${grupo.presupuesto_min}–${grupo.presupuesto_max}€`
                : grupo.presupuesto_max
                ? `Hasta ${grupo.presupuesto_max}€`
                : "A acordar"
              }
              <span className={styles.heroPrecioSub}>/mes</span>
            </div>
          </div>

          {/* Badges */}
          <div className={styles.heroBadgeRow}>
            <span className={`${styles.statusBadge} ${grupo.cuantos_buscamos === 1 ? styles.statusGreen : styles.statusAmber}`}>
              <span className={styles.statusDot} />
              {grupo.cuantos_buscamos} {grupo.cuantos_buscamos === 1 ? "plaza libre" : "plazas libres"}
            </span>
            <span className={styles.heroBadge}>📅 {formatSemestre(grupo.semestre)}</span>
            <span className={styles.heroBadge}>
              {grupo.estado_piso === "encontrado" ? "🏠 Piso confirmado" :
               grupo.estado_piso === "visitando" ? "🔍 Visitando pisos" : "🔎 Buscando piso"}
            </span>
          </div>

          {/* Perfil buscado */}
          <div className={styles.perfilBuscado}>
            <span className={styles.perfilBuscadoIcon}>
              {grupo.perfil_buscado === "chicas" ? "👩" :
               grupo.perfil_buscado === "chicos" ? "👨" : "👥"}
            </span>
            <span className={styles.perfilBuscadoText}>
              {grupo.perfil_buscado === "chicas" ? "Buscan solo chicas" :
               grupo.perfil_buscado === "chicos" ? "Buscan solo chicos" : "Grupo mixto — todos bienvenidos"}
            </span>
          </div>
        </div>

        {/* SOBRE EL GRUPO */}
        {grupo.bio && (
          <div className={styles.section}>
            <div className={styles.sectionTitle}>Sobre el grupo</div>
            <p className={styles.bioText}>"{grupo.bio}"</p>
            {grupo.estilo?.length > 0 && (
              <div className={styles.tagsRow}>
                {grupo.estilo.map((t, i) => (
                  <span key={i} className={styles.tag}>{t}</span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MIEMBROS */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>
            Miembros · {grupo.cuantos_somos} de {grupo.cuantos_somos + grupo.cuantos_buscamos}
          </div>

          {/* Creador */}
          <div className={styles.memberRow}>
            <div className={styles.memberAvatar} style={{ background: avatarColors[0] }}>
              {grupo.creador?.nombre?.charAt(0).toUpperCase() || "?"}
            </div>
            <div className={styles.memberInfo}>
              <div className={styles.memberName}>{grupo.creador?.nombre || "Usuario"}</div>
              <div className={styles.memberSub}>
                {[
                  grupo.creador?.edad && `${grupo.creador.edad} años`,
                  grupo.creador?.universidad,
                  grupo.creador?.tipo_estancia && grupo.creador.tipo_estancia.charAt(0).toUpperCase() + grupo.creador.tipo_estancia.slice(1)
                ].filter(Boolean).join(" · ")}
              </div>
              {grupo.creador?.bio && (
                <div className={styles.memberBio}>{grupo.creador.bio}</div>
              )}
            </div>
            <span className={styles.memberBadge}>Creador/a</span>
          </div>

          {/* Otros miembros */}
          {Array.from({ length: Math.max(0, grupo.cuantos_somos - 1) }).map((_, i) => (
            <div key={i} className={styles.memberRow}>
              <div className={styles.memberAvatar} style={{ background: avatarColors[i + 1] }}>?</div>
              <div className={styles.memberInfo}>
                <div className={styles.memberName}>Miembro del grupo</div>
                <div className={styles.memberSub}>Se unió al grupo</div>
              </div>
            </div>
          ))}

          {/* Plazas libres */}
          {Array.from({ length: grupo.cuantos_buscamos }).map((_, i) => (
            <div key={`slot-${i}`} className={styles.slotEmpty}>
              <div className={styles.slotAvatar}>+</div>
              <div>
                <div className={styles.slotText}>Plaza libre</div>
                <div className={styles.slotSub}>¿Podrías ser tú? 👀</div>
              </div>
            </div>
          ))}
        </div>

        {/* SOLICITUD / CREADOR */}
        {esCreador ? (
          <div className={styles.joinCard}>
            <div className={styles.joinEmoji}>👑</div>
            <div className={styles.joinTitle}>Este es tu grupo</div>
            <div className={styles.joinSub}>
              Gestiona las solicitudes que recibas y elige a tus compañeros.
            </div>
            <button className={styles.btnSend} onClick={() => router.push("/solicitudes")}>
              Ver solicitudes →
            </button>
          </div>

        ) : yaSolicito && !enviado ? (
          <div className={styles.joinCard} style={{ textAlign: "center" }}>
            <div className={styles.joinEmoji}>✅</div>
            <div className={styles.joinTitle}>Ya has solicitado unirte</div>
            <div className={styles.joinSub}>
              El grupo revisará tu solicitud. Te avisaremos si hay match.
            </div>
            <button
              onClick={() => router.push("/feed")}
              className={styles.btnSecondary}
            >
              Seguir explorando →
            </button>
          </div>

        ) : enviado ? (
          <div className={styles.joinCard} style={{ textAlign: "center" }}>
            <div style={{ fontSize: "52px", marginBottom: "12px" }}>🎉</div>
            <div className={styles.joinTitle}>¡Solicitud enviada!</div>
            <div className={styles.joinSub}>
              {grupo.creador?.nombre || "El grupo"} recibirá tu mensaje. Te avisamos si hay match.
            </div>
            <button onClick={() => router.push("/feed")} className={styles.btnSecondary}>
              Seguir explorando →
            </button>
          </div>

        ) : (
          <div className={styles.joinCard}>
            <div className={styles.joinTitle}>¿Te interesa este grupo? 👋</div>
            <div className={styles.joinSub}>
              Preséntate brevemente. Si encajas, {grupo.creador?.nombre || "el grupo"} te contactará.
            </div>
            <div className={styles.joinTips}>
              <span className={styles.joinTip}>💡 Menciona tu universidad</span>
              <span className={styles.joinTip}>💡 Di cuándo llegas</span>
              <span className={styles.joinTip}>💡 Cuéntales cómo eres</span>
            </div>
            <textarea
              className={styles.joinTextarea}
              rows={4}
              placeholder={`Hola ${grupo.creador?.nombre?.split(" ")[0] || ""}! Me llamo... estudio en... y llego en...`}
              value={mensaje}
              onChange={e => setMensaje(e.target.value)}
            />
            <div className={styles.mensajeCounter}>
              {mensaje.length}/300 caracteres
            </div>
            <button
              className={styles.btnSend}
              onClick={handleEnviar}
              disabled={!mensaje.trim() || enviando || mensaje.length > 300}
            >
              {enviando ? "Enviando..." : "Enviar solicitud →"}
            </button>
            <p className={styles.joinNote}>🔒 Solo {grupo.creador?.nombre?.split(" ")[0] || "el creador"} verá tu mensaje</p>
          </div>
        )}

      </div>
    </div>
  );
}