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

const SITE_URL = "https://www.landfairy.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Landfairy Global Investment Ltd | Landscape Architecture & Horticulture, Lagos, Nigeria",
    template: "%s | Landfairy Global Investment Ltd",
  },
  description:
    "Landfairy Global Investment Ltd (RC 8189342) designs, installs and maintains landscapes for corporate, residential, institutional and government clients across Nigeria — planning, softscape and hardscape installation, irrigation design and long-term property maintenance.",
  keywords: [
    "landscape architecture Nigeria",
    "landscaping company Lagos",
    "horticulture Nigeria",
    "garden maintenance Lagos",
    "irrigation system design Nigeria",
    "softscape and hardscape installation",
    "corporate property maintenance Nigeria",
    "estate landscaping Ajah",
    "landscaping company Ibadan",
    "Landfairy Global Investment",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    shortcut: "/favicon-32.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title:
      "Landfairy Global Investment Ltd | Landscape Architecture & Horticulture, Lagos, Nigeria",
    description:
      "Design, installation and maintenance of landscapes for corporate, residential, institutional and government clients across Nigeria.",
    url: SITE_URL,
    type: "website",
    locale: "en_NG",
    siteName: "Landfairy Global Investment Ltd",
    images: [
      {
        url: "/images/hero/hero-background.jpg",
        width: 1062,
        height: 598,
        alt: "Landscaped garden border by Landfairy Global Investment Ltd",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Landfairy Global Investment Ltd | Landscape Architecture & Horticulture, Lagos, Nigeria",
    description:
      "Design, installation and maintenance of landscapes for corporate, residential, institutional and government clients across Nigeria.",
    images: ["/images/hero/hero-background.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

// ---------------------------------------------------------------------------
// Structured data (JSON-LD) — helps Google render a rich result for local
// business searches (address, phone, services). Update sameAs with the
// client's real social profile URLs once available.
// ---------------------------------------------------------------------------
const jsonLd = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
  name: "Landfairy Global Investment Ltd",
  alternateName: "Landfairy",
  description:
    "Landscape architecture, horticulture and property maintenance company based in Lagos, Nigeria, serving corporate, residential, institutional and government clients nationwide.",
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  image: `${SITE_URL}/images/hero/hero-background.jpg`,
  telephone: "+2348160412420",
  email: "landfairyproperties@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1, Nurudeen Dali Street, Ogombo",
    addressLocality: "Ajah",
    addressRegion: "Lagos State",
    addressCountry: "NG",
  },
  areaServed: "NG",
  priceRange: "$$",
  makesOffer: [
    "Planning and Design of Horticulture for Landscaping",
    "Corporate and Residential Property Maintenance",
    "Installation of Soft and Hard Scapes",
    "Irrigation System Design",
    "Property Development and Handover",
  ].map((name) => ({
    "@type": "Offer",
    itemOffered: { "@type": "Service", name },
  })),
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
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col bg-stone-50 font-[family-name:var(--font-inter)] text-emerald-950">
        {children}
      </body>
    </html>
  );
}
