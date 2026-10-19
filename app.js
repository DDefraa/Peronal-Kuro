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
    14. AVVIO            -> accende tutte le sezioni
   ===================================================================== */


//#region 1. CONFIGURAZIONE
const CONFIG = {
  // Frasi che scorrono nel cielo della home
  phrases: [
    "Sei la mia cosa preferita 💜", "Ti amo più di tutte le stelle ✨",
    "Il mio posto felice sei tu 🖤", "Sei dolce e un po' cattivella 😈",
    "Ogni giorno con te è speciale 🌸", "Sei il mio sorriso preferito 🎀",
    "Fai fiorire tutto ciò che tocchi 🌷", "Kuromi approva questo amore 💀",
  ],
  // Sezioni del sito: generano sia il menu in alto sia le schede del Menù.
  // Per aggiungerne una: nuova riga qui + <section id="..."> in index.html
  sections: [
    { id: 'menu',    icon: '📋', name: 'Menù',    desc: '' },
    { id: 'home',    icon: '🌸', name: 'Giardino', desc: 'Frasi dolci e fiori che crescono' },
    { id: 'docs',    icon: '📝', name: 'Diario',   desc: 'Scrivi con temi carini, scarica in Word o PDF' },
    { id: 'music',   icon: '💿', name: 'Musica',   desc: 'Carica i brani e guarda girare il disco' },
    { id: 'photos',  icon: '📷', name: 'Foto',     desc: 'Cornici, filtri, dediche e sticker' },
    { id: 'days',    icon: '💌', name: 'Giorni',   desc: 'Quanti giorni insieme e il prossimo traguardo' },
    { id: 'dreams',  icon: '⭐', name: 'Sogni',    desc: 'Lista di cose da fare insieme, da spuntare' },
    { id: 'fortune', icon: '🥠', name: 'Biscotto', desc: 'Un pensierino casuale per oggi' },
  ],
  // Temi del sito (gli stili stanno in style.css §12, con lo stesso id)
  themes: [
    { id: 'kuromi',  name: '💀 Kuromi' },
    { id: 'xp',      name: '🪟 Windows XP' },
    { id: 'cyber',   name: '🌆 Cyberpunk' },
    { id: 'skyrim',  name: '🐉 Skyrim' },
    { id: 'webcore', name: '💾 Webcore' },
  ],
  // Messaggi del biscotto
  fortunes: [
    "Oggi qualcuno pensa a te con un grande sorriso 💜", "Una piccola sorpresa dolce è in arrivo 🎀",
    "Sei più forte e più magica di quanto credi ✨", "Il tuo prossimo abbraccio sarà il migliore di sempre 🖤",
    "Fai una cosa carina per te: te la meriti 🌸", "Oggi ti aspetta un momento perfetto, non perderlo 💀",
    "Sei il motivo per cui qualcuno è felice 🌷", "Vai pure, Kuromi fa il tifo per te 😈",
  ],
  // Colori di frasi e fiori
  colors: ['#ff8ac9', '#b57bff', '#ffd166', '#ffffff', '#7ad7ff', '#ff6b6b', '#c3f584'],
  home: {
    startFlowers: 16,      // fiori presenti all'apertura
    phraseEveryMs: 1800,   // ogni quanto compare una frase
    phraseMinSec: 12,      // durata minima di attraversamento
    phraseExtraSec: 10,    // + un valore casuale fino a questo
  },
  photos: { maxSidePx: 700, jpegQuality: 0.75 },
  // Chiavi usate nel localStorage del browser
  storage: { doc: 'kdoc', photos: 'kph', theme: 'ktheme', days: 'kdays', dreams: 'kdreams', visits: 'kvisits', pins: 'kpins' },
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
    btn.textContent = `${s.icon} ${s.name}`;
    btn.onclick = () => showView(s.id);
    $('nav').append(btn);
  });
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
  el.style.fontSize = (16 + rnd(16)) + 'px';
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
  flower.style.height = (25 + rnd(65)) + '%';   // altezza casuale
  flower.style.aspectRatio = '100/220';
  flower.style.animationDelay = delaySec + 's';
  flower.style.transform = 'translateX(-50%)';
  flower.innerHTML = buildFlowerSVG();
  $('#garden').append(flower);
}

/** Pianta i fiori iniziali, distribuiti lungo il prato */
function plantStartingFlowers() {
  for (let i = 0; i < CONFIG.home.startFlowers; i++) {
    plantFlower(3 + i * 6 + rnd(4), i * 0.25);
  }
}

function initHome() {
  // frasi: alcune subito, poi una ogni tot
  for (let i = 0; i < 5; i++) setTimeout(spawnPhrase, i * 350);
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
    `<li class="${i === music.current ? 'cur' : ''}" data-i="${i}">🎵 ${escapeHTML(t.n)}</li>`
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
  $('#pp').textContent = isPlaying ? '⏸' : '▶';
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
// Ogni foto: { s: immagine, f: cornice, g: filtro, c: dedica, r: inclinazione, k: sticker }

const gallery = { photos: [], selected: -1 };
const currentPhoto = () => gallery.photos[gallery.selected];

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
  for (const file of files) {
    gallery.photos.push({ s: await resizeImage(file), f: 0, g: 0, c: '', r: 0, k: '' });
  }
  savePhotos();
  renderGallery();
}

// --- Visualizzazione ------------------------------------------------

/** HTML di una foto con cornice, filtro, sticker e dedica */
const photoCardHTML = (p, i) => `
  <div class="card f${p.f}" style="--r:${p.r}deg" data-i="${i}">
    <img class="g${p.g}" src="${p.s}" alt="">
    <div class="stk">${p.k}</div>
    <p>${escapeHTML(p.c)}</p>
  </div>`;

function renderGallery() {
  $('#grid').innerHTML = gallery.photos.map(photoCardHTML).join('')
    || '<p class="empty">Nessuna foto ancora: carica la prima 📷</p>';
}

// --- Editor ---------------------------------------------------------

function openEditor(index) {
  gallery.selected = index;
  const p = currentPhoto();
  $('#fr').value  = p.f;
  $('#fl').value  = p.g;
  $('#cap').value = p.c;
  $('#rot').value = p.r;
  $('#pv').innerHTML = photoCardHTML(p, index);
  $('#ed').hidden = false;
}

/** Riporta nella foto i valori dei controlli, poi salva e ridisegna */
function applyEditorChanges() {
  const p = currentPhoto();
  p.f = +$('#fr').value;
  p.g = +$('#fl').value;
  p.c = $('#cap').value;
  p.r = +$('#rot').value;
  savePhotos();
  renderGallery();
  $('#pv').innerHTML = photoCardHTML(p, gallery.selected);
}

/** Aggiunge uno sticker (emoji) oppure, se `emoji` è '', li toglie tutti */
function setSticker(emoji) {
  const p = currentPhoto();
  p.k = emoji ? p.k + emoji : '';
  applyEditorChanges();
}

async function deletePhoto() {
  if (!await ask('Eliminare questa foto?')) return;
  gallery.photos.splice(gallery.selected, 1);
  savePhotos();
  renderGallery();
  $('#ed').hidden = true;
}

function initPhotos() {
  gallery.photos = readStorage(CONFIG.storage.photos, []);
  renderGallery();

  $('#pfile').onchange = e => { addPhotos(e.target.files); e.target.value = ''; };
  $('#grid').onclick = e => {
    const card = e.target.closest('.card');
    if (card) openEditor(+card.dataset.i);
  };

  // ogni controllo dell'editor aggiorna la foto in tempo reale
  ['#fr', '#fl', '#cap', '#rot'].forEach(sel => $(sel).oninput = applyEditorChanges);

  $$('#emo button').forEach(btn =>
    btn.onclick = () => setSticker(btn.id === 'nost' ? '' : btn.textContent));

  $('#del').onclick   = deletePhoto;
  $('#close').onclick = () => $('#ed').hidden = true;
}
//#endregion


//#region 9. TEMA DEL SITO
// Il tema è un attributo su <html> (data-theme="xp"); il look è tutto in style.css §12.
function setSiteTheme(id) {
  document.documentElement.dataset.theme = id;
  writeStorage(CONFIG.storage.theme, id);
  $$('#themes button').forEach(btn => btn.classList.toggle('sel', btn.dataset.t === id));
}

function initTheme() {
  $('#themes').innerHTML = CONFIG.themes.map(t => `<button data-t="${t.id}">${t.name}</button>`).join('');
  $('#themes').onclick = e => e.target.dataset.t && setSiteTheme(e.target.dataset.t);
  setSiteTheme(readStorage(CONFIG.storage.theme, CONFIG.themes[0].id));
}
//#endregion


//#region 10. MENU
/** Schede cliccabili di tutte le sezioni (tranne il Menù stesso) */
function renderTiles() {
  $('#tiles').innerHTML = CONFIG.sections.filter(s => s.id !== 'menu').map(s =>
    `<button class="tile" data-go="${s.id}"><b>${s.icon} ${s.name}</b><small>${s.desc}</small></button>`
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
  if (!value) { big.textContent = 'Scegli una data 💜'; return; }

  const start = new Date(value + 'T00:00:00');
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const total = Math.round((today - start) / 864e5);

  if (total < 0) { big.textContent = `Mancano ${plural(-total, 'giorno', 'giorni')} ⏳`; return; }

  const { y, m, d } = diffYMD(start, today);
  const milestone = (Math.floor(total / 100) + 1) * 100;   // prossimo multiplo di 100
  big.textContent = `${plural(total, 'giorno', 'giorni')} 💜`;
  det.textContent = `${plural(y, 'anno', 'anni')}, ${plural(m, 'mese', 'mesi')} e ${plural(d, 'giorno', 'giorni')}`;
  next.textContent = `Prossimo traguardo: ${milestone} giorni, tra ${plural(milestone - total, 'giorno', 'giorni')} 🎉`;
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
      <span>${x.d ? '✅' : '⬜'}</span><span>${escapeHTML(x.t)}</span><button data-del="${i}" aria-label="Elimina">✕</button>
    </li>`).join('') || '<li class="empty">Nessun sogno ancora: scrivi il primo ⭐</li>';
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
  $('#pin').textContent = pinned ? '✅ Fissata' : '📌 Fissa';
  $('#pin').disabled = pinned;
}

function renderPins() {
  $('#pins').innerHTML = luck.pins.map((t, i) =>
    `<li><span>📌 ${escapeHTML(t)}</span><button data-del="${i}" aria-label="Rimuovi">✕</button></li>`
  ).join('') || '<li class="empty">Nessuna frase fissata: apri un biscotto e premi 📌</li>';
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


//#region 14. AVVIO
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
showView('home');   // sezione di partenza (metti 'menu' per partire dal Menù)
//#endregion