import { t } from '../lib/i18n.js';
import { PARTNERS, COLLABORATORS, COLLABORATIONS, STACK, TECH_GROUPS } from '../data/technologies.js';
import { logoGrid, chips } from '../components/lists.js';
import { groupLabel } from '../components/text.js';
import { link } from '../components/links.js';
import { canvas } from '../components/scene.js';
import { SCENES } from '../data/scenes.js';
import { each } from '../lib/html.js';

/** Loghi dei partner SIGENERA e dei collaboratori qualificati. */
export const partnerLogos = (partnerLabel = t('Partner', 'Partners')) =>
  groupLabel(partnerLabel) + logoGrid(PARTNERS, 3) + groupLabel(t('Collaboratori qualificati', 'Qualified collaborators')) + logoGrid(COLLABORATORS, 3);

/** Pillole con le tecnologie principali. */
export const stackChips = () => chips(STACK);

const marks = (names) => `<ul class="pt-marks">${each(names, (n) => `<li>${n}</li>`)}</ul>`;

/**
 * Partner in home: a sinistra la scheda del progetto SIGENERA con i suoi partner;
 * a destra, separate, le collaborazioni qualificate e le tecnologie principali.
 */
export const partnersShowcase = () => `<div class="pt">
<article class="pt-main">
<div class="pt-main-tx">
<span class="pt-badge">${t('Progetto SIGENERA', 'SIGENERA project')}</span>
<h3>${t("Ricerca applicata sull'AI generativa, insieme a", 'Applied research on generative AI, together with')}</h3>
<ul class="pt-list">${each(PARTNERS, (n) => `<li>${n}</li>`)}</ul>
</div>
<div class="pt-main-vis">${canvas(SCENES.neuralSmall)}</div>
<div class="pt-main-foot">
<p>${t("Piattaforma basata su Large Language Models, nell'ambito del PR Calabria FESR+ FSE+ 2021-2027.", 'A platform based on Large Language Models, funded under the PR Calabria FESR+ FSE+ 2021-2027 programme.')}</p>
${link('sigenera', t('Il progetto', 'The project'), 'arrow')}
</div>
</article>
<div class="pt-side">
<article class="pt-box"><p class="meta">${t('Collaborazioni qualificate', 'Qualified collaborations')}</p>
<ul class="pt-rows">${each(COLLABORATIONS, ([name, kind, desc]) => `<li><b>${name}</b><span>${desc}</span><em>${kind}</em></li>`)}</ul></article>
<article class="pt-box"><p class="meta">${t('Tecnologie principali', 'Core technologies')}</p>
<p class="pt-note">${t('Scegliamo la tecnologia in base al progetto: queste sono quelle che usiamo più spesso.', 'We choose the technology to fit the project: these are the ones we use most often.')}</p><dl class="pt-tech">${each(TECH_GROUPS, ([group, items]) => `<div><dt>${group}</dt>${each(items, (x) => `<dd>${x}</dd>`)}</div>`)}</dl></article>
</div>
</div>`;
