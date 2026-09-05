"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT },
  },
};

export default function Hero() {
  return (
    <header
      id="top"
      className="relative flex min-h-[92vh] w-full items-end overflow-hidden md:min-h-screen"
    >
      {/* Background — extracted from the company profile; swap for higher-resolution
          photography (1920px+ wide) when available. */}
      <Image
        src="/images/hero/hero-background.jpg"
        alt="Layered flower border and lawn maintained by Landfairy Global Investment Ltd"
        fill
        priority
        className="object-cover object-center"
      />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-stone-50/20"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full px-4 pb-16 pt-40 md:px-8 md:pb-24 lg:px-16 lg:pb-28"
      >
        <div className="max-w-3xl">
          <motion.p
            variants={itemVariants}
            className="mb-4 font-[family-name:var(--font-fraunces)] text-base italic text-stone-100/90 md:text-lg"
          >
            Landscape architecture, horticulture and property maintenance
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-[family-name:var(--font-fraunces)] text-3xl leading-[1.1] text-stone-50 md:text-5xl lg:text-6xl"
          >
            Cultivating Landscapes. Growing Value.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base text-stone-200 md:text-lg"
          >
            Landfairy Global Investment Ltd (RC 8189342) plans, installs and
            maintains landscapes for corporate, residential, institutional and
            government clients across Nigeria — treating every project as a
            living asset from first design to long-term stewardship.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#contact"
              className="w-full rounded-full bg-emerald-700 px-7 py-3.5 text-center text-sm font-medium text-stone-50 transition-colors hover:bg-emerald-800 sm:w-auto"
            >
              Request a Quote
            </a>
            <a
              href="#projects"
              className="w-full rounded-full border border-stone-50/40 px-7 py-3.5 text-center text-sm font-medium text-stone-50 transition-colors hover:border-stone-50 hover:bg-stone-50/10 sm:w-auto"
            >
              View Our Projects
            </a>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}
