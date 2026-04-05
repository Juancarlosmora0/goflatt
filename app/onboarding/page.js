"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import styles from "./onboarding.module.css";

const CIUDADES_LIST = [
  // 🇪🇸 España
  "Madrid", "Barcelona", "Valencia", "Sevilla", "Bilbao",
  "San Sebastián", "Salamanca", "Granada", "Málaga", "Zaragoza",
  "Pamplona", "Valladolid", "Córdoba", "Alicante", "Murcia",
  "Oviedo", "Santiago de Compostela", "Cádiz", "Vigo",
  "Las Palmas de Gran Canaria", "Santa Cruz de Tenerife",

  // 🇮🇹 Italia
  "Milán", "Roma", "Florencia", "Bolonia", "Turín", "Nápoles",
  "Venecia", "Pisa", "Padua", "Génova", "Palermo", "Catania",
  "Perugia", "Siena", "Trento", "Bolzano", "Trieste", "Bari",

  // 🇵🇹 Portugal
  "Lisboa", "Oporto", "Coímbra", "Braga", "Aveiro", "Faro",

  // 🇩🇪 Alemania
  "Berlín", "Múnich", "Hamburgo", "Frankfurt", "Colonia",
  "Stuttgart", "Düsseldorf", "Heidelberg", "Bonn", "Múnster",
  "Aquisgrán", "Friburgo", "Tubinga", "Mannheim", "Bremen",
  "Leipzig", "Gotinga", "Dresde", "Nuremberg",

  // 🇳🇱 Países Bajos
  "Ámsterdam", "Rotterdam", "La Haya", "Utrecht", "Leiden",
  "Maastricht", "Eindhoven", "Groninga", "Tilburg", "Wageningen",

  // 🇫🇷 Francia
  "París", "Lyon", "Burdeos", "Marsella", "Toulouse", "Estrasburgo",
  "Montpellier", "Nantes", "Rennes", "Lille", "Grenoble", "Niza",
  "Aix-en-Provence",

  // 🇨🇿 República Checa
  "Praga", "Brno", "Ostrava", "Olomouc",

  // 🇵🇱 Polonia
  "Varsovia", "Cracovia", "Wrocław", "Poznań", "Gdansk", "Lodz",

  // 🇦🇹 Austria
  "Viena", "Graz", "Innsbruck", "Salzburgo", "Linz",

  // 🇭🇺 Hungría
  "Budapest", "Debrecen", "Pécs", "Miskolc",

  // 🇧🇪 Bélgica
  "Bruselas", "Lovaina", "Gante", "Amberes", "Lieja",

  // 🇸🇪 Suecia
  "Estocolmo", "Gotemburgo", "Malmö", "Uppsala", "Lund", "Umeå",

  // 🇩🇰 Dinamarca
  "Copenhague", "Aarhus", "Odense", "Aalborg",

  // 🇫🇮 Finlandia
  "Helsinki", "Tampere", "Turku", "Oulu", "Jyväskylä",

  // 🇳🇴 Noruega
  "Oslo", "Bergen", "Trondheim", "Stavanger",

  // 🇨🇭 Suiza
  "Zúrich", "Ginebra", "Lausana", "Basilea", "Berna",

  // 🇬🇷 Grecia
  "Atenas", "Tesalónica", "Patras",

  // 🇷🇴 Rumanía
  "Bucarest", "Cluj-Napoca", "Iași", "Timișoara",

  // 🇸🇰 Eslovaquia
  "Bratislava", "Košice",

  // 🇸🇮 Eslovenia
  "Liubliana", "Maribor",

  // 🇭🇷 Croacia
  "Zagreb", "Split", "Rijeka",

  // 🇱🇹 Lituania
  "Vilna", "Kaunas",

  // 🇱🇻 Letonia
  "Riga", "Daugavpils",

  // 🇪🇪 Estonia
  "Tallin", "Tartu",

  // 🇮🇪 Irlanda
  "Dublín", "Cork", "Galway", "Limerick",
];

const SEMESTRES = [
  { key: "2c2025", label: "2º cuatrimestre 2025", sub: "Feb — Jul 2025" },
  { key: "1c2026", label: "1er cuatrimestre 2026", sub: "Sep — Ene 2026" },
  { key: "2c2026", label: "2º cuatrimestre 2026", sub: "Feb — Jul 2026" },
  { key: "1c2027", label: "1er cuatrimestre 2027", sub: "Sep — Ene 2027" },
];

const UNIVERSIDADES = [
  // 🇪🇸 ESPAÑA
  "Universidad de Alcalá (UAH)",
  "Universidad Complutense de Madrid (UCM)",
  "Universidad Autónoma de Madrid (UAM)",
  "Universidad Carlos III de Madrid (UC3M)",
  "Universidad Rey Juan Carlos (URJC)",
  "Universidad Politécnica de Madrid (UPM)",
  "Universidad de Barcelona (UB)",
  "Universidad Autónoma de Barcelona (UAB)",
  "Universidad Pompeu Fabra (UPF)",
  "Universidad Politécnica de Cataluña (UPC)",
  "Universidad de Valencia (UV)",
  "Universidad Politécnica de Valencia (UPV)",
  "Universidad de Sevilla (US)",
  "Universidad de Málaga (UMA)",
  "Universidad de Granada (UGR)",
  "Universidad de Salamanca (USAL)",
  "Universidad de Zaragoza (UNIZAR)",
  "Universidad del País Vasco (UPV/EHU)",
  "Universidad de Navarra (UNAV)",
  "Universidad de Deusto",
  "IE University",
  "ESADE Business School",
  "IESE Business School",
  "Universidad de Alicante (UA)",
  "Universidad de Murcia (UM)",
  "Universidad de Oviedo",
  "Universidad de Santiago de Compostela (USC)",
  "Universidad de Valladolid (UVA)",
  "Universidad de Córdoba (UCO)",
  "Universidad de Cádiz (UCA)",
  "Universidad de Vigo",
  "Universidad de La Laguna (ULL)",
  "Universidad de Las Palmas de Gran Canaria (ULPGC)",
  "Universidad de Extremadura (UEX)",
  "Universidad de Castilla-La Mancha (UCLM)",
  "Universidad de Burgos (UBU)",
  "Universidad de León (ULE)",
  "Universidad de La Rioja (UR)",
  "Universidad de Cantabria (UC)",
  "Universidad Jaume I (UJI)",
  "Universidad Miguel Hernández (UMH)",
  // 🇮🇹 ITALIA
  "Università Bocconi",
  "Politecnico di Milano",
  "Università degli Studi di Milano",
  "Università Cattolica del Sacro Cuore",
  "Università degli Studi di Roma La Sapienza",
  "Università degli Studi di Roma Tor Vergata",
  "Università Roma Tre",
  "LUISS Guido Carli",
  "Politecnico di Torino",
  "Università degli Studi di Torino",
  "Università degli Studi di Bologna (UNIBO)",
  "Università degli Studi di Firenze",
  "Università degli Studi di Padova",
  "Università degli Studi di Napoli Federico II",
  "Università degli Studi di Venezia Ca' Foscari",
  "Università IUAV di Venezia",
  "Università degli Studi di Genova",
  "Università degli Studi di Pisa",
  "Scuola Normale Superiore di Pisa",
  "Università degli Studi di Perugia",
  "Università degli Studi di Trento",
  "Libera Università di Bolzano",
  "Università degli Studi di Siena",
  "Università degli Studi di Palermo",
  "Università degli Studi di Catania",
  "NABA – Nuova Accademia di Belle Arti",
  "Domus Academy Milano",
  // 🇵🇹 PORTUGAL
  "Universidade de Lisboa (ULisboa)",
  "Universidade Nova de Lisboa (NOVA)",
  "Universidade Católica Portuguesa",
  "ISCTE – Instituto Universitário de Lisboa",
  "Universidade do Porto (UP)",
  "Universidade de Coimbra (UC)",
  "Universidade do Minho (UMinho)",
  "Universidade de Aveiro (UA)",
  "Universidade da Beira Interior (UBI)",
  "Universidade do Algarve (UAlg)",
  "Instituto Superior Técnico (IST)",
  "Nova School of Business and Economics (Nova SBE)",
  "Católica Lisbon School of Business",
  // 🇩🇪 ALEMANIA
  "Ludwig-Maximilians-Universität München (LMU)",
  "Technische Universität München (TUM)",
  "Freie Universität Berlin (FU Berlin)",
  "Humboldt-Universität zu Berlin",
  "Technische Universität Berlin (TU Berlin)",
  "Universität Hamburg",
  "Universität Frankfurt (Goethe-Universität)",
  "Universität Heidelberg",
  "Universität Köln",
  "Universität Bonn",
  "Universität Münster",
  "Universität Stuttgart",
  "Karlsruher Institut für Technologie (KIT)",
  "RWTH Aachen University",
  "Universität Freiburg",
  "Universität Tübingen",
  "Universität Mannheim",
  "Universität Düsseldorf (HHU)",
  "Universität Bremen",
  "Universität Leipzig",
  "Universität Göttingen",
  "WHU – Otto Beisheim School of Management",
  "ESMT Berlin",
  "Hochschule München",
  "Technische Universität Dresden",
  // 🇳🇱 PAÍSES BAJOS
  "University of Amsterdam (UvA)",
  "Vrije Universiteit Amsterdam (VU)",
  "Delft University of Technology (TU Delft)",
  "Leiden University",
  "Utrecht University (UU)",
  "Erasmus University Rotterdam (EUR)",
  "Eindhoven University of Technology (TU/e)",
  "University of Groningen (RUG)",
  "Maastricht University (UM)",
  "Tilburg University",
  "Radboud University Nijmegen",
  "Wageningen University & Research (WUR)",
  "Amsterdam University of Applied Sciences (HvA)",
  // 🇫🇷 FRANCIA
  "Université Paris 1 Panthéon-Sorbonne",
  "Université Paris-Saclay",
  "Sorbonne Université",
  "Université Paris Cité",
  "Sciences Po Paris",
  "HEC Paris",
  "École Polytechnique (X)",
  "École Normale Supérieure (ENS Paris)",
  "ESSEC Business School",
  "ESCP Business School",
  "Université de Lyon",
  "Université Claude Bernard Lyon 1",
  "Université Lumière Lyon 2",
  "Université Jean Moulin Lyon 3",
  "Université de Bordeaux",
  "Université de Strasbourg",
  "Université Toulouse III Paul Sabatier",
  "Université de Toulouse 1 Capitole",
  "Aix-Marseille Université (AMU)",
  "Université de Montpellier",
  "Université de Nantes",
  "Université de Rennes 1",
  "Université de Lille",
  "Université Grenoble Alpes",
  "EDHEC Business School",
  "EM Lyon Business School",
  "SKEMA Business School",
  // 🇨🇿 REPÚBLICA CHECA
  "Charles University Prague (UK)",
  "Czech Technical University Prague (ČVUT)",
  "University of Economics Prague (VŠE)",
  "Masaryk University Brno (MUNI)",
  "Brno University of Technology (VUT)",
  "Czech University of Life Sciences Prague (ČZU)",
  "Prague College",
  "Anglo-American University Prague",
  "University of Ostrava",
  "Palacký University Olomouc",
  // 🇵🇱 POLONIA
  "University of Warsaw (UW)",
  "Warsaw University of Technology (PW)",
  "Jagiellonian University Kraków",
  "AGH University of Science and Technology",
  "University of Wrocław",
  "Wrocław University of Technology",
  "Poznań University of Technology",
  "Adam Mickiewicz University Poznań",
  "SGH Warsaw School of Economics",
  "Kozminski University Warsaw",
  "SWPS University",
  // 🇦🇹 AUSTRIA
  "Universität Wien",
  "Technische Universität Wien (TU Wien)",
  "Wirtschaftsuniversität Wien (WU Vienna)",
  "Universität Graz",
  "Technische Universität Graz (TU Graz)",
  "Universität Innsbruck",
  "Universität Salzburg",
  // 🇭🇺 HUNGRÍA
  "Eötvös Loránd University Budapest (ELTE)",
  "Budapest University of Technology and Economics (BME)",
  "Corvinus University of Budapest",
  "Central European University (CEU)",
  "University of Debrecen",
  "University of Pécs",
  "Semmelweis University Budapest",
  // 🇧🇪 BÉLGICA
  "KU Leuven",
  "Université Catholique de Louvain (UCLouvain)",
  "Ghent University (UGent)",
  "Université Libre de Bruxelles (ULB)",
  "Vrije Universiteit Brussel (VUB)",
  "University of Antwerp",
  // 🇸🇪 SUECIA
  "Stockholm University (SU)",
  "KTH Royal Institute of Technology",
  "Lund University",
  "Uppsala University",
  "Chalmers University of Technology",
  "University of Gothenburg (GU)",
  "Stockholm School of Economics (SSE)",
  // 🇩🇰 DINAMARCA
  "University of Copenhagen (UCPH)",
  "Technical University of Denmark (DTU)",
  "Aarhus University (AU)",
  "Copenhagen Business School (CBS)",
  // 🇫🇮 FINLANDIA
  "University of Helsinki (UH)",
  "Aalto University",
  "University of Turku (UTU)",
  "Tampere University",
  // 🇳🇴 NORUEGA
  "University of Oslo (UiO)",
  "Norwegian University of Science and Technology (NTNU)",
  "University of Bergen (UiB)",
  "BI Norwegian Business School",
  // 🇨🇭 SUIZA
  "ETH Zürich",
  "University of Zurich (UZH)",
  "University of Geneva (UNIGE)",
  "EPFL – École Polytechnique Fédérale de Lausanne",
  "University of St. Gallen (HSG)",
  "IMD Business School Lausanne",
  // 🇬🇷 GRECIA
  "National and Kapodistrian University of Athens (NKUA)",
  "Aristotle University of Thessaloniki (AUTH)",
  "Athens University of Economics and Business (AUEB)",
  // 🇷🇴 RUMANÍA
  "University of Bucharest",
  "Babeș-Bolyai University Cluj-Napoca (UBB)",
  // 🇸🇰 ESLOVAQUIA
  "Comenius University Bratislava",
  "Slovak University of Technology (STU)",
  // 🇸🇮 ESLOVENIA
  "University of Ljubljana (UL)",
  // 🇭🇷 CROACIA
  "University of Zagreb (UNIZG)",
  // 🇱🇹 LITUANIA
  "Vilnius University (VU)",
  "Kaunas University of Technology (KTU)",
  // 🇱🇻 LETONIA
  "University of Latvia (LU)",
  "Riga Technical University (RTU)",
  // 🇪🇪 ESTONIA
  "University of Tartu (UT)",
  "Tallinn University of Technology (TalTech)",
  // 🇮🇪 IRLANDA
  "University College Dublin (UCD)",
  "Trinity College Dublin (TCD)",
  "University College Cork (UCC)",
  "Dublin City University (DCU)",
];

function UniSearch({ value, onChange, onSelect, selected, placeholder = "Busca tu universidad..." }) {
  const [open, setOpen] = useState(false);

  const suggestions = value.length >= 2
  ? UNIVERSIDADES.filter(u =>
      u.toLowerCase().includes(value.toLowerCase()) &&
      !(Array.isArray(selected) && selected.includes(u))
    ).slice(0, 6)
  : [];

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          className={styles.fieldInput}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={e => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          autoComplete="off"
        />
        {Array.isArray(selected) && (
          <button
            className={styles.btnAdd}
            onClick={() => { if (value.trim()) { onSelect(value); onChange(""); }}}
            disabled={!value.trim()}
          >
            + Añadir
          </button>
        )}
      </div>

      {open && (suggestions.length > 0 || value.length >= 2) && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: "white", border: "2px solid #eef0f8", borderRadius: "14px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)", zIndex: 100, overflow: "hidden",
        }}>
          {suggestions.map((u, i) => (
            <div
              key={i}
              onMouseDown={() => {
  onSelect(u);
  if (Array.isArray(selected)) onChange("");
  setOpen(false);
}}
              style={{
                padding: "12px 16px", fontSize: "13px", color: "#1e3a4a",
                cursor: "pointer", borderBottom: i < suggestions.length - 1 ? "1px solid #f5f5f5" : "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#f8f9ff"}
              onMouseLeave={e => e.currentTarget.style.background = "white"}
            >
              🎓 {u}
            </div>
          ))}
          {value.length >= 2 && (
            <div
              onMouseDown={() => {
  onSelect(value);
  if (Array.isArray(selected)) onChange("");
  setOpen(false);
}}
              style={{
                padding: "12px 16px", fontSize: "13px", color: "#e8845a",
                fontWeight: 600, cursor: "pointer",
                background: "rgba(232,132,90,0.04)",
                borderTop: suggestions.length > 0 ? "1px solid #f5f5f5" : "none",
              }}
            >
              + Añadir "{value}" manualmente
            </div>
          )}
        </div>
      )}
    </div>
  );
}
function CiudadSearch({ value, onChange, onSelect, selected }) {
  const [open, setOpen] = useState(false);

  const suggestions = value.length >= 1
    ? CIUDADES_LIST.filter(c =>
        c.toLowerCase().includes(value.toLowerCase()) &&
        !selected.includes(c)
      ).slice(0, 6)
    : [];

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", gap: "8px" }}>
        <input
          className={styles.fieldInput}
          type="text"
          placeholder="Busca tu ciudad de destino..."
          value={value}
          onChange={e => { onChange(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          autoComplete="off"
        />
        <button
          className={styles.btnAdd}
          onClick={() => { if (value.trim()) { onSelect(value); onChange(""); }}}
          disabled={!value.trim()}
        >
          + Añadir
        </button>
      </div>

      {open && (suggestions.length > 0 || value.length >= 1) && (
        <div style={{
          position: "absolute", top: "calc(100% + 4px)", left: 0, right: 0,
          background: "white", border: "2px solid #eef0f8", borderRadius: "14px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)", zIndex: 100, overflow: "hidden",
        }}>
          {suggestions.map((c, i) => (
            <div
              key={i}
              onMouseDown={() => { onSelect(c); onChange(""); setOpen(false); }}
              style={{
                padding: "12px 16px", fontSize: "13px", color: "#1e3a4a",
                cursor: "pointer", borderBottom: i < suggestions.length - 1 ? "1px solid #f5f5f5" : "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#f8f9ff"}
              onMouseLeave={e => e.currentTarget.style.background = "white"}
            >
              🏙️ {c}
            </div>
          ))}
          {value.length >= 1 && !CIUDADES_LIST.map(c => c.toLowerCase()).includes(value.toLowerCase()) && (
            <div
              onMouseDown={() => { onSelect(value); onChange(""); setOpen(false); }}
              style={{
                padding: "12px 16px", fontSize: "13px", color: "#e8845a",
                fontWeight: 600, cursor: "pointer",
                background: "rgba(232,132,90,0.04)",
                borderTop: suggestions.length > 0 ? "1px solid #f5f5f5" : "none",
              }}
            >
              + Añadir "{value}" manualmente
            </div>
          )}
        </div>
      )}
    </div>
  );
}
const TOTAL_STEPS = 6;

export default function Onboarding() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  const [data, setData] = useState({
    intencion: "",
    ciudadInput: "",
    ciudades_interes: [],
    universidades_destino: [],
    universidadInput: "",
    universidad_origen: "",
    cuando: "",
    nombre: "",
    edad: "",
    genero: "",
    tipo_estancia: "",
    presupuesto_min: "",
    presupuesto_max: "",
    vidasocial: "",
    limpieza: "",
    ruido: "",
    genero_preferido: "",
  });

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      setUser(user);
      if (user.user_metadata?.full_name) {
        setData(prev => ({ ...prev, nombre: user.user_metadata.full_name.split(" ")[0] }));
      }
    };
    getUser();
  }, []);

  const update = (key, value) => setData(prev => ({ ...prev, [key]: value }));

  const toggleCiudad = (ciudad) => {
    setData(prev => ({
      ...prev,
      ciudades_interes: prev.ciudades_interes.includes(ciudad)
        ? prev.ciudades_interes.filter(c => c !== ciudad)
        : [...prev.ciudades_interes, ciudad]
    }));
  };

  const addUniversidad = (uni) => {
    if (!uni.trim()) return;
    setData(prev => ({
      ...prev,
      universidades_destino: prev.universidades_destino.includes(uni.trim())
        ? prev.universidades_destino
        : [...prev.universidades_destino, uni.trim()],
      universidadInput: ""
    }));
  };

  const removeUniversidad = (uni) => {
    setData(prev => ({
      ...prev,
      universidades_destino: prev.universidades_destino.filter(u => u !== uni)
    }));
  };

  const guardarPerfil = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { error } = await supabase.from("perfiles").upsert({
        id: user.id,
        email: user.email,
        nombre: data.nombre,
        edad: data.edad ? parseInt(data.edad) : null,
        genero: data.genero,
        tipo_estancia: data.tipo_estancia,
        universidad_origen: data.universidad_origen,
        ciudad: data.ciudades_interes[0] || null,
        ciudades_interes: data.ciudades_interes,
        universidades_destino: data.universidades_destino,
        semestre: data.cuando,
        presupuesto_min: data.presupuesto_min ? parseInt(data.presupuesto_min) : null,
        presupuesto_max: data.presupuesto_max ? parseInt(data.presupuesto_max) : null,
        genero_preferido: data.genero_preferido,
        estilo: [data.vidasocial, data.limpieza, data.ruido].filter(Boolean),
        score_activo: true,
        bio: "",
      });
      if (error) console.error("Error guardando perfil:", error);
      else router.push("/feed");
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else guardarPerfil();
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
    else router.push("/");
  };

  const progress = Math.round((step / (TOTAL_STEPS - 1)) * 100);

  return (
    <div className={styles.wrapper}>

      {/* TOPBAR */}
      <div className={styles.topbar}>
        <div className={styles.logo} onClick={() => router.push("/")}>goflatt</div>
        {step > 0 && (
          <div className={styles.progressWrap}>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <span className={styles.progressText}>{step} de {TOTAL_STEPS - 1}</span>
          </div>
        )}
      </div>

      <div className={styles.card}>

        {step > 0 && (
          <button className={styles.btnBack} onClick={prevStep}>← Volver</button>
        )}

        {/* ===== STEP 0 — INTENCIÓN ===== */}
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

        {/* ===== STEP 1 — DESTINOS ===== */}
      
{step === 1 && (
  <>
    <div className={styles.stepNumber}>Paso 1 de 5</div>
    <h2 className={styles.stepTitle}>¿A dónde<br />podrías ir?</h2>
    <p className={styles.stepSub}>
      Añade <strong>todos los destinos posibles</strong> — así te mostramos grupos en cada uno aunque aún no sepas cuál te toca 🎯
    </p>

    <div className={styles.formField}>
      <label className={styles.fieldLabel}>Ciudades de destino</label>
      <CiudadSearch
        value={data.ciudadInput || ""}
        onChange={v => update("ciudadInput", v)}
        onSelect={ciudad => {
          setData(prev => ({
            ...prev,
            ciudades_interes: prev.ciudades_interes.includes(ciudad)
              ? prev.ciudades_interes
              : [...prev.ciudades_interes, ciudad],
            ciudadInput: ""
          }));
        }}
        selected={data.ciudades_interes}
      />
      {data.ciudades_interes.length > 0 && (
        <div className={styles.uniTags} style={{ marginTop: "12px" }}>
          {data.ciudades_interes.map((c, i) => (
            <span key={i} className={styles.uniTag}>
              🏙️ {c}
              <button
                onClick={() => setData(prev => ({
                  ...prev,
                  ciudades_interes: prev.ciudades_interes.filter(x => x !== c)
                }))}
                className={styles.uniTagRemove}
              >✕</button>
            </span>
          ))}
        </div>
      )}
      <p className={styles.fieldHint}>Si tienes varias opciones, añádelas todas</p>
    </div>

    <div className={styles.formField}>
      <label className={styles.fieldLabel}>¿Cuándo llegas?</label>
      <div className={styles.semestreGrid}>
        {SEMESTRES.map(s => (
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
      disabled={data.ciudades_interes.length === 0 || !data.cuando}
    >
      Continuar →
    </button>
  </>
)}
        {/* ===== STEP 2 — UNIVERSIDAD ===== */}
        {step === 2 && (
          <>
            <div className={styles.stepNumber}>Paso 2 de 5</div>
            <h2 className={styles.stepTitle}>Tu universidad<br />de destino 🎓</h2>
            <p className={styles.stepSub}>
              La universidad es clave para encontrar compañeros que entiendan tus horarios y tu vida
            </p>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Universidad(es) de destino</label>
              <UniSearch
                value={data.universidadInput}
                onChange={v => update("universidadInput", v)}
                onSelect={uni => addUniversidad(uni)}
                selected={data.universidades_destino}
              />
              {data.universidades_destino.length > 0 && (
                <div className={styles.uniTags}>
                  {data.universidades_destino.map((u, i) => (
                    <span key={i} className={styles.uniTag}>
                      🎓 {u}
                      <button onClick={() => removeUniversidad(u)} className={styles.uniTagRemove}>✕</button>
                    </span>
                  ))}
                </div>
              )}
              <p className={styles.fieldHint}>Si tienes varias opciones, añádelas todas</p>
            </div>
            <div className={styles.formField}>
  <label className={styles.fieldLabel}>Universidad de origen</label>
  <UniSearch
    value={data.universidad_origen}
    onChange={v => update("universidad_origen", v)}
    onSelect={v => {
      update("universidad_origen", v);
    }}
    selected={null}
    placeholder="Tu universidad actual..."
  />
</div>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>Tipo de estancia</label>
              <div className={styles.chipsRow}>
                {[
                  { key: "erasmus", label: "🇪🇺 Erasmus" },
                  { key: "master", label: "🎓 Máster" },
                  { key: "intercambio", label: "✈️ Intercambio" },
                  { key: "practicas", label: "💼 Prácticas" },
                  { key: "otro", label: "📌 Otro" },
                ].map(c => (
                  <div
                    key={c.key}
                    className={`${styles.chip} ${data.tipo_estancia === c.key ? styles.chipSelected : ""}`}
                    onClick={() => update("tipo_estancia", c.key)}
                  >
                    {c.label}
                  </div>
                ))}
              </div>
            </div>
            <button
              className={styles.btnPrimary}
              onClick={nextStep}
              disabled={data.universidades_destino.length === 0}
            >
              Continuar →
            </button>
          </>
        )}

        {/* ===== STEP 3 — QUIÉN ERES ===== */}
        {step === 3 && (
          <>
            <div className={styles.stepNumber}>Paso 3 de 5</div>
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
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>¿Con quién prefieres vivir?</label>
              <div className={styles.chipsRow}>
                {[
                  { key: "indiferente", label: "👥 Me da igual" },
                  { key: "chicas", label: "👩 Solo chicas" },
                  { key: "chicos", label: "👨 Solo chicos" },
                  { key: "mixto", label: "🌈 Mixto" },
                ].map(c => (
                  <div
                    key={c.key}
                    className={`${styles.chip} ${data.genero_preferido === c.key ? styles.chipSelected : ""}`}
                    onClick={() => update("genero_preferido", c.key)}
                  >
                    {c.label}
                  </div>
                ))}
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

        {/* ===== STEP 4 — PRESUPUESTO ===== */}
        {step === 4 && (
          <>
            <div className={styles.stepNumber}>Paso 4 de 5</div>
            <h2 className={styles.stepTitle}>¿Cuánto puedes<br />gastar al mes? 💰</h2>
            <p className={styles.stepSub}>
              Solo en alquiler de habitación. Así filtramos grupos dentro de tu rango real.
            </p>
            <div className={styles.presupuestoWrap}>
              <div className={styles.presupuestoRanges}>
                {[
                  { min: 300, max: 500, label: "300–500€", sub: "Económico" },
                  { min: 500, max: 700, label: "500–700€", sub: "Medio" },
                  { min: 700, max: 900, label: "700–900€", sub: "Cómodo" },
                  { min: 900, max: 1200, label: "900–1200€", sub: "Premium" },
                ].map(r => (
                  <div
                    key={r.label}
                    className={`${styles.rangeCard} ${
                      data.presupuesto_min == r.min && data.presupuesto_max == r.max
                        ? styles.rangeCardSelected : ""
                    }`}
                    onClick={() => { update("presupuesto_min", r.min); update("presupuesto_max", r.max); }}
                  >
                    <div className={styles.rangeLabel}>{r.label}</div>
                    <div className={styles.rangeSub}>{r.sub}</div>
                  </div>
                ))}
              </div>
              <div className={styles.presupuestoCustom}>
                <p className={styles.fieldHint}>O introduce tu rango personalizado:</p>
                <div className={styles.formRow}>
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Mínimo (€)</label>
                    <input
                      className={styles.fieldInput}
                      type="number"
                      placeholder="400"
                      value={data.presupuesto_min}
                      onChange={e => update("presupuesto_min", e.target.value)}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.fieldLabel}>Máximo (€)</label>
                    <input
                      className={styles.fieldInput}
                      type="number"
                      placeholder="700"
                      value={data.presupuesto_max}
                      onChange={e => update("presupuesto_max", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              className={styles.btnPrimary}
              onClick={nextStep}
              disabled={!data.presupuesto_max}
            >
              Continuar →
            </button>
          </>
        )}

        {/* ===== STEP 5 — ESTILO + ACTIVACIÓN ===== */}
        {step === 5 && (
          <>
            <div className={styles.stepNumber}>Paso 5 de 5</div>
            <h2 className={styles.stepTitle}>¿Cómo eres<br />en casa? 🏠</h2>
            <p className={styles.stepSub}>Último paso — esto nos ayuda a encontrarte gente compatible de verdad</p>
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
                  >{c.label}</div>
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
                  >{c.label}</div>
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
                  >{c.label}</div>
                ))}
              </div>
            </div>
            <button
              className={styles.btnPrimary}
              onClick={guardarPerfil}
              disabled={loading || !data.vidasocial || !data.limpieza || !data.ruido}
            >
              {loading ? "Guardando..." : "¡Entrar al feed! 🚀"}
            </button>
            <p className={styles.activationNote}>
              💡 Puedes editar tu perfil en cualquier momento
            </p>
          </>
        )}

      </div>
    </div>
  );
}