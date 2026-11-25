import { t, href } from '../lib/i18n.js';
import { SERVICES } from '../data/services.js';
import { servicePhoto, PHOTO_HINTS } from '../data/service-photos.js';
import { accentCard, grid } from '../components/cards.js';

const ARROW = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4"/></svg>';
const CAMERA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2l1.5-2h6l1.5 2h2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="13" r="3.5"/></svg>';

/* Foto del servizio, oppure segnaposto con il soggetto consigliato */
const photo = (s) => {
  const src = servicePhoto(s.id);
  return src
    ? `<figure class="svc-ph"><img src="${src}" alt="" loading="lazy"></figure>`
    : `<figure class="svc-ph svc-ph--empty">${CAMERA}<figcaption>${t('Foto', 'Photo')}: ${PHOTO_HINTS[s.id] ?? ''}</figcaption></figure>`;
};

/** Card di un servizio: foto, titolo, testo e link. Tutta la card è cliccabile. */
export const serviceCard = (s) => `<article class="card svc-card">
${photo(s)}
<div class="tx">
<h3><a href="${href(s.id)}">${s.title}</a></h3>
<p>${s.summary}</p>
<span class="svc-go">${t('Scopri', 'Learn more')}${ARROW}</span>
</div></article>`;

export const START_CARD = {
  title: t('Non sai da dove partire?', 'Not sure where to start?'),
  text: t("Raccontaci l'obiettivo: ti aiutiamo a trovare il primo passo.", "Tell us your goal: we'll help you find the first step."),
  label: t('Richiedi una consulenza', 'Request a consultation'),
};

/** Sette servizi + la card «Non sai da dove partire?»: 8 card su 4 colonne. Usata in home e /servizi. */
export const servicesGrid = () => `<div class="svc-grid">${grid([...SERVICES.map(serviceCard), accentCard({ ...START_CARD, dark: true })], 4)}</div>`;
