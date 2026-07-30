import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Sarobix | آموزش هوش مصنوعی، رباتیک و برنامه‌نویسی",
  description: "با Sarobix مهارت‌های تکنولوژی، هوش مصنوعی و رباتیک رو از صفر تا حرفه‌ای یاد بگیر",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;500;600;700;900&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}