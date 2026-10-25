import { useLayoutEffect, useRef, useState } from "react";
import { CAREER_EDGES, CAREER_NODES } from "../content";
import type { CareerNode } from "../content";
import SectionHeading from "./SectionHeading";

type Anchor = { x: number; top: number; bottom: number; left: number };

const STAGES = [...new Set(CAREER_NODES.map((n) => n.stage))].sort((a, b) => a - b);

const PARENTS = new Map<string, string[]>();
for (const edge of CAREER_EDGES) {
  PARENTS.set(edge.to, [...(PARENTS.get(edge.to) ?? []), edge.from]);
}

const ACTIVE_EDGES = new Set<string>();
{
  const queue = CAREER_NODES.filter((n) => n.current).map((n) => n.id);
  const seen = new Set(queue);
  while (queue.length) {
    const id = queue.pop()!;
    for (const parent of PARENTS.get(id) ?? []) {
      ACTIVE_EDGES.add(`${parent}->${id}`);
      if (!seen.has(parent)) {
        seen.add(parent);
        queue.push(parent);
      }
    }
  }
}

function NodeCard({ node }: { node: CareerNode }) {
  return (
    <div
      data-node={node.id}
      className={`w-full max-w-[280px] rounded-xl border px-4 py-3 backdrop-blur-sm ${
        node.current
          ? "border-azure/50 bg-azure/10 shadow-[0_0_28px_-10px_rgba(69,176,255,0.5)]"
          : "border-white/10 bg-card/50"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-display text-sm font-semibold leading-snug text-starlight">
          {node.org}
        </p>
        {node.current && (
          <span className="shrink-0 rounded-full bg-azure/20 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-azure">
            Current
          </span>
        )}
      </div>
      <p className="mt-1 text-xs font-medium leading-snug text-azure">{node.role}</p>
      {node.detail && (
        <p className="mt-1.5 text-[11px] leading-relaxed text-muted">{node.detail}</p>
      )}
    </div>
  );
}

function CareerGraph() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [fadeEnd, setFadeEnd] = useState(0);
  const [paths, setPaths] = useState<
    { d: string; active: boolean; faded?: boolean }[]
  >([]);

  useLayoutEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const compute = () => {
      const box = wrap.getBoundingClientRect();
      const anchors = new Map<string, Anchor>();
      wrap.querySelectorAll<HTMLElement>("[data-node]").forEach((el) => {
        const r = el.getBoundingClientRect();
        anchors.set(el.dataset.node!, {
          x: r.left - box.left + r.width / 2,
          top: r.top - box.top,
          bottom: r.bottom - box.top,
          left: r.left - box.left,
        });
      });

      const next: { d: string; active: boolean; faded?: boolean }[] = [];
      for (const edge of CAREER_EDGES) {
        const a = anchors.get(edge.from);
        const b = anchors.get(edge.to);
        if (!a || !b) continue;
        const mid = (a.bottom + b.top) / 2;
        next.push({
          d: `M ${a.x} ${a.bottom} C ${a.x} ${mid}, ${b.x} ${mid}, ${b.x} ${b.top}`,
          active: ACTIVE_EDGES.has(`${edge.from}->${edge.to}`),
        });
      }

      const join = anchors.get("poktscan");
      if (join) {
        const cy = (join.top + join.bottom) / 2;
        setFadeEnd(join.left);
        next.push({
          d: `M 0 ${cy} C ${join.left * 0.35} ${cy}, ${join.left * 0.7} ${cy}, ${join.left} ${cy}`,
          active: false,
          faded: true,
        });
      }
      setPaths(next);
    };

    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(wrap);
    document.fonts.ready.then(compute);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      data-reveal
      className="relative mx-auto mt-16 hidden max-w-4xl md:block"
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
        aria-hidden="true"
      >
        <defs>
          <linearGradient
            id="fade-in-path"
            gradientUnits="userSpaceOnUse"
            x1={0}
            y1={0}
            x2={Math.max(fadeEnd, 1)}
            y2={0}
          >
            <stop offset="0%" stopColor="#45b0ff" stopOpacity="0" />
            <stop offset="100%" stopColor="#45b0ff" stopOpacity="0.65" />
          </linearGradient>
        </defs>
        {paths.map((path, i) =>
          path.faded ? (
            <path
              key={i}
              d={path.d}
              fill="none"
              stroke="url(#fade-in-path)"
              strokeWidth={1.5}
              strokeDasharray="2 5"
            />
          ) : (
            <path
              key={i}
              d={path.d}
              fill="none"
              stroke={
                path.active ? "rgba(61,135,250,0.55)" : "rgba(127,163,198,0.22)"
              }
              strokeWidth={1.5}
            />
          )
        )}
      </svg>

      <div className="space-y-9">
        {STAGES.map((stage) => (
          <div key={stage} className="grid grid-cols-3 gap-4">
            {CAREER_NODES.filter((n) => n.stage === stage).map((node) => (
              <div
                key={node.id}
                className={`flex justify-center ${
                  node.col === 0
                    ? "col-start-1"
                    : node.col === 1
                      ? "col-start-2"
                      : "col-start-3"
                }`}
              >
                <NodeCard node={node} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function CareerList() {
  return (
    <ol
      data-reveal
      className="relative mt-14 ml-2 space-y-4 border-l border-white/10 pl-6 md:hidden"
    >
      {CAREER_NODES.map((node) => {
        const indent = node.col * 18;
        const railX = -29 - indent;
        return (
          <li
            key={node.id}
            className="relative"
            style={{ marginLeft: indent }}
          >
            {node.fromElsewhere && (
              <span
                aria-hidden="true"
                className="absolute -top-5 h-5 border-l border-dashed border-azure/40"
                style={{ left: railX }}
              />
            )}
            {node.col > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-[26px] h-px bg-white/10"
                style={{ left: railX + 4, width: -railX - 4 }}
              />
            )}
            <span
              aria-hidden="true"
              className={`absolute top-5 h-2 w-2 rounded-full ${
                node.current ? "bg-azure" : "bg-muted/60"
              }`}
              style={{ left: railX }}
            />
            <NodeCard node={node} />
          </li>
        );
      })}
    </ol>
  );
}

export default function Trajectory() {
  return (
    <section
      id="trajectory"
      className="mx-auto max-w-6xl scroll-mt-24 px-4 py-24 sm:px-6"
    >
      <SectionHeading kicker="Trajectory" title="The paths traveled and ongoing">
        Nothing is linear...
      </SectionHeading>

      <CareerGraph />
      <CareerList />
    </section>
  );
}
