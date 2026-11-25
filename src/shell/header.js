import { GROUPS, pageTitle } from '../data/routes.js';
import { each, $, $$ } from '../lib/html.js';
import { t, href, getLang } from '../lib/i18n.js';
import logo from '../assets/logo.png';

/* Voci del menu principale: le sottovoci vengono dai gruppi di data/routes.js. */
const MENU = ['home', 'azienda', 'servizi', 'prodotti', 'progetti', 'news-eventi', 'lavora-con-noi'];

/* Etichette diverse dal titolo della pagina, solo dentro i sottomenu */
const SUB_LABELS = {
  servizi: t('Tutti i servizi', 'All services'),
  'lavora-con-noi': t('Cultura e posizioni aperte', 'Culture and open positions'),
};

/* Le pagine "hub" non si ripetono nel proprio sottomenu, salvo quelle con un'etichetta dedicata */
const subPages = (g) => g.pages.filter((id) => id !== g.id || SUB_LABELS[id]);

/* Sottomenu su due colonne (molte voci) */
const WIDE = ['servizi'];

const CHEVRON = '<svg class="chev" viewBox="0 0 12 12" aria-hidden="true"><path d="M3 4.5 6 7.5 9 4.5"/></svg>';
const ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';

const menuItem = (id) => {
  const g = GROUPS.find((x) => x.id === id);
  const subs = subPages(g);
  if (!subs.length) return `<a class="nv-top" href="${href(id)}" data-section="${id}">${g.title}</a>`;
  return `<div class="has"><a class="nv-top" href="${href(id)}" data-section="${id}">${g.title}${CHEVRON}</a>
<div class="${WIDE.includes(id) ? 'sub sub--wide' : 'sub'}">${each(subs, (p) => `<a href="${href(p)}">${SUB_LABELS[p] ?? pageTitle(p)}</a>`)}</div></div>`;
};

/* Selettore di lingua: punta alla stessa pagina nell'altra lingua (aggiornato a ogni pagina) */
const langSwitch = () => `<div class="lang" role="group" aria-label="${t('Lingua', 'Language')}">
<a data-lang="it" hreflang="it" lang="it" title="Italiano">IT</a><a data-lang="en" hreflang="en" lang="en" title="English">EN</a>
</div>`;

/*
 * Header. paint() lo ridisegna (al cambio di lingua); gli eventi sono agganciati una sola volta
 * all'elemento contenitore, per delega.
 */
export function renderHeader(el) {
  let section = null, page = 'home';

  const paint = () => {
    el.innerHTML = `<div class="in"><div class="hdr">
<a class="logo" href="${href('home')}" aria-label="Digiservice, home"><img src="${logo}" alt="Digiservice" width="200" height="54"></a>
<nav class="nv" aria-label="${t('Principale', 'Main')}">${each(MENU, menuItem)}<a class="nv-top nv-contact" href="${href('contatti')}" data-section="contatti">${t('Contattaci', 'Contact us')}</a></nav>
${langSwitch()}
<a class="hdr-cta" href="${href('contatti')}" data-section="contatti">${t('Contattaci', 'Contact us')}${ARROW}</a>
<button class="burger" type="button" aria-expanded="false" aria-label="Menu"><span></span><span></span><span></span></button>
</div></div>`;
    api.setCurrent(section);
    api.setPage(page);
  };

  const setOpen = (open) => {
    $('.hdr', el)?.classList.toggle('open', open);
    $('.burger', el)?.setAttribute('aria-expanded', String(open));
  };

  // Menu mobile
  el.addEventListener('click', (e) => {
    if (e.target.closest('.burger')) setOpen(!$('.hdr', el).classList.contains('open'));
    else if (e.target.closest('.nv a')) setOpen(false);
  });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') setOpen(false); });

  // Scorrendo la pagina l'header si fa più compatto
  const onScroll = () => el.classList.toggle('is-scrolled', scrollY > 24);
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const api = {
    paint,
    close: () => setOpen(false),
    /** Evidenzia la voce di menu della sezione corrente. */
    setCurrent(s) {
      section = s;
      $$('[data-section]', el).forEach((a) => {
        if (a.dataset.section === s) a.setAttribute('aria-current', 'page');
        else a.removeAttribute('aria-current');
      });
    },
    /** Aggiorna il selettore di lingua sulla pagina corrente. */
    setPage(id) {
      page = id;
      $$('[data-lang]', el).forEach((a) => {
        a.href = href(id, a.dataset.lang);
        if (a.dataset.lang === getLang()) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    },
  };
  paint();
  return api;
}
