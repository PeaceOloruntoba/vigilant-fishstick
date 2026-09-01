"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Editorial() {
  return (
    <section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      className="w-full bg-emerald-950 px-4 py-20 md:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="md:col-span-5"
        >
          <h2
            id="philosophy-heading"
            className="font-[family-name:var(--font-fraunces)] text-2xl italic leading-snug text-stone-50 md:text-4xl"
          >
            A garden is a practice, not a purchase
          </h2>
          <p className="mt-6 max-w-md text-stone-200/85">
            We design for the soil we're given, not against it. Native and
            climate-adapted planting, closed-loop irrigation, and materials
            sourced within the region are the baseline of every proposal we
            write, not an upgrade tier.
          </p>
          <p className="mt-4 max-w-md text-stone-200/85">
            The result is a landscape that asks less of its owner over time:
            less water, less replacement, less maintenance debt. What it asks
            for instead is attention, which is where our stewardship work
            begins.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          className="relative aspect-[4/5] w-full overflow-hidden md:col-span-7 md:aspect-[16/11]"
        >
          {/* Editorial image — replace src with a licensed asset before launch */}
          <Image
            src="https://www.ggmlandscaping.co.uk/wp-content/uploads/2025/08/Urban-Courtyard-Garden-Style.png"
            alt="Close, architectural view of a sustainably designed garden courtyard"
            fill
            unoptimized
            className="object-cover rounded-md"
          />
        </motion.div>
      </div>
    </section>
  );
}
