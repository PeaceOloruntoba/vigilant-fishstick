"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { GiTreeBranch } from "react-icons/gi";
import { FiPlay, FiX } from "react-icons/fi";

type Category = "All" | "Estate" | "Residential" | "Commercial" | "Institutional";

type Project = {
  id: string;
  name: string;
  location: string;
  scope: string;
  year?: string;
  category: Exclude<Category, "All">;
  /** Path(s) under /public. A project can have one image or a small gallery. */
  image?: string;
  images?: string[];
  video?: string;
  videoPoster?: string;
  /** Set when the image shown isn't confirmed to be this exact project — see README. */
  illustrative?: boolean;
};

const CATEGORIES: Category[] = [
  "All",
  "Estate",
  "Residential",
  "Commercial",
  "Institutional",
];

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
    id: "corporate-rooftop-garden",
    name: "Corporate Rooftop Garden",
    location: "Lagos",
    scope: "Design and installation",
    year: "2026",
    category: "Commercial",
    images: [
      "/images/portfolio/rooftop-garden-2.jpg",
      "/images/portfolio/rooftop-garden-1.jpg",
      "/images/portfolio/rooftop-garden-3.jpg",
    ],
    video: "/videos/rooftop-garden-walkthrough.mp4",
    videoPoster: "/images/portfolio/rooftop-garden-1.jpg",
  },
  {
    id: "mayfair-gardens-estate",
    name: "Mayfair Gardens Estate",
    location: "Nigeria",
    scope: "Installation and maintenance",
    year: "2025",
    category: "Estate",
    image: "/images/portfolio/rooftop-garden-1.jpg",
    illustrative: true,
  },
  {
    id: "smith-hills-schools",
    name: "Smith Hills Schools",
    location: "Nigeria",
    scope: "Design, installation and maintenance",
    year: "2026",
    category: "Institutional",
    image: "/images/portfolio/rooftop-garden-3.jpg",
    illustrative: true,
  },
];

function ProjectCard({ project }: { project: Project }) {
  const gallery = project.images ?? (project.image ? [project.image] : []);
  const [activeImage, setActiveImage] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(false);

  const currentSrc = gallery[activeImage];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-md bg-stone-100">
        {playingVideo && project.video ? (
          <>
            <video
              src={project.video}
              poster={project.videoPoster}
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
        ) : currentSrc ? (
          <>
            <Image
              src={currentSrc}
              alt={`${project.name} landscape project in ${project.location}`}
              fill
              className="object-contain p-3"
            />
            {project.video && (
              <button
                type="button"
                onClick={() => setPlayingVideo(true)}
                aria-label={`Play video walkthrough of ${project.name}`}
                className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors hover:bg-black/10"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-emerald-700 shadow-md">
                  <FiPlay size={20} className="ml-0.5" />
                </span>
              </button>
            )}
            {gallery.length > 1 && (
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5">
                {gallery.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    aria-label={`Show photo ${i + 1} of ${gallery.length}`}
                    aria-current={i === activeImage}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeImage
                        ? "w-4 bg-emerald-700"
                        : "w-1.5 bg-emerald-950/25 hover:bg-emerald-950/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-emerald-950/30">
            <GiTreeBranch className="h-8 w-8" aria-hidden="true" />
            <span className="text-xs">Photography coming soon</span>
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
