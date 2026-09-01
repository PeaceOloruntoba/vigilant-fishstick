import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";

import Navigation from "./components/navigation";
import Hero from "./components/hero";
import Services from "./components/services";
import Editorial from "./components/editorial";
import ProjectShowcase from "./components/project_showcase";
import Contact from "./components/contact";
import Footer from "./components/footer";
import Testimonials from "./components/testimonials";

// ---------------------------------------------------------------------------
// Fonts — loaded as CSS variables so both Server and Client Components in
// this tree can reference them without re-fetching or layout shift.
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// SEO — static metadata for crawlers. Kept in the Server Component so it
// ships in the initial HTML response with no client hydration required.
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Page — Server Component. All interactivity is isolated inside the
// individual section components via "use client"; this shell stays static.
// ---------------------------------------------------------------------------
export default function Home() {
  return (
    <main
      className={`${fraunces.variable} ${inter.variable} min-h-screen w-full bg-stone-50 text-emerald-950 font-[family-name:var(--font-inter)] antialiased`}
    >
      <Navigation />
      <Hero />
      <Services />
      <Editorial />
      <ProjectShowcase />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}