"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import styles from "./solicitudes.module.css";

export default function Solicitudes() {
  const router = useRouter();
  const [tabActivo, setTabActivo] = useState("pendientes");
  const [solicitudes, setSolicitudes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuario, setUsuario] = useState(null);
  const [perfil, setPerfil] = useState(null);

useEffect(() => {
  const init = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { router.push("/login"); return; }
    setUsuario(user);

    const { data: perfilData } = await supabase
      .from("perfiles")
      .select("nombre")
      .eq("id", user.id)
      .single();
    setPerfil(perfilData);

    await cargarSolicitudes(user.id);
  };
  init();
}, []);
  const cargarSolicitudes = async (userId) => {
    setLoading(true);
    try {
      // Obtener grupos del usuario
      const { data: misGrupos } = await supabase
        .from("grupos")
        .select("id")
        .eq("creador_id", userId);

      if (!misGrupos || misGrupos.length === 0) {
        setSolicitudes([]);
        setLoading(false);
        return;
      }

      const grupoIds = misGrupos.map(g => g.id);

      // Obtener solicitudes de esos grupos
const { data, error } = await supabase
  .from("solicitudes")
  .select(`
    *,
    solicitante:perfiles(nombre, edad, universidad, estilo, email),
    grupo:grupos(ciudad, semestre, cuantos_buscamos)
  `)
  .in("grupo_id", grupoIds)
  .order("created_at", { ascending: false });

if (!error) setSolicitudes(data || []);
} finally {
  setLoading(false);
}
};

  const handleAceptar = async (solicitud) => {
  const { error } = await supabase
    .from("solicitudes")
    .update({ estado: "aceptado" })
    .eq("id", solicitud.id);

  if (!error) {
    setSolicitudes(prev =>
      prev.map(s => s.id === solicitud.id ? { ...s, estado: "aceptado" } : s)
    );

    // Enviar emails de match a ambos
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
};

  const handleRechazar = async (id) => {
    const { error } = await supabase
      .from("solicitudes")
      .update({ estado: "rechazado" })
      .eq("id", id);

    if (!error) {
      setSolicitudes(prev =>
        prev.map(s => s.id === id ? { ...s, estado: "rechazado" } : s)
      );
    }
  };

  const formatTiempo = (fecha) => {
    const diff = (new Date() - new Date(fecha)) / 1000;
    if (diff < 3600) return `Hace ${Math.floor(diff / 60)} min`;
    if (diff < 86400) return `Hace ${Math.floor(diff / 3600)}h`;
    return `Hace ${Math.floor(diff / 86400)} días`;
  };

  const avatarColors = ["#e8845a", "#5aacb8", "#1e3a4a", "#9b59b6", "#2ecc71"];

  const pendientes = solicitudes.filter(s => s.estado === "pendiente");
  const gestionadas = solicitudes.filter(s => s.estado !== "pendiente");
  const listaMostrada = tabActivo === "pendientes" ? pendientes : gestionadas;

  return (
    <div className={styles.wrapper}>

      {/* TOPBAR */}
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => router.push("/perfil")}>
          ← Volver
        </button>
        <span className={styles.topbarTitle}>Solicitudes</span>
        {pendientes.length > 0 && (
          <span className={styles.topbarCount}>{pendientes.length} nuevas</span>
        )}
      </div>

      <div className={styles.container}>

        {/* TABS */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${tabActivo === "pendientes" ? styles.tabActive : ""}`}
            onClick={() => setTabActivo("pendientes")}
          >
            Pendientes ({pendientes.length})
          </button>
          <button
            className={`${styles.tab} ${tabActivo === "gestionadas" ? styles.tabActive : ""}`}
            onClick={() => setTabActivo("gestionadas")}
          >
            Gestionadas ({gestionadas.length})
          </button>
        </div>

        {/* LOADING */}
        {loading && (
          <div style={{ textAlign: "center", padding: "48px", color: "#999" }}>
            <div style={{
              width: "32px", height: "32px",
              border: "3px solid #f0f0f0", borderTopColor: "#e8845a",
              borderRadius: "50%", animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px"
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: "14px" }}>Cargando solicitudes...</p>
          </div>
        )}

        {/* LISTA */}
        {!loading && listaMostrada.map((s, idx) => (
          <div key={s.id} className={`${styles.card} ${s.estado === "pendiente" ? styles.cardNew : ""}`}>

            {/* TOP */}
            <div className={styles.cardTop}>
              <div
                className={styles.avatar}
                style={{ background: avatarColors[idx % avatarColors.length] }}
              >
                {s.solicitante?.nombre?.charAt(0).toUpperCase() || "?"}
              </div>
              <div className={styles.cardInfo}>
                <div className={styles.cardName}>{s.solicitante?.nombre || "Usuario"}</div>
                <div className={styles.cardSub}>
                  {[
                    s.solicitante?.edad && `${s.solicitante.edad} años`,
                    s.solicitante?.universidad
                  ].filter(Boolean).join(" · ")}
                </div>
                {s.solicitante?.estilo?.length > 0 && (
                  <div className={styles.cardTags}>
                    {s.solicitante.estilo.slice(0, 3).map((t, i) => (
                      <span key={i} className={styles.tag}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
              <span className={styles.cardTime}>{formatTiempo(s.created_at)}</span>
            </div>

            {/* GRUPO */}
            <div style={{
              fontSize: "11px", color: "#bbb", fontWeight: 600,
              marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.5px"
            }}>
              Solicitud para tu grupo en {s.grupo?.ciudad}
            </div>

            {/* MENSAJE */}
            <div className={`${styles.mensaje} ${s.estado === "pendiente" ? styles.mensajeNew : ""}`}>
              "{s.mensaje}"
            </div>

            {/* ACCIONES */}
            {s.estado === "pendiente" ? (
              <div className={styles.actions}>
                <button className={styles.btnAceptar} onClick={() => handleAceptar(s)}>
  ✓ Aceptar
</button>
                <button className={styles.btnVerPerfil} onClick={() => router.push(`/perfil/${s.solicitante_id}`)}>
                  Ver perfil
                </button>
                <button className={styles.btnRechazar} onClick={() => handleRechazar(s.id)}>
                  ✕
                </button>
              </div>
            ) : s.estado === "aceptado" ? (
              <div className={styles.estadoAceptado}>
                ✓ Solicitud aceptada · Os hemos puesto en contacto
              </div>
            ) : (
              <div className={styles.estadoRechazado}>
                ✕ Solicitud rechazada
              </div>
            )}
          </div>
        ))}

        {/* EMPTY STATE */}
        {!loading && listaMostrada.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              {tabActivo === "pendientes" ? "📭" : "📋"}
            </div>
            <h3 className={styles.emptyTitle}>
              {tabActivo === "pendientes" ? "Sin solicitudes pendientes" : "Nada gestionado aún"}
            </h3>
            <p className={styles.emptySubtitle}>
              {tabActivo === "pendientes"
                ? "Cuando alguien quiera unirse a tu grupo, aparecerá aquí."
                : "Las solicitudes que aceptes o rechaces aparecerán aquí."
              }
            </p>
            {tabActivo === "pendientes" && (
              <button className={styles.btnCreate} onClick={() => router.push("/grupos/crear")}>
                Crear mi grupo →
              </button>
            )}
          </div>
        )}

      </div>

      {/* BOTTOM NAV */}
      <nav className={styles.bottomNav}>
        <button className={styles.bnItem} onClick={() => router.push("/feed")}>
          <span className={styles.bnIcon}>&#128269;</span>
          <span className={styles.bnLabel}>Explorar</span>
        </button>
        <button className={styles.bnCreateBtn} onClick={() => router.push("/grupos/crear")}>
          <div className={styles.bnCreateIcon}>+</div>
          <span className={styles.bnCreateLabel}>Crear</span>
        </button>
        <button className={`${styles.bnItem} ${styles.bnActive}`} onClick={() => router.push("/perfil")}>
          <span className={styles.bnIcon}>&#128100;</span>
          <span className={styles.bnLabel}>Perfil</span>
        </button>
      </nav>

    </div>
  );
}