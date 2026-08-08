import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { name, method, identifier, password } = await req.json();

    if (!name || !method || !identifier || !password) {
      return NextResponse.json({ error: "همه فیلدها الزامی است" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "رمز عبور باید حداقل ۶ کاراکتر باشد" }, { status: 400 });
    }
    if (method !== "email" && method !== "phone") {
      return NextResponse.json({ error: "روش ثبت‌نام نامعتبر است" }, { status: 400 });
    }

    const normalizedIdentifier = method === "email" ? identifier.toLowerCase().trim() : identifier.trim();

    // چک اعتبار فرمت، بسته به روش انتخابی
    if (method === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(normalizedIdentifier)) {
        return NextResponse.json({ error: "ایمیل واردشده معتبر نیست" }, { status: 400 });
      }
    } else {
      const phoneRegex = /^0\d{10}$/;
      if (!phoneRegex.test(normalizedIdentifier)) {
        return NextResponse.json({ error: "شماره موبایل باید ۱۱ رقم باشد و با صفر شروع شود" }, { status: 400 });
      }
    }

    const column = method === "email" ? "email" : "phone";
    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq(column, normalizedIdentifier)
      .single();

    if (existing) {
      return NextResponse.json({ error: method === "email" ? "این ایمیل قبلاً ثبت‌نام کرده است" : "این شماره قبلاً ثبت‌نام کرده است" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("users").insert({
      name,
      [column]: normalizedIdentifier,
      password_hash: passwordHash,
      provider: "credentials",
    });

    if (error) {
      console.error("Register insert error:", error);
      return NextResponse.json({ error: "خطا در ثبت‌نام" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Register API error:", err);
    return NextResponse.json({ error: "خطای غیرمنتظره" }, { status: 500 });
  }
}
