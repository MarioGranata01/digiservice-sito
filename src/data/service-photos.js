import { t } from '../lib/i18n.js';

/*
 * Foto delle card servizi (blocks/services.js).
 * Basta copiare in src/assets/servizi/ un file chiamato come l'id del servizio
 * (es. cloud-solutions.jpg): viene preso in automatico. Senza foto la card
 * mostra l'illustrazione provvisoria di src/assets/servizi/illustrazioni/
 * (stesso nome, .svg) o, se manca anche quella, un segnaposto con il soggetto suggerito qui sotto.
 */
// Le opzioni vanno scritte qui dentro: Vite non legge una variabile
const photos = import.meta.glob('../assets/servizi/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
/* ?inline: le illustrazioni entrano nella pagina come testo, così nessuna estensione del browser può bloccarne l'indirizzo */
const drawings = import.meta.glob('../assets/servizi/illustrazioni/*.svg', { eager: true, import: 'default', query: '?inline' });

const byId = (files, id) =>
  Object.entries(files).find(([path]) => path.split('/').pop().replace(/\.\w+$/, '') === id)?.[1];

/* La foto vera ha la precedenza sull'illustrazione provvisoria */
export const servicePhoto = (id) => byId(photos, id) ?? byId(drawings, id);

/* Soggetto consigliato per ogni foto: persone e lavoro reale, niente grafiche astratte */
export const PHOTO_HINTS = {
  'consulenza-ict': t('Riunione con il cliente attorno a un tavolo', 'Client meeting around a table'),
  'cloud-solutions': t('Sala server o tecnico al lavoro sui rack', 'Server room or engineer working on racks'),
  'data-analytics': t('Persona che analizza grafici su un monitor', 'Person reviewing charts on a monitor'),
  'cyber-security': t('Postazione di monitoraggio con più schermi', 'Monitoring desk with several screens'),
  'sviluppo-software': t('Sviluppatori al computer, codice sullo schermo', 'Developers at their computers, code on screen'),
  devops: t('Team in piedi davanti a una lavagna di progetto', 'Team standing at a project board'),
  'intelligenza-artificiale': t('Colleghi che provano un assistente su laptop', 'Colleagues trying out an assistant on a laptop'),
};
