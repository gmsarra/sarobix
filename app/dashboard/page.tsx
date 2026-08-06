"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { courses } from "@/data/courses"; // TODO سارا: اگه مسیر فرق داره اصلاح کن

type Enrollment = { course_slug: string; created_at: string };

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [enrollments, setEnrollments] = useState<Enrollment[] | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    // این درخواست دوره‌های واقعاً خریداری‌شده‌ی کاربر رو از جدول enrollments می‌گیره
    // تا وقتی سیستم خرید دوره ساخته نشده، این جدول همیشه خالیه و اینجا فقط پیام پیش‌فرض دیده می‌شه
    fetch("/api/enrollments")
      .then(res => res.json())
      .then(data => setEnrollments(data.enrollments || []))
      .catch(() => setEnrollments([]));
  }, [status]);

  if (status === "loading" || !session) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Vazirmatn, sans-serif" }}>
        در حال بارگذاری...
      </div>
    );
  }

  const enrolledCourses = (enrollments || [])
    .map(e => courses.find(c => c.slug === e.course_slug))
    .filter(Boolean);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", direction: "rtl", fontFamily: "Vazirmatn, sans-serif", paddingTop: "120px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>

        {/* Profile header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", marginBottom: "3rem", padding: "1.5rem", background: "#F5F5F5", borderRadius: "20px" }}>
          {session.user?.image ? (
            <img src={session.user.image} alt={session.user.name || ""} style={{ width: "64px", height: "64px", borderRadius: "50%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "#E8632A", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontWeight: 700 }}>
              {session.user?.name?.charAt(0) || "?"}
            </div>
          )}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: "1.2rem", fontWeight: 800, color: "#1A1A2E", margin: 0 }}>{session.user?.name}</h1>
            <p style={{ fontSize: "13px", color: "#888", margin: "4px 0 0" }}>{session.user?.email}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            style={{
              fontFamily: "Vazirmatn, sans-serif", fontWeight: 600, fontSize: "13px",
              padding: "9px 20px", borderRadius: "100px", border: "1.5px solid #ddd",
              background: "#fff", color: "#555", cursor: "pointer",
            }}
          >
            خروج
          </button>
        </div>

        {/* My courses — واقعاً از دیتابیس می‌خونه */}
        <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1A1A2E", marginBottom: "1rem" }}>دوره‌های من</h2>

        {enrollments === null ? (
          <p style={{ fontSize: "13px", color: "#888" }}>در حال بارگذاری...</p>
        ) : enrolledCourses.length === 0 ? (
          <div style={{ padding: "2rem", background: "#F5F5F5", borderRadius: "16px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: "#888", margin: 0 }}>هنوز دوره‌ای ثبت‌نام نکردی.</p>
            <a href="/courses" style={{
              display: "inline-block", marginTop: "1rem", fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "13px",
              padding: "10px 24px", borderRadius: "100px", textDecoration: "none",
              background: "linear-gradient(135deg,#E8632A,#ff7a40)", color: "#fff",
            }}>
              مشاهده دوره‌ها ←
            </a>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            {enrolledCourses.map(c => c && (
              <a key={c.slug} href={`/courses/${c.slug}`} style={{
                display: "block", padding: "1.2rem", borderRadius: "16px", border: "1.5px solid #f0f0f0",
                textDecoration: "none", color: "inherit",
              }}>
                <span style={{ fontSize: "1.5rem" }}>{c.icon}</span>
                <p style={{ fontSize: "14px", fontWeight: 700, color: "#1A1A2E", margin: "0.5rem 0 0" }}>{c.title}</p>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
