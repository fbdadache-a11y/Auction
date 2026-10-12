/* ========== شاشة البداية داخل مزاد الأساطير ========== */
let showPos = 'ALL', STARS = [];
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
  STARS = [...LEG_P].sort(() => Math.random() - .5);
  const vp = (k, ttl, big, lines, cta, tag) => `<article class="vp ${k}">${tag ? `<span class="vtag">${tag}</span>` : ''}
    <h3>${ttl}</h3><div class="vbig num">${big}</div>
    <ul class="spec">${lines.map(l => `<li>${l}</li>`).join('')}</ul>
    <button class="go" onclick="pickEdition('${k}')">${cta}</button></article>`;
  const steps = [['اختر الطور', 'كلاسيكي بدوريات تختارها، أو أساطير فقط بميزانية مليار.'],
    ['زايد على لاعب سري', 'يظهر لاعب بتقييم مخفي، ومن يرفض الرفع يخسر المزاد.'],
    ['الخاسر يشتري التالي', 'من خسر المزاد يشتري اللاعب التالي في المركز نفسه.'],
    ['المدرب في النهاية', 'تشتري بما بقي من مال مدرباً بخبرة سرية تمنح فريقك دفعة.'],
    ['اكشف وشاهد', 'تُكشف التقييمات وتُلعب مباراة مباشرة بأهداف ولحظات.']]
    .map(([t, d], i) => `<div class="stc"><div class="n num">${i + 1}</div><h4>${t}</h4><p>${d}</p></div>`);
  const POSF = [['ALL', 'الكل'], ['G', 'الحراس'], ['D', 'المدافعون'], ['M', 'الوسط'], ['F', 'المهاجمون']];
  render(`<div class="home">
    <header class="home-top"><div class="brand"><i data-lucide="gavel"></i><span>مزاد الأساطير</span></div>
      <div class="tools"><a class="hub-link" href="../../index.html">ألعاب الكومباطا</a><button class="icon-btn" data-snd onclick="toggleSound()" aria-label="تشغيل الصوت أو إيقافه">${sndBtn()}</button></div></header>
    <section class="home-t"><canvas id="ball" aria-hidden="true"></canvas>
      <div><h1>زايد على النجوم، واكشف الفائز في الملعب</h1><p>لاعبان على جهاز واحد. التقييمات سرية حتى صافرة النهاية.</p></div></section>
    <section class="vs" id="modes" aria-label="اختيار الطور">
      ${vp('legends', 'طور الأساطير', `<span class="ltr">1000<small>M</small></span>`,
        ['11 لاعباً في كل فريق', `${LEG_P.length} أسطورة من الماضي والحاضر`, `${LEG_C.length} مدرباً من أعظم المدربين`], 'ابدأ طور الأساطير', 'جديد')}
      ${vp('classic', 'الطور الكلاسيكي', `<span class="ltr">150–500<small>M</small></span>`,
        ['فريق من 5 أو 7 أو 11 لاعباً', 'اختر دوريات اللاعبين', 'نجوم ولاعبون عاديون ومدربون بكل المستويات'], 'ابدأ الكلاسيكي')}
    </section>
    <section class="hsec"><h2>نجوم قد تظهر في المزاد</h2><p class="sub">عيّنة عشوائية من أساطير الطور. تقييماتهم سرية.</p>
      <div class="fl" role="group" aria-label="تصفية بالمركز">${POSF.map(([k, t]) => `<button class="alt sm" data-fp="${k}" aria-pressed="${k === 'ALL'}" onclick="filterStars('${k}')">${t}</button>`).join('')}</div>
      ${slider('sl-stars', starCards('ALL'), 'cards', true)}</section>
    <section class="hsec"><h2>كيف تلعب</h2>${slider('sl-how', steps, 'how-sl')}</section>
    <p class="home-foot">${ALL_P.length} لاعباً و${ALL_C.length} مدرباً. الصور من ويكيبيديا وتحتاج إنترنت.</p></div>`, () => {
    document.body.classList.add('home-on');
    initSliders(); ball();
  });
}
