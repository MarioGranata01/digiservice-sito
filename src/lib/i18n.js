/*
 * Lingue del sito: italiano (predefinita) e inglese.
 *
 * Ogni testo bilingue si scrive accanto alla sua traduzione:
 *   t('Chi siamo', 'About us')
 * t() restituisce un oggetto che, dentro un template `${…}` o una concatenazione, diventa
 * automaticamente il testo nella lingua corrente. Per usarlo come stringa vera
 * (replace, split, confronti…) si passa da String(x) oppure tr(x).
 *
 * La lingua è nell'indirizzo: #chi-siamo (italiano) · #en/chi-siamo (inglese).
 */
export const LANGS = ['it', 'en'];
let lang = 'it';

export const getLang = () => lang;
export const setLang = (l) => { lang = LANGS.includes(l) ? l : 'it'; };

class Text {
  constructor(it, en) { this.it = it; this.en = en ?? it; }
  toString() { return this[lang]; }
}

/** Testo bilingue. Se manca l'inglese si usa l'italiano. */
export const t = (it, en) => new Text(it, en);

/** Testo nella lingua corrente, da stringa o da t(). */
export const tr = (x) => (x == null ? '' : String(x));

/** Collegamento interno nella lingua corrente: href(id) → "#chi-siamo" oppure "#en/chi-siamo". */
export const href = (id, l = lang) => `#${l === 'en' ? 'en/' : ''}${id}`;

/** Legge l'indirizzo: "#en/servizi" → { lang: 'en', id: 'servizi' }. */
export const parseHash = (hash = location.hash) => {
  const h = hash.replace(/^#/, '');
  const m = h.match(/^(en)(?:\/(.*))?$/);
  return m ? { lang: 'en', id: m[2] || 'home' } : { lang: 'it', id: h || 'home' };
};
