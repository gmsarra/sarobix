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
  format: "آنلاین" | "حضوری";
};

// TODO سارا: قیمت، مدت‌زمان، سطح و توضیحات هر دوره رو با اطلاعات واقعی جایگزین کن
export const courses: Course[] = [
  { id: 1, slug: "ai-basics", title: "هوش مصنوعی مقدماتی", desc: "مفاهیم پایه AI، کاربردها و آشنایی با ابزارها", time: "۲۰ ساعت", level: "مبتدی", price: "۶۵۰,۰۰۰", oldPrice: "۱,۵۰۰,۰۰۰", badge: "پرطرفدار", badgeClass: "badge-hot", thumb: "ai-basic", icon: "🧠", format: "آنلاین" },
  { id: 2, slug: "ai-comprehensive", title: "هوش مصنوعی جامع", desc: "دوره‌ی کامل هوش مصنوعی از مبانی تا پیاده‌سازی پروژه‌های واقعی", time: "۴۰ ساعت", level: "متوسط+", price: "۱,۱۰۰,۰۰۰", oldPrice: "۲,۵۰۰,۰۰۰", badge: "جامع", badgeClass: "badge-new", thumb: "ai-adv", icon: "🤖", format: "آنلاین" },
  { id: 3, slug: "prompt-engineering-basics", title: "پرامپت‌نویسی مقدماتی", desc: "اصول پرامپت‌نویسی برای ChatGPT، Claude و Gemini", time: "۱۵ ساعت", level: "مبتدی", price: "۳۵۰,۰۰۰", oldPrice: "۸۰۰,۰۰۰", badge: "جدید", badgeClass: "badge-new", thumb: "prompt-b", icon: "✍️", format: "آنلاین" },
  { id: 4, slug: "prompt-engineering-advanced", title: "پرامپت‌نویسی پیشرفته", desc: "تکنیک‌های پیشرفته، Chain of Thought و کاربردهای حرفه‌ای", time: "۳۰ ساعت", level: "متوسط+", price: "۷۵۰,۰۰۰", oldPrice: "۱,۸۰۰,۰۰۰", badge: "پیشرفته", badgeClass: "badge-soon", thumb: "prompt-a", icon: "🎯", format: "آنلاین" },
  { id: 5, slug: "machine-learning", title: "یادگیری ماشین", desc: "الگوریتم‌های ML، رگرسیون، طبقه‌بندی با Python و Sklearn", time: "۳۵ ساعت", level: "مبتدی+", price: "۸۵۰,۰۰۰", oldPrice: "۲,۰۰۰,۰۰۰", badge: "جدید", badgeClass: "badge-new", thumb: "ml", icon: "📊", format: "آنلاین" },
  { id: 6, slug: "deep-learning", title: "یادگیری عمیق", desc: "شبکه‌های عصبی، CNN، RNN و پیاده‌سازی با TensorFlow", time: "۴۵ ساعت", level: "پیشرفته", price: "۱,۳۵۰,۰۰۰", oldPrice: "۳,۰۰۰,۰۰۰", badge: "پیشرفته", badgeClass: "badge-soon", thumb: "dl", icon: "🔬", format: "آنلاین" },
  { id: 7, slug: "icdl", title: "ICDL", desc: "مهارت‌های پایه‌ی کامپیوتر مطابق استاندارد بین‌المللی ICDL", time: "۴۰ ساعت", level: "مبتدی", price: "۹۰۰,۰۰۰", oldPrice: "۲,۰۰۰,۰۰۰", badge: "حضوری", badgeClass: "badge-hot", thumb: "icdl", icon: "💻", format: "حضوری" },
  { id: 8, slug: "content-production", title: "تولید محتوا", desc: "اصول تولید محتوای جذاب برای شبکه‌های اجتماعی و وب‌سایت", time: "۲۵ ساعت", level: "مبتدی+", price: "۶۰۰,۰۰۰", oldPrice: "۱,۴۰۰,۰۰۰", badge: "جدید", badgeClass: "badge-new", thumb: "content", icon: "📝", format: "آنلاین" },
  { id: 9, slug: "capcut", title: "آموزش کپ‌کات", desc: "ویرایش حرفه‌ای ویدیو با اپلیکیشن CapCut", time: "۱۰ ساعت", level: "مبتدی", price: "۳۰۰,۰۰۰", oldPrice: "۷۰۰,۰۰۰", badge: "جدید", badgeClass: "badge-new", thumb: "capcut", icon: "🎬", format: "آنلاین" },
  { id: 10, slug: "robotics", title: "رباتیک", desc: "ساخت ربات از صفر با برنامه‌نویسی و سخت‌افزار واقعی", time: "۵۵ ساعت", level: "همه سطوح", price: "۹۵۰,۰۰۰", oldPrice: "۲,۲۰۰,۰۰۰", badge: "حضوری", badgeClass: "badge-hot", thumb: "robot", icon: "🦾", format: "حضوری" },
  { id: 11, slug: "web-design", title: "طراحی سایت", desc: "طراحی و ساخت وب‌سایت از صفر با HTML، CSS و جاوااسکریپت", time: "۴۰ ساعت", level: "مبتدی+", price: "۸۰۰,۰۰۰", oldPrice: "۱,۸۰۰,۰۰۰", badge: "جدید", badgeClass: "badge-new", thumb: "webdesign", icon: "🌐", format: "آنلاین" },
  { id: 12, slug: "wordpress", title: "آموزش وردپرس", desc: "ساخت وب‌سایت حرفه‌ای با وردپرس بدون نیاز به کدنویسی", time: "۲۰ ساعت", level: "مبتدی", price: "۵۵۰,۰۰۰", oldPrice: "۱,۲۰۰,۰۰۰", badge: "جدید", badgeClass: "badge-new", thumb: "wordpress", icon: "📰", format: "آنلاین" },
  { id: 13, slug: "seo", title: "آموزش جامع سئو", desc: "بهینه‌سازی وب‌سایت برای موتورهای جستجو و افزایش رتبه در گوگل", time: "۳۰ ساعت", level: "متوسط", price: "۷۰۰,۰۰۰", oldPrice: "۱,۶۰۰,۰۰۰", badge: "جامع", badgeClass: "badge-new", thumb: "seo", icon: "📈", format: "آنلاین" },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}
