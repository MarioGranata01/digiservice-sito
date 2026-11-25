import { TAU, red, white, grey, rng, smoothPointer, rotate, project, center, line, path, dot, glow, halo } from '../core.js';

const OUTLINE = [[-0.62, 0.55], [0, 0.82], [0.62, 0.55], [0.62, 0], [0.44, -0.42], [0, -0.82], [-0.44, -0.42], [-0.62, 0]];
const CHECK = [[-0.27, -0.02], [-0.07, -0.24], [0.3, 0.27]];

/** Scudo a strati con spunta e linea di scansione. Opzioni: scale, cx, cy. */
export function shield(o = {}) {
  const S = smoothPointer(), r = rng(4), nodes = [];
  for (let i = 0; i < 16; i++) {
    const a = r() * TAU, d = 1.05 + r() * 0.5;
    nodes.push([Math.cos(a) * d * 1.15, Math.sin(a) * d * 0.85, (r() - 0.5) * 0.9, r() < 0.4, i % 8]);
  }

  return (ctx, w, h, t) => {
    const [px, py] = S(), sc = Math.min(w, h) * 0.34 * (o.scale || 1), [cx, cy] = center(o, w, h);
    const ry = Math.sin(t * 0.4) * 0.55 + px * 0.3, rx = 0.1 + py * 0.1;
    const pj = (x, y, z) => project(rotate([x, y, z], ry, rx), cx, cy, sc, 6);

    halo(ctx, cx, cy, sc * 1.3, 0.2);
    nodes.forEach((n) => {
      const a = pj(n[0], n[1], n[2]), b = pj(OUTLINE[n[4]][0], OUTLINE[n[4]][1], 0);
      ctx.strokeStyle = red(0.22); ctx.lineWidth = 0.8; line(ctx, a, b);
      if (n[3]) glow(ctx, a[0], a[1], 2.6, 0.85);
      else dot(ctx, a[0], a[1], 2.2, grey(0.7));
    });

    const layer = (z, al) => {
      path(ctx, OUTLINE.map((p) => pj(p[0], p[1], z)), true);
      ctx.fillStyle = red(al); ctx.fill();
      ctx.strokeStyle = white(0.85); ctx.lineWidth = 1.4; ctx.stroke();
      ctx.strokeStyle = 'rgba(150,0,10,.3)'; ctx.lineWidth = 0.7; ctx.stroke();
    };
    layer(-0.2, 0.16); layer(-0.1, 0.2);
    ctx.strokeStyle = white(0.6); ctx.lineWidth = 1;
    OUTLINE.forEach((p) => line(ctx, pj(p[0], p[1], -0.2), pj(p[0], p[1], 0.2)));
    layer(0, 0.22); layer(0.2, 0.4);

    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    path(ctx, CHECK.map((p) => pj(p[0], p[1], 0.22)));
    ctx.strokeStyle = red(0.35); ctx.lineWidth = 12; ctx.stroke();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.stroke();

    const y = Math.sin(t * 1.1) * 0.62, a = pj(-0.6, y, 0.22), b = pj(0.6, y, 0.22);
    const lg = ctx.createLinearGradient(a[0], a[1], b[0], b[1]);
    lg.addColorStop(0, white(0)); lg.addColorStop(0.5, white(0.95)); lg.addColorStop(1, white(0));
    ctx.strokeStyle = lg; ctx.lineWidth = 2; line(ctx, a, b);
    ctx.lineCap = 'butt';
  };
}
