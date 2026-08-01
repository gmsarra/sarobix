/*import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#F5F5F5", borderTop: "1px solid #eee", padding: "3rem 0 2rem", direction: "rtl", fontFamily: "Vazirmatn, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", marginBottom: "2.5rem" }}>
          
          {/* Brand */
          /*<div>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.3rem" }}>مهندس سارا گمراوی</p>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.8, whiteSpace: "nowrap" }}>آکادمی تخصصی آموزش هوش مصنوعی و برنامه‌نویسی</p>            
            {/* Social Links */
         /*   <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "1.2rem", width: "fit-content"}}>            {[
  { label: "اینستاگرام", href: "https://instagram.com/sarobix.dev", color: "#E1306C" },
  { label: "لینکدین", href: "", color: "#0077B5" },
  { label: "تلگرام", href: "", color: "#27AEEF" },
  { label: "بله", href: "https://ble.ir/sarobix", color: "#28A745" },
].map((s) => (
    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
        fontSize: "12px", fontWeight: 600, padding: "7px 14px", borderRadius: "100px",
        border: `1px solid ${s.color}20`, color: s.color,
        background: `${s.color}10`, textDecoration: "none",
        width: "fit-content",
      }}>{s.label}</a>
))}
            </div>
          </div>

          {/* Courses */
          /*<div>
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1A1A2E", marginBottom: "1rem" }}>دوره‌ها</h4>
            {["هوش مصنوعی مقدماتی","هوش مصنوعی پیشرفته","یادگیری ماشین","یادگیری عمیق","رباتیک","پرامپت‌نویسی","طراحی سایت","پایتون مبتدی" ,"icdl","اسکرچ" ].map((c) => (
              <Link key={c} href="/courses" style={{ display: "block", fontSize: "13px", color: "#666", padding: ".3rem 0", textDecoration: "none" }}>{c}</Link>
            ))}
          </div>

          {/* Links */
         /* <div>
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1A1A2E", marginBottom: "1rem" }}>دسترسی سریع</h4>
            {[["خانه", "/"], ["دوره‌ها", "/courses"], ["درباره ما", "/about"], ["وبلاگ", "/blog"], ["تماس با ما", "/contact"]].map(([label, href]) => (
              <Link key={href} href={href} style={{ display: "block", fontSize: "13px", color: "#666", padding: ".3rem 0", textDecoration: "none" }}>{label}</Link>
            ))}
          </div>

        </div>

        {/* Bottom */ 
       /* <div style={{ borderTop: "1px solid #ddd", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <span style={{ fontSize: "12px", color: "#aaa" }}>© ۱۴۰۴ Sarobix — مهندس سارا گمراوی — تمام حقوق محفوظ است</span>
          <span style={{ fontSize: "12px", color: "#aaa" }}>sarobix.com</span>
        </div>

      </div>
    </footer>
  );
}*/






"use client";
import Link from "next/link";

export default function Footer() {
  const socials = [
    { name: "اینستاگرام", href: "https://instagram.com/sarobix.dev", color: "#E1306C" },
    { name: "تلگرام", href: "https://t.me/sarobix", color: "#27AEEF" },
    { name: "لینکدین", href: "https://linkedin.com/company/sarobix", color: "#0077B5" },
    { name: "بله", href: "https://ble.ir/sarobix", color: "#28A745" },
  ];

  // TODO سارا: عنوان و لینک واقعی ۸ دوره رو جایگزین این‌ها کن
  const courses = [
    { title: "دوره برنامه‌نویسی مقدماتی", href: "/courses/programming-basics" },
    { title: "دوره هوش مصنوعی", href: "/courses/ai" },
    { title: "دوره رباتیک", href: "/courses/robotics" },
    { title: "دوره پایتون", href: "/courses/python" },
  ];

  const quickLinks = [
    { title: "صفحه اصلی", href: "/" },
    { title: "دوره‌های آموزشی", href: "/courses" },
    { title: "درباره ما", href: "/about" },
    { title: "مقالات", href: "/blog" },
    { title: "تماس با ما", href: "/contact" },
  ];

  return (
    <footer style={{
      background: "#1A1A2E",
      color: "#fff",
      fontFamily: "Vazirmatn, sans-serif",
      direction: "rtl",
      paddingTop: "4rem",
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "0 1.5rem 3rem",
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr",
        gap: "3rem",
      }}
        className="footer-grid"
      >
        {/* Brand column */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "1rem" }}>
            <img src="/logo-main.png" alt="Sarobix" style={{ width: "44px", height: "44px", objectFit: "contain" }} />
            <div>
              <p style={{ fontWeight: 800, fontSize: "15px", margin: 0 }}>مهندس سارا گمراوی</p>
              <p style={{ fontSize: "12px", color: "#a0a0b8", margin: 0 }}>آکادمی تخصصی آموزش هوش مصنوعی و برنامه‌نویسی</p>
            </div>
          </div>
          <p style={{ fontSize: "13px", color: "#a0a0b8", lineHeight: 2, maxWidth: "320px", marginBottom: "1.2rem" }}>
            آموزش برنامه‌نویسی و هوش مصنوعی برای تمامی سنین، با رویکردی عملی و پروژه‌محور.
          </p>

          {/* Social pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {socials.map(s => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "12px", fontWeight: 600, padding: "7px 14px", borderRadius: "100px",
                  border: `1px solid ${s.color}40`, color: s.color,
                  background: `${s.color}15`, textDecoration: "none",
                  width: "fit-content", fontFamily: "Vazirmatn, sans-serif",
                }}
              >
                {s.name}
              </a>
            ))}
          </div>
        </div>

        {/* Courses column */}
        <div>
          <p style={{ fontWeight: 700, fontSize: "14px", marginBottom: "1rem", color: "#C9A96E" }}>دوره‌ها</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {courses.map(c => (
              <Link
                key={c.href}
                href={c.href}
                style={{ fontSize: "13px", color: "#d0d0e0", textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#E8632A"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#d0d0e0"; }}
              >
                {c.title}
              </Link>
            ))}
            <Link
              href="/courses"
              style={{ fontSize: "13px", color: "#E8632A", fontWeight: 600, textDecoration: "none" }}
            >
              مشاهده همه دوره‌ها ←
            </Link>
          </div>
        </div>

        {/* Quick links column */}
        <div>
          <p style={{ fontWeight: 700, fontSize: "14px", marginBottom: "1rem", color: "#C9A96E" }}>دسترسی سریع</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {quickLinks.map(l => (
              <Link
                key={l.href}
                href={l.href}
                style={{ fontSize: "13px", color: "#d0d0e0", textDecoration: "none", transition: "color 0.2s ease" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#E8632A"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "#d0d0e0"; }}
              >
                {l.title}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: "1px solid rgba(255,255,255,0.1)",
        padding: "1.2rem 1.5rem",
        textAlign: "center",
        fontSize: "12px",
        color: "#7a7a95",
      }}>
        © {new Date().getFullYear()} Sarobix — تمامی حقوق محفوظ است
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
