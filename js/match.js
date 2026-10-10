/* ========== المباراة ========== */
function poisson(l) { const L = Math.exp(-l); let k = 0, p = 1; do { k++; p *= Math.random(); } while (p > L); return k - 1; }
function pick(list, wf) {
  const ws = list.map(wf); let r = Math.random() * ws.reduce((a, b) => a + b, 0);
  for (let i = 0; i < list.length; i++) { r -= ws[i]; if (r <= 0) return list[i]; }
  return list[list.length - 1];
}
function simulate() {
  const P = [0, 1].map(i => { const sum = S.sq[i].reduce((a, p) => a + p.r, 0); return {sum, bonus:bonus(i), total:sum + bonus(i)}; });
  const lam = (a, b) => Math.min(4.5, 1.6 * Math.pow(a / b, 5));
  const g = [poisson(lam(P[0].total, P[1].total)), poisson(lam(P[1].total, P[0].total))];
  let w, pens = null;
  if (g[0] === g[1]) {
    w = Math.random() < P[0].total / (P[0].total + P[1].total) ? 0 : 1;
    const win = 3 + rnd(3), lose = Math.max(0, win - 1 - rnd(2));
    pens = w === 0 ? [win, lose] : [lose, win];
  } else w = g[0] > g[1] ? 0 : 1;
  const wt = p => ({G:.02, D:.7, M:2.5, F:6}[p.pos]) * Math.pow(p.r / 80, 3);
  const events = [];
  for (let t = 0; t < 2; t++) for (let k = 0; k < g[t]; k++) events.push({t, min:1 + rnd(90), who:pick(S.sq[t], wt)});
  events.sort((a, b) => a.min - b.min);
  W[w]++;
  return {P, g, w, pens, events};
}
function match(skipReveal) {
  stopTimers(); lot = null; S.stage = 6;
  S.res = simulate();
  skipReveal ? live() : reveal();
}

function reveal() {
  const R = S.res;
  const tot = i => `<div class="tot" style="--kit:${S.k[i]}"><div class="tr"><span>مجموع اللاعبين</span><b class="num" data-t="sum${i}">؟؟</b></div>
    <div class="tr"><span>أثر المدرب</span><b class="num" data-t="bn${i}">؟؟</b></div><div class="tr big"><span>القوة الكلية</span><b class="num" data-t="tt${i}">؟؟</b></div></div>`;
  render(topbar() + `<h2 class="ttl">كشف التقييمات</h2>` + pitches({reveal:true}) + `<section class="pair tots">${tot(0)}${tot(1)}</section>
    <div class="row c"><button class="alt" id="skipRev">تخطّ الكشف</button><button class="go" id="startM" disabled>صافرة البداية</button></div>`, () => {
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
        fx.count(document.querySelector(`[data-t="sum${i}"]`), R.P[i].sum, 0, .8);
        document.querySelector(`[data-t="bn${i}"]`).textContent = '+' + R.P[i].bonus;
        fx.count(document.querySelector(`[data-t="tt${i}"]`), R.P[i].total, 0, 1);
      });
      $('startM').disabled = false; $('skipRev').disabled = true; sndDeal();
    };
    let k = 0;
    TM = setInterval(() => { if (k >= q.length) fin(); else flip(q[k++]); }, 230);
    $('skipRev').onclick = fin;
    $('startM').onclick = live;
  });
}

function live() {
  const R = S.res; stopTimers();
  const sbt = i => `<div class="sbt" style="--kit:${S.k[i]}"><div class="sbh"><span class="sbn">${T(i)}</span></div><div class="sbm num" id="g${i}">0</div></div>`;
  render(topbar() + `<section class="sb live">${sbt(0)}<div class="sbc"><div class="clock num" id="clk"><span class="ltr">0'</span></div><div class="ln" id="half">الشوط الأول</div><div class="prog"><i id="cp"></i></div></div>${sbt(1)}</section>
    <ul class="feed" id="feed"></ul><div class="row c" id="lc"><button class="alt" id="skipM">تخطّ إلى النهاية</button></div><div id="fin"></div>`, () => {
    toTop();
    const sc = [0, 0]; let m = 0, ev = 0;
    const feed = $('feed');
    const add = (html, cls, kit) => feed.insertAdjacentHTML('afterbegin', `<li class="ev ${cls || ''}" ${kit ? `style="--kit:${kit}"` : ''}>${html}</li>`);
    const goal = (e, quiet) => {
      sc[e.t]++; const el = $('g' + e.t); el.textContent = sc[e.t];
      add(`<span class="num"><span class="ltr">${e.min}'</span></span><span>⚽ <b>${esc(e.who.name)}</b> <span class="mut">· ${T(e.t)}</span></span>`, '', S.k[e.t]);
      if (!quiet) { sndGoal(); el.classList.remove('pulse'); void el.offsetWidth; el.classList.add('pulse'); fx.boom({particleCount:50, spread:70, startVelocity:35, origin:fx.at(el), colors:[S.k[e.t], '#ffffff']}); }
    };
    const end = () => {
      stopTimers(); sndWhistle();
      $('clk').innerHTML = `<span class="ltr">90'</span>`; $('cp').style.width = '100%'; $('half').textContent = 'انتهت المباراة';
      $('lc').remove();
      const w = R.w;
      $('fin').innerHTML = `<section class="final" style="--kit:${S.k[w]}"><i data-lucide="trophy"></i><div class="whistle">صافرة النهاية</div>
        <div class="fw">الفائز: ${T(w)}</div><div class="fs num">${pair(R.g[0], R.g[1])}</div>
        ${R.pens ? `<p class="sub">تعادل وحُسمت بركلات الترجيح ${pair(R.pens[0], R.pens[1])}</p>` : ''}
        <p class="sub">النتيجة الإجمالية بين الفريقين ${pair(W[0], W[1])}</p>
        <div class="row c"><button id="again" class="go" style="background:#fff;color:#161618;border-color:#fff">مباراة أخرى بنفس التشكيلتين</button><button class="alt" id="newg" style="color:#fff;border-color:#ffffff66">لعبة جديدة</button></div></section>`;
      fx.icons();
      $('again').onclick = () => match(true);
      $('newg').onclick = setup;
      fx.cannons([S.k[w], '#ffffff', '#161618'], 2400);
      try { LEN ? LEN.scrollTo($('fin'), {offset:-120}) : $('fin').scrollIntoView({behavior:reduced ? 'auto' : 'smooth', block:'center'}); } catch (e) {}
    };
    const step = () => {
      m++;
      $('clk').innerHTML = `<span class="ltr">${m}'</span>`; $('cp').style.width = (m / 90 * 100) + '%';
      if (m > 45) $('half').textContent = 'الشوط الثاني';
      while (ev < R.events.length && R.events[ev].min <= m) goal(R.events[ev++]);
      if (m >= 90) return end();
      if (m === 45) { $('half').textContent = 'استراحة بين الشوطين'; add('استراحة بين الشوطين', 'mark'); TM = setTimeout(step, 1000); }
      else TM = setTimeout(step, 95);
    };
    sndWhistle();
    add('صافرة البداية', 'mark');
    TM = setTimeout(step, 600);
    $('skipM').onclick = () => { stopTimers(); while (ev < R.events.length) goal(R.events[ev++], true); end(); };
  });
}
