/* ========== الصفحة الرئيسية والقوائم المنزلقة ========== */

/* مكوّن القائمة المنزلقة: scroll-snap + أسهم + سحب بالفأرة + تشغيل تلقائي اختياري */
function slider(id, items, cls, auto) {
  return `<div class="slider ${cls || ''}" id="${id}"${auto ? ' data-auto="1"' : ''}>
    <button class="sl-btn" data-d="-1" aria-label="السابق"><i data-lucide="chevron-right"></i></button>
    <div class="track" tabindex="0">${items.map(h => `<div class="sl-i">${h}</div>`).join('')}</div>
    <button class="sl-btn" data-d="1" aria-label="التالي"><i data-lucide="chevron-left"></i></button></div>`;
}
function initSliders() {
  document.querySelectorAll('.slider').forEach(sl => {
    if (sl._on) return; sl._on = 1;
    const tr = sl.querySelector('.track'), [pv, nx] = sl.querySelectorAll('.sl-btn');
    const upd = () => {
      const mx = tr.scrollWidth - tr.clientWidth, x = Math.abs(tr.scrollLeft);
      pv.disabled = x < 4; nx.disabled = x > mx - 4; sl.classList.toggle('no-nav', mx < 4);
    };
    const go = d => {
      const rtl = getComputedStyle(tr).direction === 'rtl';
      tr.scrollBy({left:d * tr.clientWidth * .85 * (rtl ? -1 : 1), behavior:reduced ? 'auto' : 'smooth'});
    };
    pv.onclick = () => go(-1); nx.onclick = () => go(1);
    tr.addEventListener('scroll', upd, {passive:true});
    try { new ResizeObserver(upd).observe(tr); } catch (e) { addEventListener('resize', upd); }
    // سحب بالفأرة (اللمس يتمرّر أصلاً)
    let down = false, moved = false, sx = 0, s0 = 0;
    tr.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.button !== 0) return; down = true; moved = false; sx = e.clientX; s0 = tr.scrollLeft; });
    tr.addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 6) { moved = true; tr.classList.add('drag'); try { tr.setPointerCapture(e.pointerId); } catch (x) {} }
      if (moved) tr.scrollLeft = s0 - dx;
    });
    const end = () => { down = false; tr.classList.remove('drag'); };
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => tr.addEventListener(ev, end));
    tr.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    tr.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') go(getComputedStyle(tr).direction === 'rtl' ? 1 : -1); else if (e.key === 'ArrowRight') go(getComputedStyle(tr).direction === 'rtl' ? -1 : 1); });
    // تشغيل تلقائي بطيء يتوقف عند التفاعل
    if (sl.dataset.auto && !reduced) {
      let hold = false;
      ['pointerenter', 'focusin', 'touchstart'].forEach(ev => sl.addEventListener(ev, () => hold = true, {passive:true}));
      ['pointerleave', 'focusout'].forEach(ev => sl.addEventListener(ev, () => hold = false));
      const t = setInterval(() => {
        if (!sl.isConnected) return clearInterval(t);
        if (hold || document.hidden) return;
        Math.abs(tr.scrollLeft) >= tr.scrollWidth - tr.clientWidth - 4 ? tr.scrollTo({left:0, behavior:'smooth'}) : go(.5);
      }, 3200);
    }
    upd();
  });
}

/* ========== الشاشة الرئيسية ========== */
const WORDS = ['الأساطير', 'النجوم', 'الأبطال', 'الكبار'];
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
  stopTimers(); lot = null; showPos = 'ALL';
  STARS = [...LEG_P].sort(() => Math.random() - .5);
  const deck = STARS.filter(p => p.r >= 95).slice(0, 3);
  const mc = (k, ic, ttl, big, lines, cta, tag) => `<article class="mc ${k}">${tag ? `<span class="mc-tag">${tag}</span>` : ''}
    <div class="mc-ic"><i data-lucide="${ic}"></i></div><h3>${ttl}</h3><div class="mc-big num">${big}</div>
    <ul>${lines.map(l => `<li>${l}</li>`).join('')}</ul><button class="go" onclick="pickEdition('${k}')">${cta}</button></article>`;
  const modes = [
    mc('legends', 'crown', 'طور الأساطير', `<span class="ltr">1000<small>M</small></span>`,
      ['11 لاعباً في كل فريق', `أساطير فقط: ${LEG_P.length} أسطورة`, `أعظم المدربين: ${LEG_C.length} مدرباً`], 'العب الأساطير', 'جديد'),
    mc('classic', 'users', 'الطور الكلاسيكي', `<span class="ltr">150–500<small>M</small></span>`,
      ['فريق من 5 أو 7 أو 11 لاعباً', 'اختر دوريات اللاعبين', 'نجوم ولاعبون عاديون ومدربون ضعفاء وأقوياء'], 'العب الكلاسيكي')];
  const steps = [['1', 'gamepad-2', 'اختر الطور', 'كلاسيكي بدوريات تختارها، أو أساطير فقط بميزانية مليار.'],
    ['2', 'gavel', 'زايد بذكاء', 'يظهر لاعب بتقييم سري، ومن يرفض الرفع يخسر المزاد.'],
    ['3', 'repeat', 'الخاسر يشتري التالي', 'من خسر المزاد يشتري اللاعب التالي في المركز نفسه.'],
    ['4', 'user-round-cog', 'المدرب في النهاية', 'تشتري بما بقي من مال مدرباً بخبرة سرية تمنح فريقك دفعة.'],
    ['5', 'trophy', 'اكشف وشاهد', 'تُكشف التقييمات وتُلعب مباراة مباشرة بأهداف ولحظات.']]
    .map(([n, ic, t, d]) => `<div class="stc"><div class="n num">${n}</div><i data-lucide="${ic}"></i><h4>${t}</h4><p>${d}</p></div>`);
  const POSF = [['ALL', 'الكل'], ['G', 'الحراس'], ['D', 'المدافعون'], ['M', 'الوسط'], ['F', 'المهاجمون']];
  render(`<div class="home"><div class="home-bg" aria-hidden="true"><i></i><i></i><i></i></div>
    <header class="home-top"><div class="brand"><i data-lucide="gavel"></i><span>مزاد الأساطير</span></div>
      <button class="icon-btn" data-snd onclick="toggleSound()" aria-label="تشغيل الصوت أو إيقافه">${sndBtn()}</button></header>
    <section class="home-hero">
      <div class="hero-l"><span class="kick rv"><i data-lucide="sparkles"></i>لعبة مزاد كرة القدم · لاعبان · جهاز واحد</span>
        <div class="hero-t rv" style="--d:.08s"><canvas id="ball" aria-hidden="true"></canvas><h1 class="ht">مزاد <span class="rot" id="rot">${WORDS[0]}</span></h1></div>
        <p class="home-sub rv" style="--d:.16s">زايد على نجوم الماضي والحاضر، وابنِ تشكيلتك بميزانية محدودة، وتقييماتهم سرية حتى صافرة النهاية.</p>
        <div class="home-cta rv" style="--d:.24s"><button class="go" onclick="document.getElementById('modes').scrollIntoView({behavior:reduced?'auto':'smooth'})">اختر طورك<i data-lucide="chevron-down"></i></button></div>
        <div class="stats rv" style="--d:.32s"><div><b class="num" data-n="${ALL_P.length}">0</b><span>لاعب</span></div><div><b class="num" data-n="${LEG_P.length}">0</b><span>أسطورة</span></div><div><b class="num" data-n="${ALL_C.length}">0</b><span>مدرب</span></div></div></div>
      <div class="deck rv" style="--d:.2s" aria-hidden="true">${deck.map((p, i) => `<div class="dk d${i + 1}">${fcard(p)}</div>`).join('')}</div>
    </section>
    <section class="hsec" id="modes"><h2>اختر الطور</h2><p class="sub">اسحب أو اضغط الأسهم لاستعراض الأطوار.</p>${slider('sl-modes', modes, 'modes-sl')}</section>
    <section class="hsec"><h2>نجوم قد تظهر في المزاد</h2><p class="sub">التقييمات سرية، وهذه عيّنة عشوائية من أساطير الطور.</p>
      <div class="fl" role="group" aria-label="تصفية بالمركز">${POSF.map(([k, t]) => `<button data-fp="${k}" aria-pressed="${k === 'ALL'}" onclick="filterStars('${k}')">${t}</button>`).join('')}</div>
      ${slider('sl-stars', starCards('ALL'), 'cards', true)}</section>
    <section class="hsec"><h2>كيف تلعب</h2>${slider('sl-how', steps, 'how-sl')}</section>
    <p class="home-foot">${ALL_P.length} لاعباً و${ALL_C.length} مدرباً. الصور من ويكيبيديا وتحتاج إنترنت.</p></div>`, () => {
    document.body.classList.add('home-on');
    initSliders(); ball();
    document.querySelectorAll('.stats [data-n]').forEach(e => fx.count(e, +e.dataset.n, 0, 1.4));
    const h = document.querySelector('.home');
    h.addEventListener('pointermove', e => {
      h.style.setProperty('--mx', (e.clientX / innerWidth - .5).toFixed(3)); h.style.setProperty('--my', (e.clientY / innerHeight - .5).toFixed(3));
    });
    if (!reduced) { let i = 0; const t = setInterval(() => {
      const r = $('rot'); if (!r) return clearInterval(t);
      r.classList.add('out'); setTimeout(() => { r.textContent = WORDS[i = (i + 1) % WORDS.length]; r.classList.remove('out'); }, 350);
    }, 2400); }
  });
}
