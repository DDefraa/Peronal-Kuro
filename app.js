/* =====================================================================
   KUROMI WORLD
   Indice (in VS Code puoi chiudere/aprire ogni sezione con il ▸ a sinistra):
     1. CONFIGURAZIONE   -> frasi, colori, limiti: qui si personalizza
     2. UTILITÀ          -> funzioni di supporto usate ovunque
     3. DIALOGO          -> finestra di conferma/avviso del sito
     4. NAVIGAZIONE      -> cambio sezione dal menu
     5. HOME             -> frasi che scorrono + fiori
     6. DIARIO           -> editor, temi, salvataggio, Word/PDF
     7. MUSICA           -> playlist, player, disco
     8. FOTO             -> galleria ed editor foto
     9. TEMA DEL SITO    -> Kuromi, XP, Cyberpunk, Skyrim, Webcore
    10. MENU             -> schermata con le schede di tutte le sezioni
    11. GIORNI INSIEME   -> contatore dalla data di inizio
    12. SOGNI            -> lista di cose da fare insieme
    13. BISCOTTO         -> biscotto che si apre + frasi fissate
    14. POMODORO         -> timer di concentrazione
    15. POST-IT          -> appunti rapidi
    16. MEMORY           -> gioco delle coppie
    17. ACCHIAPPA        -> gioco dei cuori
    18. AVVIO            -> accende tutte le sezioni
   ===================================================================== */


//#region 1. CONFIGURAZIONE
const CONFIG = {
  // Frasi che scorrono nel cielo della home
  phrases: [
    "Sei la mia cosa preferita :)", "Ti amo più di tutte le stelle <3",
    "Il mio posto felice sei tu :3", "Sei dolce e un po' cattivella >:3",
    "Ogni giorno con te è speciale ^_^", "Sei il mio sorriso preferito :D",
    "Fai fiorire tutto ciò che tocchi ;)", "Kuromi approva questo amore (>w<)",
  ],
  // Sezioni del sito: generano sia il menu in alto sia le schede del Menù.
  // Per aggiungerne una: nuova riga qui + <section id="..."> in index.html
  sections: [
    { id: 'menu',    icon: '(^_^)',   name: 'Menù',      desc: '' },
    { id: 'home',    icon: ':3',      name: 'Giardino',  desc: 'Frasi dolci e fiori che crescono' },
    { id: 'docs',    icon: ';)',      name: 'Diario',    desc: 'Scrivi con temi carini, scarica in Word o PDF' },
    { id: 'music',   icon: 'd(^_^)b', name: 'Musica',    desc: 'Carica i brani e guarda girare il disco' },
    { id: 'photos',  icon: '(o_o)',   name: 'Foto',      desc: 'Cornici, filtri, dediche e adesivi da spostare' },
    { id: 'days',    icon: '<3',      name: 'Giorni',    desc: 'Quanti giorni insieme e il prossimo traguardo' },
    { id: 'dreams',  icon: '(*_*)',   name: 'Sogni',     desc: 'Lista di cose da fare insieme, da spuntare' },
    { id: 'fortune', icon: '(^.^)',   name: 'Biscotto',  desc: 'Un pensierino casuale per oggi, da fissare' },
    { id: 'pomo',    icon: '(>_<)',   name: 'Pomodoro',  desc: 'Timer di concentrazione 25/5 per lavorare' },
    { id: 'notes',   icon: ':P',      name: 'Post-it',   desc: 'Appunti rapidi colorati che si salvano da soli' },
    { id: 'memory',  icon: '(o.O)',   name: 'Memory',    desc: 'Trova le coppie, con record' },
    { id: 'catch',   icon: '(>:3)',   name: 'Acchiappa', desc: 'Tocca i cuori ed evita gli x_x: 30 secondi' },
  ],
  // Temi del sito (gli stili stanno in style.css §12, con lo stesso id)
  themes: [
    { id: 'kuromi',    name: 'Kuromi' },
    { id: 'sakura',    name: 'Sakura' },
    { id: 'candy',     name: 'Candy' },
    { id: 'galaxy',    name: 'Galassia' },
    { id: 'nightcore', name: 'Nightcore' },
    { id: 'xp',        name: 'Windows XP' },
    { id: 'win98',     name: 'Windows 98 (teal)' },
    { id: 'spettro',   name: 'Spettro (schema nero)' },
    { id: 'cyber',     name: 'Cyberpunk' },
    { id: 'skyrim',    name: 'Skyrim' },
    { id: 'webcore',   name: 'Webcore' },
  ],
  // CURSORI PERSONALIZZATI: file .cur/.png in assets/cursors/. Chiave = id del tema, oppure 'default' per tutti.
  //   normal  = cursore normale      pointer = cursore sui pulsanti (facoltativo)
  //   frames  = elenco di file per un cursore ANIMATO, fps = fotogrammi al secondo
  //   hotspot / pointerHotspot = punto attivo '4 4' (solo per i .png; i .cur ce l'hanno già dentro)
  // Senza nulla qui, ogni tema usa una freccia disegnata nel suo colore. Esempi (togli //):
  cursors: {
    // default:   { normal: 'assets/cursors/freccia.cur', pointer: 'assets/cursors/mano.cur' },
    // nightcore: { frames: ['assets/cursors/n1.cur', 'assets/cursors/n2.cur', 'assets/cursors/n3.cur'], fps: 8 },
  },
  pomodoro: { focus: 25, break: 5 },   // minuti
  catchSeconds: 30,                    // durata del gioco Acchiappa
  // Messaggi del biscotto
  fortunes: [
    "Oggi qualcuno pensa a te con un grande sorriso :)", "Una piccola sorpresa dolce è in arrivo ^_^",
    "Sei più forte e più magica di quanto credi :3", "Il tuo prossimo abbraccio sarà il migliore di sempre <3",
    "Fai una cosa carina per te: te la meriti :D", "Oggi ti aspetta un momento perfetto, non perderlo ;)",
    "Sei il motivo per cui qualcuno è felice (^_^)", "Vai pure, Kuromi fa il tifo per te >:3",
  ],
  // Colori di frasi e fiori
  colors: ['#ff8ac9', '#b57bff', '#ffd166', '#ffffff', '#7ad7ff', '#ff6b6b', '#c3f584'],
  home: {
    startFlowers: 8,       // fiori presenti all'apertura
    flowerMinPct: 10,      // altezza minima dei fiori (% del giardino)
    flowerExtraPct: 26,    // + un valore casuale fino a questo
    phraseEveryMs: 5500,   // ogni quanto compare una frase
    phraseMinSec: 12,      // durata minima di attraversamento
    phraseExtraSec: 10,    // + un valore casuale fino a questo
  },
  photos: { maxSidePx: 700, jpegQuality: 0.75 },
  // Chiavi usate nel localStorage del browser
  storage: { doc: 'kdoc', photos: 'kph', theme: 'ktheme', days: 'kdays', dreams: 'kdreams', visits: 'kvisits', pins: 'kpins', notes: 'knotes', pomo: 'kpomo', games: 'kgames' },
};
//#endregion


//#region 2. UTILITÀ
const $  = sel => document.querySelector(sel);
const $$ = sel => [...document.querySelectorAll(sel)];

/** Elemento casuale di un array */
const pick = list => list[Math.floor(Math.random() * list.length)];
/** Intero casuale da 0 a n-1 */
const rnd = n => Math.floor(Math.random() * n);

/** "1 giorno" / "5 giorni" */
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

/** Rende sicuro un testo da inserire in HTML */
const escapeHTML = text =>
  String(text).replace(/[<>&]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

/** Legge un valore JSON dal localStorage (o il valore di riserva) */
function readStorage(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
}

/** Scrive un valore JSON nel localStorage. Ritorna false se la memoria è piena */
function writeStorage(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); return true; }
  catch { return false; }
}

/** Fa scaricare un file generato dal browser */
function downloadBlob(blob, fileName) {
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}
//#endregion


//#region 3. DIALOGO
// confirm()/alert() del browser sono bloccati nelle anteprime di Codespaces,
// quindi usiamo una finestra nostra. Si usa con:  if (await ask('Sicura?')) {...}

/**
 * @param {string} message  testo da mostrare
 * @param {boolean} withCancel  true = Conferma/Annulla, false = solo Ok
 * @returns {Promise<boolean>}
 */
function ask(message, withCancel = true) {
  return new Promise(resolve => {
    $('#dmsg').textContent = message;
    $('#dno').hidden = !withCancel;
    $('#dyes').textContent = withCancel ? 'Conferma' : 'Ok';
    $('#dlg').hidden = false;

    const close = answer => { $('#dlg').hidden = true; resolve(answer); };
    $('#dyes').onclick = () => close(true);
    $('#dno').onclick  = () => close(false);
  });
}
//#endregion


//#region 4. NAVIGAZIONE
// Menu in alto generato da CONFIG.sections. Una sola funzione cambia sezione: showView().
function showView(viewId) {
  $$('nav button, .view').forEach(el => el.classList.remove('on'));
  $(`nav button[data-v="${viewId}"]`).classList.add('on');
  $('#' + viewId).classList.add('on');
}

function initNavigation() {
  CONFIG.sections.forEach(s => {
    const btn = document.createElement('button');
    btn.dataset.v = s.id;
    btn.textContent = s.name;
    btn.onclick = () => showView(s.id);
    $('#clock').before(btn);
    const view = $('#' + s.id);
    if (view) view.dataset.title = `${s.icon}  ${s.name}`;   // testo della barra del titolo (letto dal CSS)
  });
  const tick = () => $('#clock').textContent = new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' });
  tick(); setInterval(tick, 15000);
}
//#endregion


//#region 5. HOME
// --- Frasi che scorrono ---------------------------------------------

/** Crea una frase che attraversa il cielo e poi sparisce */
function spawnPhrase() {
  const { phraseMinSec, phraseExtraSec } = CONFIG.home;
  const el = document.createElement('span');
  el.className = 'ph';
  el.textContent = pick(CONFIG.phrases);
  el.style.top = rnd(85) + '%';
  el.style.fontSize = (22 + rnd(16)) + 'px';
  el.style.color = pick(CONFIG.colors);
  el.style.animationDuration = (phraseMinSec + rnd(phraseExtraSec)) + 's';
  el.onanimationend = () => el.remove();
  $('#sky').append(el);
}

// --- Fiori ----------------------------------------------------------

/** Forma di un singolo petalo. Tipi: 0 ovale, 1 tondo, 2 tulipano */
function petalShape(type) {
  if (type === 0) return '<ellipse cy="-14" rx="7" ry="13"/>';
  if (type === 1) return '<circle cy="-13" r="9"/>';
  return '<path d="M0 0C-12-8-9-30 0-32 9-30 12-8 0 0Z"/>';
}

/** Corolla: i petali ruotati attorno al centro */
function buildPetals(type, count) {
  let petals = '';
  for (let i = 0; i < count; i++) {
    petals += `<g transform="rotate(${360 / count * i})">${petalShape(type)}</g>`;
  }
  return petals;
}

/** Disegno SVG completo di un fiore (stelo + foglie + corolla) con forma e colori casuali */
function buildFlowerSVG() {
  const type = rnd(3);
  const count = type === 2 ? 3 + rnd(3) : 5 + rnd(4);
  const petalColor = pick(CONFIG.colors);
  const centerColor = pick(['#ffd166', '#fff', '#ff8ac9']);

  return `
    <svg viewBox="0 0 100 220">
      <path d="M50 60C46 120 54 170 50 220" stroke="#3fa35c" stroke-width="5" fill="none"/>
      <ellipse cx="38" cy="150" rx="14" ry="6" fill="#3fa35c" transform="rotate(-30 38 150)"/>
      <ellipse cx="63" cy="120" rx="14" ry="6" fill="#4cc06c" transform="rotate(30 63 120)"/>
      <g transform="translate(50,46) scale(1.2)">
        <g fill="${petalColor}" stroke="#0004">${buildPetals(type, count)}</g>
        <circle r="6" fill="${centerColor}"/>
      </g>
    </svg>`;
}

/**
 * Pianta un fiore nel giardino
 * @param {number} xPercent  posizione orizzontale (0-100)
 * @param {number} delaySec  ritardo prima che inizi a crescere
 */
function plantFlower(xPercent, delaySec = 0) {
  const flower = document.createElement('div');
  flower.className = 'flower';
  flower.style.left = xPercent + '%';
  flower.style.height = (CONFIG.home.flowerMinPct + rnd(CONFIG.home.flowerExtraPct)) + '%';   // altezza casuale
  flower.style.aspectRatio = '100/220';
  flower.style.animationDelay = delaySec + 's';
  flower.style.transform = 'translateX(-50%)';
  flower.innerHTML = buildFlowerSVG();
  $('#garden').append(flower);
}

/** Pianta i fiori iniziali, distribuiti lungo il prato */
function plantStartingFlowers() {
  for (let i = 0; i < CONFIG.home.startFlowers; i++) {
    plantFlower(4 + i * (90 / CONFIG.home.startFlowers) + rnd(5), i * 0.35);
  }
}

function initHome() {
  // frasi: alcune subito, poi una ogni tot
  for (let i = 0; i < 2; i++) setTimeout(spawnPhrase, 800 + i * 3000);
  setInterval(spawnPhrase, CONFIG.home.phraseEveryMs);

  plantStartingFlowers();

  // un tap sul prato fa nascere un fiore nel punto toccato
  $('#garden').onclick = e => {
    const box = e.currentTarget.getBoundingClientRect();
    plantFlower((e.clientX - box.left) / box.width * 100);
  };
}
//#endregion


//#region 6. DIARIO
// Dati salvati: { t: titolo, h: html del testo, th: tema, f: font, s: dimensione }

const paper = $('#paper');

// --- Salvataggio ----------------------------------------------------

function saveDoc() {
  writeStorage(CONFIG.storage.doc, {
    t: $('#title').value,
    h: paper.innerHTML,
    th: $('#theme').value,
    f: $('#font').value,
    s: $('#size').value,
  });
}

/** Mette a schermo un documento (o uno vuoto se `data` è {}) */
function showDoc(data) {
  $('#title').value = data.t || '';
  paper.innerHTML   = data.h || '';
  $('#theme').value = data.th || 0;
  $('#font').value  = data.f || 'Fredoka';
  $('#size').value  = data.s || 18;
  applyTheme(); applyFont(); applySize();
}

// --- Aspetto --------------------------------------------------------

const applyTheme = () => paper.className = 't' + $('#theme').value;
const applyFont  = () => paper.style.fontFamily = $('#font').value;
const applySize  = () => paper.style.fontSize = $('#size').value + 'px';

// --- Azioni ---------------------------------------------------------

async function newDoc() {
  if (await ask('Iniziare un nuovo documento? Quello attuale verrà cancellato.')) {
    showDoc({});
    saveDoc();
  }
}

/** Nome file sicuro, preso dal titolo */
const docFileName = () => ($('#title').value || 'documento').replace(/[^\w\- ]/g, '');

function exportWord() {
  const css = getComputedStyle(paper);
  const html = `<html><head><meta charset="utf-8"></head>
    <body style="background:${css.backgroundColor};color:${css.color};font-family:${css.fontFamily};font-size:${css.fontSize}">
    <h1>${escapeHTML($('#title').value)}</h1>${paper.innerHTML}</body></html>`;
  downloadBlob(new Blob(['\ufeff', html], { type: 'application/msword' }), docFileName() + '.doc');
}

function exportPdf() {
  if (!window.html2pdf) {
    return ask('Libreria PDF non caricata: controlla la connessione internet.', false);
  }
  // copia "a tutta altezza" del foglio, così il PDF non taglia il testo lungo
  const copy = paper.cloneNode(true);
  copy.removeAttribute('contenteditable');
  copy.style.cssText += ';height:auto;overflow:visible;width:720px';
  const heading = document.createElement('h1');
  heading.textContent = $('#title').value;
  copy.prepend(heading);

  html2pdf().from(copy)
    .set({ margin: 8, filename: docFileName() + '.pdf', html2canvas: { scale: 2 } })
    .save();
}

// --- Collegamenti ---------------------------------------------------

function initDocs() {
  showDoc(readStorage(CONFIG.storage.doc, {}));

  // menu a tendina: applicano e salvano
  $('#theme').onchange = () => { applyTheme(); saveDoc(); };
  $('#font').onchange  = () => { applyFont();  saveDoc(); };
  $('#size').onchange  = () => { applySize();  saveDoc(); };

  // grassetto / corsivo / sottolineato (mousedown evita di perdere la selezione)
  $$('[data-cmd]').forEach(btn =>
    btn.onmousedown = e => { e.preventDefault(); document.execCommand(btn.dataset.cmd); });
  $('#color').oninput = e => document.execCommand('foreColor', false, e.target.value);

  // salvataggio automatico mentre si scrive
  paper.oninput = $('#title').oninput = saveDoc;

  $('#new').onclick  = newDoc;
  $('#word').onclick = exportWord;
  $('#pdf').onclick  = exportPdf;
}
//#endregion


//#region 7. MUSICA
// Brani: { n: nome, u: indirizzo temporaneo del file }. Non persistono dopo un refresh.

const audio = $('#au');
const music = { tracks: [], current: -1 };

function addTracks(files) {
  const wasEmpty = music.current < 0;
  for (const file of files) {
    music.tracks.push({ n: file.name.replace(/\.[^.]+$/, ''), u: URL.createObjectURL(file) });
  }
  renderPlaylist();
  if (wasEmpty) playTrack(0);   // al primo caricamento parte da sola
}

function renderPlaylist() {
  $('#list').innerHTML = music.tracks.map((t, i) =>
    `<li class="${i === music.current ? 'cur' : ''}" data-i="${i}">${escapeHTML(t.n)}</li>`
  ).join('');
}

/** Suona il brano `index` (i valori fuori dai limiti tornano all'inizio/fine) */
function playTrack(index) {
  const total = music.tracks.length;
  if (!total) return;
  music.current = (index + total) % total;
  audio.src = music.tracks[music.current].u;
  audio.play();
  $('#now').textContent = music.tracks[music.current].n;
  renderPlaylist();
}

const togglePlay = () => audio.src && (audio.paused ? audio.play() : audio.pause());

/** Disco che gira e icona del pulsante seguono lo stato reale dell'audio */
function showPlaying(isPlaying) {
  $('#disc').classList.toggle('play', isPlaying);
  $('#pp').textContent = isPlaying ? '||' : '>';
}

function initMusic() {
  $('#mfile').onchange = e => { addTracks(e.target.files); e.target.value = ''; };
  $('#list').onclick   = e => e.target.dataset.i && playTrack(+e.target.dataset.i);
  $('#pp').onclick     = togglePlay;
  $('#prev').onclick   = () => playTrack(music.current - 1);
  $('#next').onclick   = () => playTrack(music.current + 1);

  audio.onplay  = () => showPlaying(true);
  audio.onpause = () => showPlaying(false);
  audio.onended = () => playTrack(music.current + 1);

  // barra di avanzamento (0-1000)
  audio.ontimeupdate = () => $('#seek').value = audio.currentTime / audio.duration * 1000 || 0;
  $('#seek').oninput = e => audio.currentTime = e.target.value / 1000 * audio.duration;
}
//#endregion


//#region 8. FOTO
// Ogni foto: { s: immagine, f: cornice, g: filtro, c: dedica, r: inclinazione,
//              b: luminosità %, v: colori %, bc: colore cornice, cf: font dedica,
//              z: dimensione emoji (px), k: emoji [{ e, x, y }] con x,y in % }
const PHOTO_DEFAULTS = { f: 0, g: 0, c: '', r: 0, b: 100, v: 100, bc: '', cf: 'Caveat', z: 26 };
const gallery = { photos: [], selected: -1 };
const currentPhoto = () => gallery.photos[gallery.selected];

/** Completa le foto salvate con le opzioni nuove (e converte i vecchi sticker in emoji spostabili) */
function normalizePhoto(p) {
  for (const key in PHOTO_DEFAULTS) if (p[key] === undefined) p[key] = PHOTO_DEFAULTS[key];
  if (!Array.isArray(p.k)) p.k = Array.from(p.k || '').map((e, n) => ({ e, x: 14 + n * 14, y: 14 }));
  return p;
}

// --- Salvataggio ----------------------------------------------------

function savePhotos() {
  if (!writeStorage(CONFIG.storage.photos, gallery.photos)) {
    ask('Memoria del browser piena: elimina qualche foto.', false);
  }
}

// --- Caricamento ----------------------------------------------------

/** Rimpicciolisce l'immagine per risparmiare memoria. Ritorna un data-URL */
function resizeImage(file) {
  const { maxSidePx, jpegQuality } = CONFIG.photos;
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxSidePx / Math.max(img.width, img.height));
      const canvas = document.createElement('canvas');
      canvas.width  = img.width * scale;
      canvas.height = img.height * scale;
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', jpegQuality));
    };
    img.src = URL.createObjectURL(file);
  });
}

async function addPhotos(files) {
  for (const file of files) gallery.photos.push(normalizePhoto({ s: await resizeImage(file) }));
  savePhotos();
  renderGallery();
}

// --- Visualizzazione ------------------------------------------------

/** HTML di una foto con cornice, filtro, regolazioni, emoji e dedica */
function photoCardHTML(p, i) {
  const vars = `--r:${p.r}deg;--b:${p.b / 100};--v:${p.v / 100};` + (p.bc ? `--fc:${p.bc};` : '');
  const stickers = p.k.map((s, n) =>
    `<span class="stk" data-k="${n}" style="left:${s.x}%;top:${s.y}%;font-size:${p.z}px">${escapeHTML(s.e)}</span>`).join('');
  return `<div class="card f${p.f}" style="${vars}" data-i="${i}">
    <img class="g${p.g}" src="${p.s}" alt="">${stickers}<p style="font-family:${p.cf}">${escapeHTML(p.c)}</p></div>`;
}

function renderGallery() {
  $('#grid').innerHTML = gallery.photos.map(photoCardHTML).join('')
    || '<p class="empty">Nessuna foto ancora: carica la prima :)</p>';
}

// --- Editor ---------------------------------------------------------
const EDITOR_FIELDS = { '#fr': 'f', '#fl': 'g', '#cap': 'c', '#rot': 'r', '#bri': 'b', '#sat': 'v', '#cf': 'cf', '#stz': 'z' };   // il colore cornice (#bc) è gestito a parte
const NUMERIC_FIELDS = ['f', 'g', 'r', 'b', 'v', 'z'];

function openEditor(index) {
  gallery.selected = index;
  const p = currentPhoto();
  for (const [sel, key] of Object.entries(EDITOR_FIELDS)) $(sel).value = p[key];
  $('#bc').value = p.bc || '#ff8ac9';
  $('#pv').innerHTML = photoCardHTML(p, index);
  $('#ed').hidden = false;
}

/** Riporta nella foto i valori dei controlli, poi salva e ridisegna */
function applyEditorChanges() {
  const p = currentPhoto();
  for (const [sel, key] of Object.entries(EDITOR_FIELDS)) {
    p[key] = NUMERIC_FIELDS.includes(key) ? +$(sel).value : $(sel).value;
  }
  savePhotos();
  renderGallery();
  $('#pv').innerHTML = photoCardHTML(p, gallery.selected);
}

function addSticker(emoji) {
  currentPhoto().k.push({ e: emoji, x: 30 + rnd(40), y: 30 + rnd(40) });
  applyEditorChanges();
}

/** Trascinamento delle emoji sull'anteprima (mouse e dito) */
function initStickerDrag() {
  const pv = $('#pv');
  let drag = null;

  pv.addEventListener('pointerdown', e => {
    const el = e.target.closest('.stk');
    if (!el) return;
    drag = { el, card: el.parentElement, k: currentPhoto().k[+el.dataset.k] };
    el.setPointerCapture(e.pointerId);
    e.preventDefault();
  });
  pv.addEventListener('pointermove', e => {
    if (!drag) return;
    // posizione del puntatore dentro la foto, tenendo conto dell'inclinazione
    const box = drag.card.getBoundingClientRect();
    const a = -currentPhoto().r * Math.PI / 180;
    const dx = e.clientX - (box.left + box.width / 2);
    const dy = e.clientY - (box.top + box.height / 2);
    const lx = dx * Math.cos(a) - dy * Math.sin(a);
    const ly = dx * Math.sin(a) + dy * Math.cos(a);
    drag.k.x = Math.min(100, Math.max(0, (lx / drag.card.offsetWidth + 0.5) * 100));
    drag.k.y = Math.min(100, Math.max(0, (ly / drag.card.offsetHeight + 0.5) * 100));
    drag.el.style.left = drag.k.x + '%';
    drag.el.style.top  = drag.k.y + '%';
  });
  const end = () => { if (drag) { drag = null; savePhotos(); renderGallery(); } };
  pv.addEventListener('pointerup', end);
  pv.addEventListener('pointercancel', end);

  // doppio tap su un'emoji = la toglie
  pv.addEventListener('dblclick', e => {
    const el = e.target.closest('.stk');
    if (!el) return;
    currentPhoto().k.splice(+el.dataset.k, 1);
    applyEditorChanges();
  });
}

async function deletePhoto() {
  if (!await ask('Eliminare questa foto?')) return;
  gallery.photos.splice(gallery.selected, 1);
  savePhotos();
  renderGallery();
  $('#ed').hidden = true;
}

function initPhotos() {
  const saved = readStorage(CONFIG.storage.photos, []);
  gallery.photos = (Array.isArray(saved) ? saved : []).filter(p => p && p.s).map(normalizePhoto);
  renderGallery();

  $('#pfile').onchange = e => { addPhotos(e.target.files); e.target.value = ''; };
  $('#grid').onclick = e => {
    const card = e.target.closest('.card');
    if (card) openEditor(+card.dataset.i);
  };

  // ogni controllo dell'editor aggiorna la foto in tempo reale
  Object.keys(EDITOR_FIELDS).forEach(sel => $(sel).oninput = applyEditorChanges);
  // colore cornice: si imposta solo se lo scegli tu; cambiando cornice si torna al colore di default
  $('#bc').oninput = () => { currentPhoto().bc = $('#bc').value; applyEditorChanges(); };
  $('#fr').addEventListener('input', () => { currentPhoto().bc = ''; $('#bc').value = '#ff8ac9'; applyEditorChanges(); });
  $$('#emo [data-e]').forEach(btn => btn.onclick = () => addSticker(btn.dataset.e));
  $('#undo').onclick = () => { currentPhoto().k.pop(); applyEditorChanges(); };
  $('#nost').onclick = () => { currentPhoto().k = []; applyEditorChanges(); };
  initStickerDrag();

  $('#del').onclick   = deletePhoto;
  $('#close').onclick = () => $('#ed').hidden = true;
}
//#endregion


//#region 9. TEMA DEL SITO
// Il tema è un attributo su <html> (data-theme="xp"); il look è in style.css §12.
// Il cursore viene scelto qui: file tuoi (CONFIG.cursors) oppure una freccia disegnata.

/** Freccia disegnata (niente emoji) nel colore d'accento del tema */
function drawnCursor(color) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" shape-rendering="crispEdges"><path d="M2 2v17l4.5-4.5L9.5 21l3-1.4-3-6.6H16z" fill="${color}" stroke="#000" stroke-width="1.5"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 2 2, auto`;
}

let cursorTimer = null;

function setCursor(themeId) {
  clearInterval(cursorTimer);
  const root = document.documentElement.style;
  const conf = CONFIG.cursors[themeId] || CONFIG.cursors.default || {};
  const frames = conf.frames?.length ? conf.frames : conf.normal ? [conf.normal] : null;
  const hot = conf.hotspot ? ' ' + conf.hotspot : '';        // punto attivo, serve solo per i .png (i .cur lo contengono già)
  const asCursor = file => `url("${file}")${hot}, auto`;

  if (frames) {
    let i = 0;
    root.setProperty('--cursor', asCursor(frames[0]));
    if (frames.length > 1) {                       // animato: cambia fotogramma a tempo
      cursorTimer = setInterval(() => root.setProperty('--cursor', asCursor(frames[i = (i + 1) % frames.length])), 1000 / (conf.fps || 8));
    }
  } else {
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--pk').trim() || '#ff8ac9';
    root.setProperty('--cursor', drawnCursor(accent));
  }
  if (conf.pointer) root.setProperty('--cursor-pointer', `url("${conf.pointer}")${conf.pointerHotspot ? ' ' + conf.pointerHotspot : ''}, pointer`);
  else root.removeProperty('--cursor-pointer');
}

function setSiteTheme(id) {
  const theme = CONFIG.themes.find(t => t.id === id) || CONFIG.themes[0];
  document.documentElement.dataset.theme = theme.id;
  writeStorage(CONFIG.storage.theme, theme.id);
  $('#themes').value = theme.id;
  setCursor(theme.id);
}

function initTheme() {
  $('#themes').innerHTML = CONFIG.themes.map(t => `<option value="${t.id}">${t.name}</option>`).join('');
  $('#themes').onchange = e => setSiteTheme(e.target.value);
  setSiteTheme(readStorage(CONFIG.storage.theme, CONFIG.themes[0].id));
}
//#endregion


//#region 10. MENU
/** Schede cliccabili di tutte le sezioni (tranne il Menù stesso) */
function renderTiles() {
  $('#tiles').innerHTML = CONFIG.sections.filter(s => s.id !== 'menu').map(s =>
    `<button class="tile" data-go="${s.id}"><span class="ic">${escapeHTML(s.icon)}</span><b>${s.name}</b><small>${s.desc}</small></button>`
  ).join('');
}

/** Contatore visite in stile anni 2000: +1 a ogni apertura del sito */
function countVisit() {
  const visits = readStorage(CONFIG.storage.visits, 0) + 1;
  writeStorage(CONFIG.storage.visits, visits);
  $('#visits').textContent = String(visits).padStart(6, '0');
}

function initMenu() {
  renderTiles();
  $('#tiles').onclick = e => {
    const tile = e.target.closest('.tile');
    if (tile) showView(tile.dataset.go);
  };
  countVisit();
}
//#endregion


//#region 11. GIORNI INSIEME
/** Differenza in anni/mesi/giorni tra due date */
function diffYMD(from, to) {
  let y = to.getFullYear() - from.getFullYear();
  let m = to.getMonth() - from.getMonth();
  let d = to.getDate() - from.getDate();
  if (d < 0) { m--; d += new Date(to.getFullYear(), to.getMonth(), 0).getDate(); }
  if (m < 0) { y--; m += 12; }
  return { y, m, d };
}

function renderDays() {
  const value = $('#since').value;
  const big = $('#daysbig'), det = $('#daysdet'), next = $('#daysnext');
  det.textContent = next.textContent = '';
  if (!value) { big.textContent = 'Scegli una data :)'; return; }

  const start = new Date(value + 'T00:00:00');
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const total = Math.round((today - start) / 864e5);

  if (total < 0) { big.textContent = `Mancano ${plural(-total, 'giorno', 'giorni')} ...`; return; }

  const { y, m, d } = diffYMD(start, today);
  const milestone = (Math.floor(total / 100) + 1) * 100;   // prossimo multiplo di 100
  big.textContent = `${plural(total, 'giorno', 'giorni')} <3`;
  det.textContent = `${plural(y, 'anno', 'anni')}, ${plural(m, 'mese', 'mesi')} e ${plural(d, 'giorno', 'giorni')}`;
  next.textContent = `Prossimo traguardo: ${milestone} giorni, tra ${plural(milestone - total, 'giorno', 'giorni')} :D`;
}

function initDays() {
  $('#since').value = readStorage(CONFIG.storage.days, '');
  $('#since').onchange = () => { writeStorage(CONFIG.storage.days, $('#since').value); renderDays(); };
  renderDays();
}
//#endregion


//#region 12. SOGNI
// Ogni voce: { t: testo, d: true se realizzato }
const dreams = { list: [] };

const saveDreams = () => writeStorage(CONFIG.storage.dreams, dreams.list);

function renderDreams() {
  const done = dreams.list.filter(x => x.d).length;
  $('#dcount').textContent = `${done}/${dreams.list.length} realizzati`;
  $('#dlist').innerHTML = dreams.list.map((x, i) => `
    <li class="${x.d ? 'done' : ''}" data-i="${i}">
      <span>${x.d ? '[x]' : '[ ]'}</span><span>${escapeHTML(x.t)}</span><button data-del="${i}" aria-label="Elimina">x</button>
    </li>`).join('') || '<li class="empty">Nessun sogno ancora: scrivi il primo :)</li>';
}

function addDream() {
  const input = $('#dtext');
  const text = input.value.trim();
  if (!text) return;
  dreams.list.push({ t: text, d: false });
  input.value = '';
  saveDreams(); renderDreams();
  input.focus();                                              // si può continuare a scrivere
  $('#dlist').lastElementChild.scrollIntoView({ block: 'nearest' });
}

function initDreams() {
  const saved = readStorage(CONFIG.storage.dreams, []);       // dati rovinati? si riparte da lista vuota
  dreams.list = Array.isArray(saved) ? saved.filter(x => x && typeof x.t === 'string') : [];
  renderDreams();

  // <form>: funziona con Invio, con il tasto "Vai" della tastiera del telefono e con il pulsante
  $('#dform').onsubmit = e => { e.preventDefault(); addDream(); };
  $('#dlist').onclick = e => {
    const del = e.target.closest('[data-del]');
    const row = e.target.closest('li[data-i]');
    if (del) dreams.list.splice(+del.dataset.del, 1);
    else if (row) dreams.list[+row.dataset.i].d = !dreams.list[+row.dataset.i].d;
    else return;
    saveDreams(); renderDreams();
  };
}
//#endregion


//#region 13. BISCOTTO
// Il biscotto si apre con un'animazione SVG+CSS (style.css §11, classi .shake e .open).
// Le frasi fissate (📌) restano salvate: elenco di testi in localStorage.
const luck = { current: '', last: '', pins: [], busy: false };

const savePins = () => writeStorage(CONFIG.storage.pins, luck.pins);

function updatePinButton() {
  const pinned = luck.pins.includes(luck.current);
  $('#pin').textContent = pinned ? 'Fissata' : 'Fissa';
  $('#pin').disabled = pinned;
}

function renderPins() {
  $('#pins').innerHTML = luck.pins.map((t, i) =>
    `<li><span>${escapeHTML(t)}</span><button data-del="${i}" aria-label="Rimuovi">x</button></li>`
  ).join('') || '<li class="empty">Nessuna frase fissata: apri un biscotto e premi Fissa</li>';
  updatePinButton();
}

/** Frase casuale, mai uguale alla precedente */
function pickFortune() {
  let text;
  do { text = pick(CONFIG.fortunes); } while (text === luck.last && CONFIG.fortunes.length > 1);
  return luck.last = text;
}

/** Richiude il biscotto, lo scuote e lo riapre con una nuova frase */
function openCookie() {
  if (luck.busy) return;
  luck.busy = true;
  const btn = $('#cookie');
  btn.classList.remove('open', 'shake');
  $('#ftext').hidden = $('#factions').hidden = true;
  void btn.offsetWidth;                                 // riavvia l'animazione
  btn.classList.add('shake');
  setTimeout(() => {
    luck.current = pickFortune();
    $('#ftext').textContent = luck.current;
    $('#ftext').hidden = $('#factions').hidden = false;
    btn.classList.replace('shake', 'open');
    updatePinButton();
    luck.busy = false;
  }, 600);
}

function pinCurrent() {
  if (!luck.current || luck.pins.includes(luck.current)) return;
  luck.pins.unshift(luck.current);
  savePins(); renderPins();
}

function initFortune() {
  const saved = readStorage(CONFIG.storage.pins, []);
  luck.pins = Array.isArray(saved) ? saved.filter(t => typeof t === 'string') : [];
  renderPins();
  $('#cookie').onclick = $('#again').onclick = openCookie;
  $('#pin').onclick = pinCurrent;
  $('#pins').onclick = e => {
    const del = e.target.closest('[data-del]');
    if (!del) return;
    luck.pins.splice(+del.dataset.del, 1);
    savePins(); renderPins();
  };
}
//#endregion


//#region 14. POMODORO
// Timer di concentrazione (durate in CONFIG.pomodoro). Si basa sull'orario di fine,
// quindi resta preciso anche se la scheda del browser va in background.
const pomo = { mode: 'focus', left: 0, end: 0, timer: null, done: 0, ctx: null };

const clock = sec => `${String(Math.floor(sec / 60)).padStart(2, '0')}:${String(sec % 60).padStart(2, '0')}`;
const todayKey = () => new Date().toLocaleDateString('sv-SE');          // AAAA-MM-GG

function renderPomo() {
  $('#ptime').textContent = clock(pomo.left);
  $('#pmode').textContent = pomo.mode === 'focus' ? 'Concentrazione (>_<)' : 'Pausa :)';
  $('#pgo').textContent = pomo.timer ? 'Pausa' : 'Avvia';
  $('#pdone').textContent = `Pomodori completati oggi: ${pomo.done}`;
  $$('[data-pm]').forEach(b => b.classList.toggle('sel', b.dataset.pm === pomo.mode));
  document.title = pomo.timer ? `${clock(pomo.left)} · Kuromi World` : 'Kuromi World';
}

function stopPomo() { clearInterval(pomo.timer); pomo.timer = null; }

function setPomoMode(mode) {
  stopPomo();
  pomo.mode = mode;
  pomo.left = CONFIG.pomodoro[mode] * 60;
  renderPomo();
}

function startPomo() {
  pomo.ctx = pomo.ctx || new (window.AudioContext || window.webkitAudioContext)();   // creato con un tap: il suono è permesso
  pomo.end = Date.now() + pomo.left * 1000;
  pomo.timer = setInterval(tickPomo, 250);
  renderPomo();
}

function tickPomo() {
  pomo.left = Math.max(0, Math.round((pomo.end - Date.now()) / 1000));
  if (pomo.left === 0) finishPomo();
  renderPomo();
}

function beep() {
  try {
    const osc = pomo.ctx.createOscillator();
    osc.connect(pomo.ctx.destination);
    osc.frequency.value = 880;
    osc.start(); osc.stop(pomo.ctx.currentTime + 0.5);
  } catch {}
}

function finishPomo() {
  const wasFocus = pomo.mode === 'focus';
  beep();
  if (wasFocus) { pomo.done++; writeStorage(CONFIG.storage.pomo, { d: todayKey(), n: pomo.done }); }
  setPomoMode(wasFocus ? 'break' : 'focus');
  ask(wasFocus ? 'Pomodoro finito! Ora una pausa :)' : 'Pausa finita! Si torna al lavoro (>_<)', false);
}

function initPomodoro() {
  const saved = readStorage(CONFIG.storage.pomo, {});
  pomo.done = saved.d === todayKey() ? saved.n || 0 : 0;      // il contatore riparte ogni giorno
  setPomoMode('focus');
  $('#pgo').onclick = () => pomo.timer ? (stopPomo(), renderPomo()) : startPomo();
  $('#preset').onclick = () => setPomoMode(pomo.mode);
  $$('[data-pm]').forEach(b => b.onclick = () => setPomoMode(b.dataset.pm));
}
//#endregion


//#region 15. POST-IT
// Ogni nota: { t: testo, c: numero colore 0-4 (classi .n0-.n4 in CSS) }
const notes = { list: [] };
const NOTE_COLORS = 5;

const saveNotes = () => writeStorage(CONFIG.storage.notes, notes.list);

function renderNotes() {
  $('#board').innerHTML = notes.list.map((n, i) => `
    <div class="note n${n.c}" data-i="${i}">
      <textarea placeholder="Scrivi qui…" aria-label="Nota">${escapeHTML(n.t)}</textarea>
      <div class="bar"><button data-color="${i}" aria-label="Cambia colore">colore</button><button data-del="${i}" aria-label="Elimina">x</button></div>
    </div>`).join('') || '<p class="empty">Nessun post-it: creane uno :P</p>';
}

function initNotes() {
  const saved = readStorage(CONFIG.storage.notes, []);
  notes.list = Array.isArray(saved) ? saved.filter(n => n && typeof n.t === 'string') : [];
  renderNotes();

  $('#nadd').onclick = () => {
    notes.list.unshift({ t: '', c: rnd(NOTE_COLORS) });
    saveNotes(); renderNotes();
    $('#board textarea').focus();
  };
  $('#board').oninput = e => {                      // salva mentre scrivi, senza ridisegnare
    const row = e.target.closest('.note');
    if (row) { notes.list[+row.dataset.i].t = e.target.value; saveNotes(); }
  };
  $('#board').onclick = e => {
    const del = e.target.closest('[data-del]');
    const color = e.target.closest('[data-color]');
    if (del) notes.list.splice(+del.dataset.del, 1);
    else if (color) { const n = notes.list[+color.dataset.color]; n.c = (n.c + 1) % NOTE_COLORS; }
    else return;
    saveNotes(); renderNotes();
  };
}
//#endregion


//#region 16. MEMORY
const MEMORY_FACES = ['<3', ':)', ':3', '^_^', 'xD', ';)', 'o_o', 'uwu'];
const memory = { cards: [], flipped: [], moves: 0, locked: false };

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

/** Salva il record di un gioco (lowerIsBetter: meno è meglio, come le mosse) */
function saveBest(game, value, lowerIsBetter = false) {
  const records = readStorage(CONFIG.storage.games, {});
  const old = records[game];
  if (old === undefined || (lowerIsBetter ? value < old : value > old)) {
    records[game] = value;
    writeStorage(CONFIG.storage.games, records);
  }
}
const bestOf = game => readStorage(CONFIG.storage.games, {})[game];

function renderMemory() {
  $('#mgrid').innerHTML = memory.cards.map((c, i) => {
    const shown = c.up || c.done;
    return `<button class="mc${shown ? ' up' : ''}${c.done ? ' done' : ''}" data-i="${i}" aria-label="Carta">${shown ? escapeHTML(c.e) : '?'}</button>`;
  }).join('');
  const best = bestOf('memory');
  $('#mmoves').textContent = `Mosse: ${memory.moves}` + (best ? ` · Record: ${best}` : '');
}

function newMemory() {
  memory.cards = shuffle([...MEMORY_FACES, ...MEMORY_FACES]).map(e => ({ e, up: false, done: false }));
  Object.assign(memory, { flipped: [], moves: 0, locked: false });
  renderMemory();
}

function flipCard(i) {
  const card = memory.cards[i];
  if (memory.locked || card.up || card.done) return;
  card.up = true;
  memory.flipped.push(i);

  if (memory.flipped.length === 2) {
    memory.moves++;
    const [a, b] = memory.flipped.map(k => memory.cards[k]);
    if (a.e === b.e) {                                         // coppia trovata
      a.done = b.done = true; a.up = b.up = false; memory.flipped = [];
      if (memory.cards.every(c => c.done)) {
        saveBest('memory', memory.moves, true);
        ask(`Hai trovato tutte le coppie in ${memory.moves} mosse! :D`, false);
      }
    } else {                                                   // sbagliata: si rigirano dopo un attimo
      memory.locked = true;
      setTimeout(() => { a.up = b.up = false; memory.flipped = []; memory.locked = false; renderMemory(); }, 750);
    }
  }
  renderMemory();
}

function initMemory() {
  $('#mnew').onclick = newMemory;
  $('#mgrid').onclick = e => { const c = e.target.closest('.mc'); if (c) flipCard(+c.dataset.i); };
  newMemory();
}
//#endregion


//#region 17. ACCHIAPPA
// 9 buche: ogni 0,75s spunta 💜 (+1) o 💀 (-2) in una buca a caso. Durata in CONFIG.catchSeconds.
const catcher = { score: 0, left: 0, active: -1, kind: '', timer: null, spawner: null };

function renderHoles() {
  $('#cgrid').innerHTML = Array.from({ length: 9 }, (_, i) =>
    `<button class="hole" data-i="${i}" aria-label="Buca">${i === catcher.active ? escapeHTML(catcher.kind) : ''}</button>`).join('');
}

function renderCatchInfo() {
  const best = bestOf('catch');
  $('#cinfo').textContent = `Punti: ${catcher.score} · Tempo: ${catcher.left}s` + (best !== undefined ? ` · Record: ${best}` : '');
}

function spawnCatch() {
  catcher.active = rnd(9);
  catcher.kind = Math.random() < 0.25 ? 'x_x' : '<3';
  renderHoles();
}

function stopCatch() {
  clearInterval(catcher.timer); clearInterval(catcher.spawner);
  catcher.timer = catcher.spawner = null;
}

function startCatch() {
  stopCatch();
  catcher.score = 0;
  catcher.left = CONFIG.catchSeconds;
  spawnCatch(); renderCatchInfo();
  catcher.spawner = setInterval(spawnCatch, 750);
  catcher.timer = setInterval(() => { catcher.left--; catcher.left <= 0 ? endCatch() : renderCatchInfo(); }, 1000);
}

function endCatch() {
  stopCatch();
  catcher.active = -1; catcher.left = 0;
  saveBest('catch', catcher.score);
  renderHoles(); renderCatchInfo();
  ask(`Tempo scaduto! Hai fatto ${catcher.score} punti (>:3)`, false);
}

function hitHole(i) {
  if (!catcher.timer || i !== catcher.active) return;
  catcher.score += catcher.kind === '<3' ? 1 : -2;
  catcher.active = -1;
  renderHoles(); renderCatchInfo();
}

function initCatch() {
  catcher.left = CONFIG.catchSeconds;
  renderHoles(); renderCatchInfo();
  $('#cstart').onclick = startCatch;
  $('#cgrid').onpointerdown = e => { const h = e.target.closest('.hole'); if (h) hitHole(+h.dataset.i); };
}
//#endregion


//#region 18. AVVIO
initTheme();
initNavigation();
initMenu();
initHome();
initDocs();
initMusic();
initPhotos();
initDays();
initDreams();
initFortune();
initPomodoro();
initNotes();
initMemory();
initCatch();
showView('home');   // sezione di partenza (metti 'menu' per partire dal Menù)
//#endregion