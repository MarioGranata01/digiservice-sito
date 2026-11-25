import { hero } from '../../components/hero.js';
import { section } from '../../components/sections.js';
import { sectionHead, note } from '../../components/text.js';
import { box } from '../../components/cards.js';
import { eventList } from '../../blocks/news.js';
import { pageCta } from '../../blocks/cta.js';
import { EVENTS } from '../../data/news.js';
import { SCENES } from '../../data/scenes.js';
import { t } from '../../lib/i18n.js';

export default () => [
  hero({
    crumb: [[t('News ed eventi', 'News & events'), 'news-eventi'], [t('Eventi', 'Events')]],
    label: t('Eventi e community', 'Events & community'),
    title: t('Eventi e {community}.', 'Events & {community}.'),
    lead: t('Partecipiamo e contribuiamo a conferenze, meetup e iniziative con università e centri di ricerca, perché il confronto con la community è parte del nostro modo di innovare.', 'We take part in and contribute to conferences, meetups and initiatives with universities and research centres, because engaging with the community is part of how we innovate.'),
    scene: SCENES.globe,
  }),
  section({ tight: true }, sectionHead(t('Prossimi eventi', 'Upcoming events'), t('Gli appuntamenti {in programma}', 'What’s {coming up}')) + eventList(EVENTS.filter((e) => e.upcoming))),
  section({ alt: true }, sectionHead(t('Eventi passati', 'Past events'), t('Dove {ci siamo incontrati}', 'Where {we have met}'), t('Eventi già presenti sul sito, importati con il materiale esistente.', 'Events already on the site, imported with the existing material.'))
    + eventList(EVENTS.filter((e) => !e.upcoming))
    + note(t('Date, luoghi e immagini restano quelli del materiale esistente: non vengono aggiunte informazioni nuove.', 'Dates, venues and images are taken from the existing material: no new information is added.'))),
  section({}, box({
    title: t('Come si aggiorna', 'How it is updated'),
    text: t('Ogni evento è una scheda WordPress con immagine, titolo, descrizione, data, luogo, tipologia, ruolo di Digiservice e link esterni. Gli eventi futuri vanno in «Prossimi», gli altri in «Passati». Le sezioni su eventi organizzati o sponsorizzati restano nascoste finché non ci sono contenuti.', 'Each event is a WordPress entry with image, title, description, date, venue, type, Digiservice’s role and external links. Future events go under “Upcoming”, the others under “Past”. Sections for organised or sponsored events stay hidden until there is content.'),
  })),
  pageCta({ title: t('Vuoi incontrarci?', 'Want to meet us?'), text: t('Scrivici per un appuntamento o una collaborazione.', 'Write to us to arrange a meeting or a collaboration.'), label: t('Contatta il team', 'Contact the team') }),
].join('');
