"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import styles from "./crear.module.css";

const ciudades = [
  "Milán", "Lisboa", "Berlín", "Ámsterdam", "París", "Praga",
  "Barcelona", "Madrid", "Roma", "Viena", "Varsovia", "Budapest"
];

export default function CrearGrupo() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [publicado, setPublicado] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    ciudad: "",
    semestre: "",
    cuantosSomos: 1,
    cuantosBuscamos: 1,
    perfil: "",
    presupuestoMin: "",
    presupuestoMax: "",
    zona: "",
    estadoPiso: "",
    estilo: [],
    bio: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const update = (key, value) => setData(prev => ({ ...prev, [key]: value }));

  const toggleEstilo = (val) => {
    setData(prev => ({
      ...prev,
      estilo: prev.estilo.includes(val)
        ? prev.estilo.filter(e => e !== val)
        : [...prev.estilo, val]
    }));
  };

  const isValid = data.ciudad && data.semestre && data.perfil &&
    data.presupuestoMax && data.estadoPiso && data.bio.length > 20;

  const handlePublicar = async () => {
    if (!isValid) return;
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { error } = await supabase
        .from("grupos")
        .insert({
          creador_id: user.id,
          ciudad: data.ciudad,
          semestre: data.semestre,
          cuantos_somos: data.cuantosSomos,
          cuantos_buscamos: data.cuantosBuscamos,
          perfil_buscado: data.perfil,
          presupuesto_min: data.presupuestoMin ? parseInt(data.presupuestoMin) : null,
          presupuesto_max: data.presupuestoMax ? parseInt(data.presupuestoMax) : null,
          zona: data.zona,
          estado_piso: data.estadoPiso,
          estilo: data.estilo,
          bio: data.bio,
          activo: true,
        });

      if (error) {
        console.error("Error creando grupo:", error);
        alert("Error al publicar el grupo. Inténtalo de nuevo.");
      } else {
        setPublicado(true);
      }
    } catch (e) {
      console.error("Error:", e);
      alert("Error inesperado. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  if (publicado) {
    return (
      <div className={styles.successWrapper}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>🎉</div>
          <h2 className={styles.successTitle}>¡Grupo publicado!</h2>
          <p className={styles.successSub}>
            Tu grupo ya está visible en el feed de {data.ciudad}. Los estudiantes interesados podrán enviarte solicitudes.
          </p>
          <div className={styles.successBtns}>
            <button
              className={styles.btnPrimary}
              onClick={() => mounted && router.push("/feed")}
            >
              Ver el feed →
            </button>
            <button
              className={styles.btnSecondary}
              onClick={() => mounted && router.push("/perfil")}
            >
              Ver mi perfil
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>

      {/* TOPBAR */}
      <div className={styles.topbar}>
        <button
          className={styles.backBtn}
          onClick={() => mounted && router.back()}
        >
          ← Volver
        </button>
        <span className={styles.topbarTitle}>Crear grupo</span>
        <div style={{ width: "36px" }} />
      </div>

      <div className={styles.container}>

        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headerBadge}>➕ Nuevo grupo</div>
          <h1 className={styles.headerTitle}>Publica tu grupo</h1>
          <p className={styles.headerSub}>Rellena los datos y empieza a recibir solicitudes de estudiantes compatibles.</p>
        </div>

        {/* DESTINO */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Destino y fecha</div>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Ciudad</label>
              <select
                className={styles.fieldSelect}
                value={data.ciudad}
                onChange={e => update("ciudad", e.target.value)}
              >
                <option value="">Selecciona ciudad</option>
                {ciudades.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Semestre</label>
              <select
                className={styles.fieldSelect}
                value={data.semestre}
                onChange={e => update("semestre", e.target.value)}
              >
                <option value="">Selecciona</option>
                <option value="1c2025">1er cuatrimestre 2025 (Sep – Ene)</option>
                <option value="2c2026">2º cuatrimestre 2026 (Feb – Jul)</option>
                <option value="1c2026">1er cuatrimestre 2026 (Sep – Ene)</option>
                <option value="2c2026">2º cuatrimestre 2027 (Feb – Jul)</option>
                <option value="1c2027">1er cuatrimestre 2027 (Sep – Ene)</option>
                <option value="2c2027">2º cuatrimestre 2028 (Feb – Jul)</option>
              </select>
            </div>
          </div>
        </div>

        {/* GRUPO */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Tamaño del grupo</div>
          <div className={styles.formField}>
            <label className={styles.fieldLabel}>¿Cuántos sois ahora?</label>
            <div className={styles.numberSelector}>
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  className={`${styles.numBtn} ${data.cuantosSomos === n ? styles.numBtnSelected : ""}`}
                  onClick={() => update("cuantosSomos", n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.formField}>
            <label className={styles.fieldLabel}>¿Cuántas personas buscáis?</label>
            <div className={styles.numberSelector}>
              {[1, 2, 3].map(n => (
                <button
                  key={n}
                  className={`${styles.numBtn} ${data.cuantosBuscamos === n ? styles.numBtnSelected : ""}`}
                  onClick={() => update("cuantosBuscamos", n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PERFIL */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Perfil buscado</div>
          <div className={styles.radioGroup}>
            {[
              { key: "chicas", label: "Solo chicas", sub: "Buscamos compañeras" },
              { key: "chicos", label: "Solo chicos", sub: "Buscamos compañeros" },
              { key: "mixto", label: "Mixto — cualquier género", sub: "Abiertos a todo" },
            ].map(p => (
              <div
                key={p.key}
                className={`${styles.radioOpt} ${data.perfil === p.key ? styles.radioOptSelected : ""}`}
                onClick={() => update("perfil", p.key)}
              >
                <div className={styles.radioCircle} />
                <div>
                  <div className={styles.radioText}>{p.label}</div>
                  <div className={styles.radioSub}>{p.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PRESUPUESTO */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Presupuesto y zona</div>
          <div className={styles.formRow}>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Mínimo €/mes</label>
              <input
                className={styles.fieldInput}
                type="number"
                placeholder="500"
                value={data.presupuestoMin}
                onChange={e => update("presupuestoMin", e.target.value)}
              />
            </div>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Máximo €/mes</label>
              <input
                className={styles.fieldInput}
                type="number"
                placeholder="700"
                value={data.presupuestoMax}
                onChange={e => update("presupuestoMax", e.target.value)}
              />
            </div>
          </div>
          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Zona preferida</label>
            <input
              className={styles.fieldInput}
              type="text"
              placeholder="Ej: Centro, Navigli, Brera..."
              value={data.zona}
              onChange={e => update("zona", e.target.value)}
            />
          </div>
        </div>

        {/* ESTADO PISO */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Estado del piso</div>
          <div className={styles.radioGroup}>
            {[
              { key: "buscando", label: "Aún buscando piso", sub: "Primero formamos el grupo" },
              { key: "encontrado", label: "Piso encontrado", sub: "Solo falta completar el grupo" },
              { key: "visitando", label: "Visitando pisos", sub: "Estamos en proceso" },
            ].map(e => (
              <div
                key={e.key}
                className={`${styles.radioOpt} ${data.estadoPiso === e.key ? styles.radioOptSelected : ""}`}
                onClick={() => update("estadoPiso", e.key)}
              >
                <div className={styles.radioCircle} />
                <div>
                  <div className={styles.radioText}>{e.label}</div>
                  <div className={styles.radioSub}>{e.sub}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ESTILO */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Estilo de vida del grupo</div>
          <div className={styles.chipsRow}>
            {[
              "Tranquilo", "Animado", "Deportista", "Gamer",
              "Cocinero", "Viajero", "Estudioso", "Festero",
              "No fumador", "Mascotas ok", "Ordenado", "Flexible"
            ].map(e => (
              <button
                key={e}
                className={`${styles.chip} ${data.estilo.includes(e) ? styles.chipSelected : ""}`}
                onClick={() => toggleEstilo(e)}
              >
                {e}
              </button>
            ))}
          </div>
        </div>

        {/* BIO */}
        <div className={styles.section}>
          <div className={styles.sectionTitle}>Descripción del grupo</div>
          <div className={styles.formField}>
            <label className={styles.fieldLabel}>Cuéntanos quiénes sois</label>
            <textarea
              className={styles.fieldTextarea}
              rows={4}
              placeholder="Somos 2 amigos de Madrid, estudiamos juntos y buscamos compañeros con buena vibra para Milán..."
              value={data.bio}
              onChange={e => update("bio", e.target.value)}
            />
          </div>
        </div>

        {/* PREVIEW */}
        {data.ciudad && data.cuantosBuscamos && (
          <div className={styles.preview}>
            <div className={styles.previewTitle}>Vista previa</div>
            <div className={styles.previewContent}>
              Tu grupo aparecerá en el feed de <strong>{data.ciudad}</strong> como:{" "}
              <strong>
                "{data.cuantosSomos === 1 ? "Busco" : `Somos ${data.cuantosSomos}, buscamos`}{" "}
                {data.cuantosBuscamos}{" "}
                {data.cuantosBuscamos === 1 ? "persona más" : "personas más"}"
              </strong>
              {data.presupuestoMax && (
                <> · <strong>{data.presupuestoMin || "?"} – {data.presupuestoMax}€/mes</strong></>
              )}
            </div>
          </div>
        )}

        {/* SUBMIT */}
        <div className={styles.submitSection}>
          <button
            className={styles.btnSubmit}
            onClick={handlePublicar}
            disabled={!isValid || loading}
          >
            {loading ? "Publicando..." : "Publicar grupo →"}
          </button>
          <p className={styles.submitNote}>
            Podrás editar o eliminar tu grupo en cualquier momento
          </p>
        </div>

      </div>
    </div>
  );
}