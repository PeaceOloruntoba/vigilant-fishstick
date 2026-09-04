"use client";

import { motion, type Variants } from "framer-motion";
import { GiTreeBranch, GiWateringCan, GiPlantRoots } from "react-icons/gi";
import { FiDroplet, FiHome } from "react-icons/fi";
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
    title: "Planning & Design",
    description:
      "Landscape concepts and horticultural plans tailored to each site's climate, soil and intended use. Plant selection, layout design and phased planting plans for estates, corporate parks and public spaces.",
  },
  {
    icon: GiWateringCan,
    title: "Property Maintenance",
    description:
      "Scheduled maintenance programmes covering lawn care, pruning, fertilisation, and pest and weed control. Delivered under fixed-term service agreements for estates, hotels, schools and private residences.",
  },
  {
    icon: GiPlantRoots,
    title: "Soft & Hard Scape Installation",
    description:
      "Lawns, shrubs, trees and flower beds installed alongside pathways, paving, kerbing, decking and water features. Softscape and hardscape are planned as one cohesive landscape, not two separate jobs.",
  },
  {
    icon: FiDroplet,
    title: "Irrigation System Design",
    description:
      "Sprinkler and drip irrigation systems sized to each landscape's plant density and water needs. Designed to cut water waste while keeping planted areas consistently healthy.",
  },
  {
    icon: FiHome,
    title: "Property Development & Handover",
    description:
      "For new developments and estates, we manage the landscape component from planning through completion. Grounds are delivered on schedule and handed over with full maintenance guidelines.",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: EASE_OUT },
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
            Five disciplines, one accountable partner
          </h2>
          <p className="mt-4 text-emerald-950/70 md:text-lg">
            From first sketch to seasonal upkeep, Landfairy holds a project
            through its entire life outdoors — one team, start to finish.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-8 lg:grid-cols-3">
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
