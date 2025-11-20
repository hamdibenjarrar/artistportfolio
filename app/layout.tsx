import type { Metadata } from "next";
import { Playfair_Display, Oswald, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/i18n/LanguageProvider";
import ConditionalFooter from "@/components/ConditionalFooter";

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
  metadataBase: new URL("https://yassine-radhouani.com"),
  keywords: "architecture, art, portfolio, Yassine Radhouani, Tunisia, contemporary art, architectural design, UNESCO, Aga Khan Award",
  authors: [{ name: "Yassine Radhouani" }],
  openGraph: {
    title: "Yassine Radhouani - Architecture & Art Portfolio",
    description: "Architecture, fine art, and award-winning projects by Yassine Radhouani",
    type: "website",
    locale: "fr_FR",
    alternateLocale: "en_US",
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logo.png" type="image/png" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${playfair.variable} ${oswald.variable} ${inter.variable} antialiased bg-[#0a0a0a] text-white font-body` }>
        <LanguageProvider>
          <main>{children}</main>
          <ConditionalFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
