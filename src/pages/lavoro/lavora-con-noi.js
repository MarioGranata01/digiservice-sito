import { hero } from '../../components/hero.js';
import { section, splitSection } from '../../components/sections.js';
import { sectionHead, paragraphs, todo } from '../../components/text.js';
import { card, grid } from '../../components/cards.js';
import { outline, scrollLink } from '../../components/links.js';
import { pageCta } from '../../blocks/cta.js';
import { SCENES } from '../../data/scenes.js';
import { t } from '../../lib/i18n.js';

/* Posizioni aperte: in WordPress arriveranno dal sistema offerte di lavoro. */
const POSITIONS = [
  t('Selezione candidatura femminile Data & AI Engineer', 'Data & AI Engineer – female candidate selection'),
  t('Offerta di Collaborazione per Tesi Universitaria', 'University Thesis Collaboration Offer'),
];

const positionCard = (title) => card({
  meta: t('Posizione aperta', 'Open position'),
  title,
  text: t('Dettagli e candidatura dal sistema offerte di lavoro.', 'Details and application through the job listings system.'),
  extra: scrollLink('top', t('Candidati', 'Apply'), 'small'),
});

export default () => [
  hero({
    crumb: [[t('Lavora con noi', 'Careers')]],
    label: t('Lavora con noi', 'Careers'),
    title: t('Lavora con noi: costruisci il software {di domani}.', "Careers: build {tomorrow's} software."),
    lead: t('Un team giovane e multiculturale che costruisce software, cloud e soluzioni di intelligenza artificiale.', 'A young, multicultural team building software, cloud and artificial intelligence solutions.'),
    actions: [{ scroll: 'posizioni', label: t('Vedi le posizioni aperte', 'See open positions'), variant: 'primary' }, outline('candidatura-spontanea', t('Candidatura spontanea', 'Open application'))],
    scene: SCENES.cubes,
  }),
  splitSection({
    tight: true,
    prose: true,
    label: t('Il nostro modo di lavorare', 'How we work'),
    title: t('Una cultura {di squadra}', 'A {team} culture'),
    body: paragraphs([t("Siamo un gruppo giovane e multiculturale, con una cultura di tipo familiare: ci si confronta, ci si aiuta, si lavora in squadra. Prestiamo attenzione all'equilibrio tra lavoro e vita privata e al benessere delle persone. Lavoriamo su progetti di tecnologia e innovazione, dal software su misura all'intelligenza artificiale generativa.", 'We are a young, multicultural group with a family-like culture: we share ideas, help each other and work as a team. We care about work-life balance and the well-being of our people. We work on technology and innovation projects, from custom software to generative artificial intelligence.')]),
    scene: SCENES.orbitTeam,
  }),
  splitSection({
    alt: true,
    reverse: true,
    label: t('Crescere in Digiservice', 'Growing at Digiservice'),
    title: t('Formazione {continua}', '{Continuous} training'),
    body: paragraphs([`${t('La formazione è continua, sia per i profili junior sia per quelli senior, e sono previste convenzioni per le persone del team.', 'Training is continuous for both junior and senior profiles, and team members benefit from dedicated agreements.')} ${todo('[DA VERIFICARE: contenuto delle convenzioni e dei percorsi di formazione]')}`]),
    scene: SCENES.neuralSmall,
  }),
  section({ id: 'posizioni' }, sectionHead(t('Posizioni aperte', 'Open positions'), t('Cerchiamo {persone} come te', 'We are looking for {people} like you'), t('Scopri le opportunità aperte e candidati.', 'Explore our open opportunities and apply.')) + grid(POSITIONS.map((p) => positionCard(p)), 2)),
  pageCta({ title: t('Non trovi la posizione giusta?', "Can't find the right position?"), text: t('Raccontaci chi sei.', 'Tell us about yourself.'), label: t('Candidatura spontanea', 'Open application'), to: 'candidatura-spontanea', scene: SCENES.neural }),
].join('');
