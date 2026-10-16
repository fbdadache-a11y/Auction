/* ========== الإعدادات ========== */
/* الأدوار: القتالي (B) يغلب صاحب القدرات (A)، وصاحب القدرات يغلب السريع (V)، والسريع يغلب القتالي */
const ROLES = {
  B:{n:'قتالي', full:'قتالي بدني', ic:'swords'},
  A:{n:'قدرات', full:'صاحب قدرات', ic:'sparkles'},
  V:{n:'سريع',  full:'سريع ماهر',  ic:'zap'}
};
const MODES = {
  three:{n:'ثلاثي', money:100, form:{B:1, A:1, V:1}},
  five: {n:'خماسي', money:180, form:{B:2, A:2, V:1}},
  seven:{n:'سباعي', money:280, form:{B:3, A:2, V:2}}
};
// طور النخبة: خمسة مقاتلين من الأقوياء فقط (قوة سرية 85 فما فوق) بميزانية كبيرة
const ELITE = {n:'طور النخبة', money:500, form:MODES.five.form, inc:[5, 20, 50], minp:5, minR:85, minM:24};
const ORD = ['B', 'A', 'V', 'C'];
const LBL = {B:'القتاليون', A:'أصحاب القدرات', V:'السريعون', C:'المعلّم'};
const KITS = ['#E8392B', '#1F5FBF', '#1E8C4E', '#F08A1C', '#7A3FB0', '#0F8CA0', '#2B2B2B'];

const app = document.getElementById('app');
const M = (v, pre) => `<span class="ltr">${pre || ''}${v}<small>M</small></span>`;
const pair = (a, b) => `<span class="pr"><b>${a}</b><i>-</i><b>${b}</b></span>`;

const ALL_P = CHARS_RAW.trim().split('\n').map(l => { const [pos, name, en, r, sr] = l.split('|'); return {t:'p', pos, name, en, r:+r, sr}; });
const ALL_C = MENTORS_RAW.trim().split('\n').map(l => { const [name, en, r, sr] = l.split('|'); return {t:'c', name, en, r:+r, sr}; });
const isElite = p => p.r >= ELITE.minR;
const ELITE_P = ALL_P.filter(isElite);
const ELITE_C = ALL_C.filter(c => c.r >= ELITE.minM);
const SCOUNT = {}; ALL_P.forEach(p => SCOUNT[p.sr] = (SCOUNT[p.sr] || 0) + 1);
const GENRE = {S:'شونين', I:'إيسيكاي'};
const srName = it => (SERIES[it.sr] || {ar:''}).ar;

let S, lot, TM = null, edition = 'classic', mode = 'five', names = ['الفريق الأول', 'الفريق الثاني'], kits = [KITS[0], KITS[1]], W = [0, 0];
let sel = new Set(Object.keys(SERIES));
const stopTimers = () => { clearTimeout(TM); clearInterval(TM); TM = null; };
