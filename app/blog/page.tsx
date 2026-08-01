"use client";
import Link from "next/link";

export default function BlogPage() {
  // TODO سارا: پست‌های واقعی رو جایگزین این آرایه کن (عنوان، خلاصه، تصویر، دسته‌بندی، تاریخ، اسلاگ)
  const posts = [
    {
      slug: "intro-to-ai-for-kids",
      title: "چرا آموزش هوش مصنوعی به کودکان مهم است؟",
      excerpt: "نگاهی به اینکه چطور آشنایی زودهنگام با مفاهیم هوش مصنوعی می‌تونه تفکر تحلیلی و خلاقیت رو در دانش‌آموزان تقویت کنه.",
      image: "/blog/ai-for-kids.jpg",
      category: "هوش مصنوعی",
      date: "۱۴۰۴/۰۵/۱۰",
    },
    {
      slug: "python-vs-scratch",
      title: "پایتون یا اسکرچ؟ کدوم برای شروع بهتره",
      excerpt: "مقایسه‌ای عملی بین اسکرچ و پایتون برای دانش‌آموزانی که می‌خوان برنامه‌نویسی رو شروع کنن.",
      image: "/blog/python-vs-scratch.jpg",
      category: "برنامه‌نویسی",
      date: "۱۴۰۴/۰۴/۲۲",
    },
    {
      slug: "robotics-first-project",
      title: "اولین پروژه رباتیک؛ از کجا شروع کنیم؟",
      excerpt: "راهنمای گام‌به‌گام برای اولین پروژه‌ی رباتیک دانش‌آموزی، از انتخاب قطعات تا برنامه‌نویسی حرکت.",
      image: "/blog/robotics-first-project.jpg",
      category: "رباتیک",
      date: "۱۴۰۴/۰۴/۰۵",
    },
    {
      slug: "chatbot-with-gemini",
      title: "ساخت یک چت‌بات ساده با Gemini API",
      excerpt: "آموزش گام‌به‌گام ساخت یک چت‌بات فارسی‌زبان با استفاده از Gemini API، مناسب برای پروژه‌های دانش‌آموزی.",
      image: "/blog/chatbot-gemini.jpg",
      category: "هوش مصنوعی",
      date: "۱۴۰۴/۰۳/۱۸",
    },
    {
      slug: "machine-learning-basics",
      title: "یادگیری ماشین به زبان ساده",
      excerpt: "مفاهیم پایه‌ی یادگیری ماشین رو با مثال‌های ساده و قابل فهم برای نوجوانان توضیح می‌دیم.",
      image: "/blog/ml-basics.jpg",
      category: "هوش مصنوعی",
      date: "۱۴۰۴/۰۳/۰۲",
    },
    {
      slug: "career-in-programming",
      title: "مسیر شغلی برنامه‌نویسی برای نوجوانان",
      excerpt: "چه مهارت‌هایی برای ورود به بازار کار برنامه‌نویسی لازمه و از چه سنی می‌شه شروع کرد؟",
      image: "/blog/career-programming.jpg",
      category: "مسیر شغلی",
      date: "۱۴۰۴/۰۲/۱۴",
    },
  ];

  const categories = ["همه", "هوش مصنوعی", "برنامه‌نویسی", "رباتیک", "مسیر شغلی"];

  return (
    <div style={{ background: "#fff", minHeight: "100vh", direction: "rtl", fontFamily: "Vazirmatn, sans-serif", paddingTop: "120px" }}>

      {/* HEADER */}
      <div style={{ textAlign: "center", marginBottom: "3rem", padding: "0 1.5rem" }}>
        <span style={{ display: "inline-block", fontSize: "11px", letterSpacing: "3px", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", padding: "5px 16px", borderRadius: "100px", marginBottom: "1rem" }}>
          مقالات
        </span>
        <h1 style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: "#1A1A2E", marginBottom: "0.8rem" }}>
          یادداشت‌ها و آموزش‌ها
        </h1>
        <p style={{ fontSize: "16px", color: "#888", maxWidth: "480px", margin: "0 auto", lineHeight: 2 }}>
          مقالاتی درباره برنامه‌نویسی، هوش مصنوعی و رباتیک 
        </p>
      </div>

      {/* CATEGORY FILTER */}
      <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", marginBottom: "3rem", padding: "0 1.5rem" }}>
        {categories.map((cat, i) => (
          <button
            key={cat}
            style={{
              fontFamily: "Vazirmatn, sans-serif", fontSize: "13px", fontWeight: 600,
              padding: "8px 18px", borderRadius: "100px", cursor: "pointer",
              border: i === 0 ? "none" : "1.5px solid #eee",
              background: i === 0 ? "linear-gradient(135deg,#E8632A,#ff7a40)" : "#fff",
              color: i === 0 ? "#fff" : "#555",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* POSTS GRID */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem 6rem" }}>
        <div className="blog-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "2rem" }}>
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                textDecoration: "none", display: "block",
                borderRadius: "20px", overflow: "hidden",
                border: "1.5px solid #f0f0f0",
                boxShadow: "0 8px 30px rgba(0,0,0,0.04)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 14px 40px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(0,0,0,0.04)"; }}
            >
              <div style={{ width: "100%", height: "180px", background: "#f5f5f5", position: "relative" }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={e => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                />
                <span style={{
                  position: "absolute", top: "12px", right: "12px",
                  fontSize: "11px", fontWeight: 700, padding: "5px 12px",
                  borderRadius: "100px", background: "#fff", color: "#E8632A",
                }}>
                  {post.category}
                </span>
              </div>
              <div style={{ padding: "1.3rem" }}>
                <p style={{ fontSize: "12px", color: "#aaa", marginBottom: "8px" }}>{post.date}</p>
                <h3 style={{ fontSize: "15px", fontWeight: 800, color: "#1A1A2E", marginBottom: "8px", lineHeight: 1.8 }}>
                  {post.title}
                </h3>
                <p style={{ fontSize: "13px", color: "#888", lineHeight: 1.9, margin: 0 }}>
                  {post.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {/* Load more */}
        <div style={{ textAlign: "center", marginTop: "3rem" }}>
          <button style={{
            fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px",
            padding: "12px 28px", borderRadius: "100px", cursor: "pointer",
            border: "1.5px solid #E8632A", background: "#fff", color: "#E8632A",
          }}>
            مشاهده مقالات بیشتر
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 600px) {
          .blog-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
