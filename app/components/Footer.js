import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>

        {/* MARCA */}
        <div className={styles.brand}>
          <Image src="/logo.png" alt="GoFlatt" width={120} height={38} style={{ objectFit: "contain", objectPosition: "left" }} />
          <p>
            La plataforma para que estudiantes Erasmus formen su grupo de piso antes de llegar al destino. Sin caos, sin WhatsApp eternos.
          </p>
          <div className={styles.socialRow}>
            <a href="#" className={styles.socialBtn}>𝕏</a>
            <a href="#" className={styles.socialBtn}>📸</a>
            <a href="#" className={styles.socialBtn}>in</a>
            <a href="#" className={styles.socialBtn}>🎵</a>
          </div>
        </div>

        {/* PRODUCTO */}
        <div className={styles.col}>
          <h4>Producto</h4>
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#ciudades">Ciudades</a>
          <a href="#">Crear grupo</a>
          <a href="#">Buscar grupo</a>
          <a href="#">Iniciar sesión</a>
        </div>

        {/* CIUDADES */}
        <div className={styles.col}>
          <h4>Ciudades</h4>
          <a href="#">🇮🇹 Milán</a>
          <a href="#">🇵🇹 Lisboa</a>
          <a href="#">🇩🇪 Berlín</a>
          <a href="#">🇳🇱 Ámsterdam</a>
          <a href="#">🇫🇷 París</a>
        </div>

        {/* EMPRESA */}
        <div className={styles.col}>
          <h4>Empresa</h4>
          <a href="#">Sobre nosotros</a>
          <a href="#">Blog</a>
          <a href="#">Contacto</a>
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
        </div>

      </div>

      {/* BOTTOM */}
      <div className={styles.footerBottom}>
        <span className={styles.copyright}>
          © {new Date().getFullYear()} GoFlatt. Todos los derechos reservados.
        </span>

        <div className={styles.badge}>
          <span className={styles.badgeDot}></span>
          Todos los sistemas operativos
        </div>

        <div className={styles.legalLinks}>
          <a href="#">Privacidad</a>
          <a href="#">Términos</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  );
}