import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>

      {/* TOP */}
      <div className={styles.footerTop}>

        {/* BRAND */}
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
            Build your flatmate group with compatible students before you arrive.
            Designed for Erasmus, master’s programs, and international students. No chaos. Just clarity.
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

          {/* Status badge */}
          <div className={styles.statusBadge}>
            <span className={styles.statusDot}></span>
            All systems operational
          </div>
        </div>

        {/* PRODUCT */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Product</h4>
          <a href="#como-funciona" className={styles.colLink}>How it works</a>
          <a href="#ciudades" className={styles.colLink}>Cities</a>
          <a href="/login" className={styles.colLink}>Create group</a>
          <a href="/login" className={styles.colLink}>Find group</a>
          <a href="/login" className={styles.colLink}>Log in</a>
        </div>

        {/* CITIES */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Cities</h4>
          <a href="/login" className={styles.colLink}>Milan</a>
          <a href="/login" className={styles.colLink}>Lisbon</a>
          <a href="/login" className={styles.colLink}>Berlin</a>
          <a href="/login" className={styles.colLink}>Amsterdam</a>
          <a href="/login" className={styles.colLink}>Paris</a>
          <a href="/login" className={styles.colLink}>Prague</a>
        </div>

        {/* COMPANY */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Company</h4>
          <a href="#" className={styles.colLink}>About us</a>
          <a href="#" className={styles.colLink}>Blog</a>
          <a href="#" className={styles.colLink}>Contact</a>
          <a href="/privacy" className={styles.colLink}>Privacy</a>
          <a href="/terms" className={styles.colLink}>Terms</a>
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
            style={{
              objectFit: "contain",
              objectPosition: "left",
              height: "22px",
              width: "auto",
              opacity: 0.5
            }}
          />
          <span className={styles.copyright}>
            © {new Date().getFullYear()} GoFlatt. All rights reserved.
          </span>
        </div>

        <div className={styles.legalLinks}>
          <a href="/privacy" className={styles.legalLink}>Privacy</a>
          <a href="/terms" className={styles.legalLink}>Terms</a>
          <a href="#" className={styles.legalLink}>Cookies</a>
        </div>
      </div>

    </footer>
  );
}