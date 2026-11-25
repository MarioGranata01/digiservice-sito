# CLAUDE.md – Bozza del nuovo sito Digiservice

Istruzioni per Claude Code, valide per chiunque lavori al progetto.
Le persone del team leggono il README; questo file dice a Claude come lavorare qui.

## Contesto

- Committente: **Digiservice S.r.l.**, società di consulenza ICT con sede a Rende (CS).
  Sito attuale: digiservice-solutions.it.
- Questo progetto è la **bozza navigabile** del nuovo sito. Il sito definitivo sarà rifatto in **WordPress**
  (traduzioni con WPML o Polylang). Le scelte servono a decidere contenuti e grafica, non a durare come codice di produzione.
- Il sito è **bilingue italiano/inglese**.
- Chi ti scrive è di Digiservice e non sempre è uno sviluppatore. **Rispondi in italiano**, in modo semplice,
  e spiega cosa hai cambiato in termini visibili sul sito ("il titolo della sezione Servizi"), non solo con i nomi dei file.

## Comandi

```bash
npm install      # dopo il clone e quando cambia package.json
npm run dev      # anteprima con ricarica automatica; l'indirizzo esatto (porta) è stampato nel terminale
npm run build    # genera dist/index.html: un file unico con JS, CSS e immagini dentro
```

- Il file `index.html` nella radice è il sorgente: aperto da solo mostra una pagina bianca.
  Per vedere il sito servono `npm run dev` oppure `dist/index.html` dopo la build.
- Non ci sono test automatici. **Dopo ogni modifica lancia `npm run build`**: deve finire senza errori.

## Architettura

Vite + moduli ES, nessun framework. L'HTML è costruito con template string.
I livelli dipendono solo da quelli sopra: `lib → engine/components → data → blocks → pages → shell`.

| Cartella | Contenuto |
|---|---|
| `src/lib/` | `html.js` (`each`, `cls`, `when`, `accent`…), `i18n.js` (lingua) |
| `src/components/` | UI generica senza contenuti: card, sezioni, hero, slider, link, form |
| `src/data/` | **Tutti i contenuti**: servizi, slide, azienda, valori, partner, news, rotte |
| `src/blocks/` | Blocchi riusati in più pagine (griglia servizi, partner, news, chi siamo) |
| `src/pages/` | Una pagina per file; tutte le pagine servizio usano `servizi/servizio.js` |
| `src/shell/` | Header, footer, router, barra di anteprima, animazioni di comparsa e "riflettore" |
| `src/styles/` | CSS per area, importati da `styles/index.css`; colori e font in `tokens.css` |
| `src/engine/` | Motore delle scene 3D su canvas (ancora usato in alcune pagine interne) |
| `_originale/` | Vecchia bozza, solo per confronto: **non modificarla** |

- Router a hash: `#id-pagina` in italiano, `#en/id-pagina` in inglese.
- Nuova pagina: file in `src/pages/`, registrazione in `src/pages/index.js` e in `src/data/routes.js`.
- Nuovo servizio: una voce in `src/data/services.js` genera pagina, card, menu, footer e mappa del sito.
- Una parola tra graffe in un titolo diventa rossa: `'Agili per natura, {innovativi} per scelta'`.
- La barra in fondo alla pagina ("Bozza grafica del nuovo sito", Desktop/Tablet/Mobile) è solo uno strumento
  di anteprima. Il layout responsive usa **container query** su `.stage` (`@container st`), non media query,
  così il selettore Desktop/Tablet/Mobile funziona.

## Regola delle due lingue (obbligatoria)

Ogni testo visibile si scrive con `t('italiano', 'english')` da `src/lib/i18n.js`:

```js
import { t, href } from '../lib/i18n.js';
title: t('Servizi e competenze', 'Services and expertise'),
```

- **Mai aggiungere o modificare un testo in una lingua sola.** Se l'utente scrive solo l'italiano, proponi tu l'inglese.
- Inglese britannico, tono professionale; date in formato "24 January 2024".
- Nomi propri e di prodotto restano uguali (TimeSheet Connect, SIGENERA, Claude Partner Network).
- I link interni si fanno con `href('id-pagina')`, mai con `'#id'` scritto a mano, così rispettano la lingua corrente.
- `t()` restituisce un oggetto che diventa testo solo quando viene stampato: se serve una stringa vera
  (es. `textContent`, confronti), usa `String(t(...))`.

## Gusto grafico concordato

Indicazioni date più volte dal committente: rispettale e chiedi prima di andare in un'altra direzione.

- **"Farsi notare con garbo"**: aspetto professionale e sobrio. Movimento lento e discreto
  (dissolvenze, comparsa allo scorrimento); niente testi che scorrono, effetti vistosi o animazioni continue.
- **Poche parole**: un titolo e una riga. Niente numeri di slide o di pagina in evidenza.
- **Niente immagini "da intelligenza artificiale"**: le scene 3D astratte, le reti di particelle e le icone
  generiche sono state scartate per i servizi. Si preferiscono **foto reali**
  (`src/assets/servizi/<id-servizio>.jpg`, prese in automatico; finché mancano compare un segnaposto).
- Rosso del marchio `--rosso: #A30000`; predilige il rosso e i toni caldi (vinaccia, crema) rispetto al nero.
  Usa sempre le variabili di `src/styles/tokens.css`, non colori scritti a mano.
- Deve essere **diverso dal sito attuale**, pur con gli stessi colori del marchio.
- In footer e CTA l'etichetta è **"Contattaci"**.
- Rispetta sempre `prefers-reduced-motion` per ogni nuova animazione.
- Verifica il risultato a larghezza desktop e mobile prima di dire che è fatto.

## Modo di lavorare

- Modifiche piccole e mirate: cambia solo ciò che è stato chiesto. Se noti altro da sistemare, proponilo.
- I contenuti vanno in `src/data/`, non dentro le pagine o i componenti.
- Non inventare dati aziendali (P. IVA, numeri, clienti, nomi di partner, link social): se mancano lascia un
  segnaposto tra parentesi quadre, es. `[P. IVA da inserire]`, e dillo.
- Non scaricare né collegare immagini da internet senza che l'utente lo chieda e ne confermi la licenza.
- Le immagini finiscono dentro `dist/index.html`: suggerisci file compressi (circa 200 KB).

## Git e GitHub

- Repository: https://github.com/MarioGranata01/digiservice-sito, branch principale `main`.
- **Fai commit, push o pull request solo quando l'utente lo chiede.**
- Per lavori più grandi di una correzione proponi un branch con nome descrittivo (`foto-servizi`, `pagina-contatti`)
  e una pull request verso `main`.
- Messaggi di commit in italiano, brevi e al passato: "Aggiunte le foto dei servizi".
- Prima di iniziare, se il repository potrebbe essere indietro, suggerisci un `git pull`.
- `node_modules/` e `dist/` non vanno nel repository.
