/* ========== الإعداد ========== */
const pool = () => edition === 'elite' ? ELITE_P : ALL_P.filter(p => sel.has(p.sr));
const mentorPool = () => { if (edition === 'elite') return ELITE_C; const m = ALL_C.filter(c => sel.has(c.sr)); return m.length >= 4 ? m : ALL_C; };
function shortage() {
  const f = cfg().form, P = pool();
  return Object.keys(f).filter(p => P.filter(x => x.pos === p).length < 2 * f[p])
    .map(p => `${ROLES[p].n} (${P.filter(x => x.pos === p).length} من ${2 * f[p]})`);
}
function pickEdition(k) { edition = k; sndDeal(); setup(); }
const SORDER = Object.keys(SERIES).sort((a, b) => (SCOUNT[b] || 0) - (SCOUNT[a] || 0));

function setup() {
  stopTimers(); lot = null;
  const L = edition === 'elite';
  const teamBox = i => `<div class="tb"><label for="n${i}">${i ? 'الفريق الثاني' : 'الفريق الأول'}</label><input id="n${i}" maxlength="20" value="${esc(names[i])}">
    <div class="sws" role="group" aria-label="لون الفريق">${KITS.map(c => `<button class="swb" data-i="${i}" data-c="${c}" style="--c:${c}" aria-label="لون الفريق" aria-pressed="${kits[i] === c}" onclick="pickKit(${i},'${c}')"></button>`).join('')}</div></div>`;
  const head = `<div class="sh"><button class="alt sm" onclick="home()"><i data-lucide="chevron-right"></i>الرئيسية</button>
    <h2>${L ? 'طور النخبة' : 'الطور الكلاسيكي'}</h2>${L ? `<span class="mc-tag">5 مقاتلين بميزانية ${ELITE.money}M</span>` : ''}</div>`;
  const classic = `<div class="sec">حجم الفريق</div>
      ${slider('sl-size', Object.entries(MODES).map(([k, m]) => `<button class="opt" data-m="${k}" aria-pressed="${k === mode}" onclick="setMode('${k}')">${m.n}<small>${M(m.money)} لكل فريق</small></button>`), 'fit')}
      <div class="sec">الأنميات التي تظهر شخصياتها</div>
      <div class="qf"><button class="alt sm" onclick="setSel(Object.keys(SERIES))">الكل</button>
        <button class="alt sm" onclick="setSel(Object.keys(SERIES).filter(k=>SERIES[k].g==='S'))">شونين فقط</button>
        <button class="alt sm" onclick="setSel(Object.keys(SERIES).filter(k=>SERIES[k].g==='I'))">إيسيكاي فقط</button>
        <button class="alt sm" onclick="setSel(SORDER.slice(0,12))">الأشهر (12)</button></div>
      ${slider('sl-sr', SORDER.map(k => `<button class="opt" data-s="${k}" aria-pressed="${sel.has(k)}" onclick="toggleSr('${k}')">${esc(SERIES[k].ar)}<small>${SCOUNT[k] || 0}<span class="g">${GENRE[SERIES[k].g]}</span></small></button>`), 'lgs')}
      <p class="mut" id="avail" style="margin-top:10px"></p>`;
  const elite = `<div class="facts"><div><span class="lbl">الميزانية لكل فريق</span><b class="num">${M(ELITE.money)}</b></div>
      <div><span class="lbl">مقاتلون في الفريق</span><b class="num">5</b></div>
      <div><span class="lbl">بطل في المزاد</span><b class="num">${ELITE_P.length}</b></div>
      <div><span class="lbl">معلّم عظيم</span><b class="num">${ELITE_C.length}</b></div></div>
      <p class="mut">لا يظهر هنا إلا أقوى الأبطال، وقواهم متقاربة، فالمزايدة الذكية وحسن اختيار المقاتل في كل جولة هما ما يحسم المعركة.</p>
      <div class="sec">أبطال قد يُعرضون في المزاد</div>
      ${slider('sl-leg', shuffle(ELITE_P).slice(0, 12).map(p => fcard(p, {w:130})), 'cards')}`;
  render(topbar() + head + `<section class="card"><div class="teams2">${teamBox(0)}${teamBox(1)}</div>
      ${L ? elite : classic}
      <ol class="how"><li><i data-lucide="gavel"></i><span>زايد على مقاتل يُعرض بقوة سرية، ومن يخسر المزاد يشتري المقاتل التالي.</span></li>
        <li><i data-lucide="users"></i><span>أكمل الفريق بالترتيب: القتاليون ثم أصحاب القدرات ثم السريعون ثم المعلّم.</span></li>
        <li><i data-lucide="swords"></i><span>تُكشف القوى، ثم تُخاض المعركة جولة بعد جولة باختيار سري، والأقوى لا يفوز دائماً.</span></li></ol>
      <div class="row"><button id="go" class="go">${L ? 'ابدأ مزاد النخبة' : 'ابدأ المزاد'}</button></div></section>
    <p class="mut">${ALL_P.length} مقاتلاً و${ALL_C.length} معلّماً. الصور تُجلب من AniList وتحتاج إنترنت.</p>`, () => { initSliders(); refreshSetup(); });
  $('go').onclick = start;
}
function refreshSetup() {
  document.querySelectorAll('[data-m]').forEach(b => b.setAttribute('aria-pressed', b.dataset.m === mode));
  document.querySelectorAll('[data-s]').forEach(b => b.setAttribute('aria-pressed', sel.has(b.dataset.s)));
  document.querySelectorAll('.swb').forEach(b => b.setAttribute('aria-pressed', kits[+b.dataset.i] === b.dataset.c));
  const chip = $('modeChip'); if (chip) chip.innerHTML = chipTxt();
  if (edition === 'elite') { $('go').disabled = false; return; }
  const sh = shortage(), n = pool().length;
  $('avail').innerHTML = !sel.size ? '<span class="warn">اختر أنمي واحداً على الأقل.</span>'
    : sh.length ? `<span class="warn">الأنميات المختارة لا تكفي لهذا الحجم: ${sh.join('، ')}. أضف أنمي آخر أو صغّر الفريق.</span>`
    : `المقاتلون المتاحون في المزاد: ${n}`;
  $('go').disabled = !sel.size || sh.length > 0;
}
function setMode(k) { mode = k; refreshSetup(); }
function toggleSr(k) { sel.has(k) ? sel.delete(k) : sel.add(k); refreshSetup(); }
function setSel(arr) { sel = new Set(arr); refreshSetup(); }
function pickKit(i, c) { if (kits[1 - i] === c) kits[1 - i] = kits[i]; kits[i] = c; refreshSetup(); }

function start() {
  names = [$('n0').value.trim() || 'الفريق الأول', $('n1').value.trim() || 'الفريق الثاني'];
  if (names[0] === names[1]) names[1] += ' 2';
  const L = edition === 'elite', m = cfg();
  S = {n:names, k:[...kits], mode:L ? 'five' : mode, ed:edition, m:[m.money, m.money], spent:[0, 0], sq:[[], []], co:[null, null], stage:0, lotNo:0, log:[],
       P:[...pool()], C:[...mentorPool()], form:m.form, N:Object.values(m.form).reduce((a, b) => a + b),
       inc:m.inc || [1, 5, 20], minp:m.minp || 1};
  sndDeal();
  next();
}
