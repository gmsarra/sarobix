import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "همه فیلدها الزامی است" }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: "رمز عبور باید حداقل ۶ کاراکتر باشد" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const { data: existing } = await supabase
      .from("users")
      .select("id")
      .eq("email", normalizedEmail)
      .single();

    if (existing) {
      return NextResponse.json({ error: "این ایمیل قبلاً ثبت‌نام کرده است" }, { status: 409 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const { error } = await supabase.from("users").insert({
      name,
      email: normalizedEmail,
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
