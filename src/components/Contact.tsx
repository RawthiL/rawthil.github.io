import { Github, Linkedin, Twitter, Globe, Send } from "lucide-react";

const ICONS = {
  GitHub: Github,
  LinkedIn: Linkedin,
  "X / Twitter": Twitter,
  ResearchGate: Globe,
  Telegram: Send,
} as const;

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 px-4 py-24 sm:px-6">
      <div
        data-reveal
        className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-gradient-to-b from-card/70 to-abyss/70 p-8 text-center backdrop-blur-sm sm:p-14"
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-royal">
          Current position
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-starlight sm:text-4xl">
          Let&apos;s chart something new
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
          Research collaborations, production ML, or consulting on deep learning,
          decentralized systems, or agentic integrations — the signal is open.
        </p>

        <ul className="mt-9 flex flex-wrap items-center justify-center gap-3">
          {[
            { label: "LinkedIn", href: "https://www.linkedin.com/in/rodriguez-colmeiro/" },
            { label: "X / Twitter", href: "https://twitter.com/Rama_stdout" },
            { label: "Telegram", href: "https://t.me/RawthiL" },
          ].map((s) => {
            const Icon = ICONS[s.label as keyof typeof ICONS];
            return (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/10 px-5 py-3 text-sm font-medium text-starlight transition-colors duration-200 hover:border-azure hover:text-azure"
                >
                  <Icon size={16} aria-hidden="true" />
                  {s.label}
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <footer className="mt-16 pb-10 text-center">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} Ramiro Germán Rodríguez Colmeiro · drawn by math, rendered in real time
        </p>
      </footer>
    </section>
  );
}
