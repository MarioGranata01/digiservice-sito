import { t } from '../lib/i18n.js';
import { each, cls, when, pad2 } from '../lib/html.js';
import { canvas } from './scene.js';
import { action, link } from './links.js';
import { checklist } from './lists.js';

/** Griglia di card/box. cols: 2 | 3 (default) | 4. */
export const grid = (items, cols) => `<div class="${cls('cards', cols && cols !== 3 && `c${cols}`)}">${items.join('')}</div>`;

/**
 * Card con scena 3D opzionale in alto.
 * { scene, sceneHover, meta, tag, status, title, text, list, link: azione, extra, variant: 'wide' }
 * sceneHover: la scena resta ferma e si anima solo col mouse sopra la card.
 */
export const card = (c) => `<article class="${cls('card', c.variant && `card--${c.variant}`)}">
${when(c.scene, () => `<div class="cv">${canvas(c.scene, { hover: c.sceneHover })}</div>`)}
<div class="tx">
${when(c.meta, () => `<span class="meta">${c.meta}</span>`)}
${when(c.tag || c.status, () => `<div class="tags">${when(c.tag, () => `<span class="tag">${c.tag}</span>`)}${c.status || ''}</div>`)}
<h3>${c.title}</h3>
${when(c.text, () => `<p>${c.text}</p>`)}
${when(c.list, () => checklist(c.list))}
${c.extra || ''}
${when(c.link, () => action({ variant: 'arrow', ...c.link }))}
</div></article>`;

/** Card tratteggiata per contenuti futuri ("Prossimamente"). */
export const placeholderCard = ({ tag = t('Prossimamente', 'Coming soon'), title, text }) =>
  `<article class="card card--placeholder"><div class="tx"><span class="tag">${tag}</span><h3>${title}</h3><p>${text}</p></div></article>`;

/** Card di invito all'azione (rossa, o vinaccia con dark: true), da accodare a una griglia. */
export const accentCard = ({ title, text, to = 'contatti', label, dark }) =>
  `<article class="${cls('card card--accent', dark && 'card--dark')}"><div class="tx"><h3>${title}</h3><p>${text}</p>${link(to, label, 'btn')}</div></article>`;

/** Riquadro semplice. { ico, title, text, body, red, strong } */
export const box = (b) => `<div class="${cls('box', b.red && 'red', b.strong && 'box--strong')}">
${when(b.ico, () => `<span class="ico">${b.ico}</span>`)}
${when(b.title, () => `<h3>${b.title}</h3>`)}
${when(b.text, () => `<p>${b.text}</p>`)}
${b.body || ''}
</div>`;

/** Riquadri numerati 01, 02… con testo in evidenza (es. "Cosa risolviamo"). */
export const numberedBoxes = (texts, cols = 4) => grid(texts.map((text, i) => box({ ico: pad2(i + 1), text, strong: true })), cols);

/** Riquadri rossi con testo in grassetto (es. "Benefici"). */
export const highlightBoxes = (texts, cols = 4) => grid(texts.map((text) => box({ text, red: true, strong: true })), cols);

/** Riquadri titolo + testo: [[titolo, testo]]. */
export const titledBoxes = (rows, cols) => grid(rows.map(([title, text]) => box({ title, text })), cols);

/** Piano tariffario. { kicker, title, intro, features, footer, highlight } */
export const plan = (p) => `<div class="${cls('plan', p.highlight && 'hi')}">
<small>${p.kicker}</small><h3>${p.title}</h3>
${when(p.intro, () => `<p class="plan-intro">${p.intro}</p>`)}
${checklist(p.features)}
${when(p.footer, () => `<p class="plan-foot">${p.footer}</p>`)}
</div>`;
