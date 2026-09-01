import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vredezara | Premium Landscape Architecture & Horticulture Design",
  description:
    "Vredezara crafts living masterpieces through premium landscape architecture, biophilic indoor styling, and garden stewardship. Book a private consultation with our design studio.",
  keywords: [
    "landscape architecture",
    "premium horticulture",
    "biophilic design",
    "garden stewardship",
    "sustainable landscaping",
    "luxury garden design",
    "vredezara",
  ],
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Vredezara | Premium Landscape Architecture & Horticulture Design",
    description:
      "Crafting living masterpieces through premium landscape architecture, biophilic indoor styling, and garden stewardship.",
    type: "website",
    locale: "en_US",
    siteName: "Vredezara",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vredezara | Premium Landscape Architecture & Horticulture Design",
    description:
      "Crafting living masterpieces through premium landscape architecture, biophilic indoor styling, and garden stewardship.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full scroll-smooth antialiased`}
    >
      <body className="flex min-h-full flex-col bg-stone-50 font-[family-name:var(--font-inter)] text-emerald-950">
        {children}
      </body>
    </html>
  );
}
