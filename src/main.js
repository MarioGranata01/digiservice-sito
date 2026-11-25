import './styles/index.css';
import { $ } from './lib/html.js';
import { renderHeader } from './shell/header.js';
import { initPreviewBar } from './shell/preview-bar.js';
import { initRouter } from './shell/router.js';

// Header e footer vengono (ri)disegnati dal router, anche al cambio di lingua
const previewBar = initPreviewBar();
const header = renderHeader($('#hd'));
initRouter({ outlet: $('#pg'), header, footer: $('#ft'), previewBar });
