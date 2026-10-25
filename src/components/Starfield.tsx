import { useEffect, useRef } from "react";
import {
  VERTICES,
  SIZES,
  TRIANGLE_EDGES,
  isMeshEdge,
  generateRoute,
} from "../lib/starPath";

export const GROUP_COUNT = 3;

const ROUTE = generateRoute();
const ORDER_OF: number[] = new Array(VERTICES.length).fill(-1);
ROUTE.path.forEach((v, i) => (ORDER_OF[v] = i));

type Props = {
  focusGroup: number | null;
};

const CYAN = [69, 176, 255];
const EMERALD = [61, 135, 250];
const STAR = [233, 242, 251];
const PALETTE = [STAR, CYAN, EMERALD, [170, 205, 255]];

const rnd = (i: number) => {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function makeSprite(rgb: number[]): HTMLCanvasElement {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grad.addColorStop(0, "rgba(255,255,255,0.95)");
  grad.addColorStop(0.14, `rgba(${rgb.join(",")},0.9)`);
  grad.addColorStop(0.4, `rgba(${rgb.join(",")},0.28)`);
  grad.addColorStop(1, `rgba(${rgb.join(",")},0)`);
  g.fillStyle = grad;
  g.fillRect(0, 0, s, s);
  return c;
}

function makeNoiseTile(): HTMLCanvasElement {
  const s = 128;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const g = c.getContext("2d")!;
  const img = g.createImageData(s, s);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random() * 255;
    img.data[i] = v;
    img.data[i + 1] = v;
    img.data[i + 2] = v;
    img.data[i + 3] = 26 + Math.random() * 34;
  }
  g.putImageData(img, 0, 0);
  return c;
}

function mix(a: number[], b: number[], t: number): string {
  return `${Math.round(a[0] + (b[0] - a[0]) * t)}, ${Math.round(
    a[1] + (b[1] - a[1]) * t
  )}, ${Math.round(a[2] + (b[2] - a[2]) * t)}`;
}

export default function Starfield({ focusGroup }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const focusRef = useRef<number | null>(focusGroup);
  focusRef.current = focusGroup;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sprites = PALETTE.map(makeSprite);
    const noisePattern = ctx.createPattern(makeNoiseTile(), "repeat")!;
    const visitedTime = new Float64Array(VERTICES.length).fill(-1);

    const L = ROUTE.path.length;
    const starColor = PALETTE.map(() => 0);
    const starSpeed: number[] = [];
    const starPhase: number[] = [];
    for (let i = 0; i < VERTICES.length; i++) {
      const r = rnd(i * 13 + 5);
      const big = SIZES[i] >= 7;
      starColor[i] = big
        ? r < 0.3
          ? 0
          : r < 0.6
          ? 1
          : r < 0.9
          ? 2
          : 3
        : r < 0.72
        ? 0
        : r < 0.86
        ? 1
        : r < 0.96
        ? 2
        : 3;
      starSpeed[i] = 0.6 + rnd(i * 3 + 1) * 2.4;
      starPhase[i] = rnd(i * 7 + 2) * Math.PI * 2;
    }

    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    for (const [x, y] of VERTICES) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }

    let w = 0,
      h = 0,
      dpr = 1,
      scale = 1,
      ox = 0,
      oy = 0,
      starFactor = 1;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, w < 768 ? 1.5 : 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ww = maxX - minX;
      const wh = maxY - minY;
      scale = Math.max(w / ww, h / wh);
      ox = (w - ww * scale) / 2 - minX * scale;
      oy = (h - wh * scale) / 2 - minY * scale;
      starFactor = Math.min(Math.max(scale, 0.35), 1.2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced.matches) draw(0, 1, 0);
    };

    const toScreen = (i: number, dx: number, dy: number): [number, number] => [
      ox + VERTICES[i][0] * scale + dx,
      oy + VERTICES[i][1] * scale + dy,
    ];

    const scrollProgress = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
    };

    const groupFor = (seq: number) => Math.floor((seq * GROUP_COUNT) / L);

    const draw = (t: number, progress: number, drift: number) => {
      ctx.clearRect(0, 0, w, h);

      const g1 = ctx.createRadialGradient(w * 0.18, h * 0.12, 0, w * 0.18, h * 0.12, Math.max(w, h) * 0.55);
      g1.addColorStop(0, "rgba(69, 176, 255, 0.032)");
      g1.addColorStop(1, "rgba(69, 176, 255, 0)");
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);
      const g2 = ctx.createRadialGradient(w * 0.85, h * 0.8, 0, w * 0.85, h * 0.8, Math.max(w, h) * 0.6);
      g2.addColorStop(0, "rgba(61, 135, 250, 0.028)");
      g2.addColorStop(1, "rgba(61, 135, 250, 0)");
      ctx.fillStyle = g2;
      ctx.fillRect(0, 0, w, h);

      const driftX = reduced.matches ? 0 : Math.sin(drift * 0.05) * 6;
      const driftY = reduced.matches
        ? 0
        : -progress * h * 0.12 + Math.cos(drift * 0.04) * 5;

      ctx.lineCap = "round";
      ctx.lineWidth = 3.5;
      ctx.strokeStyle = "rgba(69, 176, 255, 0.012)";
      ctx.beginPath();
      for (const [a, b] of TRIANGLE_EDGES) {
        const [ax, ay] = toScreen(a, driftX, driftY);
        const [bx, by] = toScreen(b, driftX, driftY);
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
      }
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(170, 205, 255, 0.022)";
      ctx.stroke();

      const litFloat = reduced.matches ? L - 1 : progress * (L - 1);
      const litCount = Math.floor(litFloat);
      const frac = reduced.matches ? 1 : litFloat - litCount;

      for (let i = 0; i < L - 1; i++) {
        if (i > litCount) break;
        const reach = i === litCount ? frac : 1;
        if (reach <= 0.01) continue;
        const a = ROUTE.path[i];
        const an = ROUTE.path[i + 1];
        const [ax, ay] = toScreen(a, driftX, driftY);
        const bx =
          ox + (VERTICES[a][0] + (VERTICES[an][0] - VERTICES[a][0]) * reach) * scale + driftX;
        const by =
          oy + (VERTICES[a][1] + (VERTICES[an][1] - VERTICES[a][1]) * reach) * scale + driftY;
        const rgb = mix(CYAN, EMERALD, i / (L - 1));
        const dim = isMeshEdge(a, an) ? 1 : 0.45;
        const recency = reduced.matches
          ? 0
          : Math.pow(Math.max(0, 1 - (litCount - i) / 7), 2);
        ctx.lineWidth = 5;
        ctx.strokeStyle = `rgba(${rgb}, ${(0.013 + recency * 0.035) * dim})`;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.lineWidth = 1.3;
        ctx.strokeStyle = `rgba(${rgb}, ${(0.03 + 0.045 * reach + recency * 0.14) * dim})`;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
      }

      for (let i = 0; i < VERTICES.length; i++) {
        const [sx, sy] = toScreen(i, driftX, driftY);
        if (sx < -40 || sx > w + 40 || sy < -40 || sy > h + 40) continue;

        let intensity = reduced.matches
          ? 0.32
          : 0.1 + 0.42 * Math.pow(0.5 + 0.5 * Math.sin(t * starSpeed[i] + starPhase[i]), 2);

        if (flareIdx === i) {
          const dt = t - flareStart;
          if (dt >= 0 && dt < 0.6) {
            const s = Math.sin((Math.PI * dt) / 0.6);
            intensity = Math.min(1, intensity + s * s * 0.55);
          }
        }

        const seq = ORDER_OF[i];
        const lit = seq !== -1 && seq <= litCount;
        const inGroup =
          seq !== -1 && focusRef.current !== null && groupFor(seq) === focusRef.current;
        let pulse = 0;
        if (lit) {
          if (visitedTime[i] < 0) visitedTime[i] = t;
          const age = reduced.matches ? 99 : t - visitedTime[i];
          const flash = age < 2.4 ? Math.pow(1 - age / 2.4, 2) * 0.55 : 0;
          pulse = 0.06 + flash;
        }
        if (inGroup) pulse += 0.28 + 0.12 * Math.sin(t * 3 + seq * 0.5);
        intensity = Math.min(1, intensity + pulse * (reduced.matches ? 0.4 : 1));

        const rgb = PALETTE[starColor[i]];
        const core = Math.max(SIZES[i] * 0.4 * starFactor, 1.2);
        const rad = core * (2.2 + intensity * 1.4);

        ctx.globalAlpha = 0.08 + 0.4 * intensity;
        ctx.drawImage(sprites[starColor[i]], sx - rad, sy - rad, rad * 2, rad * 2);
        ctx.globalAlpha = 1;

        ctx.fillStyle = `rgba(${rgb.join(",")}, ${0.28 + 0.52 * intensity})`;
        ctx.beginPath();
        ctx.arc(sx, sy, core * (0.75 + intensity * 0.35), 0, Math.PI * 2);
        ctx.fill();

        if (intensity > 0.9) {
          ctx.strokeStyle = `rgba(255,255,255,${(intensity - 0.9) * 1.6})`;
          ctx.lineWidth = 1;
          const sp = rad * 0.9;
          ctx.beginPath();
          ctx.moveTo(sx - sp, sy);
          ctx.lineTo(sx + sp, sy);
          ctx.moveTo(sx, sy - sp);
          ctx.lineTo(sx, sy + sp);
          ctx.stroke();
        }
      }

      if (!reduced.matches && litCount < L - 1 && frac > 0.02) {
        const a = ROUTE.path[litCount];
        const b = ROUTE.path[litCount + 1];
        const px = ox + (VERTICES[a][0] + (VERTICES[b][0] - VERTICES[a][0]) * frac) * scale + driftX;
        const py = oy + (VERTICES[a][1] + (VERTICES[b][1] - VERTICES[a][1]) * frac) * scale + driftY;
        const r = 11 + 3 * Math.sin(t * 6);
        ctx.globalAlpha = 0.5 + 0.15 * Math.sin(t * 3);
        ctx.drawImage(sprites[1], px - r, py - r, r * 2, r * 2);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "rgba(255,255,255,0.7)";
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 0.05;
      ctx.fillStyle = noisePattern;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;

      const vig = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.75);
      vig.addColorStop(0, "rgba(5, 11, 22, 0)");
      vig.addColorStop(1, "rgba(5, 11, 22, 0.55)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, w, h);
    };

    let raf = 0;
    let smoothed = scrollProgress();
    const start = performance.now();
    let flareIdx = -1;
    let flareStart = -10;
    let nextFlareAt = 0.8;

    const loop = (now: number) => {
      const t = (now - start) / 1000;
      if (t >= nextFlareAt) {
        flareIdx = Math.floor(Math.random() * VERTICES.length);
        flareStart = t;
        nextFlareAt = t + 1.4 + Math.random() * 2.4;
      }
      smoothed += (scrollProgress() - smoothed) * 0.07;
      draw(t, smoothed, t);
      raf = requestAnimationFrame(loop);
    };

    resize();
    window.addEventListener("resize", resize);

    if (reduced.matches) {
      draw(0, scrollProgress(), 0);
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onVisibility = () => {
      if (reduced.matches) return;
      if (document.hidden) cancelAnimationFrame(raf);
      else raf = requestAnimationFrame(loop);
    };
    document.addEventListener("visibilitychange", onVisibility);
    const motionHandler = () => resize();
    reduced.addEventListener("change", motionHandler);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      reduced.removeEventListener("change", motionHandler);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10"
    />
  );
}
