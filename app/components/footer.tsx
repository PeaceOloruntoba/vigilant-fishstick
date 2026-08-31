import { FiInstagram, FiLinkedin } from "react-icons/fi";

const FOOTER_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Philosophy", href: "#philosophy" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-stone-900/10 bg-stone-50 px-4 py-12 md:px-8 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-fraunces)] text-lg text-emerald-950">
            vredezara
          </p>
          <p className="mt-1 text-sm text-emerald-950/60">
            Landscape architecture and horticulture design.
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
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vredezara on Instagram"
            className="text-emerald-950/70 transition-colors hover:text-emerald-700"
          >
            <FiInstagram size={20} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vredezara on LinkedIn"
            className="text-emerald-950/70 transition-colors hover:text-emerald-700"
          >
            <FiLinkedin size={20} />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-6xl border-t border-stone-900/10 pt-6">
        <p className="text-xs text-emerald-950/50">
          &copy; {year} Vredezara Landscape Studio. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
