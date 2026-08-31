"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

type Category = "All" | "Residential" | "Commercial" | "Interior";

type Project = {
  id: string;
  name: string;
  location: string;
  category: Exclude<Category, "All">;
};

const CATEGORIES: Category[] = ["All", "Residential", "Commercial", "Interior"];

const PROJECTS: Project[] = [
  { id: "p1", name: "Hollow Creek Residence", location: "Sonoma, CA", category: "Residential" },
  { id: "p2", name: "Marlowe Terrace Courtyard", location: "Austin, TX", category: "Residential" },
  { id: "p3", name: "Anders & Vale HQ Atrium", location: "Portland, OR", category: "Commercial" },
  { id: "p4", name: "Birchgate Hotel Grounds", location: "Asheville, NC", category: "Commercial" },
  { id: "p5", name: "Callow Loft Plant Wall", location: "Brooklyn, NY", category: "Interior" },
  { id: "p6", name: "Sable & Fern Studio", location: "Seattle, WA", category: "Interior" },
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
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-emerald-950/5">
                  {/* Project image — replace src with a licensed asset before launch */}
                  <Image
                    src={`https://picsum.photos/seed/${project.id}/800/600`}
                    alt={`${project.name} landscape design in ${project.location}`}
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-fraunces)] text-lg text-emerald-950">
                  {project.name}
                </h3>
                <p className="mt-1 text-sm text-emerald-950/60">
                  {project.category.toLowerCase()} project in {project.location}
                </p>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
