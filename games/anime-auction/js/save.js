/* ========== حفظ التقدّم واستعادته عند تحديث الصفحة ========== */
const SAVE_KEY = 'combata.anime.v3';
const IDX = new Map(); ALL_P.forEach((p, i) => IDX.set(p, i)); ALL_C.forEach((c, i) => IDX.set(c, i));
const deref = r => (r[0] === 'p' ? ALL_P : ALL_C)[+r.slice(1)];
/* المقاتل أو المعلّم يُحفظ كمرجع قصير ('p12' / 'c3') أينما ورد داخل الحالة */
const replacer = (k, v) => v && typeof v === 'object' && IDX.has(v) ? {$r:v.t + IDX.get(v)} : v;
const reviver = (k, v) => v && v.$r ? deref(v.$r) : v;

function save() {
  if (!S || !S.n) return;
  try { localStorage.setItem(SAVE_KEY, JSON.stringify({v:3, S, lot, edition, mode, W, sel:[...sel], names, kits}, replacer)); } catch (e) {}
}
function clearSave() { try { localStorage.removeItem(SAVE_KEY); } catch (e) {} }

/* يعيد اللعبة إلى الشاشة التي كانت عليها. يرجع false إن لم يوجد حفظ سليم. */
function restore() {
  let d;
  try { d = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null', reviver); } catch (e) { return false; }
  if (!d || d.v !== 3 || !d.S) return false;
  try {
    S = d.S; lot = d.lot;
    edition = d.edition; mode = d.mode; W = d.W; sel = new Set(d.sel); names = d.names; kits = d.kits;
    if (S.P.includes(undefined) || S.C.includes(undefined) || S.sq.some(a => a.includes(undefined)) || (lot && !lot.item)) throw 0;
    if (S.stage >= 5) {
      if (S.phase === 'final' && S.res) result(false);
      else if (S.phase === 'battle' && S.bt) {
        const v = S.bt.view;
        if (v === 'fight' && S.bt.out) fightView(S.bt.k, false); else if (v === 'show' && S.bt.plan[1]) showPlan(); else if (v === 'hand') handoffView(); else if (v === 'plan1') planView(1); else planView(0);
      }
      else reveal();
    }
    else if (lot && lot.mode === 'auction') auction({fresh:true});
    else if (lot && lot.mode === 'solo') solo();
    else if (lot && lot.mode === 'deal' && lot.deal) dealView();
    else next();
    return true;
  } catch (e) { clearSave(); S = lot = undefined; return false; }
}
