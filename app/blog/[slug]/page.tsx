import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, getPostBySlug } from "@/data/posts"; // TODO سارا: اگه فایل posts.ts رو جای دیگه‌ای گذاشتی، مسیر import رو اصلاح کن

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // پست‌های مرتبط: همون دسته‌بندی، به جز خود پست فعلی
  const related = posts.filter((p) => p.category === post!.category && p.slug !== post!.slug).slice(0, 3);

  return (
    <div style={{ background: "#fff", minHeight: "100vh", direction: "rtl", fontFamily: "Vazirmatn, sans-serif", paddingTop: "120px" }}>

      <div style={{ maxWidth: "760px", margin: "0 auto", padding: "0 1.5rem 5rem" }}>

        {/* Breadcrumb / back link */}
        <Link href="/blog" style={{
          display: "inline-flex", alignItems: "center", gap: "6px",
          fontSize: "13px", color: "#888", textDecoration: "none", marginBottom: "2rem",
        }}>
          → بازگشت به مقالات
        </Link>

        {/* Category + date */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
          <span style={{
            fontSize: "11px", fontWeight: 700, padding: "5px 14px",
            borderRadius: "100px", background: "rgba(232,99,42,0.1)", color: "#E8632A",
          }}>
            {post!.category}
          </span>
          <span style={{ fontSize: "12px", color: "#aaa" }}>{post!.date}</span>
        </div>

        {/* Title */}
        <h1 style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 900, color: "#1A1A2E", lineHeight: 1.6, marginBottom: "1.5rem" }}>
          {post!.title}
        </h1>

        {/* Cover image */}
        <div style={{ width: "100%", aspectRatio: "16 / 9", borderRadius: "20px", overflow: "hidden", background: "#f5f5f5", marginBottom: "2.5rem" }}>
          <img
            src={post!.image}
            alt={post!.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
          />
        </div>

        {/* Body */}
        <div style={{ fontSize: "16px", color: "#444", lineHeight: 2.1 }}>
          {post!.content.map((para, i) => (
            <p key={i} style={{ marginBottom: "1.4rem" }}>{para}</p>
          ))}
        </div>

        {/* Share / CTA */}
        <div style={{
          marginTop: "3rem", padding: "1.5rem", borderRadius: "16px",
          background: "linear-gradient(135deg,#fff5f0,#fff)", border: "1.5px solid rgba(232,99,42,0.15)",
          textAlign: "center",
        }}>
          <p style={{ fontSize: "14px", color: "#666", marginBottom: "1rem" }}>
            علاقه‌مند به یادگیری عمیق‌تر این موضوع هستی؟
          </p>
          <Link href="/courses" style={{
            display: "inline-block", fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px",
            padding: "12px 28px", borderRadius: "100px", textDecoration: "none",
            background: "linear-gradient(135deg,#E8632A,#ff7a40)", color: "#fff",
          }}>
            مشاهده دوره‌های مرتبط ←
          </Link>
        </div>

        {/* Related posts */}
        {related.length > 0 && (
          <div style={{ marginTop: "4rem" }}>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#1A1A2E", marginBottom: "1.2rem" }}>
              مقالات مرتبط
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} style={{
                  display: "block", padding: "1rem", borderRadius: "14px",
                  border: "1.5px solid #f0f0f0", textDecoration: "none", color: "inherit",
                }}>
                  <p style={{ fontSize: "13px", fontWeight: 700, color: "#1A1A2E", margin: 0 }}>{r.title}</p>
                  <p style={{ fontSize: "12px", color: "#aaa", margin: "4px 0 0" }}>{r.date}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
