# rawthil.com.ar

My corner of the web — an interactive map of the paths my work has taken.

Built with React + Vite + Tailwind, deployed on GitHub Pages. The background
mesh is rendered in real time from `src/data/star_map.json` (my own hand-drawn
map): 136 nodes and 150 triangles whose edges light up as you scroll.

```bash
npm install
npm run dev      # local dev
npm run build    # production build → dist/
```

Pushing to `main` deploys automatically via GitHub Actions
(`.github/workflows/deploy.yml` — set Pages source to "GitHub Actions").
