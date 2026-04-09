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

        {/* LOGO */}
        <a href="/" style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
          aria-label="GoFlatt — Find Erasmus Roommates">
          <Image
            src="/logo.png"
            alt="GoFlatt — Find Erasmus Roommates Before You Arrive"
            width={240}
            height={72}
            priority
            style={{ height: "40px", width: "auto", objectFit: "contain" }}
          />
        </a>

        {/* Links — solo desktop */}
        <div className={styles.links}>
          <a href="#como-funciona" className={styles.link}>How it works</a>
          <a href="#ciudades" className={styles.link}>Cities</a>
          <a href="#testimonios" className={styles.link}>Reviews</a>
        </div>

        {/* Acciones — solo desktop */}
        <div className={styles.actions}>
          <a href="/login" className={styles.loginBtn}>Log in</a>
          <a href="/login" className={styles.ctaBtn}>Start for free →</a>
        </div>

        {/* Hamburger — solo móvil */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Menú móvil */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}>
        <a href="#como-funciona" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
          How it works
        </a>
        <a href="#ciudades" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
          Cities
        </a>
        <a href="#testimonios" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
          Reviews
        </a>
        <div className={styles.mobileDivider} />
        <a href="/login" className={styles.mobileLogin} onClick={() => setMenuOpen(false)}>
          Log in
        </a>
        <a href="/login" className={styles.mobileCta} onClick={() => setMenuOpen(false)}>
          Start for free →
        </a>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.2)",
            zIndex: 998,
            backdropFilter: "blur(2px)",
          }}
        />
      )}
    </>
  );
}