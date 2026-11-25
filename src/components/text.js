import { accent, when } from '../lib/html.js';

/** Segnaposto giallo per contenuti ancora da fornire o verificare. */
export const todo = (text = '[DA FORNIRE]') => `<span class="todo">${text}</span>`;

/** Etichetta piccola in maiuscoletto con trattino rosso. */
export const label = (text) => `<p class="lab">${text}</p>`;

/** Titolo h2 con evidenziazione {…}. */
export const h2 = (text) => `<h2 class="h2">${accent(text)}</h2>`;

/** Nota grigia sotto un blocco. */
export const note = (html) => `<p class="note">${html}</p>`;

/** Etichetta di gruppo (es. "Partner", "Continua con"). */
export const groupLabel = (text) => `<p class="meta group-label">${text}</p>`;

/** Intestazione standard di sezione: etichetta, titolo, sottotitolo opzionale. */
export const sectionHead = (lab, title, lead) =>
  `<div class="sec-head">${label(lab)}${h2(title)}${when(lead, () => `<p class="lead">${lead}</p>`)}</div>`;

/** Blocco di testo tipico delle colonne: etichetta + titolo + contenuto libero. */
export const textBlock = ({ label: lab, title, body = '', prose = false }) =>
  `<div class="tx${prose ? ' prose' : ''}">${when(lab, () => label(lab))}${h2(title)}${body}</div>`;

/** Paragrafi da un array di stringhe. */
export const paragraphs = (list) => list.map((p) => `<p>${p}</p>`).join('');

/** Intestazione compatta su una riga: etichetta + titolo a sinistra, un link a destra. */
export const headRow = (lab, title, side = '') =>
  `<div class="head-row"><div><p class="lab">${lab}</p><h2 class="h2m">${accent(title)}</h2></div>${side}</div>`;
