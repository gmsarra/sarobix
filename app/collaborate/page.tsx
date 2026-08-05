"use client";
import { useState } from "react";
import { positions } from "@/data/positions"; // TODO سارا: اگه مسیر positions.ts فرق داره، اینجا اصلاح کن

export default function CollaboratePage() {
  const [inquiry, setInquiry] = useState({ name: "", email: "", phone: "", website: "", message: "" });
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryLoading, setInquiryLoading] = useState(false);

  const [application, setApplication] = useState({ name: "", email: "", phone: "", resumeUrl: "", motivation: "" });
  const [selectedPosition, setSelectedPosition] = useState(positions[0]?.slug || "");
  const [appSent, setAppSent] = useState(false);
  const [appLoading, setAppLoading] = useState(false);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setInquiryLoading(true);
    try {
      const res = await fetch("/api/collaborate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "inquiry", ...inquiry }),
      });
      if (res.ok) {
        setInquirySent(true);
        setInquiry({ name: "", email: "", phone: "", website: "", message: "" });
        setTimeout(() => setInquirySent(false), 4000);
      }
    } finally {
      setInquiryLoading(false);
    }
  };

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAppLoading(true);
    try {
      const res = await fetch("/api/collaborate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "application", positionSlug: selectedPosition, ...application }),
      });
      if (res.ok) {
        setAppSent(true);
        setApplication({ name: "", email: "", phone: "", resumeUrl: "", motivation: "" });
        setTimeout(() => setAppSent(false), 4000);
      }
    } finally {
      setAppLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 18px", background: "#fff", border: "1.5px solid #eee",
    borderRadius: "12px", fontFamily: "Vazirmatn, sans-serif", fontSize: "14px",
    color: "#333", outline: "none", direction: "rtl",
  };

  const benefits = [
    // TODO سارا: این لیست رو با چیزی که واقعاً می‌تونی تضمین کنی هماهنگ کن
    ["🤝", "همکاری منعطف", "بدون محدودیت مکانی، به‌صورت پروژه‌محور یا مستمر"],
    ["📈", "تجربه‌ی ارزشمند", "کار مستقیم روی محتوای آموزشی هوش مصنوعی و رباتیک"],
    ["💬", "ارتباط مستقیم", "همکاری نزدیک و بدون واسطه با بنیان‌گذار ساروبیکس"],
    ["🎯", "رشد مشترک", "فرصت رشد همراه با رشد برند ساروبیکس"],
  ];

  return (
    <div style={{ background: "#fff", minHeight: "100vh", direction: "rtl", fontFamily: "Vazirmatn, sans-serif", paddingTop: "120px" }}>

      {/* HERO */}
      <div style={{ textAlign: "center", padding: "0 1.5rem 3rem", maxWidth: "700px", margin: "0 auto" }}>
        <span style={{ display: "inline-block", fontSize: "11px", letterSpacing: "3px", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", padding: "5px 16px", borderRadius: "100px", marginBottom: "1rem" }}>
          همکاری با ما
        </span>
        <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: "#1A1A2E", marginBottom: "1rem" }}>
          همکاری با ساروبیکس
        </h1>
        {/* TODO سارا: این متن رو با لحن خودت بازنویسی کن */}
        <p style={{ fontSize: "15px", color: "#888", lineHeight: 2, marginBottom: "2rem" }}>
          ساروبیکس امروز مسیرش رو به‌تنهایی شروع کرده، ولی به‌دنبال همکارانیه که همین مسیر رو با هم ادامه بدیم.
          اگه به آموزش، تکنولوژی، یا ساخت محتوا علاقه داری، خوشحال می‌شیم باهات همکاری کنیم.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => scrollTo("positions")} style={{
            fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px",
            padding: "13px 30px", borderRadius: "100px", cursor: "pointer", border: "none",
            background: "linear-gradient(135deg,#E8632A,#ff7a40)", color: "#fff",
          }}>
            مشاهده موقعیت‌های شغلی
          </button>
          <button onClick={() => scrollTo("inquiry-form")} style={{
            fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px",
            padding: "13px 30px", borderRadius: "100px", cursor: "pointer",
            border: "1.5px solid #1A1A2E", color: "#1A1A2E", background: "#fff",
          }}>
            درخواست همکاری عمومی
          </button>
        </div>
      </div>

      {/* BENEFITS */}
      <div style={{ background: "#F5F5F5", padding: "3.5rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.3rem", fontWeight: 800, color: "#1A1A2E", marginBottom: "2rem" }}>
            چرا با ساروبیکس همکاری کنی؟
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
            {benefits.map(([icon, title, text]) => (
              <div key={title} style={{ background: "#fff", border: "1px solid #eee", borderRadius: "16px", padding: "1.5rem", textAlign: "center" }}>
                <div style={{ fontSize: "2rem", marginBottom: "0.6rem" }}>{icon}</div>
                <h3 style={{ fontSize: "14px", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.4rem" }}>{title}</h3>
                <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.8 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POSITIONS */}
      <div id="positions" style={{ maxWidth: "800px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        <h2 style={{ textAlign: "center", fontSize: "1.5rem", fontWeight: 900, color: "#1A1A2E", marginBottom: "2.5rem" }}>
          موقعیت‌های شغلی باز
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {positions.map((pos) => (
            <div key={pos.slug} style={{ border: "1.5px solid #f0f0f0", borderRadius: "20px", padding: "2rem", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1A1A2E", marginBottom: "0.8rem" }}>{pos.title}</h3>
              <p style={{ fontSize: "14px", color: "#666", lineHeight: 2, marginBottom: "1.2rem" }}>{pos.summary}</p>

              <p style={{ fontSize: "13px", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.6rem" }}>نیازمندی‌ها:</p>
              <ul style={{ marginBottom: "1.2rem", paddingRight: "1.2rem" }}>
                {pos.requirements.map((r, i) => (
                  <li key={i} style={{ fontSize: "13px", color: "#666", marginBottom: "0.4rem" }}>{r}</li>
                ))}
              </ul>

              {pos.courses && (
                <>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#1A1A2E", marginBottom: "0.6rem" }}>دوره‌های مدنظر برای ضبط:</p>
                  <ul style={{ marginBottom: "1.2rem", paddingRight: "1.2rem" }}>
                    {pos.courses.map((c, i) => (
                      <li key={i} style={{ fontSize: "13px", color: "#666", marginBottom: "0.4rem" }}>
                        {c.title}
                        {c.note && <span style={{ color: "#aaa" }}> — {c.note}</span>}
                      </li>
                    ))}
                  </ul>
                </>
              )}

              <button
                onClick={() => { setSelectedPosition(pos.slug); scrollTo("application-form"); }}
                style={{
                  fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "13px",
                  padding: "10px 24px", borderRadius: "100px", cursor: "pointer", border: "none",
                  background: "rgba(232,99,42,0.1)", color: "#E8632A",
                }}
              >
                ارسال رزومه برای این موقعیت ←
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* GENERAL INQUIRY FORM */}
      <div id="inquiry-form" style={{ background: "#F5F5F5", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.3rem", fontWeight: 800, color: "#1A1A2E", marginBottom: "0.5rem" }}>
            درخواست همکاری عمومی
          </h2>
          <p style={{ textAlign: "center", fontSize: "13px", color: "#888", marginBottom: "2rem" }}>
            اگه ایده یا زمینه‌ی همکاری خاصی مدنظرته که توی موقعیت‌های بالا نبود، از همین‌جا باهامون در ارتباط باش.
          </p>
          <form onSubmit={handleInquirySubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", background: "#fff", padding: "2rem", borderRadius: "20px", border: "1.5px solid #eee" }}>
            <input required placeholder="نام و نام خانوادگی" value={inquiry.name} onChange={e => setInquiry({ ...inquiry, name: e.target.value })} style={inputStyle} />
            <input required type="email" placeholder="ایمیل" value={inquiry.email} onChange={e => setInquiry({ ...inquiry, email: e.target.value })} style={{ ...inputStyle, direction: "ltr", textAlign: "right" }} />
            <input placeholder="شماره موبایل" value={inquiry.phone} onChange={e => setInquiry({ ...inquiry, phone: e.target.value })} style={{ ...inputStyle, direction: "ltr", textAlign: "right" }} />
            <input placeholder="آدرس سایت (اختیاری)" value={inquiry.website} onChange={e => setInquiry({ ...inquiry, website: e.target.value })} style={{ ...inputStyle, direction: "ltr", textAlign: "right" }} />
            <textarea required placeholder="توضیحات" rows={4} value={inquiry.message} onChange={e => setInquiry({ ...inquiry, message: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
            <button type="submit" disabled={inquiryLoading} style={{
              fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px", padding: "13px", borderRadius: "12px",
              border: "none", cursor: "pointer", color: "#fff",
              background: inquirySent ? "#28a745" : "linear-gradient(135deg,#E8632A,#ff7a40)",
            }}>
              {inquirySent ? "✓ ارسال شد" : inquiryLoading ? "در حال ارسال..." : "ارسال درخواست ←"}
            </button>
          </form>
        </div>
      </div>

      {/* APPLICATION FORM */}
      <div id="application-form" style={{ padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: "1.3rem", fontWeight: 800, color: "#1A1A2E", marginBottom: "0.5rem" }}>
            ارسال رزومه
          </h2>
          <p style={{ textAlign: "center", fontSize: "13px", color: "#888", marginBottom: "2rem" }}>
            برای موقعیت انتخابی، فرم زیر رو تکمیل کن.
          </p>
          <form onSubmit={handleApplicationSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem", background: "#fff", padding: "2rem", borderRadius: "20px", border: "1.5px solid #eee" }}>
            <div>
              <label style={{ fontSize: "13px", color: "#555", fontWeight: 600, display: "block", marginBottom: "6px" }}>موقعیت شغلی</label>
              <select value={selectedPosition} onChange={e => setSelectedPosition(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
                {positions.map(p => <option key={p.slug} value={p.slug}>{p.title}</option>)}
              </select>
            </div>
            <input required placeholder="نام و نام خانوادگی" value={application.name} onChange={e => setApplication({ ...application, name: e.target.value })} style={inputStyle} />
            <input required type="email" placeholder="ایمیل" value={application.email} onChange={e => setApplication({ ...application, email: e.target.value })} style={{ ...inputStyle, direction: "ltr", textAlign: "right" }} />
            <input placeholder="شماره موبایل" value={application.phone} onChange={e => setApplication({ ...application, phone: e.target.value })} style={{ ...inputStyle, direction: "ltr", textAlign: "right" }} />
            {/* TODO سارا: فعلاً لینک رزومه (مثلاً از گوگل درایو) می‌گیریم، نه آپلود مستقیم فایل — چون آپلود فایل نیاز به تنظیم جدا (مثل Cloudinary) داره */}
            <input placeholder="لینک رزومه (گوگل درایو یا مشابه)" value={application.resumeUrl} onChange={e => setApplication({ ...application, resumeUrl: e.target.value })} style={{ ...inputStyle, direction: "ltr", textAlign: "right" }} />
            <textarea required placeholder="چرا می‌خوای با ساروبیکس همکاری کنی؟" rows={4} value={application.motivation} onChange={e => setApplication({ ...application, motivation: e.target.value })} style={{ ...inputStyle, resize: "vertical" }} />
            <button type="submit" disabled={appLoading} style={{
              fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px", padding: "13px", borderRadius: "12px",
              border: "none", cursor: "pointer", color: "#fff",
              background: appSent ? "#28a745" : "linear-gradient(135deg,#E8632A,#ff7a40)",
            }}>
              {appSent ? "✓ رزومه ارسال شد" : appLoading ? "در حال ارسال..." : "ارسال رزومه ←"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
