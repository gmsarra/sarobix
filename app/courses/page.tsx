"use client";
import { useState } from "react";
import Link from "next/link";
import { courses } from "@/data/courses"; // TODO سارا: اگه مسیر فرق داره اصلاح کن

function CourseThumb({ slug, thumb, icon }: { slug: string; thumb: string; icon: string }) {
  const [imgError, setImgError] = useState(false);
  // TODO سارا: عکس کاور رو با همین مسیر توی public بذار (اگه نبود، خودکار گرادیان قبلی جایگزین می‌شه)
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

export default function CoursesPage() {
  return (
    <div style={{ paddingTop: "68px", minHeight: "100vh", background: "var(--bg-primary)" }}>
      <div className="container" style={{ padding: "4rem 1.5rem" }}>
        <div className="section-header">
          <span className="section-tag">دوره‌های آموزشی</span>
          <h1>تمام دوره‌های Sarobix</h1>
          <p>یادگیری عملی با پروژه‌های واقعی</p>
        </div>
        <div className="courses-grid">
          {courses.map((course) => (
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
                <div className="course-price">
                  <div>
                    <div className="price-old">{course.oldPrice}</div>
                    <div className="price-new">{course.price} ت</div>
                  </div>
                  <span className="btn-card">مشاهده ←</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
