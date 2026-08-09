import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const SMS_API_KEY = process.env.SMS_API_KEY; // TODO سارا: بعد از ساخت حساب پیامکی (مثل Kavenegar)، این‌و اضافه کن

async function sendCodeByEmail(email: string, code: string) {
  if (!RESEND_API_KEY) return false;
  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Sarobix <noreply@sarobix.com>",
      to: email,
      subject: "کد بازیابی رمز عبور - ساروبیکس",
      text: `کد بازیابی رمز عبور شما: ${code}\nاین کد تا ۱۰ دقیقه معتبر است.`,
    }),
  });
  return true;
}

async function sendCodeBySms(phone: string, code: string): Promise<boolean> {
  if (!SMS_API_KEY) return false; // هنوز حساب کاوه‌نگار تنظیم نشده

  try {
    const message = encodeURIComponent(`کد بازیابی رمز عبور ساروبیکس: ${code}\nاین کد تا ۱۰ دقیقه معتبر است.`);
    const url = `https://api.kavenegar.com/v1/${SMS_API_KEY}/sms/send.json?receptor=${phone}&message=${message}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data?.return?.status !== 200) {
      console.error("Kavenegar send error:", data);
      return false;
    }
    return true;
  } catch (err) {
    console.error("SMS send error:", err);
    return false;
  }
}

export async function POST(req: Request) {
  try {
    const { method, identifier } = await req.json();
    if (!method || !identifier) {
      return NextResponse.json({ error: "اطلاعات ناقص است" }, { status: 400 });
    }

    const column = method === "email" ? "email" : "phone";
    const normalized = method === "email" ? identifier.toLowerCase().trim() : identifier.trim();

    const { data: user } = await supabase.from("users").select("id").eq(column, normalized).single();
    if (!user) {
      // به‌عمد پیام رو کلی می‌ذاریم (نه «این ایمیل وجود نداره») تا کسی نتونه ایمیل‌های ثبت‌شده رو حدس بزنه
      return NextResponse.json({ success: true });
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString(); // کد ۶ رقمی
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString(); // ۱۰ دقیقه اعتبار

    await supabase.from("password_resets").insert({ identifier: normalized, code, expires_at: expiresAt });

    if (method === "email") {
      await sendCodeByEmail(normalized, code);
    } else {
      const sent = await sendCodeBySms(normalized, code);
      if (!sent) {
        return NextResponse.json({ error: "ارسال پیامک هنوز فعال نشده است. لطفاً از روش ایمیل استفاده کن" }, { status: 503 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Forgot password error:", err);
    return NextResponse.json({ error: "خطای غیرمنتظره" }, { status: 500 });
  }
}
