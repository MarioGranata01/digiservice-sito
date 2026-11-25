import { t } from '../lib/i18n.js';
import { ctaBlock } from '../components/sections.js';
import { SCENES } from '../data/scenes.js';

export const CONSULT = t('Richiedi una consulenza', 'Request a consultation');

/**
 * Invito all'azione di fine pagina con i default del sito:
 * pulsante "Richiedi una consulenza" verso Contatti e scena "cloud".
 * { title, text, label?, to?, scene?, extra?: azione secondaria }
 */
export const pageCta = ({ title, text, label = CONSULT, to = 'contatti', scene = SCENES.cloudCta, extra }) =>
  ctaBlock({ title, text, scene, actions: [{ to, label, variant: 'primary' }, ...(extra ? [extra] : [])] });
