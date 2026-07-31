export default function Home() {
  return (
    <main style={{ background: "#fff", minHeight: "100vh", direction: "rtl", fontFamily: "Vazirmatn, sans-serif", paddingTop: "100px" }}>

      {/* HERO */}
      <section style={{
        minHeight: "calc(100vh - 100px)", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", textAlign: "center",
        padding: "2rem 1.5rem", background: "#fff", position: "relative", overflow: "hidden"
      }}>
        {/* Watermark */}
        <div style={{
          position: "absolute", inset: 0, display: "flex", alignItems: "center",
          justifyContent: "center", pointerEvents: "none", zIndex: 0
        }}>
          <span style={{ fontSize: "clamp(80px,15vw,180px)", fontWeight: 900, color: "rgba(0,0,0,0.04)", letterSpacing: "10px", userSelect: "none" }}>SAROBIX</span>
        </div>

        <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          {/* Logo Text Image */}
          <img src="/sarobix-text.jpg" alt="SAROBIX" style={{ height: "70px", objectFit: "contain", marginBottom: "1.5rem" }} />

          {/* Title */}
          <h1 style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 900, color: "#1A1A2E", marginBottom: "1rem" }}>
            آینده را کُد کن
          </h1>

          {/* Description */}
          <p style={{ fontSize: "16px", color: "#777", maxWidth: "580px", margin: "0 auto 2.5rem", lineHeight: 2 }}>
            با Sarobix مهارت‌های تکنولوژی، هوش مصنوعی و رباتیک رو از صفر تا حرفه‌ای یاد بگیر
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", marginBottom: "3rem", flexWrap: "wrap" }}>
            <a href="/courses" style={{
              padding: "14px 36px", borderRadius: "100px",
              background: "linear-gradient(135deg,#E8632A,#ff7a40)",
              color: "#fff", textDecoration: "none", fontWeight: 700, fontSize: "15px",
              boxShadow: "0 6px 24px rgba(232,99,42,0.35)", fontFamily: "Vazirmatn, sans-serif"
            }}>مشاهده دوره‌ها</a>
            <a href="/contact" style={{
              padding: "14px 36px", borderRadius: "100px",
              border: "2px solid #E8632A", color: "#E8632A",
              textDecoration: "none", fontWeight: 700, fontSize: "15px",
              fontFamily: "Vazirmatn, sans-serif", background: "#fff"
            }}>تماس با ما</a>
          </div>

          {/* Placeholder */}
          <img 
  src="/sara-hero.png" 
  alt="مدرس Sarobix"
  style={{ width: "380px", objectFit: "contain" }}
/>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#F5F5F5", borderTop: "1px solid #eee", borderBottom: "1px solid #eee", padding: "2.5rem 0" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem", display: "flex", justifyContent: "center", flexWrap: "wrap" }}>
          {[["‎+۵۰۰", "دانشجوی فعال"], ["+۸", "دوره تخصصی"], ["+۵", "سال تجربه تدریس"], ["+۹۵٪", "رضایت دانشجویان"]].map(([num, label], i) => (
            <div key={label} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ textAlign: "center", padding: "1rem 2.5rem" }}>
                <div style={{ fontSize: "2.2rem", fontWeight: 900, color: "#E8632A" }}>{num}</div>
                <div style={{ fontSize: "13px", color: "#888" }}>{label}</div>
              </div>
              {i < 3 && <div style={{ width: "1px", height: "48px", background: "#ddd" }} />}
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "5rem 0", background: "#fff" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ display: "inline-block", fontSize: "11px", letterSpacing: "2px", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", padding: "4px 14px", borderRadius: "100px", marginBottom: "1rem" }}>چرا Sarobix؟</span>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, color: "#1A1A2E" }}>آموزش حرفه‌ای با تضمین کیفیت</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.5rem" }}>
            {[
              ["🎓", "مدرک پایان دوره", "پس از اتمام هر دوره گواهی معتبر دریافت کنید."],
              ["🛡️", "پشتیبانی مادام‌العمر", "با خرید هر دوره از پشتیبانی همیشگی بهره‌مند شوید."],
              ["⚡", "کیفیت بالا", "تمامی آموزش‌ها با صوت و تصویر HD عرضه می‌شود."],
              ["🔨", "پروژه‌محور", "آموزش با پروژه شروع و با پروژه‌های واقعی ختم می‌شه."],
            ].map(([icon, title, desc]) => (
              <div key={String(title)} style={{ background: "#F5F5F5", border: "1px solid #eee", borderRadius: "20px", padding: "1.8rem 1.5rem", textAlign: "center" }}>
                <div style={{ fontSize: "2.2rem", marginBottom: "1rem" }}>{icon}</div>
                <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: ".5rem", color: "#1A1A2E" }}>{title}</h3>
                <p style={{ fontSize: "12px", color: "#888", lineHeight: 1.8 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES */}
      <section style={{ padding: "5rem 0", background: "#F5F5F5" }} id="courses">
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span style={{ display: "inline-block", fontSize: "11px", letterSpacing: "2px", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", padding: "4px 14px", borderRadius: "100px", marginBottom: "1rem" }}>دوره‌های آموزشی</span>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, color: "#1A1A2E" }}>دوره‌های آکادمی Sarobix</h2>
            <p style={{ color: "#888", fontSize: "14px" }}>یادگیری عملی با پروژه‌های واقعی</p>
            <a href="/courses" style={{ display: "inline-block", marginTop: "1rem", fontSize: "13px", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", padding: "7px 20px", borderRadius: "100px", textDecoration: "none" }}>مشاهده همه ←</a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1.2rem" }}>
            {[
              { icon: "🧠", title: "هوش مصنوعی مقدماتی", time: "۲۰ ساعت", level: "مبتدی", price: "۶۵۰,۰۰۰", old: "۱,۵۰۰,۰۰۰", badge: "پرطرفدار", hot: true },
              { icon: "🤖", title: "هوش مصنوعی پیشرفته", time: "۴۰ ساعت", level: "متوسط+", price: "۱,۱۰۰,۰۰۰", old: "۲,۵۰۰,۰۰۰", badge: "پیشرفته", hot: false },
              { icon: "📊", title: "یادگیری ماشین", time: "۳۵ ساعت", level: "مبتدی+", price: "۸۵۰,۰۰۰", old: "۲,۰۰۰,۰۰۰", badge: "جدید", hot: false },
              { icon: "🦾", title: "رباتیک و Arduino", time: "۵۵ ساعت", level: "همه سطوح", price: "۹۵۰,۰۰۰", old: "۲,۲۰۰,۰۰۰", badge: "ویژه", hot: true },
            ].map((c) => (
              <div key={c.title} style={{ background: "#fff", border: c.hot ? "1px solid rgba(232,99,42,0.3)" : "1px solid #eee", borderRadius: "20px", overflow: "hidden" }}>
                <div style={{ height: "120px", background: c.hot ? "linear-gradient(135deg,#E8632A,#ff7a40)" : "linear-gradient(135deg,#1a1a4e,#2d1b69)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem", position: "relative" }}>
                  {c.icon}
                  <span style={{ position: "absolute", top: ".6rem", right: ".6rem", background: c.hot ? "#fff" : "rgba(255,255,255,0.2)", color: c.hot ? "#E8632A" : "#fff", fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "100px" }}>{c.badge}</span>
                </div>
                <div style={{ padding: "1.2rem" }}>
                  <h3 style={{ fontSize: "14px", fontWeight: 700, marginBottom: ".4rem", color: "#1A1A2E" }}>{c.title}</h3>
                  <div style={{ display: "flex", gap: ".8rem", fontSize: "11px", color: "#888", marginBottom: ".8rem" }}>
                    <span>⏱ {c.time}</span><span>👤 {c.level}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #eee", paddingTop: ".8rem" }}>
                    <div>
                      <div style={{ fontSize: "11px", color: "#aaa", textDecoration: "line-through" }}>{c.old}</div>
                      <div style={{ fontSize: "15px", fontWeight: 900, color: "#E8632A" }}>{c.price} ت</div>
                    </div>
                    <a href="/courses" style={{ fontSize: "11px", fontWeight: 700, padding: "6px 14px", borderRadius: "100px", background: "rgba(232,99,42,0.1)", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", textDecoration: "none" }}>مشاهده ←</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ padding: "6rem 0", background: "#fff" }} id="about">
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 1.5rem", display: "grid", gridTemplateColumns: "1fr 1.3fr", gap: "5rem", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <img src="/logo-main.png" alt="سارا گمراوی" style={{ width: "220px", objectFit: "contain" }} />
          </div>
          <div>
            <span style={{ display: "inline-block", fontSize: "11px", letterSpacing: "2px", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", padding: "4px 14px", borderRadius: "100px", marginBottom: "1rem" }}>درباره مدرس</span>
            <h2 style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 900, lineHeight: 1.3, marginBottom: "1rem", color: "#1A1A2E" }}>
              یاد بگیر از کسی که<br /><span style={{ color: "#E8632A" }}>راه رو رفته</span>
            </h2>
            <p style={{ fontSize: "15px", color: "#666", marginBottom: "1.5rem", lineHeight: 2 }}>
               مهندس ارشد نرم‌افزار و مدرس دوره‌های برنامه‌نویسی، هوش مصنوعی و رباتیک <div className=""></div>
            </p>
            {[["🎯", "تدریس عملی با پروژه‌های واقعی"], ["💬", "پشتیبانی مستقیم از دانشجویان"], ["🔄", "آپدیت مداوم محتوای دوره‌ها"]].map(([icon, text]) => (
              <div key={String(text)} style={{ display: "flex", alignItems: "center", gap: "1rem", padding: ".8rem 1rem", background: "#F5F5F5", borderRadius: "12px", border: "1px solid #eee", marginBottom: ".8rem" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "rgba(232,99,42,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", flexShrink: 0 }}>{icon}</div>
                <span style={{ fontSize: "14px", fontWeight: 500, color: "#1A1A2E" }}>{text}</span>
              </div>
            ))}
            <a href="/courses" style={{ display: "inline-block", marginTop: "1rem", fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "15px", padding: "14px 36px", borderRadius: "100px", background: "linear-gradient(135deg,#E8632A,#ff7a40)", color: "#fff", textDecoration: "none" }}>مشاهده دوره‌ها</a>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section style={{ padding: "4rem 0", background: "#F5F5F5" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", padding: "0 1.5rem", textAlign: "center" }}>
          <span style={{ display: "inline-block", fontSize: "11px", letterSpacing: "2px", color: "#E8632A", border: "1px solid rgba(232,99,42,0.3)", padding: "4px 14px", borderRadius: "100px", marginBottom: "1rem" }}>خبرنامه</span>
          <h2 style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 900, marginBottom: ".8rem", color: "#1A1A2E" }}>از تخفیف‌ها باخبر بمان</h2>
          <p style={{ color: "#888", fontSize: "14px", marginBottom: "2rem" }}>ایمیل یا شماره‌ات رو بذار تا اول از همه باخبر بشی</p>
          <div style={{ display: "flex", gap: "1rem", maxWidth: "480px", margin: "0 auto" }}>
            <input type="text" placeholder="ایمیل یا شماره موبایل..." style={{ flex: 1, background: "#fff", border: "1px solid #ddd", borderRadius: "100px", padding: "13px 20px", fontFamily: "Vazirmatn, sans-serif", fontSize: "14px", outline: "none", direction: "rtl" }} />
            <button style={{ fontFamily: "Vazirmatn, sans-serif", fontWeight: 700, fontSize: "14px", padding: "13px 24px", borderRadius: "100px", background: "linear-gradient(135deg,#E8632A,#ff7a40)", color: "#fff", border: "none", cursor: "pointer", flexShrink: 0 }}>عضویت ←</button>
          </div>
        </div>
      </section>

    </main>
  );
}
