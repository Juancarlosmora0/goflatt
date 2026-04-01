import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>

      {/* TOP */}
      <div className={styles.footerTop}>

        {/* MARCA */}
        <div className={styles.brand}>
          <Image
  src="/logo.png"
  alt="GoFlatt"
  width={200}
  height={56}
  style={{
    objectFit: "contain",
    objectPosition: "left",
    height: "44px",
    width: "auto",
    filter: "brightness(0) invert(1)",
    opacity: 0.9,
  }}
/>
          <p className={styles.brandDesc}>
            Forma tu grupo de piso con estudiantes compatibles antes de llegar a tu destino.
            Para Erasmus, másters, intercambios y cualquier estudiante que se muda. Sin caos.
          </p>
          <div className={styles.socialRow}>
            {/* Instagram */}
            <a href="#" className={styles.socialBtn} aria-label="Instagram">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
            </a>
            {/* TikTok */}
            <a href="#" className={styles.socialBtn} aria-label="TikTok">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.76a4.85 4.85 0 01-1.01-.07z"/>
              </svg>
            </a>
            {/* X/Twitter */}
            <a href="#" className={styles.socialBtn} aria-label="X">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className={styles.socialBtn} aria-label="LinkedIn">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>

          {/* Badge estado */}
          <div className={styles.statusBadge}>
            <span className={styles.statusDot}></span>
            Todos los sistemas operativos
          </div>
        </div>

        {/* PRODUCTO */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Producto</h4>
          <a href="#como-funciona" className={styles.colLink}>Cómo funciona</a>
          <a href="#ciudades" className={styles.colLink}>Ciudades</a>
          <a href="/login" className={styles.colLink}>Crear grupo</a>
          <a href="/login" className={styles.colLink}>Buscar grupo</a>
          <a href="/login" className={styles.colLink}>Iniciar sesión</a>
        </div>

        {/* CIUDADES */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Ciudades</h4>
          <a href="/login" className={styles.colLink}>Milán</a>
          <a href="/login" className={styles.colLink}>Lisboa</a>
          <a href="/login" className={styles.colLink}>Berlín</a>
          <a href="/login" className={styles.colLink}>Ámsterdam</a>
          <a href="/login" className={styles.colLink}>París</a>
          <a href="/login" className={styles.colLink}>Praga</a>
        </div>

        {/* EMPRESA */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Empresa</h4>
          <a href="#" className={styles.colLink}>Sobre nosotros</a>
          <a href="#" className={styles.colLink}>Blog</a>
          <a href="#" className={styles.colLink}>Contacto</a>
          <a href="#" className={styles.colLink}>Privacidad</a>
          <a href="#" className={styles.colLink}>Términos</a>
        </div>

      </div>

      {/* DIVIDER */}
      <div className={styles.divider} />

      {/* BOTTOM */}
      <div className={styles.footerBottom}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <Image
            src="/logo.png"
            alt="GoFlatt"
            width={80}
            height={24}
            style={{ objectFit: "contain", objectPosition: "left", height: "22px", width: "auto", opacity: 0.5 }}
          />
          <span className={styles.copyright}>
            © {new Date().getFullYear()} GoFlatt. Todos los derechos reservados.
          </span>
        </div>

        <div className={styles.legalLinks}>
          <a href="#" className={styles.legalLink}>Privacidad</a>
          <a href="#" className={styles.legalLink}>Términos</a>
          <a href="#" className={styles.legalLink}>Cookies</a>
        </div>
      </div>

    </footer>
  );
}