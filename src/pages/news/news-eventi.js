import { hero } from '../../components/hero.js';
import { section } from '../../components/sections.js';
import { sectionHead } from '../../components/text.js';
import { card, grid } from '../../components/cards.js';
import { primary, outline } from '../../components/links.js';
import { latestCards } from '../../blocks/news.js';
import { SCENES } from '../../data/scenes.js';
import { t } from '../../lib/i18n.js';

export default () => [
  hero({
    crumb: [[t('News ed eventi', 'News & events')]],
    label: t('News ed eventi', 'News & events'),
    title: t('News ed {eventi}.', 'News & {events}.'),
    lead: t('Articoli, novità aziendali e appuntamenti di Digiservice su intelligenza artificiale, cloud e sviluppo software.', 'Articles, company news and Digiservice events on artificial intelligence, cloud and software development.'),
    actions: [primary('blog', t('Vai al blog', 'Go to the blog')), outline('eventi', t('Vai agli eventi', 'Go to events'))],
    scene: SCENES.orbit,
  }),
  section({ tight: true }, grid([
    card({ scene: SCENES.neuralSmall, title: 'Blog', text: t('Articoli e novità aziendali: IA, cloud, sviluppo software, DevOps e innovazione.', 'Articles and company news: AI, cloud, software development, DevOps and innovation.'), link: { to: 'blog', label: t('Entra nel blog', 'Visit the blog') } }),
    card({ scene: SCENES.globe, title: t('Eventi', 'Events'), text: t('Conferenze, meetup, workshop e iniziative con università e centri di ricerca.', 'Conferences, meetups, workshops and initiatives with universities and research centres.'), link: { to: 'eventi', label: t('Tutti gli eventi', 'All events') } }),
  ], 2)),
  section({ alt: true }, sectionHead(t('Ultimi contenuti', 'Latest content'), t('Articoli ed eventi, {in automatico}', 'Articles and events, {automatically}')) + grid(latestCards(), 2)),
].join('');
