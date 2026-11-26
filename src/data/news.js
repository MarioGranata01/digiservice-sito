import { SCENES } from './scenes.js';
import { EXTERNAL } from './company.js';
import { t } from '../lib/i18n.js';

/* Articoli del blog esistenti. In WordPress saranno i post. */
export const ARTICLES = [
  {
    title: 'Deep Dive into Amazon DynamoDB: Unraveling Key Features',
    date: t('24 gennaio 2024', '24 January 2024'),
    category: t('Tecnologia', 'Technology'),
    summary: t('Articolo del blog: le caratteristiche principali di Amazon DynamoDB.', 'Blog article: the key features of Amazon DynamoDB.'),
    scene: SCENES.cloudCard,
  },
  {
    title: 'Continuous Delivery (CD) Procedures in AWS environment',
    date: t('22 gennaio 2024', '22 January 2024'),
    category: t('Tecnologia', 'Technology'),
    summary: t('Articolo del blog: procedure di Continuous Delivery in ambiente AWS.', 'Blog article: Continuous Delivery procedures in an AWS environment.'),
    scene: SCENES.loop,
  },
  {
    title: 'TypeORM vs JPA',
    date: t('18 ottobre 2023', '18 October 2023'),
    category: t('Tecnologia', 'Technology'),
    summary: t("Articolo del blog: confronto tra due approcci all'accesso ai dati.", 'Blog article: a comparison of two approaches to data access.'),
    scene: SCENES.cubesSmall,
  },
];

export const BLOG_CATEGORIES = [
  t('Tutti', 'All'),
  t('Tecnologia', 'Technology'),
  t('Intelligenza Artificiale', 'Artificial Intelligence'),
  'Cloud',
  t('Sviluppo software', 'Software development'),
  t('DevOps e testing', 'DevOps & testing'),
  t('Innovazione e ricerca', 'Innovation & research'),
  t('Novità aziendali', 'Company news'),
];

/*
 * Eventi. upcoming: true → "Prossimi eventi", altrimenti "Eventi passati".
 * card: dati opzionali per mostrarlo tra le "Ultime notizie".
 */
export const EVENTS = [
  {
    when: t('Settembre 2026', 'September 2026'),
    title: t('SiGENERA a HYDRA 2026', 'SiGENERA at HYDRA 2026'),
    text: t('Presentazione del progetto di ricerca a Klagenfurt, 8 settembre 2026.', 'Presentation of the research project in Klagenfurt, 8 September 2026.'),
    link: { url: EXTERNAL.sigenera, label: t('Sito SiGENERA', 'SiGENERA website') },
    upcoming: true,
    card: {
      date: t('8 settembre 2026', '8 September 2026'),
      title: t('SiGENERA a HYDRA 2026, Klagenfurt', 'SiGENERA at HYDRA 2026, Klagenfurt'),
      summary: t('Presentazione del progetto di ricerca. Link esterno a sigenera.eu.', 'Presentation of the research project. External link to sigenera.eu.'),
      scene: SCENES.globeLite,
    },
  },
  {
    when: '2023',
    title: 'AWS Summit Milano 2023',
    text: t("Partecipazione con l'AWS User Group Calabria.", 'Attended with the AWS User Group Calabria.'),
    link: { to: 'eventi', label: t('Scheda evento', 'Event details') },
  },
  {
    when: '2023',
    title: 'Come to Code 2023',
    text: t('Evento per la community degli sviluppatori.', 'An event for the developer community.'),
    link: { to: 'eventi', label: t('Scheda evento', 'Event details') },
  },
];
