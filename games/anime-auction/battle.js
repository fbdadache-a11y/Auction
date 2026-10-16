/* ========== المعركة: كشف القوى، اختيار سري كل جولة، اشتباك، نتيجة ========== */
const KEYS = [['1', '2', '3'], ['8', '9', '0']];   // مفاتيح لوحة المفاتيح لكل فريق (حين تقل الخيارات عن 4)
const SFX = ['بووم!', 'طاخ!', 'كراش!', 'باااف!', 'زوووم!'];
let MT = null;
const bonusTot = i => S.co[i] ? bonusOf(S.co[i]) : 0;
function battleStart() { stopTimers(); lot = null; S.stage = 5; reveal(); }

/* ---------- كشف القوى ---------- */
function reveal() {
  S.phase = 'reveal'; save();
  const R = [0, 1].map(i => { const sum = S.sq[i].reduce((a, p) => a + p.r, 0); return {sum, bonus:bonusTot(i), total:sum + bonusTot(i) * S.N}; });
  const tot = i => `<div class="tot" style="--kit:${S.k[i]}"><div class="tr"><span>مجموع المقاتلين</span><b class="num" data-t="sum${i}">؟؟</b></div>
    <div class="tr"><span>أثر المعلّم لكل مقاتل</span><b class="num" data-t="bn${i}">؟؟</b></div><div class="tr big"><span>القوة الكلية</span><b class="num" data-t="tt${i}">؟؟</b></div></div>`;
  render(topbar() + `<h2 class="ttl">كشف القوى</h2>` + boards({reveal:true}) + `<section class="pair tots">${tot(0)}${tot(1)}</section>
    <p class="hint">المجموع الكلي مؤشر فقط. في المعركة تحسم الجولات اختياراتك، والنوع المناسب يمنحك أفضلية.</p>
    <div class="row c"><button class="alt" id="skipRev">تخطّ الكشف</button><button class="go" id="startM" disabled>ابدأ المعركة</button></div>`, () => {
    toTop();
    const per = [0, 1].map(i => [...document.querySelectorAll('.tp')[i].querySelectorAll('.rt')]);
    const q = [];
    for (let k = 0; k < Math.max(per[0].length, per[1].length); k++) [0, 1].forEach(i => { if (per[i][k]) q.push(per[i][k]); });
    const flip = (el, inst) => {
      if (!el.classList.contains('hid')) return;
      const r = +el.dataset.r; el.classList.remove('hid'); el.classList.add('on');
      if (inst) el.textContent = r; else { fx.count(el, r, Math.max(0, r - 25), .25); tone('triangle', [360 + (r - 60) * 9], .06, .1); }
    };
    const fin = () => {
      stopTimers();
      q.forEach(el => flip(el, true));
      [0, 1].forEach(i => {
        fx.count(document.querySelector(`[data-t="sum${i}"]`), R[i].sum, 0, .8);
        document.querySelector(`[data-t="bn${i}"]`).textContent = '+' + R[i].bonus;
        fx.count(document.querySelector(`[data-t="tt${i}"]`), Math.round(R[i].total), 0, 1);
      });
      $('startM').disabled = false; $('skipRev').disabled = true; sndDeal();
    };
    let k = 0;
    TM = setInterval(() => { if (k >= q.length) fin(); else flip(q[k++]); }, 230);
    $('skipRev').onclick = fin;
    $('startM').onclick = () => beginFight();
  });
}

/* ---------- الاختيار الثنائي السري: نصف شاشة لكل فريق ---------- */
/* cfg: {title, sub, note, sides:[{label, opts:[{k, html, pick}]}], verdict(picks), hold}
   كل فريق يضغط في نصفه، وبعد اختيار الاثنين يُكشفان معاً ثم يُستدعى cb(picks). */
function duel(box, cfg, cb) {
  const picks = [null, null]; let done = false;
  const keyed = i => cfg.sides[i].opts.length <= 3;
  const ctl = {t:0, cancel() { done = true; clearTimeout(ctl.t); document.removeEventListener('keydown', onKey); box.innerHTML = ''; }};
  const side = i => { const s = cfg.sides[i]; return `<div class="dside" data-i="${i}" style="--kit:${S.k[i]}"><div class="dsh"><b>${T(i)}</b><span>${s.label}</span></div>
    <div class="dopts${s.opts.length > 3 ? '' : ' one'}">${s.opts.map((o, n) => `<button class="dopt" data-n="${n}">${o.html}${keyed(i) ? `<kbd>${KEYS[i][n]}</kbd>` : ''}</button>`).join('')}</div></div>`; };
  box.innerHTML = `<section class="duel" role="group" aria-label="${esc(cfg.title.replace(/<[^>]+>/g, ''))}"><div class="dh"><h3>${cfg.title}</h3>${cfg.sub ? `<p>${cfg.sub}</p>` : ''}</div>
    <div class="dsides">${side(0)}${side(1)}</div><p class="dnote">${cfg.note || 'كل لاعب يختار من نصفه ولا ينظر إلى خيار الآخر.'}</p></section>`;
  hydrate();
  const reveal = () => {
    done = true; document.removeEventListener('keydown', onKey);
    [0, 1].forEach(i => { const o = cfg.sides[i].opts.find(x => x.k === picks[i]); box.querySelector(`.dside[data-i="${i}"] .dlock`).outerHTML = `<div class="dpick">${o.pick}</div>`; });
    hydrate();
    box.querySelector('.dnote').outerHTML = `<p class="dverdict">${cfg.verdict ? cfg.verdict(picks) : ''}</p>`;
    ctl.t = setTimeout(() => { box.innerHTML = ''; cb(picks); }, cfg.hold || 1500);
  };
  const lock = (i, n) => {
    if (done || picks[i] !== null) return;
    picks[i] = cfg.sides[i].opts[n].k; sndBid();
    const el = box.querySelector(`.dside[data-i="${i}"]`); el.classList.add('ok');
    el.querySelector('.dopts').outerHTML = '<div class="dlock">تم الاختيار</div>';
    if (picks[0] !== null && picks[1] !== null) reveal();
  };
  const onKey = e => { [0, 1].forEach(i => { const n = KEYS[i].indexOf(e.key); if (keyed(i) && n >= 0 && n < cfg.sides[i].opts.length) lock(i, n); }); };
  box.querySelectorAll('.dopt').forEach(b => b.onclick = () => lock(+b.closest('.dside').dataset.i, +b.dataset.n));
  document.addEventListener('keydown', onKey);
  return ctl;
}

/* ---------- الجولات ---------- */
const beginFight = () => { S.bt = {used:[[], []], wins:[0, 0], rounds:[], view:'pick'}; pickView(); };
const rolePair = (a, b) => BEATS[a] === b ? `${ROLES[a].n} يغلب ${ROLES[b].n}` : BEATS[b] === a ? `${ROLES[b].n} يغلب ${ROLES[a].n}` : 'لا أفضلية للنوع';
function fightHead() {
  const B = S.bt, cl = B.view === 'clash', rn = cl ? B.rounds.length : B.rounds.length + 1, need = needWins(S.N), tm = i => `<div class="sbt" style="--kit:${S.k[i]}"><div class="sbh"><span class="sbn">${T(i)}</span></div>
    <div class="sbm num">${B.wins[i]}</div><div class="sbs">الجولات المربوحة</div></div>`;
  return `<section class="sb">${tm(0)}<div class="sbc"><div class="st">${'الجولة ' + rn}</div><div class="ln">السباق إلى <span class="num">${need}</span> من <span class="num">${S.N}</span></div></div>${tm(1)}</section>
    <div class="tracker" style="--kit0:${S.k[0]};--kit1:${S.k[1]}">${Array.from({length:S.N}, (_, n) => `<i class="${B.rounds[n] ? 'w' + B.rounds[n].w : n === B.rounds.length && !cl ? 'cur' : ''}"></i>`).join('')}</div>`;
}
function rostersHTML() {
  const B = S.bt;
  return `<section class="rosters">${[0, 1].map(i => `<div class="rst" style="--kit:${S.k[i]}"><h4>${T(i)}</h4><ul>${S.sq[i].map((p, n) => {
    const r = B.rounds.find(x => (x.w === 0 ? x.a : x.b) === p && x.w === i);
    return `<li class="${B.used[i].includes(n) ? 'used' : ''}${r ? ' won' : ''}" title="${esc(p.name)}">${av(p)}</li>`; }).join('')}</ul></div>`).join('')}</section>`;
}
const optHtml = (p, long) => `${av(p)}<span class="dt"><b>${esc(p.name)}</b><small><i class="rdot ${p.pos}"></i>${ROLES[p.pos].n}</small></span><span class="rr num">${p.r}</span>`;
function pickView() {
  stopTimers(); lot = null; S.phase = 'battle'; S.bt.view = 'pick'; save();
  const B = S.bt;
  const side = i => ({label:'اختر مقاتل هذه الجولة', opts:S.sq[i].map((p, n) => ({k:n, html:optHtml(p), pick:`${av(p)}<span>${esc(p.name)}</span>`})).filter(o => !B.used[i].includes(o.k))});
  const verdict = pk => { const a = S.sq[0][pk[0]], b = S.sq[1][pk[1]];
    return `${esc(a.name)} <b>✕</b> ${esc(b.name)}<br><small>${rolePair(a.pos, b.pos)}</small>`; };
  render(topbar() + fightHead() + `<ul class="rps"><li><b>القتالي</b> يغلب صاحب القدرات</li><li><b>صاحب القدرات</b> يغلب السريع</li><li><b>السريع</b> يغلب القتالي</li></ul>
    ${rostersHTML()}<div id="duelBox"></div>`, () => {
    toTop();
    MT = {ctl:duel($('duelBox'), {title:`الجولة ${B.rounds.length + 1}: اختر مقاتلك سراً`, sub:'القوى مكشوفة، فالحسم في التوقع.', sides:[side(0), side(1)], verdict, hold:1700}, pk => fightRound(pk))};
  });
}
function fightRound(pk) {
  const B = S.bt, a = S.sq[0][pk[0]], b = S.sq[1][pk[1]];
  const r = clash(a, b, S.co[0], S.co[1]);
  B.used[0].push(pk[0]); B.used[1].push(pk[1]); B.wins[r.w]++; B.rounds.push(r);
  B.view = 'clash'; save();
  clashView(true);
}
function clashView(fresh) {
  stopTimers(); lot = null; S.phase = 'battle';
  const B = S.bt, r = B.rounds[B.rounds.length - 1], n = B.rounds.length, need = needWins(S.N);
  const fin = B.wins[0] >= need || B.wins[1] >= need || n >= S.N;
  const win = r.w === 0 ? r.a : r.b, lose = r.w === 0 ? r.b : r.a, wp = r.w === 0 ? r.pa : 1 - r.pa, up = wp < .5;
  const pw = i => { const p = i ? r.b : r.a, e = i ? r.eb : r.ea, bn = i ? r.bb : r.ba, ed = r.edge === i ? EDGE : 0;
    return `<div class="pw"><span class="tt num" data-e="${e}">${fresh ? 0 : e}</span><div class="bar" style="--kit:${S.k[i]};--p:${Math.round(e / (r.ea + r.eb) * 100)}%"><i></i></div>
    <span class="parts">${p.r}${bn ? ` + ${bn} معلّم` : ''}${ed ? ` + ${ed} نوع` : ''}</span></div>`; };
  const side = (i, cls) => { const p = i ? r.b : r.a;
    return `<div class="cl-side ${cls} ${r.w === i ? 'win' : 'lose'}" style="--kit:${S.k[i]}"><b class="sbn">${T(i)}</b>${fcard(p, {rating:p.r})}${pw(i)}</div>`; };
  render(topbar() + fightHead() + `<section class="clash${fresh ? ' shake' : ''}"><span class="speed ${fresh ? 'red' : ''}"></span><span class="flash"></span>
    <div class="clash-g">${side(0, 'a')}<div class="cl-vs"><span class="burst"></span><span class="sfx">VS</span></div>${side(1, 'b')}</div>
    <div class="cl-out"><span class="sfx">${SFX[(n + r.a.r) % SFX.length]}</span>
      <p>انتصر <b>${esc(win.name)}</b> على ${esc(lose.name)} لصالح ${T(r.w)}${up ? '<span class="cl-up">مفاجأة!</span>' : ''}</p>
      ${r.edge !== null ? `<span class="cl-edge">${rolePair(r.a.pos, r.b.pos)} (+${EDGE})</span>` : '<span class="cl-edge">لا أفضلية للنوع</span>'}</div></section>
    ${rostersHTML()}
    <div class="row c"><button class="go" id="nx">${fin ? 'اعرف النتيجة' : 'الجولة التالية'}</button></div>`, () => {
    toTop();
    if (fresh) {
      sndDeal(); setTimeout(() => sndGoal(), 650);
      document.querySelectorAll('.pw .tt').forEach(el => fx.count(el, +el.dataset.e, 0, 1));
      fx.boom({particleCount:40, spread:70, origin:fx.at(document.querySelector(`.cl-side.win`)), colors:[S.k[r.w], '#16130E', '#D4302A']});
    }
    $('nx').onclick = () => fin ? finish() : pickView();
  });
}

/* ---------- النتيجة ---------- */
function finish() {
  stopTimers();
  const B = S.bt, w = B.wins[0] > B.wins[1] ? 0 : 1, rs = B.rounds;
  const mv = mvpOf(rs, w);
  const of = i => rs.map(r => r.w === i ? (i === 0 ? r.ea : r.eb) : 0).filter(Boolean);
  const eff = i => rs.map(r => i === 0 ? r.ea : r.eb);
  const avg = i => Math.round(eff(i).reduce((a, b) => a + b, 0) / (rs.length || 1));
  const stats = {rounds:[...B.wins], avg:[avg(0), avg(1)], top:[0, 1].map(i => Math.round(Math.max(...eff(i)))), up:[0, 1].map(i => rs.filter(r => r.w === i && (i === 0 ? r.pa : 1 - r.pa) < .5).length),
    edge:[0, 1].map(i => rs.filter(r => r.edge === i).length)};
  W[w]++;
  S.res = {w, wins:[...B.wins], rounds:rs, stats, mvp:mv ? {p:mv.p, n:mv.n, t:w} : null};
  S.phase = 'final'; save();
  result(true);
}
function result(fresh) {
  stopTimers(); lot = null;
  const R = S.res, w = R.w, st = R.stats;
  const row = (lbl, a, b) => { const t = (a + b) || 1; return `<div class="sr"><span class="sl">${lbl}</span><div class="sv"><b class="num">${a}</b>
    <div class="sbar"><i style="width:${a / t * 100}%;background:${S.k[0]}"></i><i style="width:${b / t * 100}%;background:${S.k[1]}"></i></div><b class="num">${b}</b></div></div>`; };
  const mv = R.mvp;
  const list = R.rounds.map((r, n) => `<li class="rl"><span class="n num">${n + 1}</span><span class="who"><b>${esc(r.a.name)}</b> (${Math.round(r.ea)}) ✕ <b>${esc(r.b.name)}</b> (${Math.round(r.eb)})<br>
    <span class="mut">${rolePair(r.a.pos, r.b.pos)}</span></span><span class="pw2 win" style="color:${S.k[r.w]}">${esc(S.n[r.w])}</span></li>`).join('');
  render(topbar() + `<section class="sb"><div class="sbt" style="--kit:${S.k[0]}"><div class="sbh"><span class="sbn">${T(0)}</span></div><div class="sbm num">${R.wins[0]}</div></div>
      <div class="sbc"><div class="st">انتهت المعركة</div></div><div class="sbt" style="--kit:${S.k[1]}"><div class="sbh"><span class="sbn">${T(1)}</span></div><div class="sbm num">${R.wins[1]}</div></div></section>
    <section class="final" style="--kit:${S.k[w]}"><span class="speed red"></span><div class="sfx">انتصار!</div><div class="fw">الفائز: ${T(w)}</div>
      <p class="sub">النتيجة الإجمالية بين الفريقين ${pair(W[0], W[1])}</p>
      <div class="row c"><button id="again" class="go">معركة أخرى بنفس الفريقين</button><button class="alt" id="newg">لعبة جديدة</button></div></section>
    ${mv ? `<section class="mvp" style="--kit:${S.k[mv.t]}"><div class="mvt"><span class="ribbon"><span>بطل المعركة</span></span><h3>${esc(mv.p.name)}</h3><p>${T(mv.t)} · ${esc(srName(mv.p))}${mv.n > 1 ? ` · ${mv.n} انتصارات` : ''}</p><p class="mut">قوته الأصلية: <b class="num">${mv.p.r}</b></p></div>${fcard(mv.p, {rating:mv.p.r, w:150})}</section>` : ''}
    <section class="card"><h3>جولات المعركة</h3><ol class="rlist" style="padding:0">${list}</ol></section>
    <section class="card stats"><h3>إحصائيات المعركة</h3>${row('الجولات المربوحة', st.rounds[0], st.rounds[1])}${row('متوسط القوة الفعلية', st.avg[0], st.avg[1])}${row('أقوى ضربة', st.top[0], st.top[1])}${row('انتصارات المفاجأة', st.up[0], st.up[1])}${row('جولات بأفضلية النوع', st.edge[0], st.edge[1])}</section>`, () => {
    toTop(); $('again').onclick = () => beginFight(); $('newg').onclick = () => home();
    if (fresh) { sndGoal(); fx.cannons([S.k[w], '#16130E', '#D4302A'], 2000); }
  });
}
