/* Canvas delle scene 3D (vedi src/engine). Una scena si descrive con scene(nome, opzioni). */

/** Descrittore di scena: { name, opts }. I preset riusabili sono in src/data/scenes.js. */
export const scene = (name, opts) => ({ name, opts });

/**
 * Elemento <canvas> che il motore 3D anima al montaggio della pagina.
 * still: un solo fotogramma · hover: ferma, si anima solo col mouse sopra la card che la contiene.
 */
export const canvas = (sc, { still, hover } = {}) => {
  const opts = sc.opts && Object.keys(sc.opts).length ? ` data-o='${JSON.stringify(sc.opts)}'` : '';
  return `<canvas data-s="${sc.name}"${opts}${still ? ' data-still' : ''}${hover ? ' data-hover' : ''} aria-hidden="true"></canvas>`;
};

/** Riquadro con sfondo sfumato che contiene una scena. */
export const visual = (sc) => `<div class="vis">${canvas(sc)}</div>`;
