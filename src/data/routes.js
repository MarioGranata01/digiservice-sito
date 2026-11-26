import { t } from '../lib/i18n.js';
import { SERVICES, SERVICE_IDS } from './services.js';

/*
 * Elenco di tutte le pagine: id (usato nell'URL #id), titolo, URL previsto su WordPress
 * e sezione del menu principale da evidenziare.
 * Il contenuto di ogni pagina è in src/pages (registrato in src/pages/index.js).
 */
/* URL inglese previsto: stesso percorso con il prefisso /en (gli slug si potranno tradurre in WordPress). */
const page = (id, title, url, section = id) => ({ id, title, url, urlEn: url ? `/en${url}` : '', section });

export const ROUTES = [
  page('home', 'Home', '/'),
  page('azienda', t('Azienda', 'Company'), '/azienda/'),
  page('chi-siamo', t('Chi siamo', 'About us'), '/chi-siamo/', 'azienda'),
  page('mission-e-valori', t('Missione e valori', 'Mission and values'), '/azienda/mission-e-valori/', 'azienda'),
  page('formazione-e-innovazione', t('Formazione e innovazione', 'Training & innovation'), '/azienda/formazione-e-innovazione/', 'azienda'),
  page('servizi', t('Servizi', 'Services'), '/servizi/'),
  ...SERVICES.map((s) => page(s.id, s.title, s.url, 'servizi')),
  page('prodotti', t('Prodotti', 'Products'), '/prodotti/'),
  page('timesheet-connect-cloud', 'TimeSheet Connect Cloud', '/prodotti/timesheet-connect-cloud/', 'prodotti'),
  page('scadenzario', 'Scadenzario', '/prodotti/scadenzario/', 'prodotti'),
  page('archiviart', 'Archiviart', '/prodotti/archiviart/', 'prodotti'),
  page('progetti', t('Progetti', 'Projects'), '/progetti/'),
  page('sigenera', 'SiGENERA', '/progetti/sigenera/', 'progetti'),
  page('news-eventi', t('News ed eventi', 'News & events'), '/news-eventi/'),
  page('blog', 'Blog', '/blog/', 'news-eventi'),
  page('eventi', t('Eventi', 'Events'), '/eventi/', 'news-eventi'),
  page('lavora-con-noi', t('Lavora con noi', 'Careers'), '/lavora-con-noi/'),
  page('candidatura-spontanea', t('Candidatura spontanea', 'Open application'), '/lavora-con-noi/candidatura-spontanea/', 'lavora-con-noi'),
  page('contatti', t('Contatti', 'Contact'), '/contatti/'),
  page('mappa', t('Mappa del sito', 'Sitemap'), '', null),
];

const byId = Object.fromEntries(ROUTES.map((r) => [r.id, r]));
export const getRoute = (id) => byId[id];
export const pageTitle = (id) => byId[id]?.title ?? id;

/* Raggruppamenti usati da menu, footer e mappa del sito */
export const GROUPS = [
  { id: 'home', title: 'Home', pages: ['home'] },
  { id: 'azienda', title: t('Azienda', 'Company'), pages: ['azienda', 'chi-siamo', 'mission-e-valori', 'formazione-e-innovazione'] },
  { id: 'servizi', title: t('Servizi', 'Services'), pages: ['servizi', ...SERVICE_IDS] },
  { id: 'prodotti', title: t('Prodotti', 'Products'), pages: ['prodotti', 'timesheet-connect-cloud', 'scadenzario', 'archiviart'] },
  { id: 'progetti', title: t('Progetti', 'Projects'), pages: ['progetti', 'sigenera'] },
  { id: 'news-eventi', title: t('News ed eventi', 'News & events'), pages: ['news-eventi', 'blog', 'eventi'] },
  { id: 'lavora-con-noi', title: t('Lavora con noi', 'Careers'), pages: ['lavora-con-noi', 'candidatura-spontanea'] },
  { id: 'contatti', title: t('Contatti', 'Contact'), pages: ['contatti'] },
];
