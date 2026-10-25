import type { ReactNode } from "react";

type Props = {
  kicker: string;
  title: string;
  children?: ReactNode;
};

export default function SectionHeading({ kicker, title, children }: Props) {
  return (
    <div data-reveal className="mx-auto max-w-2xl text-center">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-royal">
        {kicker}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-starlight sm:text-4xl">
        {title}
      </h2>
      {children && (
        <p className="mt-4 text-sm leading-relaxed text-muted sm:text-base">{children}</p>
      )}
    </div>
  );
}
