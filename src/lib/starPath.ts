import starMapRaw from "../data/star_map.json";

export const VERTICES = starMapRaw.vertices as [number, number][];
export const SIZES = starMapRaw.vertex_sizes;
export const TRIANGLES = starMapRaw.triangles as [number, number, number][];

const adjacency: Set<number>[] = VERTICES.map(() => new Set<number>());
for (const [a, b, c] of TRIANGLES) {
  adjacency[a].add(b);
  adjacency[a].add(c);
  adjacency[b].add(a);
  adjacency[c].add(a);
  adjacency[b].add(c);
  adjacency[c].add(b);
}

export const TRIANGLE_EDGES: [number, number][] = (() => {
  const seen = new Set<number>();
  const edges: [number, number][] = [];
  for (const [a, b, c] of TRIANGLES) {
    for (const [u, v] of [
      [a, b],
      [b, c],
      [c, a],
    ] as [number, number][]) {
      const key = u < v ? u * VERTICES.length + v : v * VERTICES.length + u;
      if (!seen.has(key)) {
        seen.add(key);
        edges.push([u, v]);
      }
    }
  }
  return edges;
})();

const EDGE_SET = new Set(
  TRIANGLE_EDGES.map(([u, v]) => (u < v ? u * VERTICES.length + v : v * VERTICES.length + u))
);

export const isMeshEdge = (a: number, b: number) =>
  EDGE_SET.has(a < b ? a * VERTICES.length + b : b * VERTICES.length + a);

function dist2(a: number, b: number): number {
  const dx = VERTICES[a][0] - VERTICES[b][0];
  const dy = VERTICES[a][1] - VERTICES[b][1];
  return dx * dx + dy * dy;
}

function shuffled<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export type Route = {
  path: number[];
};

export function generateRoute(): Route {
  const n = VERTICES.length;
  const visited = new Set<number>();
  const path: number[] = [];

  let current = Math.floor(Math.random() * n);
  visited.add(current);
  path.push(current);

  while (path.length < n) {
    const options = shuffled([...adjacency[current]]).filter(
      (v) => !visited.has(v)
    );
    if (options.length > 0) {
      current = options[0];
    } else {
      let nearest = -1;
      let best = Infinity;
      for (let i = 0; i < n; i++) {
        if (visited.has(i)) continue;
        const d = dist2(current, i);
        if (d < best) {
          best = d;
          nearest = i;
        }
      }
      current = nearest;
    }
    visited.add(current);
    path.push(current);
  }

  return { path };
}
