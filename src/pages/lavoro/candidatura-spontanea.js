import { hero } from '../../components/hero.js';
import { section } from '../../components/sections.js';
import { todo } from '../../components/text.js';
import { form, sceneFrame, FIELDS } from '../../components/forms.js';
import { SCENES } from '../../data/scenes.js';
import { t } from '../../lib/i18n.js';

const AREAS = [
  t('Sviluppo software', 'Software development'),
  t('Intelligenza artificiale', 'Artificial intelligence'),
  t('Cloud e DevOps', 'Cloud & DevOps'),
  t('Testing e QA', 'Testing & QA'),
  t('Altro', 'Other'),
];

export default () => [
  hero({
    crumb: [[t('Lavora con noi', 'Careers'), 'lavora-con-noi'], [t('Candidatura spontanea', 'Open application')]],
    label: t('Lavora con noi', 'Careers'),
    title: t('Non trovi la posizione giusta? {Raccontaci} chi sei.', "Can't find the right position? {Tell us} about yourself."),
    lead: t("Invia la tua candidatura spontanea: la leggiamo e ti ricontattiamo quando c'è un'opportunità adatta.", "Send us an open application: we'll read it and get back to you when a suitable opportunity comes up."),
    visual: sceneFrame(SCENES.neural, '', 'fw--fill'),
  }),
  section({ tight: true }, `<div class="fw fw--narrow">${form({
    id: 'candidatura',
    submit: t('Invia la candidatura', 'Send application'),
    fields: [
      FIELDS.name,
      FIELDS.email,
      { type: 'select', name: 'area', label: t('Area di interesse', 'Area of interest'), options: AREAS },
      FIELDS.message,
      { type: 'file', name: 'cv', label: t('Curriculum', 'CV') },
      FIELDS.privacy,
    ],
  })}</div><p class="note note--center">${todo('[DA VERIFICARE: destinatario delle candidature e tempi di conservazione dei dati]')}</p>`),
].join('');
