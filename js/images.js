/* ========== الصور من ويكيبيديا ========== */
const ITEMS = {}, IMG = {}, URLS = {};
const WIKI = 'https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&piprop=thumbnail&pithumbsize=360&redirects=1&format=json&origin=*';
async function wq(extra) {
  const j = await (await fetch(WIKI + extra)).json();
  const pg = j.query && j.query.pages;
  if (pg) for (const k in pg) if (pg[k].thumbnail) return pg[k].thumbnail.source;
  return null;
}
function getImg(it) {
  const k = it.en;
  if (IMG[k]) return IMG[k];
  IMG[k] = (async () => {
    try { const c = localStorage.getItem('img:' + k); if (c !== null) return c || null; } catch (e) {}
    try {
      let u = await wq('&titles=' + encodeURIComponent(k));
      if (!u) u = await wq('&generator=search&gsrlimit=1&gsrsearch=' + encodeURIComponent(k.replace(/\s*\(.*\)/, '') + (it.t === 'c' ? ' football manager' : ' footballer')));
      try { localStorage.setItem('img:' + k, u || ''); } catch (e) {}
      return u;
    } catch (e) { delete IMG[k]; return null; }
  })();
  return IMG[k];
}
const av = (it, cls) => {
  ITEMS[it.en] = it;
  if (URLS[it.en]) return `<span class="av ${cls || ''}" data-k="${esc(it.en)}" data-d="1"><img src="${esc(URLS[it.en])}" alt=""></span>`;
  return `<span class="av ${cls || ''}" data-k="${esc(it.en)}"><span>${esc(it.name[0])}</span></span>`;
};
function hydrate() {
  document.querySelectorAll('.av[data-k]:not([data-d])').forEach(el => {
    el.dataset.d = 1;
    const it = ITEMS[el.dataset.k];
    if (!it) return;
    getImg(it).then(u => {
      if (!u) return;
      URLS[it.en] = u;
      if (!el.isConnected) return;
      const im = new Image(); im.alt = '';
      im.onload = () => { el.textContent = ''; el.appendChild(im); };
      im.src = u;
    });
  });
}
function render(html, after) { app.innerHTML = html; fx.icons(); hydrate(); if (after) after(); }
