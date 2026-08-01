export default function AboutPage() {
    const features = [
      { icon: "🎓", text: "مهندس ارشد نرم‌افزار با بیش از ۱۰ سال سابقه در مهندسی کامپیوتر" },
      { icon: "🧑‍🏫", text: "۵ سال تجربه‌ی تدریس تخصصی برنامه‌نویسی و هوش مصنوعی " },
      { icon: "🤖", text: "آموزش پروژه‌محور، مبتنی بر تجربه‌ی واقعی مهندسی نرم‌افزار" },
      { icon: "💡", text: "بنیان‌گذاری و اداره‌ی مستقل ساروبیکس، با هدف رشد به یک تیم تخصصی" },
    ];
  
    return (
      <div style={{ paddingTop: "68px", minHeight: "100vh", background: "var(--bg-primary)" }}>
  
        {/* HERO PHOTO SECTION */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: "4rem 1.5rem 3rem", textAlign: "center",
        }}>
          <div style={{ position: "relative", width: "min(340px, 80vw)", animation: "fadeUp 0.9s ease both" }}>
            {/* Glow behind the frame */}
            <div style={{
              position: "absolute", inset: "-30px",
              background: "radial-gradient(circle at 50% 40%, rgba(201,169,110,0.25), transparent 70%)",
              pointerEvents: "none", zIndex: 0,
            }} />
  
            {/* Photo frame — squircle, gold-to-orange border */}
            <div style={{
              position: "relative", zIndex: 1,
              width: "100%", aspectRatio: "1 / 1",
              borderRadius: "40px", padding: "4px",
              background: "linear-gradient(135deg, #C9A96E, #E8632A)",
              boxShadow: "0 20px 60px rgba(232,99,42,0.25)",
            }}>
              <div style={{
                width: "100%", height: "100%", borderRadius: "37px",
                overflow: "hidden", background: "#f5f5f5",
              }}>
                {/* TODO سارا: مسیر عکس واقعی خودت رو جایگزین این کن */}
                <img
                  src="/sara-about-photo.jpg"
                  alt="سارا گمراوی"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            </div>
  
            {/* Floating badges */}
            <div style={{
              position: "absolute", top: "8%", right: "-10%", zIndex: 2,
              background: "#fff", border: "1.5px solid rgba(232,99,42,0.25)",
              borderRadius: "100px", padding: "8px 16px",
              fontSize: "12px", fontWeight: 700, color: "#E8632A",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)", whiteSpace: "nowrap",
            }}>
              🎓 ۱۰+ سال تجربه مهندسی
            </div>
  
            <div style={{
              position: "absolute", bottom: "18%", left: "-12%", zIndex: 2,
              background: "#fff", border: "1.5px solid rgba(201,169,110,0.35)",
              borderRadius: "100px", padding: "8px 16px",
              fontSize: "12px", fontWeight: 700, color: "#C9A96E",
              boxShadow: "0 8px 24px rgba(0,0,0,0.08)", whiteSpace: "nowrap",
            }}>
              🧑‍🏫 ۵ سال تدریس تخصصی
            </div>
  
            <div style={{
              position: "absolute", bottom: "-4%", right: "2%", zIndex: 2,
              background: "#1A1A2E", borderRadius: "100px", padding: "8px 16px",
              fontSize: "12px", fontWeight: 700, color: "#fff",
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)", whiteSpace: "nowrap",
            }}>
              💡 آموزش پروژه‌محور
            </div>
          </div>
  
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,2.6rem)", fontWeight: 900, color: "#1A1A2E", marginTop: "2.5rem", marginBottom: "0.6rem" }}>
             
          </h1>
          <p style={{ fontSize: "15px", color: "#888", maxWidth: "480px", lineHeight: 2, marginBottom: "2rem" }}>
          </p>
  
          {/* CTA buttons */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="/courses" style={{
              fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px",
              padding: "13px 30px", borderRadius: "100px", textDecoration: "none",
              background: "linear-gradient(135deg,#E8632A,#ff7a40)", color: "#fff",
              boxShadow: "0 6px 24px rgba(232,99,42,0.3)",
            }}>
              مشاهده دوره‌ها ←
            </a>
            <a href="/contact" style={{
              fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px",
              padding: "13px 30px", borderRadius: "100px", textDecoration: "none",
              border: "1.5px solid #1A1A2E", color: "#1A1A2E", background: "#fff",
            }}>
              تماس با ما
            </a>
          </div>
        </div>
  
        {/* SECTION HEADER */}
        <div className="container" style={{ padding: "2rem 1.5rem 0" , fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px",
}}>
          <div className="section-header">
            <span className="section-tag">درباره برند ساروبیکس</span>
            <h1> </h1>
          </div>
        </div>
  
        {/* BIO SECTION */}
        <section className="about">
        <div className="container">
          <div className="about-grid">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
              <img
                src="/logo-main.png"
                alt="Sarobix"
                style={{ width: "100%", maxWidth: "380px", height: "auto", objectFit: "contain" }}
              />
            </div>
              <div className="about-content">
                <h2>داستان ساروبیکس</h2>
                <p>
                   ساروبیکس آکادمی تخصصی آموزش برنامه‌نویسی و هوش مصنوعی است که در سال ۱۴۰۴ توسط 

                   <b>                  سارا گمراوی
                   </b>
                  ،
                  مهندس ارشد نرم‌افزار با بیش از ۱۰ سال سابقه‌ی فعالیت در حوزه‌ی مهندسی کامپیوتر، بنیان‌گذاری شد. ساروبیکس
                  حاصل ترکیب دو علاقه‌ی عمیق است: عشق به محیط آکادمیک و آموزش، و شیفتگی بی‌وقفه به تکنولوژی و برنامه‌نویسی.
                  این ترکیب باعث شد مسیر تدریس تخصصی این حوزه‌ها، به‌طور جدی از ۵ سال پیش دنبال شود و امروز در قالب برند
                  ساروبیکس به دانش‌آموزان ، دانشجویان و علاقه‌مندان ارائه شود.
                </p>
                <p>
                  آنچه ساروبیکس را متمایز می‌کند، این است که پشت هر دوره، یک مهندس ارشد نرم‌افزار واقعی با تجربه‌ی عملی در صنعت
                  ایستاده است، نه صرفاً یک مدرس تئوری‌محور. این یعنی محتوایی که ارائه می‌شود، بازتابی از تجربه‌ی واقعی کار
                  در دنیای مهندسی است، نه صرفاً جمع‌آوری مطالب .
                </p>
                <p>
                شعار ما در ساروبیکس 
                <b>                «آینده را کُد کن»
                </b>
                ، صرفاً یک جمله نیست؛ بلکه فلسفه‌ای‌ست که در طراحی دوره‌ها، انتخاب پروژه‌ها، و شیوه‌ی تدریسمان جریان دارد.                </p>
  
                <h2 style={{ marginTop: "1.5rem" }}>مأموریت و چشم‌انداز</h2>
                <p>
                  <strong>مأموریت:</strong> آموزش عملی، دقیق و پروژه‌محور برنامه‌نویسی، هوش مصنوعی و رباتیک، با تکیه بر
                  تجربه‌ی مهندسی واقعی؛ به‌گونه‌ای که یادگیرنده نه فقط با مفاهیم، بلکه با نحوه‌ی تفکر مهندسی آشنا شود.
                </p>
                <p>
                  <strong>چشم‌انداز:</strong> ساروبیکس امروز حاصل تلاش یک بنیان‌گذار است — زنی که به‌تنهایی مسیر طراحی
                  دوره‌ها، تدریس، و ساخت این برند را طی کرده. چشم‌انداز ساروبیکس، رشد از این نقطه به یک تیم تخصصی است، و
                  در مسیری بزرگ‌تر، معرفی توانمندی زنان ایرانی در حوزه‌ی تکنولوژی به مخاطبان فراتر از مرزهای ایران.
                </p>
  
                <div className="about-feats">
                  {features.map((f, i) => (
                    <div className="about-feat" key={i}>
                      <div className="about-feat-icon">{f.icon}</div>
                      <div className="about-feat-text">{f.text}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
  
        {/* SERVICES */}
        <div className="container" style={{ padding: "4rem 1.5rem" }}>
          <div className="section-header">
            <span className="section-tag">خدمات ساروبیکس</span>
            <h2>چه چیزی ارائه می‌دیم</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.2rem" }}>
            {[
              { icon: "💻", title: "دوره‌های تخصصی", text: "برنامه‌نویسی، هوش مصنوعی و رباتیک برای رده‌های سنی مختلف، با تمرکز ویژه بر پایه‌ی هفتم تا دوازدهم" },
              { icon: "🛠️", title: "آموزش پروژه‌محور", text: "یادگیری از طریق ساخت پروژه‌های واقعی به‌جای صرفاً تئوری" },
              { icon: "⚙️", title: "محتوای مبتنی بر تجربه", text: "دوره‌ها از دل کار واقعی روی پروژه‌های نرم‌افزاری و هوش مصنوعی شکل گرفته‌اند" },
            ].map((s, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
  
        {/* VALUES */}
        <div className="container" style={{ padding: "0 1.5rem 4rem" }}>
          <div className="section-header">
            <span className="section-tag">ارزش‌های ساروبیکس</span>
            <h2>چرا ساروبیکس؟</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "760px", margin: "0 auto" }}>
            {[
              ["صداقت در مقیاس و ادعا", "ساروبیکس ترجیح می‌دهد کوچک و صادق باشد تا بزرگ و غیرواقعی."],
              ["تدریس مبتنی بر تجربه‌ی واقعی مهندسی", "هر آنچه تدریس می‌شود، پیش از این در عمل تجربه شده است."],
              ["توجه ویژه به رده‌ی سنی نوجوان", "طراحی محتوا به زبانی که برای دانش‌آموزان پایه‌ی هفتم تا دوازدهم قابل‌فهم و جذاب باشد."],
              ["مسیر تیم‌سازی", "ساروبیکس امروز به‌صورت انفرادی اداره می‌شود، اما در مسیر جذب همکاران متخصص برای رشد تیمی گام برمی‌دارد."],
            ].map(([title, text], i) => (
              <div key={i} className="about-feat" style={{ alignItems: "flex-start" }}>
                <div className="about-feat-icon">✓</div>
                <div className="about-feat-text">
                  <strong style={{ display: "block", marginBottom: "4px" }}>{title}</strong>
                  <span style={{ color: "var(--text-muted)", fontWeight: 400 }}>{text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
  
        {/* FINAL CTA */}
        <div className="container" style={{ padding: "0 1.5rem 5rem", textAlign: "center" }}>
          <p style={{ fontSize: "16px", color: "#555", maxWidth: "620px", margin: "0 auto 1.5rem", lineHeight: 2 }}>
            اگر به‌دنبال آموزشی هستید که کاربردی باشد، و می‌خواهید
            از طریق ساخت پروژه‌های واقعی یاد بگیرید  ساروبیکس جای شماست.
          </p>
          <a href="/courses" className="btn-primary">مشاهده دوره‌ها ←</a>
        </div>
      </div>
    );
  }
  