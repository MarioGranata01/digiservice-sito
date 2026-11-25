import { hero } from '../../components/hero.js';
import { section, band } from '../../components/sections.js';
import { card, grid } from '../../components/cards.js';
import { primary, outline } from '../../components/links.js';
import { SCENES } from '../../data/scenes.js';
import { t } from '../../lib/i18n.js';

const SUBPAGES = [
  { to: 'chi-siamo', title: t('Chi siamo', 'About us'), text: t("La storia, l'approccio e le competenze del team.", "Our history, our approach and the team's skills."), scene: SCENES.orbit },
  { to: 'mission-e-valori', title: t('Missione e valori', 'Mission and values'), text: t('Trasformare le sfide digitali in opportunità di crescita.', 'Turning digital challenges into growth opportunities.'), scene: SCENES.cubesSmall },
  { to: 'formazione-e-innovazione', title: t('Formazione e innovazione', 'Training & innovation'), text: t('Formazione continua, ricerca e community.', 'Continuous training, research and community.'), scene: SCENES.neuralSmall },
];

export default () => [
  hero({
    crumb: [[t('Azienda', 'Company')]],
    label: t('Azienda', 'Company'),
    title: t('{Persone}, metodo e tecnologia.', '{People}, method and technology.'),
    lead: t('Digiservice è una società di consulenza ICT giovane e dinamica. Qui trovi chi siamo, come lavoriamo e in cosa crediamo.', 'Digiservice is a young, dynamic ICT consultancy. Here you can find out who we are, how we work and what we believe in.'),
    actions: [primary('chi-siamo', t('Chi siamo', 'About us')), outline('lavora-con-noi', t('Lavora con noi', 'Careers'))],
    scene: SCENES.orbitTeam,
  }),
  section({ tight: true }, grid(SUBPAGES.map((p) => card({ ...p, link: { to: p.to, label: t('Scopri', 'Learn more') } })))),
  section({}, band(t('Vuoi far parte del team? Guarda come lavoriamo e le posizioni aperte.', 'Want to join the team? See how we work and our open positions.'), 'lavora-con-noi', t('Lavora con noi', 'Careers'))),
].join('');
