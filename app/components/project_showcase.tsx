"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
  type Variants,
} from "framer-motion";
import Image from "next/image";
import { GiTreeBranch } from "react-icons/gi";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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

type MediaItem =
  | { type: "video"; src: string; poster?: string }
  | { type: "image"; src: string; alt: string };

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
  // {
  //   id: "mayfair-gardens-estate",
  //   name: "Mayfair Gardens Estate",
  //   location: "Nigeria",
  //   scope: "Installation and maintenance",
  //   year: "2025",
  //   category: "Estate",
  //   imageBrief:
  //     "Estate entrance or interior road with manicured lawn, flower beds, and paved kerbing — a gated residential estate in Nigeria",
  // },
  // {
  //   id: "smith-hills-schools",
  //   name: "Smith Hills Schools",
  //   location: "Nigeria",
  //   scope: "Design, installation and maintenance",
  //   year: "2026",
  //   category: "Institutional",
  //   imageBrief:
  //     "School compound grounds with lawn, tree planting, and walkways — a Nigerian school campus exterior",
  // },
];

// ---------------------------------------------------------------------------
// Featured National Theatre carousel: 4 items (1 Video + 3 Images).
// - Video is slide index 0 and autoplays without manual user play triggers.
// - When the video ends, it advances automatically to the images.
// - Image slides advance every 3 seconds.
// - Manual slide navigation resets and pauses/re-prepares video to 0s.
// ---------------------------------------------------------------------------
const THEATRE_MEDIA: MediaItem[] = [
  {
    type: "video",
    src: "/videos/rooftop-garden-walkthrough.mp4",
    poster: "/images/portfolio/rooftop-garden-1.jpg",
  },
  {
    type: "image",
    src: "/images/portfolio/rooftop-garden-2.jpg",
    alt: "Rooftop garden landscaped by Landfairy at the National Theatre, Lagos - View 1",
  },
  {
    type: "image",
    src: "/images/portfolio/rooftop-garden-1.jpg",
    alt: "Rooftop garden landscaped by Landfairy at the National Theatre, Lagos - View 2",
  },
  {
    type: "image",
    src: "/images/portfolio/rooftop-garden-3.jpg",
    alt: "Rooftop garden landscaped by Landfairy at the National Theatre, Lagos - View 3",
  },
];

const THEATRE_AUTOPLAY_MS = 3000;
const SWIPE_THRESHOLD = 60;
const THEATRE_TOTAL = THEATRE_MEDIA.length;

function NationalTheatreFeature() {
  const [[index, direction], setSlide] = useState<[number, number]>([0, 0]);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const activeMedia = THEATRE_MEDIA[index];

  const paginate = useCallback((step: number) => {
    // Pause / reset video timing when switching manually or automatically
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setSlide(([current]) => [(current + step + THEATRE_TOTAL) % THEATRE_TOTAL, step]);
  }, []);

  const goTo = useCallback((target: number) => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    setSlide(([current]) => [target, target > current ? 1 : -1]);
  }, []);

  // Handle slideshow timer for image slides only
  useEffect(() => {
    if (isPaused || prefersReducedMotion || activeMedia.type === "video") return;

    const timer = setInterval(() => paginate(1), THEATRE_AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [isPaused, prefersReducedMotion, paginate, activeMedia.type]);

  // Handle video autoplay execution when video slide is active
  useEffect(() => {
    if (activeMedia.type === "video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser policy blocks autoplay with unmuted audio
        });
      }
    }
  }, [index, activeMedia.type]);

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
          aria-label="Previous slide"
          className="absolute left-0 top-1/2 z-10 hidden h-11 w-11 -translate-x-[130%] -translate-y-1/2 items-center justify-center rounded-full border border-emerald-950/15 bg-white text-emerald-950 shadow-sm transition-colors hover:bg-emerald-50 md:flex"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next slide"
          className="absolute right-0 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 translate-x-[130%] items-center justify-center rounded-full border border-emerald-950/15 bg-white text-emerald-950 shadow-sm transition-colors hover:bg-emerald-50 md:flex"
        >
          <FiChevronRight size={20} />
        </button>

        <div
          className="relative aspect-[4/3] w-full overflow-hidden rounded-md bg-stone-100 sm:aspect-video"
          role="region"
          aria-roledescription="carousel"
          aria-label="National Theatre rooftop garden showcase"
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
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
              {activeMedia.type === "video" ? (
                <video
                  ref={videoRef}
                  src={activeMedia.src}
                  poster={activeMedia.poster}
                  autoPlay
                  muted
                  playsInline
                  onEnded={() => paginate(1)}
                  className="h-full w-full object-cover pointer-events-none"
                />
              ) : (
                <Image
                  src={activeMedia.src}
                  alt={activeMedia.alt}
                  fill
                  className="object-cover"
                />
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-6 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Previous slide"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-950/15 bg-white text-emerald-950 transition-colors hover:bg-emerald-50 md:hidden"
          >
            <FiChevronLeft size={16} />
          </button>

          <div className="flex items-center gap-2">
            {THEATRE_MEDIA.map((item, i) => (
              <button
                key={item.src + i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Show slide ${i + 1} of ${THEATRE_TOTAL}`}
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
            aria-label="Next slide"
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
