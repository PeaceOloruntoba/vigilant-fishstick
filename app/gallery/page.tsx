import type { Metadata } from "next";
import Navigation from "../components/navigation";
import Footer from "../components/footer";
import GalleryGrid from "./gallery-grid";

export const metadata: Metadata = {
  title: "Project Gallery",
  description:
    "Browse photos from Landfairy Global Investment Ltd's landscaping, horticulture and property maintenance projects across Nigeria.",
  alternates: {
    canonical: "/gallery",
  },
};

export default function GalleryPage() {
  return (
    <main className="min-h-screen w-full">
      <Navigation />
      <section className="w-full bg-stone-50 px-4 py-20 md:px-8 md:py-28 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h1 className="font-[family-name:var(--font-fraunces)] text-2xl text-emerald-950 md:text-4xl">
              Project gallery
            </h1>
            <p className="mt-4 text-emerald-950/70 md:text-lg">
              A closer look at the sites we've designed, installed and now
              maintain across Nigeria.
            </p>
          </div>

          <div className="mt-12">
            <GalleryGrid />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
