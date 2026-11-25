/* Primitive condivise da tutte le scene: matematica 3D, colori, disegno. */

export const TAU = Math.PI * 2;
export const RED = '200,16,22';
export const RED_LIGHT = '255,90,82';
export const GREY = '120,128,140';
export const red = (a) => `rgba(${RED},${a})`;
export const white = (a) => `rgba(255,255,255,${a})`;
export const grey = (a) => `rgba(${GREY},${a})`;

/* ---------- puntatore (parallasse) ---------- */
const pointer = { x: 0, y: 0 };
addEventListener('pointermove', (e) => {
  pointer.x = (e.clientX / innerWidth - 0.5) * 2;
  pointer.y = (e.clientY / innerHeight - 0.5) * 2;
}, { passive: true });

/** Restituisce una funzione che segue il puntatore con smorzamento: () => [x, y]. */
export function smoothPointer(k = 0.06) {
  let x = 0, y = 0;
  return () => { x += (pointer.x - x) * k; y += (pointer.y - y) * k; return [x, y]; };
}

/** Generatore pseudo-casuale deterministico (stessa forma a ogni caricamento). */
export const rng = (seed) => () => (seed = (seed * 16807) % 2147483647) / 2147483647;

/* ---------- geometria ---------- */
/** Ruota il punto p attorno all'asse Y (ry) e poi X (rx). */
export function rotate(p, ry, rx) {
  let c = Math.cos(ry), s = Math.sin(ry);
  const x = p[0] * c + p[2] * s, z = -p[0] * s + p[2] * c;
  c = Math.cos(rx); s = Math.sin(rx);
  return [x, p[1] * c - z * s, p[1] * s + z * c];
}

/** Proiezione prospettica: [x, y, fattoreScala]. */
export function project(p, cx, cy, sc, D = 7) {
  const k = D / (D - p[2]);
  return [cx + p[0] * sc * k, cy - p[1] * sc * k, k];
}

/** Centro della scena in pixel, con default sovrascrivibili da o.cx / o.cy. */
export function center(o, w, h, dcx = 0.5, dcy = 0.5) {
  return [w * (o.cx ?? dcx), h * (o.cy ?? dcy)];
}

const dist2 = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2;

/**
 * Collega ogni punto ai k vicini più prossimi.
 * forwardOnly: considera solo j > i.  maxDist: scarta i vicini oltre questa distanza.
 */
export function nearestEdges(pts, { k, maxDist = Infinity, forwardOnly = false }) {
  const edges = [], seen = new Set(), max2 = maxDist * maxDist;
  pts.forEach((a, i) => {
    pts.map((b, j) => [j, dist2(a, b)])
      .filter(([j, d]) => (forwardOnly ? j > i : j !== i) && d < max2)
      .sort((m, n) => m[1] - n[1])
      .slice(0, k)
      .forEach(([j]) => {
        const key = i < j ? `${i}_${j}` : `${j}_${i}`;
        if (!seen.has(key)) { seen.add(key); edges.push([i, j]); }
      });
  });
  return edges;
}

/* ---------- disegno ---------- */
export function line(ctx, a, b) {
  ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(b[0], b[1]); ctx.stroke();
}

/** Traccia un percorso (senza fill/stroke): il chiamante decide cosa farne. */
export function path(ctx, pts, close = false) {
  ctx.beginPath();
  pts.forEach((q, i) => (i ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1])));
  if (close) ctx.closePath();
}

export function dot(ctx, x, y, r, fill) {
  if (fill) ctx.fillStyle = fill;
  ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); ctx.fill();
}

/** Punto rosso luminoso con alone. */
export function glow(ctx, x, y, r, a = 1) {
  const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
  g.addColorStop(0, `rgba(${RED_LIGHT},${a})`);
  g.addColorStop(0.25, red(a * 0.45));
  g.addColorStop(1, red(0));
  dot(ctx, x, y, r * 4, g);
  dot(ctx, x, y, r, red(Math.min(1, a + 0.15)));
}

/** Alone radiale rosso che sfuma a trasparente. */
export function halo(ctx, x, y, r, a, r0 = 0) {
  const g = ctx.createRadialGradient(x, y, r0, x, y, r);
  g.addColorStop(0, red(a));
  g.addColorStop(1, red(0));
  dot(ctx, x, y, r, g);
}

/** Alone schiacciato in verticale (ombra/riflesso su un "pavimento"). */
export function floorHalo(ctx, x, y, r, a, squash) {
  ctx.save();
  ctx.translate(0, y); ctx.scale(1, squash); ctx.translate(0, -y);
  halo(ctx, x, y, r, a);
  ctx.restore();
}
