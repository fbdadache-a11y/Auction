/* ========== المعركة: كشف القوى، خطة سرية لكل فريق، ثم قتال متحرك جولة بعد جولة ========== */
let MT = null, PL = null, ARN = [];
const hpCls = h => h < 35 ? 'lo' : h < 65 ? 'mid' : '';
const SFX = ['بووم!', 'طاخ!', 'كراش!', 'باااف!', 'زوووم!'];
const bonusTot = i => S.co[i] ? bonusOf(S.co[i]) : 0;
function battleStart() { stopTimers(); lot = null; S.stage = 5; reveal(); }

/* ---------- كشف القوى ---------- */
function reveal() {
  S.phase = 'reveal'; save();
  const R = [0, 1].map(i => { const sum = S.sq[i].reduce((a, p) => a + p.r, 0); return {sum, bonus:bonusTot(i), total:sum + bonusTot(i) * S.N}; });
  const tot = i => `<div class="tot" style="--kit:${S.k[i]}"><div class="tr"><span>مجموع المقاتلين</span><b class="num" data-t="sum${i}">؟؟</b></div>
    <div class="tr"><span>أثر المعلّم لكل مقاتل</span><b class="num" data-t="bn${i}">؟؟</b></div><div class="tr big"><span>القوة الكلية</span><b class="num" data-t="tt${i}">؟؟</b></div></div>`;
  render(topbar() + `<h2 class="ttl">كشف القوى</h2>` + boards({reveal:true}) + `<section class="pair tots">${tot(0)}${tot(1)}</section>
    <p class="hint">المجموع مؤشر فقط. بعد هذا يرتّب كل فريق مقاتليه على الجولات سراً: من يقاتل من في كل جولة، ومتى تفجّر قدرتك القصوى. الأقوى يفوز دائماً، فالحسم في التخطيط وتوقع خطة خصمك.</p>
    <div class="row c"><button class="alt" id="skipRev">تخطّ الكشف</button><button class="go" id="startM" disabled>خطّط للمعركة</button></div>`, () => {
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

/* ---------- الخطة السرية: كل فريق يرتّب مقاتليه على الجولات مرة واحدة ---------- */
const beginFight = () => { S.bt = {plan:[null, null], view:'plan0', k:0}; planView(0); };
const chipHtml = (p, i, o) => { o = o || {}; return `${av(p)}<span class="dt"><b>${esc(p.name)}</b><small><i class="rdot ${p.pos}"></i>${esc(srName(p))}</small></span><span class="rr num">${Math.round((p.r + bonusTot(i)) * 10) / 10}</span>`; };
function planView(i) {
  stopTimers(); lot = null; S.phase = 'battle'; S.bt.view = 'plan' + i; save();
  PL = {i, order:[], ults:[]};
  render(topbar() + `<section class="plan-h" style="--kit:${S.k[i]}"><span class="speed"></span><div><span class="ribbon"><span>خطة القتال السرية</span></span><h2>${T(i)}</h2>
    <p>${T(1 - i)}: أغمض عينيك أو أبعد نظرك عن الشاشة. رتّب مقاتليك على الجولات الآن، وسيُكشف الترتيب معاً مع خصمك.</p></div></section><div id="plan"></div>`, () => { toTop(); drawPlan(); });
}
function drawPlan() {
  const i = PL.i, sq = S.sq[i], N = S.N, um = ultsFor(N), used = new Set(PL.order), free = PL.ults.length < um;
  const bench = sq.map((p, n) => used.has(n) ? '' : `<button class="pchip" data-n="${n}">${chipHtml(p, i)}</button>`).join('') || '<p class="mut">كل المقاتلين وُزّعوا على الجولات.</p>';
  const rows = Array.from({length:N}, (_, k) => { const n = PL.order[k], on = PL.ults.includes(k);
    return `<li class="ps${n == null ? ' empty' : ''}${on ? ' ult' : ''}"><span class="rk num">${k + 1}</span>
      ${n != null ? `<span class="pc">${chipHtml(sq[n], i)}</span>` : '<span class="ph">اختر مقاتلاً من الاحتياط</span>'}
      <span class="pb"><button class="alt sm ub${on ? ' on' : ''}" data-u="${k}" ${n == null || (!on && !free) ? 'disabled' : ''} title="قدرة قصوى (×${ULT}) في هذه الجولة">⚡ قدرة قصوى</button>
      ${n != null ? `<button class="alt sm" data-up="${k}" ${k === 0 ? 'disabled' : ''} aria-label="تقديم">▲</button><button class="alt sm" data-dn="${k}" ${k >= PL.order.length - 1 ? 'disabled' : ''} aria-label="تأخير">▼</button><button class="alt sm" data-rm="${k}" aria-label="إزالة">✕</button>` : ''}</span></li>`; }).join('');
  const op = S.sq[1 - i].map(p => `<span class="oc">${av(p)}<b>${esc(p.name)}</b><span class="num">${p.r}</span></span>`).join('');
  $('plan').innerHTML = `<div class="plan-g"><section class="card bench-c"><h3>الاحتياط</h3><div class="bench">${bench}</div></section>
    <section class="card order-c"><h3>ترتيب الجولات</h3><ol class="plist">${rows}</ol>
      <p class="hint">القدرة القصوى (×${ULT} في الضرر) تُستعمل في الجولة التي تحددها فقط. رصيدك ${um - PL.ults.length} من ${um}. أثر معلّمك +${bonusTot(i)} لكل مقاتل داخل الأرقام.</p></section></div>
    <section class="card opp"><h3>مقاتلو ${T(1 - i)} (قواهم معلنة)</h3><div class="ocs">${op}</div><p class="hint">أثر معلّمهم +${bonusTot(1 - i)} لكل مقاتل، ورصيدهم ${um} قدرة قصوى. لا تعرف أي جولة يختارون لها ولا من يضعون فيها.</p></section>
    <div class="row c"><button class="go" id="ok" ${PL.order.length < N ? 'disabled' : ''}>اعتمد الخطة</button></div>`;
  hydrate(); fx.icons();
  document.querySelectorAll('.pchip').forEach(b => b.onclick = () => { if (PL.order.length < N) { PL.order.push(+b.dataset.n); sndBid(); drawPlan(); } });
  document.querySelectorAll('[data-u]').forEach(b => b.onclick = () => { const k = +b.dataset.u, x = PL.ults.indexOf(k); x >= 0 ? PL.ults.splice(x, 1) : PL.ults.push(k); sndBid(); drawPlan(); });
  document.querySelectorAll('[data-rm]').forEach(b => b.onclick = () => { PL.order.splice(+b.dataset.rm, 1); PL.ults = PL.ults.filter(k => k < PL.order.length); sndPass(); drawPlan(); });
  document.querySelectorAll('[data-up]').forEach(b => b.onclick = () => { const k = +b.dataset.up; [PL.order[k - 1], PL.order[k]] = [PL.order[k], PL.order[k - 1]]; sndBid(); drawPlan(); });
  document.querySelectorAll('[data-dn]').forEach(b => b.onclick = () => { const k = +b.dataset.dn; [PL.order[k + 1], PL.order[k]] = [PL.order[k], PL.order[k + 1]]; sndBid(); drawPlan(); });
  $('ok').onclick = () => { S.bt.plan[i] = {order:[...PL.order], ults:[...PL.ults]}; sndDeal(); PL = null; i === 0 ? handoffView() : showPlan(); };
}
function handoffView() {
  stopTimers(); S.bt.view = 'hand'; save();
  render(topbar() + `<section class="handoff"><span class="speed red"></span><div class="sfx">تم القفل!</div><h2>سلّم الجهاز إلى ${T(1)}</h2>
    <p>خطة ${T(0)} محفوظة وسرية. ${T(0)}: لا تنظر إلى الشاشة بعد الآن.</p><button class="go" id="rdy">أنا جاهز</button></section>`, () => { toTop(); $('rdy').onclick = () => planView(1); });
}
/* ---------- كشف الخطتين: بطاقة النزالات ---------- */
function showPlan() {
  stopTimers(); lot = null; S.phase = 'battle';
  if (!S.bt.out) S.bt.out = planBattle(S.sq, S.co, S.bt.plan);
  S.bt.view = 'show'; save();
  const P = S.bt.plan, N = S.N, row = k => { const a = S.sq[0][P[0].order[k]], b = S.sq[1][P[1].order[k]], ua = P[0].ults.includes(k), ub = P[1].ults.includes(k);
    const side = (p, i, u) => `<span class="mc m${i}${u ? ' ult' : ''}" style="--kit:${S.k[i]}">${av(p)}<span class="dt"><b>${esc(p.name)}</b><small>${esc(srName(p))}</small></span><span class="rr num">${Math.round((p.r + bonusTot(i)) * 10) / 10}</span>${u ? '<i class="ub">⚡</i>' : ''}</span>`;
    return `<li class="mrow" style="animation-delay:${k * .12}s">${side(a, 0, ua)}<span class="mvs"><b class="num">${k + 1}</b><i>VS</i></span>${side(b, 1, ub)}</li>`; };
  render(topbar() + `<section class="plan-h show"><span class="speed red"></span><div><span class="ribbon"><span>بطاقة النزالات</span></span><h2>هذه هي خطتا الفريقين</h2><p>تُلعب الجولات بالترتيب، ومن يسبق إلى ${needWins(N)} جولات يحسم الحرب.</p></div></section>
    <ol class="mlist">${Array.from({length:N}, (_, k) => row(k)).join('')}</ol>
    <div class="row c"><button class="go" id="fgt">ابدأ القتال!</button></div>`, () => { toTop(); $('fgt').onclick = () => { S.bt.k = 0; fightView(0, true); }; });
}

/* ---------- مشهد القتال ---------- */
const stopArena = () => { ARN.forEach(clearTimeout); ARN = []; };
const at = (ms, fn) => ARN.push(setTimeout(() => { if ($('arena')) fn(); }, ms));
const winsUpTo = k => { const w = [0, 0]; S.bt.out.rounds.slice(0, k + 1).forEach(r => { if (r.w >= 0) w[r.w]++; }); return w; };
function fightHud(k, w) {
  const N = S.N, need = needWins(N), tm = i => `<div class="hud-t t${i}" style="--kit:${S.k[i]}"><div class="hud-n"><span class="sbn">${T(i)}</span></div>
    <div class="pips">${Array.from({length:need}, (_, n) => `<i class="${n < w[i] ? 'on' : ''}"></i>`).join('')}</div><div class="hud-m"><small>جولات مربوحة</small></div></div>`;
  return `<section class="hud">${tm(0)}<div class="hud-c"><div class="st">الجولة ${k + 1}</div><div class="ln">من ${N} · الحسم عند ${need}</div></div>${tm(1)}</section>`;
}
function fighterHtml(i, r) {
  const p = i ? r.b : r.a, s = i ? r.sb : r.sa, bn = i ? r.bb : r.ba, u = i ? r.ub : r.ua;
  return `<div class="fgt f${i}${u ? ' ultra' : ''}" id="f${i}" style="--kit:${S.k[i]}"><span class="aura"></span><div class="fg-pan"><div class="fg-img">${av(p)}</div><span class="tone fade"></span><span class="fg-role">${ico(ROLES[p.pos].ic)}${ROLES[p.pos].n}</span></div>
    <div class="fg-plate"><b>${esc(p.name)}</b><small>${esc(srName(p))}</small><span class="chips"><span>القوة ${p.r}</span>${bn ? `<span>معلّم +${bn}</span>` : ''}${u ? `<span class="ult">قدرة قصوى ×${ULT}</span>` : ''}</span></div></div>`;
}
function fightView(k, fresh) {
  stopTimers(); stopArena(); lot = null; S.phase = 'battle'; S.bt.view = 'fight'; S.bt.k = k; save();
  const out = S.bt.out, r = out.rounds[k], N = S.N, last = k >= out.rounds.length - 1;
  const before = k ? winsUpTo(k - 1) : [0, 0], after = winsUpTo(k);
  const hb = i => { const p = i ? r.b : r.a; return `<div class="hb h${i}" style="--kit:${S.k[i]}"><div class="hb-n"><b>${esc(p.name)}</b><small>${T(i)}</small></div><div class="hb-bar"><i id="bar${i}" style="width:100%"></i></div><span class="hb-v num" id="v${i}">100</span></div>`; };
  render(topbar() + `<div id="hudbox">${fightHud(k, fresh ? before : after)}</div>
    <section class="arena" id="arena"><span class="speed"></span><div class="ar-hud">${hb(0)}<div class="ar-rd"><b class="num">${k + 1}</b><small>جولة</small></div>${hb(1)}</div>
      <div class="ar-stage">${fighterHtml(0, r)}<div class="ar-vs"><span class="burst"></span><span class="sfx">VS</span></div>${fighterHtml(1, r)}<div class="fxl" id="fxl"></div><span class="flash" id="flash"></span></div>
      <div class="ar-cap" id="cap">${fresh ? '' : ''}</div></section>
    <div class="row c"><button class="alt" id="skip">تخطّ الرسوم</button><button class="go" id="nx" hidden>${last ? 'اعرف النتيجة' : 'الجولة التالية'}</button></div>`, () => {
    toTop();
    const st = hitSteps(r, 6), win = r.w < 0 ? null : r.w === 0 ? r.a : r.b, lose = r.w < 0 ? null : r.w === 0 ? r.b : r.a;
    const setBar = (i, h) => { const el = $('bar' + i); if (!el) return; el.style.width = h + '%'; el.className = hpCls(h); $('v' + i).textContent = h; };
    const cap = t => { $('cap').innerHTML = t; };
    const fin = (animate) => {
      setBar(0, r.ha); setBar(1, r.hb);
      [0, 1].forEach(i => { const el = $('f' + i); el.classList.remove('atk', 'hit'); el.classList.add(r.w < 0 || r.w !== i ? 'ko' : 'win'); if (r.w < 0) el.classList.add('ko'); });
      $('hudbox').innerHTML = fightHud(k, after);
      cap(r.w < 0 ? 'سقط المقاتلان معاً! لا نقطة لأحد.' : `<b>${esc(win.name)}</b> يُنهي القتال لصالح ${T(r.w)} وتبقى له <b>${r.w === 0 ? r.ha : r.hb}%</b> من صحته.${whyUpset(r).length ? `<span class="cl-up">فاز الأضعف!</span> السبب: ${whyUpset(r).join('، ')}` : ''}`);
      const ko = document.createElement('div'); ko.className = 'ko-t sfx red'; ko.textContent = r.w < 0 ? 'تعادل!' : 'K.O.'; $('fxl').appendChild(ko);
      $('skip').hidden = true; $('nx').hidden = false;
      if (animate) { sndGoal(); $('flash').classList.add('go'); fx.boom({particleCount:35, spread:70, origin:fx.at($('f' + Math.max(0, r.w))), colors:[S.k[Math.max(0, r.w)], '#16130E', '#D4302A']}); }
    };
    $('nx').onclick = () => last ? finish() : fightView(k + 1, true);
    if (!fresh) { fin(false); return; }
    // أحداث: مقدمة ثم تبادل ست ضربات ثم النهاية
    cap(`${r.ua || r.ub ? '⚡ ' + [r.ua ? T(0) : '', r.ub ? T(1) : ''].filter(Boolean).join(' و') + ' يفجّر القدرة القصوى!' : 'استعدّا للمواجهة!'}`);
    sndWhistle();
    const T0 = 1200, GAP = 720; let t = T0;
    st.forEach((s, n) => {
      at(t, () => { $('f0').classList.add('atk'); at(110, () => { $('f1').classList.add('hit'); sndBid(); setBar(1, s.hb); float(1, s.da); at(260, () => $('f1').classList.remove('hit')); }); at(280, () => $('f0').classList.remove('atk')); });
      at(t + 330, () => { $('f1').classList.add('atk'); at(110, () => { $('f0').classList.add('hit'); sndPass(); setBar(0, s.ha); float(0, s.db); at(260, () => $('f0').classList.remove('hit')); }); at(280, () => $('f1').classList.remove('atk')); });
      if (n < st.length - 1) at(t + 120, () => cap(['يتبادلان الضربات...', 'ضربة قوية!', 'لا أحد يتراجع!', 'الجو يشتعل!', 'اللحظة الحاسمة!'][n % 5]));
      t += GAP;
    });
    at(t + 200, () => fin(true));
    $('skip').onclick = () => { stopArena(); fin(false); };
  });
}
function float(i, d) {
  if (!d || d < 1) return;
  const el = document.createElement('div'); el.className = 'dmg f' + i; el.textContent = '-' + d; $('fxl').appendChild(el);
  setTimeout(() => el.remove(), 900);
}

/* ---------- النتيجة ---------- */
function finish() {
  stopTimers(); stopArena();
  const out = S.bt.out, w = out.w, rs = out.rounds, sum = a => a.reduce((x, y) => x + y, 0);
  const mv = mvpOf(rs, w);
  const stats = {wins:[...out.wins], avg:[0, 1].map(i => Math.round(sum(rs.map(r => i ? r.sb : r.sa)) / rs.length)),
    top:[0, 1].map(i => Math.max(0, ...rs.filter(r => r.w === i).map(r => i ? r.hb : r.ha))), ults:[0, 1].map(i => S.bt.plan[i].ults.filter(k => k < rs.length).length),
    up:[0, 1].map(i => rs.filter(r => r.w === i && whyUpset(r).length).length)};
  W[w]++;
  S.res = {w, wins:[...out.wins], rounds:rs, plan:S.bt.plan, stats, mvp:mv ? {p:mv.p, h:mv.h, k:mv.k, t:w} : null};
  S.phase = 'final'; save();
  result(true);
}
function result(fresh) {
  stopTimers(); stopArena(); lot = null;
  const R = S.res, w = R.w, st = R.stats;
  const row = (lbl, a, b) => { const t = (a + b) || 1; return `<div class="sr"><span class="sl">${lbl}</span><div class="sv"><b class="num">${a}</b>
    <div class="sbar"><i style="width:${a / t * 100}%;background:${S.k[0]}"></i><i style="width:${b / t * 100}%;background:${S.k[1]}"></i></div><b class="num">${b}</b></div></div>`; };
  const mv = R.mvp;
  const list = R.rounds.map((r, n) => { const wn = r.w < 0 ? null : r.w === 0 ? r.a : r.b;
    return `<li class="rl"><span class="n num">${n + 1}</span><span class="who"><b>${esc(r.a.name)}</b> (${Math.round(r.sa)}) ✕ <b>${esc(r.b.name)}</b> (${Math.round(r.sb)})<br>
    <span class="mut">${wn ? `فاز ${esc(wn.name)} وبقي له ${r.w === 0 ? r.ha : r.hb}%` : 'تعادل'}${r.ua || r.ub ? ' · قدرة قصوى' : ''}${whyUpset(r).length ? ' · فوز الأضعف: ' + whyUpset(r).join('، ') : ''}</span></span><span class="pw2 win" style="color:${r.w < 0 ? 'inherit' : S.k[r.w]}">${r.w < 0 ? 'تعادل' : esc(S.n[r.w])}</span></li>`; }).join('');
  render(topbar() + `<section class="hud"><div class="hud-t t0" style="--kit:${S.k[0]}"><div class="hud-n"><span class="sbn">${T(0)}</span></div><div class="hud-m"><b class="num">${R.wins[0]}</b></div></div>
      <div class="hud-c"><div class="st">انتهت الحرب</div></div><div class="hud-t t1" style="--kit:${S.k[1]}"><div class="hud-n"><span class="sbn">${T(1)}</span></div><div class="hud-m"><b class="num">${R.wins[1]}</b></div></div></section>
    <section class="final" style="--kit:${S.k[w]}"><span class="speed red"></span><div class="sfx">انتصار!</div><div class="fw">الفائز: ${T(w)}</div>
      <p class="sub">النتيجة الإجمالية بين الفريقين ${pair(W[0], W[1])}</p>
      <div class="row c"><button id="again" class="go">حرب أخرى بنفس الفريقين</button><button class="alt" id="newg">لعبة جديدة</button></div></section>
    ${mv ? `<section class="mvp" style="--kit:${S.k[mv.t]}"><div class="mvt"><span class="ribbon"><span>بطل الحرب</span></span><h3>${esc(mv.p.name)}</h3><p>${T(mv.t)} · ${esc(srName(mv.p))}</p><p>فاز في الجولة <b class="num">${mv.k + 1}</b> وبقي له <b class="num">${mv.h}%</b> من صحته</p><p class="mut">قوته الأصلية: <b class="num">${mv.p.r}</b></p></div>${fcard(mv.p, {rating:mv.p.r, w:150})}</section>` : ''}
    <section class="card"><h3>جولات الحرب</h3><ol class="rlist" style="padding:0">${list}</ol></section>
    <section class="card stats"><h3>إحصائيات الحرب</h3>${row('الجولات المربوحة', st.wins[0], st.wins[1])}${row('متوسط القوة الفعلية', st.avg[0], st.avg[1])}${row('أعلى صحة متبقية بعد فوز', st.top[0], st.top[1])}${row('قدرات قصوى استُعملت', st.ults[0], st.ults[1])}${row('انتصارات الأضعف', st.up[0], st.up[1])}</section>`, () => {
    toTop(); $('again').onclick = () => beginFight(); $('newg').onclick = () => home();
    if (fresh) { sndGoal(); fx.cannons([S.k[w], '#16130E', '#D4302A'], 2000); }
  });
}
