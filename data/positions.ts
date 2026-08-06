export type Position = {
    slug: string;
    title: string;
    summary: string;
    requirements: string[];
    courses?: { title: string; note: string }[]; // برای موقعیت‌هایی مثل ضبط ویدیو، لیست دوره‌های مدنظر
  };
  
  // TODO سارا: برای اضافه کردن موقعیت جدید، فقط یه آبجکت مثل این پایین به آرایه اضافه کن
  export const positions: Position[] = [
    {
      slug: "video-instructor",
      title: "همکار ضبط ویدیوی دوره‌ها",
      summary:
        "به‌دنبال همکاری هستیم که کنار ما، ویدیوهای آموزشی دوره‌های ساروبیکس رو ضبط و ارائه کنه. این فرصت برای کسی مناسبه که هم به آموزش علاقه داره، هم می‌تونه محتوا رو واضح و جذاب جلوی دوربین توضیح بده.",
      requirements: [
        "توانایی توضیح مفاهیم فنی به زبان ساده و قابل‌فهم",
        "تجربه یا علاقه به ضبط محتوای آموزشی (لازم نیست حرفه‌ای باشه، آموزش می‌دیم)",
        "آشنایی حداقلی با یکی از حوزه‌های برنامه‌نویسی، هوش مصنوعی یا رباتیک",
        "تعهد به تحویل به‌موقع ویدیوها طبق برنامه‌ی هر دوره",
      ],
      // TODO سارا: عنوان و توضیح هر دوره رو دستی خودت کامل/ویرایش کن
      courses: [
        { title: "هوش مصنوعی مقدماتی", note: "" },
        { title: "هوش مصنوعی پیشرفته", note: "" },
        { title: "یادگیری ماشین", note: "" },
        { title: "یادگیری عمیق", note: "" },
        { title: "رباتیک ", note: "" },
        { title: "icdl", note: "" },
        { title: "طراحی سایت", note: "" },
        { title: "طراحی سایت با وردپرس", note: "" },

      ],
    },
  ];
  
  export function getPositionBySlug(slug: string): Position | undefined {
    return positions.find((p) => p.slug === slug);
  }
  