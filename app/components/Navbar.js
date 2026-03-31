"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <>
 <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
  <a href="/">
    <Image
      src="/logo.png"
      alt="GoFlatt"
      width={140}
      height={45}
      className={styles.logo}
      style={{ objectFit: "contain", objectPosition: "left center" }}
    />
  </a>

        {/* Links — solo desktop */}
        <div className={styles.links}>
          <a href="#como-funciona" className={styles.link}>Cómo funciona</a>
          <a href="#ciudades" className={styles.link}>Ciudades</a>
          <a href="#testimonios" className={styles.link}>Testimonios</a>
        </div>

        {/* Acciones — solo desktop */}
        <div className={styles.actions}>
          <a href="#" className={styles.loginBtn}>Iniciar sesión</a>
          <a href="/login" className={styles.ctaBtn}>Empezar gratis →</a>
        </div>

        {/* Hamburger — solo móvil */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Menú móvil */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <a href="#como-funciona" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
          Cómo funciona
        </a>
        <a href="#ciudades" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
          Ciudades
        </a>
        <a href="#testimonios" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
          Testimonios
        </a>
        <div className={styles.mobileDivider} />
        <a href="#" className={styles.mobileLogin} onClick={() => setMenuOpen(false)}>
          Iniciar sesión
        </a>
        <a href="/onboarding" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>
          Empezar gratis →
        </a>
      </div>

      {/* Overlay al abrir menú */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.2)",
            zIndex: 998,
            backdropFilter: "blur(2px)"
          }}
        />
      )}
    </>
  );
}