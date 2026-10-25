import type { Project } from "../content";

type Props = {
  project: Project;
};

export default function ProjectCard({ project }: Props) {
  const shell = (
    <div
      className={`group flex h-full flex-col overflow-hidden rounded-2xl border p-px backdrop-blur-sm transition-all duration-200 ${
        project.placeholder
          ? "border-dashed border-royal/40 bg-transparent"
          : "border-white/10 bg-card/50 hover:-translate-y-0.5 hover:border-royal/40"
      }`}
    >
      {project.image && (
        <div className="flex h-44 items-center justify-center overflow-hidden bg-abyss/60 sm:h-48">
          <img
            src={project.image}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="max-h-full w-full object-contain opacity-90 transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-azure/30 bg-azure/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-azure">
            {project.tag}
          </span>
          {project.placeholder && (
            <span className="font-mono text-[10px] uppercase tracking-widest text-muted/80">
              draft
            </span>
          )}
        </div>

        <h4 className="mt-3 font-display text-base font-semibold leading-snug text-starlight">
          {project.title}
        </h4>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {project.blurb}
        </p>

        {project.link && (
          <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs text-royal transition-transform duration-200 group-hover:translate-x-0.5">
            {project.linkLabel ?? "Open"}
            <span aria-hidden="true">→</span>
          </span>
        )}
      </div>
    </div>
  );

  if (project.link) {
    return (
      <article className="h-full">
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className="block h-full"
        >
          {shell}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </article>
    );
  }

  return <article className="h-full">{shell}</article>;
}
