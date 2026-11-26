import { t, href } from '../lib/i18n.js';
import { PARTNERS, COLLABORATORS, STACK } from '../data/technologies.js';
import { HOME_SHOWCASE } from '../data/products.js';
import { logoGrid, chips } from '../components/lists.js';
import { groupLabel } from '../components/text.js';
import { cls, each } from '../lib/html.js';

/** Loghi dei partner SiGENERA e dei collaboratori qualificati. */
export const partnerLogos = (partnerLabel = t('Partner', 'Partners')) =>
  groupLabel(partnerLabel) + logoGrid(PARTNERS, 3) + groupLabel(t('Collaboratori qualificati', 'Qualified collaborators')) + logoGrid(COLLABORATORS, 3);

/** Pillole con le tecnologie principali. */
export const stackChips = () => chips(STACK);

const ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

/* Scheda di un progetto o prodotto: tutta la scheda porta alla sua pagina */
const showcaseCard = (p) => `<a class="${cls('pt-prod', p.red && 'pt-prod--red')}" href="${href(p.to)}">
<span class="meta">${p.kind}</span>
<b>${p.name}</b>
<span class="pt-prod-tx">${p.text}</span>
<span class="pt-prod-go">${t('Scopri', 'Learn more')}${ARROW}</span>
</a>`;

/** Progetti e prodotti in home: quattro schede affiancate (data/products.js). */
export const projectsShowcase = () => `<div class="pt">${each(HOME_SHOWCASE, showcaseCard)}</div>`;
