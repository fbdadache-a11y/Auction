/* ========== محرك المعركة (بلا واجهة: يُختبر خارج المتصفح) ========== */
const BEATS = {B:'A', A:'V', V:'B'};          // من يغلب من: القتالي يغلب صاحب القدرات، وهو يغلب السريع، والسريع يغلب القتالي
const EDGE = 7;                                // ميزة النوع بالنقاط
const SCALE = 8;                               // كلما صغر زادت حتمية القوة
const bonusOf = co => co ? Math.round(co.r / 7 * 10) / 10 : 0; // أثر المعلّم لكل مقاتل

/* نزال بين مقاتلين. يرجع تفاصيل القوة والاحتمال والفائز */
function clash(a, b, coA, coB, rand) {
  const edge = BEATS[a.pos] === b.pos ? 0 : BEATS[b.pos] === a.pos ? 1 : null;
  const ba = bonusOf(coA), bb = bonusOf(coB);
  const ea = Math.round((a.r + ba + (edge === 0 ? EDGE : 0)) * 10) / 10, eb = Math.round((b.r + bb + (edge === 1 ? EDGE : 0)) * 10) / 10;
  const pa = 1 / (1 + Math.exp(-(ea - eb) / SCALE));
  const w = (rand ? rand() : Math.random()) < pa ? 0 : 1;
  return {a, b, ba, bb, edge, ea, eb, pa, w};
}
/* رجل المعركة: أكثر مقاتلي الفريق الفائز تألقاً (الانتصارات الصعبة تساوي أكثر) */
function mvpOf(rounds, w) {
  const sc = new Map();
  rounds.forEach(r => {
    const win = r.w === 0 ? r.a : r.b, p = r.w === 0 ? r.pa : 1 - r.pa;
    if (r.w !== w) return;
    const s = sc.get(win) || {p:win, s:0, n:0, best:0};
    s.s += 1 + (1 - p) * 1.5; s.n++; s.best = Math.max(s.best, r.w === 0 ? r.ea : r.eb); sc.set(win, s);
  });
  return [...sc.values()].sort((x, y) => y.s - x.s || y.best - x.best)[0] || null;
}
const needWins = n => Math.floor(n / 2) + 1;
