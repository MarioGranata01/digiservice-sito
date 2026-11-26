import { t } from '../lib/i18n.js';
/* Tecnologie mostrate nella home (nastro scorrevole e sezione partnership). */
export const STACK = [
  'AWS', 'Microsoft Azure', 'Google Cloud', 'Kubernetes', 'Java', 'Spring', '.NET Core',
  'Node.js', 'Angular', 'React', 'Flutter', 'Android', 'Hadoop', 'Selenium',
];

/* Tecnologie principali in home: poche e raggruppate (tre per gruppo). */
export const TECH_GROUPS = [
  ['Cloud', ['AWS', 'Microsoft Azure', 'Google Cloud']],
  [t('Sviluppo', 'Development'), [t('Java e Spring', 'Java & Spring'), '.NET Core', t('React e Angular', 'React & Angular')]],
  [t('Mobile e DevOps', 'Mobile & DevOps'), ['Flutter', 'Android', 'Kubernetes']],
];

/* Partner del progetto SiGENERA e collaboratori: home e pagina SiGENERA. */
export const PARTNERS = ['ID Technology', 'Tecnoinnovis', t('Università della Calabria', 'University of Calabria')];
export const COLLABORATORS = ['ICAR-CNR', 'Revelis'];
/* Collaborazioni qualificate in home (indipendenti da SiGENERA): nome + tipo di realtà. */
export const COLLABORATIONS = [
  ['ICAR-CNR', t('Ricerca', 'Research'), t('Istituto di Calcolo e Reti ad Alte Prestazioni del CNR', 'High Performance Computing and Networking Institute of the Italian National Research Council (CNR)')],
  ['Revelis', t('Impresa', 'Company'), t('Partner tecnologico', 'Technology partner')],
];

/* Tecniche di ricerca su LLM affrontate in SiGENERA. */
export const LLM_TECHNIQUES = ['Fine-tuning', 'RAG', t('Quantizzazione', 'Quantisation'), t('Prompting avanzato', 'Advanced prompting')];
