import { hero } from '../../components/hero.js';
import { section, splitSection } from '../../components/sections.js';
import { sectionHead, note, paragraphs, todo } from '../../components/text.js';
import { box, grid } from '../../components/cards.js';
import { chips, statusList } from '../../components/lists.js';
import { primary, outline, external, linkRow, arrow } from '../../components/links.js';
import { partnerLogos } from '../../blocks/partners.js';
import { pageCta } from '../../blocks/cta.js';
import { SCENES } from '../../data/scenes.js';
import { EXTERNAL } from '../../data/company.js';
import { LLM_TECHNIQUES } from '../../data/technologies.js';
import { t } from '../../lib/i18n.js';

const LEAD_WP = 3; // pacchetto di lavoro guidato da Digiservice
const workPackages = () => [1, 2, 3, 4, 5].map((n) => box({
  ico: `WP${n}`,
  red: n === LEAD_WP,
  title: n === LEAD_WP ? t('Pacchetto guidato da Digiservice', 'Work package led by Digiservice') : t('Titolo del pacchetto', 'Work package title'),
  body: `<p>${todo('[DA FORNIRE: titolo e descrizione dal sito ufficiale]')}</p>`,
}));

const RESULTS = [
  { kind: 'ok', status: t('Raggiunto', 'Achieved'), text: t('Sito ufficiale del progetto online (sigenera.eu)', 'Official project website online (sigenera.eu)') },
  { kind: 'ok', status: t('Raggiunto', 'Achieved'), text: t('Presentazione del progetto a HYDRA 2026 (8 settembre 2026, Klagenfurt)', 'Project presented at HYDRA 2026 (8 September 2026, Klagenfurt)') },
  { kind: 'go', status: t('In corso', 'In progress'), text: t('Sviluppo dei pacchetti di lavoro e crescita del livello di maturità tecnologica (da TRL 6 a TRL 8)', 'Development of the work packages and advancement of technology readiness (from TRL 6 to TRL 8)') },
  { kind: 'pl', status: t('Pianificato', 'Planned'), text: t('Partecipazione a conferenze e pubblicazioni scientifiche', 'Participation in conferences and scientific publications') },
  { kind: 'pl', status: t('In arrivo', 'Coming soon'), text: t('Risultati e dimostratori: sezione «Prossimamente», da aggiornare quando disponibili', 'Results and demonstrators: "Coming soon" section, to be updated when available') },
];

export default () => [
  hero({
    crumb: [[t('Progetti', 'Projects'), 'progetti'], ['SiGENERA']],
    label: t('Progetto di ricerca e sviluppo', 'Research and development project'),
    title: t('SiGENERA: ricerca applicata su IA generativa e {modelli linguistici}.', 'SiGENERA: applied research on generative AI and {language models}.'),
    lead: t("L'intelligenza artificiale generativa messa alla prova su casi d'uso reali. Un progetto di ricerca e sviluppo di cui Digiservice è impresa capofila.", 'Generative artificial intelligence put to the test on real-world use cases. A research and development project in which Digiservice is the lead partner.'),
    actions: [external(EXTERNAL.sigenera, t('Vai al sito del progetto', 'Visit the project website'), 'primary'), outline('contatti', t('Parla con noi del progetto', 'Talk to us about the project'))],
    scene: SCENES.globeLite,
    tags: ['LLM', 'RAG', 'Fine-tuning'],
  }),

  splitSection({
    tight: true,
    prose: true,
    label: t('Di cosa si tratta', 'What it is about'),
    title: t('Una piattaforma basata su {Large Language Models}', 'A platform based on {Large Language Models}'),
    body: paragraphs([
      t("SiGENERA è una piattaforma basata su Large Language Models per generare codice, assistere gli studenti universitari e verbalizzare le riunioni. È sviluppata con ID Technology, Tecnoinnovis e Università della Calabria nell'ambito del PR Calabria FESR+ FSE+ 2021-2027.", 'SiGENERA is a platform based on Large Language Models for generating code, assisting university students and taking meeting minutes. It is being developed with ID Technology, Tecnoinnovis and the University of Calabria under the PR Calabria FESR+ FSE+ 2021-2027 programme.'),
      todo('[DA VERIFICARE: linea di finanziamento e testo ufficiale di presentazione]'),
    ]),
    scene: SCENES.neural,
  }),

  section({ alt: true }, sectionHead(t('Obiettivi e attività di ricerca', 'Research goals and activities'), t('Cinque pacchetti di lavoro, dal livello {TRL 6 al TRL 8}', 'Five work packages, from {TRL 6 to TRL 8}'))
    + `<div class="trl" aria-label="${t('Maturità tecnologica', 'Technology readiness')}"><span>TRL 6</span><i></i><span>TRL 8</span></div>`
    + grid(workPackages())),

  splitSection({
    reverse: true,
    label: t('Il ruolo di Digiservice', "Digiservice's role"),
    title: t('Impresa {capofila} e guida del WP3', '{Lead partner} and leader of WP3'),
    body: paragraphs([t(
      `Digiservice è l'impresa capofila del progetto e guida il pacchetto di lavoro WP3. Coordinamento, sviluppo software e integrazione delle soluzioni sono le attività in cui l'azienda mette a disposizione il proprio lavoro. ${todo('[DA VERIFICARE: contenuto tecnico esatto del WP3]')}`,
      `Digiservice is the project's lead partner and leads work package WP3. Coordination, software development and solution integration are the activities to which the company contributes its work. ${todo('[DA VERIFICARE: contenuto tecnico esatto del WP3]')}`,
    )]),
    scene: SCENES.orbitTeam,
  }),

  section({ alt: true }, sectionHead(t('Partner e collaborazioni', 'Partners and collaborations'), t('Una {rete} di competenze', 'A {network} of expertise'))
    + partnerLogos()
    + note(t(
      `Gli stagisti dell'ITS CADMO saranno coinvolti in formazione on the job nello sviluppo dei moduli software. Loghi: ${todo("[DA VERIFICARE: autorizzazione all'uso]")}`,
      `Interns from ITS CADMO will be involved in on-the-job training in the development of the software modules. Logos: ${todo("[DA VERIFICARE: autorizzazione all'uso]")}`,
    ))),

  section({}, sectionHead(t('Tecnologie e attività di ricerca', 'Technologies and research activities'), t('Le tecniche {affrontate}', 'The techniques {explored}'))
    + chips([...LLM_TECHNIQUES, 'Large Language Models'])
    + note(t('Applicazioni: generazione di codice, assistenza agli studenti universitari, verbalizzazione delle riunioni. Con TimeSheet Connect Cloud si punta a sperimentare agenti digitali: è ricerca in corso, non una funzione disponibile.', 'Applications: code generation, support for university students, meeting minutes. With TimeSheet Connect Cloud, the aim is to experiment with digital agents: this is ongoing research, not an available feature.'))),

  section({ alt: true }, sectionHead(t('Risultati raggiunti e in corso', 'Results achieved and in progress'), t('A che punto {siamo}', 'Where {we stand}')) + statusList(RESULTS)),

  section({}, box({
    red: true,
    title: t('Il progetto sul web', 'The project online'),
    text: t('Per tutti gli aggiornamenti ufficiali, gli eventi e i materiali del progetto.', 'For all official updates, events and project materials.'),
    body: linkRow([external(EXTERNAL.sigenera, t('Sito ufficiale sigenera.eu', 'Official website sigenera.eu'), 'arrow'), arrow('eventi', t('Evento HYDRA 2026', 'HYDRA 2026 event'))])
      + `<p>${todo('[DA FORNIRE: loghi, dichiarazione di finanziamento e disclaimer UE/FESR; date di inizio e fine; budget e CUP, se pubblicabili]')}</p>`,
  })),

  pageCta({ title: t("Vuoi portare l'IA generativa nei tuoi processi?", 'Want to bring generative AI into your processes?'), text: t('Raccontaci il caso.', 'Tell us about your case.'), label: t('Parla con noi', 'Talk to us'), scene: SCENES.neural }),
].join('');
