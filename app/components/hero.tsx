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
      {/* Background scenery image — replace src with a licensed asset before launch */}
      <Image
        src="https://static.vecteezy.com/system/resources/thumbnails/072/213/711/small/sundrenched-garden-path-roses-greenery-and-golden-hour-light-photo.jpg"
        alt="Sweeping botanical landscape with layered greenery at golden hour"
        fill
        priority
        unoptimized
        className="object-cover object-center"
      />

      {/* Moody gradient overlay for legibility */}
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
            A design studio for living landscapes
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="font-[family-name:var(--font-fraunces)] text-3xl leading-[1.1] text-stone-50 md:text-5xl lg:text-6xl"
          >
            Crafting Living Masterpieces: Premium Landscape Architecture and
            Horticulture Designs
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-xl text-base text-stone-200 md:text-lg"
          >
            We design and tend gardens, courtyards, and interior plantings
            that grow more beautiful with every season — built on sustainable
            horticultural practice and a patient, editorial eye.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#contact"
              className="w-full rounded-full bg-emerald-700 px-7 py-3.5 text-center text-sm font-medium text-stone-50 transition-colors hover:bg-emerald-800 sm:w-auto"
            >
              Book Consultation
            </a>
            <a
              href="#projects"
              className="w-full rounded-full border border-stone-50/40 px-7 py-3.5 text-center text-sm font-medium text-stone-50 transition-colors hover:border-stone-50 hover:bg-stone-50/10 sm:w-auto"
            >
              View Portfolio
            </a>
          </motion.div>
        </div>
      </motion.div>
    </header>
  );
}
