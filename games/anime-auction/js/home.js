/* ========== الصفحة الرئيسية: غلاف مجلد مانجا ========== */
let showPos = 'ALL', STARS = [];
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const starCards = pos => STARS.filter(p => pos === 'ALL' || p.pos === pos).slice(0, 14).map(p => fcard(p, {w:150}));
function filterStars(pos) {
  showPos = pos;
  document.querySelectorAll('[data-fp]').forEach(b => b.setAttribute('aria-pressed', b.dataset.fp === pos));
  const tr = document.querySelector('#sl-stars .track'); if (!tr) return;
  tr.innerHTML = starCards(pos).map(h => `<div class="sl-i">${h}</div>`).join('');
  tr.scrollLeft = 0; hydrate(); initSliders();
}
function home() {
  stopTimers(); lot = null; showPos = 'ALL'; clearSave();
  STARS = shuffle(ELITE_P);
  const cov = ['B', 'A', 'V'].map(r => STARS.find(p => p.pos === r)).filter(Boolean);
  const vp = (k, ttl, big, lines, cta, tag) => `<article class="vp ${k}">${k === 'elite' ? '<span class="speed red"></span>' : ''}${tag ? `<span class="vtag">${tag}</span>` : ''}
    <h3>${ttl}</h3><div class="vbig num">${big}</div>
    <ul class="spec">${lines.map(l => `<li>${l}</li>`).join('')}</ul>
    <button class="go" onclick="pickEdition('${k}')">${cta}</button></article>`;
  const steps = [['اختر الطور', 'كلاسيكي بأنميات تختارها، أو طور النخبة بالأقوياء فقط.'],
    ['زايد على مقاتل سري', 'يظهر مقاتل بقوة مخفية، ومن يرفض الرفع يخسر المزاد.'],
    ['الخاسر يشتري التالي', 'من خسر المزاد يشتري المقاتل التالي في النوع نفسه.'],
    ['المعلّم في النهاية', 'تشتري بما بقي معلّماً بأثر سري يقوّي كل مقاتل عندك.'],
    ['اكشف وقاتل', 'تُكشف القوى، ثم تختار مقاتلك سراً في كل جولة. القتالي يغلب صاحب القدرات، وهو يغلب السريع، والسريع يغلب القتالي.']]
    .map(([t, d], i) => `<div class="stc"><div class="n num">${i + 1}</div><h4>${t}</h4><p>${d}</p></div>`);
  const POSF = [['ALL', 'الكل'], ['B', 'القتاليون'], ['A', 'أصحاب القدرات'], ['V', 'السريعون']];
  render(`<div class="home">
    <header class="home-top"><div class="brand"><span class="logo-mk">مزاد</span><span>الأنمي</span></div>
      <div class="tools"><a class="hub-link" href="../../index.html">ألعاب الكومباطا</a><button class="icon-btn" data-snd onclick="toggleSound()" aria-label="تشغيل الصوت أو إيقافه">${sndBtn()}</button></div></header>
    <section class="cover"><span class="speed"></span>
      <div class="cover-t"><span class="cover-vol">لاعبان على جهاز واحد</span>
        <h1>مزاد<em>الأنمي</em></h1><p>زايد على أبطال الشونين والإيسيكاي بقوى سرية، ثم أدخل المعركة واختر مقاتلك بلا أن يرى خصمك.</p></div>
      <div class="cover-c" aria-hidden="true">${cov.map(p => fcard(p, {w:170})).join('')}<span class="sfx s1">بووم!</span><span class="sfx red s2">طاخ!</span></div></section>
    <section class="vs" id="modes" aria-label="اختيار الطور">
      ${vp('elite', 'طور النخبة', `<span class="ltr">${ELITE.money}<small>M</small></span>`,
        ['5 مقاتلين في كل فريق', `${ELITE_P.length} من أقوى الأبطال فقط`, `${ELITE_C.length} معلّماً من أعظم المعلّمين`], 'ابدأ طور النخبة', 'جديد')}
      ${vp('classic', 'الطور الكلاسيكي', `<span class="ltr">100–280<small>M</small></span>`,
        ['فريق من 3 أو 5 أو 7 مقاتلين', 'اختر الأنميات التي تظهر شخصياتها', `${ALL_P.length} شخصية من ${Object.keys(SERIES).length} أنمي`], 'ابدأ الكلاسيكي')}
    </section>
    <section class="hsec"><h2>أبطال قد يظهرون في المزاد</h2><p class="sub">عيّنة عشوائية من الأقوياء. قوتهم سرية حتى المعركة.</p>
      <div class="fl" role="group" aria-label="تصفية بالنوع">${POSF.map(([k, t]) => `<button class="alt sm" data-fp="${k}" aria-pressed="${k === 'ALL'}" onclick="filterStars('${k}')">${t}</button>`).join('')}</div>
      ${slider('sl-stars', starCards('ALL'), 'cards', true)}</section>
    <section class="hsec"><h2>كيف تلعب</h2>${slider('sl-how', steps, 'how-sl')}</section>
    <p class="home-foot">${ALL_P.length} مقاتلاً و${ALL_C.length} معلّماً. الصور تُجلب من AniList وتحتاج إنترنت، وتظهر بالحرف الأول إن تعذّر جلبها.</p></div>`, () => {
    document.body.classList.add('home-on');
    initSliders();
  });
}
