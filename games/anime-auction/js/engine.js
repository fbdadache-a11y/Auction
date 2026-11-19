/* ========== محرك المعركة (بلا واجهة: يُختبر خارج المتصفح) ==========
   لا عشوائية فيه إطلاقاً. كل مقاتل يبدأ بصحة 100، ويحمل جراحه من معركة إلى التالية.
   في كل مواجهة يوجّه كل طرف ضرراً في الثانية يتناسب مع مربع قوته (قانون لانشستر المربّع)،
   فيفوز الأقوى حتماً ويخرج بما تبقى من صحته، ولا يفوز الأضعف إلا بسبب معلن:
   أفضلية النوع، القدرة القصوى، أو أن خصمه وصل منهكاً. */
const BEATS = {B:'A', A:'V', V:'B'};          // من يغلب من: القتالي يغلب صاحب القدرات، وهو يغلب السريع، والسريع يغلب القتالي
const ROLE_EDGE = 1.15;                        // مضاعف ضرر النوع المتفوق
const ULT = 1.35;                              // مضاعف الضرر في القدرة القصوى
const HP0 = 100;
const HEAL = 10;                               // من لم يشارك في المواجهة من الأحياء يستريح ويستعيد هذه النسبة
const bonusOf = co => co ? Math.round(co.r / 7 * 10) / 10 : 0; // أثر المعلّم لكل مقاتل (نقاط قوة)
const ultsFor = n => Math.max(1, (n - 1) >> 1);                // رصيد القدرة القصوى لكل فريق: 1 و2 و3 لفرق 3 و5 و7
const needWins = n => Math.floor(n / 2) + 1;                   // (قديم) للتوافق

/* مواجهة واحدة بين مقاتلين بصحتين حاليتين. ua/ub: هل استُعملت القدرة القصوى.
   ترجع: القوة الفعلية، المضاعفات، الفائز (0 أو 1 أو -1 للتعادل المزدوج)، والصحة المتبقية للطرفين، والضرر. */
function duelSim(a, b, coA, coB, hpA, hpB, ua, ub) {
  const ba = bonusOf(coA), bb = bonusOf(coB);
  const sa = a.r + ba, sb = b.r + bb;
  const edge = BEATS[a.pos] === b.pos ? 0 : BEATS[b.pos] === a.pos ? 1 : null;
  const ma = (edge === 0 ? ROLE_EDGE : 1) * (ua ? ULT : 1), mb = (edge === 1 ? ROLE_EDGE : 1) * (ub ? ULT : 1);
  const ra = sa * sa * ma, rb = sb * sb * mb;                 // ضرر في وحدة الزمن
  const ta = hpB / ra, tb = hpA / rb;                          // زمن إسقاط الخصم
  let w;
  if (Math.abs(ta - tb) < 1e-12) w = a.r === b.r ? -1 : a.r > b.r ? 0 : 1;
  else w = ta < tb ? 0 : 1;
  const T = w === -1 ? ta : Math.min(ta, tb);
  let ha = Math.max(0, hpA - rb * T), hb = Math.max(0, hpB - ra * T);
  if (w === 0) { hb = 0; ha = Math.max(1, Math.round(ha)); }
  else if (w === 1) { ha = 0; hb = Math.max(1, Math.round(hb)); }
  else { ha = hb = 0; }
  return {a, b, ba, bb, sa, sb, edge, ma, mb, ua:!!ua, ub:!!ub, w, hpA, hpB, ha, hb, dmgA:Math.round(hpB - hb), dmgB:Math.round(hpA - ha)};
}
/* لماذا فاز الأضعف؟ أسباب معلنة تُعرض للاعبين */
function whyUpset(r) {
  const w = r.w, win = w === 0 ? r.a : r.b, lose = w === 0 ? r.b : r.a;
  if (w < 0 || win.r >= lose.r) return [];
  const out = [];
  if (r.edge === w) out.push('أفضلية النوع');
  if ((w === 0 ? r.ua : r.ub)) out.push('القدرة القصوى');
  if ((w === 0 ? r.hpB : r.hpA) < 100) out.push('خصمه وصل منهكاً');
  if ((w === 0 ? r.ba - r.bb : r.bb - r.ba) > 0.5) out.push('أثر معلّمه');
  return out;
}
/* نهاية المعركة: يرجع رقم الفائز أو null إن لم تنته */
function battleWinner(hp, sq) {
  const alive = hp.map(h => h.filter(x => x > 0).length);
  if (alive[0] && alive[1]) return null;
  if (alive[0]) return 0;
  if (alive[1]) return 1;
  const pw = sq.map(s => s.reduce((a, p) => a + p.r, 0));      // فناء الطرفين معاً: الأقوى مجموعاً
  return pw[0] >= pw[1] ? 0 : 1;
}
/* رجل المعركة: أكثر مقاتلي الفريق الفائز إسقاطاً، ثم ضرراً */
function mvpOf(sq, kills, dealt, w) {
  let best = null;
  sq[w].forEach((p, n) => { const s = kills[w][n] * 1000 + dealt[w][n]; if (!best || s > best.s || (s === best.s && p.r > best.p.r)) best = {p, n, s, k:kills[w][n], d:dealt[w][n]}; });
  return best && best.s > 0 ? best : null;
}
/* بعد كل مواجهة: الأحياء غير المشاركين يستريحون. يعدّل المصفوفة ويرجع ما استُعيد لكل مقاتل */
function restAll(hp, played) {
  return hp.map((h, i) => h.map((x, n) => { if (n === played[i] || x <= 0 || x >= HP0) return 0; const g = Math.min(HEAL, HP0 - x); h[n] = x + g; return g; }));
}
