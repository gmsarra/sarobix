import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// TODO سارا: این مسیر import رو با فایل کلاینت Supabase موجود توی پروژه‌ت هماهنگ کن
// اگه از قبل یه فایل مثل lib/supabase.ts داری که کلاینت رو می‌سازه، به‌جای دو خط پایین از همون استفاده کن
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // کلید سرویس، نه anon key — چون این کد سمت سرور اجرا می‌شه
const supabase = createClient(supabaseUrl, supabaseKey);

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

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("API error:", err);
    return NextResponse.json({ error: "خطای غیرمنتظره" }, { status: 500 });
  }
}
