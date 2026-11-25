import { hero } from '../../components/hero.js';
import { section, splitSection } from '../../components/sections.js';
import { sectionHead, note, groupLabel } from '../../components/text.js';
import { numberedBoxes, highlightBoxes } from '../../components/cards.js';
import { checklist, chips, chipLinks } from '../../components/lists.js';
import { primary, outline } from '../../components/links.js';
import { pageCta, CONSULT } from '../../blocks/cta.js';
import { getService } from '../../data/services.js';
import { pageTitle } from '../../data/routes.js';
import { when } from '../../lib/html.js';
import { t } from '../../lib/i18n.js';

/**
 * Modello unico per tutte le pagine di servizio: i contenuti sono in src/data/services.js.
 * Restituisce la funzione di render per il servizio indicato.
 */
export default (id) => () => {
  const s = getService(id);
  return [
    hero({
      crumb: [[t('Servizi', 'Services'), 'servizi'], [s.title]],
      label: `${t('Servizi', 'Services')} · ${s.label ?? s.title}`,
      title: s.heroTitle,
      lead: s.lead,
      actions: [primary('contatti', CONSULT), outline('servizi', t('Tutti i servizi', 'All services'))],
      scene: s.scene,
    }),

    section({ tight: true }, sectionHead(t('Cosa risolviamo', 'What we solve'), t('Problemi che {conosciamo bene}', 'Problems we {know well}')) + numberedBoxes(s.problems)),

    splitSection({ alt: true, label: t('Cosa facciamo', 'What we do'), title: t('Le attività, {passo dopo passo}', 'Our activities, {step by step}'), body: checklist(s.activities), scene: s.scene }),

    section({}, sectionHead(t('Tecnologie', 'Technologies'), t('Gli strumenti che {usiamo}', 'The tools {we use}')) + chips(s.tech) + when(s.techNote, note)),

    section({ alt: true }, sectionHead(t('Cosa cambia per te', 'What changes for you'), t('I benefici {concreti}', 'The {concrete} benefits')) + highlightBoxes(s.benefits)),

    section({ tight: true, cls: 'sec--related' }, groupLabel(t('Continua con', 'Continue with')) + chipLinks(s.related.map((to) => ({ to, label: pageTitle(to) })))),

    pageCta({
      title: s.ctaTitle,
      text: t('Raccontaci la tua esigenza: ti ricontattiamo per capire insieme da dove partire.', "Tell us what you need: we'll get back to you to work out together where to start."),
      scene: s.scene,
      extra: s.extraAction,
    }),
  ].join('');
};
