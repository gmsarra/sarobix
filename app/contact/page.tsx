"use client";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "14px 18px",
    background: "#fff", border: "1.5px solid #eee",
    borderRadius: "12px", fontFamily: "Vazirmatn, sans-serif",
    fontSize: "14px", color: "#333", outline: "none",
    transition: "border-color 0.2s ease", direction: "rtl",
  };

  // TODO سارا: لینک و آیدی واقعی تلگرام و لینکدین رو جایگزین placeholder ها کن
  const socials = [
    { name: "اینستاگرام", handle: "@sarobix.dev", href: "https://instagram.com/sarobix.dev", color: "#E1306C", icon: "📸", bg: "#fff0f5" },
    { name: "لینکدین", handle: "sarobix", href: "https://linkedin.com/company/sarobix", color: "#0077B5", icon: "💼", bg: "#f0f7ff" },
    { name: "تلگرام", handle: "@sarobix", href: "https://t.me/sarobix", color: "#27AEEF", icon: "✈️", bg: "#f0f9ff" },
    { name: "بله", handle: "@sarobix", href: "https://ble.ir/sarobix", color: "#28A745", icon: "🟢", bg: "#f0fff4" },
  ];

  const instagramHref = socials.find(s => s.name === "اینستاگرام")?.href || "#";

  return (
    <div style={{ background: "#fff", minHeight: "100vh", direction: "rtl", fontFamily: "Vazirmatn, sans-serif", paddingTop: "120px" }}>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "4rem", padding: "0 1.5rem" }}>
        <span style={{ display: "inline-block", fontSize: "11px", letterSpacing: "3px", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", padding: "5px 16px", borderRadius: "100px", marginBottom: "1rem" }}>
          ارتباط با ما
        </span>
        <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: "#1A1A2E", marginBottom: "0.8rem" }}>
          چطور می‌تونیم کمکت کنیم؟
        </h1>
        <p style={{ fontSize: "16px", color: "#888", maxWidth: "480px", margin: "0 auto", lineHeight: 2 }}>
          هر سوالی درباره دوره‌ها یا همکاری داری، منتظر پیامتیم
        </p>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem 6rem", display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "4rem", alignItems: "start" }}
        className="contact-grid"
      >

        {/* FORM */}
        <div style={{ background: "#fff", borderRadius: "24px", border: "1.5px solid #f0f0f0", padding: "2.5rem", boxShadow: "0 8px 40px rgba(0,0,0,0.06)" }}>
          <h2 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#1A1A2E", marginBottom: "2rem" }}>ارسال پیام</h2>
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
              <div>
                <label style={{ fontSize: "13px", color: "#555", fontWeight: 600, display: "block", marginBottom: "6px" }}>   </label>
                <input
                  type="text" placeholder="نام و نام خانوادگی" required
                  value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = "#E8632A"}
                  onBlur={e => e.target.style.borderColor = "#eee"}
                />
              </div>
              <div>
                <label style={{ fontSize: "13px", color: "#555", fontWeight: 600, display: "block", marginBottom: "6px" }}></label>
                <input
                  type="email" placeholder="example@email.com" required
                  value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                  style={{...inputStyle, direction: "ltr", textAlign: "right"}}
                  onFocus={e => e.target.style.borderColor = "#E8632A"}
                  onBlur={e => e.target.style.borderColor = "#eee"}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }} className="form-row">
              <div>
                <label style={{ fontSize: "13px", color: "#555", fontWeight: 600, display: "block", marginBottom: "6px" }}> </label>
                <input
                  type="tel" placeholder="شماره موبایل"
                  value={form.phone} onChange={e => setForm({...form, phone: e.target.value})}
                  style={{...inputStyle, direction: "ltr", textAlign: "right"}}
                  onFocus={e => e.target.style.borderColor = "#E8632A"}
                  onBlur={e => e.target.style.borderColor = "#eee"}
                />
              </div>
              <div>
                <label style={{ fontSize: "13px", color: "#555", fontWeight: 600, display: "block", marginBottom: "6px" }}></label>
                <select
                  value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
                  style={{...inputStyle, cursor: "pointer"}}
                  onFocus={e => e.target.style.borderColor = "#E8632A"}
                  onBlur={e => e.target.style.borderColor = "#eee"}
                >
                  <option value="">انتخاب کنید...</option>
                  <option value="course">سوال درباره دوره</option>
                  <option value="collab">همکاری</option>
                  <option value="support">پشتیبانی</option>
                  <option value="other">سایر</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ fontSize: "13px", color: "#555", fontWeight: 600, display: "block", marginBottom: "6px" }}> </label>
              <textarea
                placeholder="پیام خود را بنویسید..." rows={5} required
                value={form.message} onChange={e => setForm({...form, message: e.target.value})}
                style={{...inputStyle, resize: "vertical", minHeight: "120px"}}
                onFocus={e => e.target.style.borderColor = "#E8632A"}
                onBlur={e => e.target.style.borderColor = "#eee"}
              />
            </div>

            <button type="submit" style={{
              fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "15px",
              padding: "15px", borderRadius: "12px", border: "none", cursor: "pointer",
              background: sent ? "#28a745" : "linear-gradient(135deg,#E8632A,#ff7a40)",
              color: "#fff", transition: "all 0.3s ease",
              boxShadow: "0 6px 24px rgba(232,99,42,0.3)",
            }}>
              {sent ? "✓ پیام ارسال شد!" : "ارسال پیام ←"}
            </button>

          </form>
        </div>

        {/* RIGHT SIDE */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

          {/* Info card */}
          <div style={{ background: "linear-gradient(135deg,#fff5f0,#fff)", borderRadius: "20px", border: "1.5px solid rgba(232,99,42,0.15)", padding: "2rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <img src="/logo-main.png" alt="Sarobix" style={{ width: "50px", height: "50px", objectFit: "contain" }} />
              <div>
                <p style={{ fontWeight: 800, color: "#1A1A2E", fontSize: "15px" }}>  </p>
                <p style={{ color: "#888", fontSize: "13px" }}>مدرسه ی هوش مصنوعی و برنامه‌نویسی</p>
              </div>
            </div>
            <p style={{ fontSize: "14px", color: "#666", lineHeight: 2 }}>
              معمولاً در کمتر از ۲۴ ساعت پاسخ داده می شود. برای سوالات فوری از{" "}
              <a
                href={instagramHref}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#666", fontWeight: 600, textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#E8632A"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#666"; }}
              >
                اینستاگرام
              </a>
              {" "}استفاده کن.
            </p>
            <div style={{ marginTop: "1rem", padding: "12px 16px", background: "#fff", borderRadius: "10px", border: "1px solid #eee" }}>
              <p style={{ fontSize: "13px", color: "#888", marginBottom: "2px" }}>ایمیل</p>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#E8632A" }}>info@sarobix.com</p>
            </div>
          </div>

          {/* Social links */}
          <div style={{ display: "flex", flexDirection: "column", gap: "8px", width: "fit-content" }}>
            {socials.map(s => (
              <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                fontSize: "12px", fontWeight: 600, padding: "7px 14px", borderRadius: "100px",
                border: `1px solid ${s.color}20`, color: s.color,
                background: `${s.color}10`, textDecoration: "none",
                width: "fit-content", fontFamily: "Vazirmatn, sans-serif",
              }}>{s.name}</a>
            ))}
          </div>

          {/* FAQ teaser */}
          <div style={{ background: "#F5F5F5", borderRadius: "16px", padding: "1.5rem" }}>
            <p style={{ fontWeight: 700, color: "#1A1A2E", marginBottom: "0.8rem", fontSize: "14px" }}>سوالات متداول</p>
            {["دوره‌ها چطور برگزار میشن؟", " بعد از پایان دوره وارد بازار کار می شویم؟", "امکان دانلود دوره ها وجود دارد؟"].map(q => (
              <div key={q} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 0", borderBottom: "1px solid #eee", color: "#555", fontSize: "13px" }}>
                <span style={{ color: "#E8632A", fontWeight: 700 }}>←</span> {q}
              </div>
            ))}
          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
