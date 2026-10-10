/* ========== المزاد ========== */
function next() {
  stopTimers();
  while (S.stage < 5) {
    const pos = ORD[S.stage];
    const el = [0, 1].filter(i => pos === 'C' ? !S.co[i] : open(i, pos));
    if (el.length) {
      const item = pos === 'C' ? take(S.C, S.C[rnd(S.C.length)])
        : (c => take(S.P, c[rnd(c.length)]))(S.P.filter(p => p.pos === pos));
      lot = {item, el, bid:0, prev:0, last:null, err:'', mode:'', turn:el.length === 2 ? S.lotNo % 2 : el[0]};
      S.lotNo++;
      toTop();
      return el.length === 2 ? auction({fresh:true}) : solo();
    }
    S.stage++;
  }
  match();
}

function solo() {
  const w = lot.el[0]; lot.mode = 'solo';
  render(topbar() + board(w) + stepper() + `<section class="stage"><div class="stage-card">${fcard(lot.item, {fresh:true})}</div>
    <div class="panel"><div class="turnbar" style="--kit:${S.k[w]}"><b>${T(w)}</b><span>لا منافس له على هذا المركز</span></div>
      <div class="lbl">السعر الثابت</div><div class="price num">${M(1)}</div>
      <p class="by">يضمّه ${T(w)} بسعر ${M(1)} فقط.</p>
      <button class="go" onclick="resolve(${w},1)">تقديم العرض <kbd>↵</kbd></button></div></section>` + pitches() + logCard());
}

function auction(o) {
  o = o || {};
  const t = lot.turn, mx = maxBid(t);
  if (lot.bid > 0 && mx <= lot.bid) return resolve(lot.last, lot.bid); // لا يستطيع الرفع: يُحسم المزاد
  lot.mode = 'auction';
  const btns = [1, 5, 20].map((x, k) => `<button onclick="raise(${lot.bid + x})" ${lot.bid + x > mx ? 'disabled' : ''}><span class="num">${M(x, '+')}</span><kbd>${[1, 5, 2][k]}</kbd></button>`).join('');
  render(topbar() + board(t) + stepper() + `<section class="stage"><div class="stage-card">${fcard(lot.item, {fresh:o.fresh})}</div>
    <div class="panel"><div class="turnbar" style="--kit:${S.k[t]}"><b>${T(t)}</b><span>دورك للمزايدة · أقصى عرض متاح ${M(mx)}</span></div>
      <div class="lbl">السعر الحالي</div>
      <div class="price num${o.pulse ? ' pulse' : ''}"><span class="ltr"><span id="pv">${lot.bid}</span><small>M</small></span></div>
      <div class="by">${lot.last !== null ? `آخر عرض من <b>${T(lot.last)}</b>` : 'افتح المزاد بعرض لا يقل عن 1M'}</div>
      <div class="bids">${btns}</div>
      <div class="bids2"><button onclick="raise(${mx})" ${mx <= lot.bid ? 'disabled' : ''}>كل الميزانية<kbd>M</kbd></button>
        <button class="alt" onclick="pass()" ${lot.bid === 0 ? 'disabled' : ''}>انسحاب<kbd>P</kbd></button></div>
      <div class="custom"><input id="cb" type="number" min="${lot.bid + 1}" max="${mx}" placeholder="مبلغ آخر" aria-label="مبلغ آخر"><button class="alt" onclick="raise(+$('cb').value)">زايد</button></div>
      ${lot.err ? `<div class="err">${lot.err}</div>` : ''}</div></section>` + pitches() + logCard(),
    () => { if (o.pulse) fx.count($('pv'), lot.bid, lot.prev, .35); });
}
function raise(v) {
  v = Math.floor(v);
  if (!(v > lot.bid && v <= maxBid(lot.turn))) { lot.err = 'العرض يجب أن يتجاوز السعر الحالي ولا يزيد على أقصى عرض متاح.'; return auction(); }
  sndBid();
  lot.prev = lot.bid; lot.bid = v; lot.last = lot.turn; lot.turn = 1 - lot.turn; lot.err = '';
  auction({pulse:true});
}
function pass() { sndPass(); resolve(1 - lot.turn, lot.bid); }

function resolve(w, price) {
  const it = lot.item;
  S.m[w] -= price; S.spent[w] += price; give(w, it);
  S.log.push({w, name:it.name, label:it.t === 'c' ? 'مدرب' : POS[it.pos], price});
  lot.mode = 'deal';
  sndDeal();
  const stamp = `<div class="stamp-w"><div class="stamp" id="stamp" style="--kit:${S.k[w]}">تم البيع<small>${esc(S.n[w])} · ${price}M</small></div></div>`;
  render(topbar() + board(null) + stepper() + `<section class="stage"><div class="stage-card">${fcard(it, {stamp})}</div>
    <div class="panel"><div class="turnbar" style="--kit:${S.k[w]}"><b>${T(w)}</b><span>أتمّ الصفقة</span></div>
      <div class="lbl">سعر البيع</div><div class="price num">${M(price)}</div>
      <p class="by">${T(w)} ضمّ <b>${esc(it.name)}</b> وبقي له ${M(S.m[w])}.</p>
      <button class="go" onclick="next()">الصفقة التالية <kbd>↵</kbd></button></div></section>` + pitches() + logCard(), () => {
    fx.slam($('stamp'));
    const el = it.t === 'c' ? document.querySelectorAll('.coach-row')[w] : [...document.querySelectorAll('.slot.filled')].find(e => e.dataset.id === it.en);
    const pk = el && (el.querySelector('.pk') || el);
    if (pk) pk.classList.add('pop');
    fx.boom({particleCount:45, spread:75, startVelocity:32, origin:fx.at(el), colors:[S.k[w], '#ffffff', '#161618']});
  });
}

document.addEventListener('keydown', e => {
  if (!lot || e.ctrlKey || e.metaKey || e.altKey || document.activeElement !== document.body) return;
  if (lot.mode === 'auction') {
    if (e.key === '1') raise(lot.bid + 1);
    else if (e.key === '5') raise(lot.bid + 5);
    else if (e.key === '2') raise(lot.bid + 20);
    else if (e.code === 'KeyM') raise(maxBid(lot.turn));
    else if (e.code === 'KeyP' && lot.bid > 0) pass();
  } else if (e.key === 'Enter') {
    if (lot.mode === 'deal') next(); else if (lot.mode === 'solo') resolve(lot.el[0], 1);
  }
});
