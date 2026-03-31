"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { supabase } from "../lib/supabase";
import styles from "./feed.module.css";

const CIUDADES = ["Todas", "Milán", "Lisboa", "Berlín", "Ámsterdam", "París", "Praga", "Barcelona", "Madrid", "Roma"];

const filtros = [
  { key: "todos", label: "Todos" },
  { key: "1plaza", label: "1 plaza libre" },
  { key: "2plazas", label: "2 plazas libres" },
  { key: "hasta600", label: "Hasta 600€" },
  { key: "600-800", label: "600–800€" },
  { key: "pisoconfirmado", label: "Piso confirmado" },
  { key: "nuevos", label: "Nuevos hoy" },
];

const avatarColors = ["#e8845a", "#5aacb8", "#1e3a4a", "#9b59b6", "#2ecc71", "#f39c12"];

export default function Feed() {
  const router = useRouter();
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [ciudadActiva, setCiudadActiva] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [grupos, setGrupos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [perfil, setPerfil] = useState(null);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }

      const { data: perfilData } = await supabase
        .from("perfiles")
        .select("ciudad, nombre")
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

  const gruposFiltrados = grupos.filter(g => {
    const matchCiudad = ciudadActiva === "Todas" || g.ciudad === ciudadActiva;
    const matchFiltro = (() => {
      if (filtroActivo === "todos") return true;
      if (filtroActivo === "1plaza") return g.cuantos_buscamos === 1;
      if (filtroActivo === "2plazas") return g.cuantos_buscamos === 2;
      if (filtroActivo === "hasta600") return g.presupuesto_max <= 600;
      if (filtroActivo === "600-800") return g.presupuesto_max > 600 && g.presupuesto_max <= 800;
      if (filtroActivo === "pisoconfirmado") return g.estado_piso === "encontrado";
      if (filtroActivo === "nuevos") {
        const diff = (new Date() - new Date(g.created_at)) / (1000 * 60 * 60 * 24);
        return diff < 1;
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

  const getInitial = (nombre) => nombre ? nombre.charAt(0).toUpperCase() : "?";

  const GrupoCard = ({ g, idx }) => (
    <div
      className={styles.card}
      onClick={() => router.push(`/grupos/${g.id}`)}
    >
      <div className={`${styles.cardAccent} ${g.cuantos_buscamos === 1 ? styles.cardAccent : styles.cardAccentAmber}`} />
      <div className={styles.cardTop}>
        <div className={styles.avatarStack}>
          <div className={styles.avatar} style={{ background: avatarColors[idx % avatarColors.length] }}>
            {getInitial(g.creador?.nombre)}
          </div>
          {Array.from({ length: Math.max(0, g.cuantos_somos - 1) }).map((_, i) => (
            <div key={i} className={styles.avatar} style={{ background: avatarColors[(idx + i + 1) % avatarColors.length] }}>?</div>
          ))}
          {Array.from({ length: g.cuantos_buscamos }).map((_, i) => (
            <div key={`e-${i}`} className={`${styles.avatar} ${styles.avatarEmpty}`}>+</div>
          ))}
        </div>
        <div className={styles.cardRight}>
          <div className={`${styles.badge} ${g.cuantos_buscamos === 1 ? styles.badgeGreen : styles.badgeAmber}`}>
            <span className={styles.badgeDot} />
            {g.cuantos_buscamos} {g.cuantos_buscamos === 1 ? "plaza libre" : "plazas libres"}
          </div>
        </div>
      </div>
      <div className={styles.cardTitle}>
        {g.creador?.nombre
          ? `${g.creador.nombre} busca ${g.cuantos_buscamos} ${g.cuantos_buscamos === 1 ? "persona más" : "personas más"}`
          : `Grupo busca ${g.cuantos_buscamos} ${g.cuantos_buscamos === 1 ? "persona" : "personas"}`
        }
      </div>
      <div className={styles.cardMeta}>
        {g.creador?.universidad && <span className={styles.metaItem}>🎓 {g.creador.universidad}</span>}
        {g.presupuesto_max && <span className={styles.metaItem}>💰 {g.presupuesto_min ? `${g.presupuesto_min}–` : ""}{g.presupuesto_max}€/mes</span>}
        <span className={styles.metaItem}>📍 {g.ciudad}</span>
      </div>
      {g.estilo?.length > 0 && (
        <div className={styles.cardTags}>
          {g.estilo.slice(0, 3).map((t, i) => <span key={i} className={styles.tag}>{t}</span>)}
          {g.zona && <span className={styles.tag}>{g.zona}</span>}
        </div>
      )}
      <div className={styles.cardBottom}>
        <div className={styles.spotsInfo}>
          <strong>
            {g.perfil_buscado === "chicas" ? "Solo chicas" :
             g.perfil_buscado === "chicos" ? "Solo chicos" : "Mixto"}
          </strong>
          {g.estado_piso === "encontrado" ? " · Piso confirmado ✅" :
           g.estado_piso === "visitando" ? " · Visitando pisos" : " · Buscando piso"}
        </div>
        <button className={styles.btnJoin} onClick={e => { e.stopPropagation(); router.push(`/grupos/${g.id}`); }}>
          Ver grupo →
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.wrapper}>

      {/* TOPBAR */}
      <div className={styles.topbar}>
        <div className={styles.topbarInner}>
          <a href="/" className={styles.topbarLogo}>
            <Image src="/logo.png" alt="GoFlatt" width={90} height={28} style={{ objectFit: "contain", objectPosition: "left" }} />
          </a>
          <div className={styles.searchBar}>
            <span className={styles.searchIcon}>&#128269;</span>
            <input
              className={styles.searchInput}
              placeholder="Buscar por ciudad, zona, universidad..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
            />
          </div>
          <button className={styles.notifBtn}>&#128276;</button>
        </div>
      </div>

      <div className={styles.container}>

        {/* BIENVENIDA */}
        {perfil?.nombre && (
          <div style={{
            background: "linear-gradient(135deg, #1e3a4a, #2a5568)",
            borderRadius: "20px", padding: "20px 24px",
            marginBottom: "20px", color: "white",
            display: "flex", alignItems: "center", justifyContent: "space-between"
          }}>
            <div>
              <p style={{ fontSize: "13px", opacity: 0.7, marginBottom: "4px" }}>Hola de nuevo 👋</p>
              <p style={{ fontSize: "18px", fontWeight: 800, letterSpacing: "-0.5px" }}>{perfil.nombre}</p>
            </div>
            <div style={{
              background: "rgba(255,255,255,0.1)", borderRadius: "12px",
              padding: "8px 14px", fontSize: "13px", fontWeight: 600, cursor: "pointer"
            }} onClick={() => router.push("/grupos/crear")}>
              + Crear grupo
            </div>
          </div>
        )}

        {/* HEADER */}
        <div className={styles.header}>
          <h1 className={styles.title}>Grupos disponibles</h1>
          <p className={styles.subtitle}>
            <span className={styles.subtitleHighlight}>
              {loading ? "Cargando..." : `${gruposFiltrados.length} grupos activos`}
            </span>
            {!loading && grupos.length > 0 && ` · en ${[...new Set(grupos.map(g => g.ciudad))].length} ciudades`}
          </p>
        </div>

        {/* TABS CIUDADES */}
        <div className={styles.filterScroll} style={{ marginBottom: "8px" }}>
          {CIUDADES.filter(c => c === "Todas" || grupos.some(g => g.ciudad === c)).map(c => (
            <button
              key={c}
              className={`${styles.filterChip} ${ciudadActiva === c ? styles.filterChipActive : ""}`}
              onClick={() => setCiudadActiva(c)}
            >
              {c} {c !== "Todas" && !loading && (
                <span style={{ 
                  fontSize: "10px", 
                  background: ciudadActiva === c ? "rgba(232,132,90,0.2)" : "#f0f0f0",
                  borderRadius: "100px", padding: "1px 6px", marginLeft: "4px"
                }}>
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

        {/* LOADING */}
        {loading && (
          <div style={{ textAlign: "center", padding: "48px 24px", color: "#999" }}>
            <div style={{
              width: "32px", height: "32px",
              border: "3px solid #f0f0f0", borderTopColor: "#e8845a",
              borderRadius: "50%", animation: "spin 0.8s linear infinite",
              margin: "0 auto 16px"
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ fontSize: "14px" }}>Cargando grupos...</p>
          </div>
        )}

        {/* GRUPOS */}
        {!loading && gruposFiltrados.map((g, idx) => (
          <GrupoCard key={g.id} g={g} idx={idx} />
        ))}

        {/* EMPTY STATE */}
        {!loading && gruposFiltrados.length === 0 && (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🏙️</div>
            <h3 className={styles.emptyTitle}>
              {grupos.length === 0 ? "Sé el primero" : "Sin resultados para este filtro"}
            </h3>
            <p className={styles.emptySubtitle}>
              {grupos.length === 0
                ? "Aún no hay grupos. Crea el tuyo y empieza a recibir solicitudes."
                : "Prueba con otros filtros o selecciona otra ciudad."
              }
            </p>
            <button className={styles.btnCreate} onClick={() => router.push("/grupos/crear")}>
              Crear mi grupo →
            </button>
          </div>
        )}

      </div>

      {/* BOTTOM NAV */}
      <nav className={styles.bottomNav}>
        <button className={`${styles.bnItem} ${styles.bnActive}`}>
          <span className={styles.bnIcon}>&#128269;</span>
          <span className={styles.bnLabel}>Explorar</span>
        </button>
        <button className={styles.bnCreateBtn} onClick={() => router.push("/grupos/crear")}>
          <div className={styles.bnCreateIcon}>+</div>
          <span className={styles.bnCreateLabel}>Crear</span>
        </button>
        <button className={styles.bnItem} onClick={() => router.push("/perfil")}>
          <span className={styles.bnIcon}>&#128100;</span>
          <span className={styles.bnLabel}>Perfil</span>
        </button>
      </nav>

    </div>
  );
}