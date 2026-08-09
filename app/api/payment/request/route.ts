import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // TODO سارا: اگه مسیر فرق داره اصلاح کن
import { createClient } from "@supabase/supabase-js";
import { getCourseBySlug } from "@/data/courses"; // TODO سارا: اگه مسیر فرق داره اصلاح کن

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

const ZARINPAL_MERCHANT_ID = process.env.ZARINPAL_MERCHANT_ID; // TODO سارا: بعد از ثبت‌نام زرین‌پال، این‌و توی Vercel اضافه کن
const SITE_URL = process.env.NEXTAUTH_URL || "https://sarobix.com";

// قیمت‌های data/courses.ts به‌صورت رشته‌ی فارسی با اعداد فارسی و کاما نوشته شدن (مثلاً «۶۵۰,۰۰۰»)
// این تابع اون‌ها رو به عدد قابل‌محاسبه (تومان) تبدیل می‌کنه
function parsePriceToToman(priceStr: string): number {
  const persianToEnglish = priceStr.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));
  const cleaned = persianToEnglish.replace(/[^\d]/g, "");
  return parseInt(cleaned, 10);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "لطفاً ابتدا وارد حساب کاربری شو" }, { status: 401 });
  }

  if (!ZARINPAL_MERCHANT_ID) {
    // هنوز حساب زرین‌پال ساخته/تنظیم نشده — به‌جای کرش کردن، پیام واضح می‌دیم
    return NextResponse.json({ error: "درگاه پرداخت هنوز فعال نشده است" }, { status: 503 });
  }

  const { courseSlug } = await req.json();
  const course = getCourseBySlug(courseSlug);
  if (!course) {
    return NextResponse.json({ error: "دوره پیدا نشد" }, { status: 404 });
  }

  const amountToman = parsePriceToToman(course.price);
  const amountRial = amountToman * 10; // زرین‌پال مبلغ رو به ریال می‌گیره

  try {
    const zpRes = await fetch("https://api.zarinpal.com/pg/v4/payment/request.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        merchant_id: ZARINPAL_MERCHANT_ID,
        amount: amountRial,
        callback_url: `${SITE_URL}/api/payment/verify`,
        description: `خرید دوره: ${course.title}`,
        metadata: { email: session.user.email },
      }),
    });
    const zpData = await zpRes.json();

    if (zpData?.data?.code !== 100) {
      console.error("Zarinpal request error:", zpData);
      return NextResponse.json({ error: "خطا در اتصال به درگاه پرداخت" }, { status: 500 });
    }

    const authority = zpData.data.authority;

    // این تراکنش رو با وضعیت pending ذخیره می‌کنیم تا بعد از برگشت از زرین‌پال، بتونیم verify کنیم
    await supabase.from("payments").insert({
      user_id: session.user.id,
      course_slug: courseSlug,
      amount_rial: amountRial,
      authority,
      status: "pending",
    });

    return NextResponse.json({ paymentUrl: `https://www.zarinpal.com/pg/StartPay/${authority}` });
  } catch (err) {
    console.error("Payment request error:", err);
    return NextResponse.json({ error: "خطای غیرمنتظره در اتصال به درگاه" }, { status: 500 });
  }
}
