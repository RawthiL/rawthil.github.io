import { useState } from "react";
import { GraduationCap, Rocket, Orbit } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CLUSTERS } from "../content";
import ProjectCard from "./ProjectCard";
import SectionHeading from "./SectionHeading";

const ICONS: Record<string, LucideIcon> = {
  academia: GraduationCap,
  pnyx: Rocket,
  web3: Orbit,
};

type Props = {
  onGroupChange: (group: number | null) => void;
};

export default function Constellations({ onGroupChange }: Props) {
  const [active, setActive] = useState(0);
  const cluster = CLUSTERS[active];

  return (
    <section id="work" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6">
      <SectionHeading kicker="Paths" title="Three paths, one throughline">
        Pick a path: academic research, the startup, and crypto.
      </SectionHeading>

      <div
        role="group"
        aria-label="Choose a path"
        data-reveal
        className="mt-12 flex flex-wrap items-center justify-center gap-3"
      >
        {CLUSTERS.map((c, i) => {
          const Icon = ICONS[c.id];
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={i === active}
              onClick={() => {
                setActive(i);
                onGroupChange(i);
              }}
              className="flex items-center gap-2.5 rounded-full border border-white/10 bg-card/50 px-5 py-3 text-sm font-semibold text-muted backdrop-blur-sm transition-all duration-200 hover:border-azure/50 hover:text-starlight aria-pressed:border-azure aria-pressed:bg-azure/15 aria-pressed:text-starlight"
            >
              <Icon size={18} aria-hidden="true" />
              {c.label}
              <span className="hidden font-mono text-[11px] font-normal text-muted sm:inline">
                {c.kicker}
              </span>
            </button>
          );
        })}
      </div>

      <div key={cluster.id} className="mt-14 space-y-14">
        {cluster.sections.map((section) => (
          <div key={section.heading}>
            <h3 className="border-b border-white/10 pb-2 font-display text-lg font-semibold text-starlight">
              {section.heading}
            </h3>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((project) => (
                <li key={project.title}>
                  <ProjectCard project={project} />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
