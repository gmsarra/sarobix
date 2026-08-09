"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";

function PaymentResultContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const success = status === "success";

  return (
    <div style={{ background: "#fff", minHeight: "100vh", direction: "rtl", fontFamily: "Vazirmatn, sans-serif", paddingTop: "120px", display: "flex", justifyContent: "center" }}>
      <div style={{ maxWidth: "420px", padding: "0 1.5rem", textAlign: "center" }}>
        <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>{success ? "✅" : "❌"}</div>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 900, color: "#1A1A2E", marginBottom: "0.8rem" }}>
          {success ? "پرداخت با موفقیت انجام شد" : "پرداخت ناموفق بود"}
        </h1>
        <p style={{ fontSize: "14px", color: "#888", marginBottom: "2rem", lineHeight: 2 }}>
          {success
            ? "دوره به لیست دوره‌های شما اضافه شد."
            : "مشکلی در پرداخت پیش اومد یا انصراف دادی. اگه فکر می‌کنی اشتباهی رخ داده، با ما تماس بگیر."}
        </p>
        <Link href={success ? "/dashboard" : "/courses"} style={{
          display: "inline-block", fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px",
          padding: "13px 30px", borderRadius: "100px", textDecoration: "none",
          background: "linear-gradient(135deg,#E8632A,#ff7a40)", color: "#fff",
        }}>
          {success ? "مشاهده داشبورد ←" : "بازگشت به دوره‌ها ←"}
        </Link>
      </div>
    </div>
  );
}

export default function PaymentResultPage() {
  return (
    <Suspense fallback={null}>
      <PaymentResultContent />
    </Suspense>
  );
}
