"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import styles from "./solicitudes.module.css";

const avatarColors = ["#e8845a", "#5aacb8", "#1e3a4a", "#9b59b6", "#2ecc71", "#f39c12"];

const calcularCompatibilidad = (perfilUsuario, solicitante, grupo) => {
  if (!perfilUsuario || !solicitante) return 0;
  let score = 0;
  const ciudadesInteres = perfilUsuario.ciudades_interes || (perfilUsuario.ciudad ? [perfilUsuario.ciudad] : []);
  if (ciudadesInteres.includes(grupo?.ciudad)) score += 40;
  const pMin = solicitante.presupuesto_min || 0;
  const pMax = solicitante.presupuesto_max || 9999;
  const gMin = grupo?.presupuesto_min || 0;
  const gMax = grupo?.presupuesto_max || 9999;
  if (pMin <= gMax && gMin <= pMax) {
    const overlap = Math.min(pMax, gMax) - Math.max(pMin, gMin);
    const maxRange = Math.max(pMax - pMin, gMax - gMin, 1);
    score += Math.round((overlap / maxRange) * 25);
  }
  if (solicitante.semestre && grupo?.semestre && solicitante.semestre === grupo.semestre) score += 20;
  const estiloA = solicitante.estilo || [];
  const estiloB = perfilUsuario.estilo || [];
  const coincidencias = estiloA.filter(e => estiloB.includes(e)).length;
  if (estiloA.length > 0) score += Math.round((coincidencias / estiloA.length) * 10);
  score += 5;
  return Math.min(score, 100);
};

const getScoreInfo = (score) => {
  if (score >= 80) return { label: "Match alto", color: "#27ae60", bg: "rgba(46,204,113,0.08)", emoji: "🔥" };
  if (score >= 60) return { label: "Buen match", color: "#e8845a", bg: "rgba(232,132,90,0.08)", emoji: "⭐" };
  if (score >= 40) return { label: "Match parcial", color: "#5aacb8", bg: "rgba(90,172,184,0.08)", emoji: "✨" };
  return { label: "Match bajo", color: "#bbb", bg: "rgba(0,0,0,0.04)", emoji: "💡" };
};

const formatTiempo = (fecha) => {
  const diff = (new Date() - new Date(fecha)) / 1000;
  if (diff < 60) return "Ahora mismo";
  if (diff < 3600) return `Hace ${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `Hace ${Math.floor(diff / 3600)}h`;
  return `Hace ${Math.floor(diff / 86400)}d`;
};

const formatSemestre = (s) => {
  if (!s) return null;
  return s.replace("1c", "1er cuatrimestre ").replace("2c", "2º cuatrimestre ");
};

export default function Solicitudes() {
  const router = useRouter();
  const [tabActivo, setTabActivo] = useState("recibidas");
  const [solicitudesRecibidas, setSolicitudesRecibidas] = useState([]);
  const [solicitudesEnviadas, setSolicitudesEnviadas] = useState([]);
  const [filtroEstado, setFiltroEstado] = useState("pendiente");
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [perfil, setPerfil] = useState(null);
  const [aceptandoId, setAceptandoId] = useState(null);
  const [matchCelebrado, setMatchCelebrado] = useState(null);

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

      await cargarTodo(user.id);
    };
    init();
  }, []);

  const cargarTodo = async (userId) => {
    setLoading(true);
    try {
      const { data: misGrupos } = await supabase
        .from("grupos")
        .select("id")
        .eq("creador_id", userId);

      if (misGrupos && misGrupos.length > 0) {
        const grupoIds = misGrupos.map(g => g.id);
        const { data: recibidas } = await supabase
          .from("solicitudes")
          .select(`
            *,
            solicitante:perfiles(id, nombre, edad, universidad, universidad_origen, estilo, email, presupuesto_min, presupuesto_max, semestre, tipo_estancia, ciudades_interes),
            grupo:grupos(ciudad, semestre, cuantos_buscamos, presupuesto_min, presupuesto_max)
          `)
          .in("grupo_id", grupoIds)
          .order("created_at", { ascending: false });
        setSolicitudesRecibidas(recibidas || []);
      }

      const { data: enviadas } = await supabase
        .from("solicitudes")
        .select(`
          *,
          grupo:grupos(id, ciudad, semestre, cuantos_buscamos, presupuesto_min, presupuesto_max,
            creador:perfiles(nombre, universidad))
        `)
        .eq("solicitante_id", userId)
        .order("created_at", { ascending: false });
      setSolicitudesEnviadas(enviadas || []);

    } finally {
      setLoading(false);
    }
  };

  const handleAceptar = async (solicitud) => {
    setAceptandoId(solicitud.id);
    try {
      const { error } = await supabase
        .from("solicitudes")
        .update({ estado: "aceptado" })
        .eq("id", solicitud.id);

      if (!error) {
        setSolicitudesRecibidas(prev =>
          prev.map(s => s.id === solicitud.id ? { ...s, estado: "aceptado" } : s)
        );
        setMatchCelebrado(solicitud.id);
        setTimeout(() => setMatchCelebrado(null), 4000);

        await fetch("/api/emails/match", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            emailCreador: usuario.email,
            emailSolicitante: solicitud.solicitante?.email || "",
            nombreCreador: perfil?.nombre || "Usuario",
            nombreSolicitante: solicitud.solicitante?.nombre || "Usuario",
            ciudad: solicitud.grupo?.ciudad || "",
          }),
        });
      }
    } finally {
      setAceptandoId(null);
    }
  };

  const handleRechazar = async (id) => {
    const { error } = await supabase
      .from("solicitudes")
      .update({ estado: "rechazado" })
      .eq("id", id);

    if (!error) {
      setSolicitudesRecibidas(prev =>
        prev.map(s => s.id === id ? { ...s, estado: "rechazado" } : s)
      );
    }
  };

  const recibidasFiltradas = solicitudesRecibidas.filter(s =>
    filtroEstado === "todas" ? true : s.estado === filtroEstado
  );

  const pendientesCount = solicitudesRecibidas.filter(s => s.estado === "pendiente").length;

  const SolicitudRecibidaCard = ({ s, idx }) => {
    const score = calcularCompatibilidad(perfil, s.solicitante, s.grupo);
    const scoreInfo = getScoreInfo(score);
    const esCelebrado = matchCelebrado === s.id;

    return (
      <div className={`${styles.card} ${s.estado === "pendiente" ? styles.cardPendiente : ""} ${esCelebrado ? styles.cardMatch : ""}`}>

        {esCelebrado && (
          <div className={styles.matchCelebration}>
            <span className={styles.matchEmoji}>🎉</span>
            <div>
              <div className={styles.matchTitle}>¡Match confirmado!</div>
              <div className={styles.matchSub}>Os hemos enviado un email a ambos</div>
            </div>
          </div>
        )}

        {score > 0 && s.estado === "pendiente" && (
          <div className={styles.scoreRow} style={{ background: scoreInfo.bg }}>
            <span>{scoreInfo.emoji}</span>
            <span className={styles.scoreLabel} style={{ color: scoreInfo.color }}>{scoreInfo.label}</span>
            <div className={styles.scoreBarWrap}>
              <div className={styles.scoreBar}>
                <div className={styles.scoreBarFill} style={{ width: `${score}%`, background: scoreInfo.color }} />
              </div>
            </div>
            <span className={styles.scoreNum} style={{ color: scoreInfo.color }}>{score}%</span>
          </div>
        )}

        <div className={styles.cardHeader}>
          <div className={styles.cardAvatar} style={{ background: avatarColors[idx % avatarColors.length] }}>
            {s.solicitante?.nombre?.charAt(0).toUpperCase() || "?"}
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.cardName}>{s.solicitante?.nombre || "Usuario"}</div>
            <div className={styles.cardSub}>
              {[
                s.solicitante?.edad && `${s.solicitante.edad} años`,
                s.solicitante?.universidad || s.solicitante?.universidad_origen,
                s.solicitante?.tipo_estancia && s.solicitante.tipo_estancia.charAt(0).toUpperCase() + s.solicitante.tipo_estancia.slice(1),
              ].filter(Boolean).join(" · ")}
            </div>
            {s.solicitante?.presupuesto_max && (
              <div className={styles.cardPresupuesto}>
                💰 {s.solicitante.presupuesto_min ? `${s.solicitante.presupuesto_min}–` : ""}{s.solicitante.presupuesto_max}€/mes
              </div>
            )}
          </div>
          <span className={styles.cardTime}>{formatTiempo(s.created_at)}</span>
        </div>

        {s.solicitante?.estilo?.length > 0 && (
          <div className={styles.tagsRow}>
            {s.solicitante.estilo.map((t, i) => (
              <span key={i} className={styles.tag}>{t}</span>
            ))}
          </div>
        )}

        <div className={styles.grupoLabel}>
          Para tu grupo en <strong>{s.grupo?.ciudad}</strong>
          {s.grupo?.semestre && ` · ${formatSemestre(s.grupo.semestre)}`}
        </div>

        <div className={`${styles.mensaje} ${s.estado === "pendiente" ? styles.mensajePendiente : ""}`}>
          &quot;{s.mensaje}&quot;
        </div>

        {s.estado === "pendiente" ? (
          <div className={styles.actions}>
            <button
              className={styles.btnAceptar}
              onClick={() => handleAceptar(s)}
              disabled={aceptandoId === s.id}
            >
              {aceptandoId === s.id ? "Aceptando..." : "✓ Aceptar"}
            </button>
            <button
              className={styles.btnRechazar}
              onClick={() => handleRechazar(s.id)}
            >
              ✕ Rechazar
            </button>
          </div>
        ) : s.estado === "aceptado" ? (
          <div className={styles.estadoBox} style={{ background: "rgba(46,204,113,0.08)", borderColor: "rgba(46,204,113,0.2)" }}>
            <span style={{ color: "#27ae60", fontWeight: 700, fontSize: "13px" }}>
              ✓ Aceptado · Contacta por email:
            </span>
            <a
              href={`mailto:${s.solicitante?.email}`}
              className={styles.emailLink}
            >
              {s.solicitante?.email || "No disponible"}
            </a>
          </div>
        ) : (
          <div className={styles.estadoBox} style={{ background: "rgba(231,76,60,0.06)", borderColor: "rgba(231,76,60,0.15)" }}>
            <span style={{ color: "#e74c3c", fontWeight: 700, fontSize: "13px" }}>✕ Rechazado</span>
          </div>
        )}
      </div>
    );
  };

  const SolicitudEnviadaCard = ({ s, idx }) => (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.cardAvatar} style={{ background: avatarColors[idx % avatarColors.length] }}>
          {s.grupo?.creador?.nombre?.charAt(0).toUpperCase() || "?"}
        </div>
        <div className={styles.cardInfo}>
          <div className={styles.cardName}>
            Grupo en {s.grupo?.ciudad || "–"}
          </div>
          <div className={styles.cardSub}>
            {[
              s.grupo?.creador?.nombre && `Creado por ${s.grupo.creador.nombre}`,
              s.grupo?.semestre && formatSemestre(s.grupo.semestre),
            ].filter(Boolean).join(" · ")}
          </div>
          {s.grupo?.presupuesto_max && (
            <div className={styles.cardPresupuesto}>
              💰 {s.grupo.presupuesto_min ? `${s.grupo.presupuesto_min}–` : ""}{s.grupo.presupuesto_max}€/mes
            </div>
          )}
        </div>
        <span className={styles.cardTime}>{formatTiempo(s.created_at)}</span>
      </div>

      <div className={styles.mensaje}>&quot;{s.mensaje}&quot;</div>

      <div className={styles.estadoBox} style={{
        background: s.estado === "aceptado" ? "rgba(46,204,113,0.08)" :
                    s.estado === "rechazado" ? "rgba(231,76,60,0.06)" : "rgba(232,132,90,0.06)",
        borderColor: s.estado === "aceptado" ? "rgba(46,204,113,0.2)" :
                     s.estado === "rechazado" ? "rgba(231,76,60,0.15)" : "rgba(232,132,90,0.2)",
      }}>
        <span style={{
          fontWeight: 700, fontSize: "13px",
          color: s.estado === "aceptado" ? "#27ae60" :
                 s.estado === "rechazado" ? "#e74c3c" : "#e8845a"
        }}>
          {s.estado === "aceptado" ? "🎉 ¡Match! Te han aceptado" :
           s.estado === "rechazado" ? "✕ No han aceptado tu solicitud" :
           "⏳ Pendiente de respuesta"}
        </span>
        {s.estado === "pendiente" && (
          <span style={{ fontSize: "12px", color: "#bbb", display: "block", marginTop: "4px" }}>
            El grupo revisará tu mensaje pronto
          </span>
        )}
        {s.estado !== "rechazado" && (
          <button
            className={styles.btnVerGrupo}
            onClick={() => router.push(`/grupos/${s.grupo_id}`)}
          >
            Ver grupo →
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>

      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => router.push("/perfil")}>← Volver</button>
        <span className={styles.topbarTitle}>Solicitudes</span>
        {pendientesCount > 0 && (
          <span className={styles.topbarBadge}>{pendientesCount}</span>
        )}
      </div>

      <div className={styles.container}>

        <div className={styles.mainTabs}>
          <button
            className={`${styles.mainTab} ${tabActivo === "recibidas" ? styles.mainTabActive : ""}`}
            onClick={() => setTabActivo("recibidas")}
          >
            📥 Recibidas
            {pendientesCount > 0 && (
              <span className={styles.tabBadge}>{pendientesCount}</span>
            )}
          </button>
          <button
            className={`${styles.mainTab} ${tabActivo === "enviadas" ? styles.mainTabActive : ""}`}
            onClick={() => setTabActivo("enviadas")}
          >
            📤 Enviadas
            {solicitudesEnviadas.length > 0 && (
              <span className={styles.tabBadgeGray}>{solicitudesEnviadas.length}</span>
            )}
          </button>
        </div>

        {tabActivo === "recibidas" && (
          <div className={styles.filtroEstado}>
            {[
              { key: "pendiente", label: "Pendientes" },
              { key: "aceptado", label: "Aceptadas" },
              { key: "rechazado", label: "Rechazadas" },
              { key: "todas", label: "Todas" },
            ].map(f => (
              <button
                key={f.key}
                className={`${styles.filtroBtn} ${filtroEstado === f.key ? styles.filtroBtnActive : ""}`}
                onClick={() => setFiltroEstado(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {loading && (
          <div className={styles.loadingWrap}>
            <div className={styles.spinner} />
            <p>Cargando solicitudes...</p>
          </div>
        )}

        {!loading && tabActivo === "recibidas" && (
          <>
            {recibidasFiltradas.length > 0 ? (
              recibidasFiltradas.map((s, idx) => (
                <SolicitudRecibidaCard key={s.id} s={s} idx={idx} />
              ))
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>
                  {filtroEstado === "pendiente" ? "📭" : "📋"}
                </div>
                <h3 className={styles.emptyTitle}>
                  {filtroEstado === "pendiente"
                    ? "Sin solicitudes pendientes"
                    : `Sin solicitudes ${filtroEstado === "aceptado" ? "aceptadas" : filtroEstado === "rechazado" ? "rechazadas" : ""}`
                  }
                </h3>
                <p className={styles.emptySubtitle}>
                  {filtroEstado === "pendiente"
                    ? "Cuando alguien quiera unirse a tu grupo, aparecerá aquí."
                    : "Cambia el filtro para ver otras solicitudes."
                  }
                </p>
                {filtroEstado === "pendiente" && solicitudesRecibidas.length === 0 && (
                  <button className={styles.btnCreate} onClick={() => router.push("/grupos/crear")}>
                    Crear mi grupo →
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {!loading && tabActivo === "enviadas" && (
          <>
            {solicitudesEnviadas.length > 0 ? (
              solicitudesEnviadas.map((s, idx) => (
                <SolicitudEnviadaCard key={s.id} s={s} idx={idx} />
              ))
            ) : (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>📤</div>
                <h3 className={styles.emptyTitle}>Aún no has enviado solicitudes</h3>
                <p className={styles.emptySubtitle}>
                  Cuando te interese un grupo y envíes una solicitud, aparecerá aquí.
                </p>
                <button className={styles.btnCreate} onClick={() => router.push("/feed")}>
                  Explorar grupos →
                </button>
              </div>
            )}
          </>
        )}

      </div>

      <nav className={styles.bottomNav}>
        <button className={styles.bnItem} onClick={() => router.push("/feed")}>
          <span className={styles.bnIcon}>🔍</span>
          <span className={styles.bnLabel}>Explorar</span>
        </button>
        <button className={styles.bnCreateBtn} onClick={() => router.push("/grupos/crear")}>
          <div className={styles.bnCreateIcon}>+</div>
          <span className={styles.bnCreateLabel}>Crear</span>
        </button>
        <button className={`${styles.bnItem} ${styles.bnActive}`} onClick={() => router.push("/perfil")}>
          <span className={styles.bnIcon}>👤</span>
          <span className={styles.bnLabel}>Perfil</span>
        </button>
      </nav>

    </div>
  );
}