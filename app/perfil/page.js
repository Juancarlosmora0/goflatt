"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import styles from "./perfil.module.css";

const CIUDAD_EMOJIS = {
  "Milán": "🇮🇹", "Lisboa": "🇵🇹", "Berlín": "🇩🇪",
  "Ámsterdam": "🇳🇱", "París": "🇫🇷", "Praga": "🇨🇿",
  "Barcelona": "🇪🇸", "Madrid": "🇪🇸", "Roma": "🇮🇹",
  "Varsovia": "🇵🇱", "Viena": "🇦🇹", "Budapest": "🇭🇺",
};

const formatSemestre = (s) => {
  if (!s) return "–";
  return s.replace("1c", "1er cuatrimestre ").replace("2c", "2º cuatrimestre ");
};

export default function Perfil() {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [perfil, setPerfil] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [solicitudesPendientes, setSolicitudesPendientes] = useState(0);
  const [misGrupos, setMisGrupos] = useState([]);
  const [editando, setEditando] = useState(false);
  const [bioEdit, setBioEdit] = useState("");
  const [guardandoBio, setGuardandoBio] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUser(user);

      const { data: perfilData } = await supabase
        .from("perfiles")
        .select("*")
        .eq("id", user.id)
        .single();

      const perfilFinal = perfilData || {
        nombre: user.user_metadata?.full_name || "Usuario",
        email: user.email,
      };
      setPerfil(perfilFinal);
      setBioEdit(perfilFinal.bio || "");

      const { data: grupos } = await supabase
        .from("grupos")
        .select("id, ciudad, semestre, cuantos_buscamos, activo, presupuesto_min, presupuesto_max")
        .eq("creador_id", user.id)
        .eq("activo", true);

      setMisGrupos(grupos || []);

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

  const handleAvatarClick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validar tamaño (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen no puede superar 5MB");
      return;
    }

    setUploadingAvatar(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${user.id}/avatar.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(path);

      const urlConTimestamp = `${publicUrl}?t=${Date.now()}`;

      await supabase
        .from("perfiles")
        .update({ avatar_url: urlConTimestamp })
        .eq("id", user.id);

      setPerfil(prev => ({ ...prev, avatar_url: urlConTimestamp }));
    } catch (err) {
      console.error("Error subiendo avatar:", err);
      alert("Error al subir la imagen. Inténtalo de nuevo.");
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleGuardarBio = async () => {
    if (!user) return;
    setGuardandoBio(true);
    try {
      await supabase
        .from("perfiles")
        .update({ bio: bioEdit })
        .eq("id", user.id);
      setPerfil(prev => ({ ...prev, bio: bioEdit }));
      setEditando(false);
    } finally {
      setGuardandoBio(false);
    }
  };

  const handleCerrarSesion = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const handleCompartir = async () => {
    if (navigator.share) {
      navigator.share({
        title: "GoFlatt — Encuentra tu grupo de piso",
        text: "Encuentra compañeros de piso para tu Erasmus o intercambio",
        url: "https://goflatt.com",
      });
    } else {
      await navigator.clipboard.writeText("https://goflatt.com");
      alert("¡Enlace copiado!");
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

  const ciudadesInteres = perfil?.ciudades_interes || (perfil?.ciudad ? [perfil.ciudad] : []);

  return (
    <div className={styles.wrapper}>

      {/* INPUT FOTO OCULTO */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        style={{ display: "none" }}
        onChange={handleAvatarChange}
      />

      {/* TOPBAR */}
      <div className={styles.topbar}>
        <button className={styles.backBtn} onClick={() => router.push("/feed")}>← Feed</button>
        <span className={styles.topbarTitle}>Mi perfil</span>
        <button className={styles.topbarBtn} onClick={() => router.push("/onboarding")}>
          Editar
        </button>
      </div>

      <div className={styles.container}>

        {/* HERO PERFIL */}
        <div className={styles.heroCard}>
          <div className={styles.heroBg} />

          {/* AVATAR */}
          <div className={styles.avatarWrap} onClick={handleAvatarClick}>
            {uploadingAvatar ? (
              <div className={styles.avatar}>
                <div className={styles.avatarSpinner} />
              </div>
            ) : perfil?.avatar_url ? (
              <img
                src={perfil.avatar_url}
                alt="Avatar"
                className={styles.avatarImg}
              />
            ) : (
              <div className={styles.avatar}>
                {perfil?.nombre?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <div className={styles.avatarEditBtn}>
              {uploadingAvatar ? "..." : "📷"}
            </div>
          </div>

          <div className={styles.heroNombre}>{perfil?.nombre || "Usuario"}</div>
          <div className={styles.heroSub}>
            {[
              perfil?.edad && `${perfil.edad} años`,
              perfil?.genero && perfil.genero.charAt(0).toUpperCase() + perfil.genero.slice(1),
              perfil?.tipo_estancia && perfil.tipo_estancia.charAt(0).toUpperCase() + perfil.tipo_estancia.slice(1),
            ].filter(Boolean).join(" · ")}
          </div>

          {/* Destinos */}
          {ciudadesInteres.length > 0 && (
            <div className={styles.destinosRow}>
              {ciudadesInteres.map((c, i) => (
                <span key={i} className={styles.destinoBadge}>
                  {CIUDAD_EMOJIS[c] || "🏙️"} {c}
                </span>
              ))}
            </div>
          )}

          {/* Universidad */}
          {(perfil?.universidad_origen || perfil?.universidad) && (
            <div className={styles.uniRow}>
              🎓 {perfil.universidad_origen || perfil.universidad}
            </div>
          )}
        </div>

        {/* STATS */}
        <div className={styles.statsRow}>
          <div
            className={styles.statCard}
            onClick={() => router.push("/solicitudes")}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.statNum} style={{ color: solicitudesPendientes > 0 ? "#e8845a" : "#1e3a4a" }}>
              {solicitudesPendientes}
            </div>
            <div className={styles.statLabel}>
              {solicitudesPendientes > 0 ? "⚡ Pendientes" : "Solicitudes"}
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>{misGrupos.length}</div>
            <div className={styles.statLabel}>Mis grupos</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statNum}>
              {perfil?.presupuesto_max ? `${perfil.presupuesto_max}€` : "–"}
            </div>
            <div className={styles.statLabel}>Presupuesto</div>
          </div>
        </div>

        {/* MI GRUPO ACTIVO */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Mi grupo activo</div>
            {misGrupos.length === 0 && (
              <button
                className={styles.sectionAction}
                onClick={() => router.push("/grupos/crear")}
              >
                + Crear
              </button>
            )}
          </div>
          {misGrupos.length > 0 ? (
            misGrupos.map(g => (
              <div
                key={g.id}
                className={styles.grupoCard}
                onClick={() => router.push(`/grupos/${g.id}`)}
              >
                <div className={styles.grupoCardIcon}>
                  {CIUDAD_EMOJIS[g.ciudad] || "🏙️"}
                </div>
                <div className={styles.grupoCardInfo}>
                  <div className={styles.grupoCardTitle}>{g.ciudad}</div>
                  <div className={styles.grupoCardSub}>
                    {g.cuantos_buscamos} {g.cuantos_buscamos === 1 ? "plaza libre" : "plazas libres"}
                    {g.presupuesto_max && ` · Hasta ${g.presupuesto_max}€`}
                  </div>
                </div>
                <div className={styles.grupoCardBadge}>Activo</div>
                <span className={styles.grupoCardArrow}>→</span>
              </div>
            ))
          ) : (
            <div
              className={styles.grupoCardEmpty}
              onClick={() => router.push("/grupos/crear")}
            >
              <div className={styles.grupoEmptyIcon}>🏠</div>
              <div>
                <div className={styles.grupoEmptyTitle}>Sin grupo activo</div>
                <div className={styles.grupoEmptySub}>Crea uno y empieza a recibir solicitudes</div>
              </div>
              <span className={styles.grupoCardArrow}>→</span>
            </div>
          )}
        </div>

        {/* SOBRE MÍ */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Sobre mí</div>
            {!editando && (
              <button className={styles.sectionAction} onClick={() => setEditando(true)}>
                Editar
              </button>
            )}
          </div>
          {editando ? (
            <>
              <textarea
                className={styles.bioTextarea}
                value={bioEdit}
                onChange={e => setBioEdit(e.target.value)}
                placeholder="Cuéntale a los demás cómo eres, qué estudias y qué buscas en un compañero de piso..."
                rows={4}
                autoFocus
              />
              <div className={styles.bioActions}>
                <button
                  className={styles.btnCancelar}
                  onClick={() => { setEditando(false); setBioEdit(perfil?.bio || ""); }}
                >
                  Cancelar
                </button>
                <button
                  className={styles.btnGuardar}
                  onClick={handleGuardarBio}
                  disabled={guardandoBio}
                >
                  {guardandoBio ? "Guardando..." : "Guardar"}
                </button>
              </div>
            </>
          ) : (
            <p className={styles.bioText} onClick={() => setEditando(true)}>
              {perfil?.bio || "Añade una descripción sobre ti para que los grupos te conozcan mejor..."}
            </p>
          )}
        </div>

        {/* INFORMACIÓN */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionTitle}>Información</div>
            <button className={styles.sectionAction} onClick={() => router.push("/onboarding")}>
              Actualizar
            </button>
          </div>
          {[
            {
              label: "Destinos de interés",
              value: ciudadesInteres.length > 0
                ? ciudadesInteres.map(c => `${CIUDAD_EMOJIS[c] || "🏙️"} ${c}`).join(", ")
                : "–"
            },
            {
              label: "Universidad destino",
              value: perfil?.universidades_destino?.length > 0
                ? perfil.universidades_destino.join(", ")
                : perfil?.universidad || "–"
            },
            {
              label: "Universidad origen",
              value: perfil?.universidad_origen || "–"
            },
            {
              label: "Tipo de estancia",
              value: perfil?.tipo_estancia
                ? perfil.tipo_estancia.charAt(0).toUpperCase() + perfil.tipo_estancia.slice(1)
                : "–"
            },
            {
              label: "Semestre",
              value: formatSemestre(perfil?.semestre)
            },
            {
              label: "Presupuesto",
              value: perfil?.presupuesto_max
                ? `${perfil.presupuesto_min ? `${perfil.presupuesto_min}–` : "Hasta "}${perfil.presupuesto_max}€/mes`
                : "–"
            },
            {
              label: "Prefiero vivir con",
              value: perfil?.genero_preferido === "chicas" ? "Solo chicas" :
                     perfil?.genero_preferido === "chicos" ? "Solo chicos" :
                     perfil?.genero_preferido === "mixto" ? "Mixto" :
                     perfil?.genero_preferido === "indiferente" ? "Me da igual" : "–"
            },
          ].map((row, i) => (
            <div key={i} className={styles.infoRow}>
              <span className={styles.infoLabel}>{row.label}</span>
              <span className={styles.infoValue}>{row.value}</span>
            </div>
          ))}
        </div>

        {/* ESTILO DE VIDA */}
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
                <span className={styles.actionLabel}>Solicitudes pendientes</span>
                <span className={styles.notifBadge}>{solicitudesPendientes}</span>
                <span className={styles.actionArrow}>›</span>
              </button>
            )}

            <button className={styles.actionItem} onClick={() => router.push("/solicitudes")}>
              <div className={styles.actionIcon} style={{ background: "#f0f9fa" }}>📋</div>
              <span className={styles.actionLabel}>Mis solicitudes</span>
              <span className={styles.actionArrow}>›</span>
            </button>

            <button className={styles.actionItem} onClick={handleCompartir}>
              <div className={styles.actionIcon} style={{ background: "#f8f9ff" }}>📤</div>
              <span className={styles.actionLabel}>Compartir GoFlatt</span>
              <span className={styles.actionArrow}>›</span>
            </button>

            <button className={styles.actionItem}
              onClick={() => window.open("mailto:privacy@goflatt.com", "_blank")}>
              <div className={styles.actionIcon} style={{ background: "#f8f9ff" }}>❓</div>
              <span className={styles.actionLabel}>Ayuda y soporte</span>
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
          <span className={styles.bnIcon}>🔍</span>
          <span className={styles.bnLabel}>Explorar</span>
        </button>
        <button className={styles.bnCreateBtn} onClick={() => router.push("/grupos/crear")}>
          <div className={styles.bnCreateIcon}>+</div>
          <span className={styles.bnCreateLabel}>Crear</span>
        </button>
        <button className={`${styles.bnItem} ${styles.bnActive}`}>
          <span className={styles.bnIcon}>👤</span>
          <span className={styles.bnLabel}>Perfil</span>
        </button>
      </nav>

    </div>
  );
}