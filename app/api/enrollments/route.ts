import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // TODO سارا: اگه مسیر فرق داره اصلاح کن
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ enrollments: [] }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("enrollments")
    .select("course_slug, created_at")
    .eq("user_id", session.user.id);

  if (error) {
    console.error("Enrollments fetch error:", error);
    return NextResponse.json({ enrollments: [] });
  }

  return NextResponse.json({ enrollments: data || [] });
}
