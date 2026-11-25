import { t } from '../lib/i18n.js';
/*
 * Slide del carosello in cima alla home: contenuti ripresi dall'apertura del sito attuale,
 * in forma breve (etichetta, titolo, una riga). Tra graffe la parte del titolo evidenziata in rosso.
 *
 * A destra del pannello restano fissi i numeri chiave (aside in pages/home.js).
 * Per dare a una slide una foto di sfondo, copiarla in src/assets/slides/,
 * importarla qui e aggiungere `image` alla slide:
 *   import fotoAi from '../assets/slides/ai.jpg';
 *   { ..., image: fotoAi, alt: '' }
 * Con la foto lo sfondo viene scurito (foto consigliate: 1920×1080, orizzontali).
 */
export const SLIDES = [
  {
    label: t('Soluzioni innovative', 'Innovative solutions'),
    title: t('La tecnologia giusta per far {crescere} la tua azienda', 'The right technology to help your business {grow}'),
    text: t('Software, cloud e AI di alta qualità, su misura per te.', 'High-quality software, cloud and AI, tailored to you.'),
    cta: { to: 'servizi', label: t('Scopri i servizi', 'Explore our services') },
  },
  {
    label: t('Miglioramento continuo', 'Continuous improvement'),
    title: t('Un team che {impara} ogni giorno', 'A team that {learns} every day'),
    text: t('Formazione continua per restare sempre un passo avanti.', 'Ongoing training to always stay one step ahead.'),
    cta: { to: 'formazione-e-innovazione', label: t('Conosci il team', 'Meet the team') },
  },
  {
    label: 'TimeSheet Connect',
    title: t('Presenze e dipendenti, {sotto controllo}', 'Attendance and staff, {under control}'),
    text: t('In cloud, da computer, tablet e smartphone.', 'In the cloud, from computer, tablet and smartphone.'),
    cta: { to: 'timesheet-connect-cloud', label: t('Scopri il prodotto', 'Discover the product') },
  },
  {
    // Testo ripreso dall'annuncio ufficiale. Logo/badge Claude solo con i materiali del portale partner.
    label: 'Claude Partner Network',
    title: t('Siamo ufficialmente nella {Claude Partner Network}', 'We are officially part of the {Claude Partner Network}'),
    text: t("L'AI di Claude nei nostri progetti e nelle soluzioni per i clienti.", "Claude's AI in our projects and in the solutions we build for clients."),
    cta: { to: 'intelligenza-artificiale', label: t("Scopri l'area AI", 'Explore our AI practice') },
  },
];

/* Secondi di permanenza di ogni slide */
export const SLIDE_SECONDS = 8;
