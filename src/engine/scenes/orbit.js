import { TAU, red, white, grey, rng, smoothPointer, rotate, project, center, path, dot, glow, halo } from '../core.js';

const RADII = [0.6, 0.9, 1.2, 1.5];
const TILTS = [[0.9, 0.2], [0.5, -0.6], [1.2, 0.9], [0.7, 1.4]];

/** Nucleo rosso con anelli orbitali. Opzioni: rings (1-4), scale, cx, cy. */
export function orbit(o = {}) {
  const S = smoothPointer(), r = rng(9), rings = o.rings || 3, radii = RADII.slice(0, rings), nodes = [];
  radii.forEach((R, i) => {
    const n = 3 + i;
    for (let k = 0; k < n; k++) {
      nodes.push({ i, R, a: (k / n) * TAU + r(), sp: (0.25 + r() * 0.2) * (i % 2 ? -1 : 1), red: r() < 0.5, rr: 3 + r() * 3 });
    }
  });

  return (ctx, w, h, t) => {
    const [px, py] = S(), sc = Math.min(w, h) * (rings > 3 ? 0.27 : 0.3) * (o.scale || 1), [cx, cy] = center(o, w, h);
    const ry0 = t * 0.12 + px * 0.3, rx0 = 0.15 + py * 0.12;
    const ringPoint = (i, R, a) => rotate(rotate([Math.cos(a) * R, 0, Math.sin(a) * R], TILTS[i][1], TILTS[i][0]), ry0, rx0);

    ctx.lineWidth = 1;
    radii.forEach((R, i) => {
      ctx.strokeStyle = red(0.34 - i * 0.05);
      const pts = [];
      for (let k = 0; k <= 72; k++) pts.push(project(ringPoint(i, R, (k / 72) * TAU), cx, cy, sc, 6));
      path(ctx, pts); ctx.stroke();
    });

    const pos = nodes
      .map((n) => { const v = ringPoint(n.i, n.R, n.a + t * n.sp); return { n, v, q: project(v, cx, cy, sc, 6) }; })
      .sort((a, b) => a.v[2] - b.v[2]);
    const drawNode = ({ n, v, q }) => {
      const al = 0.5 + (0.5 * (v[2] + 1.5)) / 3;
      if (n.red) { glow(ctx, q[0], q[1], n.rr * q[2] * 0.8, al); return; }
      ctx.fillStyle = white(al); ctx.strokeStyle = grey(0.7); ctx.lineWidth = 1.2;
      ctx.beginPath(); ctx.arc(q[0], q[1], n.rr * q[2] * 0.9, 0, TAU); ctx.fill(); ctx.stroke();
    };

    pos.filter((p) => p.v[2] < 0).forEach(drawNode);
    halo(ctx, cx, cy, sc * 0.9, 0.28, sc * 0.2);
    const core = ctx.createRadialGradient(cx - sc * 0.1, cy - sc * 0.12, 0, cx, cy, sc * 0.3);
    core.addColorStop(0, '#FF8A93'); core.addColorStop(0.45, '#E3000F'); core.addColorStop(1, '#7A0008');
    dot(ctx, cx, cy, sc * 0.28, core);
    ctx.fillStyle = white(0.55);
    ctx.beginPath(); ctx.ellipse(cx - sc * 0.09, cy - sc * 0.11, sc * 0.07, sc * 0.04, -0.6, 0, TAU); ctx.fill();
    pos.filter((p) => p.v[2] >= 0).forEach(drawNode);
  };
}
