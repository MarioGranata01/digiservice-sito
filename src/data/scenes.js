import { scene } from '../components/scene.js';

/*
 * Preset delle scene 3D usati nel sito.
 * Per cambiare l'aspetto di una scena ovunque, si modifica solo qui.
 */
export const SCENES = {
  cubes: scene('cubes'),
  cubesSmall: scene('cubes', { small: true, scale: 1.1 }),
  neural: scene('neural'),
  neuralSmall: scene('neural', { layers: [3, 5, 5, 2], scale: 0.95 }),
  cloud: scene('cloud'),
  cloudCard: scene('cloud', { scale: 0.9 }),
  cloudCta: scene('cloud', { cx: 0.5, scale: 1.1 }),
  cloudWide: scene('cloud', { cx: 0.5, cy: 0.5, scale: 1.15 }),
  orbit: scene('orbit', { rings: 3 }),
  orbitTeam: scene('orbit', { rings: 4, scale: 0.95 }),
  globe: scene('globe', { scale: 0.9 }),
  globeLite: scene('globe', { scale: 0.95, n: 150, dots: 700 }),
  loop: scene('loop'),
  shield: scene('shield'),
};

/*
 * Le scene nelle card dei servizi hanno poco spazio: le rimpiccioliamo quanto basta
 * perché nessuna esca dai bordi (fattore per tipo di scena).
 */
const CARD_FIT = { orbit: 0.9, cloud: 0.62, globe: 0.88, shield: 0.9, cubes: 0.85, loop: 0.7, neural: 0.88 };
export const fitCard = (sc) => scene(sc.name, { ...sc.opts, scale: (sc.opts?.scale ?? 1) * (CARD_FIT[sc.name] ?? 0.85) });
