import { hero } from '../components/hero.js';
import { section } from '../components/sections.js';
import { todo } from '../components/text.js';
import { infoList } from '../components/lists.js';
import { form, sceneFrame, FIELDS } from '../components/forms.js';
import { SCENES } from '../data/scenes.js';
import { COMPANY, addressHtml } from '../data/company.js';
import { t } from '../lib/i18n.js';

const REQUEST_TYPES = [
  t('Richiesta di consulenza', 'Consulting request'),
  t('Informazioni su un servizio', 'Information about a service'),
  t('Demo di TimeSheet Connect Cloud', 'TimeSheet Connect Cloud demo'),
  t('Collaborazione su progetti di ricerca', 'Research project collaboration'),
  t('Altro', 'Other'),
];

export default () => [
  hero({
    crumb: [[t('Contatti', 'Contact')]],
    label: t('Contatti', 'Contact'),
    title: t('Parliamo del tuo {progetto}.', "Let's talk about your {project}."),
    lead: t("Hai un'esigenza da risolvere, un processo da digitalizzare o un'idea da trasformare in software? Raccontacela: ti rispondiamo con un primo percorso concreto e senza impegno.", 'Do you have a need to address, a process to digitise or an idea to turn into software? Tell us about it: we will get back to you with a concrete first plan, with no obligation.'),
    scene: SCENES.cloud,
  }),
  section({ tight: true, inner: 'ct' }, `<div class="tx"><p class="lab">${t('Riferimenti', 'Contact details')}</p>${infoList([
    [t('Società', 'Company'), `${COMPANY.legalName}<br>${todo('[P. IVA, capitale sociale, REA]')}`],
    [t('Sede', 'Office'), addressHtml()],
    ['Email', COMPANY.email],
    [t('Sito web', 'Website'), COMPANY.website],
    [t('Telefono', 'Phone'), todo('[DA VERIFICARE]')],
    ['Social', `${COMPANY.social.join(' · ')}<br>${COMPANY.socialHandle}`],
  ])}</div>`
  + sceneFrame(SCENES.cloudWide, form({
    id: 'contatti',
    submit: t('Invia la richiesta', 'Send request'),
    fields: [
      FIELDS.name,
      FIELDS.company,
      FIELDS.email,
      { type: 'select', name: 'tipo', label: t('Tipo di richiesta', 'Request type'), options: REQUEST_TYPES },
      FIELDS.message,
      FIELDS.privacy,
    ],
  }))),
].join('');
