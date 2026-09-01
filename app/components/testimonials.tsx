"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  project: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Vredezara read our slope and our soil before they ever sketched a plan. Three years on, the garden looks more settled every spring, not more tired.",
    name: "Marisol Ferreira",
    role: "Homeowner",
    project: "Hollow Creek Residence",
  },
  {
    id: "t2",
    quote:
      "They treated our lobby planting as architecture, not decoration. Visitors comment on it before they comment on the building.",
    name: "Daniel Okoye",
    role: "Facilities Director",
    project: "Anders & Vale HQ Atrium",
  },
  {
    id: "t3",
    quote:
      "The stewardship team knows our courtyard better than we do at this point. Nothing gets missed between seasons.",
    name: "Priya Chandrasekhar",
    role: "Property Manager",
    project: "Marlowe Terrace Courtyard",
  },
  {
    id: "t4",
    quote:
      "Our loft had two dead corners for years. Vredezara turned one into the first thing every guest photographs.",
    name: "Sam Whitfield",
    role: "Homeowner",
    project: "Callow Loft Plant Wall",
  },
  {
    id: "t5",
    quote:
      "Guests now ask to walk the grounds before they ask about the rooms. That's a first for us in twelve years of operating this property.",
    name: "Helena Roost",
    role: "General Manager",
    project: "Birchgate Hotel Grounds",
  },
  {
    id: "t6",
    quote:
      "What sold us was how little they asked us to compromise on maintenance. The plan was ambitious and still practical to keep up.",
    name: "Owen Castellanos",
    role: "Studio Founder",
    project: "Sable & Fern Studio",
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const total = TESTIMONIALS.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Infinite 8s auto-scroll timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 8000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  // Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 40;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Helper for circular modulo index wrapping
  const getVisibleIndices = () => {
    const prev = (currentIndex - 1 + total) % total;
    const next = (currentIndex + 1) % total;
    return { prev, current: currentIndex, next };
  };

  const { prev, current, next } = getVisibleIndices();

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="w-full overflow-hidden bg-stone-50 px-4 py-20 md:px-8 md:py-28 lg:px-16"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl text-center md:text-left">
          <h2
            id="testimonials-heading"
            className="font-[family-name:var(--font-fraunces)] text-2xl text-emerald-950 md:text-4xl"
          >
            From the gardens we've kept
          </h2>
          <p className="mt-4 text-emerald-950/70 md:text-lg">
            A few words from the people who live with, work in, and manage the spaces we've designed.
          </p>
        </div>

        {/* Carousel Container */}
        <div
          className="relative mt-12 flex items-center justify-center min-h-[420px] md:min-h-[380px] touch-pan-y select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Previous Slide (Faded Left) */}
          <div
            onClick={prevSlide}
            className="absolute left-0 z-0 hidden w-[30%] -translate-x-12 scale-90 opacity-40 transition-all duration-700 hover:cursor-pointer md:block lg:w-[35%] lg:-translate-x-16"
          >
            <TestimonialCard testimonial={TESTIMONIALS[prev]} isActive={false} />
          </div>

          {/* Active Slide (Center with 8s Zoom-Out Animation) */}
          <div className="z-10 w-full max-w-md md:max-w-lg lg:max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={TESTIMONIALS[current].id}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: {
                    opacity: { duration: 0.5 },
                    scale: { duration: 8, ease: "linear" }, // Continuous slow 8s zoom-out
                  },
                }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.4 } }}
              >
                <TestimonialCard testimonial={TESTIMONIALS[current]} isActive={true} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next Slide (Faded Right) */}
          <div
            onClick={nextSlide}
            className="absolute right-0 z-0 hidden w-[30%] translate-x-12 scale-90 opacity-40 transition-all duration-700 hover:cursor-pointer md:block lg:w-[35%] lg:translate-x-16"
          >
            <TestimonialCard testimonial={TESTIMONIALS[next]} isActive={false} />
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={prevSlide}
            aria-label="Previous testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-950/20 text-emerald-950 transition-colors hover:bg-emerald-950 hover:text-white"
          >
            <FaChevronLeft className="h-3.5 w-3.5" />
          </button>

          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex ? "w-8 bg-emerald-900" : "w-2 bg-emerald-950/20"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next testimonial"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-950/20 text-emerald-950 transition-colors hover:bg-emerald-950 hover:text-white"
          >
            <FaChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  isActive,
}: {
  testimonial: Testimonial;
  isActive: boolean;
}) {
  return (
    <div
      className={`flex flex-col justify-between rounded-2xl border border-emerald-950/10 bg-white p-6 transition-shadow duration-300 sm:p-8 ${
        isActive ? "shadow-xl ring-1 ring-emerald-950/5" : "shadow-sm"
      }`}
    >
      <div>
        <div className="flex gap-0.5" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, starIndex) => (
            <FaStar key={starIndex} className="h-3.5 w-3.5 text-emerald-700" />
          ))}
        </div>

        <p className="mt-4 font-[family-name:var(--font-fraunces)] text-base italic leading-relaxed text-emerald-950 sm:text-lg lg:text-xl">
          &ldquo;{testimonial.quote}&rdquo;
        </p>
      </div>

      <div className="mt-6 border-t border-emerald-950/10 pt-4">
        <p className="text-sm font-semibold text-emerald-950">{testimonial.name}</p>
        <p className="mt-0.5 text-xs text-emerald-950/60">
          {testimonial.role}, {testimonial.project}
        </p>
      </div>
    </div>
  );
}
