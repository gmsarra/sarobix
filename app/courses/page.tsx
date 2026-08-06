import Link from "next/link";
import { courses } from "@/data/courses"; // TODO سارا: اگه مسیر courses.ts فرق داره، اینجا اصلاح کن

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
              style={{ display: "block", textDecoration: "none", color: "inherit" }}
            >
              <div className={`course-thumb ${course.thumb}`}>
                {course.icon}
                <span className={`course-badge-tag ${course.badgeClass}`}>{course.badge}</span>
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
