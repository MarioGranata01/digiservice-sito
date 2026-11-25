import { TAU, red, white, smoothPointer, rotate, project, center, path, glow } from '../core.js';

const STAGES = [[-0.75, 'BUILD'], [0.75, 'TEST'], [Math.PI - 0.75, 'DEPLOY'], [Math.PI + 0.75, 'RUN']];

/** Lemniscata (simbolo ∞) in 3D. */
const lemniscate = (a) => {
  const d = 1 + Math.sin(a) ** 2;
  return [(1.3 * Math.cos(a)) / d, (2.2 * Math.sin(a) * Math.cos(a)) / d, 0.3 * Math.sin(a * 2 + 0.5)];
};

/** Ciclo DevOps infinito con le fasi etichettate. Opzioni: scale, cx, cy. */
export function loop(o = {}) {
  const S = smoothPointer();

  return (ctx, w, h, t) => {
    const [px, py] = S(), sc = Math.min(w * 0.36, h * 0.8) * (o.scale || 1), [cx, cy] = center(o, w, h);
    const ry = Math.sin(t * 0.3) * 0.4 + px * 0.25, rx = 0.35 + py * 0.1;
    const pj = (a) => project(rotate(lemniscate(a), ry, rx), cx, cy, sc, 6);

    const pts = [];
    for (let i = 0; i <= 200; i++) pts.push(pj((i / 200) * TAU));
    ctx.lineCap = 'round';
    path(ctx, pts);
    ctx.strokeStyle = red(0.16); ctx.lineWidth = 14; ctx.stroke();
    ctx.strokeStyle = red(0.75); ctx.lineWidth = 2; ctx.stroke();
    ctx.strokeStyle = white(0.8); ctx.lineWidth = 0.8; ctx.stroke();
    ctx.lineCap = 'butt';

    for (let k = 0; k < 6; k++) { const q = pj(t * 0.7 + (k * TAU) / 6); glow(ctx, q[0], q[1], 3, 0.9); }

    ctx.font = '600 11px JetBrains Mono,monospace'; ctx.textAlign = 'center';
    STAGES.forEach(([a, label]) => {
      const q = pj(a);
      ctx.fillStyle = '#fff'; ctx.strokeStyle = red(1); ctx.lineWidth = 2.5;
      ctx.beginPath(); ctx.arc(q[0], q[1], 10, 0, TAU); ctx.fill(); ctx.stroke();
      ctx.fillStyle = red(1); ctx.beginPath(); ctx.arc(q[0], q[1], 3.5, 0, TAU); ctx.fill();
      ctx.fillStyle = '#1C2733'; ctx.fillText(label, q[0], q[1] - 20);
    });
  };
}
