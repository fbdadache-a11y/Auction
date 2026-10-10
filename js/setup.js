/* ========== الإعداد ========== */
const pool = () => ALL_P.filter(p => lgs.has(p.lg));
function shortage() {
  const f = MODES[mode].form, P = pool();
  return Object.keys(f).filter(p => P.filter(x => x.pos === p).length < 2 * f[p])
    .map(p => `${POS[p]} (${P.filter(x => x.pos === p).length} من ${2 * f[p]})`);
}
function setup() {
  stopTimers(); lot = null;
  const fan = ALL_P.filter(p => p.r >= 96).sort(() => Math.random() - .5).slice(0, 3);
  const teamBox = i => `<div class="tb"><label for="n${i}">${i ? 'الفريق الثاني' : 'الفريق الأول'}</label><input id="n${i}" maxlength="20" value="${esc(names[i])}">
    <div class="sws" role="group" aria-label="لون القميص">${KITS.map(c => `<button class="swb" data-i="${i}" data-c="${c}" style="--c:${c}" aria-label="لون القميص" aria-pressed="${kits[i] === c}" onclick="pickKit(${i},'${c}')"></button>`).join('')}</div></div>`;
  render(topbar() + `<section class="hero"><div class="hero-t"><canvas id="ball" aria-hidden="true"></canvas><div><h1>مزاد الأساطير</h1><p>زايد على نجوم الماضي والحاضر، وابنِ تشكيلتك، وتقييماتهم سرية حتى صافرة النهاية.</p></div></div>
    <div class="fan">${fan.map(p => fcard(p)).join('')}</div></section>
    <section class="card"><div class="teams2">${teamBox(0)}${teamBox(1)}</div>
      <div class="sec">حجم الفريق</div>
      <div class="modes">${Object.entries(MODES).map(([k, m]) => `<button data-m="${k}" aria-pressed="${k === mode}" onclick="setMode('${k}')">${m.n}<small>${M(m.money)} لكل فريق</small></button>`).join('')}</div>
      <div class="sec">دوريات اللاعبين المعروضين</div>
      <div class="lgs">${Object.keys(LG).map(k => `<button data-l="${k}" aria-pressed="${lgs.has(k)}" onclick="toggleLg('${k}')">${LGS[k]}<small>${LGCOUNT[k]}</small></button>`).join('')}</div>
      <div class="row" style="margin:0"><button class="alt sm" onclick="setLgs(Object.keys(LG))">كل الدوريات</button><button class="alt sm" onclick="setLgs(BIG5)">الخمسة الكبار</button></div>
      <p class="mut" id="avail" style="margin-top:10px"></p>
      <ol class="how"><li><i data-lucide="gavel"></i><span>زايد على لاعب يُعرض بتقييم سري، ومن يخسر المزاد يشتري اللاعب التالي.</span></li>
        <li><i data-lucide="users"></i><span>أكمل التشكيلة بالترتيب: الحراس ثم المدافعون ثم الوسط ثم المهاجمون ثم المدرب.</span></li>
        <li><i data-lucide="trophy"></i><span>تُكشف التقييمات وتُلعب المباراة، والأقوى لا يفوز دائماً.</span></li></ol>
      <div class="row"><button id="go" class="go">ابدأ المزاد</button></div></section>
    <p class="mut">${ALL_P.length} لاعباً و${ALL_C.length} مدرباً. الصور من ويكيبيديا وتحتاج إنترنت.</p>`, refreshSetup);
  $('go').onclick = start;
}
function refreshSetup() {
  document.querySelectorAll('[data-m]').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === mode));
  document.querySelectorAll('[data-l]').forEach(b => b.setAttribute('aria-pressed', lgs.has(b.dataset.l)));
  document.querySelectorAll('.swb').forEach(b => b.setAttribute('aria-pressed', kits[+b.dataset.i] === b.dataset.c));
  const chip = $('modeChip'); if (chip) chip.innerHTML = `${MODES[mode].n} · <span class="num">${M(MODES[mode].money)}</span>`;
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
  const m = MODES[mode];
  S = {n:names, k:[...kits], mode, m:[m.money, m.money], spent:[0, 0], sq:[[], []], co:[null, null], stage:0, lotNo:0, log:[],
       P:pool(), C:[...ALL_C], form:m.form, N:Object.values(m.form).reduce((a, b) => a + b)};
  sndDeal();
  next();
}
