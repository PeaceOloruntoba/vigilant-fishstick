"use client";

import { motion, type Variants } from "framer-motion";
import { GiTreeBranch, GiPlantRoots, GiWateringCan } from "react-icons/gi";
import type { IconType } from "react-icons";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type Service = {
  icon: IconType;
  title: string;
  description: string;
};

const SERVICES: Service[] = [
  {
    icon: GiTreeBranch,
    title: "Landscape Architecture",
    description:
      "Full-scale design and build for gardens, courtyards, and grounds, drawn from the site's own topography and light. Every plan balances structure with the way a space will grow and change.",
  },
  {
    icon: GiPlantRoots,
    title: "Biophilic Indoor Styling",
    description:
      "Living plant schemes for homes and workplaces that bring daylight-driven wellbeing indoors. We select species and vessels to match the room's climate, not just its color palette.",
  },
  {
    icon: GiWateringCan,
    title: "Premium Garden Stewardship",
    description:
      "Ongoing seasonal care that keeps a finished landscape at its best for years, not just its first bloom. Our stewards return on a rhythm set by the garden, not a fixed calendar.",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: EASE_OUT },
  }),
};

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="w-full bg-stone-50 px-4 py-20 md:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2
            id="services-heading"
            className="font-[family-name:var(--font-fraunces)] text-2xl text-emerald-950 md:text-4xl"
          >
            Three disciplines, one continuous practice
          </h2>
          <p className="mt-4 text-emerald-950/70 md:text-lg">
            From first sketch to seasonal upkeep, our studio holds a project
            through its entire life outdoors and in.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
          {SERVICES.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col border-t-2 border-emerald-700 pt-6"
            >
              <Icon aria-hidden="true" className="h-8 w-8 text-emerald-700" />
              <h3 className="mt-5 font-[family-name:var(--font-fraunces)] text-xl text-emerald-950">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-emerald-950/70">
                {description}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
