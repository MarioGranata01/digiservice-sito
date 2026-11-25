import { hero } from '../../components/hero.js';
import { section } from '../../components/sections.js';
import { note, todo } from '../../components/text.js';
import { card, placeholderCard, grid } from '../../components/cards.js';
import { filters } from '../../components/lists.js';
import { articleCard } from '../../blocks/news.js';
import { ARTICLES, BLOG_CATEGORIES } from '../../data/news.js';
import { SCENES } from '../../data/scenes.js';
import { t } from '../../lib/i18n.js';

export default () => {
  const [featured, ...others] = ARTICLES;
  return [
    hero({
      crumb: [[t('News ed eventi', 'News & events'), 'news-eventi'], ['Blog']],
      label: 'Blog',
      title: t('Il blog di {Digiservice}.', 'The {Digiservice} blog.'),
      lead: t('Idee e casi pratici su intelligenza artificiale, cloud, sviluppo software, DevOps e innovazione.', 'Ideas and practical cases on artificial intelligence, cloud, software development, DevOps and innovation.'),
      scene: SCENES.neural,
    }),
    section({ tight: true }, filters(BLOG_CATEGORIES, t('Categorie', 'Categories'))
      + card({
        variant: 'wide',
        scene: featured.scene,
        meta: `${t('In evidenza', 'Featured')} · ${featured.category}`,
        title: featured.title,
        text: t("Estratto dell'articolo esistente, due righe, con data e tempo di lettura.", 'Excerpt from the existing article, two lines, with date and reading time.'),
        link: { to: 'blog', label: t("Leggi l'articolo", 'Read the article') },
      })
      + grid([
        ...others.map((a) => articleCard(a, { meta: a.category, text: t('Articolo esistente, importato con URL e immagine originali.', 'Existing article, imported with its original URL and image.') })),
        placeholderCard({ tag: t('Come funziona', 'How it works'), title: t('Pubblichi da WordPress', 'You publish from WordPress'), text: t('Titolo, testo, immagine, categoria e SEO: la card si crea da sola.', 'Title, text, image, category and SEO: the card builds itself.') }),
      ])
      + note(`${t('Restano online tutti gli articoli, con URL, immagini e categoria «Tecnologia». Le nuove categorie si aggiungono senza rimuovere nulla. Autore da mostrare con nome pubblico', 'All articles stay online, with their URLs, images and the “Technology” category. New categories are added without removing anything. Author shown with their public name')} ${todo('[DA VERIFICARE]')}`)),
  ].join('');
};
