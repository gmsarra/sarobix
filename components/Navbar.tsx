"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import SearchOverlay from "./SearchOverlay"; // TODO سارا: اگه مسیر فرق داره اصلاح کن

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { data: session } = useSession();

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
        background: scrolled ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.95)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
        boxShadow: scrolled ? "0 2px 20px rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s ease",
      }}>

        {/* DESKTOP */}
        <div style={{
          maxWidth: "1200px", margin: "0 auto", padding: "2rem 2rem",
          display: "flex", alignItems: "center", position: "relative",
        }} className="nav-desktop">

          {/* RIGHT LINKS */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flex: 1, justifyContent: "flex-end", paddingLeft: "100px" }}>
            <Link href="/" style={linkStyle}>صفحه اصلی</Link>
            <Link href="/courses" style={linkStyle}>دوره‌های آموزشی</Link>
            <Link href="/blog" style={linkStyle}>مقالات</Link>
          </div>

          {/* CENTER LOGO - absolutely centered */}
          <Link href="/" style={{
            position: "absolute", left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none",
          }}>
            <img src="/logo-main.png" alt="Sarobix" style={{ width: "65px", height: "65px", objectFit: "contain" }} />
            <span style={{ fontSize: "10px", color: "#aaa", marginTop: "2px", letterSpacing: "2px" }}></span>
          </Link>

          {/* LEFT LINKS + ACTIONS */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", flex: 1, justifyContent: "flex-start", paddingRight: "100px" }}>
            <Link href="/about" style={linkStyle}>درباره ما</Link>
            <Link href="/collaborate" style={linkStyle}>همکاری</Link>
            <Link href="/contact" style={linkStyle}>تماس با ما</Link>
            <button onClick={() => setSearchOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "#E8632A", display: "flex", alignItems: "center", padding: "4px" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>

            {session ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.7rem" }}>
                <Link href="/dashboard" style={{ ...linkStyle, fontWeight: 700, color: "#1A1A2E" }}>
                  {session.user?.name?.split(" ")[0] || "داشبورد"}
                </Link>
                <button onClick={() => signOut({ callbackUrl: "/" })} style={{
                  fontFamily: "Vazirmatn, sans-serif", fontWeight: 600, fontSize: "12px",
                  padding: "7px 16px", borderRadius: "10px", border: "1.5px solid #ddd",
                  background: "#fff", color: "#555", cursor: "pointer",
                }}>
                  خروج
                </button>
              </div>
            ) : (
              <Link href="/login" style={{
                fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "13px",
                padding: "9px 22px", borderRadius: "10px",
                background: "linear-gradient(135deg,#E8632A,#ff7a40)",
                color: "#fff", textDecoration: "none",
                boxShadow: "0 4px 14px rgba(232,99,42,0.3)", whiteSpace: "nowrap",
              }}>ورود | ثبت‌نام</Link>
            )}
          </div>
        </div>

        {/* MOBILE */}
        <div style={{
          display: "none", padding: "0.8rem 1.5rem",
          alignItems: "center", justifyContent: "space-between",
          position: "relative",
        }} className="nav-mobile">
          <button onClick={() => setMenuOpen(!menuOpen)} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", gap: "5px", zIndex: 2,
          }}>
            <span style={{ display: "block", width: "24px", height: "2px", background: "#555", borderRadius: "2px" }}></span>
            <span style={{ display: "block", width: "24px", height: "2px", background: "#555", borderRadius: "2px" }}></span>
            <span style={{ display: "block", width: "24px", height: "2px", background: "#555", borderRadius: "2px" }}></span>
          </button>

          <Link href="/" style={{
            position: "absolute", left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none",
          }}>
            <img src="/logo-main.png" alt="Sarobix" style={{ width: "55px", height: "55px", objectFit: "contain" }} />
          </Link>

          {session ? (
            <Link href="/dashboard" style={{
              fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "12px",
              padding: "8px 16px", borderRadius: "100px", textDecoration: "none",
              background: "#1A1A2E", color: "#fff", zIndex: 2,
            }}>
              {session.user?.name?.split(" ")[0] || "داشبورد"}
            </Link>
          ) : (
            <Link href="/login" style={{
              fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "12px",
              padding: "8px 16px", borderRadius: "100px", textDecoration: "none",
              background: "linear-gradient(135deg,#E8632A,#ff7a40)",
              color: "#fff", zIndex: 2,
            }}>ورود</Link>
          )}
        </div>

        {menuOpen && (
          <div style={{ borderTop: "1px solid #eee", padding: "1rem 1.5rem", background: "#fff" }}>
            {[["صفحه اصلی","/"],["دوره‌های آموزشی","/courses"],["مقالات","/blog"],["درباره ما","/about"],["همکاری","/collaborate"],["تماس با ما","/contact"]].map(([label,href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{ display: "block", padding: ".6rem 0", color: "#777", textDecoration: "none", fontSize: "15px", borderBottom: "1px solid #f5f5f5" }}>{label}</Link>
            ))}
            {session ? (
              <button onClick={() => signOut({ callbackUrl: "/" })} style={{ display: "block", width: "100%", textAlign: "right", padding: ".6rem 0", color: "#e03131", background: "none", border: "none", fontSize: "15px", cursor: "pointer" }}>خروج</button>
            ) : (
              <Link href="/register" onClick={() => setMenuOpen(false)} style={{ display: "block", padding: ".6rem 0", color: "#777", textDecoration: "none", fontSize: "15px" }}>ثبت‌نام</Link>
            )}
          </div>
        )}
      </nav>

      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}

      <style>{`
        @media (max-width: 900px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
        }
        @media (min-width: 901px) {
          .nav-mobile { display: none !important; }
        }
        .nav-desktop a:hover { color: #E8632A !important; }
      `}</style>
    </>
  );
}
