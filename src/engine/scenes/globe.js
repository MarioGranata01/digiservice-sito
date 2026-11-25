import { TAU, red, grey, rng, smoothPointer, rotate, project, center, nearestEdges, line, dot, glow } from '../core.js';

/** Globo a rete con nodi rossi pulsanti. Opzioni: n, dots, reds, scale, cx, cy. */
export function globe(o = {}) {
  const r = rng(11), N = o.n || 260, pts = [], dots = [], reds = new Set(), S = smoothPointer();
  for (let i = 0; i < N; i++) {
    const y = 1 - (2 * (i + 0.5)) / N, q = Math.sqrt(1 - y * y), th = i * 2.399963;
    pts.push([Math.cos(th) * q, y, Math.sin(th) * q]);
  }
  const edges = nearestEdges(pts, { k: 3 });
  for (let i = 0; i < (o.dots || 1300); i++) {
    const la = Math.asin(2 * r() - 1), lo = r() * TAU;
    const f = Math.sin(lo * 2 + 1) * Math.cos(la * 3) + 0.6 * Math.sin(lo * 5) * Math.sin(la * 2 + 1);
    if (f > 0.3) dots.push([Math.cos(la) * Math.cos(lo), Math.sin(la), Math.cos(la) * Math.sin(lo)]);
  }
  while (reds.size < (o.reds || 16)) reds.add(Math.floor(r() * N));
  const redList = [...reds];

  return (ctx, w, h, t) => {
    const [px, py] = S(), sc = Math.min(w, h) * 0.43 * (o.scale || 1), [cx, cy] = center(o, w, h);
    const ry = t * 0.16 + px * 0.35, rx = 0.25 + py * 0.18;

    const g = ctx.createRadialGradient(cx - sc * 0.3, cy - sc * 0.35, sc * 0.1, cx, cy, sc * 1.05);
    g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.75, red(0.03)); g.addColorStop(1, red(0.16));
    dot(ctx, cx, cy, sc, g);
    ctx.strokeStyle = red(0.35); ctx.lineWidth = 1; ctx.stroke();

    const V = pts.map((p) => rotate(p, ry, rx)), Q = V.map((v) => project(v, cx, cy, sc, 9));
    ctx.lineWidth = 0.8;
    for (const [i, j] of edges) {
      const z = (V[i][2] + V[j][2]) / 2;
      if (z < -0.15) continue;
      ctx.strokeStyle = red(0.1 + (0.4 * (z + 0.15)) / 1.15);
      line(ctx, Q[i], Q[j]);
    }
    for (const d of dots) {
      const v = rotate(d, ry, rx);
      if (v[2] < 0) continue;
      const q = project(v, cx, cy, sc, 9);
      ctx.fillStyle = red(0.12 + 0.5 * v[2]);
      ctx.fillRect(q[0], q[1], 1.6, 1.6);
    }
    pts.forEach((_, i) => {
      if (V[i][2] < -0.1 || reds.has(i)) return;
      dot(ctx, Q[i][0], Q[i][1], 2, grey(0.3 + 0.5 * V[i][2]));
    });
    redList.forEach((i) => {
      if (V[i][2] < -0.3) return;
      glow(ctx, Q[i][0], Q[i][1], 2.6 + V[i][2] * 1.6, 0.5 + 0.5 * Math.max(0, V[i][2]));
    });
    const pi = redList.find((i) => V[i][2] > 0.3);
    if (pi != null) {
      const f = (t % 2.4) / 2.4;
      ctx.strokeStyle = red(0.6 * (1 - f)); ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(Q[pi][0], Q[pi][1], 6 + f * sc * 0.18, 0, TAU); ctx.stroke();
    }
  };
}
