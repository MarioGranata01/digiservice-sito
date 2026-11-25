import { hero } from '../../components/hero.js';
import { section, splitSection } from '../../components/sections.js';
import { sectionHead } from '../../components/text.js';
import { box, numberedBoxes, titledBoxes, plan } from '../../components/cards.js';
import { checklist, faq } from '../../components/lists.js';
import { external, outline, link } from '../../components/links.js';
import { canvas } from '../../components/scene.js';
import { pageCta } from '../../blocks/cta.js';
import { SCENES } from '../../data/scenes.js';
import { EXTERNAL } from '../../data/company.js';
import { each } from '../../lib/html.js';
import { t } from '../../lib/i18n.js';

const PROBLEMS = [
  t('Presenze e assenze gestite tra fogli di calcolo, e-mail e messaggi.', 'Attendance and absences managed across spreadsheets, e-mails and messages.'),
  t('Ore lavorate sulle commesse difficili da ricostruire a fine mese.', 'Hours worked on jobs that are hard to reconstruct at the end of the month.'),
  t('Note spese, contratti e cedolini sparsi in luoghi diversi.', 'Expense claims, contracts and payslips scattered across different places.'),
  t("In cantiere: sapere chi è entrato, con quale badge e per conto di quale impresa.", 'On site: knowing who came in, with which badge and on behalf of which company.'),
];

const FEATURE_AREAS = [
  [t('Presenze e persone', 'Attendance and people'), [
    t('Timbratura geolocalizzata da app mobile', 'Geolocated clock-in from the mobile app'),
    t('Registrazione delle ore sulle commesse (TimeSheet)', 'Recording hours against jobs (TimeSheet)'),
    t('Ferie e permessi', 'Holidays and leave'),
    t('Gestione dei turni', 'Shift management'),
    t('Gestione dei team', 'Team management'),
  ]],
  [t('Amministrazione e HR', 'Administration and HR'), [
    t('Note spese con flusso di approvazione', 'Expense claims with approval workflow'),
    t('Documentazione contrattuale e cedolini', 'Contract documents and payslips'),
    t('Reportistica mensile personalizzabile', 'Customisable monthly reporting'),
    t('Esportazione dei dati per le retribuzioni con un clic', 'One-click export of payroll data'),
    t('Andamento e gestione delle commesse', 'Job tracking and management'),
    t('Rubrica clienti e fornitori', 'Customer and supplier directory'),
  ]],
  [t('Cantiere', 'Construction site'), [
    t('Badge digitale con QR code univoco', 'Digital badge with unique QR code'),
    t('Registrazione di ingressi e uscite tramite scansione QR', 'Entry and exit logging via QR scan'),
    t('Verifica immediata della validità del badge', 'Instant badge validity check'),
    t('Tracciamento di imprese e livelli di subappalto per ogni cantiere', 'Tracking of companies and subcontracting levels for each site'),
    t('Gestione dei veicoli, documentazione di cantiere, tornelli di cantiere geolocalizzati', 'Vehicle management, site documentation, geolocated site turnstiles'),
  ]],
];

const PLANS = [
  { kicker: t('Piano', 'Plan'), title: 'Professional', features: [
    t('Rendicontazione attività', 'Activity reporting'),
    t('Gestione buste paga', 'Payslip management'),
    t('Gestione turni', 'Shift management'),
    t('Gestione documenti', 'Document management'),
    t('Nota spese', 'Expense claims'),
    t('Gestione tornelli', 'Turnstile management'),
    t('Timbratura geolocalizzata da smartphone', 'Geolocated clock-in from smartphone'),
    t('App mobile', 'Mobile app'),
    t('Prova gratuita di 15 giorni', '15-day free trial'),
  ] },
  { kicker: t('Per i cantieri', 'For construction sites'), title: 'Cantiere Pro', highlight: true, intro: t('Tutto il piano Professional, più:', 'Everything in the Professional plan, plus:'), features: [
    t('Gestione dei veicoli', 'Vehicle management'),
    t('Documentazione di cantiere', 'Site documentation'),
    t('Tornelli di cantiere geolocalizzati', 'Geolocated site turnstiles'),
    t('Subappalti', 'Subcontracting'),
    t('Badge di cantiere', 'Site badges'),
  ] },
  { kicker: t('Completo', 'Complete'), title: 'Deluxe', intro: t('Tutte le funzioni Professional, più:', 'All Professional features, plus:'), features: [
    t('Aggiornamenti automatici', 'Automatic updates'),
    t('Assistenza dedicata', 'Dedicated support'),
    t('Disponibile in cloud o on-premises', 'Available in the cloud or on-premises'),
    t("Federazione dell'autenticazione", 'Authentication federation'),
    t('Esportazioni custom', 'Custom exports'),
    t('Integrazione con altri sistemi aziendali', 'Integration with other business systems'),
    t('Caricamento automatizzato delle buste paga', 'Automated payslip upload'),
  ], footer: t('Prezzo dedicato: contattaci', 'Custom pricing: contact us') },
];

const AUDIENCES = [
  [t('Aziende e titolari', 'Companies and owners'), t("Un'unica fonte per presenze, commesse e costi del personale; meno passaggi manuali; nessuna installazione né manutenzione tecnica grazie alla versione cloud gestita.", 'A single source for attendance, jobs and staff costs; fewer manual steps; no installation or technical maintenance thanks to the managed cloud version.')],
  [t('Responsabili HR', 'HR managers'), t("Ferie, permessi, turni e documenti nello stesso posto; i dipendenti operano in autonomia dall'app.", 'Holidays, leave, shifts and documents in one place; employees manage things independently from the app.')],
  [t('Amministrazione', 'Administration'), t('Ore e presenze esportabili per le paghe con un clic; note spese con flusso di approvazione; cedolini e documenti archiviati.', 'Hours and attendance exportable for payroll in one click; expense claims with approval workflow; payslips and documents archived.')],
  [t('Consulenti del lavoro', 'Payroll consultants'), t('Dati di presenza ordinati, in report mensili personalizzabili; con il piano Deluxe, esportazioni custom e caricamento automatizzato delle buste paga.', 'Well-organised attendance data in customisable monthly reports; with the Deluxe plan, custom exports and automated payslip upload.')],
  [t('Imprese edili e cantieri', 'Construction companies and sites'), t('Badge con QR, controllo degli accessi e tracciamento dei subappalti, con il piano Cantiere Pro.', 'QR badges, access control and subcontractor tracking, with the Cantiere Pro plan.')],
  [t('Dipendenti', 'Employees'), t('App per Android e iOS per timbrare e consultare le proprie informazioni.', 'Android and iOS app to clock in and view their own information.')],
];

const SERVICE_TERMS = [
  t('La versione Cloud è totalmente gestita da Digiservice', 'The Cloud version is fully managed by Digiservice'),
  t("La migrazione dei dati da un'installazione on-premise al cloud è gratuita", 'Data migration from an on-premise installation to the cloud is free of charge'),
  t('Supporto dal lunedì al venerdì, dalle 9:00 alle 18:00, a support@gestione-dipendenti.it', 'Support Monday to Friday, 9:00 to 18:00, at support@gestione-dipendenti.it'),
  t('Nuove funzionalità: il team le valuta e in alcuni casi le include senza costi per il cliente', 'New features: the team assesses requests and in some cases adds them at no cost to the customer'),
  t('Servizio in abbonamento annuale', 'Annual subscription service'),
];

const FAQ = [
  [t('Il software è gratuito?', 'Is the software free?'), t('No: è a pagamento, con prova gratuita di 15 giorni su ogni piano.', 'No: it is a paid product, with a 15-day free trial on every plan.')],
  [t("Posso passare dall'installazione on-premise al cloud?", 'Can I move from an on-premise installation to the cloud?'), t('Sì, la migrazione dei dati è gratuita.', 'Yes, data migration is free of charge.')],
  [t("C'è un'app per i dipendenti?", 'Is there an app for employees?'), t('Sì, per Android (Google Play) e iOS (App Store).', 'Yes, for Android (Google Play) and iOS (App Store).')],
  [t('Posso chiedere nuove funzionalità?', 'Can I request new features?'), t('Sì: il team le valuta e talvolta le include senza costi.', 'Yes: the team assesses them and sometimes adds them at no cost.')],
  [t('Come si paga?', 'How do I pay?'), t("Con abbonamento annuale, in un'unica soluzione anticipata all'attivazione o al rinnovo.", 'Through an annual subscription, paid in a single upfront instalment on activation or renewal.')],
];

/** Mockup di smartphone con la schermata di timbratura. */
const phoneMockup = () => `<div class="phone" aria-hidden="true"><b>${t('Buongiorno', 'Good morning')}</b><div class="ck">${t('Timbra ingresso', 'Clock in')}</div>
${each([[t('Oggi', 'Today'), '08:57'], [t('Ferie residue', 'Holiday left'), '—'], [t('Turno', 'Shift'), '—'], [t('Nota spese', 'Expenses'), '+']], ([k, v]) => `<div class="ln">${k}<i>${v}</i></div>`)}
<small class="meta">${t('Schermata di esempio', 'Sample screen')}</small></div>`;

export default () => [
  hero({
    crumb: [[t('Prodotti', 'Products'), 'prodotti'], ['TimeSheet Connect Cloud']],
    label: t('Prodotto Digiservice', 'A Digiservice product'),
    title: t("TimeSheet Connect Cloud: {presenze} e risorse umane in un'unica piattaforma.", 'TimeSheet Connect Cloud: {attendance} and human resources in a single platform.'),
    lead: t('Una piattaforma cloud che riunisce timbrature, ferie e permessi, turni, note spese e documenti. Niente fogli di calcolo né e-mail per coordinare assenze e turni: i dati sono allineati e pronti per le paghe.', 'A cloud platform that brings together clock-ins, holidays and leave, shifts, expense claims and documents. No more spreadsheets or e-mails to coordinate absences and shifts: data stays aligned and ready for payroll.'),
    actions: [
      external(EXTERNAL.timesheet, t('Prova gratis per 15 giorni', 'Try it free for 15 days'), 'primary'),
      outline('contatti', t('Richiedi una demo', 'Request a demo')),
      external(EXTERNAL.timesheet, t('Sito ufficiale', 'Official website'), 'arrow'),
    ],
    visual: canvas(SCENES.cloudCard),
    tags: [t('Timbratura geolocalizzata', 'Geolocated clock-in'), t('Ferie e permessi', 'Holidays and leave'), t('Badge di cantiere', 'Site badges')],
  }),

  section({ tight: true }, `<div class="stores"><span>${t('Disponibile su Google Play', 'Available on Google Play')}</span><span>${t('Disponibile su App Store', 'Available on the App Store')}</span></div>`),

  section({ tight: true }, sectionHead(t('Cosa risolve', 'What it solves'), t('Meno {passaggi manuali}, più controllo', 'Fewer {manual steps}, more control')) + numberedBoxes(PROBLEMS)),

  section({ alt: true }, sectionHead(t('Le funzioni', 'Features'), t('Tre aree, {una sola} piattaforma', 'Three areas, {one} platform'))
    + `<div class="split">${phoneMockup()}<div class="stack">${each(FEATURE_AREAS, ([title, items]) => box({ title, body: checklist(items) }))}</div></div>`),

  section({}, sectionHead(t('I piani', 'Plans'), t('Tre piani, {come pubblicati} sul sito ufficiale', 'Three plans, {as published} on the official website'), t('Prezzi e condizioni sono aggiornati solo sul sito ufficiale.', 'Prices and terms are kept up to date only on the official website.'))
    + `<div class="plans">${each(PLANS, plan)}</div>`),

  section({ alt: true }, sectionHead(t('Vantaggi per chi lo usa', 'Benefits for users'), t('Ogni ruolo {trova il suo spazio}', 'Every role {has its place}')) + titledBoxes(AUDIENCES)),

  splitSection({
    label: t('Cloud, assistenza e continuità', 'Cloud, support and continuity'),
    title: t('Un servizio {gestito da noi}', 'A service {managed by us}'),
    body: checklist(SERVICE_TERMS),
    aside: box({
      red: true,
      body: `<span class="tag">${t("Il prodotto e l'AI", 'The product and AI')}</span><h3>${t('Ricerca in corso', 'Ongoing research')}</h3><p>${t('Nel progetto di ricerca SIGENERA, Digiservice punta a potenziare TimeSheet Connect con agenti digitali basati su AI generativa e Large Language Models. Si tratta di attività di ricerca in corso, non di una funzione già disponibile.', 'Through the SIGENERA research project, Digiservice aims to enhance TimeSheet Connect with digital agents based on generative AI and Large Language Models. This is ongoing research, not a feature that is already available.')}</p>${link('sigenera', t('Leggi il progetto SIGENERA', 'Read about the SIGENERA project'), 'arrow')}`,
    }),
  }),

  section({ alt: true }, sectionHead(t('Domande frequenti', 'Frequently asked questions'), t('Le risposte {più richieste}', 'The {most requested} answers')) + faq(FAQ)),

  pageCta({
    title: t('Prova TimeSheet Connect Cloud per 15 giorni.', 'Try TimeSheet Connect Cloud for 15 days.'),
    text: t('Provalo gratis, oppure chiedici una demo: le richieste arrivano alla casella commerciale di Digiservice.', "Try it free, or ask us for a demo: requests go straight to Digiservice's sales inbox."),
    label: t('Richiedi una demo', 'Request a demo'),
    scene: SCENES.cloud,
    extra: external(EXTERNAL.timesheet, t('Sito ufficiale', 'Official website')),
  }),
].join('');
