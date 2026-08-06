import { NextResponse } from "next/server";
import { resolveMx } from "dns/promises";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ valid: false, reason: "ایمیل نامعتبر است" });
    }

    const domain = email.split("@")[1]?.trim();
    if (!domain) {
      return NextResponse.json({ valid: false, reason: "دامنه ایمیل مشخص نیست" });
    }

    try {
      const records = await resolveMx(domain);
      if (records && records.length > 0) {
        return NextResponse.json({ valid: true });
      }
      return NextResponse.json({ valid: false, reason: "این دامنه ایمیل توانایی دریافت پیام ندارد" });
    } catch {
      // resolveMx وقتی دامنه اصلاً وجود نداشته باشه یا رکورد MX نداشته باشه، خطا می‌ده
      return NextResponse.json({ valid: false, reason: "دامنه ایمیل واردشده وجود ندارد" });
    }
  } catch (err) {
    console.error("Email verify error:", err);
    return NextResponse.json({ valid: false, reason: "خطا در بررسی ایمیل" });
  }
}
