"use client";
import { useState, use } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { getCourseBySlug } from "@/data/courses"; // TODO سارا: اگه مسیر فرق داره اصلاح کن

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params); // چون Client Component نمی‌تونه async باشه، با use() این Promise رو باز می‌کنیم
  const course = getCourseBySlug(slug);
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      window.location.href = data.paymentUrl; // انتقال به درگاه زرین‌پال
    } catch {
      setError("خطای غیرمنتظره در اتصال به درگاه پرداخت");
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", direction: "rtl", fontFamily: "Vazirmatn, sans-serif", paddingTop: "120px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>

        {/* Header */}
        <div style={{
          height: "180px", borderRadius: "24px", marginBottom: "2rem",
          background: "linear-gradient(135deg,#1a1a4e,#2d1b69)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "4rem",
        }}>
          {course.icon}
        </div>

        <span style={{ display: "inline-block", fontSize: "11px", fontWeight: 700, padding: "5px 14px", borderRadius: "100px", background: "rgba(232,99,42,0.1)", color: "#E8632A", marginBottom: "1rem" }}>
          {course.badge}
        </span>
        <h1 style={{ fontSize: "1.8rem", fontWeight: 900, color: "#1A1A2E", marginBottom: "0.8rem" }}>{course.title}</h1>
        <p style={{ fontSize: "15px", color: "#666", lineHeight: 2, marginBottom: "1.5rem" }}>{course.desc}</p>

        <div style={{ display: "flex", gap: "1.5rem", fontSize: "13px", color: "#888", marginBottom: "2rem" }}>
          <span>⏱ {course.time}</span>
          <span>👤 سطح: {course.level}</span>
        </div>

        {/* Purchase box */}
        <div style={{ padding: "1.5rem", border: "1.5px solid #f0f0f0", borderRadius: "20px", boxShadow: "0 8px 30px rgba(0,0,0,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.2rem" }}>
            <div>
              <div style={{ fontSize: "12px", color: "#aaa", textDecoration: "line-through" }}>{course.oldPrice} تومان</div>
              <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#E8632A" }}>{course.price} تومان</div>
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
            {loading ? "در حال اتصال به درگاه..." : session ? "خرید دوره ←" : "برای خرید، ابتدا وارد شو"}
          </button>
        </div>

        {/* TODO سارا: سرفصل‌ها/محتوای دقیق هر دوره رو اینجا اضافه کن */}
        <div style={{ marginTop: "3rem" }}>
          <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1A1A2E", marginBottom: "1rem" }}>سرفصل‌های دوره</h2>
          <p style={{ fontSize: "14px", color: "#888" }}>سرفصل‌های کامل به‌زودی اضافه می‌شود.</p>
        </div>
      </div>
    </div>
  );
}
