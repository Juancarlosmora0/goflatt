"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import styles from "./perfil.module.css";

export default function Perfil() {
  const router = useRouter();
  const [perfil, setPerfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [solicitudesPendientes, setSolicitudesPendientes] = useState(0);
  const [misGrupos, setMisGrupos] = useState([]);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      // Cargar perfil
      const { data: perfilData } = await supabase
        .from("perfiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setPerfil(perfilData || { nombre: user.user_metadata?.full_name || "Usuario" });

      // Cargar mis grupos
      const { data: grupos } = await supabase
        .from("grupos")
        .select("id, ciudad, semestre, cuantos_buscamos, activo")
        .eq("creador_id", user.id)
        .eq("activo", true);

      setMisGrupos(grupos || []);

      // Contar solicitudes pendientes
      if (grupos && grupos.length > 0) {
        const grupoIds = grupos.map(g => g.id);
        const { count } = await supabase
          .from("solicitudes")
          .select("*", { count: "exact", head: true })
          .in("grupo_id", grupoIds)
          .eq("estado", "pendiente");

        setSolicitudesPendientes(count || 0);
      }

      setLoading(false);
    };
    init();
  }, []);

  const handleCerrarSesion = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex",
        alignItems: "center", justifyContent: "center"
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

  return (
    <div className={styles.wrapper}>

      {/* TOPBAR */}
      <div className={styles.topbar}>
        <div style={{ width: "60px" }} />
        <span className={styles.topbarTitle}>Mi perfil</span>
        <button className={styles.topbarBtn} onClick={() => router.push("/perfil/editar")}>
          Editar
        </button>
      </div>

      <div className={styles.container}>

        {/* AVATAR */}
        <div className={styles.avatarSection}>
          <div className={styles.avatarBg} />
          <div className={styles.avatar}>
            {perfil?.nombre?.charAt(0).toUpperCase() || "?"}
            <div className={styles.avatarEdit}>✏️</div>
          </div>
          <div className={styles.userName}>{perfil?.nombre || "Usuario"}</div>
          <div className={styles.userSub}>
            {[perfil?.edad && `${perfil.edad} años`, perfil?.universidad].filter(Boolean).join(" · ")}
          </div>
          <div className={styles.userBadges}>
            {perfil?.ciudad && <span className={styles.userBadge}>📍 {perfil.ciudad}</span>}
            {perfil?.programa && <span className={styles.userBadge}>🎓 {perfil.programa}</span>}
            {perfil?.semestre && <span className={styles.userBadge}>📅 {perfil.semestre?.replace("1c", "1er cuatrimestre ").replace("2c", "2º cuatrimestre ")}</span>}
          </div>
        </div>

        {/* STATS */}
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{solicitudesPendientes}</div>
            <div className={styles.statLabel}>Solicitudes</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{misGrupos.length}</div>
            <div className={styles.statLabel}>Mis grupos</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>
              {perfil?.ciudad || "–"}
            </div>
            <div className={styles.statLabel}>Destino</div>
          </div>
        </div>

        {/* MIS GRUPOS */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Mis grupos</div>
          </div>
          {misGrupos.length > 0 ? (
            misGrupos.map(g => (
              <div
                key={g.id}
                className={styles.miGrupoCard}
                onClick={() => router.push(`/grupos/${g.id}`)}
              >
                <div className={styles.miGrupoIcon}>🏠</div>
                <div className={styles.miGrupoInfo}>
                  <div className={styles.miGrupoTitle}>
                    Grupo en {g.ciudad}
                  </div>
                  <div className={styles.miGrupoSub}>
                    {g.cuantos_buscamos} {g.cuantos_buscamos === 1 ? "plaza libre" : "plazas libres"} · {g.semestre?.replace("1c", "1er cuatrimestre ").replace("2c", "2º cuatrimestre ")}
                  </div>
                </div>
                <span className={styles.miGrupoArrow}>→</span>
              </div>
            ))
          ) : (
            <div
              className={styles.miGrupoCard}
              onClick={() => router.push("/grupos/crear")}
            >
              <div className={styles.miGrupoIcon}>🏠</div>
              <div className={styles.miGrupoInfo}>
                <div className={styles.miGrupoTitle}>No tienes grupo activo</div>
                <div className={styles.miGrupoSub}>Crea uno y empieza a recibir solicitudes</div>
              </div>
              <span className={styles.miGrupoArrow}>→</span>
            </div>
          )}
        </div>

        {/* INFO */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Información</div>
            <button className={styles.sectionEdit} onClick={() => router.push("/perfil/editar")}>
              Editar
            </button>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Ciudad destino</span>
            <span className={styles.infoValue}>📍 {perfil?.ciudad || "–"}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Universidad</span>
            <span className={styles.infoValue}>{perfil?.universidad || "–"}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Programa</span>
            <span className={styles.infoValue}>{perfil?.programa || "–"}</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Semestre</span>
            <span className={styles.infoValue}>
              {perfil?.semestre?.replace("1c", "1er cuatrimestre ").replace("2c", "2º cuatrimestre ") || "–"}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Presupuesto</span>
            <span className={styles.infoValue}>{perfil?.presupuesto_max ? `${perfil.presupuesto_min || "?"}–${perfil.presupuesto_max}€/mes` : "–"}</span>
          </div>
        </div>

        {/* BIO */}
        {perfil?.bio && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>Sobre mí</div>
              <button className={styles.sectionEdit}>Editar</button>
            </div>
            <p className={styles.bioText}>{perfil.bio}</p>
          </div>
        )}

        {/* ESTILO */}
        {perfil?.estilo?.length > 0 && (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <div className={styles.sectionTitle}>Estilo de vida</div>
            </div>
            <div className={styles.chipsRow}>
              {perfil.estilo.map((e, i) => (
                <span key={i} className={styles.chip}>{e}</span>
              ))}
            </div>
          </div>
        )}

        {/* ACCIONES */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Cuenta</div>
          </div>
          <div className={styles.actionsList}>
            {solicitudesPendientes > 0 && (
              <button className={styles.actionItem} onClick={() => router.push("/solicitudes")}>
                <div className={styles.actionIcon} style={{ background: "#fff5f0" }}>🔔</div>
                <span className={styles.actionLabel}>
                  Solicitudes pendientes
                </span>
                <span style={{
                  background: "#e8845a", color: "white",
                  borderRadius: "100px", padding: "2px 8px",
                  fontSize: "11px", fontWeight: 700, marginRight: "8px"
                }}>{solicitudesPendientes}</span>
                <span className={styles.actionArrow}>›</span>
              </button>
            )}
            <button className={styles.actionItem} onClick={() => router.push("/solicitudes")}>
              <div className={styles.actionIcon} style={{ background: "#f0f9fa" }}>📋</div>
              <span className={styles.actionLabel}>Mis solicitudes</span>
              <span className={styles.actionArrow}>›</span>
            </button>
            <button className={styles.actionItem}>
              <div className={styles.actionIcon} style={{ background: "#f8f9ff" }}>❓</div>
              <span className={styles.actionLabel}>Ayuda y soporte</span>
              <span className={styles.actionArrow}>›</span>
            </button>
            <button className={styles.actionItem}>
              <div className={styles.actionIcon} style={{ background: "#f0f4f7" }}>📤</div>
              <span className={styles.actionLabel}>Compartir GoFlatt</span>
              <span className={styles.actionArrow}>›</span>
            </button>
            <button
              className={`${styles.actionItem} ${styles.actionDanger}`}
              onClick={handleCerrarSesion}
            >
              <div className={styles.actionIcon} style={{ background: "#fff5f5" }}>🚪</div>
              <span className={styles.actionLabel}>Cerrar sesión</span>
              <span className={styles.actionArrow}>›</span>
            </button>
          </div>
        </div>

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
        <button className={`${styles.bnItem} ${styles.bnActive}`}>
          <span className={styles.bnIcon}>&#128100;</span>
          <span className={styles.bnLabel}>Perfil</span>
        </button>
      </nav>

    </div>
  );
}