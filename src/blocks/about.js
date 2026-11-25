import { t } from '../lib/i18n.js';
import { ABOUT } from '../data/company.js';
import { VALUES } from '../data/values.js';
import { section } from '../components/sections.js';
import { accent, each } from '../lib/html.js';

/** «Chi siamo» in breve: testo a sinistra, i valori (una riga ciascuno) a destra. */
export const aboutIntro = () => section({ cls: 'about' }, `<div class="about-tx">
<p class="lab">${ABOUT.label}</p>
<h2 class="about-title">${accent(ABOUT.title)}</h2>
<p class="about-text">${ABOUT.text}</p>
</div>
<ul class="about-values" aria-label="${t('I nostri valori', 'Our values')}">${each(VALUES, ({ title, short }) => `<li><b>${title}</b><span>${short}</span></li>`)}</ul>`);
