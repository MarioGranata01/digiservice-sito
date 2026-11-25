import { hero } from '../../components/hero.js';
import { section, splitSection, featureBanner } from '../../components/sections.js';
import { sectionHead, note, paragraphs, todo } from '../../components/text.js';
import { titledBoxes } from '../../components/cards.js';
import { timeline, steps } from '../../components/lists.js';
import { primary, outline } from '../../components/links.js';
import { SCENES } from '../../data/scenes.js';
import { addressHtml } from '../../data/company.js';
import { t } from '../../lib/i18n.js';

const HISTORY = [
  ['2022', t('Nasce Digiservice', 'Digiservice is founded')],
  ['2023', t(`TimeSheet Connect entra in Digiservice ${todo('[DA VERIFICARE: data esatta]')}`, `TimeSheet Connect joins Digiservice ${todo('[DA VERIFICARE: data esatta]')}`)],
  ['2025', t('Avvio del progetto SIGENERA', 'The SIGENERA project starts')],
  ['2026', t('SIGENERA presentato a HYDRA 2026, Klagenfurt (8 settembre)', 'SIGENERA presented at HYDRA 2026, Klagenfurt (8 September)')],
];

const APPROACH = [
  { title: t('Capire', 'Understand'), text: t('Analizziamo il contesto aziendale e le esigenze specifiche del cliente.', "We analyse the business context and the client's specific needs.") },
  { title: t('Progettare', 'Design'), text: t('Definiamo architettura e roadmap allineate agli obiettivi di business.', 'We define an architecture and roadmap aligned with business goals.') },
  { title: t('Costruire', 'Build'), text: t('Sviluppiamo con metodologie agili e testiamo lungo tutto il ciclo di vita.', 'We develop with agile methods and test throughout the entire lifecycle.') },
  { title: t('Far evolvere', 'Evolve'), text: t('Garantiamo manutenzione, evoluzione continua e supporto nel tempo.', 'We provide maintenance, continuous improvement and long-term support.') },
];

const SKILLS = [
  [t('Sviluppo software', 'Software development'), 'Java, Spring, .NET Core, Node.js, Angular, React, Flutter, Android'],
  ['Cloud', 'AWS, Microsoft Azure, Google Cloud, Kubernetes'],
  [t('Dati', 'Data'), t('Pipeline ETL/ELT, dashboard, Hadoop', 'ETL/ELT pipelines, dashboards, Hadoop')],
  ['DevOps', 'CI/CD, Terraform, Ansible, Docker'],
  ['Testing', 'Selenium'],
  [t('Cyber security e AI', 'Cyber security & AI'), t('VAPT, IAM, SIEM/SOC · chatbot, agenti, LLM', 'VAPT, IAM, SIEM/SOC · chatbots, agents, LLMs')],
];

export default () => [
  hero({
    crumb: [[t('Azienda', 'Company'), 'azienda'], [t('Chi siamo', 'About us')]],
    label: t('Azienda · Chi siamo', 'Company · About us'),
    title: t('Chi siamo: consulenza ICT {a Rende}.', 'About us: ICT consulting {in Rende}.'),
    lead: t('Digiservice è una società di consulenza ICT giovane e dinamica, con sede a Rende, in provincia di Cosenza.', 'Digiservice is a young, dynamic ICT consultancy based in Rende, in the province of Cosenza.'),
    actions: [primary('servizi', t('I nostri servizi', 'Our services')), outline('contatti', t('Parla con noi', 'Talk to us'))],
    scene: SCENES.orbitTeam,
  }),

  splitSection({
    tight: true,
    prose: true,
    label: t('Una società di consulenza ICT', 'An ICT consultancy'),
    title: t('Partiamo da un problema di business{.}', 'We start from a business problem{.}'),
    body: paragraphs([t('Aiutiamo le aziende a progettare, sviluppare e far evolvere le loro soluzioni digitali: software su misura, architetture cloud, valorizzazione dei dati, cyber security e intelligenza artificiale. Partiamo da un problema di business, scegliamo gli strumenti adatti e restiamo accanto al cliente fino ai risultati.', 'We help companies design, develop and evolve their digital solutions: custom software, cloud architectures, data value, cyber security and artificial intelligence. We start from a business problem, choose the right tools and stay alongside the client all the way to results.')]),
    scene: SCENES.globe,
  }),

  splitSection({
    alt: true,
    reverse: true,
    prose: true,
    label: t('La nostra storia', 'Our story'),
    title: t("Dal 2022, {un passo} dopo l'altro", 'Since 2022, {one step} at a time'),
    body: paragraphs([t("Digiservice nasce nel 2022 dall'esperienza decennale di professionisti del settore, con consulenza, sviluppo, manutenzione e testing del software in domini applicativi diversi. Negli anni l'offerta si è allargata alle architetture cloud, all'analisi dei dati e alla cyber security. Più di recente è arrivata l'intelligenza artificiale, con chatbot e agenti intelligenti. Oggi Digiservice è impresa capofila del progetto di ricerca SIGENERA.", 'Digiservice was founded in 2022, drawing on industry professionals\' ten years of experience in software consulting, development, maintenance and testing across different application domains. Over the years our offering has expanded to cloud architectures, data analytics and cyber security. More recently came artificial intelligence, with chatbots and intelligent agents. Today Digiservice is the lead company of the SIGENERA research project.')]),
    aside: timeline(HISTORY),
  }),

  section({}, sectionHead(t('Il nostro approccio', 'Our approach'), t('Quattro passi, {sempre gli stessi}', 'Four steps, {every time}')) + steps(APPROACH)),

  section({ alt: true }, sectionHead(t('Le competenze del team', "The team's skills"), t('Tante competenze, {un solo} team', 'Many skills, {one} team'))
    + titledBoxes(SKILLS)
    + note(`${t('Numero di persone, ruoli e profili del team', 'Team size, roles and profiles')}: ${todo()}`)),

  section({}, featureBanner({
    label: t('Dove siamo', 'Where we are'),
    title: addressHtml(),
    actions: [primary('contatti', t('Parla con noi', 'Talk to us'))],
    scene: SCENES.globe,
  })),
].join('');
