/* Collega ogni id di rotta (data/routes.js) alla funzione che ne genera l'HTML. */
import home from './home.js';
import azienda from './azienda/azienda.js';
import chiSiamo from './azienda/chi-siamo.js';
import missionValori from './azienda/mission-e-valori.js';
import formazione from './azienda/formazione-e-innovazione.js';
import servizi from './servizi/servizi.js';
import servizio from './servizi/servizio.js';
import prodotti from './prodotti/prodotti.js';
import timesheet from './prodotti/timesheet-connect-cloud.js';
import progetti from './progetti/progetti.js';
import sigenera from './progetti/sigenera.js';
import newsEventi from './news/news-eventi.js';
import blog from './news/blog.js';
import eventi from './news/eventi.js';
import lavora from './lavoro/lavora-con-noi.js';
import candidatura from './lavoro/candidatura-spontanea.js';
import contatti from './contatti.js';
import mappa from './mappa.js';
import { SERVICE_IDS } from '../data/services.js';

export const PAGES = {
  home,
  azienda,
  'chi-siamo': chiSiamo,
  'mission-e-valori': missionValori,
  'formazione-e-innovazione': formazione,
  servizi,
  ...Object.fromEntries(SERVICE_IDS.map((id) => [id, servizio(id)])),
  prodotti,
  'timesheet-connect-cloud': timesheet,
  progetti,
  sigenera,
  'news-eventi': newsEventi,
  blog,
  eventi,
  'lavora-con-noi': lavora,
  'candidatura-spontanea': candidatura,
  contatti,
  mappa,
};
