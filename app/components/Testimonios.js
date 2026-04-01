"use client";

import Image from "next/image";
import styles from "./Testimonios.module.css";

const testimonios = [
  {
    name: "Sara M.",
    uni: "Máster en Milán · UC3M",
    text: "Me fui a hacer un máster sola y encontré a mis dos compañeras de piso en menos de una semana. Imposible haberlo hecho tan rápido por WhatsApp. Todo muy claro y organizado.",
    avatar: "/avatars/avatar1.jpg",
    color: "#e8845a",
    stars: 5,
    tag: "Máster",
  },
  {
    name: "Alejandro R.",
    uni: "Intercambio en Berlín · UPM",
    text: "Lo que más me gustó es ver directamente cuántas plazas le faltan a cada grupo. Sin mensajes en el vacío ni grupos de Telegram eternos. En 4 días tenía grupo.",
    avatar: "/avatars/avatar2.jpg",
    color: "#5aacb8",
    stars: 5,
    tag: "Intercambio",
  },
  {
    name: "Marta L.",
    uni: "Erasmus en Lisboa · USC",
    text: "Éramos 3 amigas y necesitábamos una persona más. Lo publicamos y en 3 días teníamos grupo completo. La chica que se unió es ahora una amiga más.",
    avatar: "/avatars/avatar3.jpg",
    color: "#1e3a4a",
    stars: 5,
    tag: "Erasmus",
  },
  {
    name: "Pablo G.",
    uni: "Erasmus en Ámsterdam · UAM",
    text: "Pensé que iba a ser otra app más de anuncios pero no. Puedes ver el perfil real de cada persona, su presupuesto, sus horarios. Encontré gente compatible de verdad.",
    avatar: "/avatars/avatar4.jpg",
    color: "#e8845a",
    stars: 5,
    tag: "Erasmus",
  },
  {
    name: "Iria F.",
    uni: "Máster en París · UDC",
    text: "Tenía mucho miedo de irme sola a París sin conocer a nadie. GoFlatt me ayudó a encontrar dos compañeras de piso antes de llegar. Llegué con grupo, no con ansiedad.",
    avatar: "/avatars/avatar5.jpg",
    color: "#5aacb8",
    stars: 5,
    tag: "Máster",
  },
  {
    name: "Carlos M.",
    uni: "Intercambio en Praga · UPV",
    text: "Lo usé para completar nuestro grupo, éramos 2 y necesitábamos 2 más. En menos de una semana teníamos las 4 personas y ya estábamos buscando piso juntos.",
    avatar: "/avatars/avatar6.jpg",
    color: "#1e3a4a",
    stars: 5,
    tag: "Intercambio",
  },
];

export default function Testimonios() {
  return (
    <section id="testimonios" className={styles.section}>
      <div className={styles.container}>

        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <span>⭐</span> Testimonios reales
          </div>
          <h2 className={styles.title}>Lo que dicen<br />los estudiantes</h2>
          <p className={styles.subtitle}>
            Más de 240 grupos formados. Experiencias reales de personas como tú.
          </p>
          <div className={styles.rating}>
            <div className={styles.ratingStars}>
              {"★★★★★".split("").map((s, i) => (
                <span key={i} className={styles.star}>{s}</span>
              ))}
            </div>
            <span className={styles.ratingNum}>4.9</span>
            <span className={styles.ratingText}>de 5 · +240 grupos</span>
          </div>
        </div>

        {/* GRID */}
        <div className={styles.grid}>
          {testimonios.map((t, i) => (
            <div key={i} className={styles.card}>

              {/* TOP */}
              <div className={styles.cardTop}>
                <div className={styles.cardStars}>
                  {"★★★★★".split("").map((s, j) => (
                    <span key={j}>{s}</span>
                  ))}
                </div>
                <span className={styles.cardTag}>{t.tag}</span>
              </div>

              {/* TEXTO */}
              <p className={styles.cardText}>"{t.text}"</p>

              {/* AUTOR */}
              <div className={styles.cardBottom}>
                <div className={styles.avatarWrap}>
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    width={44}
                    height={44}
                    className={styles.avatar}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                  <div
                    className={styles.avatarFallback}
                    style={{ background: t.color, display: "none" }}
                  >
                    {t.name[0]}
                  </div>
                </div>
                <div className={styles.authorInfo}>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.uni}>{t.uni}</div>
                </div>
                <div className={styles.verifiedBadge}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  Verificado
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}