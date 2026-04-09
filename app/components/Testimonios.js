"use client";

import Image from "next/image";
import styles from "./Testimonios.module.css";

const testimonios = [
  {
    name: "Sara M.",
    uni: "Master's in Milan · UC3M",
    text: "I went to do a master's alone and found my two flatmates in less than a week. Impossible to have done it so fast on WhatsApp. Everything was clear and organized.",
    avatar: "/avatars/avatar1.jpg",
    color: "#e8845a",
    stars: 5,
    tag: "Master's",
  },
  {
    name: "Alejandro R.",
    uni: "Exchange in Berlin · UPM",
    text: "What I loved most was seeing directly how many spots each group had left. No messages into the void, no endless Telegram groups. In 4 days I had my group.",
    avatar: "/avatars/avatar2.jpg",
    color: "#5aacb8",
    stars: 5,
    tag: "Exchange",
  },
  {
    name: "Marta L.",
    uni: "Erasmus in Lisbon · USC",
    text: "We were 3 friends and needed one more person. We posted and in 3 days our group was complete. The girl who joined is now one of my best friends.",
    avatar: "/avatars/avatar3.jpg",
    color: "#1e3a4a",
    stars: 5,
    tag: "Erasmus",
  },
  {
    name: "Pablo G.",
    uni: "Erasmus in Amsterdam · UAM",
    text: "I thought it would be just another listing app but no. You can see each person's real profile, their budget, their schedule. I found genuinely compatible people.",
    avatar: "/avatars/avatar4.jpg",
    color: "#e8845a",
    stars: 5,
    tag: "Erasmus",
  },
  {
    name: "Iria F.",
    uni: "Master's in Paris · UDC",
    text: "I was really scared to go to Paris alone knowing nobody. GoFlatt helped me find two flatmates before I even arrived. I landed with a group, not with anxiety.",
    avatar: "/avatars/avatar5.jpg",
    color: "#5aacb8",
    stars: 5,
    tag: "Master's",
  },
  {
    name: "Carlos M.",
    uni: "Exchange in Prague · UPV",
    text: "I used it to complete our group — we were 2 and needed 2 more. In less than a week we had all 4 people and were already searching for a flat together.",
    avatar: "/avatars/avatar6.jpg",
    color: "#1e3a4a",
    stars: 5,
    tag: "Exchange",
  },
];

export default function Testimonios() {
  return (
    <section id="testimonios" className={styles.section}>
      <div className={styles.container}>

        {/* HEADER */}
        <div className={styles.header}>
          <div className={styles.headerBadge}>
            <span>⭐</span> Real reviews
          </div>
          <h2 className={styles.title}>What Erasmus students<br />say about GoFlatt</h2>
          <p className={styles.subtitle}>
            Over 240 groups formed. Real experiences from people just like you.
          </p>
          <div className={styles.rating}>
            <div className={styles.ratingStars}>
              {"★★★★★".split("").map((s, i) => (
                <span key={i} className={styles.star}>{s}</span>
              ))}
            </div>
            <span className={styles.ratingNum}>4.9</span>
            <span className={styles.ratingText}>out of 5 · +240 groups</span>
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
                    alt={`${t.name} — GoFlatt review`}
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
                  Verified
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}