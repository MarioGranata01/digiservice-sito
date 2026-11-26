import { hero } from '../../components/hero.js';
import { section } from '../../components/sections.js';
import { card, placeholderCard, grid } from '../../components/cards.js';
import { filters, status } from '../../components/lists.js';
import { primary } from '../../components/links.js';
import { pageCta } from '../../blocks/cta.js';
import { SCENES } from '../../data/scenes.js';
import { t } from '../../lib/i18n.js';

export default () => [
  hero({
    crumb: [[t('Progetti', 'Projects')]],
    label: t('Progetti', 'Projects'),
    title: t('Progetti di ricerca e {innovazione}.', 'Research and {innovation} projects.'),
    lead: t("Partecipiamo a progetti di ricerca e sviluppo insieme a imprese, università e centri di ricerca per portare le tecnologie più avanzate, a partire dall'AI generativa, dentro applicazioni concrete.", 'We take part in research and development projects with companies, universities and research centres to bring the most advanced technologies, starting with generative AI, into real-world applications.'),
    actions: [primary('sigenera', t('Il progetto SiGENERA', 'The SiGENERA project'))],
    scene: SCENES.globe,
  }),
  section({ tight: true }, filters([t('Tutti', 'All'), 'AI', 'Cloud', 'Software'], t('Filtri', 'Filters')) + grid([
    card({
      scene: SCENES.globeLite,
      tag: 'AI',
      status: status('go', t('In corso', 'In progress')),
      title: 'SiGENERA',
      text: t('Piattaforma basata su LLM per generare codice, assistere gli studenti e verbalizzare le riunioni. Digiservice è impresa capofila.', 'An LLM-based platform for generating code, assisting students and taking meeting minutes. Digiservice is the lead partner.'),
      link: { to: 'sigenera', label: t('Leggi il progetto', 'Read about the project') },
    }),
    placeholderCard({
      title: t('Altri progetti e case study', 'More projects and case studies'),
      text: t('Ogni progetto è una scheda: immagine, sintesi, ambito, stato, ruolo di Digiservice, partner, sito ufficiale.', "Each project is an entry: image, summary, area, status, Digiservice's role, partners, official website."),
    }),
  ])),
  pageCta({ title: t("Hai un'idea o un bando a cui partecipare?", 'Do you have an idea or a funding call to apply for?'), text: t('Parliamone.', "Let's talk.") }),
].join('');
