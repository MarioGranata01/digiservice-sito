import { t } from '../lib/i18n.js';
/* Dati aziendali: usati in header, footer, contatti e chi siamo. */
export const COMPANY = {
  name: 'Digiservice',
  legalName: 'Digiservice S.r.l.',
  tagline: t('Soluzioni ICT innovative per il tuo business.', 'Innovative ICT solutions for your business.'),
  city: 'Rende (CS)',
  address: ['Via Finlandia, 5', 'Contrada Cutura', '87036 Rende (CS)'],
  email: 'info@digiservice-solutions.it',
  website: 'www.digiservice-solutions.it',
  social: ['LinkedIn', 'Facebook', 'Instagram'],
  socialHandle: '@digiserviceitalia',
};

/** Indirizzo su più righe. */
export const addressHtml = () => COMPANY.address.join('<br>');

/* Siti esterni citati in più pagine */
export const EXTERNAL = {
  timesheet: 'https://www.gestione-dipendenti.it/',
  sigenera: 'https://www.sigenera.eu/',
  archiviart: 'https://www.archiviart.com/it',
  archiviartAccess: 'https://www.archiviart.com/it#access',
};

/*
 * Numeri chiave (home). Fonte: sito attuale digiservice-solutions.it
 * («nata nel 2022 dall'esperienza decennale di professionisti del settore»)
 * e aree di servizio della bozza.
 */
export const FIGURES = [
  { value: '2022', label: t('Anno di fondazione', 'Founded'), from: 2000 },
  { value: '10+', label: t('Anni di esperienza', 'Years of experience') },
  { value: '7', label: t('Aree di competenza', 'Areas of expertise') },
];

/*
 * «Chi siamo» in breve (home). Riassunto della pagina chi-siamo del sito attuale:
 * consulenza ICT nata nel 2022 da professionisti con esperienza decennale; agilità, innovazione,
 * formazione continua. I valori sono in data/values.js.
 */
export const ABOUT = {
  label: t('Chi siamo', 'About us'),
  title: t('Agili per natura, {innovativi} per scelta', 'Agile by nature, {innovative} by choice'),
  text: t("Siamo una società di consulenza ICT nata nel 2022 dall'esperienza decennale dei nostri professionisti. Progettiamo, sviluppiamo, manteniamo e testiamo software, e accompagniamo i clienti nell'innovazione di processi e infrastrutture.", 'We are an ICT consultancy founded in 2022, built on our professionals\' ten-plus years of experience. We design, develop, maintain and test software, and help clients innovate their processes and infrastructure.'),
};
