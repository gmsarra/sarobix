export type Course = {
    id: number;
    slug: string;
    title: string;
    desc: string;
    time: string;
    level: string;
    price: string;
    oldPrice: string;
    badge: string;
    badgeClass: string;
    thumb: string;
    icon: string;
  };
  
  export const courses: Course[] = [
    { id: 1, slug: "ai-basics", title: "هوش مصنوعی مقدماتی", desc: "مفاهیم پایه AI، کاربردها و آشنایی با ابزارها", time: "۲۰ ساعت", level: "مبتدی", price: "۶۵۰,۰۰۰", oldPrice: "۱,۵۰۰,۰۰۰", badge: "پرطرفدار", badgeClass: "badge-hot", thumb: "ai-basic", icon: "🧠" },
    { id: 2, slug: "ai-advanced", title: "هوش مصنوعی پیشرفته", desc: "معماری‌های پیشرفته AI و پیاده‌سازی پروژه‌های واقعی", time: "۴۰ ساعت", level: "متوسط+", price: "۱,۱۰۰,۰۰۰", oldPrice: "۲,۵۰۰,۰۰۰", badge: "پیشرفته", badgeClass: "badge-new", thumb: "ai-adv", icon: "🤖" },
    { id: 3, slug: "machine-learning", title: "یادگیری ماشین", desc: "الگوریتم‌های ML، رگرسیون، طبقه‌بندی با Python و Sklearn", time: "۳۵ ساعت", level: "مبتدی+", price: "۸۵۰,۰۰۰", oldPrice: "۲,۰۰۰,۰۰۰", badge: "جدید", badgeClass: "badge-new", thumb: "ml", icon: "📊" },
    { id: 4, slug: "deep-learning", title: "یادگیری عمیق", desc: "شبکه‌های عصبی، CNN، RNN و پیاده‌سازی با TensorFlow", time: "۴۵ ساعت", level: "پیشرفته", price: "۱,۳۵۰,۰۰۰", oldPrice: "۳,۰۰۰,۰۰۰", badge: "به‌زودی", badgeClass: "badge-soon", thumb: "dl", icon: "🔬" },
    { id: 5, slug: "robotics-arduino", title: "رباتیک و Arduino", desc: "ساخت ربات از صفر با برنامه‌نویسی و سخت‌افزار واقعی", time: "۵۵ ساعت", level: "همه سطوح", price: "۹۵۰,۰۰۰", oldPrice: "۲,۲۰۰,۰۰۰", badge: "ویژه", badgeClass: "badge-hot", thumb: "robot", icon: "🦾" },
    { id: 6, slug: "robotics-advanced", title: "رباتیک پیشرفته ROBO", desc: "سیستم‌های رباتیک هوشمند، سنسورها و کنترل حرکت", time: "۶۰ ساعت", level: "متوسط+", price: "۱,۵۰۰,۰۰۰", oldPrice: "۳,۵۰۰,۰۰۰", badge: "ROBO", badgeClass: "badge-new", thumb: "robo-c", icon: "🤖" },
    { id: 7, slug: "prompt-engineering-basics", title: "پرامپت‌نویسی مقدماتی", desc: "اصول پرامپت‌نویسی برای ChatGPT، Claude و Gemini", time: "۱۵ ساعت", level: "مبتدی", price: "۳۵۰,۰۰۰", oldPrice: "۸۰۰,۰۰۰", badge: "جدید", badgeClass: "badge-new", thumb: "prompt-b", icon: "✍️" },
    { id: 8, slug: "prompt-engineering-advanced", title: "پرامپت‌نویسی جامع", desc: "تکنیک‌های پیشرفته، Chain of Thought و Fine-tuning", time: "۳۰ ساعت", level: "متوسط+", price: "۷۵۰,۰۰۰", oldPrice: "۱,۸۰۰,۰۰۰", badge: "به‌زودی", badgeClass: "badge-soon", thumb: "prompt-a", icon: "🎯" },
  ];
  
  export function getCourseBySlug(slug: string): Course | undefined {
    return courses.find((c) => c.slug === slug);
  }
  