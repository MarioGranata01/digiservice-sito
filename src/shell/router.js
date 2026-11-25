import { PAGES } from '../pages/index.js';
import { getRoute } from '../data/routes.js';
import { mountScenes } from '../engine/mount.js';
import { mountSliders } from '../components/slider.js';
import { initReveal } from './reveal.js';
import { initSpotlight } from './spotlight.js';
import { $, $$ } from '../lib/html.js';
import { t, getLang, setLang, parseHash } from '../lib/i18n.js';
import { renderFooter } from './footer.js';

/*
 * Router a hash (#id-pagina, oppure #en/id-pagina in inglese): genera la pagina, aggiorna
 * lingua, menu e barra di anteprima, avvia scene 3D e caroselli.
 * Gli eventi delle pagine sono gestiti una sola volta per delega.
 */
export function initRouter({ outlet, header, footer, previewBar }) {
  let shellLang = null;

  const render = () => {
    const parsed = parseHash();
    let { id } = parsed;
    if (!PAGES[id]) id = 'home';
    setLang(parsed.lang);
    const route = getRoute(id);

    // Cambio di lingua: si ridisegnano anche header e footer
    if (getLang() !== shellLang) {
      shellLang = getLang();
      document.documentElement.lang = shellLang;
      header.paint();
      renderFooter(footer);
      initReveal(footer);
    }

    outlet.innerHTML = PAGES[id]();
    document.title = id === 'home' ? 'Digiservice' : `${route.title} · Digiservice`;
    header.setCurrent(route.section);
    header.setPage(id);
    header.close();
    previewBar.setUrl(getLang() === 'en' ? route.urlEn : route.url);
    scrollTo(0, 0);
    mountScenes(outlet);
    mountSliders(outlet);
    initReveal(outlet);
    initSpotlight(outlet);
  };

  // Moduli: in anteprima non inviano dati
  outlet.addEventListener('submit', (e) => {
    e.preventDefault();
    $('.fmsg', e.target).textContent = String(t('Anteprima: il modulo non invia dati.', 'Preview: this form does not send any data.'));
  });

  // Filtri: solo stato visivo
  outlet.addEventListener('click', (e) => {
    const btn = e.target.closest('.filters button');
    if (btn) $$('button', btn.parentNode).forEach((x) => x.setAttribute('aria-pressed', String(x === btn)));
  });

  // Link di scorrimento interno (data-scroll="id" oppure "top")
  document.addEventListener('click', (e) => {
    const a = e.target.closest('[data-scroll]');
    if (!a) return;
    e.preventDefault();
    const target = a.dataset.scroll === 'top' ? document.body : document.getElementById(a.dataset.scroll);
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  addEventListener('hashchange', render);
  render();
}
