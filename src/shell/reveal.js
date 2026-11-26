import { $$ } from '../lib/html.js';

/*
 * Dinamismo leggero allo scorrimento:
 *  - gli elementi elencati in TARGETS compaiono salendo appena quando entrano nello schermo
 *    (quelli nello stesso contenitore escono uno dopo l'altro);
 *  - i numeri con data-count contano fino al loro valore la prima volta che si vedono.
 * Con «riduci movimento» attivo non succede nulla: tutto è subito visibile.
 */
const TARGETS = [
  '.head-row', '.about-tx', '.about-values',
  '.svc-grid .card', '.svc-more',
  '.pt-main', '.pt-box', '.pt-prod',
  '.ft-cta', '.ft .g > div',
].join(',');

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
let io = null;

/** Conta da `from` al valore finale in ~1.4 s, mantenendo prefisso/suffisso (es. «10+»). */
function countUp(el) {
  const [, pre, num, post] = el.textContent.match(/^(\D*)(\d+)(\D*)$/) || [];
  if (!num) return;
  const to = +num, from = el.dataset.count ? +el.dataset.count : 0, t0 = performance.now(), dur = 1400;
  const step = (now) => {
    const p = Math.min((now - t0) / dur, 1), e = 1 - (1 - p) ** 3; // rallenta alla fine
    el.textContent = `${pre}${Math.round(from + (to - from) * e)}${post}`;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const show = (el) => {
  el.classList.add('is-in');
  if (el.matches('[data-count]')) countUp(el);
  // finita l'entrata, l'elemento torna «normale» (così gli effetti al passaggio del mouse restano rapidi)
  el.addEventListener('transitionend', () => { el.classList.remove('reveal', 'is-in'); el.style.transitionDelay = ''; }, { once: true });
};

/** Prepara le animazioni d'ingresso dentro root (pagina appena generata, oppure il footer). */
export function initReveal(root = document) {
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  io ??= new IntersectionObserver((entries) => entries.forEach((e) => {
    if (!e.isIntersecting) return;
    io.unobserve(e.target);
    show(e.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

  $$(TARGETS, root).forEach((el) => {
    const siblings = [...el.parentNode.children].filter((x) => x.matches(TARGETS));
    el.style.transitionDelay = `${Math.min(siblings.indexOf(el), 6) * 90}ms`;
    el.classList.add('reveal');
    io.observe(el);
  });
  // I numeri non «salgono»: contano soltanto
  $$('[data-count]', root).forEach((el) => io.observe(el));
}
