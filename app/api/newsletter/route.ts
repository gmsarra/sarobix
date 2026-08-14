import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { contact } = await req.json();
    if (!contact || !contact.trim()) {
      return NextResponse.json({ error: "ایمیل یا شماره موبایل الزامی است" }, { status: 400 });
    }

    const { error } = await supabase.from("newsletter_subscribers").insert({ contact: contact.trim() });
    if (error) {
      console.error("Newsletter insert error:", error);
      return NextResponse.json({ error: "خطا در ثبت" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json({ error: "خطای غیرمنتظره" }, { status: 500 });
  }
}
