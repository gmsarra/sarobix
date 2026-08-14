"use client";
import { useEffect, useRef, useState } from "react";
import { Shield, Zap, Wrench, Target, MessageCircle, RefreshCw, Briefcase } from "lucide-react";
import { courses } from "@/data/courses"; // TODO سارا: اگه مسیر فرق داره اصلاح کن
import { posts } from "@/data/posts"; // TODO سارا: اگه مسیر فرق داره اصلاح کن
export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [newsletterContact, setNewsletterContact] = useState("");
  const [newsletterSent, setNewsletterSent] = useState(false);
  const [newsletterLoading, setNewsletterLoading] = useState(false);
  const [newsletterError, setNewsletterError] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError("");
    setNewsletterLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact: newsletterContact }),
      });
      const data = await res.json();
      if (!res.ok) {
        setNewsletterError(data.error || "خطا در ثبت");
        setNewsletterLoading(false);
        return;
      }
      setNewsletterSent(true);
      setNewsletterContact("");
      setTimeout(() => setNewsletterSent(false), 4000);
    } catch {
      setNewsletterError("خطای غیرمنتظره");
    } finally {
      setNewsletterLoading(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  return (
    <main style={{ background: "#fff", minHeight: "100vh", direction: "rtl", fontFamily: "Vazirmatn, sans-serif", paddingTop: "100px" }}>

      {/* HERO */}
      <section style={{
        minHeight: "calc(100vh - 100px)", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "2rem 1.5rem", background: "#fff", position: "relative", overflow: "hidden"
      }}>
        {/* Watermark */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "center", pointerEvents: "none", zIndex: 0
        }}>
          <span style={{ fontSize: "clamp(80px,15vw,180px)", fontWeight: 900, color: "rgba(0,0,0,0.04)", letterSpacing: "10px", userSelect: "none" }}>SAROBIX</span>
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Logo Text Image */}
          <img src="/sarobix-text.jpg" alt="SAROBIX" style={{ height: "70px", objectFit: "contain", marginBottom: "1.5rem" }} />

          {/* Title */}
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, color: "#1A1A2E", marginBottom: "1rem" }}>
            آینده را کُد کن
          </h1>

          {/* Description */}
          <p style={{ fontSize: "16px", color: "#777", maxWidth: "580px", margin: "0 auto 2.5rem", lineHeight: 2 }}>
            با Sarobix مهارت‌های تکنولوژی، هوش مصنوعی و رباتیک رو از صفر تا حرفه‌ای یاد بگیر
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
            <a href="/courses" style={{
              padding: "14px 36px", borderRadius: "100px",
              background: "linear-gradient(135deg,#E8632A,#ff7a40)",
              color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: "15px",
              boxShadow: "0 6px 24px rgba(232,99,42,0.35)", fontFamily: "Vazirmatn, sans-serif"
            }}>مشاهده دوره‌ها</a>
            <a href="/contact" style={{
              padding: "14px 36px", borderRadius: "100px",
              border: "2px solid #E8632A", color: "#E8632A",
              textDecoration: "none", fontWeight: 700, fontSize: "15px",
              fontFamily: "Vazirmatn, sans-serif", background: "#fff"
            }}>تماس با ما</a>
          </div>

          {/* Placeholder */}
          <img 
  src="/sara-hero.png" 
  alt="مدرس Sarobix"
  style={{ width: "380px", objectFit: "contain" }}
/>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#F5F5F5", borderTop: "1px solid #eee", borderBottom: "1px solid #eee", padding: "2.5rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem", display: "flex", justifyContent: "center", flexWrap: "wrap", rowGap: "0" }}>
          {[["‎+۵۰۰", "دانشجوی فعال"], ["+۸", "دوره تخصصی"], ["+۵", "سال تجربه تدریس"], ["+۹۵٪", "رضایت دانشجویان"]].map(([num, label], i) => (
            <div key={label} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ textAlign: "center", padding: "1rem 2.5rem" }}>
                <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#E8632A" }}>{num}</div>
                <div style={{ fontSize: "13px", color: "#888" }}>{label}</div>
              </div>
              {i < 3 && <div style={{ width: "1px", height: "48px", background: "#ddd" }} />}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "5rem 0", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ display: "inline-block", fontSize: "11px", letterSpacing: "2px", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", padding: "4px 14px", borderRadius: "100px", marginBottom: "1rem" }}>چرا Sarobix؟</span>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, color: "#1A1A2E" }}>آموزش حرفه‌ای با تضمین کیفیت</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
            {[
              { Icon: Shield, title: "پشتیبانی مادام‌العمر", desc: "با خرید هر دوره از پشتیبانی همیشگی بهره‌مند شوید." },
              { Icon: Zap, title: "کیفیت بالا", desc: "تمامی آموزش‌ها با صوت و تصویر HD عرضه می‌شود." },
              { Icon: Wrench, title: "پروژه‌محور", desc: "آموزش با پروژه شروع و با پروژه‌های واقعی ختم می‌شه." },
            ].map(({ Icon, title, desc }) => (
              <div key={title} style={{ background: "#F5F5F5", border: "1px solid #eee", borderRadius: "20px", padding: "1.8rem 1.5rem", textAlign: "center" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "14px", background: "rgba(232,99,42,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                  <Icon size={22} color="#E8632A" strokeWidth={2} />
                </div>
                <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: ".5rem", color: "#1A1A2E" }}>{title}</h3>
                <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.8 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section style={{ padding: "5rem 0", background: "#F5F5F5" }} id="courses">
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ display: "inline-block", fontSize: "11px", letterSpacing: "2px", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", padding: "4px 14px", borderRadius: "100px", marginBottom: "1rem" }}>دوره‌های آموزشی</span>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, color: "#1A1A2E" }}>دوره‌های آکادمی Sarobix</h2>
            <p style={{ color: "#888", fontSize: "14px" }}>یادگیری عملی با پروژه‌های واقعی</p>
            <a href="/courses" style={{ display: "inline-block", marginTop: "1rem", fontSize: "13px", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", padding: "7px 20px", borderRadius: "100px", textDecoration: "none" }}>مشاهده همه ←</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1.2rem" }} className="mobile-col">
            {["prompt-engineering-basics", "machine-learning", "web-design", "python-for-ai"]
              .map((slug) => courses.find((c) => c.slug === slug))
              .filter(Boolean)
              .map((c) => (
                <a key={c!.slug} href={`/courses/${c!.slug}`} style={{ background: "#fff", border: c!.badgeClass === "badge-hot" ? "1px solid rgba(232,99,42,0.3)" : "1px solid #eee", borderRadius: "20px", overflow: "hidden", textDecoration: "none", display: "block" }}>
                  <div className={`course-thumb ${c!.thumb}`} style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", position: "relative" }}>
                    {c!.icon}
                    <span style={{ position: "absolute", top: ".6rem", right: ".6rem", background: c!.badgeClass === "badge-hot" ? "#fff" : "rgba(255,255,255,0.2)", color: c!.badgeClass === "badge-hot" ? "#E8632A" : "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "100px" }}>{c!.badge}</span>
                  </div>
                  <div style={{ padding: "1.2rem" }}>
                    <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: ".4rem", color: "#1A1A2E" }}>{c!.title}</h3>
                    <div style={{ display: "flex", gap: ".8rem", fontSize: "11px", color: "#888", marginBottom: ".8rem" }}>
                      <span>⏱ {c!.time}</span><span>👤 {c!.level}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #eee", paddingTop: ".8rem" }}>
                      <div>
                        <div style={{ fontSize: "11px", color: "#aaa", textDecoration: "line-through" }}>{c!.oldPrice}</div>
                        <div style={{ fontSize: "15px", fontWeight: 900, color: "#E8632A" }}>{c!.price} ت</div>
                      </div>
                      <span style={{ fontSize: "11px", fontWeight: 700, padding: "6px 14px", borderRadius: "100px", background: "rgba(232,99,42,0.1)", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)" }}>مشاهده ←</span>
                    </div>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ padding: "6rem 0", background: "#fff" }} id="about">
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr", gap: "5rem", alignItems: "center" }}>
        <div style={{ textAlign: "center" }}>
            <video
              ref={videoRef}
              src="/videos/intro.mp4"
              muted
              loop
              playsInline
              style={{ width: "100%",  borderRadius: "20px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)" }}
            />
          </div>
          <div>
            <span style={{ display: "inline-block", fontSize: "11px", letterSpacing: "2px", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", padding: "4px 14px", borderRadius: "100px", marginBottom: "1rem" }}>درباره مدرس</span>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, lineHeight: 1.3, marginBottom: "1rem", color: "#1A1A2E" }}>
              یاد بگیر از کسی که<br /><span style={{ color: "#E8632A" }}>راه رو رفته</span>
            </h2>
            <p style={{ fontSize: "15px", color: "#666", marginBottom: "1.5rem", lineHeight: 2 }}>
               مهندس ارشد نرم‌افزار و مدرس دوره‌های برنامه‌نویسی، هوش مصنوعی و رباتیک <div className=""></div>
            </p>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1.2rem", marginTop: "1rem" }} className="mobile-flex-col mobile-center">
              {/* ستون راست */}
              <div style={{ display: "flex", flexDirection: "column", gap: ".6rem", width: "300px" }} className="mobile-full">
                {[
                  { Icon: Target, text: "تدریس عملی با پروژه‌های واقعی" },
                  { Icon: RefreshCw, text: "آپدیت مداوم محتوای دوره‌ها" },
                ].map(({ Icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".6rem", padding: ".65rem .9rem", background: "#F5F5F5", borderRadius: "12px", border: "1px solid #eee" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(232,99,42,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={14} color="#E8632A" />
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 500, color: "#1A1A2E" }}>{text}</span>
                  </div>
                ))}
              </div>

              {/* دکمه وسط */}
              <a href="/courses" className="mobile-full" style={{
                fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px",
                padding: "13px 24px", borderRadius: "100px", background: "linear-gradient(135deg,#E8632A,#ff7a40)",
                color: "#fff", textDecoration: "none", whiteSpace: "nowrap", textAlign: "center", flexShrink: 0,
              }}>مشاهده دوره‌ها</a>

              {/* ستون چپ */}
              <div style={{ display: "flex", flexDirection: "column", gap: ".6rem", width: "300px" }} className="mobile-full">
                {[
                  { Icon: Briefcase, text: "ورود به بازار کار پس از اتمام دوره" },
                  { Icon: MessageCircle, text: "پشتیبانی مستقیم از دانشجویان" },
                ].map(({ Icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: ".6rem", padding: ".65rem .9rem", background: "#F5F5F5", borderRadius: "12px", border: "1px solid #eee" }}>
                    <div style={{ width: "28px", height: "28px", borderRadius: "8px", background: "rgba(232,99,42,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={14} color="#E8632A" />
                    </div>
                    <span style={{ fontSize: "12px", fontWeight: 500, color: "#1A1A2E" }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LATEST ARTICLES */}
      <section style={{ padding: "5rem 0", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ display: "inline-block", fontSize: "11px", letterSpacing: "2px", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", padding: "4px 14px", borderRadius: "100px", marginBottom: "1rem" }}>وبلاگ</span>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, color: "#1A1A2E" }}>جدیدترین مقالات</h2>
            <a href="/blog" style={{ display: "inline-block", marginTop: "1rem", fontSize: "13px", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", padding: "7px 20px", borderRadius: "100px", textDecoration: "none" }}>مشاهده بیشتر ←</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: "1.2rem" }}>
            {posts.slice(0, 4).map((post) => (
              <a key={post.slug} href={`/blog/${post.slug}`} style={{ display: "block", textDecoration: "none", color: "inherit", border: "1px solid #eee", borderRadius: "20px", overflow: "hidden" }}>
                <div style={{ height: "130px", background: "#F5F5F5", position: "relative" }}>
                  <img
                    src={post.image}
                    alt={post.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  />
                  <span style={{ position: "absolute", top: ".6rem", right: ".6rem", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "100px", background: "#fff", color: "#E8632A" }}>{post.category}</span>
                </div>
                <div style={{ padding: "1rem" }}>
                  <p style={{ fontSize: "11px", color: "#aaa", marginBottom: "6px" }}>{post.date}</p>
                  <h3 style={{ fontSize: "13px", fontWeight: 700, color: "#1A1A2E", marginBottom: "6px", lineHeight: 1.8 }}>{post.title}</h3>
                  <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.8, margin: 0 }}>{post.excerpt}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: "5rem 0", background: "#F5F5F5" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, color: "#1A1A2E" }}>سوالات متداول</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
            {[
              // TODO سارا: این سوالات رو با متن واقعی خودت جایگزین کن
              ["ساروبیکس چیست؟", "ساروبیکس یک آکادمی تخصصی آموزش برنامه‌نویسی، هوش مصنوعی و رباتیک است که توسط سارا گمراوی، مهندس ارشد نرم‌افزار، بنیان‌گذاری شده."],
              ["دوره‌ها به چه صورت برگزار می‌شوند؟", "بیشتر دوره‌ها به‌صورت آنلاین و ضبط‌شده هستند؛ برخی دوره‌ها مثل ICDL و رباتیک به‌صورت حضوری برگزار می‌شوند."],
              ["آیا بعد از پایان دوره گواهی دریافت می‌کنم؟", "بله، پس از اتمام موفق هر دوره، گواهی پایان دوره از طرف ساروبیکس دریافت می‌کنید."],
              ["آیا امکان بازپرداخت وجه وجود دارد؟", "برای اطلاع از شرایط دقیق بازگشت وجه، از طریق صفحه‌ی تماس با ما با پشتیبانی در ارتباط باشید."],
              ["برای شروع چه پیش‌نیازی لازم است؟", "اکثر دوره‌های مقدماتی نیازی به پیش‌زمینه ندارند و از صفر آموزش داده می‌شوند."],
            ].map(([q, a], i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #eee", borderRadius: "16px", overflow: "hidden" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "1.1rem 1.3rem", background: "none", border: "none", cursor: "pointer",
                    fontFamily: "Vazirmatn, sans-serif", fontSize: "14px", fontWeight: 700, color: "#1A1A2E", textAlign: "right",
                  }}
                >
                  {q}
                  <span style={{ fontSize: "18px", color: "#E8632A", flexShrink: 0, marginRight: "1rem" }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p style={{ padding: "0 1.3rem 1.1rem", fontSize: "13px", color: "#888", lineHeight: 2, margin: 0 }}>{a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ padding: "4rem 0", background: "#F5F5F5" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <span style={{ display: "inline-block", fontSize: "11px", letterSpacing: "2px", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", padding: "4px 14px", borderRadius: "100px", marginBottom: "1rem" }}>خبرنامه</span>
          <h2 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, marginBottom: ".8rem", color: "#1A1A2E" }}>از تخفیف‌ها باخبر بمان</h2>
          <p style={{ color: "#888", fontSize: "14px", marginBottom: "2rem" }}>ایمیل یا شماره‌ات رو بذار تا اول از همه باخبر بشی</p>
          <form onSubmit={handleNewsletterSubmit} style={{ display: "flex", gap: "1rem", maxWidth: "480px", margin: "0 auto" }} className="mobile-flex-col">
            <input
              type="text"
              required
              placeholder="ایمیل یا شماره موبایل..."
              value={newsletterContact}
              onChange={(e) => setNewsletterContact(e.target.value)}
              style={{ flex: 1, background: "#fff", border: "1px solid #ddd", borderRadius: "100px", padding: "13px 20px", fontFamily: "Vazirmatn, sans-serif", fontSize: "14px", outline: "none", direction: "rtl" }}
            />
            <button
              type="submit"
              disabled={newsletterLoading}
              style={{
                fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px", padding: "13px 24px", borderRadius: "100px",
                background: newsletterSent ? "#28a745" : "linear-gradient(135deg,#E8632A,#ff7a40)",
                color: "#fff", border: "none", cursor: "pointer", flexShrink: 0,
              }}
            >
              {newsletterSent ? "✓ ثبت شد" : newsletterLoading ? "..." : "عضویت ←"}
            </button>
          </form>
          {newsletterError && <p style={{ color: "#e03131", fontSize: "13px", marginTop: "0.8rem" }}>{newsletterError}</p>}
        </div>
      </section>


      <style>{`
        @media (max-width: 768px) {
          .mobile-col { grid-template-columns: 1fr !important; }
          .mobile-flex-col { flex-direction: column !important; }
          .mobile-center { text-align: center !important; justify-content: center !important; }
          .mobile-hide { display: none !important; }
          .mobile-full { width: 100% !important; }
        }
      `}</style>
    </main>
  );
}


