/* Utility minime per comporre HTML a partire da stringhe. */

/** Concatena il risultato di fn per ogni elemento. */
export const each = (list, fn) => list.map(fn).join('');

/** Unisce i nomi di classe validi: cls('card', cond && 'red') */
export const cls = (...names) => names.filter(Boolean).join(' ');

/** Attributo class="..." solo se ci sono classi. */
export const classAttr = (...names) => {
  const c = cls(...names);
  return c ? ` class="${c}"` : '';
};

/** Inserisce html solo se cond è vera: when(lead, () => `<p>${lead}</p>`) */
export const when = (cond, fn) => (cond ? fn(cond) : '');

/**
 * Evidenzia in rosso le parti tra graffe: "Costruiamo {insieme}" → <span class="r">insieme</span>.
 * Si usa su tutti i titoli: basta scrivere le graffe nel testo.
 */
export const accent = (text = '') => String(text).replace(/\{(.+?)\}/g, '<span class="r">$1</span>');

/** Numerazione a due cifre: 1 → "01". */
export const pad2 = (n) => String(n).padStart(2, '0');

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
