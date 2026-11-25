import { t } from '../lib/i18n.js';

/*
 * Foto delle card servizi (blocks/services.js).
 * Basta copiare in src/assets/servizi/ un file chiamato come l'id del servizio
 * (es. cloud-solutions.jpg): viene preso in automatico. Senza foto la card
 * mostra un segnaposto con il soggetto suggerito qui sotto.
 */
const files = import.meta.glob('../assets/servizi/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });

export const servicePhoto = (id) =>
  Object.entries(files).find(([path]) => path.split('/').pop().replace(/\.\w+$/, '') === id)?.[1];

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
