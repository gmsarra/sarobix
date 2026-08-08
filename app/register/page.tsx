"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [form, setForm] = useState({ name: "", identifier: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 18px", background: "#fff", border: "1.5px solid #eee",
    borderRadius: "12px", fontFamily: "Vazirmatn, sans-serif", fontSize: "14px",
    color: "#333", outline: "none", direction: "ltr", textAlign: "right",
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.name, method, identifier: form.identifier, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "خطا در ثبت‌نام");
        setLoading(false);
        return;
      }
      // بعد از ثبت‌نام موفق، خودکار وارد می‌شه
      const signInRes = await signIn("credentials", { identifier: form.identifier, password: form.password, redirect: false });
      setLoading(false);
      if (signInRes?.error) {
        router.push("/login");
      } else {
        router.push("/dashboard");
      }
    } catch {
      setError("خطای غیرمنتظره");
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", direction: "rtl", fontFamily: "Vazirmatn, sans-serif", paddingTop: "120px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "420px", padding: "0 1.5rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#1A1A2E", textAlign: "center", marginBottom: "2rem" }}>
          ثبت‌نام در ساروبیکس
        </h1>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          style={{
            width: "100%", padding: "13px", borderRadius: "12px", marginBottom: "1.2rem",
            border: "1.5px solid #eee", background: "#fff", cursor: "pointer",
            fontFamily: "Vazirmatn, sans-serif", fontWeight: 600, fontSize: "14px", color: "#333",
          }}
        >
          ثبت‌نام با گوگل
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0", color: "#aaa", fontSize: "12px" }}>
          <div style={{ flex: 1, height: "1px", background: "#eee" }} />
          یا با ایمیل/شماره
          <div style={{ flex: 1, height: "1px", background: "#eee" }} />
        </div>

        {/* Toggle بین ایمیل و شماره موبایل */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "1rem", background: "#F5F5F5", padding: "4px", borderRadius: "12px" }}>
          <button
            type="button"
            onClick={() => { setMethod("email"); setForm({ ...form, identifier: "" }); }}
            style={{
              flex: 1, padding: "9px", borderRadius: "9px", border: "none", cursor: "pointer",
              fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "13px",
              background: method === "email" ? "#fff" : "transparent",
              color: method === "email" ? "#E8632A" : "#888",
              boxShadow: method === "email" ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
            }}
          >
            ایمیل
          </button>
          <button
            type="button"
            onClick={() => { setMethod("phone"); setForm({ ...form, identifier: "" }); }}
            style={{
              flex: 1, padding: "9px", borderRadius: "9px", border: "none", cursor: "pointer",
              fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "13px",
              background: method === "phone" ? "#fff" : "transparent",
              color: method === "phone" ? "#E8632A" : "#888",
              boxShadow: method === "phone" ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
            }}
          >
            شماره موبایل
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input required placeholder="نام و نام خانوادگی" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={{ ...inputStyle, direction: "rtl" }} />

          <input
            required
            type={method === "email" ? "email" : "tel"}
            placeholder={method === "email" ? "ایمیل" : "شماره موبایل (مثلاً 09123456789)"}
            value={form.identifier}
            onChange={e => setForm({ ...form, identifier: e.target.value })}
            style={inputStyle}
          />

          {/* رمز عبور با آیکون چشم برای نمایش/مخفی کردن */}
          <div style={{ position: "relative" }}>
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="رمز عبور (حداقل ۶ کاراکتر)"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              style={{ ...inputStyle, paddingLeft: "44px" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", padding: "4px",
                color: "#999", display: "flex", alignItems: "center",
              }}
              aria-label={showPassword ? "مخفی کردن رمز" : "نمایش رمز"}
            >
              {showPassword ? (
                // چشم بسته (یعنی الان متن قابل‌دیدنه، بزن تا مخفی بشه)
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                // چشم باز (یعنی الان مخفیه، بزن تا نشون داده بشه)
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>

          {error && <p style={{ color: "#e03131", fontSize: "13px" }}>{error}</p>}
          <button type="submit" disabled={loading} style={{
            fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px", padding: "13px", borderRadius: "12px",
            border: "none", cursor: "pointer", color: "#fff",
            background: "linear-gradient(135deg,#E8632A,#ff7a40)",
          }}>
            {loading ? "در حال ثبت‌نام..." : "ثبت‌نام"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#888", marginTop: "1.5rem" }}>
          قبلاً ثبت‌نام کردی؟ <Link href="/login" style={{ color: "#E8632A", fontWeight: 700 }}>وارد شو</Link>
        </p>
      </div>
    </div>
  );
}
