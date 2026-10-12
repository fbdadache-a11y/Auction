/* ========== مينيو ألعاب الكومباطا ========== */
const app = $('app');

function gameCard(g, i) {
  const soon = g.status !== 'ready';
  return `<article class="gc${soon ? ' soon' : ''}" data-sk="card" style="--tilt:${i % 2 ? 1.1 : -1.2}deg"${soon ? ' aria-disabled="true"' : ''}>
    <span class="tape" aria-hidden="true"></span>
    <svg class="art" viewBox="0 0 240 150" data-art="${g.art}" aria-hidden="true"></svg>
    <h3>${esc(g.title)}</h3><p>${esc(g.blurb)}</p>
    <ul class="tags">${g.tags.map(t => `<li data-sk="chip">${esc(t)}</li>`).join('')}</ul>
    ${soon ? '<span class="stamp" data-sk="stamp">قريباً</span>' : `<a class="btn" data-sk="btn" href="${g.href}">العب الآن</a>`}</article>`;
}

function drawHub() {
  app.innerHTML = `<div class="page">
    <header class="top">
      <svg class="logo" viewBox="0 0 64 64" data-art="logo" role="img" aria-label="شعار ألعاب الكومباطا"></svg>
      <div class="ttl"><h1>ألعاب الكومباطا<svg class="mk" viewBox="0 0 300 14" preserveAspectRatio="none" data-art="marker" aria-hidden="true"></svg></h1>
        <p>ألعاب لاعبين اثنين على جهاز واحد. بلا تسجيل وبلا تحميل.</p></div>
      <svg class="deco star" viewBox="0 0 40 40" data-art="star" aria-hidden="true"></svg>
    </header>
    <section class="shelf-sec" aria-labelledby="pick">
      <h2 id="pick">اختر لعبة</h2>
      <svg class="deco arrow" viewBox="0 0 90 60" data-art="arrow" aria-hidden="true"></svg>
      ${slider('shelf', GAMES.map(gameCard), 'fit shelf')}
    </section>
    <footer><p>ألعاب جديدة تُضاف هنا قريباً.</p></footer></div>`;
  document.querySelectorAll('svg[data-art]').forEach(drawArt);
  initSliders();
  drawFrames(true);
}

/* إطار يدوي لكل عنصر يحمل data-sk، يُعاد رسمه عند تغيّر حجمه */
function frame(el, first) {
  let svg = el.querySelector(':scope > svg.frame');
  const fresh = !svg;
  if (fresh) { svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('class', 'frame'); svg.setAttribute('aria-hidden', 'true'); el.prepend(svg); }
  const w = el.offsetWidth, h = el.offsetHeight; if (!w || !h) return;
  const k = el.dataset.sk, soon = el.classList.contains('soon');
  svg.setAttribute('viewBox', `0 0 ${w} ${h}`); svg.innerHTML = '';
  SK.seed(3 + w + h);
  const wd = k === 'card' ? 2.6 : k === 'chip' ? 1.6 : 2.4;
  SK.rect(svg, 3, 3, w - 6, h - 6, {width:wd, rough:k === 'card' ? 1.3 : 1});
  SK.finish(svg, soon);
  if (first && !soon && !reduced) svg.classList.add('draw');
}
let FR;
function drawFrames(first) {
  const els = document.querySelectorAll('[data-sk]');
  els.forEach(e => frame(e, first));
  if (!FR && window.ResizeObserver) { FR = new ResizeObserver(es => es.forEach(x => frame(x.target, false))); els.forEach(e => FR.observe(e)); }
}
// عند وصول rough.js متأخرة: أعد الرسم بها
window.__rough = () => { document.querySelectorAll('svg[data-art]').forEach(drawArt); drawFrames(false); };

drawHub();
