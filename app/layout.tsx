import type { Metadata } from "next";
import { Playfair_Display, Oswald, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import ConditionalFooter from "@/components/ConditionalFooter";
import { SpeedInsights } from "@vercel/speed-insights/next";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const oswald = Oswald({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yassine Radhouani - Architecture & Art Portfolio",
  description: "Discover the architectural and artistic portfolio of Yassine Radhouani. Architecture, fine art, UNESCO recognized projects, and Aga Khan Award winning collaborations.",
  metadataBase: new URL("https://www.yassineradhouani.me"),
  keywords: "architecture, art, portfolio, Yassine Radhouani, Tunisia, contemporary art, architectural design, UNESCO, Aga Khan Award",
  authors: [{ name: "Yassine Radhouani" }],
  openGraph: {
    title: "Yassine Radhouani - Architecture & Art Portfolio",
    description: "Architecture, fine art, and award-winning projects by Yassine Radhouani",
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
    url: "https://www.yassineradhouani.me",
    siteName: "Yassine Radhouani",
    images: [
      {
        url: "/work/yas2.jpg",
        width: 1200,
        height: 630,
        alt: "Yassine Radhouani Portfolio",
      },
    ],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/logo.png' },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${playfair.variable} ${oswald.variable} ${inter.variable} antialiased bg-[#0a0a0a] text-white font-body` }>
        <LanguageProvider>
          <main>{children}</main>
          <ConditionalFooter />
        </LanguageProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
