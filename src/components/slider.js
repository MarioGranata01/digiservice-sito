import { t } from '../lib/i18n.js';
import { accent, each, when, cls, $, $$ } from '../lib/html.js';
import { canvas } from './scene.js';
import { link } from './links.js';

/*
 * Apertura a pannello: a sinistra i messaggi che si alternano in dissolvenza,
 * a destra un contenuto fisso opzionale (aside, es. i numeri chiave).
 * Una slide può avere anche una scena 3D ferma (scene) o una foto di sfondo (image).
 * Il tempo di ogni slide è l'animazione della barretta di avanzamento: quando finisce si passa
 * alla slide successiva. Così la pausa (mouse sopra, focus, scheda nascosta) ferma anche il timer,
 * e con «riduci movimento» attivo lo scorrimento automatico non parte.
 */
const slide = (s, i, n) => `<div class="${cls('slide', s.image && 'slide--photo')}" role="group" aria-roledescription="slide" aria-label="${i + 1} ${t('di', 'of')} ${n}">
${s.image ? `<img class="slide-bg" src="${s.image}" alt="${s.alt ?? ''}"${i ? ' loading="lazy"' : ''}>` : ''}
<div class="slide-tx">
${when(s.label, () => `<p class="lab">${s.label}</p>`)}
<h2 class="slide-title">${accent(s.title)}</h2>
<p class="slide-text">${s.text}</p>
${link(s.cta.to, s.cta.label, 'primary')}
</div>
${when(!s.image && s.scene, () => `<div class="slide-visual">${canvas(s.scene, { still: true })}</div>`)}
</div>`;

const arrowBtn = (dir, label) =>
  `<button type="button" class="slider-arrow" data-go="${dir}" aria-label="${label}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="${dir < 0 ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'}"/></svg></button>`;

/**
 * { slides, seconds, label, heading, aside }
 * heading: titolo h1 nascosto (accessibilità/SEO) · aside: HTML fisso nella colonna di destra.
 */
export const slider = ({ slides, seconds = 7, label = t('In evidenza', 'Highlights'), heading, aside }) => `<section class="slider" aria-roledescription="${t('carosello', 'carousel')}" aria-label="${label}" style="--slide-time:${seconds}s">
${when(heading, () => `<h1 class="sr-only">${heading}</h1>`)}
<div class="in"><div class="${cls('slider-panel', aside && 'slider-panel--aside')}">
<div class="slider-deco" aria-hidden="true"><span class="slider-glow"></span></div>
<span class="slider-around slider-around--dots-a" aria-hidden="true"></span><span class="slider-around slider-around--dots-b" aria-hidden="true"></span><span class="slider-around slider-orbit" aria-hidden="true"><i></i></span>
<div class="slider-main">
<div class="slider-view">${each(slides, (s, i) => slide(s, i, slides.length))}</div>
<div class="slider-ui">
<div class="slider-dots">${each(slides, (s, i) => `<button type="button" data-to="${i}" aria-label="${t('Vai alla slide', 'Go to slide')} ${i + 1}"><span class="slider-bar"><i></i></span></button>`)}</div>
<div class="slider-arrows">${arrowBtn(-1, t('Slide precedente', 'Previous slide'))}${arrowBtn(1, t('Slide successiva', 'Next slide'))}</div>
</div>
</div>
${when(aside, () => `<div class="slider-aside">${aside}</div>`)}
</div></div>
</section>`;

/** Rende interattivo un carosello. Restituisce la funzione di pulizia. */
function mount(root) {
  const view = $('.slider-view', root);
  const slides = $$('.slide', root);
  const dots = $$('.slider-dots button', root);
  const n = slides.length;
  let current = -1;

  const go = (i) => {
    i = (i + n) % n;
    if (i === current) return;
    current = i;
    slides.forEach((s, k) => {
      s.classList.toggle('is-active', k === i);
      s.inert = k !== i; // link delle slide nascoste fuori dal giro del tab
    });
    dots.forEach((d, k) => {
      d.classList.toggle('is-active', k === i);
      if (k === i) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
  };

  const pause = (on) => root.classList.toggle('is-paused', on);
  const onClick = (e) => {
    const b = e.target.closest('[data-go],[data-to]');
    if (!b) return;
    go(b.dataset.to != null ? +b.dataset.to : current + +b.dataset.go);
  };
  const onEnd = (e) => { if (e.target.parentNode.parentNode === dots[current]) go(current + 1); };
  const onKey = (e) => {
    if (e.key === 'ArrowLeft') go(current - 1);
    if (e.key === 'ArrowRight') go(current + 1);
  };
  const onVisibility = () => pause(document.hidden);

  // Trascinamento col dito su mobile
  let x0 = null;
  const onDown = (e) => { x0 = e.clientX; };
  const onUp = (e) => {
    if (x0 == null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) go(current + (dx < 0 ? 1 : -1));
  };

  const listeners = [
    [root, 'click', onClick],
    [root, 'animationend', onEnd],
    [root, 'keydown', onKey],
    [root, 'mouseenter', () => pause(true)],
    [root, 'mouseleave', () => pause(false)],
    [root, 'focusin', () => pause(true)],
    [root, 'focusout', (e) => { if (!root.contains(e.relatedTarget)) pause(false); }],
    [view, 'pointerdown', onDown],
    [view, 'pointerup', onUp],
    [document, 'visibilitychange', onVisibility],
  ];
  listeners.forEach(([el, ev, fn]) => el.addEventListener(ev, fn));
  go(0);

  return () => listeners.forEach(([el, ev, fn]) => el.removeEventListener(ev, fn));
}

let active = [];

/** Avvia i caroselli dentro root, fermando quelli della pagina precedente. */
export function mountSliders(root = document) {
  active.forEach((stop) => stop());
  active = $$('.slider', root).map(mount);
}
