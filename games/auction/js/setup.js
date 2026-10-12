/* ========== الإعداد ========== */
const pool = () => edition === 'legends' ? LEG_P : ALL_P.filter(p => lgs.has(p.lg));
function shortage() {
  const f = MODES[mode].form, P = pool();
  return Object.keys(f).filter(p => P.filter(x => x.pos === p).length < 2 * f[p])
    .map(p => `${POS[p]} (${P.filter(x => x.pos === p).length} من ${2 * f[p]})`);
}
function pickEdition(k) { edition = k; sndDeal(); setup(); }

function setup() {
  stopTimers(); lot = null;
  const L = edition === 'legends';
  const teamBox = i => `<div class="tb"><label for="n${i}">${i ? 'الفريق الثاني' : 'الفريق الأول'}</label><input id="n${i}" maxlength="20" value="${esc(names[i])}">
    <div class="sws" role="group" aria-label="لون القميص">${KITS.map(c => `<button class="swb" data-i="${i}" data-c="${c}" style="--c:${c}" aria-label="لون القميص" aria-pressed="${kits[i] === c}" onclick="pickKit(${i},'${c}')"></button>`).join('')}</div></div>`;
  const head = `<div class="sh"><button class="alt sm" onclick="home()"><i data-lucide="chevron-right"></i>الرئيسية</button>
    <h2>${L ? 'طور الأساطير' : 'الطور الكلاسيكي'}</h2>${L ? '<span class="mc-tag">11 لاعباً بميزانية 1000M</span>' : ''}</div>`;
  const classic = `<div class="sec">حجم الفريق</div>
      ${slider('sl-size', Object.entries(MODES).map(([k, m]) => `<button class="opt" data-m="${k}" aria-pressed="${k === mode}" onclick="setMode('${k}')">${m.n}<small>${M(m.money)} لكل فريق</small></button>`), 'fit')}
      <div class="sec">دوريات اللاعبين المعروضين</div>
      ${slider('sl-lgs', Object.keys(LG).map(k => `<button class="opt" data-l="${k}" aria-pressed="${lgs.has(k)}" onclick="toggleLg('${k}')">${LGS[k]}<small>${LGCOUNT[k]}</small></button>`), 'lgs')}
      <div class="row" style="margin:0"><button class="alt sm" onclick="setLgs(Object.keys(LG))">كل الدوريات</button><button class="alt sm" onclick="setLgs(BIG5)">الخمسة الكبار</button></div>
      <p class="mut" id="avail" style="margin-top:10px"></p>`;
  const legends = `<div class="facts"><div><span class="lbl">الميزانية لكل فريق</span><b class="num">${M(LEGENDS.money)}</b></div>
      <div><span class="lbl">لاعبون في الفريق</span><b class="num">11</b></div>
      <div><span class="lbl">أسطورة في المزاد</span><b class="num">${LEG_P.length}</b></div>
      <div><span class="lbl">مدرب أسطوري</span><b class="num">${LEG_C.length}</b></div></div>
      <p class="mut">لا يظهر هنا إلا أساطير الماضي ونجوم الحاضر الكبار، والتقييمات متقاربة، فالمزايدة الذكية وتوزيع الميزانية هما ما يحسم اللقاء.</p>
      <div class="sec">أساطير قد تُعرض في المزاد</div>
      ${slider('sl-leg', [...LEG_P].sort(() => Math.random() - .5).slice(0, 12).map(p => fcard(p, {w:130})), 'cards')}`;
  render(topbar() + head + `<section class="card"><div class="teams2">${teamBox(0)}${teamBox(1)}</div>
      ${L ? legends : classic}
      <ol class="how"><li><i data-lucide="gavel"></i><span>زايد على لاعب يُعرض بتقييم سري، ومن يخسر المزاد يشتري اللاعب التالي.</span></li>
        <li><i data-lucide="users"></i><span>أكمل التشكيلة بالترتيب: الحراس ثم المدافعون ثم الوسط ثم المهاجمون ثم المدرب.</span></li>
        <li><i data-lucide="trophy"></i><span>تُكشف التقييمات وتُلعب المباراة، والأقوى لا يفوز دائماً.</span></li></ol>
      <div class="row"><button id="go" class="go">${L ? 'ابدأ مزاد الأساطير' : 'ابدأ المزاد'}</button></div></section>
    <p class="mut">${ALL_P.length} لاعباً و${ALL_C.length} مدرباً. الصور من ويكيبيديا وتحتاج إنترنت.</p>`, () => { initSliders(); refreshSetup(); });
  $('go').onclick = start;
}
function refreshSetup() {
  document.querySelectorAll('[data-m]').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === mode));
  document.querySelectorAll('[data-l]').forEach(b => b.setAttribute('aria-pressed', lgs.has(b.dataset.l)));
  document.querySelectorAll('.swb').forEach(b => b.setAttribute('aria-pressed', kits[+b.dataset.i] === b.dataset.c));
  const chip = $('modeChip'); if (chip) chip.innerHTML = chipTxt();
  if (edition === 'legends') { $('go').disabled = false; return; }
  const sh = shortage(), n = pool().length;
  $('avail').innerHTML = !lgs.size ? '<span class="warn">اختر دورياً واحداً على الأقل.</span>'
    : sh.length ? `<span class="warn">الدوريات المختارة لا تكفي لهذا الحجم: ${sh.join('، ')}. أضف دورياً آخر أو صغّر الفريق.</span>`
    : `اللاعبون المتاحون في المزاد: ${n}`;
  $('go').disabled = !lgs.size || sh.length > 0;
}
function setMode(k) { mode = k; refreshSetup(); }
function toggleLg(k) { lgs.has(k) ? lgs.delete(k) : lgs.add(k); refreshSetup(); }
function setLgs(arr) { lgs = new Set(arr); refreshSetup(); }
function pickKit(i, c) { if (kits[1 - i] === c) kits[1 - i] = kits[i]; kits[i] = c; refreshSetup(); }

function start() {
  names = [$('n0').value.trim() || 'الفريق الأول', $('n1').value.trim() || 'الفريق الثاني'];
  if (names[0] === names[1]) names[1] += ' 2';
  const L = edition === 'legends', m = cfg();
  S = {n:names, k:[...kits], mode:L ? 'full' : mode, ed:edition, m:[m.money, m.money], spent:[0, 0], sq:[[], []], co:[null, null], stage:0, lotNo:0, log:[],
       P:[...pool()], C:L ? [...LEG_C] : [...ALL_C], form:m.form, N:Object.values(m.form).reduce((a, b) => a + b),
       inc:m.inc || [1, 5, 20], minp:m.minp || 1};
  sndDeal();
  next();
}
