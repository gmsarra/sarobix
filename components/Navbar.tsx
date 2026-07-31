"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyle: React.CSSProperties = {
    fontSize: "14px", color: "#777", textDecoration: "none",
    fontWeight: 500, transition: "color 0.2s ease", whiteSpace: "nowrap",
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, right: 0, left: 0, zIndex: 100,
        background: scrolled ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.95)",        backdropFilter: "blur(2px)",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s ease",
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto", padding: "0.8rem 2rem",
          display: "grid",
          gridTemplateColumns: "1fr auto 1fr",
          alignItems: "center",
          gap: "1rem",
        }}>

          {/* RIGHT LINKS */}
          <div className="desktop-links" style={{ display: "flex", alignItems: "center", gap: "2rem", justifyContent: "flex-end" }}>
            <Link href="/" style={linkStyle}>صفحه اصلی</Link>
            <Link href="/courses" style={linkStyle}>دوره‌ها</Link>
            <Link href="/blog" style={linkStyle}>مقالات</Link>
          </div>

          {/* CENTER LOGO */}
          <Link href="/" style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none" }}>
            <img src="/logo-main.png" alt="Sarobix" style={{ width: "65px", height: "65px", objectFit: "contain" }} />
          
          </Link>

          {/* LEFT LINKS + ACTIONS */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", gap: "2rem" }}>
            <div className="desktop-links" style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
              <Link href="/about" style={linkStyle}>درباره ما</Link>
              <Link href="/collaborate" style={linkStyle}>همکاری</Link>
              <Link href="/contact" style={linkStyle}>تماس با ما</Link>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginRight: "auto" }} className="nav-actions">
              <button style={{ background: "none", border: "none", cursor: "pointer", color: "#E8632A", display: "flex", alignItems: "center", padding: "4px" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
              </button>
              <button style={{
                fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "13px",
                padding: "9px 22px", borderRadius: "100px",
                background: "linear-gradient(135deg,#E8632A,#ff7a40)",
                color: "#fff", border: "none", cursor: "pointer",
                boxShadow: "0 4px 14px rgba(232,99,42,0.3)", whiteSpace: "nowrap",
              }}>ورود | ثبت‌نام</button>
            </div>

            {/* MOBILE HAMBURGER */}
            <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger-btn"
              style={{ background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: "5px", display: "none" }} aria-label="منو">
              <span style={{ display: "block", width: "24px", height: "2px", background: "#555", borderRadius: "2px" }}></span>
              <span style={{ display: "block", width: "24px", height: "2px", background: "#555", borderRadius: "2px" }}></span>
              <span style={{ display: "block", width: "24px", height: "2px", background: "#555", borderRadius: "2px" }}></span>
            </button>
          </div>

        </div>

        {menuOpen && (
          <div style={{ borderTop: "1px solid #eee", padding: "1rem 2rem", background: "#fff" }}>
            {[["صفحه اصلی","/"],["دوره‌ها","/courses"],["مقالات","/blog"],["درباره ما","/about"],["همکاری","/collaborate"],["تماس با ما","/contact"]].map(([label,href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: ".6rem 0", color: "#777", textDecoration: "none", fontSize: "15px", borderBottom: "1px solid #f5f5f5" }}>{label}</Link>
            ))}
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 900px) {
          .desktop-links { display: none !important; }
          .nav-actions { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
        .desktop-links a:hover { color: #E8632A !important; }
      `}</style>
    </>
  );
}
