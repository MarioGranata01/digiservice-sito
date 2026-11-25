# Digiservice – bozza del nuovo sito (design «Luce»)

## Comandi
```bash
npm install      # una volta sola
npm run dev      # anteprima con ricarica automatica (http://localhost:5173)
npm run build    # genera dist/index.html: file unico, apribile con doppio clic
```

## Struttura di `src/`
I livelli dipendono solo da quelli sopra di loro.

| Cartella      | Contiene                                                                  |
|---------------|---------------------------------------------------------------------------|
| `lib/`        | utility HTML (`each`, `cls`, `accent` per i `{testi rossi}`)               |
| `engine/`     | motore delle scene 3D: `core.js` (matematica e disegno) + una scena per file |
| `components/` | UI generica, senza contenuti: hero, sezioni, card, liste, link, form       |
| `data/`       | **i contenuti**: servizi, notizie/eventi, tecnologie, azienda, rotte, preset scene |
| `blocks/`     | componenti + dati riusati in più pagine (griglia servizi, news, partner, CTA finale) |
| `pages/`      | una pagina per file; tutte le pagine servizio usano `servizi/servizio.js`  |
| `shell/`      | header, footer, router, barra di anteprima                                |
| `styles/`     | CSS diviso per area, importato da `styles/index.css`                       |

## Operazioni frequenti
- **Testo di un servizio** → `src/data/services.js` (aggiorna pagina, card, menu, footer e mappa).
- **Nuovo servizio** → aggiungi una voce in `services.js`: rotta e pagina si creano da sole.
- **Nuovo articolo/evento** → `src/data/news.js`.
- **Indirizzo, email, social** → `src/data/company.js`.
- **Nuova pagina** → crea il file in `pages/`, registralo in `pages/index.js` e in `data/routes.js`.
- **Parola in rosso in un titolo** → racchiudila tra graffe: `"Il blog di {Digiservice}."`.
- **Aspetto di una scena 3D ovunque** → `src/data/scenes.js`.
