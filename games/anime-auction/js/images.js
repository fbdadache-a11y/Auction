/* ========== الصور من AniList (مع Jikan احتياطاً) ==========
   الطلبات تُجمَّع في دفعات، والنتائج تُخزَّن في المتصفح، فلا يُطلب الاسم مرتين.
   حد AniList الحالي نحو 30 طلباً في الدقيقة، لذلك الدفعة الواحدة تضم عدة شخصيات. */
const ITEMS = {}, IMG = {}, URLS = {};
const IKEY = it => it.en + '|' + it.sr;
const ANI = 'https://graphql.anilist.co';
const norm = s => (s || '').toLowerCase().replace(/ou/g, 'o').replace(/uu/g, 'u').replace(/[^a-z0-9 ]/g, ' ').replace(/\s+/g, ' ').trim();
const toks = s => norm(s).split(' ').filter(Boolean).sort().join(' ');
let QUEUE = [], QTM = 0, BLOCK = 0;

/* يختار أفضل نتيجة: الاسم يتطابق ويظهر في أنمي الشخصية، وإلا تطابق تام في الاسم */
function choose(it, list) {
  const keys = (SERIES[it.sr] || {keys:[]}).keys, want = toks(it.en);
  const inSeries = c => ((c.media && c.media.nodes) || []).some(m => Object.values(m.title || {}).some(t => t && keys.some(k => t.toLowerCase().includes(k))));
  const nameOk = c => toks(c.name.full) === want || [c.name.full].concat(c.name.alternative || []).some(n => toks(n) === want);
  const loose = c => { const w = want.split(' '); const have = toks(c.name.full + ' ' + (c.name.alternative || []).join(' ')); return w.filter(x => have.includes(x)).length >= Math.min(2, w.length); };
  return list.find(c => nameOk(c) && inSeries(c)) || list.find(c => loose(c) && inSeries(c)) || list.find(nameOk) || null;
}
let BATCH = 8;                                   // يتناقص تلقائياً إن رفض AniList تعقيد الاستعلام
async function flush() {
  QTM = 0;
  if (!QUEUE.length) return;
  const wait = BLOCK - Date.now();
  if (wait > 0) { QTM = setTimeout(flush, wait); return; }
  const batch = QUEUE.splice(0, BATCH);
  const vars = {}, q = batch.map((b, i) => { vars['s' + i] = b.it.en; return `c${i}:Page(perPage:5){characters(search:$s${i},sort:SEARCH_MATCH){name{full alternative}image{large}media(perPage:5,sort:POPULARITY_DESC){nodes{title{romaji english native}}}}}`; });
  const query = `query(${batch.map((b, i) => `$s${i}:String`).join(',')}){${q.join('')}}`;
  const retry = ms => { BLOCK = Date.now() + ms; QUEUE = batch.concat(QUEUE); QTM = setTimeout(flush, ms); };
  try {
    const r = await fetch(ANI, {method:'POST', headers:{'Content-Type':'application/json', Accept:'application/json'}, body:JSON.stringify({query, variables:vars})});
    if (r.status === 429) return retry((+r.headers.get('Retry-After') || 60) * 1000);
    const j = await r.json();
    if (!j.data) {                                            // خطأ في الاستعلام (غالباً التعقيد): صغّر الدفعة وأعد المحاولة
      if (BATCH > 1) { BATCH = Math.max(1, BATCH >> 1); return retry(500); }
      throw 0;
    }
    batch.forEach((b, i) => {
      const e = j.data['c' + i];
      if (!e) return b.res(undefined);                        // نتيجة ناقصة: لا تُخزَّن
      const c = choose(b.it, e.characters || []);
      b.res(c && c.image && c.image.large || null);
    });
  } catch (e) { BLOCK = Date.now() + 20000; batch.forEach(b => b.res(undefined)); }       // فشل الشبكة: لا يُخزَّن ولا نعيد الطلب قبل 20 ثانية
  if (QUEUE.length) QTM = setTimeout(flush, 2200);
}
/* احتياط: Jikan (بحث بالاسم، ويُقبل فقط تطابق الاسم تماماً) */
async function jikan(it) {
  try {
    const j = await (await fetch('https://api.jikan.moe/v4/characters?limit=8&order_by=favorites&sort=desc&q=' + encodeURIComponent(it.en))).json();
    const want = toks(it.en), c = (j.data || []).find(x => toks((x.name || '').replace(',', ' ')) === want);
    return c && c.images && c.images.jpg && c.images.jpg.image_url || null;
  } catch (e) { return null; }
}
function getImg(it) {
  const k = IKEY(it);
  if (IMG[k]) return IMG[k];
  IMG[k] = new Promise(res => {
    try { const c = localStorage.getItem('img2:' + k); if (c !== null) return res(c || null); } catch (e) {}
    QUEUE.push({it, res:async u => {
      if (u === undefined) { delete IMG[k]; return res(null); }                // خطأ مؤقت
      if (u === null) u = await jikan(it);
      try { localStorage.setItem('img2:' + k, u || ''); } catch (e) {}
      res(u);
    }});
    if (!QTM) QTM = setTimeout(flush, 60);
  });
  return IMG[k];
}
/* صورة الشخصية: صورة حقيقية إن وصلت، وإلا حرف الاسم على نقش مانجا */
const av = (it, cls) => {
  ITEMS[IKEY(it)] = it;
  const k = esc(IKEY(it));
  if (URLS[IKEY(it)]) return `<span class="av ${cls || ''}" data-k="${k}" data-d="1"><img src="${esc(URLS[IKEY(it)])}" alt="" referrerpolicy="no-referrer"></span>`;
  return `<span class="av ${cls || ''}" data-k="${k}"><span>${esc(it.name[0])}</span></span>`;
};
function hydrate() {
  document.querySelectorAll('.av[data-k]:not([data-d])').forEach(el => {
    el.dataset.d = 1;
    const it = ITEMS[el.dataset.k];
    if (!it) return;
    getImg(it).then(u => {
      if (!u) { el.classList.add('noimg'); return; }
      URLS[IKEY(it)] = u;
      if (!el.isConnected) return;
      const im = new Image(); im.alt = ''; im.referrerPolicy = 'no-referrer';
      im.onload = () => { el.textContent = ''; el.appendChild(im); };
      im.onerror = () => el.classList.add('noimg');
      im.src = u;
    });
  });
}
function render(html, after) { document.body.classList.remove('home-on'); app.innerHTML = html; fx.icons(); hydrate(); if (after) after(); }
