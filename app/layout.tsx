import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Global Earn | Professional Crypto & Stock Trading Platform",
  description:
    "Trade cryptocurrencies, stocks, forex, and commodities with Global Earn. Secure, regulated platform with daily profits up to 8%. Join 50,000+ traders worldwide.",
  keywords: [
    "crypto trading",
    "stock trading",
    "forex",
    "investment",
    "cryptocurrency",
    "bitcoin",
    "ethereum",
    "trading platform",
  ],
  authors: [{ name: "Global Earn" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://globalearn.com",
    siteName: "Global Earn",
    title: "Global Earn | Professional Crypto & Stock Trading Platform",
    description:
      "Trade cryptocurrencies, stocks, forex, and commodities with Global Earn. Secure, regulated platform with daily profits up to 8%.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Earn | Professional Crypto & Stock Trading Platform",
    description:
      "Trade cryptocurrencies, stocks, forex, and commodities with Global Earn.",
  },
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
  },
};

export const viewport = {
  themeColor: "#0a0f1a",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark bg-background">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-background`}
      >
        <Providers>{children}</Providers>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
