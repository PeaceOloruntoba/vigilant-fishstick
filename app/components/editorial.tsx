"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const CORE_VALUES = [
  "Professionalism",
  "Sustainability",
  "Reliability",
  "Quality Craftsmanship",
  "Client Partnership",
];

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
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="md:col-span-5"
        >
          <h2
            id="philosophy-heading"
            className="font-[family-name:var(--font-fraunces)] text-2xl italic leading-snug text-stone-50 md:text-4xl"
          >
            Every landscape is treated as a living asset
          </h2>
          <p className="mt-6 max-w-md text-stone-200/85">
            Our vision is to be the leading landscape and horticulture company
            in Nigeria, recognised for transforming outdoor spaces into
            sustainable, healthy and beautiful environments.
          </p>
          <p className="mt-4 max-w-md text-stone-200/85">
            We design for climate, soil and use, install with attention to
            long-term performance, and maintain on a schedule that protects the
            client's investment year after year — one accountable partner across
            the full lifecycle, not a chain of contractors.
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
            {CORE_VALUES.map((value) => (
              <li
                key={value}
                className="text-xs uppercase tracking-wide text-emerald-300/80"
              >
                {value}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          className="relative aspect-[4/5] w-full overflow-hidden rounded-md md:col-span-7 md:aspect-[16/11]"
        >
          {/* Real Landfairy site photography, extracted from the company profile */}
          <Image
            src="https://www.ggmlandscaping.co.uk/wp-content/uploads/2025/08/Urban-Courtyard-Garden-Style.png"
            alt="Brick-edged planting bed with palm feature installed by Landfairy Global Investment Ltd"
            fill
            className="object-cover object-top"
          />
        </motion.div>
      </div>
    </section>
  );
}
