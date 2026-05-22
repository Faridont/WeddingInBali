import type { Metadata } from "next";
import { Noto_Sans, Russo_One } from "next/font/google";
import { BackgroundMusic } from "@/components/BackgroundMusic";
import { SakuraPreloader } from "@/components/SakuraPreloader";
import { NinjaCoupleHero } from "@/components/ui/naruto/NinjaCoupleHero";
import { weddingConfig } from "@/lib/wedding-config";
import "./globals.css";

const display = Russo_One({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: "400",
  display: "swap",
});

const sans = Noto_Sans({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const title = `Wedding in Bali — ${weddingConfig.brideName} & ${weddingConfig.groomName}`;

export const metadata: Metadata = {
  title,
  description: "Приглашение на свадьбу на Бали",
  openGraph: {
    title,
    description: "Приглашение на свадьбу на Бали",
    locale: "ru_RU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SakuraPreloader />
        <BackgroundMusic />
        {children}
        <NinjaCoupleHero />
      </body>
    </html>
  );
}
