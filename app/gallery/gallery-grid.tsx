"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { GALLERY_IMAGES, type GalleryImage } from "../data/gallery-images";

export default function GalleryGrid() {
  const categories = useMemo(() => {
    const categorySet = new Set<string>();
    GALLERY_IMAGES.forEach((img) => img.category && categorySet.add(img.category));
    return ["All", ...Array.from(categorySet)];
  }, []);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      activeCategory === "All"
        ? GALLERY_IMAGES
        : GALLERY_IMAGES.filter((img) => img.category === activeCategory),
    [activeCategory]
  );
  const originalImages = filtered.filter((img) => !img.phase);
  const comparisonImages = GALLERY_IMAGES.filter((img) => img.phase);
  const lightboxImages = [...originalImages, ...comparisonImages];

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const showNext = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i + 1) % lightboxImages.length
    );
  const showPrev = () =>
    setLightboxIndex((i) =>
      i === null ? null : (i - 1 + lightboxImages.length) % lightboxImages.length
    );

  const active: GalleryImage | null =
    lightboxIndex !== null ? lightboxImages[lightboxIndex] : null;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isActive = category === activeCategory;
          return (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setLightboxIndex(null);
              }}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-emerald-700 text-stone-50"
                  : "text-emerald-950/70 hover:text-emerald-950"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <h2 className="font-[family-name:var(--font-fraunces)] text-2xl text-emerald-950">
          All works
        </h2>
        <div className="mt-5 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {originalImages.map((img) => {
            const index = lightboxImages.indexOf(img);
            return (
              <button
                key={img.id}
                type="button"
                onClick={() => openLightbox(index)}
                className="group mb-4 block w-full overflow-hidden rounded-md bg-stone-100"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-16 space-y-14">
        {(["Before", "After"] as const).map((phase) => {
          const images = comparisonImages.filter((img) => img.phase === phase);
          return (
            <section key={phase} aria-labelledby={`${phase.toLowerCase()}-heading`}>
              <h2
                id={`${phase.toLowerCase()}-heading`
                }
                className="font-[family-name:var(--font-fraunces)] text-2xl text-emerald-950"
              >
                National Theatre: {phase}
              </h2>
              <div className="mt-5 columns-1 gap-4 sm:columns-2 lg:columns-3">
                {images.map((img) => {
                  const index = lightboxImages.indexOf(img);
                  return (
                    <button
                      key={img.id}
                      type="button"
                      onClick={() => openLightbox(index)}
                      className="group mb-4 block w-full overflow-hidden rounded-md bg-stone-100"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        width={800}
                        height={600}
                        className="w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {/* Theater-style lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label={active.alt}
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <FiX size={20} />
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
            >
              <FiChevronLeft size={22} />
            </button>

            <motion.div
              key={active.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="relative max-h-[85vh] w-full max-w-4xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={active.src}
                alt={active.alt}
                width={1400}
                height={1050}
                className="max-h-[85vh] w-full rounded-md object-contain"
              />
              <p className="mt-3 text-center text-sm text-stone-200">
                {active.alt}
              </p>
            </motion.div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
            >
              <FiChevronRight size={22} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
