import { t } from '../lib/i18n.js';
import { ARTICLES, EVENTS } from '../data/news.js';
import { card } from '../components/cards.js';
import { action } from '../components/links.js';
import { each } from '../lib/html.js';

/** Card di un articolo del blog. */
export const articleCard = (a, { meta = `${t('Articolo', 'Article')} · ${a.date}`, text = a.summary } = {}) =>
  card({ scene: a.scene, meta, title: a.title, text, link: { to: 'blog', label: t('Leggi', 'Read') } });

/** Card di un evento (solo per gli eventi con dati "card"). */
export const eventCard = (e) =>
  card({ scene: e.card.scene, meta: `${t('Evento', 'Event')} · ${e.card.date}`, title: e.card.title, text: e.card.summary, link: { to: 'eventi', label: t('Scopri', 'Learn more') } });

/** Ultimi contenuti: articoli, poi eventi in evidenza. limit per mostrarne solo alcuni. */
export const latestCards = (limit) => [...ARTICLES.map((a) => articleCard(a)), ...EVENTS.filter((e) => e.card).map(eventCard)].slice(0, limit);

/** Riga di un evento nell'elenco della pagina Eventi. */
export const eventRow = (e) => `<div class="evrow"><span class="meta">${e.when}</span><div><h3>${e.title}</h3><p>${e.text}</p></div>${action({ variant: 'arrow', ...e.link })}</div>`;

export const eventList = (events) => `<div>${each(events, eventRow)}</div>`;
