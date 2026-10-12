/* ========== حفظ التقدّم واستعادته عند تحديث الصفحة ========== */
const SAVE_KEY = 'combata.auction.v1';
const IDX = new Map(); ALL_P.forEach((p, i) => IDX.set(p, i)); ALL_C.forEach((c, i) => IDX.set(c, i));
const ref = it => it ? it.t + IDX.get(it) : null;               // 'p12' أو 'c3'
const deref = r => r ? (r[0] === 'p' ? ALL_P : ALL_C)[+r.slice(1)] : null;

function save() {
  if (!S || !S.n) return;
  try {
    const s = {...S, P:S.P.map(ref), C:S.C.map(ref), sq:S.sq.map(a => a.map(ref)), co:S.co.map(ref)};
    if (S.res) s.res = {...S.res, events:S.res.events.map(e => ({...e, who:ref(e.who)}))};
    localStorage.setItem(SAVE_KEY, JSON.stringify({v:1, S:s, lot:lot ? {...lot, item:ref(lot.item)} : null,
      edition, mode, W, lgs:[...lgs], names, kits}));
  } catch (e) {}
}
function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch (e) {} }

/* يعيد اللعبة إلى الشاشة التي كانت عليها. يرجع false إن لم يوجد حفظ سليم. */
function restore() {
  let d;
  try { d = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null'); } catch (e) { return false; }
  if (!d || d.v !== 1 || !d.S) return false;
  try {
    const s = d.S;
    S = {...s, P:s.P.map(deref), C:s.C.map(deref), sq:s.sq.map(a => a.map(deref)), co:s.co.map(deref)};
    if (s.res) S.res = {...s.res, events:s.res.events.map(e => ({...e, who:deref(e.who)}))};
    lot = d.lot ? {...d.lot, item:deref(d.lot.item)} : null;
    edition = d.edition; mode = d.mode; W = d.W; lgs = new Set(d.lgs); names = d.names; kits = d.kits;
    if (S.P.includes(undefined) || S.C.includes(undefined) || S.sq.some(a => a.includes(undefined)) || (lot && !lot.item)) throw 0;
    if (S.stage >= 6 && S.res) { if (S.phase === 'final') live(true); else if (S.phase === 'live') live(); else reveal(); }
    else if (lot && lot.mode === 'auction') auction({fresh:true});
    else if (lot && lot.mode === 'solo') solo();
    else if (lot && lot.mode === 'deal' && lot.deal) dealView();
    else next();
    return true;
  } catch (e) { clearSave(); S = lot = undefined; return false; }
}
