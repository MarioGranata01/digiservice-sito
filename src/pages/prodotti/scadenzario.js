import { hero } from '../../components/hero.js';
import { section } from '../../components/sections.js';
import { sectionHead } from '../../components/text.js';
import { numberedBoxes } from '../../components/cards.js';
import { outline } from '../../components/links.js';
import { pageCta } from '../../blocks/cta.js';
import { each } from '../../lib/html.js';
import { t } from '../../lib/i18n.js';

/* Contenuti da completare: per ora segnaposto tra parentesi quadre. */
const TODO = t('[Da inserire]', '[To be added]');

const FEATURES = [
  t('[Funzione principale 1 da inserire]', '[Main feature 1 to be added]'),
  t('[Funzione principale 2 da inserire]', '[Main feature 2 to be added]'),
  t('[Funzione principale 3 da inserire]', '[Main feature 3 to be added]'),
  t('[Funzione principale 4 da inserire]', '[Main feature 4 to be added]'),
];

/** Elenco di scadenze di esempio, al posto della scena 3D. */
const listMockup = () => `<div class="phone" aria-hidden="true"><b>${t('Prossime scadenze', 'Upcoming deadlines')}</b><div class="ck">${t('Oggi', 'Today')}</div>
${each([1, 2, 3, 4], () => `<div class="ln">${TODO}<i>—</i></div>`)}
<small class="meta">${t('Schermata di esempio', 'Sample screen')}</small></div>`;

export default () => [
  hero({
    crumb: [[t('Prodotti', 'Products'), 'prodotti'], ['Scadenzario']],
    label: t('Prodotto Digiservice', 'A Digiservice product'),
    title: t('Scadenzario: {[titolo da inserire]}', 'Scadenzario: {[title to be added]}'),
    lead: t('Gestisci e monitora facilmente scadenze, progetti e attività. Organizza i tuoi impegni, ricevi notifiche sulle scadenze imminenti e tieni tutto sotto controllo con una visualizzazione semplice e intuitiva.', 'Easily manage and monitor deadlines, projects and tasks. Organise your commitments, get notified of upcoming deadlines and keep everything under control with a simple, intuitive view.'),
    actions: [outline('contatti', t('Richiedi una demo', 'Request a demo'))],
    visual: listMockup(),
  }),

  section({ tight: true }, sectionHead(t('Le funzioni', 'Features'), t('Cosa fa {Scadenzario}', 'What {Scadenzario} does')) + numberedBoxes(FEATURES)),

  pageCta({
    title: t('Vuoi vedere Scadenzario in azione?', 'Want to see Scadenzario in action?'),
    text: t('Chiedici una demo.', 'Ask us for a demo.'),
    label: t('Richiedi una demo', 'Request a demo'),
  }),
].join('');
