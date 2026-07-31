"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* SEARCH OVERLAY */}
      {searchOpen && (
        <div className="search-overlay open">
          <button className="search-close" onClick={() => setSearchOpen(false)}>✕</button>
          <p className="search-label">جستجو در دوره‌ها</p>
          <input
            className="search-input"
            type="text"
            placeholder="نام دوره یا موضوع را بنویسید..."
            autoFocus
            onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
          />
        </div>
      )}

      {/* NAVBAR */}
      <nav
        className="navbar"
        id="navbar"
        style={{
          background: scrolled ? "rgba(26,26,46,0.98)" : "rgba(26,26,46,0.85)",
        }}
      >
        <div className="nav-container">
          <div className="nav-brand">
          <img src="/logo-new.png" alt="Sarobix" className="nav-logo-img" />              <span className="logo-name">
                SAR<span className="o-part">O</span>B<span className="o-part">i</span>X
              </span>
              <span className="logo-sub">مهندس سارا گمراوی</span>
            </div>
          </div>

          <ul className="nav-links">
            <li><Link href="/">خانه</Link></li>
            <li><Link href="/courses">دوره‌ها</Link></li>
            <li><Link href="/about">درباره ما</Link></li>
            <li><Link href="/blog">وبلاگ</Link></li>
            <li><Link href="/contact">تماس</Link></li>
          </ul>

          <div className="nav-actions">
            <div className="btn-search" onClick={() => setSearchOpen(true)}>🔍</div>
            <button className="btn-nav">ورود | ثبت‌نام</button>
            <button
              className="hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="منو"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}
        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <ul>
            <li><Link href="/" onClick={() => setMenuOpen(false)}>خانه</Link></li>
            <li><Link href="/courses" onClick={() => setMenuOpen(false)}>دوره‌ها</Link></li>
            <li><Link href="/about" onClick={() => setMenuOpen(false)}>درباره ما</Link></li>
            <li><Link href="/blog" onClick={() => setMenuOpen(false)}>وبلاگ</Link></li>
            <li><Link href="/contact" onClick={() => setMenuOpen(false)}>تماس</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
}