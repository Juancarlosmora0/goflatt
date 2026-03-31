"use client";

import styles from "./Testimonios.module.css";

const testimonios = [
  {
    name: "Sara M.",
    uni: "Máster en Milán · UC3M",
    text: "Me fui a hacer un máster sola y encontré a mis dos compañeras de piso en menos de una semana. Imposible haberlo hecho tan rápido por WhatsApp. Todo muy claro y organizado.",
    avatar: "#e8845a",
    stars: 5,
    tag: "Máster"
  },
  {
    name: "Alejandro R.",
    uni: "Intercambio en Berlín · UPM",
    text: "Lo que más me gustó es ver directamente cuántas plazas le faltan a cada grupo. Sin mensajes en el vacío ni grupos de Telegram eternos. En 4 días tenía grupo.",
    avatar: "#5aacb8",
    stars: 5,
    tag: "Intercambio"
  },
  {
    name: "Marta L.",
    uni: "Erasmus en Lisboa · USC",
    text: "Éramos 3 amigas y necesitábamos una persona más. Lo publicamos y en 3 días teníamos grupo completo. La chica que se unió es ahora una amiga más.",
    avatar: "#1e3a4a",
    stars: 5,
    tag: "Erasmus"
  },
  {
    name: "Pablo G.",
    uni: "Erasmus en Ámsterdam · UAM",
    text: "Pensé que iba a ser otro app más de anuncios pero no. Puedes ver el perfil real de cada persona, su presupuesto, sus horarios. Encontré gente compatible de verdad.",
    avatar: "#e8845a",
    stars: 5,
    tag: "Erasmus"
  },
  {
    name: "Iria F.",
    uni: "Máster en París · UDC",
    text: "Tenía mucho miedo de irme sola a París sin conocer a nadie. GoFlatt me ayudó a encontrar dos compañeras de piso antes de llegar. Llegué con grupo, no con ansiedad.",
    avatar: "#5aacb8",
    stars: 5,
    tag: "Máster"
  },
  {
    name: "Carlos M.",
    uni: "Intercambio en Praga · UPV",
    text: "Lo usé para completar nuestro grupo, éramos 2 y necesitábamos 2 más. En menos de una semana teníamos las 4 personas y ya estábamos buscando piso juntos.",
    avatar: "#1e3a4a",
    stars: 5,
    tag: "Intercambio"
  },
];

export default function Testimonios() {
  return (
    <section id="testimonios" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Lo que dicen los estudiantes</h2>
          <p className={styles.subtitle}>Experiencias reales de personas como tú</p>
          <div className={styles.rating}>
            <span className={styles.stars}>★★★★★</span>
            <span className={styles.ratingNum}>4.9</span>
            <span className={styles.ratingText}>· Más de 240 grupos formados</span>
          </div>
        </div>

        <div className={styles.grid}>
          {testimonios.map((t, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <span className={styles.cardStars}>{"★".repeat(t.stars)}</span>
                <span className={styles.cardTag}>{t.tag}</span>
              </div>
              <p className={styles.cardText}>"{t.text}"</p>
              <div className={styles.cardBottom}>
                <div
                  className={styles.avatar}
                  style={{ background: t.avatar }}
                >
                  {t.name[0]}
                </div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.uni}>{t.uni}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}