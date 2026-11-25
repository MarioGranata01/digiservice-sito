import { RED_LIGHT, red, smoothPointer, rotate, project, center, path, dot, glow, floorHalo } from '../core.js';

const VERTS = [[-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1]];
const FACES = [[0, 1, 2, 3], [4, 5, 6, 7], [0, 1, 5, 4], [2, 3, 7, 6], [0, 3, 7, 4], [1, 2, 6, 5]];
const NORMALS = [[0, 0, -1], [0, 0, 1], [0, -1, 0], [0, 1, 0], [-1, 0, 0], [1, 0, 0]];
const LIGHT = [-0.35, 0.8, 0.5];
const BASE = [[-1, 0, 0], [0, 0, 0], [1, 0, 0], [0, 0, -1], [0, 0, 1], [1, 0, 1], [-1, 0, -1], [0, 1, 0], [1, 1, 0], [0, 1, 1]];
const TRAVELLERS = [{ s: [-1, 1, 1], f: [-3.2, 1.6, 2.4], ph: 0 }, { s: [1, 1, -1], f: [3.4, 1.2, -2], ph: 2.1 }];

/** Cubi impilati che si compongono. Opzioni: small, scale, cx, cy. */
export function cubes(o = {}) {
  const S = smoothPointer(), gap = 0.44, size = 0.2;
  const base = o.small ? BASE.slice(0, 8) : BASE;

  return (ctx, w, h, t) => {
    const [px, py] = S(), sc = Math.min(w, h) * 0.34 * (o.scale || 1), [cx, cy] = center(o, w, h, 0.5, 0.55);
    const ry = -0.6 + Math.sin(t * 0.25) * 0.35 + px * 0.3, rx = 0.5 + py * 0.1;
    const pj = (p) => project(rotate(p, ry, rx), cx, cy, sc, 5);

    const list = base.map((b) => b.slice());
    list.push([0, 2 + 0.45 * (0.5 + 0.5 * Math.sin(t * 0.9)), 0]);
    TRAVELLERS.forEach((a) => {
      const k = Math.pow(0.5 + 0.5 * Math.cos(t * 0.6 + a.ph), 2);
      list.push(a.s.map((s, i) => s + (a.f[i] - s) * k));
    });

    const cp = pj([0, 0.5 * gap, 0]);
    floorHalo(ctx, cx, pj([0, -0.3, 0])[1], sc * 1.5, 0.3, 0.3);
    const hz = ctx.createRadialGradient(cp[0], cp[1], 0, cp[0], cp[1], sc * 0.9);
    hz.addColorStop(0, 'rgba(255,255,255,.9)'); hz.addColorStop(0.3, `rgba(${RED_LIGHT},.3)`); hz.addColorStop(1, red(0));
    dot(ctx, cp[0], cp[1], sc * 0.9, hz);

    const faces = [];
    list.forEach((c) => {
      const wc = [c[0] * gap, c[1] * gap - 0.1, c[2] * gap];
      const world = VERTS.map((v) => rotate([wc[0] + v[0] * size, wc[1] + v[1] * size, wc[2] + v[2] * size], ry, rx));
      const screen = world.map((v) => project(v, cx, cy, sc, 5));
      FACES.forEach((f, fi) => {
        const n = rotate(NORMALS[fi], ry, rx), lit = Math.max(0, n[0] * LIGHT[0] + n[1] * LIGHT[1] + n[2] * LIGHT[2]);
        faces.push({
          q: f.map((i) => screen[i]),
          z: f.reduce((a, i) => a + world[i][2], 0) / 4,
          a: n[2] > 0 ? 0.3 + 0.32 * lit : 0.14 + 0.1 * lit,
        });
      });
    });
    faces.sort((a, b) => a.z - b.z);
    for (const f of faces) {
      path(ctx, f.q, true);
      ctx.fillStyle = red(f.a); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.strokeStyle = 'rgba(150,0,10,.28)'; ctx.lineWidth = 0.6; ctx.stroke();
    }
    glow(ctx, cp[0], cp[1], 3, 0.9);
  };
}
