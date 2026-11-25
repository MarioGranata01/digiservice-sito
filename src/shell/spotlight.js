import { $$ } from '../lib/html.js';

/*
 * «Riflettore» sulle card dei servizi: quando la griglia è visibile, una card alla volta
 * si accende (bordo rosso, foto leggermente ingrandita); ogni 3,5 s
 * passa alla successiva. Se il mouse è sulla griglia il giro si ferma e comanda l'utente.
 * Gli eventi scene:on / scene:off restano per eventuali scene 3D nelle card (engine/mount.js).
 */
const STEP = 3500;
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let stops = [];

function spotlight(grid) {
  const cards = $$('.svc-card', grid);
  if (!cards.length) return () => {};
  let i = -1, timer = 0, visible = false, hovering = false;

  const off = () => { if (i >= 0) { cards[i].classList.remove('is-live'); cards[i].dispatchEvent(new Event('scene:off')); } };
  const next = () => {
    off();
    i = (i + 1) % cards.length;
    cards[i].classList.add('is-live');
    cards[i].dispatchEvent(new Event('scene:on'));
  };
  const run = () => {
    clearInterval(timer);
    if (visible && !hovering) { next(); timer = setInterval(next, STEP); } else off();
  };

  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; run(); }, { threshold: 0.25 });
  io.observe(grid);
  const enter = () => { hovering = true; run(); };
  const leave = () => { hovering = false; run(); };
  grid.addEventListener('mouseenter', enter);
  grid.addEventListener('mouseleave', leave);

  return () => {
    clearInterval(timer); io.disconnect(); off();
    grid.removeEventListener('mouseenter', enter);
    grid.removeEventListener('mouseleave', leave);
  };
}

/** Avvia il riflettore sulle griglie dei servizi dentro root, fermando quelli della pagina precedente. */
export function initSpotlight(root = document) {
  stops.forEach((stop) => stop());
  stops = reduceMotion ? [] : $$('.svc-grid', root).map(spotlight);
}
