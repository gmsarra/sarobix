import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ background: "#F5F5F5", borderTop: "1px solid #eee", padding: "3rem 0 2rem", direction: "rtl", fontFamily: "Vazirmatn, sans-serif" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", marginBottom: "2.5rem" }}>
          
          {/* Brand */}
          <div>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.3rem" }}>مهندس سارا گمراوی</p>
            <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.8, whiteSpace: "nowrap" }}>آکادمی تخصصی آموزش هوش مصنوعی و برنامه‌نویسی</p>            
            {/* Social Links */}
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "1.2rem", width: "fit-content"}}>            {[
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

          {/* Courses */}
          <div>
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1A1A2E", marginBottom: "1rem" }}>دوره‌ها</h4>
            {["هوش مصنوعی مقدماتی","هوش مصنوعی پیشرفته","یادگیری ماشین","یادگیری عمیق","رباتیک","پرامپت‌نویسی","طراحی سایت","پایتون مبتدی" ,"icdl","اسکرچ" ].map((c) => (
              <Link key={c} href="/courses" style={{ display: "block", fontSize: "13px", color: "#666", padding: ".3rem 0", textDecoration: "none" }}>{c}</Link>
            ))}
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontSize: "14px", fontWeight: 700, color: "#1A1A2E", marginBottom: "1rem" }}>دسترسی سریع</h4>
            {[["خانه", "/"], ["دوره‌ها", "/courses"], ["درباره ما", "/about"], ["وبلاگ", "/blog"], ["تماس با ما", "/contact"]].map(([label, href]) => (
              <Link key={href} href={href} style={{ display: "block", fontSize: "13px", color: "#666", padding: ".3rem 0", textDecoration: "none" }}>{label}</Link>
            ))}
          </div>

        </div>

        {/* Bottom */}
        <div style={{ borderTop: "1px solid #ddd", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
          <span style={{ fontSize: "12px", color: "#aaa" }}>© ۱۴۰۴ Sarobix — مهندس سارا گمراوی — تمام حقوق محفوظ است</span>
          <span style={{ fontSize: "12px", color: "#aaa" }}>sarobix.com</span>
        </div>

      </div>
    </footer>
  );
}