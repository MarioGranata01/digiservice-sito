import { hero } from '../../components/hero.js';
import { section } from '../../components/sections.js';
import { card, grid } from '../../components/cards.js';
import { primary } from '../../components/links.js';
import { pageCta } from '../../blocks/cta.js';
import { SCENES } from '../../data/scenes.js';
import { t } from '../../lib/i18n.js';

export default () => [
  hero({
    crumb: [[t('Prodotti', 'Products')]],
    label: t('Prodotti', 'Products'),
    title: t('I nostri {prodotti} software.', 'Our software {products}.'),
    lead: t('Oltre alla consulenza e allo sviluppo su misura, Digiservice sviluppa e commercializza software propri: TimeSheet Connect Cloud, Archiviart e Scadenzario.', 'Alongside consulting and custom development, Digiservice develops and markets its own software: TimeSheet Connect Cloud, Archiviart and Scadenzario.'),
    actions: [primary('timesheet-connect-cloud', t('Scopri TimeSheet Connect Cloud', 'Discover TimeSheet Connect Cloud'))],
    scene: SCENES.cloud,
  }),
  section({ tight: true }, grid([
    card({
      scene: SCENES.cloudCard,
      tag: t('Presenze e HR', 'Attendance & HR'),
      title: 'TimeSheet Connect Cloud',
      text: t("Presenze e risorse umane in un'unica piattaforma.", 'Attendance and human resources in a single platform.'),
      list: [
        t('Timbratura geolocalizzata da app', 'Geolocated clock-in from the app'),
        t('Ferie, permessi e turni', 'Holidays, leave and shifts'),
        t('Badge digitale e subappalti per i cantieri', 'Digital badges and subcontracting for construction sites'),
      ],
      link: { to: 'timesheet-connect-cloud', label: t('Scopri', 'Discover') },
    }),
    card({
      tag: t('Arte e patrimonio', 'Art & heritage'),
      title: 'Archiviart',
      text: t("Il passaporto digitale delle opere d'arte: digitalizza, tutela e organizza il patrimonio artistico e documentale.", 'The digital passport for works of art: digitises, protects and organises artistic and documentary heritage.'),
      list: [
        t('Scheda di provenienza verificabile', 'Verifiable provenance record'),
        t('Archivio privato ricercabile', 'Private, searchable archive'),
        t('Certificati con chip NFC', 'Certificates with NFC chips'),
      ],
      link: { to: 'archiviart', label: t('Scopri', 'Discover') },
    }),
    card({
      tag: t('Scadenze', 'Deadlines'),
      title: 'Scadenzario',
      text: t('Gestisci e monitora facilmente scadenze, progetti e attività. Organizza i tuoi impegni, ricevi notifiche sulle scadenze imminenti e tieni tutto sotto controllo con una visualizzazione semplice e intuitiva.', 'Easily manage and monitor deadlines, projects and tasks. Organise your commitments, get notified of upcoming deadlines and keep everything under control with a simple, intuitive view.'),
      link: { to: 'scadenzario', label: t('Scopri', 'Discover') },
    }),
  ])),
  pageCta({ title: t('Cerchi un software su misura?', 'Looking for custom software?'), text: t('Oltre ai prodotti, sviluppiamo applicazioni progettate sui tuoi processi.', 'Beyond our products, we develop applications designed around your processes.'), scene: SCENES.cubesSmall }),
].join('');
