"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { courses } from "@/data/courses"; // TODO سارا: اگه مسیر فرق داره اصلاح کن
import { posts } from "@/data/posts"; // TODO سارا: اگه مسیر فرق داره اصلاح کن

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return { courseResults: [], postResults: [] };

    const courseResults = courses.filter(
      c => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
    );
    const postResults = posts.filter(
      p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
    );
    return { courseResults, postResults };
  }, [query]);

  const hasResults = results.courseResults.length > 0 || results.postResults.length > 0;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 200,
        background: "rgba(26,26,46,0.6)", backdropFilter: "blur(4px)",
        display: "flex", alignItems: "flex-start", justifyContent: "center",
        padding: "10vh 1.5rem",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%", maxWidth: "600px", background: "#fff", borderRadius: "20px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)", overflow: "hidden", direction: "rtl",
          fontFamily: "Vazirmatn, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", padding: "1rem 1.5rem", borderBottom: "1px solid #eee" }}>
          <input
            autoFocus
            type="text"
            placeholder="جستجو بین دوره‌ها و مقالات..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              flex: 1, border: "none", outline: "none", fontSize: "15px",
              fontFamily: "Vazirmatn, sans-serif", direction: "rtl", color: "#333",
            }}
          />
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: "#999" }}>
            ✕
          </button>
        </div>

        <div style={{ maxHeight: "50vh", overflowY: "auto", padding: query ? "0.5rem 0" : 0 }}>
          {query && !hasResults && (
            <p style={{ textAlign: "center", color: "#888", fontSize: "13px", padding: "2rem 0" }}>چیزی پیدا نشد</p>
          )}

          {results.courseResults.length > 0 && (
            <div style={{ padding: "0.5rem 1.5rem" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#aaa", marginBottom: "0.5rem" }}>دوره‌ها</p>
              {results.courseResults.map(c => (
                <Link key={c.slug} href={`/courses/${c.slug}`} onClick={onClose} style={{
                  display: "block", padding: "0.7rem 0", borderBottom: "1px solid #f5f5f5", textDecoration: "none",
                }}>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#1A1A2E", margin: 0 }}>{c.title}</p>
                  <p style={{ fontSize: "12px", color: "#888", margin: "2px 0 0" }}>{c.desc}</p>
                </Link>
              ))}
            </div>
          )}

          {results.postResults.length > 0 && (
            <div style={{ padding: "0.5rem 1.5rem" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, color: "#aaa", marginBottom: "0.5rem" }}>مقالات</p>
              {results.postResults.map(p => (
                <Link key={p.slug} href={`/blog/${p.slug}`} onClick={onClose} style={{
                  display: "block", padding: "0.7rem 0", borderBottom: "1px solid #f5f5f5", textDecoration: "none",
                }}>
                  <p style={{ fontSize: "14px", fontWeight: 700, color: "#1A1A2E", margin: 0 }}>{p.title}</p>
                  <p style={{ fontSize: "12px", color: "#888", margin: "2px 0 0" }}>{p.excerpt}</p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
