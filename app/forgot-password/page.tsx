"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<"request" | "reset">("request");
  const [method, setMethod] = useState<"email" | "phone">("email");
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "13px 18px", background: "#fff", border: "1.5px solid #eee",
    borderRadius: "12px", fontFamily: "Vazirmatn, sans-serif", fontSize: "14px",
    color: "#333", outline: "none", direction: "ltr", textAlign: "right",
  };

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setMessage(""); setLoading(true);
    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, identifier }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "خطا در ارسال کد");
        setLoading(false);
        return;
      }
      setMessage(method === "email" ? "کد به ایمیلت ارسال شد" : "کد به شماره‌ات ارسال شد");
      setStep("reset");
    } catch {
      setError("خطای غیرمنتظره");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ method, identifier, code, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "خطا در تغییر رمز عبور");
        setLoading(false);
        return;
      }
      router.push("/login");
    } catch {
      setError("خطای غیرمنتظره");
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh", direction: "rtl", fontFamily: "Vazirmatn, sans-serif", paddingTop: "120px", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "420px", padding: "0 1.5rem" }}>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#1A1A2E", textAlign: "center", marginBottom: "0.5rem" }}>
          بازیابی رمز عبور
        </h1>
        <p style={{ fontSize: "13px", color: "#888", textAlign: "center", marginBottom: "2rem" }}>
          {step === "request" ? "روش دریافت کد رو انتخاب کن" : "کد ارسال‌شده و رمز جدید رو وارد کن"}
        </p>

        {step === "request" ? (
          <>
            <div style={{ display: "flex", gap: "8px", marginBottom: "1rem", background: "#F5F5F5", padding: "4px", borderRadius: "12px" }}>
              <button type="button" onClick={() => { setMethod("email"); setIdentifier(""); }} style={{
                flex: 1, padding: "9px", borderRadius: "9px", border: "none", cursor: "pointer",
                fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "13px",
                background: method === "email" ? "#fff" : "transparent",
                color: method === "email" ? "#E8632A" : "#888",
                boxShadow: method === "email" ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              }}>ایمیل</button>
              <button type="button" onClick={() => { setMethod("phone"); setIdentifier(""); }} style={{
                flex: 1, padding: "9px", borderRadius: "9px", border: "none", cursor: "pointer",
                fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "13px",
                background: method === "phone" ? "#fff" : "transparent",
                color: method === "phone" ? "#E8632A" : "#888",
                boxShadow: method === "phone" ? "0 2px 8px rgba(0,0,0,0.08)" : "none",
              }}>شماره موبایل</button>
            </div>

            <form onSubmit={handleRequestCode} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <input
                required
                type={method === "email" ? "email" : "tel"}
                placeholder={method === "email" ? "ایمیل" : "شماره موبایل"}
                value={identifier}
                onChange={e => setIdentifier(e.target.value)}
                style={inputStyle}
              />
              {error && <p style={{ color: "#e03131", fontSize: "13px" }}>{error}</p>}
              <button type="submit" disabled={loading} style={{
                fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px", padding: "13px", borderRadius: "12px",
                border: "none", cursor: "pointer", color: "#fff",
                background: "linear-gradient(135deg,#E8632A,#ff7a40)",
              }}>
                {loading ? "در حال ارسال..." : "ارسال کد"}
              </button>
            </form>
          </>
        ) : (
          <form onSubmit={handleReset} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {message && <p style={{ color: "#28a745", fontSize: "13px" }}>{message}</p>}
            <input required placeholder="کد ۶ رقمی" value={code} onChange={e => setCode(e.target.value)} style={{ ...inputStyle, textAlign: "center", letterSpacing: "4px" }} />
            <input required type="password" placeholder="رمز عبور جدید (حداقل ۶ کاراکتر)" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={inputStyle} />
            {error && <p style={{ color: "#e03131", fontSize: "13px" }}>{error}</p>}
            <button type="submit" disabled={loading} style={{
              fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px", padding: "13px", borderRadius: "12px",
              border: "none", cursor: "pointer", color: "#fff",
              background: "linear-gradient(135deg,#E8632A,#ff7a40)",
            }}>
              {loading ? "در حال ثبت..." : "تغییر رمز عبور"}
            </button>
            <button type="button" onClick={() => setStep("request")} style={{
              background: "none", border: "none", color: "#888", fontSize: "13px", cursor: "pointer", fontFamily: "Vazirmatn, sans-serif",
            }}>
              کد نیومد؟ دوباره تلاش کن
            </button>
          </form>
        )}

        <p style={{ textAlign: "center", fontSize: "13px", color: "#888", marginTop: "1.5rem" }}>
          <Link href="/login" style={{ color: "#E8632A", fontWeight: 700 }}>بازگشت به صفحه‌ی ورود</Link>
        </p>
      </div>
    </div>
  );
}
