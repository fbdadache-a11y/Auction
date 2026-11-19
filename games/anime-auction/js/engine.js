/* ========== محرك المعركة (بلا واجهة: يُختبر خارج المتصفح) ==========
   لا عشوائية فيه إطلاقاً ولا نوع يغلب نوعاً. كل فريق يرتّب مقاتليه على الجولات سراً مرة واحدة،
   وتُقاتَل الجولات بالترتيب: مقاتل كل فريق في الجولة k ضد مقاتل الفريق الآخر في الجولة k.
   في كل جولة يبدأ المقاتلان بصحة 100 ويوجّه كل منهما ضرراً في الثانية يتناسب مع مربع قوته (قانون لانشستر)،
   فيفوز الأقوى حتماً ويخرج بما تبقى من صحته. الأضعف لا يفوز إلا بسبب معلن: أثر معلّمه أو قدرته القصوى. */
const ULT = 1.35;                              // مضاعف الضرر في القدرة القصوى
const HP0 = 100;
const bonusOf = co => co ? Math.round(co.r / 7 * 10) / 10 : 0; // أثر المعلّم لكل مقاتل (نقاط قوة)
const ultsFor = n => Math.max(1, (n - 1) >> 1);                // رصيد القدرة القصوى لكل فريق: 1 و2 و3 لفرق 3 و5 و7
const needWins = n => Math.floor(n / 2) + 1;                   // الأغلبية

/* مواجهة واحدة. ua/ub: هل استُعملت القدرة القصوى. */
function duelSim(a, b, coA, coB, ua, ub) {
  const ba = bonusOf(coA), bb = bonusOf(coB);
  const sa = a.r + ba, sb = b.r + bb;
  const ma = ua ? ULT : 1, mb = ub ? ULT : 1;
  const ra = sa * sa * ma, rb = sb * sb * mb;                  // ضرر في وحدة الزمن
  const ta = HP0 / ra, tb = HP0 / rb;                          // زمن إسقاط الخصم
  let w = ta < tb ? 0 : ta > tb ? 1 : -1;                      // -1: تعادل تام
  const T = Math.min(ta, tb);
  let ha = Math.max(0, HP0 - rb * T), hb = Math.max(0, HP0 - ra * T);
  if (w === 0) { hb = 0; ha = Math.max(1, Math.round(ha)); }
  else if (w === 1) { ha = 0; hb = Math.max(1, Math.round(hb)); }
  else { ha = hb = 0; }
  return {a, b, ba, bb, sa, sb, ma, mb, ua:!!ua, ub:!!ub, w, ha, hb, ra, rb, T};
}
/* خطوات القتال المرسوم: صحة الطرفين بعد كل ضربة (n خطوة) حتى النهاية الدقيقة */
function hitSteps(r, n) {
  const out = []; let pa = HP0, pb = HP0;
  for (let i = 1; i <= n; i++) {
    const t = r.T * i / n;
    const ha = i === n ? r.ha : Math.max(1, Math.round(HP0 - r.rb * t)), hb = i === n ? r.hb : Math.max(1, Math.round(HP0 - r.ra * t));
    out.push({ha, hb, da:pb - hb, db:pa - ha}); pa = ha; pb = hb;                     // da: ضرر A على B
  }
  return out;
}
/* لماذا فاز الأضعف؟ أسباب معلنة تُعرض للاعبين */
function whyUpset(r) {
  const w = r.w, win = w === 0 ? r.a : r.b, lose = w === 0 ? r.b : r.a;
  if (w < 0 || win.r >= lose.r) return [];
  const out = [];
  if ((w === 0 ? r.ua : r.ub)) out.push('القدرة القصوى');
  if ((w === 0 ? r.ba - r.bb : r.bb - r.ba) > 0.5) out.push('أثر معلّمه');
  return out.length ? out : ['فارق القوة صغير'];
}
/* تُحسب كل الجولات فور اعتماد الخطتين. plan[i] = {order:[فهرس المقاتل لكل جولة], ults:[فهارس الجولات]} */
function planBattle(sq, co, plan) {
  const N = sq[0].length, rounds = [], wins = [0, 0], need = needWins(N);
  for (let k = 0; k < N; k++) {
    const ia = plan[0].order[k], ib = plan[1].order[k];
    const r = duelSim(sq[0][ia], sq[1][ib], co[0], co[1], plan[0].ults.includes(k), plan[1].ults.includes(k));
    r.ia = ia; r.ib = ib; r.k = k; rounds.push(r);
    if (r.w >= 0) wins[r.w]++;
    if (wins[0] >= need || wins[1] >= need) break;
  }
  let w = wins[0] > wins[1] ? 0 : wins[1] > wins[0] ? 1 : null;
  if (w === null) { const hp = [0, 1].map(i => rounds.reduce((s, r) => s + (r.w === i ? (i ? r.hb : r.ha) : 0), 0)); w = hp[0] >= hp[1] ? 0 : 1; }
  return {rounds, wins, w};
}
/* بطل الحرب: أكثر مقاتلي الفريق الفائز هيمنة (أعلى صحة متبقية، ثم أعلى قوة) */
function mvpOf(rounds, w) {
  let best = null;
  rounds.forEach(r => { if (r.w !== w) return; const h = w === 0 ? r.ha : r.hb, p = w === 0 ? r.a : r.b, s = h * 1000 + p.r; if (!best || s > best.s) best = {p, h, k:r.k, s}; });
  return best;
}
