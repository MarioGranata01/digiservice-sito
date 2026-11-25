import { t, href } from '../lib/i18n.js';
import { accent, each, when, cls } from '../lib/html.js';
import { canvas } from './scene.js';
import { actions } from './links.js';

/** Briciole di pane: [[etichetta, idPagina?]]. "Home" è sempre la prima. */
export const breadcrumb = (trail) =>
  `<nav class="crumb" aria-label="${t('Percorso', 'Breadcrumb')}"><a href="${href('home')}">Home</a>${each(trail, ([text, to]) => `<span>${to ? `<a href="${href(to)}">${text}</a>` : text}</span>`)}</nav>`;

/** Etichette "di vetro" che fluttuano sopra la scena (max 3). */
const floatingTags = (tags = []) => each(tags, (t, i) => `<div class="glass float float--${i + 1}" aria-hidden="true"><i></i>${t}</div>`);

/** Fascia di numeri chiave sotto il testo dell'hero: [[valore, didascalia]]. */
const proof = (items) => `<div class="hero-proof rv">${each(items, ([v, t]) => `<div><b>${v}</b>${t}</div>`)}</div>`;

/**
 * Apertura di pagina.
 * { crumb, label, title, lead, actions, scene, visual, tags, proof, main }
 * main: true per la home (titolo grande, scena senza cornice, niente briciole).
 */
export const hero = (h) => `<section class="${cls('hero', !h.main && 'hero--page')}"><div class="in">
<div class="tx">
${when(h.crumb, () => breadcrumb(h.crumb))}
<p class="lab rv">${h.label}</p>
<h1 class="${cls('h1', !h.main && 'sm')} rv">${accent(h.title)}</h1>
<span class="dash rv"></span>
<p class="lead rv">${h.lead}</p>
${actions(h.actions, 'rv')}
${when(h.proof, () => proof(h.proof))}
</div>
<div class="hero-visual">${h.visual ?? canvas(h.scene)}${floatingTags(h.tags)}</div>
</div></section>`;
