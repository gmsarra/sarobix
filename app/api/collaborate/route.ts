import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// TODO سارا: این مسیر import رو با فایل کلاینت Supabase موجود توی پروژه‌ت هماهنگ کن
// اگه از قبل یه فایل مثل lib/supabase.ts داری که کلاینت رو می‌سازه، به‌جای دو خط پایین از همون استفاده کن
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // کلید سرویس، نه anon key — چون این کد سمت سرور اجرا می‌شه
const supabase = createClient(supabaseUrl, supabaseKey);

// TODO سارا: این سه‌تا رو باید توی Vercel Environment Variables اضافه کنی (توضیح کامل در پیام جداگانه)
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL; // ایمیلی که می‌خوای نوتیفیکیشن بهش بیاد (مثلاً info@sarobix.com)
const BALE_BOT_TOKEN = process.env.BALE_BOT_TOKEN;
const BALE_CHAT_ID = process.env.BALE_CHAT_ID; // آیدی عددی چتی که ربات باید پیام رو توش بفرسته

async function sendEmailNotification(summary: string) {
  if (!RESEND_API_KEY || !NOTIFY_EMAIL) return; // اگه تنظیم نشده، فقط رد شو، کل فرم رو خراب نکن
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Sarobix <noreply@sarobix.com>", // TODO سارا: بعد از verify کردن دامنه توی Resend، اینو به noreply@sarobix.com تغییر بده
        to: NOTIFY_EMAIL,
        subject: "درخواست جدید همکاری - ساروبیکس",
        text: summary,
      }),
    });
  } catch (err) {
    console.error("Email notification error:", err);
  }
}

async function sendBaleNotification(summary: string) {
  if (!BALE_BOT_TOKEN || !BALE_CHAT_ID) return;
  try {
    await fetch(`https://tapi.bale.ai/bot${BALE_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: BALE_CHAT_ID, text: summary }),
    });
  } catch (err) {
    console.error("Bale notification error:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type, name, email, phone, website, message, positionSlug, resumeUrl, motivation } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "نام و ایمیل الزامی است" }, { status: 400 });
    }

    const { error } = await supabase.from("collaborate_submissions").insert({
      type, // "inquiry" یا "application"
      name,
      email,
      phone: phone || null,
      website: website || null,
      message: message || null,
      position_slug: positionSlug || null,
      resume_url: resumeUrl || null,
      motivation: motivation || null,
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "خطا در ذخیره اطلاعات" }, { status: 500 });
    }

    // آماده‌سازی متن نوتیفیکیشن — یکسان برای ایمیل و بله
    const summary = [
      type === "application" ? "📄 درخواست رزومه‌ی جدید" : "🤝 درخواست همکاری عمومی جدید",
      `نام: ${name}`,
      `ایمیل: ${email}`,
      phone ? `شماره: ${phone}` : null,
      positionSlug ? `موقعیت: ${positionSlug}` : null,
      resumeUrl ? `رزومه: ${resumeUrl}` : null,
      message ? `پیام: ${message}` : null,
      motivation ? `انگیزه: ${motivation}` : null,
    ].filter(Boolean).join("\n");

    // نوتیفیکیشن‌ها async و بدون انتظار اجرا می‌شن — اگه ایمیل/بله fail بشه، submit کاربر همچنان موفق باقی می‌مونه
    await Promise.allSettled([sendEmailNotification(summary), sendBaleNotification(summary)]);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "خطای غیرمنتظره" }, { status: 500 });
  }
}

