import { ABOUT_PARAGRAPHS, LANGUAGES, SKILL_CHIPS, SOCIALS } from "../content";
import SectionHeading from "./SectionHeading";

const META_CARD =
  "rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading kicker="About" title="Two PhDs, one obsession: making it work">
        A pragmatic, test-oriented researcher.
      </SectionHeading>

      <div
        data-reveal
        className="relative mx-auto mt-12 max-w-3xl rounded-2xl border border-white/10 bg-card/50 p-6 backdrop-blur-sm sm:p-8"
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-8 left-0 w-px bg-gradient-to-b from-transparent via-azure/60 to-transparent"
        />
        <div className="space-y-4 pl-0 sm:pl-6">
          <p className="text-[15px] leading-relaxed text-muted sm:text-base">
            {ABOUT_PARAGRAPHS[0]}
          </p>
          <p className="text-[15px] leading-relaxed text-muted sm:text-base">
            {ABOUT_PARAGRAPHS[1]}
          </p>
          <p className="text-[15px] leading-relaxed text-muted sm:text-base">
            {ABOUT_PARAGRAPHS[2]}
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div data-reveal className={META_CARD}>
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-azure">
            Toolkit
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {SKILL_CHIPS.map((s) => (
              <li
                key={s}
                className="rounded-full border border-azure/25 bg-azure/10 px-3 py-1 font-mono text-xs text-starlight"
              >
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className={META_CARD}>
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-azure">
            Languages
          </h3>
          <ul className="mt-4 space-y-2">
            {LANGUAGES.map((l) => (
              <li key={l.name} className="flex items-baseline justify-between gap-4">
                <span className="text-sm font-medium text-starlight">{l.name}</span>
                <span className="font-mono text-xs text-muted">{l.level}</span>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className={META_CARD}>
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-azure">
            Elsewhere
          </h3>
          <ul className="mt-4 flex flex-wrap gap-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm text-muted transition-colors duration-200 hover:border-royal hover:text-royal"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
