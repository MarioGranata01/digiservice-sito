import { section } from '../components/sections.js';
import { sectionHead } from '../components/text.js';
import { GROUPS, ROUTES, getRoute } from '../data/routes.js';
import { each } from '../lib/html.js';
import { t, href, getLang } from '../lib/i18n.js';

/* Indice della bozza: generato da data/routes.js, si aggiorna da solo. */
const group = (g) => `<div class="box"><h3>${g.title}</h3>${each(g.pages, (id) => {
  const r = getRoute(id);
  return `<a href="${href(id)}">${r.title}<em>${getLang() === 'en' ? r.urlEn : r.url}</em></a>`;
})}</div>`;

export default () => {
  const count = ROUTES.filter((r) => r.url).length;
  return section({}, sectionHead(
    t('Mappa del sito', 'Sitemap'),
    t('Tutte le {pagine} della bozza', 'All {pages} in the draft'),
    t(
      `${count} pagine, nello stesso design «Luce». Gli URL indicati sono quelli del documento di contenuti: quelli esistenti restano invariati.`,
      `${count} pages, all in the same “Luce” design. The URLs shown are those from the content document: existing ones remain unchanged.`,
    ),
  )
    + `<div class="map-g">${each(GROUPS, group)}</div>`);
};
