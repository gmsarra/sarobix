"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { courses, Course } from "@/data/courses";
import CourseFilters from "@/components/CourseFilters";
import CoursesSeoSection from "@/components/CoursesSeoSection";

function CourseThumb({ slug, thumb, icon }: { slug: string; thumb: string; icon: string }) {
  const [imgError, setImgError] = useState(false);
  const coverPath = `/courses/${slug}/cover.jpg`;

  if (imgError) {
    return <div className={`course-thumb ${thumb}`}>{icon}</div>;
  }
  return (
    <div className={`course-thumb ${thumb}`} style={{ padding: 0, overflow: "hidden" }}>
      <img
        src={coverPath}
        alt=""
        onError={() => setImgError(true)}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}

type Category = "همه دوره‌ها" | "هوش مصنوعی" | "برنامه‌نویسی" | "رباتیک" | "پایتون" | "سایر";
type SortOrder = "newest" | "oldest" | "default";

export default function CoursesPage() {
  const [visibleCount, setVisibleCount] = useState(9);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category>("همه دوره‌ها");
  const [sort, setSort] = useState<SortOrder>("default");

  const filteredCourses = useMemo(() => {
    let list: Course[] = [...courses];

    if (category !== "همه دوره‌ها") {
      list = list.filter((c) => c.category === category);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter(
        (c) => c.title.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q)
      );
    }
    if (sort === "newest") list = list.sort((a, b) => b.id - a.id);
    if (sort === "oldest") list = list.sort((a, b) => a.id - b.id);
    // sort === "default" -> keep original order

    return list;
  }, [search, category, sort]);

  const visibleCourses = filteredCourses.slice(0, visibleCount);
  const hasMore = visibleCount < filteredCourses.length;

  return (
    <div style={{ paddingTop: "68px", minHeight: "100vh", background: "var(--bg-primary)" }}>
      <div className="container" style={{ padding: "4rem 1.5rem" }}>
        <div className="section-header">
          <span className="section-tag">دوره‌های آموزشی</span>
          <h1>دوره‌های Sarobix</h1>
          <p>یادگیری عملی با پروژه‌های واقعی</p>
        </div>

        <div className="courses-layout">
          {/* Courses grid — main column */}
          <div>
            {visibleCourses.length === 0 ? (
              <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "3rem 0" }}>
                دوره‌ای با این مشخصات پیدا نشد.
              </p>
            ) : (
              <div className="courses-grid">
                {visibleCourses.map((course) => (
                  <Link
                    key={course.id}
                    href={`/courses/${course.slug}`}
                    className={`course-card ${course.badgeClass === "badge-hot" ? "hot" : ""}`}
                    style={{ display: "block", textDecoration: "none", color: "inherit", position: "relative" }}
                  >
                    <div style={{ position: "relative" }}>
                      <CourseThumb slug={course.slug} thumb={course.thumb} icon={course.icon} />
                      <span className={`course-badge-tag ${course.badgeClass}`} style={{ position: "absolute", top: ".7rem", right: ".7rem" }}>
                        {course.badge}
                      </span>
                      <span style={{
                        position: "absolute", top: ".7rem", left: ".7rem",
                        fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "100px",
                        background: course.format === "حضوری" ? "rgba(201,169,110,0.9)" : "rgba(255,255,255,0.9)",
                        color: course.format === "حضوری" ? "#fff" : "#1A1A2E",
                      }}>
                        {course.format === "حضوری" ? "📍 حضوری" : "💻 آنلاین"}
                      </span>
                    </div>
                    <div className="course-body">
                      <h3>{course.title}</h3>
                      <p>{course.desc}</p>
                      <div className="course-meta-row">
                        <span>⏱ {course.time}</span>
                        <span>👤 {course.level}</span>
                      </div>
                      <div className="course-cta-row">
                        <span className="btn-card-full">مشاهده اطلاعات دوره ←</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {hasMore && (
              <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
                <button
                  onClick={() => setVisibleCount(filteredCourses.length)}
                  style={{
                    fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px",
                    padding: "12px 32px", borderRadius: "100px", cursor: "pointer",
                    border: "1.5px solid rgba(232,99,42,0.3)", background: "#fff", color: "#E8632A",
                  }}
                >
                  مشاهده بیشتر
                </button>
              </div>
            )}
          </div>

          {/* Filter sidebar — 3 separated elevated boxes */}
          <CourseFilters
            search={search} setSearch={setSearch}
            category={category} setCategory={setCategory}
            sort={sort} setSort={setSort}
          />
        </div>
      </div>

      <CoursesSeoSection />
    </div>
  );
}
