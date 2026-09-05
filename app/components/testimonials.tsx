"use client";

import { useCallback, useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
  type Variants,
} from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiUser } from "react-icons/fi";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;
const SWIPE_THRESHOLD = 60;
const AUTOPLAY_INTERVAL_MS = 6500;

type Reference = {
  id: string;
  name: string;
  orgOrPosition: string;
  relationship: string;
};

// Sourced from the company profile's reference list. Phone numbers are kept
// off the public site by design — share them with prospective clients
// directly during the proposal process instead.
const REFERENCES: Reference[] = [
  {
    id: "r1",
    name: "Mrs Olalekan Oyindamola",
    orgOrPosition: "F & F Luxe Interior Homes",
    relationship: "Client",
  },
  {
    id: "r2",
    name: "Mrs Adesanya",
    orgOrPosition: "Pastor, RCCG",
    relationship: "Client",
  },
  {
    id: "r3",
    name: "Mrs Sadiku",
    orgOrPosition: "Afolake and Sons Agro Ltd",
    relationship: "Client, Mayfair Gardens Estate",
  },
];

const TOTAL = REFERENCES.length;

export default function Testimonials() {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const paginate = useCallback((step: number) => {
    setSlide(([current]) => [(current + step + TOTAL) % TOTAL, step]);
  }, []);

  const goTo = useCallback((target: number) => {
    setSlide(([current]) => [target, target > current ? 1 : -1]);
  }, []);

  useEffect(() => {
    if (isPaused || prefersReducedMotion || TOTAL <= 1) return;
    const timer = setInterval(() => paginate(1), AUTOPLAY_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion, paginate]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1);
    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1);
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir > 0 ? 48 : -48,
    }),
    center: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.45, ease: EASE_OUT },
    },
    exit: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir > 0 ? -48 : 48,
      transition: { duration: 0.3, ease: EASE_OUT },
    }),
  };

  const active = REFERENCES[index];

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="w-full bg-stone-50 px-4 py-20 md:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2
            id="testimonials-heading"
            className="font-[family-name:var(--font-fraunces)] text-2xl text-emerald-950 md:text-4xl"
          >
            Trusted by estates, homes and institutions
          </h2>
          <p className="mt-4 text-emerald-950/70 md:text-lg">
            A few of the clients who can speak to our work firsthand. Full
            contact details are shared with prospective clients on request
            during the proposal process.
          </p>
        </div>

        <div
          className="relative mx-auto mt-14 max-w-xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous reference"
            className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-[130%] -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/15 bg-white text-emerald-950 shadow-sm transition-colors hover:bg-emerald-50 md:flex"
          >
            <FiChevronLeft size={20} />
          </button>
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Next reference"
            className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 translate-x-[130%] items-center justify-center rounded-full border border-emerald-950/15 bg-white text-emerald-950 shadow-sm transition-colors hover:bg-emerald-50 md:flex"
          >
            <FiChevronRight size={20} />
          </button>

          <div
            className="overflow-hidden"
            role="region"
            aria-roledescription="carousel"
            aria-label="Client references"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.article
                key={active.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                onDragEnd={handleDragEnd}
                aria-live="polite"
                className="cursor-grab rounded-2xl border border-emerald-950/10 bg-white p-8 text-center active:cursor-grabbing sm:p-10"
              >
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700">
                  <FiUser aria-hidden="true" size={24} />
                </span>

                <p className="mt-5 font-[family-name:var(--font-fraunces)] text-xl text-emerald-950">
                  {active.name}
                </p>
                <p className="mt-1 text-sm text-emerald-950/60">
                  {active.orgOrPosition}
                </p>

                <span className="mt-4 inline-block rounded-full bg-emerald-700/10 px-3 py-1 text-xs font-medium text-emerald-700">
                  {active.relationship}
                </span>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="mt-7 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous reference"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-950/15 bg-white text-emerald-950 transition-colors hover:bg-emerald-50 md:hidden"
            >
              <FiChevronLeft size={16} />
            </button>

            <div className="flex items-center gap-2">
              {REFERENCES.map((reference, i) => (
                <button
                  key={reference.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to reference ${i + 1} of ${TOTAL}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index
                      ? "w-6 bg-emerald-700"
                      : "w-2 bg-emerald-950/20 hover:bg-emerald-950/40"
                  }`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next reference"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-950/15 bg-white text-emerald-950 transition-colors hover:bg-emerald-50 md:hidden"
            >
              <FiChevronRight size={16} />
            </button>
          </div>

          <p className="mt-3 text-center text-xs text-emerald-950/40 md:hidden">
            Swipe or use the arrows to browse
          </p>
        </div>
      </div>
    </section>
  );
}
