import { hero } from '../../components/hero.js';
import { section } from '../../components/sections.js';
import { sectionHead } from '../../components/text.js';
import { titledBoxes } from '../../components/cards.js';
import { external, outline } from '../../components/links.js';
import { pageCta } from '../../blocks/cta.js';
import { EXTERNAL } from '../../data/company.js';
import { each } from '../../lib/html.js';
import { t } from '../../lib/i18n.js';

/* Contenuti ripresi dal sito ufficiale archiviart.com/it (novembre 2026). */

const PARTS = [
  [t('Il passaporto digitale', 'The digital passport'), t('Una scheda per ogni opera con provenienza, proprietari, prestiti e perizie, verificabile da chiunque.', 'A record for every work with its provenance, owners, loans and appraisals, which anyone can verify.')],
  ['Tabularia', t('Il database privato: documenti, schede e immagini conservati, organizzati e resi ricercabili per nome, luogo o data.', 'The private database: documents, records and images stored, organised and searchable by name, place or date.')],
  ['CEDiA', t('Tracciabilità e tutela dei dati delle opere: certificati fisici con chip NFC e sigillo crittografico su blockchain, con i dati che restano privati.', 'Traceability and protection of artwork data: physical certificates with NFC chips and a cryptographic seal on the blockchain, while the data stays private.')],
  ['Profilert', t("La rete professionale dell'arte: artisti, restauratori, periti e trasportatori, con profili verificati.", 'The professional network of the art world: artists, restorers, appraisers and art handlers, with verified profiles.')],
];

const AUDIENCES = [
  [t('Archivi, fondazioni e musei', 'Archives, foundations and museums'), t('Patrimonio digitalizzato e documenti ritrovati in pochi secondi.', 'Digitised collections and documents found in seconds.')],
  [t('Gallerie e collezionisti', 'Galleries and collectors'), t('La storia di ogni opera tracciata nel tempo, con prove verificabili.', "Each work's history tracked over time, with verifiable evidence.")],
  [t('Artisti ed eredi', 'Artists and heirs'), t("Un archivio ordinato e tutelato dell'opera.", 'An organised, protected archive of the body of work.')],
  [t("Professionisti dell'arte", 'Art professionals'), t('Restauratori, periti e trasportatori in una rete professionale verificata.', 'Restorers, appraisers and art handlers in a verified professional network.')],
];

/** Scheda d'opera di esempio, al posto della scena 3D. */
const recordMockup = () => `<div class="phone" aria-hidden="true"><b>${t("Scheda dell'opera", 'Artwork record')}</b><div class="ck">${t('Verificata', 'Verified')}</div>
${each([[t('Provenienza', 'Provenance'), '✓'], [t('Proprietari', 'Owners'), '✓'], [t('Perizie', 'Appraisals'), '✓'], [t('Certificato NFC', 'NFC certificate'), '✓']], ([k, v]) => `<div class="ln">${k}<i>${v}</i></div>`)}
<small class="meta">${t('Schermata di esempio', 'Sample screen')}</small></div>`;

export default () => [
  hero({
    crumb: [[t('Prodotti', 'Products'), 'prodotti'], ['Archiviart']],
    label: t('Prodotto Digiservice', 'A Digiservice product'),
    title: t("Archiviart: il {passaporto digitale} delle opere d'arte.", 'Archiviart: the {digital passport} for works of art.'),
    lead: t("Digitalizza, tutela e organizza il patrimonio artistico e documentale, dalla storia all'attualità.", 'Digitises, protects and organises artistic and documentary heritage, past and present.'),
    actions: [
      external(EXTERNAL.archiviartAccess, t('Richiedi accesso', 'Request access'), 'primary'),
      outline('contatti', t('Contattaci', 'Contact us')),
      external(EXTERNAL.archiviart, t('Sito ufficiale', 'Official website'), 'arrow'),
    ],
    visual: recordMockup(),
  }),

  section({ tight: true }, sectionHead(t('Come funziona', 'How it works'), t('Un {ecosistema} per il patrimonio artistico', 'An {ecosystem} for artistic heritage')) + titledBoxes(PARTS, 4)),

  section({ alt: true }, sectionHead(t('A chi si rivolge', "Who it's for"), t("Per chi {custodisce} e valorizza l'arte", 'For those who {safeguard} and promote art')) + titledBoxes(AUDIENCES, 4)),

  pageCta({
    title: t('Archiviart è in anteprima riservata.', 'Archiviart is in private preview.'),
    text: t('Raccontaci il tuo patrimonio: ti diciamo come può aiutarti.', "Tell us about your collection: we'll show you how it can help."),
    label: t('Contattaci', 'Contact us'),
    extra: external(EXTERNAL.archiviartAccess, t('Richiedi accesso', 'Request access')),
  }),
].join('');
