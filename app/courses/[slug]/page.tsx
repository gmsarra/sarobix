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
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "var(--font)" }}>
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
  const isOnsite = course.format === "حضوری";

  const PurchaseCard = (
    <div className="purchase-card">
      <div className="purchase-price-old">{course.oldPrice} تومان</div>
      <div className="purchase-price-new">{course.price} تومان</div>

      <div className="purchase-meta-list">
        <div className="purchase-meta-row"><span>مدت دوره</span><span className="val">{course.time}</span></div>
        <div className="purchase-meta-row"><span>سطح</span><span className="val">{course.level}</span></div>
        <div className="purchase-meta-row">
          <span>نوع برگزاری</span>
          <span className={`val ${isOnsite ? "onsite" : ""}`}>{isOnsite ? "📍 حضوری" : "💻 آنلاین"}</span>
        </div>
      </div>

      {error && <p className="purchase-error">{error}</p>}

      <button onClick={handleBuy} disabled={loading} className="purchase-btn">
        {loading ? "در حال اتصال به درگاه..." : session ? (isOnsite ? "ثبت‌نام و رزرو جا ←" : "خرید دوره ←") : "برای خرید، ابتدا وارد شو"}
      </button>
    </div>
  );

  return (
    <div style={{ background: "var(--bg-primary)", minHeight: "100vh", direction: "rtl", fontFamily: "var(--font)", paddingTop: "120px" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>

        <Link href="/courses" className="back-to-courses">→ بازگشت به دوره‌ها</Link>

        <div className="course-detail-grid" style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "3rem", alignItems: "start" }}>

          {/* Main content column */}
          <div>
            <div className={`course-hero-media ${course.thumb}`}>
              {!coverError ? (
                <img src={coverImagePath} alt={course.title} onError={() => setCoverError(true)} />
              ) : (
                course.icon
              )}
            </div>

            <div className="course-badge-row">
              <span className="course-badge-pill primary">{course.badge}</span>
              <span className={`course-badge-pill ${isOnsite ? "format-onsite" : "format-online"}`}>
                {isOnsite ? "📍 حضوری" : "💻 آنلاین"}
              </span>
            </div>

            <h1 className="course-detail-title">{course.title}</h1>
            <p className="course-detail-desc">{course.desc}</p>

            <div className="course-detail-meta">
              <span>⏱ {course.time}</span>
              <span>👤 سطح: {course.level}</span>
            </div>

            {!videoError && (
              <div className="course-video-wrap">
                <video src={introVideoPath} controls onError={() => setVideoError(true)} />
              </div>
            )}

            {/* Purchase card — only shown here on mobile */}
            <div className="course-detail-mobile-purchase" style={{ display: "none", marginBottom: "2.5rem" }}>
              {PurchaseCard}
              +                <p style={{ fontSize: "12px", color: "#888", marginTop: "0.8rem", lineHeight: 1.9, textAlign: "center" }}>
+  با خرید، <Link href="/terms" style={{ color: "#E8632A", fontWeight: 600 }}>قوانین و مقررات</Link> و شرایط بازگشت وجه را می‌پذیرید.
+</p>
            </div>

            <div>
              <h2 className="curriculum-heading">سرفصل‌های دوره</h2>
              {curriculumItems.length === 0 ? (
                <p className="curriculum-empty">سرفصل‌های کامل به‌زودی اضافه می‌شود.</p>
              ) : (
                <div className="curriculum-list">
                  {curriculumItems.map((item, i) => (
                    <div key={i} className="curriculum-item">
                      <div className="curriculum-num">{i + 1}</div>
                      <div>
                        <h4>{item.title}</h4>
                        <p>{item.desc}</p>
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

