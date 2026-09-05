import Image from "next/image";
import { FiInstagram, FiFacebook, FiMessageCircle } from "react-icons/fi";

const FOOTER_LINKS = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#philosophy" },
  { label: "Projects", href: "#projects" },
  { label: "References", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-stone-900/10 bg-stone-50 px-4 py-12 md:px-8 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Image
            src="/logo.png"
            alt="Landfairy Global Investment Ltd — horticulture and landscaping"
            width={200}
            height={200}
            className="h-16 w-16 object-contain"
          />
          <p className="mt-2 text-sm text-emerald-950/60">
            Cultivating Landscapes. Growing Value.
          </p>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm text-emerald-950/70 transition-colors hover:text-emerald-700"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href="https://wa.me/2348160412420"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Landfairy on WhatsApp"
            className="text-emerald-950/70 transition-colors hover:text-emerald-700"
          >
            <FiMessageCircle size={20} />
          </a>
          {/* Replace with the client's real Instagram/Facebook profile URLs */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Landfairy on Instagram"
            className="text-emerald-950/70 transition-colors hover:text-emerald-700"
          >
            <FiInstagram size={20} />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Landfairy on Facebook"
            className="text-emerald-950/70 transition-colors hover:text-emerald-700"
          >
            <FiFacebook size={20} />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 flex max-w-6xl flex-col gap-2 border-t border-stone-900/10 pt-6 md:flex-row md:items-center md:justify-between">
        <p className="text-xs text-emerald-950/50">
          &copy; {year} Landfairy Global Investment Ltd. All rights reserved.
        </p>
        <p className="text-xs text-emerald-950/50">
          RC 8189342 — Registered with the Corporate Affairs Commission (CAC),
          Nigeria
        </p>
      </div>
    </footer>
  );
}
