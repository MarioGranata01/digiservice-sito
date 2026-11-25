import { t } from '../lib/i18n.js';
/*
 * Valori di Digiservice: un unico elenco per tutto il sito (fonte: pagina chi-siamo del sito attuale).
 * short: una riga, per la home («Chi siamo» in breve) · text: descrizione, per la pagina «Missione e valori».
 */
export const VALUES = [
  {
    title: t('Innovazione', 'Innovation'),
    short: t('La tecnologia come motore di efficienza.', 'Technology as a driver of efficiency.'),
    text: t('La tecnologia è il motore per migliorare efficienza e produttività: cerchiamo di continuo nuove soluzioni da portare ai nostri clienti.', 'Technology is the engine of efficiency and productivity: we constantly look for new solutions to bring to our clients.'),
  },
  {
    title: t('Formazione', 'Training'),
    short: t('Un team che si aggiorna ogni giorno.', 'A team that keeps learning every day.'),
    text: t("Crediamo nella crescita personale e nell'aggiornamento continuo di tutto il team, per affrontare sfide sempre nuove.", 'We believe in personal growth and continuous learning for the whole team, to take on ever-new challenges.'),
  },
  {
    title: t('Integrità', 'Integrity'),
    short: t('Onestà, etica e responsabilità.', 'Honesty, ethics and accountability.'),
    text: t('Operiamo con onestà, etica e responsabilità in ogni aspetto del nostro lavoro.', 'We act with honesty, ethics and accountability in every aspect of our work.'),
  },
  {
    title: t('Eccellenza', 'Excellence'),
    short: t('Qualità in ogni fase del lavoro.', 'Quality at every stage of the work.'),
    text: t('Soluzioni di alta qualità, costruite sulle esigenze di ogni cliente e curate in ogni fase del nostro operato.', 'High-quality solutions, built around each client\'s needs and refined at every stage of our work.'),
  },
];
