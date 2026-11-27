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
    text: t("La soluzione cloud per la gestione integrata dei dipendenti e dei cantieri. Semplifica presenze, turni, richieste e attività del personale, monitorando badge di cantiere, commesse e risorse in un'unica piattaforma.", 'The cloud solution for integrated management of staff and construction sites. It simplifies attendance, shifts, requests and staff activities, while tracking site badges, contracts and resources in a single platform.'),
    to: 'timesheet-connect-cloud',
  },
  {
    kind: t('Prodotto', 'Product'),
    name: 'Archiviart',
    text: t("Il passaporto digitale delle opere d'arte: archivio, provenienza e certificati verificabili.", 'The digital passport for works of art: archive, provenance and verifiable certificates.'),
    to: 'archiviart',
  },
  {
    kind: t('Prodotto', 'Product'),
    name: 'Scadenzario',
    text: t('Gestisci e monitora facilmente scadenze, progetti e attività. Organizza i tuoi impegni, ricevi notifiche sulle scadenze imminenti e tieni tutto sotto controllo con una visualizzazione semplice e intuitiva.', 'Easily manage and monitor deadlines, projects and tasks. Organise your commitments, get notified of upcoming deadlines and keep everything under control with a simple, intuitive view.'),
    to: 'scadenzario',
  },
];
