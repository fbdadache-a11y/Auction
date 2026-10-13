/* ========== محرك المباراة (بلا واجهة: يُختبر خارج المتصفح) ========== */
/* أساليب اللعب: مثلث ورقة-حجر-مقص. sh حصة الفرص، وCV[أ][ب] معدّل تحويل فرص أ حين يواجه ب.
   الهجوم يغلب التوازن بكثرة الفرص، والتوازن يغلب الدفاع بالسيطرة، والدفاع يغلب الهجوم بالمرتدات. */
const STANCES = {
  atk:{n:'هجوم',  sh:1.25, beats:'bal', loses:'def'},
  bal:{n:'توازن', sh:1.00, beats:'def', loses:'atk'},
  def:{n:'دفاع ومرتدات', sh:.80, beats:'atk', loses:'bal'}
};
const CV = {atk:{atk:1, bal:.963, def:.757}, bal:{atk:1.039, bal:1, def:.963}, def:{atk:1.371, bal:1.039, def:1}};
/* الهجمات والدفاعات: لكل هجمة ما يبطلها (مثلث ورقة-حجر-مقص) */
const ATTACKS = {
  shot:{n:'تسديدة مباشرة', c:'press', w:{M:1.6, F:1, D:.5}},
  thru:{n:'تمريرة بينية',  c:'drop',  w:{M:1, F:1.4, D:.3}},
  cross:{n:'عرضية',        c:'box',   w:{M:.7, F:1, D:2}}
};
const DEFENSES = {
  press:{n:'ضغط على حامل الكرة', c:'shot'},
  drop: {n:'خط دفاع منخفض',      c:'thru'},
  box:  {n:'تكتّل في المنطقة',    c:'cross'}
};
const ENG = {base:.215, pow:4, shPow:2, nCh:14, nKey:4, countered:.4, open:1.3};

const effOf = (sq, co) => sq.map(p => ({p, e:p.r + (co ? co.r / 7 : 0)}));
function power(sq, co) {
  const E = effOf(sq, co), by = pos => E.filter(x => x.p.pos === pos).map(x => x.e);
  const avg = a => a.length ? a.reduce((s, v) => s + v, 0) / a.length : 0;
  const wavg = (parts) => { let s = 0, w = 0; parts.forEach(([a, k]) => { if (a.length) { s += avg(a) * k; w += k; } }); return s / w; };
  const G = by('G'), D = by('D'), M = by('M'), F = by('F');
  return {A:wavg([[F, 3], [M, 2], [D, .5]]), D:wavg([[G, 2.5], [D, 2], [M, 1]]), Mi:wavg([[M, 2], [F, .5], [D, .5]]), G:avg(G) || 70};
}
const pickW = (list, wf) => {
  const ws = list.map(wf); let r = Math.random() * ws.reduce((a, b) => a + b, 0);
  for (let i = 0; i < list.length; i++) { r -= ws[i]; if (r <= 0) return list[i]; }
  return list[list.length - 1];
};
/* احتمال أن تكون الفرصة للفريق 0 */
function chanceShare(P, st) {
  const w = i => Math.pow(P[i].Mi / P[1 - i].Mi, ENG.shPow) * STANCES[st[i]].sh;
  return w(0) / (w(0) + w(1));
}
/* احتمال الهدف في فرصة للفريق a. mod: معدّل الاختيار السري */
function goalProb(P, a, st, mod) {
  const b = 1 - a, p = ENG.base * Math.pow(P[a].A / P[b].D, ENG.pow) * CV[st[a]][st[b]] * (mod || 1);
  return Math.min(.62, Math.max(.03, p));
}
/* معدّل الهجمة والدفاع المختارين (سريّان) */
const duelMod = (atk, def) => ATTACKS[atk].c === def ? ENG.countered : ENG.open;

/* جدول الفرص: 7 في كل شوط، 2 منها «خطيرة» تتوقف عندها المباراة للاختيار */
function schedule() {
  const mins = [];
  [[1, 44], [46, 89]].forEach(([a, b], h) => {
    const m = new Set(); while (m.size < ENG.nCh / 2) m.add(a + Math.floor(Math.random() * (b - a + 1)));
    const arr = [...m].sort((x, y) => x - y), key = new Set();
    while (key.size < ENG.nKey / 2) key.add(Math.floor(Math.random() * arr.length));
    arr.forEach((min, i) => mins.push({min, half:h, key:key.has(i)}));
  });
  return mins;
}
/* حسم فرصة. يرجع {type, who, assist, def} */
function chance(S, P, a, st, o) {
  o = o || {};
  const b = 1 - a, sqA = S.sq[a], sqB = S.sq[b];
  const mod = o.atk && o.def ? duelMod(o.atk, o.def) : 1;
  const p = goalProb(P, a, st, mod);
  const aw = o.atk ? ATTACKS[o.atk].w : {M:1, F:1, D:.5};
  const wt = p0 => ({G:.02, D:.7 * aw.D, M:2.5 * aw.M, F:6 * aw.F}[p0.pos]) * Math.pow(p0.r / 80, 3);
  const who = pickW(sqA, wt), gk = sqB.find(x => x.pos === 'G') || sqB[0];
  const r = Math.random();
  if (r < p) {
    const mates = sqA.filter(x => x !== who);
    const assist = mates.length && Math.random() < .72 ? pickW(mates, x => ({G:.05, D:1, M:3, F:2}[x.pos]) * Math.pow(x.r / 80, 2)) : null;
    return {type:'goal', who, assist, def:gk, p};
  }
  const q = Math.random();
  if (q < .5) return {type:'save', who, def:gk, p};
  if (q < .8) return {type:'miss', who, def:gk, p};
  return {type:'block', who, def:pickW(sqB.filter(x => x.pos !== 'G'), x => ({D:3, M:1.5, F:.4}[x.pos] || 1)), p};
}
/* ركلات الترجيح: المنفّذون من الأعلى تقييماً، والاتجاهات 0 يسار 1 وسط 2 يمين */
const kickers = sq => sq.filter(x => x.pos !== 'G').sort((a, b) => b.r - a.r);
function kickResult(K, G, kd, gd) {
  const k = K.r, g = G ? G.r : 75;
  if (kd === gd) return Math.random() < Math.min(.88, Math.max(.5, .70 + (g - k) / 160)) ? 'saved' : 'goal';
  return Math.random() < Math.min(.985, Math.max(.85, .93 + (k - 80) / 250)) ? 'goal' : 'miss';
}
/* حالة ركلات الترجيح: يرجع 0 أو 1 إن حُسمت، وإلا null */
function shootoutWinner(sc, taken) {
  const left = i => Math.max(0, 5 - taken[i]);
  if (taken[0] <= 5 && taken[1] <= 5) {
    if (sc[0] > sc[1] + left(1)) return 0;
    if (sc[1] > sc[0] + left(0)) return 1;
    return null;
  }
  if (taken[0] === taken[1] && taken[0] > 5) return sc[0] > sc[1] ? 0 : sc[1] > sc[0] ? 1 : null;
  return null;
}
/* نقاط رجل المباراة */
function mvpOf(S, events, w) {
  const pts = new Map(), add = (p, v, t) => { if (!p) return; const o = pts.get(p) || {p, t, v:0}; o.v += v; pts.set(p, o); };
  events.forEach(e => {
    if (e.type === 'goal') { add(e.who, 3, e.t); add(e.assist, 1.5, e.t); }
    else if (e.type === 'save') add(e.def, .8, 1 - e.t);
    else if (e.type === 'block') add(e.def, .8, 1 - e.t);
  });
  S.sq[w].forEach(p => add(p, .3 + p.r / 400, w));
  return [...pts.values()].sort((a, b) => b.v - a.v)[0];
}
