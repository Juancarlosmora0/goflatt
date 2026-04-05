"use client";
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import styles from "./feed.module.css";

const CIUDADES = ["Todas", "Milán", "Lisboa", "Berlín", "Ámsterdam", "París", "Praga", "Barcelona", "Madrid", "Roma"];

const CIUDAD_EMOJIS = {
  "Milán": "🇮🇹", "Lisboa": "🇵🇹", "Berlín": "🇩🇪",
  "Ámsterdam": "🇳🇱", "París": "🇫🇷", "Praga": "🇨🇿",
  "Barcelona": "🇪🇸", "Madrid": "🇪🇸", "Roma": "🇮🇹",
  "Varsovia": "🇵🇱", "Viena": "🇦🇹", "Budapest": "🇭🇺",
};

const filtros = [
  { key: "todos", label: "✦ Todos" },
  { key: "1plaza", label: "1 plaza libre" },
  { key: "2plazas", label: "2 plazas libres" },
  { key: "hasta600", label: "Hasta 600€" },
  { key: "600-800", label: "600–800€" },
  { key: "pisoconfirmado", label: "🏠 Piso confirmado" },
  { key: "nuevos", label: "🔥 Nuevos hoy" },
];

const avatarColors = ["#e8845a", "#5aacb8", "#1e3a4a", "#9b59b6", "#2ecc71", "#f39c12"];

const getTimeAgo = (date) => {
  const diff = (new Date() - new Date(date)) / 1000;
  if (diff < 3600) return `Hace ${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `Hace ${Math.floor(diff / 3600)}h`;
  return `Hace ${Math.floor(diff / 86400)}d`;
};

// ===== ALGORITMO "PARA TI" =====
const calcularCompatibilidad = (perfil, grupo) => {
  if (!perfil) return 0;
  let score = 0;

  // 1. Ciudad coincide (40 puntos)
  const ciudadesInteres = perfil.ciudades_interes || (perfil.ciudad ? [perfil.ciudad] : []);
  if (ciudadesInteres.includes(grupo.ciudad)) score += 40;

  // 2. Presupuesto solapado (25 puntos)
  const pMin = perfil.presupuesto_min || 0;
  const pMax = perfil.presupuesto_max || 9999;
  const gMin = grupo.presupuesto_min || 0;
  const gMax = grupo.presupuesto_max || 9999;
  const solapa = pMin <= gMax && gMin <= pMax;
  if (solapa) {
    // Cuanto más solapado, más puntos
    const overlap = Math.min(pMax, gMax) - Math.max(pMin, gMin);
    const maxRange = Math.max(pMax - pMin, gMax - gMin, 1);
    score += Math.round((overlap / maxRange) * 25);
  }

  // 3. Semestre coincide (20 puntos)
  if (perfil.semestre && grupo.semestre && perfil.semestre === grupo.semestre) score += 20;

  // 4. Estilo de vida coincide (10 puntos)
  const estiloUsuario = perfil.estilo || [];
  const estiloGrupo = grupo.estilo || [];
  const coincidencias = estiloUsuario.filter(e => estiloGrupo.includes(e)).length;
  if (estiloUsuario.length > 0) {
    score += Math.round((coincidencias / Math.max(estiloUsuario.length, 1)) * 10);
  }

  // 5. Género preferido compatible (5 puntos)
  const generoUsuario = perfil.genero;
  const perfilBuscado = grupo.perfil_buscado;
  if (!perfilBuscado || perfilBuscado === "mixto" || perfilBuscado === "indiferente") {
    score += 5;
  } else if (generoUsuario === "mujer" && perfilBuscado === "chicas") {
    score += 5;
  } else if (generoUsuario === "hombre" && perfilBuscado === "chicos") {
    score += 5;
  }

  return Math.min(score, 100);
};

const getScoreLabel = (score) => {
  if (score >= 80) return { label: "Match alto", color: "#27ae60", bg: "rgba(46,204,113,0.1)" };
  if (score >= 60) return { label: "Buen match", color: "#e8845a", bg: "rgba(232,132,90,0.1)" };
  if (score >= 40) return { label: "Match parcial", color: "#5aacb8", bg: "rgba(90,172,184,0.1)" };
  return { label: "Match bajo", color: "#bbb", bg: "rgba(0,0,0,0.05)" };
};

export default function Feed() {
  const router = useRouter();
  const [tabActivo, setTabActivo] = useState("parati");
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [ciudadActiva, setCiudadActiva] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [perfil, setPerfil] = useState(null);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: perfilData } = await supabase
        .from("perfiles")
        .select("*")
        .eq("id", user.id)
        .single();

      setPerfil(perfilData);
      await cargarGrupos();
    };
    init();
  }, []);

  const cargarGrupos = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("grupos")
        .select(`*, creador:perfiles(nombre, universidad, edad)`)
        .eq("activo", true)
        .order("created_at", { ascending: false });
      if (!error) setGrupos(data || []);
    } finally {
      setLoading(false);
    }
  };

  // Grupos "Para ti" — ordenados por compatibilidad
  const gruposParaTi = useMemo(() => {
    if (!perfil) return [];
    const ciudadesInteres = perfil.ciudades_interes || (perfil.ciudad ? [perfil.ciudad] : []);
    
    return grupos
      .map(g => ({ ...g, score: calcularCompatibilidad(perfil, g) }))
      .filter(g => g.score > 0 && ciudadesInteres.includes(g.ciudad))
      .sort((a, b) => b.score - a.score);
  }, [grupos, perfil]);

  // Grupos "Todos" con filtros
  const gruposTodos = useMemo(() => {
    return grupos.filter(g => {
      const matchCiudad = ciudadActiva === "Todas" || g.ciudad === ciudadActiva;
      const matchFiltro = (() => {
        if (filtroActivo === "todos") return true;
        if (filtroActivo === "1plaza") return g.cuantos_buscamos === 1;
        if (filtroActivo === "2plazas") return g.cuantos_buscamos === 2;
        if (filtroActivo === "hasta600") return g.presupuesto_max <= 600;
        if (filtroActivo === "600-800") return g.presupuesto_max > 600 && g.presupuesto_max <= 800;
        if (filtroActivo === "pisoconfirmado") return g.estado_piso === "encontrado";
        if (filtroActivo === "nuevos") {
          return (new Date() - new Date(g.created_at)) / (1000 * 60 * 60 * 24) < 1;
        }
        return true;
      })();
      const matchBusqueda = busqueda === "" ||
        g.bio?.toLowerCase().includes(busqueda.toLowerCase()) ||
        g.ciudad?.toLowerCase().includes(busqueda.toLowerCase()) ||
        g.zona?.toLowerCase().includes(busqueda.toLowerCase()) ||
        g.creador?.nombre?.toLowerCase().includes(busqueda.toLowerCase());
      return matchCiudad && matchFiltro && matchBusqueda;
    });
  }, [grupos, ciudadActiva, filtroActivo, busqueda]);

  const getInitial = (nombre) => nombre ? nombre.charAt(0).toUpperCase() : "?";

  const GrupoCard = ({ g, idx, showScore = false }) => {
    const isNew = (new Date() - new Date(g.created_at)) / (1000 * 60 * 60 * 24) < 1;
    const plazasLibres = g.cuantos_buscamos;
    const score = g.score || calcularCompatibilidad(perfil, g);
    const scoreInfo = getScoreLabel(score);

    return (
      <div className={styles.card} onClick={() => router.push(`/grupos/${g.id}`)}>

        {/* SCORE BADGE — solo en tab "Para ti" */}
        {showScore && score > 0 && (
          <div className={styles.scoreBanner} style={{ background: scoreInfo.bg }}>
            <div className={styles.scoreLeft}>
              <span className={styles.scoreEmoji}>
                {score >= 80 ? "🔥" : score >= 60 ? "⭐" : "✨"}
              </span>
              <span className={styles.scoreLabel} style={{ color: scoreInfo.color }}>
                {scoreInfo.label}
              </span>
            </div>
            <div className={styles.scoreBar}>
              <div
                className={styles.scoreBarFill}
                style={{
                  width: `${score}%`,
                  background: scoreInfo.color,
                }}
              />
            </div>
            <span className={styles.scoreNum} style={{ color: scoreInfo.color }}>
              {score}%
            </span>
          </div>
        )}

        {/* CARD HEADER */}
        <div className={styles.cardHeader}>
          <div className={styles.cardHeaderLeft}>
            <div className={styles.avatarMain} style={{ background: avatarColors[idx % avatarColors.length] }}>
              {getInitial(g.creador?.nombre)}
            </div>
            <div>
              <div className={styles.cardCreador}>
                {g.creador?.nombre || "Anónimo"}
                {g.creador?.universidad && (
                  <span className={styles.cardUni}> · {g.creador.universidad}</span>
                )}
              </div>
              <div className={styles.cardTime}>{getTimeAgo(g.created_at)}</div>
            </div>
          </div>
          <div className={styles.cardHeaderRight}>
            {isNew && <span className={styles.badgeNew}>Nuevo</span>}
            <span className={`${styles.badgePlazas} ${plazasLibres === 1 ? styles.badgePlazasGreen : styles.badgePlazasAmber}`}>
              <span className={styles.badgeDot} />
              {plazasLibres} {plazasLibres === 1 ? "plaza" : "plazas"}
            </span>
          </div>
        </div>

        {/* CIUDAD + PRESUPUESTO */}
        <div className={styles.cardHero}>
          <div className={styles.cardCiudad}>
            <span className={styles.cardCiudadEmoji}>{CIUDAD_EMOJIS[g.ciudad] || "🏙️"}</span>
            <span className={styles.cardCiudadNombre}>{g.ciudad}</span>
            {g.zona && <span className={styles.cardZona}>· {g.zona}</span>}
          </div>
          <div className={styles.cardPrecio}>
            {g.presupuesto_min && g.presupuesto_max
              ? `${g.presupuesto_min}–${g.presupuesto_max}€`
              : g.presupuesto_max
              ? `Hasta ${g.presupuesto_max}€`
              : "Precio a acordar"
            }
            <span className={styles.cardPrecioSub}>/mes</span>
          </div>
        </div>

        {/* GRUPO VISUAL */}
        <div className={styles.grupoVisual}>
          <div className={styles.grupoVisualInfo}>
            <div className={styles.avatarRow}>
              {Array.from({ length: Math.min(g.cuantos_somos, 4) }).map((_, i) => (
                <div key={i} className={styles.avatarSmall}
                  style={{ background: avatarColors[(idx + i) % avatarColors.length] }}>
                  {i === 0 ? getInitial(g.creador?.nombre) : "?"}
                </div>
              ))}
              {Array.from({ length: Math.min(g.cuantos_buscamos, 3) }).map((_, i) => (
                <div key={`e-${i}`} className={`${styles.avatarSmall} ${styles.avatarEmptySmall}`}>+</div>
              ))}
            </div>
            <span className={styles.grupoVisualText}>
              {g.cuantos_somos} {g.cuantos_somos === 1 ? "persona" : "personas"} · buscan {g.cuantos_buscamos} más
            </span>
          </div>
          <div className={`${styles.perfilBadge} ${
            g.perfil_buscado === "chicas" ? styles.perfilChicas :
            g.perfil_buscado === "chicos" ? styles.perfilChicos : styles.perfilMixto
          }`}>
            {g.perfil_buscado === "chicas" ? "👩 Solo chicas" :
             g.perfil_buscado === "chicos" ? "👨 Solo chicos" : "👥 Mixto"}
          </div>
        </div>

        {/* BIO */}
        {g.bio && <p className={styles.cardBio}>"{g.bio}"</p>}

        {/* TAGS */}
        {(g.estilo?.length > 0 || g.estado_piso) && (
          <div className={styles.cardTags}>
            {g.estado_piso === "encontrado" && (
              <span className={`${styles.tag} ${styles.tagPiso}`}>🏠 Piso confirmado</span>
            )}
            {g.estado_piso === "visitando" && (
              <span className={`${styles.tag} ${styles.tagVisitando}`}>🔍 Visitando pisos</span>
            )}
            {g.estilo?.slice(0, 3).map((t, i) => (
              <span key={i} className={styles.tag}>{t}</span>
            ))}
          </div>
        )}

        {/* CARD FOOTER */}
        <div className={styles.cardFooter}>
          <span className={styles.semestre}>📅 {g.semestre || "Próximo semestre"}</span>
          <button
            className={styles.btnVer}
            onClick={e => { e.stopPropagation(); router.push(`/grupos/${g.id}`); }}
          >
            Ver grupo →
          </button>
        </div>

      </div>
    );
  };

  const tieneDatosParaTi = perfil && (
    (perfil.ciudades_interes?.length > 0 || perfil.ciudad) &&
    perfil.presupuesto_max
  );

  return (
    <div className={styles.wrapper}>

      {/* TOPBAR */}
      <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          <a href="/" className={styles.topbarLogo}>
            <Image src="/logo.png" alt="GoFlatt" width={90} height={28}
              style={{ objectFit: "contain", objectPosition: "left" }} />
          </a>
          <div className={`${styles.searchBar} ${searchFocused ? styles.searchBarFocused : ""}`}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              className={styles.searchInput}
              placeholder="Ciudad, zona, universidad..."
              value={busqueda}
              onChange={e => { setBusqueda(e.target.value); setTabActivo("todos"); }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setSearchFocused(false)}
            />
            {busqueda && (
              <button className={styles.searchClear} onClick={() => setBusqueda("")}>✕</button>
            )}
          </div>
          <button className={styles.notifBtn} onClick={() => router.push("/perfil")}>
            <span style={{ fontSize: "18px" }}>👤</span>
          </button>
        </div>
      </div>

      <div className={styles.container}>

        {/* BIENVENIDA */}
        {perfil?.nombre && (
          <div className={styles.bienvenida}>
            <div className={styles.bienvenidaLeft}>
              <div className={styles.bienvenidaAvatar}>
                {perfil.nombre.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className={styles.bienvenidaSub}>Hola de nuevo 👋</p>
                <p className={styles.bienvenidaNombre}>{perfil.nombre.split(" ")[0]}</p>
              </div>
            </div>
            <button className={styles.btnCrearGrupo} onClick={() => router.push("/grupos/crear")}>
              + Crear grupo
            </button>
          </div>
        )}

        {/* TABS PRINCIPALES */}
        <div className={styles.mainTabs}>
          <button
            className={`${styles.mainTab} ${tabActivo === "parati" ? styles.mainTabActive : ""}`}
            onClick={() => setTabActivo("parati")}
          >
            ⭐ Para ti
            {!loading && gruposParaTi.length > 0 && (
              <span className={styles.mainTabCount}>{gruposParaTi.length}</span>
            )}
          </button>
          <button
            className={`${styles.mainTab} ${tabActivo === "todos" ? styles.mainTabActive : ""}`}
            onClick={() => setTabActivo("todos")}
          >
            🌍 Todos
            {!loading && (
              <span className={styles.mainTabCount}>{grupos.length}</span>
            )}
          </button>
        </div>

        {/* ===== TAB PARA TI ===== */}
        {tabActivo === "parati" && (
          <>
            {!tieneDatosParaTi && !loading && (
              <div className={styles.paraTiEmpty}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>🎯</div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1e3a4a", marginBottom: "8px" }}>
                  Completa tu perfil
                </h3>
                <p style={{ fontSize: "14px", color: "#999", lineHeight: 1.6, marginBottom: "20px" }}>
                  Para ver grupos compatibles contigo necesitamos saber tus destinos y presupuesto.
                </p>
                <button
                  className={styles.btnCreate}
                  onClick={() => router.push("/perfil")}
                >
                  Completar perfil →
                </button>
              </div>
            )}

            {tieneDatosParaTi && !loading && gruposParaTi.length === 0 && (
              <div className={styles.paraTiEmpty}>
                <div style={{ fontSize: "40px", marginBottom: "12px" }}>🔭</div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#1e3a4a", marginBottom: "8px" }}>
                  Aún no hay grupos para ti
                </h3>
                <p style={{ fontSize: "14px", color: "#999", lineHeight: 1.6, marginBottom: "20px" }}>
                  No hay grupos activos en tus ciudades de interés. Sé el primero o mira todos los grupos disponibles.
                </p>
                <div style={{ display: "flex", gap: "10px", justifyContent: "center", flexWrap: "wrap" }}>
                  <button className={styles.btnCreate} onClick={() => router.push("/grupos/crear")}>
                    Crear mi grupo →
                  </button>
                  <button
                    className={styles.btnVerTodos}
                    onClick={() => setTabActivo("todos")}
                  >
                    Ver todos los grupos
                  </button>
                </div>
              </div>
            )}

            {tieneDatosParaTi && !loading && gruposParaTi.length > 0 && (
              <>
                <div className={styles.paraTiHeader}>
                  <p className={styles.paraTiDesc}>
                    🎯 Grupos ordenados por compatibilidad con tu perfil
                  </p>
                </div>
                {gruposParaTi.map((g, idx) => (
                  <GrupoCard key={g.id} g={g} idx={idx} showScore={true} />
                ))}
              </>
            )}
          </>
        )}

        {/* ===== TAB TODOS ===== */}
        {tabActivo === "todos" && (
          <>
            {/* TABS CIUDADES */}
            <div className={styles.filterScroll}>
              {CIUDADES.filter(c => c === "Todas" || grupos.some(g => g.ciudad === c)).map(c => (
                <button
                  key={c}
                  className={`${styles.filterChip} ${ciudadActiva === c ? styles.filterChipActive : ""}`}
                  onClick={() => setCiudadActiva(c)}
                >
                  {CIUDAD_EMOJIS[c] && <span>{CIUDAD_EMOJIS[c]}</span>}
                  {c}
                  {c !== "Todas" && !loading && (
                    <span className={`${styles.filterCount} ${ciudadActiva === c ? styles.filterCountActive : ""}`}>
                      {grupos.filter(g => g.ciudad === c).length}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* FILTROS */}
            <div className={styles.filterScroll}>
              {filtros.map(f => (
                <button
                  key={f.key}
                  className={`${styles.filterChip} ${filtroActivo === f.key ? styles.filterChipActive : ""}`}
                  onClick={() => setFiltroActivo(f.key)}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {busqueda && (
              <p className={styles.searchResultado}>
                {gruposTodos.length} resultado{gruposTodos.length !== 1 ? "s" : ""} para "{busqueda}"
              </p>
            )}

            {gruposTodos.map((g, idx) => (
              <GrupoCard key={g.id} g={g} idx={idx} showScore={false} />
            ))}

            {gruposTodos.length === 0 && (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>{grupos.length === 0 ? "🚀" : "🔍"}</div>
                <h3 className={styles.emptyTitle}>
                  {grupos.length === 0 ? "Sé el primero" : "Sin resultados"}
                </h3>
                <p className={styles.emptySubtitle}>
                  {grupos.length === 0
                    ? "Aún no hay grupos. Crea el tuyo y empieza a recibir solicitudes."
                    : "Prueba con otros filtros o selecciona otra ciudad."
                  }
                </p>
                {grupos.length === 0 && (
                  <button className={styles.btnCreate} onClick={() => router.push("/grupos/crear")}>
                    Crear mi grupo →
                  </button>
                )}
              </div>
            )}
          </>
        )}

        {/* LOADING */}
        {loading && (
          <div className={styles.loadingWrap}>
            <div className={styles.spinner} />
            <p>Cargando grupos...</p>
          </div>
        )}

      </div>

      {/* BOTTOM NAV */}
      <nav className={styles.bottomNav}>
        <button className={`${styles.bnItem} ${styles.bnActive}`}>
          <span className={styles.bnIcon}>🔍</span>
          <span className={styles.bnLabel}>Explorar</span>
        </button>
        <button className={styles.bnCreateBtn} onClick={() => router.push("/grupos/crear")}>
          <div className={styles.bnCreateIcon}>+</div>
          <span className={styles.bnCreateLabel}>Crear</span>
        </button>
        <button className={styles.bnItem} onClick={() => router.push("/perfil")}>
          <span className={styles.bnIcon}>👤</span>
          <span className={styles.bnLabel}>Perfil</span>
        </button>
      </nav>

    </div>
  );
}