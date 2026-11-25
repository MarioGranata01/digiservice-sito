import { t } from '../lib/i18n.js';
import { slider } from '../components/slider.js';
import { section } from '../components/sections.js';
import { headRow } from '../components/text.js';
import { link } from '../components/links.js';
import { servicesGrid } from '../blocks/services.js';
import { keyFigures } from '../blocks/figures.js';
import { aboutIntro } from '../blocks/about.js';
import { partnersShowcase } from '../blocks/partners.js';
import { SLIDES, SLIDE_SECONDS } from '../data/slides.js';

/* Home essenziale: apertura, chi siamo in breve, servizi, partner. */
export default () => [
  slider({
    slides: SLIDES,
    seconds: SLIDE_SECONDS,
    label: t('Cosa portiamo e in cosa crediamo', 'What we bring and what we believe in'),
    heading: t('Digiservice: soluzioni ICT innovative per il tuo business', 'Digiservice: innovative ICT solutions for your business'),
    aside: keyFigures(),
  }),

  aboutIntro(),

  section({ alt: true, cls: 'svc' },
    headRow(
      t('Servizi e competenze', 'Services and expertise'),
      t('Competenze {integrate} per progettare, sviluppare e far evolvere le tue soluzioni digitali', '{Integrated} expertise to design, build and evolve your digital solutions'),
      `<p class="head-intro">${t("Sette aree specialistiche che lavorano come un'unica squadra. Ogni progetto riunisce le competenze che servono, con un solo interlocutore dall'analisi alla gestione.", 'Seven specialist areas working as one team. Every project brings together the skills it needs, with a single point of contact from analysis to operations.')}</p>`,
    )
    + servicesGrid()
    + `<div class="svc-more">${link('servizi', t('Scopri tutti i servizi', 'Explore all services'), 'primary')}</div>`),

  section({ cls: 'partners' },
    headRow(t('Partner e collaborazioni', 'Partners and collaborations'), t('Le realtà con cui {costruiamo} innovazione', 'The organisations we {build} innovation with'))
    + partnersShowcase()),
].join('');
