export default function CoursesPage() {
    const courses = [
      {
        id: 1,
        title: "هوش مصنوعی مقدماتی",
        desc: "مفاهیم پایه AI، کاربردها و آشنایی با ابزارها",
        time: "۲۰ ساعت",
        level: "مبتدی",
        price: "۶۵۰,۰۰۰",
        oldPrice: "۱,۵۰۰,۰۰۰",
        badge: "پرطرفدار",
        badgeClass: "badge-hot",
        thumb: "ai-basic",
        icon: "🧠",
      },
      {
        id: 2,
        title: "هوش مصنوعی پیشرفته",
        desc: "معماری‌های پیشرفته AI و پیاده‌سازی پروژه‌های واقعی",
        time: "۴۰ ساعت",
        level: "متوسط+",
        price: "۱,۱۰۰,۰۰۰",
        oldPrice: "۲,۵۰۰,۰۰۰",
        badge: "پیشرفته",
        badgeClass: "badge-new",
        thumb: "ai-adv",
        icon: "🤖",
      },
      {
        id: 3,
        title: "یادگیری ماشین",
        desc: "الگوریتم‌های ML، رگرسیون، طبقه‌بندی با Python و Sklearn",
        time: "۳۵ ساعت",
        level: "مبتدی+",
        price: "۸۵۰,۰۰۰",
        oldPrice: "۲,۰۰۰,۰۰۰",
        badge: "جدید",
        badgeClass: "badge-new",
        thumb: "ml",
        icon: "📊",
      },
      {
        id: 4,
        title: "یادگیری عمیق",
        desc: "شبکه‌های عصبی، CNN، RNN و پیاده‌سازی با TensorFlow",
        time: "۴۵ ساعت",
        level: "پیشرفته",
        price: "۱,۳۵۰,۰۰۰",
        oldPrice: "۳,۰۰۰,۰۰۰",
        badge: "به‌زودی",
        badgeClass: "badge-soon",
        thumb: "dl",
        icon: "🔬",
      },
      {
        id: 5,
        title: "رباتیک و Arduino",
        desc: "ساخت ربات از صفر با برنامه‌نویسی و سخت‌افزار واقعی",
        time: "۵۵ ساعت",
        level: "همه سطوح",
        price: "۹۵۰,۰۰۰",
        oldPrice: "۲,۲۰۰,۰۰۰",
        badge: "ویژه",
        badgeClass: "badge-hot",
        thumb: "robot",
        icon: "🦾",
      },
      {
        id: 6,
        title: "رباتیک پیشرفته ROBO",
        desc: "سیستم‌های رباتیک هوشمند، سنسورها و کنترل حرکت",
        time: "۶۰ ساعت",
        level: "متوسط+",
        price: "۱,۵۰۰,۰۰۰",
        oldPrice: "۳,۵۰۰,۰۰۰",
        badge: "ROBO",
        badgeClass: "badge-new",
        thumb: "robo-c",
        icon: "🤖",
      },
      {
        id: 7,
        title: "پرامپت‌نویسی مقدماتی",
        desc: "اصول پرامپت‌نویسی برای ChatGPT، Claude و Gemini",
        time: "۱۵ ساعت",
        level: "مبتدی",
        price: "۳۵۰,۰۰۰",
        oldPrice: "۸۰۰,۰۰۰",
        badge: "جدید",
        badgeClass: "badge-new",
        thumb: "prompt-b",
        icon: "✍️",
      },
      {
        id: 8,
        title: "پرامپت‌نویسی جامع",
        desc: "تکنیک‌های پیشرفته، Chain of Thought و Fine-tuning",
        time: "۳۰ ساعت",
        level: "متوسط+",
        price: "۷۵۰,۰۰۰",
        oldPrice: "۱,۸۰۰,۰۰۰",
        badge: "به‌زودی",
        badgeClass: "badge-soon",
        thumb: "prompt-a",
        icon: "🎯",
      },
    ];
  
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
              <div key={course.id} className={`course-card ${course.badgeClass === "badge-hot" ? "hot" : ""}`}>
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
                    <button className="btn-card">مشاهده ←</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }