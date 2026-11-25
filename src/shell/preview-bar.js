import { $, $$ } from '../lib/html.js';

/*
 * Barra grigia di anteprima (solo per la bozza, non fa parte del sito finale):
 * URL previsto della pagina, link alla mappa, selettore Desktop / Tablet / Mobile.
 */
export function initPreviewBar() {
  const bar = $('.bar'), stage = $('#stage'), urlEl = $('#urlp');

  $$('[data-dev]').forEach((b) => b.addEventListener('click', () => {
    stage.dataset.v = b.dataset.dev;
    $$('[data-dev]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  }));

  // L'altezza della barra (fissata in basso) serve a lasciare spazio in fondo alla pagina
  const setHeight = () => document.documentElement.style.setProperty('--barh', `${bar.offsetHeight}px`);
  setHeight();
  new ResizeObserver(setHeight).observe(bar);

  return {
    setUrl: (url) => { urlEl.textContent = url ? `URL previsto: ${url}` : 'Indice della bozza'; },
  };
}
