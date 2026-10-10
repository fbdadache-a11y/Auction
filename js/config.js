/* ========== الإعدادات ========== */
const MODES = {
  five: {n:'فريق من 5', money:150, form:{G:1, D:2, M:1, F:1}},
  seven:{n:'فريق من 7', money:250, form:{G:1, D:2, M:2, F:2}},
  full: {n:'فريق كامل (11)', money:500, form:{G:1, D:4, M:3, F:3}}
};
// مواضع اللاعبين على الملعب كنسب مئوية (x من اليسار، y من الأعلى)
const FORM_XY = {
  five: {G:[[50,86]], D:[[28,64],[72,64]], M:[[50,42]], F:[[50,18]]},
  seven:{G:[[50,86]], D:[[30,66],[70,66]], M:[[30,44],[70,44]], F:[[32,20],[68,20]]},
  full: {G:[[50,86]], D:[[13,66],[38,69],[62,69],[87,66]], M:[[24,45],[50,41],[76,45]], F:[[20,19],[50,14],[80,19]]}
};
const POS = {G:'حارس', D:'مدافع', M:'وسط', F:'مهاجم'};
const ORD = ['G', 'D', 'M', 'F', 'C'];
const LBL = {G:'الحراس', D:'المدافعون', M:'الوسط', F:'المهاجمون', C:'المدرب'};
const LG = {E:'الدوري الإنجليزي', S:'الدوري الإسباني', I:'الدوري الإيطالي', G:'الدوري الألماني', F:'الدوري الفرنسي', O:'دوريات أخرى'};
const LGS = {E:'الإنجليزي', S:'الإسباني', I:'الإيطالي', G:'الألماني', F:'الفرنسي', O:'دوريات أخرى'};
const BIG5 = ['E', 'S', 'I', 'G', 'F'];
const KITS = ['#2A5CAA', '#B3262E', '#1F7A4D', '#C2571A', '#6A3FA0', '#1F7F9E', '#3A3A40'];
const PITCH_SVG = `<svg viewBox="0 0 100 120" preserveAspectRatio="none" aria-hidden="true" fill="none" stroke="rgba(255,255,255,.55)" stroke-width="1.4" vector-effect="non-scaling-stroke">
  <rect x="3" y="3" width="94" height="114" vector-effect="non-scaling-stroke"/>
  <path d="M38 3A12 12 0 0 0 62 3" vector-effect="non-scaling-stroke"/>
  <rect x="20" y="98" width="60" height="19" vector-effect="non-scaling-stroke"/>
  <rect x="36" y="108" width="28" height="9" vector-effect="non-scaling-stroke"/>
  <path d="M38 98A12 12 0 0 1 62 98" vector-effect="non-scaling-stroke"/></svg>`;

const app = document.getElementById('app');
const $ = id => document.getElementById(id);
const rnd = n => Math.floor(Math.random() * n);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const M = (v, pre) => `<span class="ltr">${pre || ''}${v}<small>M</small></span>`;
const pair = (a, b) => `<span class="pr"><b>${a}</b><i>-</i><b>${b}</b></span>`;

const ALL_P = PLAYERS.trim().split('\n').map(l => { const [pos, name, en, r, e, lg] = l.split('|'); return {t:'p', pos, name, en, r:+r, e, lg}; });
const ALL_C = COACHES.trim().split('\n').map(l => { const [name, en, r] = l.split('|'); return {t:'c', name, en, r:+r}; });
const LGCOUNT = {}; ALL_P.forEach(p => LGCOUNT[p.lg] = (LGCOUNT[p.lg] || 0) + 1);

let S, lot, TM = null, mode = 'seven', names = ['الفريق الأول', 'الفريق الثاني'], kits = [KITS[0], KITS[3]], W = [0, 0];
let lgs = new Set(Object.keys(LG)), muted = false;
try { muted = localStorage.getItem('muted') === '1'; } catch (e) {}
const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const stopTimers = () => { clearTimeout(TM); clearInterval(TM); TM = null; };
