import { cls, accent, when } from '../lib/html.js';
import { canvas, visual } from './scene.js';
import { actions, link } from './links.js';
import { textBlock } from './text.js';

/**
 * Sezione standard a tutta larghezza.
 * opts: { alt: sfondo grigio, tight: senza padding superiore, id, inner: classi extra del contenitore }
 */
export const section = (opts, content) => {
  const { alt, tight, id, cls: extra, inner } = opts;
  return `<section class="${cls('sec', alt && 'alt', tight && 'tight', extra)}"${id ? ` id="${id}"` : ''}><div class="${cls('in', inner)}">${content}</div></section>`;
};

/**
 * Sezione a due colonne: testo + scena 3D (o un altro elemento in `aside`).
 * { label, title, body, scene, aside, reverse, prose, ...opzioni di section }
 */
export const splitSection = ({ label, title, body, scene, aside, reverse, prose, ...opts }) => {
  const text = textBlock({ label, title, body, prose });
  const side = aside ?? visual(scene);
  return section({ ...opts, inner: cls('split', reverse && 'rev') }, reverse ? side + text : text + side);
};

/** Banner arrotondato con testo a sinistra e scena a destra. */
export const featureBanner = ({ label, title, lead, body = '', actions: acts, scene }) =>
  `<div class="banner"><div class="tx">${when(label, () => `<p class="lab">${label}</p>`)}<h2 class="h2">${accent(title)}</h2>${when(lead, () => `<p class="lead">${lead}</p>`)}${body}${actions(acts)}</div><div class="banner-visual">${canvas(scene)}</div></div>`;

/** Fascia rossa con frase e un pulsante. */
export const band = (text, to, label) => `<div class="band"><h3>${text}</h3>${link(to, label, 'btn')}</div>`;

/**
 * Blocco finale di invito all'azione, presente in quasi tutte le pagine.
 * { title, text, actions: [azioni], scene }
 */
export const ctaBlock = ({ title, text, actions: acts, scene }) =>
  section({}, `<div class="cta-block"><div class="tx"><h2 class="h2">${accent(title)}</h2><p class="lead">${text}</p>${actions(acts)}</div><div class="cta-visual">${canvas(scene)}</div></div>`);
