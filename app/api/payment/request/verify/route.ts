import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID;
const SITE_URL = process.env.NEXTAUTH_URL || "https://sarobix.com";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const authority = searchParams.get("Authority");
  const status = searchParams.get("Status");

  if (!authority) {
    return NextResponse.redirect(`${SITE_URL}/payment/result?status=failed`);
  }

  // تراکنش pending مربوط به این authority رو پیدا می‌کنیم
  const { data: payment } = await supabase
    .from("payments")
    .select("*")
    .eq("authority", authority)
    .single();

  if (!payment) {
    return NextResponse.redirect(`${SITE_URL}/payment/result?status=failed`);
  }

  // اگه کاربر توی درگاه زرین‌پال «انصراف» زده باشه
  if (status !== "OK") {
    await supabase.from("payments").update({ status: "failed" }).eq("authority", authority);
    return NextResponse.redirect(`${SITE_URL}/payment/result?status=failed`);
  }

  try {
    const zpRes = await fetch("https://api.zarinpal.com/pg/v4/payment/verify.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchant_id: ZARINPAL_MERCHANT_ID,
        amount: payment.amount_rial,
        authority,
      }),
    });
    const zpData = await zpRes.json();

    // کد ۱۰۰ یعنی پرداخت موفق، ۱۰۱ یعنی قبلاً هم verify شده (باز موفقه)
    if (zpData?.data?.code === 100 || zpData?.data?.code === 101) {
      await supabase
        .from("payments")
        .update({ status: "paid", ref_id: String(zpData.data.ref_id) })
        .eq("authority", authority);

      // فقط اگه قبلاً ثبت‌نام نشده بود، اضافه کن (جلوگیری از ثبت تکراری)
      const { data: existingEnrollment } = await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", payment.user_id)
        .eq("course_slug", payment.course_slug)
        .single();

      if (!existingEnrollment) {
        await supabase.from("enrollments").insert({
          user_id: payment.user_id,
          course_slug: payment.course_slug,
        });
      }

      return NextResponse.redirect(`${SITE_URL}/payment/result?status=success`);
    } else {
      await supabase.from("payments").update({ status: "failed" }).eq("authority", authority);
      return NextResponse.redirect(`${SITE_URL}/payment/result?status=failed`);
    }
  } catch (err) {
    console.error("Payment verify error:", err);
    return NextResponse.redirect(`${SITE_URL}/payment/result?status=failed`);
  }
}
