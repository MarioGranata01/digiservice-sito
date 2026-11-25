import { t } from '../lib/i18n.js';
import { each } from '../lib/html.js';
import { canvas } from './scene.js';

/*
 * Moduli. Un campo è { type, name, label, autocomplete?, options? }.
 * type: 'text' | 'email' | 'file' | 'textarea' | 'select' | 'privacy'
 */
const field = (f, formId) => {
  const id = `${formId}-${f.name}`;
  const ac = f.autocomplete ? ` autocomplete="${f.autocomplete}"` : '';
  switch (f.type) {
    case 'textarea':
      return `<label>${f.label}<textarea class="inp" id="${id}" name="${f.name}" rows="4"></textarea></label>`;
    case 'select':
      return `<label>${f.label}<select class="inp sel" id="${id}" name="${f.name}">${each(f.options, (o) => `<option>${o}</option>`)}</select></label>`;
    case 'privacy':
      return `<label class="pv"><input type="checkbox" id="${id}" name="${f.name}"> ${f.label}</label>`;
    default:
      return `<label>${f.label}<input class="inp" id="${id}" name="${f.name}" type="${f.type}"${ac}></label>`;
  }
};

/* Campi riusati in più moduli */
export const FIELDS = {
  name: { type: 'text', name: 'nome', label: t('Nome e cognome', 'Full name'), autocomplete: 'name' },
  company: { type: 'text', name: 'azienda', label: t('Azienda', 'Company'), autocomplete: 'organization' },
  email: { type: 'email', name: 'email', label: 'Email', autocomplete: 'email' },
  message: { type: 'textarea', name: 'messaggio', label: t('Messaggio', 'Message') },
  privacy: { type: 'privacy', name: 'privacy', label: t("Ho letto l'informativa sulla privacy", 'I have read the privacy policy') },
};

/** Modulo su pannello di vetro. In anteprima non invia dati (vedi shell/router.js). */
export const form = ({ id, fields, submit }) =>
  `<form class="fc" id="${id}" novalidate>${each(fields, (f) => field(f, id))}<button class="btn btn-p" type="submit">${submit}</button><p class="fmsg" role="status"></p></form>`;

/** Riquadro con scena 3D sullo sfondo; contenuto opzionale (es. un modulo) in primo piano. */
export const sceneFrame = (sc, content = '', extra = '') => `<div class="fw${extra ? ` ${extra}` : ''}">${canvas(sc)}${content}</div>`;
