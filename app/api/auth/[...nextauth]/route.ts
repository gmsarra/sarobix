import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email or Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) return null;

        const raw = credentials.identifier.trim();
        // چه ایمیل بزنه چه شماره، هر دو ستون رو چک می‌کنیم — چون کاربر می‌تونه با هرکدوم ثبت‌نام کرده باشه
        const { data: user } = await supabase
          .from("users")
          .select("*")
          .or(`email.eq.${raw.toLowerCase()},phone.eq.${raw}`)
          .single();

        if (!user || !user.password_hash) return null; // کاربری نیست، یا فقط با گوگل ثبت‌نام کرده

        const isValid = await bcrypt.compare(credentials.password, user.password_hash);
        if (!isValid) return null;

        return { id: user.id, name: user.name, email: user.email, image: user.avatar_url || null };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    // وقتی کاربر با گوگل وارد می‌شه، اگه توی جدول users نبود، خودکار اضافه‌ش کن
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const { data: existing } = await supabase
          .from("users")
          .select("id")
          .eq("email", user.email!.toLowerCase().trim())
          .single();

        if (!existing) {
          await supabase.from("users").insert({
            name: user.name,
            email: user.email!.toLowerCase().trim(),
            avatar_url: user.image || null,
            password_hash: null, // این کاربر فقط با گوگل وارد می‌شه، رمز نداره
            provider: "google",
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { id?: string }).id = token.id as string;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
