"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const NAV_LINKS = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#philosophy" },
  { label: "Projects", href: "/#projects" },
  { label: "Gallery", href: "/gallery" },
  { label: "References", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-stone-900/5 bg-white/70 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 md:px-8 lg:px-16"
      >
        <a
          href="/"
          aria-label="Landfairy Global Investment Ltd home"
          className="flex items-center gap-2"
        >
          <Image
            src="/logo.svg"
            alt=""
            width={1400}
            height={330}
            priority
            className="h-11 w-auto max-w-[38vw] object-contain md:max-w-none"
          />
          <span className="flex flex-col leading-none">
            <span className="font-[family-name:var(--font-fraunces)] text-lg text-emerald-950 md:text-xl">
              Landfairy
            </span>
            <span className="text-[10px] uppercase tracking-wider text-emerald-700 md:text-xs">
              Global Investment Ltd
            </span>
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-emerald-950/80 transition-colors hover:text-emerald-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="/#contact"
          className="hidden rounded-full bg-emerald-700 px-5 py-2.5 text-sm font-medium text-stone-50 transition-colors hover:bg-emerald-800 md:inline-block"
        >
          Request a Quote
        </a>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className="inline-flex items-center justify-center rounded-md p-2 text-emerald-950 md:hidden"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-stone-900/5 bg-white/90 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-md px-2 py-3 text-base text-emerald-950/90 transition-colors hover:bg-emerald-50 hover:text-emerald-700"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="/#contact"
                  onClick={() => setIsOpen(false)}
                  className="block rounded-full bg-emerald-700 px-5 py-3 text-center text-sm font-medium text-stone-50 transition-colors hover:bg-emerald-800"
                >
                  Request a Quote
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
