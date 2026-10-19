# 🗺 Architettura di Kuromi World

Guida per orientarsi nel codice, aggiungere funzioni e non rompere nulla.

## 1. Mappa dei file
```
kuromi-world/
├── index.html        STRUTTURA   cosa c'è nella pagina
├── style.css         ASPETTO     come appare
├── app.js            LOGICA      cosa fa
├── assets/           (opzionale) GIF/immagini, es. il disco
├── README.md         istruzioni d'uso
└── ARCHITETTURA.md   questo file
```

## 2. Schema dell'applicazione
```
                      ┌──────────── MENU (nav) ────────────┐
                      │ data-v="home|docs|music|photos"    │
                      └───────────────┬────────────────────┘
                              showView(id)  ← app.js §4
        ┌───────────────┬─────────────┴──────┬───────────────┐
   ┌────▼────┐     ┌────▼────┐          ┌────▼────┐     ┌────▼────┐
   │  HOME   │     │ DIARIO  │          │ MUSICA  │     │  FOTO   │
   │ #home   │     │ #docs   │          │ #music  │     │ #photos │
   └────┬────┘     └────┬────┘          └────┬────┘     └────┬────┘
   frasi+fiori    editor+export        playlist+disco   galleria+editor
        │               │                    │               │
        │          localStorage          (solo memoria)   localStorage
        │           "kdoc"                                 "kph"
        └───────────────┴──────── UTILITÀ + DIALOGO ask() ───┘
                            (app.js §2 e §3, usate da tutti)
```

### Una sezione = 4 pezzi collegati
| Sezione | HTML (`index.html`) | CSS (`style.css`) | JS (`app.js`) | Dati |
|---|---|---|---|---|
| Home | `#home` | §5 HOME | §5 HOME → `initHome()` | nessuno |
| Diario | `#docs` | §6 DIARIO | §6 DIARIO → `initDocs()` | `kdoc` |
| Musica | `#music` | §7 MUSICA | §7 MUSICA → `initMusic()` | solo memoria |
| Foto | `#photos` | §8 FOTO | §8 FOTO → `initPhotos()` | `kph` |
| Conferme | `#dlg` | §9 FINESTRE | §3 DIALOGO → `ask()` | nessuno |

### Collegamenti "nascosti" (se ne cambi uno, cambia anche l'altro)
| Se modifichi… | …aggiorna anche |
|---|---|
| un `id` in HTML | lo stesso `$('#id')` in `app.js` |
| `data-v` del pulsante | `id` della `<section>` corrispondente |
| `value` di `#theme` | la classe `.tN` in CSS |
| `value` di `#fr` / `#fl` | le classi `.fN` / `.gN` in CSS |
| chiavi dei dati (`t,h,th,f,s` / `s,f,g,c,r,k`) | `showDoc/saveDoc` e `photoCardHTML` (e i dati già salvati!) |

## 3. Come aggiungere una nuova sezione (checklist)
Esempio: 💌 **Contatore "insieme da…"**
1. **Elenco**: aggiungi una riga in `CONFIG.sections` (`app.js`): menu in alto e scheda del Menù si creano da sole.
   **HTML**: aggiungi `<section id="days" class="view">…</section>` in `<main>` (l'`id` deve coincidere con quello dell'elenco).
2. **CSS**: aggiungi una nuova regione `11. GIORNI` con regole che iniziano con `#days`. Riusa `.bar`, `button`, `var(--pk)`: non ridefinire i colori.
3. **JS**: aggiungi una regione `//#region GIORNI` con le sue funzioni e una `initDays()`; poi chiamala nella regione AVVIO.
4. **Dati** (se servono): aggiungi la chiave in `CONFIG.storage` e usa `readStorage` / `writeStorage`.
5. **Prova**: esegui la checklist del §6.

### Dove si inseriscono le idee future
| Idea | Dove |
|---|---|
| Contatore giorni insieme | nuova sezione (checklist sopra) |
| Cuori che cadono al tap | `initHome()`, stessa tecnica di `plantFlower()` |
| Musica/foto permanenti | in `app.js` sostituisci `readStorage/writeStorage` con **IndexedDB** (solo la zona UTILITÀ + `savePhotos`) |
| Scarica foto con cornice | §8 FOTO: nuova funzione `exportPhoto()` con canvas |
| Nuovi temi del diario | `.t4` in CSS + `<option value="4">` |
| Più lingue / testi | sposta le frasi in file `phrases.js` |
| Uso offline sul telefono | file `manifest.json` + service worker (PWA) |

## 4. Come mantenere il codice pulito
- **Una funzione, un compito**: se supera ~25 righe, dividila.
- **Niente numeri o testi "sparsi"**: valori da cambiare spesso vanno in `CONFIG` (JS) o `:root` (CSS).
- **Colori solo da variabili** (`var(--pk)`): mai un nuovo `#ff8ac9` copiato a mano.
- **Stile solo in CSS**: in JS cambia classi (`classList.toggle`), non decine di `style.x`. Fanno eccezione i valori casuali (fiori, frasi).
- **Una regione per sezione**, nello stesso ordine in tutti e tre i file.
- **Nomi chiari**: verbo per le funzioni (`renderGallery`, `saveDoc`), nomi di dominio per i dati (`gallery.photos`).
- **Prima di aggiungere**: cerca se esiste già una funzione utile (`ask`, `escapeHTML`, `downloadBlob`).
- **Commit piccoli** (Source Control di VS Code) con messaggi tipo `Aggiunta sezione Giorni`.

## 5. Punti fragili (cosa può rompere o limitare il sito)
| Rischio | Perché | Cosa fare |
|---|---|---|
| **ID/classi rinominati in un solo file** | HTML, CSS e JS si trovano per nome: l'errore è silenzioso | usa la tabella "Collegamenti nascosti" |
| **Cambiare i nomi dei dati salvati** | documenti e foto già salvati diventano illeggibili | aggiungi campi, non rinominare quelli vecchi |
| **`localStorage` ~5 MB** | poche decine di foto riempiono la memoria | passa a IndexedDB se servono più foto |
| **Musica non salvata** | i file esistono solo finché la pagina è aperta | IndexedDB, oppure rimetterli a ogni avvio |
| **`confirm()` / `alert()`** | bloccati nelle anteprime di Codespaces | usa sempre `ask()` |
| **`document.execCommand`** | funziona, ma è una funzione "deprecata" dei browser | oggi va bene; in futuro valuta Quill o TipTap |
| **Librerie da internet** (Google Fonts, html2pdf) | senza connessione: font diversi e PDF non funzionante (c'è un avviso) | scarica i file in `assets/` per l'uso offline |
| **Tutto a schermo, niente scroll di pagina** | su schermi molto piccoli o in orizzontale il contenuto può essere tagliato | ogni nuova sezione deve scorrere *dentro* un suo riquadro (`overflow:auto`) |
| **`z-index` sovrapposti** | un nuovo popup può finire sotto altri | usa `--z-modal` / `--z-dialog` |
| **`!important` nei temi `.t0/.t2/.t3`** | servono per battere il bordo base; rendono difficili gli override | non aggiungerne altri |
| **Dati nel browser** | cancellare i dati di navigazione o cambiare dispositivo = si perde tutto | esporta spesso i documenti; tieni le foto originali |
| **Cache del browser** | dopo una modifica vedi la versione vecchia | `Ctrl+Shift+R` |
| **Salvataggio a ogni tasto** | con testi enormi può rallentare | in futuro: salvataggio ritardato (debounce) |
| **File audio molto grandi** | consumano memoria del telefono | consiglia brani normali (MP3) |

## 6. Prova veloce dopo ogni modifica
1. Apri la console (`F12`): non deve esserci nulla in rosso.
2. Home: frasi che scorrono, fiori che crescono, tap sul prato.
3. Diario: scrivi, cambia tema, ricarica la pagina (deve restare), **Nuovo**, scarica Word e PDF.
4. Musica: carica un brano, play/pausa, il disco gira e si ferma.
5. Foto: carica, cambia cornice/filtro/sticker, **Elimina**, ricarica la pagina.
6. Riduci la finestra a larghezza telefono: nessuna scritta tagliata e nessuno scroll di pagina.


## 7. Novità: Menù, nuove sezioni e temi
| Sezione | id | Cosa fa | Dati |
|---|---|---|---|
| 📋 Menù | `#menu` | schede di tutte le sezioni, scelta tema, contatore visite stile anni 2000 | `ktheme`, `kvisits` |
| 💌 Giorni | `#days` | giorni/anni/mesi insieme e prossimo traguardo (ogni 100 giorni) | `kdays` |
| ⭐ Sogni | `#dreams` | lista di cose da fare, si spunta con un tap | `kdreams` |
| 🥠 Biscotto | `#fortune` | biscotto animato che si apre, frase casuale (`CONFIG.fortunes`), 📌 per fissarla e salvarla | `kpins` |

**Navigazione**: menu in alto e schede del Menù nascono entrambi da `CONFIG.sections`. Per partire dal Menù, in fondo ad `app.js` scrivi `showView('menu')`.

### Come aggiungere un tema
1. `CONFIG.themes` (`app.js`): nuova riga `{ id: 'pastello', name: '🍭 Pastello' }`.
2. `style.css` §12: blocco `html[data-theme=pastello] { --bg:…; --p:…; --pk:…; }` (copia un tema esistente e cambia i valori).
3. Solo le variabili cambiano il look: non servono modifiche altrove. Regole extra (es. effetti) vanno dopo il blocco, con lo stesso prefisso.

### Nuovi punti fragili
- Un nuovo tema deve definire **tutte** le variabili usate (`--text`, `--bg`, `--card`, `--p`, `--pk`, `--dark`…) o erediterà quelle di Kuromi.
- Controlla sempre il contrasto: testo su `--pk` usa `--dark`.
- Temi e font (Orbitron, Cinzel, VT323…) vengono da Google Fonts: offline cambiano i caratteri ma non si rompe nulla.
- Il tema Cyberpunk usa `body::after` con `z-index: 50`: i popup restano sopra solo se usano `--z-modal` / `--z-dialog`.

### Regole nate dagli errori trovati
- Gli elenchi `<ul>` vanno sempre con `padding: 0`: il browser ne aggiunge 40px a sinistra e la lista risulta spostata.
- Un campo con pulsante "Aggiungi" va dentro un `<form>` con `onsubmit`: il tasto Invio dei telefoni non sempre manda `keydown` con `key === 'Enter'`.
- Gli elementi con `hidden` devono restare nascosti: per questo c'è `[hidden] { display: none !important; }` in `style.css` §2 (senza, qualsiasi classe con `display:flex` lo ignora).
- I dati letti dal `localStorage` vanno sempre controllati (`Array.isArray`…): un dato rovinato non deve bloccare la sezione.