import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono, Kanit } from "next/font/google";
import ThemeProvider from "@/components/ThemeProvider";
import AppShell from "@/components/AppShell";
import LanguageProvider from "@/components/LanguageProvider";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// ฟอนต์สำหรับตัวอักษรไทยเท่านั้น (โหลดแค่ subset "thai" จึงไม่มี glyph อังกฤษ
// ตัวอังกฤษจะยังใช้ Inter / Fraunces / JetBrains Mono ตามเดิม)
const kanit = Kanit({
  subsets: ["thai"],
  variable: "--font-kanit",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Prajak Udomsup",
  description: "Portfolio of iikqsan, a product designer.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} ${kanit.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-paper font-body text-ink antialiased">
        <ThemeProvider>
          <LanguageProvider>
            <AppShell>
              {children}
            </AppShell>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}