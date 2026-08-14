"use client";
import { useState, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getCourseBySlug } from "@/data/courses"; // TODO سارا: اگه مسیر فرق داره اصلاح کن
import { getCurriculumBySlug } from "@/data/curriculum"; // TODO سارا: اگه مسیر فرق داره اصلاح کن

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const course = getCourseBySlug(slug);
  const curriculumItems = getCurriculumBySlug(slug);
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [coverError, setCoverError] = useState(false);
  const [videoError, setVideoError] = useState(false);

  if (!course) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Vazirmatn, sans-serif" }}>
        دوره پیدا نشد
      </div>
    );
  }

  const handleBuy = async () => {
    if (!session) {
      router.push(`/login?redirect=/courses/${course.slug}`);
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/payment/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseSlug: course.slug }),
      });
      const data = await res.json();
      if (!res.ok || !data.paymentUrl) {
        setError(data.error || "پرداخت در حال حاضر فعال نیست");
        setLoading(false);
        return;
      }
      window.location.href = data.paymentUrl;
    } catch {
      setError("خطای غیرمنتظره در اتصال به درگاه پرداخت");
      setLoading(false);
    }
  };

  const coverImagePath = `/courses/${course.slug}/cover.jpg`;
  const introVideoPath = `/courses/${course.slug}/intro.mp4`;

  const PurchaseCard = (
    <div style={{ padding: "1.5rem", border: "1.5px solid #f0f0f0", borderRadius: "20px", boxShadow: "0 8px 30px rgba(0,0,0,0.06)", background: "#fff" }}>
      <div style={{ marginBottom: "1.2rem" }}>
        <div style={{ fontSize: "12px", color: "#aaa", textDecoration: "line-through" }}>{course.oldPrice} تومان</div>
        <div style={{ fontSize: "1.5rem", fontWeight: 900, color: "#E8632A" }}>{course.price} تومان</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", marginBottom: "1.2rem", fontSize: "13px", color: "#555" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>مدت دوره</span><span style={{ fontWeight: 700, color: "#1A1A2E" }}>{course.time}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>سطح</span><span style={{ fontWeight: 700, color: "#1A1A2E" }}>{course.level}</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span>نوع برگزاری</span>
          <span style={{ fontWeight: 700, color: course.format === "حضوری" ? "#C9A96E" : "#1A1A2E" }}>
            {course.format === "حضوری" ? "📍 حضوری" : "💻 آنلاین"}
          </span>
        </div>
      </div>

      {error && <p style={{ color: "#e03131", fontSize: "13px", marginBottom: "1rem" }}>{error}</p>}

      <button
        onClick={handleBuy}
        disabled={loading}
        style={{
          width: "100%", fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "15px",
          padding: "14px", borderRadius: "12px", border: "none", cursor: "pointer", color: "#fff",
          background: "linear-gradient(135deg,#E8632A,#ff7a40)",
        }}
      >
        {loading ? "در حال اتصال به درگاه..." : session ? (course.format === "حضوری" ? "ثبت‌نام و رزرو جا ←" : "خرید دوره ←") : "برای خرید، ابتدا وارد شو"}
      </button>
    </div>
  );

  return (
    <div style={{ background: "#fff", minHeight: "100vh", direction: "rtl", fontFamily: "Vazirmatn, sans-serif", paddingTop: "120px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>

        <Link href="/courses" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", color: "#888", textDecoration: "none", marginBottom: "1.5rem" }}>
          → بازگشت به دوره‌ها
        </Link>

        <div className="course-detail-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "3rem", alignItems: "start" }}>

          {/* Main content column */}
          <div>
            <div className={`course-thumb ${course.thumb}`} style={{
              height: "260px", borderRadius: "24px", marginBottom: "1.5rem", overflow: "hidden",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem", position: "relative",
            }}>
              {!coverError ? (
                <img
                  src={coverImagePath}
                  alt={course.title}
                  onError={() => setCoverError(true)}
                  style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                />
              ) : (
                course.icon
              )}
            </div>

            <div style={{ display: "flex", gap: "8px", marginBottom: "1rem" }}>
              <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, padding: "5px 14px", borderRadius: "100px", background: "rgba(232,99,42,0.1)", color: "#E8632A" }}>
                {course.badge}
              </span>
              <span style={{
                display: "inline-block", fontSize: "11px", fontWeight: 700, padding: "5px 14px", borderRadius: "100px",
                background: course.format === "حضوری" ? "rgba(201,169,110,0.15)" : "rgba(26,26,46,0.08)",
                color: course.format === "حضوری" ? "#C9A96E" : "#1A1A2E",
              }}>
                {course.format === "حضوری" ? "📍 حضوری" : "💻 آنلاین"}
              </span>
            </div>

            <h1 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#1A1A2E", marginBottom: "0.8rem" }}>{course.title}</h1>
            <p style={{ fontSize: "15px", color: "#666", lineHeight: 2, marginBottom: "1.5rem" }}>{course.desc}</p>

            <div style={{ display: "flex", gap: "1.5rem", fontSize: "13px", color: "#888", marginBottom: "2rem" }}>
              <span>⏱ {course.time}</span>
              <span>👤 سطح: {course.level}</span>
            </div>

            {!videoError && (
              <div style={{ marginBottom: "2rem", borderRadius: "20px", overflow: "hidden" }}>
                <video
                  src={introVideoPath}
                  controls
                  onError={() => setVideoError(true)}
                  style={{ width: "100%", display: "block", background: "#000" }}
                />
              </div>
            )}

            {/* Purchase card — only shown here on mobile */}
            <div className="course-detail-mobile-purchase" style={{ display: "none", marginBottom: "2.5rem" }}>
              {PurchaseCard}
            </div>

            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1A1A2E", marginBottom: "1.2rem" }}>سرفصل‌های دوره</h2>
              {curriculumItems.length === 0 ? (
                <p style={{ fontSize: "14px", color: "#888" }}>سرفصل‌های کامل به‌زودی اضافه می‌شود.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  {curriculumItems.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: "1rem", padding: "1rem", background: "#F5F5F5", borderRadius: "14px" }}>
                      <div style={{
                        flexShrink: 0, width: "28px", height: "28px", borderRadius: "50%",
                        background: "#E8632A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "12px", fontWeight: 700,
                      }}>
                        {i + 1}
                      </div>
                      <div>
                        <p style={{ fontSize: "14px", fontWeight: 700, color: "#1A1A2E", margin: 0 }}>{item.title}</p>
                        <p style={{ fontSize: "13px", color: "#888", margin: "4px 0 0" }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sticky purchase sidebar — desktop only */}
          <div className="course-detail-desktop-purchase" style={{ position: "sticky", top: "140px" }}>
            {PurchaseCard}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .course-detail-grid { grid-template-columns: 1fr !important; }
          .course-detail-desktop-purchase { display: none !important; }
          .course-detail-mobile-purchase { display: block !important; }
        }
      `}</style>
    </div>
  );
}
