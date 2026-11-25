import { TAU, red, grey, rng, smoothPointer, rotate, project, center, line, glow } from '../core.js';

/** Rete neurale a strati con impulsi. Opzioni: layers, scale, cx, cy. */
export function neural(o = {}) {
  const layers = o.layers || [4, 6, 7, 5, 3], S = smoothPointer(), r = rng(3), nodes = [], edges = [];
  layers.forEach((n, i) => {
    for (let j = 0; j < n; j++) {
      nodes.push({ i, x: (i / (layers.length - 1)) * 2 - 1, y: ((j + 0.5) / n) * 2 - 1, z: (r() - 0.5) * 0.9, hub: r() < 0.2 });
    }
  });
  const byLayer = layers.map((_, i) => nodes.filter((n) => n.i === i));
  for (let i = 0; i < layers.length - 1; i++) {
    byLayer[i].forEach((a) => byLayer[i + 1].forEach((b) => {
      if (r() < 0.72) edges.push({ a, b, ph: r(), sp: 0.15 + r() * 0.25, on: r() < 0.35 });
    }));
  }

  return (ctx, w, h, t) => {
    const [px, py] = S(), sc = Math.min(w / 2.3, h / 2.1) * (o.scale || 1), [cx, cy] = center(o, w, h);
    const ry = 0.45 + px * 0.25, rx = -0.1 + py * 0.15;
    nodes.forEach((n) => { n.s = project(rotate([n.x, -n.y * 0.8, n.z], ry, rx), cx, cy, sc, 6); });

    ctx.lineWidth = 0.9;
    for (const e of edges) { ctx.strokeStyle = e.on ? red(0.5) : grey(0.28); line(ctx, e.a.s, e.b.s); }
    for (const e of edges) {
      if (!e.on) continue;
      const f = (t * e.sp + e.ph) % 1;
      glow(ctx, e.a.s[0] + (e.b.s[0] - e.a.s[0]) * f, e.a.s[1] + (e.b.s[1] - e.a.s[1]) * f, 2.2, 0.85);
    }
    for (const n of nodes) {
      if (n.hub) { glow(ctx, n.s[0], n.s[1], 5 * n.s[2], 0.9); continue; }
      ctx.fillStyle = '#fff'; ctx.strokeStyle = red(0.75); ctx.lineWidth = 1.4;
      ctx.beginPath(); ctx.arc(n.s[0], n.s[1], 4.2 * n.s[2], 0, TAU); ctx.fill(); ctx.stroke();
    }
  };
}
