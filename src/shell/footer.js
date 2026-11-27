import { pageTitle } from '../data/routes.js';
import { SERVICE_IDS } from '../data/services.js';
import { COMPANY, addressHtml, legalIds } from '../data/company.js';
import { link } from '../components/links.js';
import { each } from '../lib/html.js';
import { t, href } from '../lib/i18n.js';
import logo from '../assets/logo.png';

const COLUMNS = [
  { title: t('Servizi', 'Services'), pages: SERVICE_IDS },
  { title: t('Azienda', 'Company'), pages: ['chi-siamo', 'mission-e-valori', 'formazione-e-innovazione', 'lavora-con-noi'] },
  { title: t('Prodotti e progetti', 'Products and projects'), pages: ['timesheet-connect-cloud', 'archiviart', 'scadenzario', 'sigenera', 'blog', 'eventi'] },
];

/* Icone dei social (SVG in linea, colore = currentColor). I link ai profili sono in data/company.js. */
const SOCIAL_ICONS = {
  LinkedIn: '<path fill="currentColor" d="M4.98 3.5a2.48 2.48 0 1 1-4.96 0 2.48 2.48 0 0 1 4.96 0zM.5 8h4v16h-4V8zm7 0h3.8v2.2h.06c.53-1 1.83-2.2 3.77-2.2 4.03 0 4.77 2.65 4.77 6.1V24h-4v-8.1c0-1.93-.03-4.42-2.7-4.42-2.7 0-3.1 2.1-3.1 4.28V24h-4V8z" transform="translate(1.5 -1) scale(.92)"/>',
  Facebook: '<path fill="currentColor" d="M14 8h3V4h-3a5 5 0 0 0-5 5v2H6v4h3v9h4v-9h3l1-4h-4V9a1 1 0 0 1 1-1z"/>',
  Instagram: '<g fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4.2"/></g><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor"/>',
};
const socialLink = (name) => `<li><a href="${COMPANY.socialUrls[name]}" target="_blank" rel="noopener" aria-label="${name}" title="${name}"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${SOCIAL_ICONS[name] ?? ''}</svg></a></li>`;

const column = (c) => `<div><h4>${c.title}</h4><ul>${each(c.pages, (id) => `<li>${link(id, pageTitle(id))}</li>`)}</ul></div>`;

/*
 * Footer: fascia d'invito rossa, poi marchio + contatti, colonne di link e riga legale.
 */
export function renderFooter(el) {
  el.innerHTML = `<div class="in">
<div class="ft-cta">
<div><p class="ft-cta-lab">${t('Hai un progetto in mente?', 'Have a project in mind?')}</p><h3>${t('Parliamone: ti ricontattiamo per capire insieme da dove partire.', "Let's talk: we'll get back to you and work out together where to start.")}</h3></div>
${link('contatti', t('Contattaci', 'Contact us'), 'btn')}
</div>
<div class="g">
<div class="ft-brand">
<a class="logo" href="${href('home')}"><img src="${logo}" alt="Digiservice"></a>
<p class="tagline">${COMPANY.tagline}</p>
<div class="ft-sede">
<p class="ft-city"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg><span>${t('Sede di', 'Office in')} ${COMPANY.city}</span></p>
<address>${addressHtml()}</address>
</div>
<a class="ft-mail" href="mailto:${COMPANY.email}">${COMPANY.email}</a>
<ul class="ft-social">${each(COMPANY.social, socialLink)}</ul>
</div>
${each(COLUMNS, column)}
</div>
<div class="ft-legal"><small>© ${new Date().getFullYear()} ${COMPANY.legalName} · ${legalIds()}</small><small><a href="#">Privacy</a> · <a href="#">Cookie</a></small></div>
</div>`;
}
