import { t } from '../lib/i18n.js';

/*
 * Sezione «Progetti e prodotti» della home: prima il progetto SiGENERA, poi i prodotti.
 * to: id della pagina (data/routes.js). red: scheda rossa, per distinguere il progetto.
 */
export const HOME_SHOWCASE = [
  {
    kind: t('Progetto', 'Project'),
    name: 'SiGENERA',
    text: t(
      "Ricerca applicata sull'AI generativa: una piattaforma basata su Large Language Models per generare codice, assistere gli studenti e verbalizzare le riunioni. Digiservice è impresa capofila.",
      'Applied research on generative AI: a platform based on Large Language Models for generating code, assisting students and taking meeting minutes. Digiservice is the lead partner.',
    ),
    to: 'sigenera',
    red: true,
  },
  {
    kind: t('Prodotto', 'Product'),
    name: 'TimeSheet Connect',
    text: t('Presenze e dipendenti in cloud, da computer, tablet e smartphone.', 'Attendance and staff in the cloud, from computer, tablet and smartphone.'),
    to: 'timesheet-connect-cloud',
  },
  {
    kind: t('Prodotto', 'Product'),
    name: 'Scadenzario',
    text: t('[Descrizione da inserire]', '[Description to be added]'),
    to: 'scadenzario',
  },
  {
    kind: t('Prodotto', 'Product'),
    name: 'Archiviart',
    text: t("Il passaporto digitale delle opere d'arte: archivio, provenienza e certificati verificabili.", 'The digital passport for works of art: archive, provenance and verifiable certificates.'),
    to: 'archiviart',
  },
];
