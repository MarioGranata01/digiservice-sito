import { t } from '../lib/i18n.js';
import { each, classAttr } from '../lib/html.js';
import { link } from './links.js';

/** Elenco puntato con trattino rosso. */
export const checklist = (items) => `<ul class="chk">${each(items, (x) => `<li>${x}</li>`)}</ul>`;

/** Pillole di testo statiche (tecnologie, tecniche…). */
export const chips = (items) => `<div class="chips">${each(items, (x) => `<span>${x}</span>`)}</div>`;

/** Pillole cliccabili verso pagine interne: [{ to, label }]. */
export const chipLinks = (items) => `<div class="chips">${each(items, (x) => link(x.to, x.label))}</div>`;

/** Linea del tempo: [[anno, testo]]. */
export const timeline = (rows) => `<div class="tl">${each(rows, ([year, text]) => `<div><b>${year}</b><span>${text}</span></div>`)}</div>`;

/** Passi numerati in colonna: [{ title, text }]. */
export const steps = (items) =>
  `<div class="steps">${each(items, (s, i) => `<div><span>${String(i + 1).padStart(2, '0')}</span><h3 class="h3">${s.title}</h3><p>${s.text}</p></div>`)}</div>`;

/** Domande frequenti a fisarmonica: [[domanda, risposta]]. La prima è aperta. */
export const faq = (items) =>
  `<div class="faq">${each(items, ([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}</summary><p>${a}</p></details>`)}</div>`;

/** Lista di definizioni (es. riferimenti aziendali): [[etichetta, valore]]. */
export const infoList = (rows) => `<dl class="info">${each(rows, ([dt, dd]) => `<div><dt>${dt}</dt><dd>${dd}</dd></div>`)}</dl>`;

/** Stato colorato: kind = 'ok' (verde) | 'go' (blu) | 'pl' (grigio). */
export const status = (kind, text) => `<span class="st ${kind}">${text}</span>`;

/** Righe con stato a sinistra: [{ kind, status, text }]. */
export const statusList = (rows) =>
  `<div class="status-list">${each(rows, (r) => `<div class="status-row">${status(r.kind, r.status)}<p>${r.text}</p></div>`)}</div>`;

/** Pulsanti filtro (solo visivi in anteprima). */
export const filters = (items, ariaLabel = t('Filtri', 'Filters')) =>
  `<div class="filters" role="group" aria-label="${ariaLabel}">${each(items, (x, i) => `<button type="button" aria-pressed="${i === 0}">${x}</button>`)}</div>`;

/** Griglia di segnaposto per loghi. cols: numero di colonne su desktop. */
export const logoGrid = (names, cols) => `<div${classAttr('logos', cols && `c${cols}`)}>${each(names, (n) => `<div class="logoph">${n}</div>`)}</div>`;
