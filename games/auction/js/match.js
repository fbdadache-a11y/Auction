/* ========== المباراة: أسلوب اللعب، فرص خطيرة باختيار سري، استراحة، ركلات ترجيح، ملخص ========== */
const pickR = a => a[Math.floor(Math.random() * a.length)];
const nm = p => esc(p.name);
const ICON = {goal:'⚽', save:'🧤', miss:'💨', block:'🛡️'};
const KEYS = [['1', '2', '3'], ['8', '9', '0']];   // مفاتيح لوحة المفاتيح لكل فريق
let MT = null;                                    // حالة المباراة الجارية (لا تُحفظ)

function match() { stopTimers(); lot = null; S.stage = 6; reveal(); }

/* ---------- كشف التقييمات ---------- */
function reveal() {
  S.phase = 'reveal'; save();
  const R = [0, 1].map(i => { const sum = S.sq[i].reduce((a, p) => a + p.r, 0); return {sum, bonus:bonus(i), total:sum + bonus(i)}; });
  const tot = i => `<div class="tot" style="--kit:${S.k[i]}"><div class="tr"><span>مجموع اللاعبين</span><b class="num" data-t="sum${i}">؟؟</b></div>
    <div class="tr"><span>أثر المدرب</span><b class="num" data-t="bn${i}">؟؟</b></div><div class="tr big"><span>القوة الكلية</span><b class="num" data-t="tt${i}">؟؟</b></div></div>`;
  render(topbar() + `<h2 class="ttl">كشف التقييمات</h2>` + pitches({reveal:true}) + `<section class="pair tots">${tot(0)}${tot(1)}</section>
    <div class="row c"><button class="alt" id="skipRev">تخطّ الكشف</button><button class="go" id="startM" disabled>اختيار أسلوب اللعب</button></div>`, () => {
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
        fx.count(document.querySelector(`[data-t="tt${i}"]`), R[i].total, 0, 1);
      });
      $('startM').disabled = false; $('skipRev').disabled = true; sndDeal();
    };
    let k = 0;
    TM = setInterval(() => { if (k >= q.length) fin(); else flip(q[k++]); }, 230);
    $('skipRev').onclick = fin;
    $('startM').onclick = () => tactics();
  });
}

/* ---------- الاختيار الثنائي السري: نصف شاشة لكل فريق ---------- */
/* cfg: {title, sub, note, sides:[{label, opts:[{k,n,h}], zone}, ...], verdict(picks), hold}
   كل فريق يضغط في نصفه، وبعد اختيار الاثنين يُكشفان معاً ثم يُستدعى cb(picks). */
function duel(box, cfg, cb) {
  const picks = [null, null]; let done = false;
  const ctl = {t:0, cancel() { done = true; clearTimeout(ctl.t); document.removeEventListener('keydown', onKey); box.innerHTML = ''; }};
  const side = i => { const s = cfg.sides[i]; return `<div class="dside" data-i="${i}" style="--kit:${S.k[i]}"><div class="dsh"><b>${T(i)}</b><span>${s.label}</span></div>
    <div class="dopts${s.zone ? ' z' : ''}">${s.opts.map((o, n) => `<button class="dopt" data-n="${n}"><b>${o.n}</b>${o.h ? `<small>${o.h}</small>` : ''}<kbd>${KEYS[i][n]}</kbd></button>`).join('')}</div></div>`; };
  box.innerHTML = `<section class="duel" role="group" aria-label="${esc(cfg.title.replace(/<[^>]+>/g, ''))}"><div class="dh"><h3>${cfg.title}</h3>${cfg.sub ? `<p>${cfg.sub}</p>` : ''}</div>
    <div class="dsides">${side(0)}${side(1)}</div><p class="dnote">${cfg.note || 'كل لاعب يختار من نصفه ولا ينظر إلى خيار الآخر.'}</p></section>`;
  const reveal = () => {
    done = true; document.removeEventListener('keydown', onKey);
    [0, 1].forEach(i => { const o = cfg.sides[i].opts.find(x => x.k === picks[i]); box.querySelector(`.dside[data-i="${i}"] .dlock`).outerHTML = `<div class="dpick">${o.n}</div>`; });
    box.querySelector('.dnote').outerHTML = `<p class="dverdict">${cfg.verdict ? cfg.verdict(picks) : ''}</p>`;
    ctl.t = setTimeout(() => { box.innerHTML = ''; cb(picks); }, cfg.hold || 1300);
  };
  const lock = (i, n) => {
    if (done || picks[i] !== null) return;
    picks[i] = cfg.sides[i].opts[n].k; sndBid();
    const el = box.querySelector(`.dside[data-i="${i}"]`); el.classList.add('ok');
    el.querySelector('.dopts').outerHTML = '<div class="dlock">✓ تم الاختيار</div>';
    if (picks[0] !== null && picks[1] !== null) reveal();
  };
  const onKey = e => { [0, 1].forEach(i => { const n = KEYS[i].indexOf(e.key); if (n >= 0 && n < cfg.sides[i].opts.length) lock(i, n); }); };
  box.querySelectorAll('.dopt').forEach(b => b.onclick = () => lock(+b.closest('.dside').dataset.i, +b.dataset.n));
  document.addEventListener('keydown', onKey);
  return ctl;
}

/* ---------- أسلوب اللعب ---------- */
const stanceSide = () => ({label:'أسلوب الفريق', opts:Object.entries(STANCES).map(([k, s]) => ({k, n:s.n, h:`يغلب ${STANCES[s.beats].n} · يخسر أمام ${STANCES[s.loses].n}`}))});
const stanceVerdict = p => {
  const edge = STANCES[p[0]].beats === p[1] ? `الأفضلية لـ ${T(0)}` : STANCES[p[1]].beats === p[0] ? `الأفضلية لـ ${T(1)}` : 'لا أفضلية لأحد';
  return `${T(0)}: <b>${STANCES[p[0]].n}</b> ✕ ${T(1)}: <b>${STANCES[p[1]].n}</b><br><small>${edge}</small>`;
};
function tactics() {
  stopTimers(); lot = null; S.phase = 'tactics'; save();
  render(topbar() + `<h2 class="ttl">أسلوب اللعب</h2>
    <ul class="rps"><li>الهجوم يغلب التوازن</li><li>التوازن يغلب الدفاع</li><li>الدفاع يغلب الهجوم</li></ul>
    <div id="duelBox"></div>`, () => {
    toTop();
    MT = {ctl:duel($('duelBox'), {title:'اختر أسلوب فريقك للشوط الأول', sides:[stanceSide(), stanceSide()], verdict:stanceVerdict, hold:1700}, picks => live(picks))};
  });
}

/* ---------- المباراة الحية ---------- */
const pitchStrip = () => `<div class="mp" id="mp" aria-hidden="true"><i class="gl l" style="--c:${S.k[1]}"></i><i class="gl r" style="--c:${S.k[0]}"></i>
  <i class="pa l"></i><i class="pa r"></i><i class="mc"></i><b class="bl" id="bl"></b><span class="mt" id="mt"></span></div>`;
function say(e) {
  const w = nm(e.who), a = e.assist ? nm(e.assist) : '', g = e.def ? nm(e.def) : '';
  if (e.type === 'goal') {
    const by = {shot:[`${w} يطلقها قذيفة من خارج المنطقة`, `تسديدة صاروخية من ${w}`], thru:[`${w} ينفرد بالحارس ويسجّل`, `تمريرة بينية تفتح الدفاع و${w} لا يخطئ`],
      cross:[`${w} يرتقي ويسدد برأسه في الشباك`, `عرضية متقنة و${w} يحوّلها`]}[e.atk] || [`${w} يسجّل`, `هدف من ${w}`, `${w} يهزّ الشباك`];
    return `<b>هدف!</b> ${pickR(by)}${a ? ` <span class="mut">· صنعه ${a}</span>` : ''}`;
  }
  if (e.type === 'save') return pickR([`${g} يتألق ويصدّ تسديدة ${w}`, `تصدٍّ رائع من ${g}`, `${w} يسدد و${g} له بالمرصاد`]);
  if (e.type === 'miss') return pickR([`${w} يسدد وتمرّ الكرة بجوار القائم`, `${w} يعلوها فوق العارضة`, `فرصة ضائعة لـ ${w}`]);
  return pickR([`${nm(e.def)} يعترض تسديدة ${w}`, `${nm(e.def)} يبعد الكرة في اللحظة الأخيرة`]);
}
const evLine = (e, fresh) => `<li class="ev ${e.type}${e.type === 'goal' ? '' : ' dim'}" style="--kit:${S.k[e.t]}"><span class="num"><span class="ltr">${e.min}'</span></span>
  <span>${ICON[e.type]} ${say(e)} <span class="mut">· ${T(e.t)}</span>${e.key ? ' <span class="keytag">فرصة خطيرة</span>' : ''}</span></li>`;

function live(st) {
  stopTimers();
  S.phase = 'live'; save();
  const id = Math.random();
  MT = {id, st, st0:[...st], P:[power(S.sq[0], S.co[0]), power(S.sq[1], S.co[1])], plan:schedule(), pi:0, m:0, sc:[0, 0], ev:[], sh:[0, 0], ctl:null};
  const sbt = i => `<div class="sbt" style="--kit:${S.k[i]}"><div class="sbh"><span class="sbn">${T(i)}</span></div><div class="sbm num" id="g${i}">0</div><div class="stn" id="stn${i}"></div></div>`;
  render(topbar() + `<section class="sb live">${sbt(0)}<div class="sbc"><div class="clock num" id="clk"><span class="ltr">0'</span></div><div class="ln" id="half">الشوط الأول</div><div class="prog"><i id="cp"></i></div></div>${sbt(1)}</section>
    ${pitchStrip()}<div id="duelBox"></div>
    <ul class="feed" id="feed"></ul><div class="row c" id="lc"><button class="alt" id="skipM">تخطّ إلى النهاية</button></div>`, () => {
    toTop();
    const feed = $('feed');
    const add = (html, cls, kit) => feed.insertAdjacentHTML('afterbegin', `<li class="ev ${cls || ''}" ${kit ? `style="--kit:${kit}"` : ''}>${html}</li>`);
    const setStn = () => [0, 1].forEach(i => $('stn' + i).textContent = STANCES[MT.st[i]].n);
    setStn();
    const ballTo = (a, type) => {
      const b = $('bl'), mp = $('mp'); if (!b) return;
      const gx = a === 0 ? 4 : 96, nx = a === 0 ? 24 : 76, bk = a === 0 ? 14 : 86;
      const set = (x, y) => { b.style.left = x + '%'; b.style.top = y + '%'; };
      set(nx, 50 + (Math.random() * 30 - 15));
      setTimeout(() => {
        if (type === 'goal') { set(gx, 50 + (Math.random() * 14 - 7)); mp.classList.add('g'); setTimeout(() => mp.classList.remove('g'), 900); }
        else if (type === 'save') { set(bk, 50); setTimeout(() => set(a === 0 ? 30 : 70, 42), 380); }
        else if (type === 'miss') set(gx, Math.random() < .5 ? 6 : 94);
        else set(a === 0 ? 33 : 67, 35 + Math.random() * 30);
      }, 520);
      setTimeout(() => set(50, 50), 1500);
    };
    const resolve = (a, e, o, quiet) => {
      const r = chance(S, MT.P, a, MT.st, o);
      const ev = {t:a, min:e.min, type:r.type, who:r.who, assist:r.assist || null, def:r.def, key:!!e.key, atk:o.atk || null, dfn:o.def || null};
      MT.ev.push(ev);
      feed.insertAdjacentHTML('afterbegin', evLine(ev));
      if (r.type === 'goal') {
        MT.sc[a]++; const el = $('g' + a); el.textContent = MT.sc[a];
        if (!quiet) { sndGoal(); el.classList.remove('pulse'); void el.offsetWidth; el.classList.add('pulse'); fx.boom({particleCount:50, spread:70, startVelocity:35, origin:fx.at(el), colors:[S.k[a], '#ffffff']}); }
      }
      if (!quiet) { ballTo(a, r.type); $('mt').textContent = ''; }
      return r;
    };
    const chanceFor = () => Math.random() < chanceShare(MT.P, MT.st) ? 0 : 1;
    const keyMoment = (a, e, next) => {
      const b = 1 - a, sides = [null, null];
      sides[a] = {label:'الهجمة', opts:Object.entries(ATTACKS).map(([k, x]) => ({k, n:x.n, h:'يبطله: ' + DEFENSES[x.c].n}))};
      sides[b] = {label:'الدفاع', opts:Object.entries(DEFENSES).map(([k, x]) => ({k, n:x.n, h:'يبطل: ' + ATTACKS[x.c].n}))};
      const bl = $('bl'); if (bl) { bl.style.left = (a === 0 ? 30 : 70) + '%'; bl.style.top = '50%'; }
      $('mt').textContent = `فرصة خطيرة لـ ${S.n[a]}`; sndWhistle();
      MT.ctl = duel($('duelBox'), {title:`فرصة خطيرة لـ ${T(a)}`, sub:`الدقيقة ${e.min}'`, sides, hold:1250,
        verdict:p => ATTACKS[p[a]].c === p[b] ? `${DEFENSES[p[b]].n} ✕ ${ATTACKS[p[a]].n}<br><small>الدفاع قرأ الهجمة</small>` : `${ATTACKS[p[a]].n} ✕ ${DEFENSES[p[b]].n}<br><small>الهجمة وجدت ثغرة</small>`},
        p => next(resolve(a, e, {atk:p[a], def:p[b]})));
    };
    const halftime = () => {
      $('half').textContent = 'استراحة بين الشوطين'; add('استراحة بين الشوطين', 'mark'); sndWhistle();
      MT.ctl = duel($('duelBox'), {title:'استراحة بين الشوطين', sub:`النتيجة ${MT.sc[0]} - ${MT.sc[1]}. غيّر أسلوبك للشوط الثاني`, sides:[stanceSide(), stanceSide()], verdict:stanceVerdict, hold:1500},
        p => { MT.st = p; setStn(); $('half').textContent = 'الشوط الثاني'; TM = setTimeout(step, 500); });
    };
    const fulltime = () => {
      stopTimers(); sndWhistle();
      $('clk').innerHTML = `<span class="ltr">90'</span>`; $('cp').style.width = '100%'; $('half').textContent = 'انتهت المباراة';
      $('lc').remove(); $('mt').textContent = '';
      if (MT.sc[0] === MT.sc[1]) { add('تعادل. الحسم بركلات الترجيح', 'mark'); TM = setTimeout(shootout, 1500); }
      else TM = setTimeout(() => finish(null), 1400);
    };
    const step = () => {
      if (MT.id !== id) return;
      const m = ++MT.m;
      $('clk').innerHTML = `<span class="ltr">${m}'</span>`; $('cp').style.width = (m / 90 * 100) + '%';
      const e = MT.plan[MT.pi];
      if (e && e.min === m) {
        MT.pi++; const a = chanceFor(); MT.sh[a]++;
        if (e.key) return keyMoment(a, e, r => { TM = setTimeout(step, r.type === 'goal' ? 1200 : 600); });
        const r = resolve(a, e, {}); TM = setTimeout(step, r.type === 'goal' ? 1100 : 330); return;
      }
      if (m === 45) return halftime();
      if (m >= 90) return fulltime();
      TM = setTimeout(step, 90);
    };
    sndWhistle(); add('صافرة البداية', 'mark');
    TM = setTimeout(step, 700);
    $('skipM').onclick = () => {
      if (MT.ctl) MT.ctl.cancel(); stopTimers(); $('mt').textContent = '';
      while (MT.pi < MT.plan.length) {
        const e = MT.plan[MT.pi++], a = chanceFor(); MT.sh[a]++;
        resolve(a, e, e.key ? {atk:pickR(Object.keys(ATTACKS)), def:pickR(Object.keys(DEFENSES))} : {}, true);
      }
      fulltime();
    };
  });
}

/* ---------- ركلات الترجيح ---------- */
const ZONES = [{k:0, n:'يسار'}, {k:1, n:'وسط'}, {k:2, n:'يمين'}];
function shootout() {
  stopTimers();
  const SO = {sc:[0, 0], taken:[0, 0], kicks:[], turn:Math.random() < .5 ? 0 : 1, ctl:null};
  const dots = i => { const ks = SO.kicks.filter(k => k.t === i), n = Math.max(5, ks.length);
    return Array.from({length:n}, (_, j) => ks[j] ? `<i class="dot ${ks[j].res === 'goal' ? 'g' : 'x'}"></i>` : '<i class="dot"></i>').join(''); };
  const board = () => $('soB').innerHTML = [0, 1].map(i => `<div class="sot" style="--kit:${S.k[i]}"><b>${T(i)}</b><div class="dots">${dots(i)}</div><span class="num">${SO.sc[i]}</span></div>`).join('');
  render(topbar() + `<h2 class="ttl">ركلات الترجيح</h2><section class="pair" id="soB"></section><p class="somsg" id="soMsg">&nbsp;</p><div id="duelBox"></div>
    <div class="row c"><button class="alt" id="skipSO">حسم آلي</button></div>`, () => {
    toTop(); board();
    const gk = t => S.sq[t].find(p => p.pos === 'G') || S.sq[t][0];
    const play = (t, kd, gd, quiet) => {
      const ks = kickers(S.sq[t]), K = ks[SO.taken[t] % ks.length], G = gk(1 - t), res = kickResult(K, G, kd, gd);
      SO.kicks.push({t, who:K, gk:G, res}); SO.taken[t]++; if (res === 'goal') SO.sc[t]++;
      SO.turn = 1 - t; board();
      if (!quiet) {
        $('soMsg').innerHTML = res === 'goal' ? `⚽ هدف! ${nm(K)} يسجّل` : res === 'saved' ? `🧤 تصدٍّ! ${nm(G)} يبعدها` : `💨 ${nm(K)} يسدد خارج المرمى`;
        (res === 'goal' ? sndGoal : sndPass)();
      }
    };
    const next = () => {
      const w = shootoutWinner(SO.sc, SO.taken);
      if (w !== null) return setTimeout(() => finish({w, sc:[...SO.sc], kicks:SO.kicks}), 1200);
      const t = SO.turn, ks = kickers(S.sq[t]), K = ks[SO.taken[t] % ks.length], G = gk(1 - t), sides = [null, null];
      sides[t] = {label:'الرامي', zone:true, opts:ZONES}; sides[1 - t] = {label:'الحارس', zone:true, opts:ZONES};
      $('soMsg').innerHTML = '&nbsp;';
      SO.ctl = duel($('duelBox'), {title:`ركلة ${T(t)}`, sub:`الرامي <b>${nm(K)}</b> · الحارس <b>${nm(G)}</b> · الجهات من وجهة نظر الرامي`, sides, hold:1000, note:'الرامي يختار زاوية التسديد والحارس يختار جهة القفز.',
        verdict:p => p[t] === p[1 - t] ? 'الحارس اختار الجهة نفسها' : 'الحارس قفز إلى الجهة الأخرى'},
        p => { play(t, p[t], p[1 - t]); setTimeout(next, 1100); });
    };
    $('skipSO').onclick = () => {
      if (SO.ctl) SO.ctl.cancel();
      let n = 0; while (shootoutWinner(SO.sc, SO.taken) === null && n++ < 60) play(SO.turn, pickR([0, 1, 2]), pickR([0, 1, 2]), true);
      finish({w:shootoutWinner(SO.sc, SO.taken) ?? (SO.sc[0] >= SO.sc[1] ? 0 : 1), sc:[...SO.sc], kicks:SO.kicks});
    };
    next();
  });
}

/* ---------- النتيجة والملخص ---------- */
function finish(pens) {
  stopTimers();
  const g = MT.sc.slice(), w = pens ? pens.w : g[0] > g[1] ? 0 : 1, ev = MT.ev;
  const of = i => ev.filter(e => e.t === i);
  const shareA = MT.sh[0] / ((MT.sh[0] + MT.sh[1]) || 1), mid = MT.P[0].Mi / (MT.P[0].Mi + MT.P[1].Mi), p0 = Math.round(100 * (.5 * shareA + .5 * mid));
  const stats = {poss:[p0, 100 - p0], sh:[...MT.sh], sot:[0, 1].map(i => of(i).filter(e => e.type === 'goal' || e.type === 'save').length),
    sv:[0, 1].map(i => ev.filter(e => e.type === 'save' && e.t !== i).length), key:[0, 1].map(i => of(i).filter(e => e.key).length)};
  const mv = mvpOf(S, ev, w);
  W[w]++;
  S.res = {g, w, pens:pens ? {sc:pens.sc, kicks:pens.kicks.map(k => ({t:k.t, who:k.who, res:k.res}))} : null, events:ev, stats, st:[MT.st0, MT.st], mvp:mv ? {p:mv.p, t:mv.t} : null};
  S.phase = 'final'; save();
  result(true);
}
function result(fresh) {
  stopTimers(); lot = null;
  const R = S.res, w = R.w, st = R.stats;
  const sbt = i => `<div class="sbt" style="--kit:${S.k[i]}"><div class="sbh"><span class="sbn">${T(i)}</span></div><div class="sbm num">${R.g[i]}</div><div class="stn">${STANCES[R.st[0][i]].n}${R.st[1][i] !== R.st[0][i] ? ' ← ' + STANCES[R.st[1][i]].n : ''}</div></div>`;
  const row = (lbl, a, b, suf) => { const t = (a + b) || 1; return `<div class="sr"><span class="sl">${lbl}</span><div class="sv"><b class="num">${a}${suf || ''}</b>
    <div class="sbar"><i style="width:${a / t * 100}%;background:${S.k[0]}"></i><i style="width:${b / t * 100}%;background:${S.k[1]}"></i></div><b class="num">${b}${suf || ''}</b></div></div>`; };
  const mv = R.mvp, mp = mv && mv.p;
  const mine = mp ? R.events.filter(e => e.who === mp || e.assist === mp || e.def === mp) : [];
  const why = mp ? [['أهداف', mine.filter(e => e.type === 'goal' && e.who === mp).length], ['تمريرات حاسمة', mine.filter(e => e.type === 'goal' && e.assist === mp).length],
    ['تصديات', mine.filter(e => e.type === 'save' && e.def === mp).length], ['اعتراضات', mine.filter(e => e.type === 'block' && e.def === mp).length]]
    .filter(x => x[1]).map(x => `${x[0]} <span class="ltr">${x[1]}</span>`).join(' · ') : '';
  const tl = R.events.filter(e => e.type === 'goal' || e.key).map(e => evLine(e)).join('');
  const pens = R.pens ? `<li class="ev mark">ركلات الترجيح ${pair(R.pens.sc[0], R.pens.sc[1])}</li>` : '';
  render(topbar() + `<section class="sb live">${sbt(0)}<div class="sbc"><div class="st">انتهت المباراة</div>${R.pens ? `<div class="ln">ترجيح ${pair(R.pens.sc[0], R.pens.sc[1])}</div>` : ''}</div>${sbt(1)}</section>
    <section class="final" style="--kit:${S.k[w]}"><i data-lucide="trophy"></i><div class="whistle">صافرة النهاية</div><div class="fw">الفائز: ${T(w)}</div>
      <p class="sub">النتيجة الإجمالية بين الفريقين ${pair(W[0], W[1])}</p>
      <div class="row c"><button id="again" class="go">مباراة أخرى بنفس التشكيلتين</button><button class="alt" id="newg">لعبة جديدة</button></div></section>
    ${mp ? `<section class="mvp" style="--kit:${S.k[mv.t]}"><div class="mvt"><span class="lbl">رجل المباراة</span><h3>${nm(mp)}</h3><p>${T(mv.t)}${why ? ' · ' + why : ''}</p><p class="mut">تقييمه السري: <b class="num">${mp.r}</b></p></div>${fcard(mp, {rating:mp.r, w:150})}</section>` : ''}
    <section class="card stats"><h3>إحصائيات المباراة</h3>${row('الاستحواذ', st.poss[0], st.poss[1], '%')}${row('التسديدات', st.sh[0], st.sh[1])}${row('على المرمى', st.sot[0], st.sot[1])}${row('التصديات', st.sv[0], st.sv[1])}${row('فرص خطيرة', st.key[0], st.key[1])}</section>
    <section class="card"><h3>أبرز الأحداث</h3><ul class="feed sum">${pens}${tl || '<li class="ev mark">لا أهداف في المباراة</li>'}</ul></section>`, () => {
    toTop(); $('again').onclick = () => tactics(); $('newg').onclick = () => home();
    if (fresh) { sndWhistle(); fx.cannons([S.k[w], '#ffffff', '#C9A24B'], 2200); }
  });
}
