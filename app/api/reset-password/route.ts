import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { method, identifier, code, newPassword } = await req.json();
    if (!method || !identifier || !code || !newPassword) {
      return NextResponse.json({ error: "اطلاعات ناقص است" }, { status: 400 });
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: "رمز عبور باید حداقل ۶ کاراکتر باشد" }, { status: 400 });
    }

    const normalized = method === "email" ? identifier.toLowerCase().trim() : identifier.trim();

    const { data: reset } = await supabase
      .from("password_resets")
      .select("*")
      .eq("identifier", normalized)
      .eq("code", code)
      .eq("used", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!reset) {
      return NextResponse.json({ error: "کد واردشده نامعتبر است" }, { status: 400 });
    }
    if (new Date(reset.expires_at) < new Date()) {
      return NextResponse.json({ error: "کد منقضی شده است. دوباره درخواست بده" }, { status: 400 });
    }

    const column = method === "email" ? "email" : "phone";
    const passwordHash = await bcrypt.hash(newPassword, 10);

    const { error: updateError } = await supabase
      .from("users")
      .update({ password_hash: passwordHash })
      .eq(column, normalized);

    if (updateError) {
      console.error("Password update error:", updateError);
      return NextResponse.json({ error: "خطا در تغییر رمز عبور" }, { status: 500 });
    }

    await supabase.from("password_resets").update({ used: true }).eq("id", reset.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Reset password error:", err);
    return NextResponse.json({ error: "خطای غیرمنتظره" }, { status: 500 });
  }
}
