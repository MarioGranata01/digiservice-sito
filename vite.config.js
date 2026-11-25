import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// La build produce un unico dist/index.html (JS, CSS e logo inclusi),
// apribile con un doppio clic come la vecchia "versione file unico".
export default defineConfig({
  base: './',
  plugins: [viteSingleFile()],
});
