"use client";

import { motion, type Variants } from "framer-motion";
import { FaStar } from "react-icons/fa";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  project: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote:
      "Vredezara read our slope and our soil before they ever sketched a plan. Three years on, the garden looks more settled every spring, not more tired.",
    name: "Marisol Ferreira",
    role: "Homeowner",
    project: "Hollow Creek Residence",
  },
  {
    id: "t2",
    quote:
      "They treated our lobby planting as architecture, not decoration. Visitors comment on it before they comment on the building.",
    name: "Daniel Okoye",
    role: "Facilities Director",
    project: "Anders & Vale HQ Atrium",
  },
  {
    id: "t3",
    quote:
      "The stewardship team knows our courtyard better than we do at this point. Nothing gets missed between seasons.",
    name: "Priya Chandrasekhar",
    role: "Property Manager",
    project: "Marlowe Terrace Courtyard",
  },
  {
    id: "t4",
    quote:
      "Our loft had two dead corners for years. Vredezara turned one into the first thing every guest photographs.",
    name: "Sam Whitfield",
    role: "Homeowner",
    project: "Callow Loft Plant Wall",
  },
  {
    id: "t5",
    quote:
      "Guests now ask to walk the grounds before they ask about the rooms. That's a first for us in twelve years of operating this property.",
    name: "Helena Roost",
    role: "General Manager",
    project: "Birchgate Hotel Grounds",
  },
  {
    id: "t6",
    quote:
      "What sold us was how little they asked us to compromise on maintenance. The plan was ambitious and still practical to keep up.",
    name: "Owen Castellanos",
    role: "Studio Founder",
    project: "Sable & Fern Studio",
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE_OUT },
  }),
};

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="w-full bg-stone-50 px-4 py-20 md:px-8 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-6xl">
        <div className="max-w-2xl">
          <h2
            id="testimonials-heading"
            className="font-[family-name:var(--font-fraunces)] text-2xl text-emerald-950 md:text-4xl"
          >
            From the gardens we've kept
          </h2>
          <p className="mt-4 text-emerald-950/70 md:text-lg">
            A few words from the people who live with, work in, and manage
            the spaces we've designed.
          </p>
        </div>

        {/* Mobile / tablet: horizontal snap-scroll. Desktop: static grid. */}
        <div
          role="list"
          aria-label="Client testimonials"
          className="
            mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4
            [-ms-overflow-style:none] [scrollbar-width:none]
            [&::-webkit-scrollbar]:hidden
            sm:gap-6
            md:grid md:grid-cols-2 md:overflow-visible md:pb-0
            lg:grid-cols-3
          "
        >
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.article
              key={testimonial.id}
              role="listitem"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="
                flex w-[82vw] shrink-0 snap-center flex-col justify-between
                rounded-2xl border border-emerald-950/10 bg-white p-6
                sm:w-[60vw] sm:p-7
                md:w-auto md:shrink md:snap-none
              "
            >
              <div>
                <div className="flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <FaStar key={starIndex} className="h-3.5 w-3.5 text-emerald-700" />
                  ))}
                </div>

                <p className="mt-4 font-[family-name:var(--font-fraunces)] text-lg italic leading-relaxed text-emerald-950 sm:text-xl">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
              </div>

              <div className="mt-6 border-t border-emerald-950/10 pt-4">
                <p className="text-sm font-medium text-emerald-950">
                  {testimonial.name}
                </p>
                <p className="mt-0.5 text-xs text-emerald-950/60">
                  {testimonial.role}, {testimonial.project}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-4 text-xs text-emerald-950/40 md:hidden">
          Swipe to read more
        </p>
      </div>
    </section>
  );
}