import { useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#trajectory", label: "Trajectory" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/5 bg-abyss/60 backdrop-blur-md">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
      >
        <a
          href="#top"
          className="font-mono text-sm font-medium tracking-widest text-azure"
        >
          RAMIRO<span className="text-muted">.RC</span>
        </a>

        <ul className="hidden items-center gap-6 sm:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="font-mono text-xs uppercase tracking-widest text-muted transition-colors duration-200 hover:text-starlight"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="-mx-3 px-3 py-2.5 text-starlight sm:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
          <span className="sr-only">Toggle navigation menu</span>
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-menu"
          className="border-t border-white/5 bg-deep/95 px-4 py-3 sm:hidden"
        >
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-2.5 font-mono text-sm uppercase tracking-widest text-muted transition-colors hover:text-starlight"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
