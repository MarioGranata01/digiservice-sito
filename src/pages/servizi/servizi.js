import { hero } from '../../components/hero.js';
import { section } from '../../components/sections.js';
import { primary } from '../../components/links.js';
import { servicesGrid, START_CARD } from '../../blocks/services.js';
import { pageCta, CONSULT } from '../../blocks/cta.js';
import { SCENES } from '../../data/scenes.js';
import { t } from '../../lib/i18n.js';

export default () => [
  hero({
    crumb: [[t('Servizi', 'Services')]],
    label: t('Servizi', 'Services'),
    title: t('Servizi ICT per progettare e far evolvere le tue {soluzioni digitali}.', 'ICT services to design and evolve your {digital solutions}.'),
    lead: t("Dal software su misura al cloud, dall'intelligenza artificiale ai test: sette aree di competenza che lavorano insieme, con un unico interlocutore.", 'From custom software to the cloud, from artificial intelligence to testing: seven areas of expertise working together, with a single point of contact.'),
    actions: [primary('contatti', CONSULT)],
    scene: SCENES.cubes,
  }),
  section({ tight: true }, servicesGrid()),
  pageCta({ title: START_CARD.title, text: START_CARD.text }),
].join('');
