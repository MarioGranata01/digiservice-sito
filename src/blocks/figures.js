import { t } from '../lib/i18n.js';
import { FIGURES } from '../data/company.js';
import { each } from '../lib/html.js';

/** Numeri chiave dell'azienda (nella home stanno nel pannello di apertura, a destra). Contano fino al valore (shell/reveal.js). */
export const keyFigures = () => `<ul class="figures" aria-label="${t('Digiservice in numeri', 'Digiservice in numbers')}">${each(FIGURES, ({ value, label, from = 0 }) => `<li><b data-count="${from}">${value}</b><span>${label}</span></li>`)}</ul>`;
