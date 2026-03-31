"use client";

import { useState } from "react";
import Image from "next/image";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGoogleLogin = async () => {
  setLoading(true);
  setError(null);
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/auth/callback`,
      queryParams: {
        access_type: "offline",
        prompt: "consent",
      },
    },
  });
  if (error) {
    setError("Error al iniciar sesión. Inténtalo de nuevo.");
    setLoading(false);
  }
};
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f1f2a 0%, #1e3a4a 50%, #0f1f2a 100%)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 16px",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      <div style={{
        background: "white",
        borderRadius: "32px",
        padding: "44px 40px",
        width: "100%",
        maxWidth: "420px",
        boxShadow: "0 32px 80px rgba(0,0,0,0.4)",
      }}>

        {/* LOGO */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <Image src="/logo.png" alt="GoFlatt" width={140} height={45} style={{ objectFit: "contain" }} />
          <p style={{ fontSize: "13px", color: "#aaa", marginTop: "8px", fontStyle: "italic" }}>
            Encuentra tu grupo antes de llegar
          </p>
        </div>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#1e3a4a", letterSpacing: "-0.5px", marginBottom: "8px" }}>
            Bienvenido/a 👋
          </h1>
          <p style={{ fontSize: "14px", color: "#999", lineHeight: 1.6 }}>
            Accede con Google y empieza a encontrar tu grupo de piso ideal en minutos
          </p>
        </div>

        {/* FEATURES */}
        <div style={{
          background: "#f8f9ff", borderRadius: "16px",
          padding: "16px", marginBottom: "24px",
          display: "flex", flexDirection: "column", gap: "10px"
        }}>
          {[
            { icon: "🔍", text: "Explora grupos en tu ciudad de destino" },
            { icon: "🤝", text: "Conecta con estudiantes compatibles" },
            { icon: "🏠", text: "Forma tu grupo antes de reservar" },
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "#555", fontWeight: 500 }}>
              <div style={{
                width: "34px", height: "34px", borderRadius: "10px",
                background: "white", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "16px", flexShrink: 0,
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)"
              }}>{f.icon}</div>
              {f.text}
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0", color: "#ccc", fontSize: "12px" }}>
          <div style={{ flex: 1, height: "1px", background: "#f0f0f0" }} />
          accede con
          <div style={{ flex: 1, height: "1px", background: "#f0f0f0" }} />
        </div>

        {/* GOOGLE BTN */}
        {loading ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "20px 0" }}>
            <div style={{
              width: "36px", height: "36px",
              border: "3px solid #f0f0f0",
              borderTopColor: "#e8845a",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite"
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <span style={{ fontSize: "14px", color: "#999" }}>Conectando con Google...</span>
          </div>
        ) : (
          <button
            onClick={handleGoogleLogin}
            style={{
              width: "100%", display: "flex", alignItems: "center",
              justifyContent: "center", gap: "12px",
              background: "white", border: "2px solid #eef0f8",
              borderRadius: "16px", padding: "16px",
              fontSize: "15px", fontWeight: 700, color: "#1e3a4a",
              cursor: "pointer", fontFamily: "inherit",
              boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
              marginBottom: "12px", transition: "all 0.2s"
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#e8845a";
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 32px rgba(232,132,90,0.2)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "#eef0f8";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continuar con Google
          </button>
        )}

        {error && (
          <p style={{ color: "#e74c3c", fontSize: "13px", textAlign: "center", marginTop: "12px" }}>
            {error}
          </p>
        )}

        {/* TRUST */}
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "16px", marginTop: "20px", paddingTop: "20px",
          borderTop: "1px solid #f5f5f5"
        }}>
          {["🔒 Seguro", "⚡ Gratis", "🌍 +240 estudiantes"].map((t, i) => (
            <span key={i} style={{ fontSize: "11px", color: "#bbb", fontWeight: 500 }}>{t}</span>
          ))}
        </div>

        {/* LEGAL */}
        <p style={{ textAlign: "center", fontSize: "11px", color: "#bbb", lineHeight: 1.6, marginTop: "16px" }}>
          Al continuar aceptas nuestros{" "}
          <a href="#" style={{ color: "#888", textDecoration: "underline" }}>Términos</a>
          {" "}y{" "}
          <a href="#" style={{ color: "#888", textDecoration: "underline" }}>Privacidad</a>
        </p>

      </div>
    </div>
  );
}