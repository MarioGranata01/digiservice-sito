import { TAU, red, white, rng, smoothPointer, rotate, project, center, nearestEdges, line, dot, glow, floorHalo } from '../core.js';

const SPHERES = [[-0.78, -0.12, 0.36], [-0.42, 0.16, 0.5], [0.02, 0.36, 0.64], [0.5, 0.14, 0.52], [0.84, -0.1, 0.38], [0, -0.12, 0.58]];
const FLOOR = -0.46, GRID_Y = -0.64;

/** Nuvola di sfere a rete sopra una griglia con "pin". Opzioni: scale, cx, cy. */
export function cloud(o = {}) {
  const r = rng(5), S = smoothPointer(), pts = [], pins = [];
  SPHERES.forEach((s, si) => {
    for (let k = 0; k < 80; k++) {
      const u = r() * 2 - 1, th = r() * TAU, q = Math.sqrt(1 - u * u);
      const p = [s[0] + s[2] * q * Math.cos(th), s[1] + s[2] * u, s[2] * q * Math.sin(th) * 0.75];
      if (p[1] < FLOOR) p[1] = FLOOR;
      const hidden = SPHERES.some((t, ti) => ti !== si && (p[0] - t[0]) ** 2 + (p[1] - t[1]) ** 2 + (p[2] / 0.75) ** 2 < (t[2] * 0.96) ** 2);
      if (!hidden) pts.push(p);
    }
  });
  const edges = nearestEdges(pts, { k: 2, maxDist: 0.36, forwardOnly: true });
  for (let i = 0; i < 18; i++) pins.push([(r() * 2 - 1) * 1.35, GRID_Y, (r() * 2 - 1) * 0.9, 0.5 + r() * 0.9]);

  return (ctx, w, h, t) => {
    const [px, py] = S(), sc = Math.min(w * 0.32, h * 0.46) * (o.scale || 1), [cx, cy] = center(o, w, h, 0.5, 0.52);
    const ry = Math.sin(t * 0.35) * 0.5 + px * 0.3, rx = 0.33 + py * 0.1;
    const pj = (p) => { const v = rotate(p, ry, rx); return project(v, cx, cy, sc, 6).concat(v[2]); };

    // griglia del pavimento
    ctx.lineWidth = 1; ctx.strokeStyle = red(0.28); ctx.beginPath();
    for (let i = -4; i <= 4; i++) {
      let a = pj([i * 0.4, GRID_Y, -1.6]), b = pj([i * 0.4, GRID_Y, 1.6]);
      ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]);
      a = pj([-1.6, GRID_Y, i * 0.4]); b = pj([1.6, GRID_Y, i * 0.4]);
      ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]);
    }
    ctx.stroke();

    pins.forEach((p, i) => {
      const a = pj(p), b = pj([p[0], p[3] - 0.4, p[2]]);
      ctx.strokeStyle = red(0.45); line(ctx, a, b);
      if (i % 3 === 0) glow(ctx, b[0], b[1], 3.2, 0.9);
      else dot(ctx, b[0], b[1], 2.6, red(0.8));
    });

    const fy = pj([0, FLOOR, 0])[1];
    floorHalo(ctx, cx, fy, sc * 1.6, 0.25, 0.28);

    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, w, fy + sc * 0.04); ctx.clip();
    SPHERES
      .map((s) => ({ q: pj([s[0], s[1], 0]), r: s[2] }))
      .sort((a, b) => a.q[3] - b.q[3])
      .forEach(({ q, r: sr }) => {
        const rr = sr * sc * q[2], g = ctx.createRadialGradient(q[0], q[1], 0, q[0], q[1], rr);
        g.addColorStop(0, 'rgba(70,0,8,.5)'); g.addColorStop(0.7, red(0.26)); g.addColorStop(1, red(0.08));
        dot(ctx, q[0], q[1], rr, g);
      });
    const Q = pts.map(pj);
    ctx.lineWidth = 0.8;
    for (const [i, j] of edges) { ctx.strokeStyle = white(0.25 + (0.35 * (Q[i][3] + 1)) / 2); line(ctx, Q[i], Q[j]); }
    Q.forEach((q, i) => {
      if (i % 9 === 0) glow(ctx, q[0], q[1], 2.4, 0.95);
      else dot(ctx, q[0], q[1], 1.5, white(0.5 + (0.4 * (q[3] + 1)) / 2));
    });
    ctx.restore();

    ctx.strokeStyle = white(0.8); ctx.lineWidth = 1.5;
    line(ctx, pj([-1.0, FLOOR, 0]), pj([1.05, FLOOR, 0]));
  };
}
