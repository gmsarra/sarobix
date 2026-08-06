"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
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
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError("ایمیل یا رمز عبور اشتباه است");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", direction: "rtl", fontFamily: "Vazirmatn, sans-serif", paddingTop: "120px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "420px", padding: "0 1.5rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#1A1A2E", textAlign: "center", marginBottom: "2rem" }}>
          ورود به ساروبیکس
        </h1>

        <button
          onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
          style={{
            width: "100%", padding: "13px", borderRadius: "12px", marginBottom: "1.2rem",
            border: "1.5px solid #eee", background: "#fff", cursor: "pointer",
            fontFamily: "Vazirmatn, sans-serif", fontWeight: 600, fontSize: "14px", color: "#333",
          }}
        >
          ورود با گوگل
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0", color: "#aaa", fontSize: "12px" }}>
          <div style={{ flex: 1, height: "1px", background: "#eee" }} />
          یا با ایمیل
          <div style={{ flex: 1, height: "1px", background: "#eee" }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input required type="email" placeholder="ایمیل" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={inputStyle} />
          <input required type="password" placeholder="رمز عبور" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} style={inputStyle} />
          {error && <p style={{ color: "#e03131", fontSize: "13px" }}>{error}</p>}
          <button type="submit" disabled={loading} style={{
            fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px", padding: "13px", borderRadius: "12px",
            border: "none", cursor: "pointer", color: "#fff",
            background: "linear-gradient(135deg,#E8632A,#ff7a40)",
          }}>
            {loading ? "در حال ورود..." : "ورود"}
          </button>
        </form>

        <p style={{ textAlign: "center", fontSize: "13px", color: "#888", marginTop: "1.5rem" }}>
          حساب نداری؟ <Link href="/register" style={{ color: "#E8632A", fontWeight: 700 }}>ثبت‌نام کن</Link>
        </p>
      </div>
    </div>
  );
}
