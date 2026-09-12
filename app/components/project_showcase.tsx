"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { GiTreeBranch } from "react-icons/gi";
import { FiPlay, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type Category = "All" | "Estate" | "Residential" | "Institutional";

type Project = {
  id: string;
  name: string;
  location: string;
  scope: string;
  year?: string;
  category: Exclude<Category, "All">;
  /** Path under /public. Omitted where no site photo exists yet. */
  image?: string;
  /** Set when the image shown isn't confirmed to be this exact project — see README. */
  illustrative?: boolean;
  /**
   * Shown on the placeholder card when `image` is missing — a short,
   * search-friendly description of the photo this project needs, so
   * whoever's sourcing it (stock or real) knows what to look for.
   */
  imageBrief?: string;
};

const CATEGORIES: Category[] = ["All", "Estate", "Residential", "Institutional"];

const PROJECTS: Project[] = [
  {
    id: "golden-park-estate",
    name: "Golden Park Estate",
    location: "Ajah, Lagos",
    scope: "Design, installation and maintenance",
    year: "2019",
    category: "Estate",
    image: "/images/portfolio/golden-park-estate-ajah.jpg",
  },
  {
    id: "precious-estate",
    name: "Precious Estate",
    location: "Ido, Ibadan",
    scope: "Installation and maintenance",
    category: "Estate",
    image: "/images/portfolio/precious-estate-ido-ibadan.jpg",
  },
  {
    id: "adebambo-residence",
    name: "Adebambo Residence",
    location: "Eleyele, Ibadan",
    scope: "Installation and maintenance",
    year: "2021",
    category: "Residential",
    image: "/images/portfolio/adebambo-residence-eleyele-ibadan.jpg",
  },
  {
    id: "urban-homes",
    name: "Urban Homes",
    location: "Nigeria",
    scope: "Design, installation and maintenance",
    year: "2022",
    category: "Residential",
    image: "/images/portfolio/urban-homes.jpg",
    illustrative: true,
  },
  {
    id: "mayfair-gardens-estate",
    name: "Mayfair Gardens Estate",
    location: "Nigeria",
    scope: "Installation and maintenance",
    year: "2025",
    category: "Estate",
    imageBrief:
      "Estate entrance or interior road with manicured lawn, flower beds, and paved kerbing — a gated residential estate in Nigeria",
  },
  {
    id: "smith-hills-schools",
    name: "Smith Hills Schools",
    location: "Nigeria",
    scope: "Design, installation and maintenance",
    year: "2026",
    category: "Institutional",
    imageBrief:
      "School compound grounds with lawn, tree planting, and walkways — a Nigerian school campus exterior",
  },
];

// ---------------------------------------------------------------------------
// Featured National Theatre carousel — self-scrolling infinite loop, every
// 3s, with manual arrow/dot controls and a play button for the walkthrough
// video. This is its own featured block at the top of the section, kept
// separate from the filterable project grid below so its photos are never
// shown twice.
// ---------------------------------------------------------------------------
const THEATRE_IMAGES = [
  "/images/portfolio/rooftop-garden-2.jpg",
  "/images/portfolio/rooftop-garden-1.jpg",
  "/images/portfolio/rooftop-garden-3.jpg",
];
const THEATRE_VIDEO = "/videos/rooftop-garden-walkthrough.mp4";
const THEATRE_AUTOPLAY_MS = 3000;
const SWIPE_THRESHOLD = 60;
const THEATRE_TOTAL = THEATRE_IMAGES.length;

function NationalTheatreFeature() {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const paginate = useCallback((step: number) => {
    setSlide(([current]) => [(current + step + THEATRE_TOTAL) % THEATRE_TOTAL, step]);
  }, []);

  const goTo = useCallback((target: number) => {
    setSlide(([current]) => [target, target > current ? 1 : -1]);
  }, []);

  useEffect(() => {
    if (isPaused || playingVideo || prefersReducedMotion) return;
    const timer = setInterval(() => paginate(1), THEATRE_AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, playingVideo, prefersReducedMotion, paginate]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (info.offset.x < -SWIPE_THRESHOLD) paginate(1);
    else if (info.offset.x > SWIPE_THRESHOLD) paginate(-1);
  };

  const slideVariants: Variants = {
    enter: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir > 0 ? 48 : -48,
    }),
    center: { opacity: 1, x: 0, transition: { duration: 0.45, ease: EASE_OUT } },
    exit: (dir: number) => ({
      opacity: 0,
      x: prefersReducedMotion ? 0 : dir > 0 ? -48 : 48,
      transition: { duration: 0.3, ease: EASE_OUT },
    }),
  };

  const activeSrc = THEATRE_IMAGES[index];

  return (
    <div className="mb-20">
      <div className="max-w-2xl">
        <h3 className="font-[family-name:var(--font-fraunces)] text-xl text-emerald-950 md:text-2xl">
          National Theatre, Lagos
        </h3>
        <p className="mt-2 text-sm text-emerald-950/70 md:text-base">
          Design and installation, 2026 — a rooftop garden at one of
          Lagos's most recognisable landmarks.
        </p>
      </div>

      <div
        className="relative mx-auto mt-8 max-w-3xl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous photo"
          className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-[130%] -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/15 bg-white text-emerald-950 shadow-sm transition-colors hover:bg-emerald-50 md:flex"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next photo"
          className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 translate-x-[130%] items-center justify-center rounded-full border border-emerald-950/15 bg-white text-emerald-950 shadow-sm transition-colors hover:bg-emerald-50 md:flex"
        >
          <FiChevronRight size={20} />
        </button>

        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-stone-100 sm:aspect-video"
          role="region"
          aria-roledescription="carousel"
          aria-label="National Theatre rooftop garden photos"
        >
          {playingVideo ? (
            <>
              <video
                src={THEATRE_VIDEO}
                poster={activeSrc}
                controls
                autoPlay
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => setPlayingVideo(false)}
                aria-label="Close video"
                className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
              >
                <FiX size={16} />
              </button>
            </>
          ) : (
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeSrc}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.65}
                onDragEnd={handleDragEnd}
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
              >
                <Image
                  src={activeSrc}
                  alt="Rooftop garden landscaped by Landfairy at the National Theatre, Lagos"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          )}

          {!playingVideo && (
            <button
              type="button"
              onClick={() => setPlayingVideo(true)}
              aria-label="Play video walkthrough of the National Theatre rooftop garden"
              className="absolute inset-0 z-[5] flex items-center justify-center bg-black/0 transition-colors hover:bg-black/10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-emerald-700 shadow-md">
                <FiPlay size={20} className="ml-0.5" />
              </span>
            </button>
          )}
        </div>

        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous photo"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-950/15 bg-white text-emerald-950 transition-colors hover:bg-emerald-50 md:hidden"
          >
            <FiChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            {THEATRE_IMAGES.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show photo ${i + 1} of ${THEATRE_TOTAL}`}
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
            aria-label="Next photo"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-950/15 bg-white text-emerald-950 transition-colors hover:bg-emerald-50 md:hidden"
          >
            <FiChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-stone-100">
        {project.image ? (
          <Image
            src={project.image}
            alt={`${project.name} landscape project in ${project.location}`}
            fill
            className="object-contain p-3"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center text-emerald-950/30">
            <GiTreeBranch className="h-8 w-8" aria-hidden="true" />
            <span className="text-xs font-medium">Photography coming soon</span>
            {project.imageBrief && (
              <span className="text-[11px] leading-snug text-emerald-950/25">
                Needed: {project.imageBrief}
              </span>
            )}
          </div>
        )}
      </div>
      <h3 className="mt-4 font-[family-name:var(--font-fraunces)] text-lg text-emerald-950">
        {project.name}
      </h3>
      <p className="mt-1 text-sm text-emerald-950/60">
        {project.scope} in {project.location}
        {project.year ? `, ${project.year}` : ""}
      </p>
    </motion.article>
  );
}

export default function ProjectShowcase() {
  const [active, setActive] = useState<Category>("All");

  const filtered = useMemo(
    () =>
      active === "All"
        ? PROJECTS
        : PROJECTS.filter((project) => project.category === active),
    [active]
  );

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="w-full bg-stone-50 px-4 py-20 md:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <NationalTheatreFeature />

        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            id="projects-heading"
            className="font-[family-name:var(--font-fraunces)] text-2xl text-emerald-950 md:text-4xl"
          >
            Recent work
          </h2>

          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="flex flex-wrap gap-2"
          >
            {CATEGORIES.map((category) => {
              const isActive = category === active;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActive(category)}
                  className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "text-stone-50"
                      : "text-emerald-950/70 hover:text-emerald-950"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-category-pill"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      className="absolute inset-0 rounded-full bg-emerald-700"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
