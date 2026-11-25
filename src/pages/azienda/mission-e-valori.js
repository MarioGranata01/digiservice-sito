import { hero } from '../../components/hero.js';
import { section, splitSection } from '../../components/sections.js';
import { sectionHead, paragraphs } from '../../components/text.js';
import { primary } from '../../components/links.js';
import { pageCta } from '../../blocks/cta.js';
import { SCENES } from '../../data/scenes.js';
import { each, pad2 } from '../../lib/html.js';
import { VALUES } from '../../data/values.js';
import { t } from '../../lib/i18n.js';

const valueCards = () =>
  `<div class="vals">${each(VALUES, ({ title, text }, i) => `<article class="val"><span class="num">${pad2(i + 1)}</span><h3 class="h3">${title}</h3><p>${text}</p></article>`)}</div>`;

export default () => [
  hero({
    crumb: [[t('Azienda', 'Company'), 'azienda'], [t('Missione e valori', 'Mission and values')]],
    label: t('Azienda · Missione e valori', 'Company · Mission and values'),
    title: t('Trasformiamo le sfide digitali in {opportunità} concrete di crescita.', 'We turn digital challenges into concrete growth {opportunities}.'),
    lead: t('Affianchiamo le aziende nel percorso di innovazione tecnologica.', 'We support companies on their journey of technological innovation.'),
    actions: [primary('servizi', t('I nostri servizi', 'Our services'))],
    scene: SCENES.globe,
  }),
  splitSection({
    tight: true,
    prose: true,
    label: t('La nostra missione', 'Our mission'),
    title: t('Tecnologia che nasce dalle esigenze di {chi la usa}', 'Technology born from the needs of {the people who use it}'),
    body: paragraphs([t('Crediamo che la tecnologia renda più efficienti e produttive le imprese, ma solo se nasce dalle esigenze specifiche di chi la usa: per questo costruiamo soluzioni su misura e accompagniamo i clienti su tutti i fronti della trasformazione digitale, con un approccio integrato e orientato ai risultati.', 'We believe technology makes businesses more efficient and productive, but only when it is born from the specific needs of the people who use it. That is why we build custom solutions and support our clients on every front of digital transformation, with an integrated, results-oriented approach.')]),
    scene: SCENES.orbit,
  }),
  section({ alt: true }, sectionHead(t('I nostri valori', 'Our values'), t('Quattro valori, {un metodo}', 'Four values, {one method}')) + valueCards()),
  pageCta({ title: t('Vuoi lavorare con un partner che condivide questi valori?', 'Want to work with a partner who shares these values?'), text: t('Raccontaci la tua sfida.', 'Tell us about your challenge.'), label: t('Parla con noi', 'Talk to us') }),
].join('');
