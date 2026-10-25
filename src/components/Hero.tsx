import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 text-center"
    >
      <div data-reveal className="max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.35em] text-royal sm:text-sm">
          Machine Learning Engineer · Scientist
        </p>
        <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight text-starlight sm:text-6xl md:text-7xl">
          Ramiro Germán
          <br />
          <span className="bg-gradient-to-r from-azure to-royal bg-clip-text text-transparent">
            Rodríguez Colmeiro
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
          Two PhDs, UTN and UTT — from nuclear &amp; medical imaging to decentralized AI to
          agentic systems. I turn bleeding-edge methods into things that run in production.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#work"
            className="rounded-full bg-azure px-6 py-3 text-sm font-semibold text-abyss transition-all duration-200 hover:bg-royal"
          >
            My work so far
          </a>
          <a
            href="#contact"
            className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-starlight transition-colors duration-200 hover:border-azure hover:text-azure"
          >
            Get in touch
          </a>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 text-muted transition-colors hover:text-azure"
        aria-label="Scroll to About"
      >
        <ChevronDown className="motion-safe:animate-bounce" size={28} />
      </a>
    </section>
  );
}
