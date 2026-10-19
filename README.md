# 💜 Kuromi World

Sito a schermo intero (nessuno scroll di pagina) dedicato a lei, a tema Kuromi / Sanrio.
Solo **HTML + CSS + JavaScript**, nessun framework e nessuna installazione.

## Struttura
```
kuromi-world/
├── index.html   # struttura: menu e 4 sezioni
├── style.css    # tema, colori, cornici, filtri, disco
├── app.js       # tutta la logica
└── README.md
```

## Avvio in Codespaces
1. Apri la cartella in VS Code (Codespaces).
2. Installa l'estensione **Live Server** (Ritwick Dey), poi tasto destro su `index.html` → *Open with Live Server*.
   In alternativa: `python3 -m http.server 8000` dal terminale e apri la porta 8000 dal tab *Ports*.
3. Per vederlo dal telefono: nel tab *Ports* rendi la porta **Public** e apri il link.

## Le 4 sezioni
| Sezione | Cosa fa | Come funziona |
|---|---|---|
| 🌸 Giardino | Frasi che scorrono in alto, fiori che crescono dal prato | Frasi = array `PH` in `app.js`. Fiori = SVG generati a caso (3 forme, 7 colori). Un tap sul prato ne pianta uno nuovo. |
| 📝 Diario | Editor di testo con 4 temi, 4 font, grassetto/corsivo/sottolineato, colore | `contenteditable` + `execCommand`. Salvataggio automatico in `localStorage`. Esporta in **Word** (`.doc`) e **PDF** (libreria html2pdf da CDN, serve internet). |
| 💿 Musica | Carica più brani, playlist, play/pausa/avanti/indietro, barra di avanzamento | Usa `<audio>` e `URL.createObjectURL`. Il disco gira (animazione CSS) solo mentre suona. La musica continua anche cambiando sezione. |
| 📷 Foto | Carica foto, tocca per personalizzarle | Cornici (polaroid, rosa, nera, tonda), filtri, dedica, inclinazione, sticker. Le foto vengono ridimensionate (max 700px) e salvate in `localStorage`. |

## Novità
- 📋 **Menù**: pagina con le schede di tutte le sezioni, scelta del tema e contatore visite stile anni 2000.
- 🎨 **Temi**: Kuromi, Windows XP, Cyberpunk, Skyrim, Webcore (si scelgono dal Menù, si ricorda l'ultimo).
- 💌 **Giorni**: scegli la data di inizio e vedi i giorni insieme e il prossimo traguardo.
- ⭐ **Sogni**: lista di cose da fare insieme, da spuntare.
- 🥠 **Biscotto**: si apre con un'animazione e mostra un pensierino casuale (frasi in `CONFIG.fortunes`). Con 📌 la frase si fissa e resta salvata nell'elenco sotto.
  *Una tua GIF al posto del disegno*: metti il file in `assets/` e in `index.html` sostituisci l'`<svg>` dentro `#cookie` con `<img src="assets/biscotto.gif" alt="">` (le classi `.open` e `.shake` non servono più).
- 💾 **Webcore**: cursore a cuore, stelle che scorrono, bottoncini 88x31 nel Menù. Per uno sfondo GIF tuo: nel blocco `html[data-theme=webcore]` di `style.css` cambia `--sky` in `url(assets/sfondo.gif)`.
- Per capire la struttura e come aggiungere funzioni: vedi `ARCHITETTURA.md`.

## Personalizzazioni facili
- **Frasi**: modifica l'array `PH` in `app.js`.
- **Colori**: variabili `--p`, `--pk`, `--bg` all'inizio di `style.css`; fiori nell'array `COL`.
- **Numero di fiori iniziali**: il ciclo `for(let i=0;i<16;i++)plant(...)`.
- **Disco con la tua GIF/immagine**: metti il file in `assets/disco.gif` e in `style.css` sostituisci il `background` di `#disc` con `url(assets/disco.gif) center/cover`; togli `#disc::after` e, se è già animata, rimuovi la `animation`.
- **Temi del diario**: aggiungi una classe `.t4` in CSS e una `<option value="4">` nel select.

## Limiti noti (da sapere)
- **Musica non persistente**: dopo aver ricaricato la pagina i brani vanno ricaricati (i file restano solo in memoria).
- **Foto**: `localStorage` ha ~5 MB, quindi circa 15-25 foto. Se è pieno compare un avviso.
- I dati sono **salvati nel browser/dispositivo** usato: cambiando browser o dispositivo non si vedono.
- L'esportazione Word è un `.doc` (si apre in Word e LibreOffice); lo sfondo colorato potrebbe non vedersi.
- Font e PDF richiedono connessione internet (Google Fonts, cdnjs).

## Consigli di utilizzo 💡
1. **Mettilo online gratis** con GitHub Pages / Netlify / Vercel: basta il link e lei lo apre dal telefono. Ricorda che i dati restano sul suo dispositivo.
2. **Aggiungilo alla schermata Home** del telefono (Condividi → *Aggiungi a Home*) per averlo come un'app.
3. **Frasi personali**: sostituisci quelle di esempio con vostri ricordi, soprannomi, date: è ciò che lo rende speciale.
4. **Sorpresa**: pre-carica nel diario una lettera per lei (scrivila, poi la trovi salvata) o crea una playlist con le vostre canzoni.
5. **Backup**: scarica ogni tanto i documenti in PDF/Word; le foto non hanno export, quindi tieni gli originali.
6. **Idee future**: salvare musica e foto con IndexedDB (nessun limite 5 MB), contatore "insieme da…", cuori che cadono al tap, scarica la foto con cornice e filtro, PWA per l'uso offline.