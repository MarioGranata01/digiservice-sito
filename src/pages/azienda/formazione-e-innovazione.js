import { hero } from '../../components/hero.js';
import { section } from '../../components/sections.js';
import { box, grid } from '../../components/cards.js';
import { primary, outline, link } from '../../components/links.js';
import { todo } from '../../components/text.js';
import { pageCta } from '../../blocks/cta.js';
import { SCENES } from '../../data/scenes.js';
import { t } from '../../lib/i18n.js';

export default () => [
  hero({
    crumb: [[t('Azienda', 'Company'), 'azienda'], [t('Formazione e innovazione', 'Training & innovation')]],
    label: t('Azienda · Formazione e innovazione', 'Company · Training & innovation'),
    title: t('{Crescere insieme} per innovare meglio.', '{Growing together} to innovate better.'),
    lead: t('Una tecnologia che cambia ogni anno richiede competenze che cambiano con lei.', 'Technology that changes every year calls for skills that change with it.'),
    actions: [primary('lavora-con-noi', t('Lavora con noi', 'Careers')), outline('eventi', t('Tutti gli eventi', 'All events'))],
    scene: SCENES.neuralSmall,
  }),
  section({ tight: true }, grid([
    box({
      ico: '01',
      title: t('La formazione del team', 'Team training'),
      text: t('Investiamo nella formazione di tutto il team, con piani di formazione continua per profili junior e senior.', 'We invest in training the whole team, with continuous learning plans for junior and senior profiles.'),
      body: `<p>${todo('[DA FORNIRE: corsi, certificazioni ottenute, ore annue]')}</p>`,
    }),
    box({
      ico: '02',
      title: t('Innovazione e ricerca', 'Innovation & research'),
      text: t("Partecipiamo a progetti di ricerca e sviluppo con università e imprese. In SiGENERA, Digiservice è capofila di una rete con l'Università della Calabria, ID Technology e Tecnoinnovis; gli stagisti dell'ITS CADMO saranno coinvolti in formazione on the job nello sviluppo dei moduli software.", 'We take part in research and development projects with universities and companies. In SiGENERA, Digiservice leads a network with the Università della Calabria, ID Technology and Tecnoinnovis; interns from ITS CADMO will receive on-the-job training while developing the software modules.'),
      body: link('sigenera', t('Il progetto SiGENERA', 'The SiGENERA project'), 'arrow'),
    }),
    box({
      ico: '03',
      title: t('Community e università', 'Community & universities'),
      text: t("Partecipiamo a eventi e community tecnologiche, come AWS Summit Milano 2023 con l'AWS User Group Calabria e Come to Code 2023, e offriamo collaborazioni per tesi universitarie.", 'We take part in tech events and communities, such as AWS Summit Milano 2023 with the AWS User Group Calabria and Come to Code 2023, and we offer collaborations on university theses.'),
      body: link('eventi', t('Tutti gli eventi', 'All events'), 'arrow'),
    }),
  ])),
  pageCta({ title: t('Cresci con noi.', 'Grow with us.'), text: t('Scopri come lavoriamo e le posizioni aperte.', 'See how we work and our open positions.'), label: t('Lavora con noi', 'Careers'), to: 'lavora-con-noi', scene: SCENES.neuralSmall }),
].join('');
