"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { GiTreeBranch } from "react-icons/gi";

type Category = "All" | "Estate" | "Residential" | "Institutional";

type Project = {
  id: string;
  name: string;
  location: string;
  scope: string;
  year?: string;
  category: Exclude<Category, "All">;
  /** Path under /public. Omitted where no site photo was supplied yet. */
  image?: string;
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
  },
  {
    id: "mayfair-gardens-estate",
    name: "Mayfair Gardens Estate",
    location: "Nigeria",
    scope: "Installation and maintenance",
    year: "2025",
    category: "Estate",
  },
  {
    id: "smith-hills-schools",
    name: "Smith Hills Schools",
    location: "Nigeria",
    scope: "Design, installation and maintenance",
    year: "2026",
    category: "Institutional",
  },
];

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
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
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
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
