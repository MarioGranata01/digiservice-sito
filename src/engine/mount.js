import * as scenes from './scenes/index.js';

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let active = [];

/** Avvia una scena su un canvas: si ridimensiona da sola e si anima solo quando è visibile. */
function mount(canvas) {
  const factory = scenes[canvas.dataset.s];
  if (!factory) return null;
  let opts = {};
  try { opts = JSON.parse(canvas.dataset.o || '{}'); } catch { /* opzioni non valide: uso i default */ }

  const scene = factory(opts), ctx = canvas.getContext('2d');
  // Fotogramma fisso: sempre (data-still) oppure finché la card (data-hover) non ha il mouse sopra
  // o non viene accesa dal «riflettore» (shell/spotlight.js, eventi scene:on / scene:off)
  const hoverEl = canvas.hasAttribute('data-hover') ? canvas.closest('.card') ?? canvas.parentElement : null;
  let hovering = false, live = false;
  const still = () => reduceMotion || canvas.hasAttribute('data-still') || (hoverEl && !hovering && !live);
  let w = 0, h = 0, visible = false, raf = 0, t = still() ? 3 : 0, last = 0;

  const draw = () => { if (!w || !h) return; ctx.clearRect(0, 0, w, h); scene(ctx, w, h, t); };
  const resize = () => {
    const r = canvas.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    if (!w || !h) return;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    draw();
  };
  const start = () => { if (visible && !still() && !raf) { last = performance.now(); raf = requestAnimationFrame(tick); } };
  const enter = () => { hovering = true; start(); };
  const leave = () => { hovering = false; };
  const on = () => { live = true; start(); };
  const off = () => { live = false; };
  hoverEl?.addEventListener('mouseenter', enter);
  hoverEl?.addEventListener('mouseleave', leave);
  hoverEl?.addEventListener('scene:on', on);
  hoverEl?.addEventListener('scene:off', off);
  const tick = (now) => {
    raf = 0;
    if (!visible || still()) return;
    t += Math.min((now - last) / 1000, 0.05); last = now;
    draw();
    raf = requestAnimationFrame(tick);
  };

  const ro = new ResizeObserver(resize);
  const io = new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    start();
  }, { rootMargin: '120px' });
  ro.observe(canvas);
  io.observe(canvas);

  return () => {
    ro.disconnect(); io.disconnect(); cancelAnimationFrame(raf);
    hoverEl?.removeEventListener('mouseenter', enter);
    hoverEl?.removeEventListener('mouseleave', leave);
    hoverEl?.removeEventListener('scene:on', on);
    hoverEl?.removeEventListener('scene:off', off);
  };
}

/** Avvia tutte le scene dentro root, fermando quelle della pagina precedente. */
export function mountScenes(root = document) {
  active.forEach((stop) => stop());
  active = [...root.querySelectorAll('canvas[data-s]')].map(mount).filter(Boolean);
}
