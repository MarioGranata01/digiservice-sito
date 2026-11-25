import { classAttr, each } from '../lib/html.js';
import { href } from '../lib/i18n.js';

/*
 * Link e pulsanti.
 * Un'"azione" è un oggetto { label, to } (pagina interna) oppure { label, url } (sito esterno),
 * con variant opzionale: 'primary' | 'outline' | 'arrow' | 'plain' | 'small'.
 */
const VARIANTS = {
  primary: 'btn btn-p',
  outline: 'btn btn-o',
  arrow: 'arr',
  plain: 'btn',
  small: 'btn btn-p btn-s',
};

/** Link a una pagina interna (id della rotta). */
export const link = (to, label, variant) => `<a href="${href(to)}"${classAttr(VARIANTS[variant] ?? variant)}>${label}</a>`;

/** Link esterno, aperto in una nuova scheda. Di default con la freccia. */
export const extLink = (url, label, variant = 'arrow') =>
  `<a href="${url}" target="_blank" rel="noopener"${classAttr(VARIANTS[variant] ?? variant)}>${label}</a>`;

/** Pulsante che scorre fino a un elemento della pagina (gestito dal router). */
export const scrollLink = (target, label, variant) =>
  `<a href="#" data-scroll="${target}"${classAttr(VARIANTS[variant] ?? variant)}>${label}</a>`;

export const action = ({ label, to, url, scroll, variant }) => {
  if (url) return extLink(url, label, variant);
  if (scroll) return scrollLink(scroll, label, variant);
  return link(to, label, variant);
};

/* Scorciatoie per le azioni più comuni */
export const primary = (to, label) => ({ to, label, variant: 'primary' });
export const outline = (to, label) => ({ to, label, variant: 'outline' });
export const arrow = (to, label) => ({ to, label, variant: 'arrow' });
export const external = (url, label, variant = 'outline') => ({ url, label, variant });

/** Gruppo di pulsanti affiancati. */
export const actions = (list = [], extra) => (list.length ? `<div${classAttr('actions', extra)}>${each(list, action)}</div>` : '');

/** Riga di link testuali (freccia). */
export const linkRow = (list) => `<div class="link-row">${each(list, (a) => action({ variant: 'arrow', ...a }))}</div>`;
