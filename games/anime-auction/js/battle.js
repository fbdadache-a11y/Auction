/* ========== المعركة: كشف القوى، اختيار سري كل جولة، اشتباك، نتيجة ========== */
const KEYS = [['1', '2', '3'], ['8', '9', '0']];   // مفاتيح لوحة المفاتيح لكل فريق (حين تقل الخيارات عن 4)
const hpCls = h => h < 35 ? 'lo' : h < 65 ? 'mid' : '';
const hpBar = h => `<span class="hpb ${hpCls(h)}"><i style="width:${h}%"></i></span>`;
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
    <p class="hint">المجموع مؤشر فقط. في المعركة يحمل كل مقاتل جراحه إلى المواجهة التالية، فالأقوى يفوز لكنه يخرج منهكاً، وحسن توزيع مقاتليك هو ما يحسم الحرب.</p>
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
/* cfg: {title, sub, note, sides:[{label, opts:[{k, html, pick}], auto:{k, pick, text}}], verdict(picks), hold}
   كل فريق يضغط في نصفه، وبعد اختيار الاثنين يُكشفان معاً ثم يُستدعى cb(picks).
   الجانب الذي له خيار واحد فقط (auto) يُحسم تلقائياً. */
function duel(box, cfg, cb) {
  const picks = [null, null]; let done = false;
  const auto = i => cfg.sides[i].auto;
  const keyed = i => !auto(i) && cfg.sides[i].opts.length <= 3;
  const ctl = {t:0, cancel() { done = true; clearTimeout(ctl.t); document.removeEventListener('keydown', onKey); box.innerHTML = ''; }};
  const side = i => { const s = cfg.sides[i];
    return `<div class="dside${auto(i) ? ' ok' : ''}" data-i="${i}" style="--kit:${S.k[i]}"><div class="dsh"><b>${T(i)}</b><span>${s.label}</span></div>
    ${auto(i) ? `<div class="dlock">${s.auto.text}</div>` : `<div class="dopts${s.opts.length > 3 ? '' : ' one'}">${s.opts.map((o, n) => `<button class="dopt" data-n="${n}">${o.html}${keyed(i) ? `<kbd>${KEYS[i][n]}</kbd>` : ''}</button>`).join('')}</div>`}</div>`; };
  box.innerHTML = `<section class="duel" role="group" aria-label="${esc(cfg.title.replace(/<[^>]+>/g, ''))}"><div class="dh"><h3>${cfg.title}</h3>${cfg.sub ? `<p>${cfg.sub}</p>` : ''}</div>
    <div class="dsides">${side(0)}${side(1)}</div><p class="dnote">${cfg.note || 'كل لاعب يختار من نصفه ولا ينظر إلى خيار الآخر.'}</p></section>`;
  hydrate();
  const reveal = () => {
    done = true; document.removeEventListener('keydown', onKey);
    [0, 1].forEach(i => { const o = auto(i) ? cfg.sides[i].auto : cfg.sides[i].opts.find(x => x.k === picks[i]); box.querySelector(`.dside[data-i="${i}"] .dlock`).outerHTML = `<div class="dpick">${o.pick}</div>`; });
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
  [0, 1].forEach(i => { if (auto(i)) picks[i] = auto(i).k; });
  if (picks[0] !== null && picks[1] !== null) { ctl.t = setTimeout(reveal, 300); return ctl; }
  box.querySelectorAll('.dopt').forEach(b => b.onclick = () => lock(+b.closest('.dside').dataset.i, +b.dataset.n));
  document.addEventListener('keydown', onKey);
  return ctl;
}

/* ---------- حالة الحرب ---------- */
const rolePair = (a, b) => BEATS[a] === b ? `${ROLES[a].n} يغلب ${ROLES[b].n}` : BEATS[b] === a ? `${ROLES[b].n} يغلب ${ROLES[a].n}` : 'لا أفضلية للنوع';
const alive = i => S.bt.hp[i].filter(h => h > 0).length;
const beginFight = () => {
  S.bt = {hp:S.sq.map(s => s.map(() => HP0)), kills:S.sq.map(s => s.map(() => 0)), dealt:S.sq.map(s => s.map(() => 0)), ult:[ultsFor(S.N), ultsFor(S.N)], rounds:[], view:'pick'};
  pickView();
};
function fightHead() {
  const B = S.bt, cl = B.view === 'clash', rn = cl ? B.rounds.length : B.rounds.length + 1;
  const tm = i => `<div class="sbt" style="--kit:${S.k[i]}"><div class="sbh"><span class="sbn">${T(i)}</span></div>
    <div class="sbm num">${alive(i)}<small> / ${S.N}</small></div><div class="sbs">في الميدان · قدرة قصوى <b class="num">${B.ult[i]}</b></div></div>`;
  return `<section class="sb">${tm(0)}<div class="sbc"><div class="st">${'مواجهة ' + rn}</div><div class="ln hm">يفوز من يُسقط كل مقاتلي خصمه</div></div>${tm(1)}</section>
    <div class="tracker" style="--kit0:${S.k[0]};--kit1:${S.k[1]}">${B.rounds.map(r => `<i class="w${r.w < 0 ? 'x' : r.w}"></i>`).join('')}${cl ? '' : '<i class="cur"></i>'}</div>`;
}
function rostersHTML() {
  const B = S.bt;
  return `<section class="rosters">${[0, 1].map(i => `<div class="rst" style="--kit:${S.k[i]}"><h4>${T(i)}</h4><ul>${S.sq[i].map((p, n) => {
    const h = B.hp[i][n];
    return `<li class="${h <= 0 ? 'used' : ''}" title="${esc(p.name)}">${av(p)}${hpBar(h)}<small class="num">${h > 0 ? h : ''}</small></li>`; }).join('')}</ul></div>`).join('')}</section>`;
}
const optHtml = (p, h) => `${av(p)}<span class="dt"><b>${esc(p.name)}</b><small><i class="rdot ${p.pos}"></i>${ROLES[p.pos].n} · صحة ${h}%</small></span><span class="rr num">${p.r}</span>`;
function pickView() {
  stopTimers(); lot = null; S.phase = 'battle'; S.bt.view = 'pick'; save();
  const B = S.bt;
  const side = i => { const opts = S.sq[i].map((p, n) => ({k:n, html:optHtml(p, B.hp[i][n]), pick:`${av(p)}<span>${esc(p.name)}</span>`})).filter(o => B.hp[i][o.k] > 0);
    return opts.length === 1 ? {label:'مقاتلك الأخير', opts, auto:{k:opts[0].k, pick:opts[0].pick, text:'ينزل مقاتلك الأخير'}} : {label:'اختر مقاتل هذه المواجهة', opts}; };
  const verdict = pk => { const a = S.sq[0][pk[0]], b = S.sq[1][pk[1]];
    return `${esc(a.name)} <b>✕</b> ${esc(b.name)}<br><small>${rolePair(a.pos, b.pos)}</small>`; };
  render(topbar() + fightHead() + `<ul class="rps"><li><b>القتالي</b> يغلب صاحب القدرات</li><li><b>صاحب القدرات</b> يغلب السريع</li><li><b>السريع</b> يغلب القتالي</li><li class="mut">النوع المتفوق يضرب أقوى (×${ROLE_EDGE})</li></ul>
    ${rostersHTML()}<div id="duelBox"></div>`, () => {
    toTop();
    MT = {ctl:duel($('duelBox'), {title:`المواجهة ${B.rounds.length + 1}: اختر مقاتلك سراً`, sub:'القوى والصحة مكشوفة، فالحسم في التوقع وإدارة الجراح.', sides:[side(0), side(1)], verdict, hold:1500}, pk => trumpView(pk))};
  });
}
/* ---------- القدرة القصوى: قرار سري ثانٍ بعد كشف المقاتلين ---------- */
function trumpView(pk) {
  const B = S.bt, a = S.sq[0][pk[0]], b = S.sq[1][pk[1]], ha = B.hp[0][pk[0]], hb = B.hp[1][pk[1]];
  if (!B.ult[0] && !B.ult[1]) return fightRound(pk, [false, false]);
  stopTimers(); lot = null; S.phase = 'battle'; B.view = 'trump'; B.pk = pk; save();
  const sim = (x, y) => duelSim(a, b, S.co[0], S.co[1], ha, hb, x, y);
  const cell = r => r.w < 0 ? '<td class="x">يسقطان معاً</td>' : `<td style="--kit:${S.k[r.w]}"><b>${T(r.w)}</b> يفوز<small>ينجو بـ${r.w === 0 ? r.ha : r.hb}%</small></td>`;
  const A = B.ult[0] ? [false, true] : [false], Bc = B.ult[1] ? [false, true] : [false];
  const tbl = `<table class="fcast"><caption>ماذا يحدث؟ (حاسبة المواجهة)</caption><thead><tr><th></th>${Bc.map(y => `<th>${T(1)}<small>${y ? 'يستخدمها' : 'يحتفظ بها'}</small></th>`).join('')}</tr></thead>
    <tbody>${A.map(x => `<tr><th>${T(0)}<small>${x ? 'يستخدمها' : 'يحتفظ بها'}</small></th>${Bc.map(y => cell(sim(x, y))).join('')}</tr>`).join('')}</tbody></table>`;
  const f = (p, h, i) => `<div class="mu" style="--kit:${S.k[i]}"><b class="sbn">${T(i)}</b>${fcard(p, {rating:p.r, w:130})}${hpBar(h)}<span class="hpt num">الصحة ${h}%</span></div>`;
  const side = i => B.ult[i] ? {label:`رصيدك ${B.ult[i]}`, opts:[{k:true, html:`<span class="dt"><b>قدرة قصوى!</b><small>ضرر ×${ULT} هنا فقط</small></span>`, pick:'قدرة قصوى!'}, {k:false, html:`<span class="dt"><b>احتفظ بها</b><small>للمواجهة الحاسمة</small></span>`, pick:'احتفظ'}]}
    : {label:'لا رصيد', opts:[], auto:{k:false, pick:'لا رصيد', text:'استنفدت قدرتك القصوى'}};
  const verdict = u => `${T(0)}: <b>${u[0] ? 'قدرة قصوى!' : 'بلا قدرة'}</b> ✕ ${T(1)}: <b>${u[1] ? 'قدرة قصوى!' : 'بلا قدرة'}</b>${u[0] && u[1] ? '<br><small>تصادمت القدرتان فتعادل أثرهما</small>' : ''}`;
  render(topbar() + fightHead() + `<section class="matchup">${f(a, ha, 0)}<div class="cl-vs"><span class="burst"></span><span class="sfx">VS</span></div>${f(b, hb, 1)}</section>
    ${tbl}<div id="duelBox"></div>`, () => {
    toTop();
    MT = {ctl:duel($('duelBox'), {title:'هل تفجّر قدرتك القصوى الآن؟', sub:'القرار سري ويُكشف معاً. القدرة تُستعمل مرة واحدة من رصيدك.', sides:[side(0), side(1)], verdict, hold:1500}, u => fightRound(pk, [!!u[0], !!u[1]]))};
  });
}
function fightRound(pk, ul) {
  const B = S.bt, a = S.sq[0][pk[0]], b = S.sq[1][pk[1]];
  const r = duelSim(a, b, S.co[0], S.co[1], B.hp[0][pk[0]], B.hp[1][pk[1]], ul[0], ul[1]);
  r.ia = pk[0]; r.ib = pk[1];
  B.hp[0][pk[0]] = r.ha; B.hp[1][pk[1]] = r.hb;
  B.dealt[0][pk[0]] += r.dmgA; B.dealt[1][pk[1]] += r.dmgB;
  if (r.hb <= 0) B.kills[0][pk[0]]++;
  if (r.ha <= 0) B.kills[1][pk[1]]++;
  if (ul[0]) B.ult[0]--; if (ul[1]) B.ult[1]--;
  r.rest = restAll(B.hp, pk);
  B.rounds.push(r); B.view = 'clash'; delete B.pk; save();
  clashView(true);
}
const SFX = ['بووم!', 'طاخ!', 'كراش!', 'باااف!', 'زوووم!'];
function clashView(fresh) {
  stopTimers(); lot = null; S.phase = 'battle';
  const B = S.bt, r = B.rounds[B.rounds.length - 1], n = B.rounds.length;
  const fin = battleWinner(B.hp, S.sq) !== null;
  const win = r.w < 0 ? null : r.w === 0 ? r.a : r.b, lose = r.w < 0 ? null : r.w === 0 ? r.b : r.a;
  const why = whyUpset(r);
  const chips = i => { const bn = i ? r.bb : r.ba, e = r.edge === i, u = i ? r.ub : r.ua;
    return `<span class="chips">${bn ? `<span>معلّم +${bn}</span>` : ''}${e ? `<span class="ed">نوع ×${ROLE_EDGE}</span>` : ''}${u ? `<span class="ult">قدرة قصوى ×${ULT}</span>` : ''}</span>`; };
  const side = (i, cls) => { const p = i ? r.b : r.a, h0 = i ? r.hpB : r.hpA, h1 = i ? r.hb : r.ha, s = i ? r.sb : r.sa, dead = h1 <= 0;
    return `<div class="cl-side ${cls} ${dead ? 'lose' : 'win'}" style="--kit:${S.k[i]}"><b class="sbn">${T(i)}</b><div class="cwrap">${fcard(p, {rating:p.r})}${dead ? '<span class="ko sfx red">هُزم</span>' : ''}</div>
      <div class="pw"><span class="parts">القوة الفعلية</span><span class="tt num">${(Math.round(s * 10) / 10)}</span>${chips(i)}
      ${hpBar(fresh ? h0 : h1).replace('<i style="', `<i data-to="${h1}" style="`)}<span class="hpt num" data-from="${h0}" data-to="${h1}">${fresh ? h0 : h1}%</span></div></div>`; };
  const note = r.w < 0 ? 'سقط المقاتلان معاً!' : `انتصر <b>${esc(win.name)}</b> على ${esc(lose.name)} لصالح ${T(r.w)} وبقي له <b>${r.w === 0 ? r.ha : r.hb}%</b> من صحته.`;
  render(topbar() + fightHead() + `<section class="clash${fresh ? ' shake' : ''}"><span class="speed ${fresh ? 'red' : ''}"></span><span class="flash"></span>
    <div class="clash-g">${side(0, 'a')}<div class="cl-vs"><span class="burst"></span><span class="sfx">VS</span></div>${side(1, 'b')}</div>
    <div class="cl-out"><span class="sfx">${SFX[(n + r.a.r) % SFX.length]}</span><p>${note}</p>
      ${r.edge !== null ? `<span class="cl-edge">${rolePair(r.a.pos, r.b.pos)} (ضرر ×${ROLE_EDGE})</span>` : '<span class="cl-edge">لا أفضلية للنوع</span>'}
      ${why.length ? `<p class="why"><span class="cl-up">فاز الأضعف!</span> السبب: ${why.join('، ')}</p>` : ''}</div></section>
    ${rostersHTML()}<p class="hint" style="text-align:center">المقاتلون الأحياء الذين لم يشاركوا استراحوا واستعادوا ${HEAL}% من صحتهم.</p>
    <div class="row c"><button class="go" id="nx">${fin ? 'اعرف النتيجة' : 'المواجهة التالية'}</button></div>`, () => {
    toTop();
    if (fresh) {
      sndDeal(); setTimeout(() => sndGoal(), 650);
      const T0 = 900, DUR = 1300;
      setTimeout(() => document.querySelectorAll('.pw .hpb i[data-to]').forEach(el => { el.style.width = el.dataset.to + '%'; el.parentNode.className = 'hpb ' + hpCls(+el.dataset.to); }), T0);
      document.querySelectorAll('.pw .hpt').forEach(el => { const f = +el.dataset.from, t = +el.dataset.to, t0 = Date.now() + T0;
        const iv = setInterval(() => { const k = Math.min(1, Math.max(0, (Date.now() - t0) / DUR)); el.textContent = Math.round(f + (t - f) * k) + '%'; if (k >= 1) clearInterval(iv); }, 40); });
      fx.boom({particleCount:40, spread:70, origin:fx.at(document.querySelector(`.cl-side.win`)), colors:[S.k[Math.max(0, r.w)], '#16130E', '#D4302A']});
    } else document.querySelectorAll('.pw .hpb i[data-to]').forEach(el => el.style.width = el.dataset.to + '%');
    $('nx').onclick = () => fin ? finish() : pickView();
  });
}

/* ---------- النتيجة ---------- */
function finish() {
  stopTimers();
  const B = S.bt, w = battleWinner(B.hp, S.sq), rs = B.rounds;
  const mv = mvpOf(S.sq, B.kills, B.dealt, w);
  const sum = a => a.reduce((x, y) => x + y, 0);
  const stats = {alive:[0, 1].map(alive), hp:[0, 1].map(i => sum(B.hp[i])), kills:[0, 1].map(i => sum(B.kills[i])), dealt:[0, 1].map(i => sum(B.dealt[i])),
    ults:[0, 1].map(i => ultsFor(S.N) - B.ult[i]), up:[0, 1].map(i => rs.filter(r => r.w === i && whyUpset(r).length).length)};
  W[w]++;
  S.res = {w, rounds:rs, stats, mvp:mv ? {p:mv.p, k:mv.k, d:mv.d, t:w} : null};
  S.phase = 'final'; save();
  result(true);
}
function result(fresh) {
  stopTimers(); lot = null;
  const R = S.res, w = R.w, st = R.stats;
  const row = (lbl, a, b) => { const t = (a + b) || 1; return `<div class="sr"><span class="sl">${lbl}</span><div class="sv"><b class="num">${a}</b>
    <div class="sbar"><i style="width:${a / t * 100}%;background:${S.k[0]}"></i><i style="width:${b / t * 100}%;background:${S.k[1]}"></i></div><b class="num">${b}</b></div></div>`; };
  const mv = R.mvp;
  const list = R.rounds.map((r, n) => { const wn = r.w < 0 ? null : r.w === 0 ? r.a : r.b;
    return `<li class="rl"><span class="n num">${n + 1}</span><span class="who"><b>${esc(r.a.name)}</b> (${r.hpA}%) ✕ <b>${esc(r.b.name)}</b> (${r.hpB}%)<br>
    <span class="mut">${wn ? `فاز ${esc(wn.name)} وبقي له ${r.w === 0 ? r.ha : r.hb}%` : 'سقط المقاتلان معاً'}${r.ua || r.ub ? ' · قدرة قصوى' : ''}</span></span><span class="pw2 win" style="color:${r.w < 0 ? 'inherit' : S.k[r.w]}">${r.w < 0 ? 'تعادل' : esc(S.n[r.w])}</span></li>`; }).join('');
  render(topbar() + `<section class="sb"><div class="sbt" style="--kit:${S.k[0]}"><div class="sbh"><span class="sbn">${T(0)}</span></div><div class="sbm num">${st.alive[0]}</div><div class="sbs">ناجون</div></div>
      <div class="sbc"><div class="st">انتهت الحرب</div></div><div class="sbt" style="--kit:${S.k[1]}"><div class="sbh"><span class="sbn">${T(1)}</span></div><div class="sbm num">${st.alive[1]}</div><div class="sbs">ناجون</div></div></section>
    <section class="final" style="--kit:${S.k[w]}"><span class="speed red"></span><div class="sfx">انتصار!</div><div class="fw">الفائز: ${T(w)}</div>
      <p class="sub">النتيجة الإجمالية بين الفريقين ${pair(W[0], W[1])}</p>
      <div class="row c"><button id="again" class="go">حرب أخرى بنفس الفريقين</button><button class="alt" id="newg">لعبة جديدة</button></div></section>
    ${mv ? `<section class="mvp" style="--kit:${S.k[mv.t]}"><div class="mvt"><span class="ribbon"><span>بطل الحرب</span></span><h3>${esc(mv.p.name)}</h3><p>${T(mv.t)} · ${esc(srName(mv.p))}</p><p>أسقط <b class="num">${mv.k}</b> ${mv.k === 1 ? 'مقاتلاً' : 'مقاتلين'} وألحق ضرراً <b class="num">${mv.d}</b></p><p class="mut">قوته الأصلية: <b class="num">${mv.p.r}</b></p></div>${fcard(mv.p, {rating:mv.p.r, w:150})}</section>` : ''}
    <section class="card"><h3>مواجهات الحرب</h3><ol class="rlist" style="padding:0">${list}</ol></section>
    <section class="card stats"><h3>إحصائيات الحرب</h3>${row('مقاتلون ناجون', st.alive[0], st.alive[1])}${row('مقاتلون أُسقطوا', st.kills[0], st.kills[1])}${row('الضرر الملحق', st.dealt[0], st.dealt[1])}${row('الصحة المتبقية', st.hp[0], st.hp[1])}${row('قدرات قصوى استُعملت', st.ults[0], st.ults[1])}${row('انتصارات الأضعف', st.up[0], st.up[1])}</section>`, () => {
    toTop(); $('again').onclick = () => beginFight(); $('newg').onclick = () => home();
    if (fresh) { sndGoal(); fx.cannons([S.k[w], '#16130E', '#D4302A'], 2000); }
  });
}
