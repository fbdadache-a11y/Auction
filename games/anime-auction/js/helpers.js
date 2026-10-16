/* ========== مساعدات اللعبة ========== */
const T = i => esc(S.n[i]);
const cnt = (i, pos) => S.sq[i].filter(p => p.pos === pos).length;
const open = (i, pos) => cnt(i, pos) < S.form[pos];
const need = i => Object.keys(S.form).filter(p => open(i, p)).map(p => `${ROLES[p].n} ×${S.form[p] - cnt(i, p)}`).join('، ');
const slotsLeft = i => S.N + 1 - S.sq[i].length - (S.co[i] ? 1 : 0);
const maxBid = i => S.m[i] - (slotsLeft(i) - 1) * S.minp; // يبقى الحد الأدنى لكل مركز ناقص
const take = (list, item) => { list.splice(list.indexOf(item), 1); return item; };
const give = (i, it) => it.t === 'p' ? S.sq[i].push(it) : (S.co[i] = it);
const done = i => !need(i) && S.co[i];
const ico = (name, cls) => `<i data-lucide="${name}" class="${cls || ''}"></i>`;
const roleTag = p => `<span class="role r-${p.pos}">${ico(ROLES[p.pos].ic)}<b>${ROLES[p.pos].n}</b></span>`;

/* ===== بطاقة الشخصية (منسّقة كصفحة مانجا) ===== */
function fcard(it, o) {
  o = o || {};
  const coach = it.t === 'c';
  const r = o.rating != null ? o.rating : '؟؟';
  return `<div class="cc ${coach ? 'coach' : 'r-' + it.pos} ${o.fresh ? 'fresh' : ''}" ${o.w ? `style="--w:${o.w}px"` : ''}>
    <div class="cc-ph">${av(it)}<span class="cc-tone"></span>
      <span class="cc-role">${coach ? ico('graduation-cap') + '<b>معلّم</b>' : ico(ROLES[it.pos].ic) + '<b>' + ROLES[it.pos].n + '</b>'}</span>
      <span class="cc-pow num ${o.rating != null ? '' : 'hid'}">${r}</span></div>
    <div class="cc-nm">${esc(it.name)}</div><div class="cc-sr">${coach ? 'أثره سري · ' : ''}${esc(srName(it))}</div>${o.stamp || ''}</div>`;
}
/* ===== لوحة الفريق: صفوف الأدوار ===== */
function boardHTML(i, o) {
  o = o || {};
  let h = `<div class="board" style="--kit:${S.k[i]}">`;
  for (const pos of 'BAV') {
    const list = S.sq[i].filter(p => p.pos === pos);
    h += `<div class="brow"><span class="bl-t">${ico(ROLES[pos].ic)}${ROLES[pos].n}</span><div class="bsl">`;
    for (let j = 0; j < S.form[pos]; j++) {
      const p = list[j];
      h += p ? `<div class="slot filled" data-id="${esc(p.en)}"><div class="pk">${av(p)}<span class="sn">${esc(p.name)}</span>${o.reveal ? `<span class="rt hid num" data-r="${p.r}">؟؟</span>` : ''}</div></div>`
             : `<div class="slot${S.stage < 4 && ORD[S.stage] === pos ? ' target' : ''}"><div class="pk"><span class="box">؟</span></div></div>`;
    }
    h += '</div></div>';
  }
  return h + '</div>';
}
function teamBoard(i, o) {
  return `<div class="tp"><div class="tp-h" style="--kit:${S.k[i]}"><b>${T(i)}</b><span class="num">${S.sq[i].length}/${S.N}</span></div>${boardHTML(i, o)}
    <div class="coach-row">${S.co[i] ? `${av(S.co[i])}<span>المعلّم: <b>${esc(S.co[i].name)}</b></span>` : '<span class="mut">المعلّم: لم يُشترَ بعد</span>'}</div></div>`;
}
const boards = o => `<section class="pair">${teamBoard(0, o)}${teamBoard(1, o)}</section>`;
const cfg = () => edition === 'elite' ? ELITE : MODES[mode];
const chipTxt = () => `${cfg().n} <span class="num">${M(cfg().money)}</span>`;
const goHome = () => { if (!lot || S && S.stage >= 4 || confirm('العودة إلى الرئيسية تلغي المزاد الحالي. متأكد؟')) home(); };
const topbar = () => `<header class="top"><button class="brand" onclick="goHome()" aria-label="الصفحة الرئيسية"><span class="logo-mk">مزاد</span><span>الأنمي</span></button><div class="tools">
  <span class="chip" id="modeChip">${chipTxt()}</span>
  <button class="icon-btn" data-snd onclick="toggleSound()" aria-label="تشغيل الصوت أو إيقافه">${sndBtn()}</button></div></header>`;
function board(turn) {
  const tm = i => `<div class="sbt${turn === i ? ' on' : ''}" style="--kit:${S.k[i]}"><div class="sbh"><span class="sbn">${T(i)}</span>${turn === i ? '<span class="turn">دوره</span>' : ''}${done(i) ? '<span class="turn ok">مكتمل</span>' : ''}</div>
    <div class="sbm num">${M(S.m[i])}</div><div class="sbs">المصروف ${M(S.spent[i])}</div></div>`;
  const total = 2 * S.N + 2;
  return `<section class="sb">${tm(0)}<div class="sbc"><div class="st">${LBL[ORD[Math.min(S.stage, 3)]]}</div><div class="ln">الصفقة <span class="num">${Math.min(S.lotNo, total)}</span> من <span class="num">${total}</span></div>
    <div class="prog"><i style="width:${Math.min(100, S.lotNo / total * 100)}%"></i></div></div>${tm(1)}</section>`;
}
const stepper = () => `<div class="steps">${ORD.map((p, i) => `<span class="${i < S.stage ? 'done' : i === S.stage ? 'on' : ''}">${LBL[p]}</span>`).join('')}</div>`;
function logCard() {
  if (!S.log.length) return '';
  return `<section class="card log"><h3>سجل الصفقات</h3><ul>${S.log.slice(-6).reverse().map(e =>
    `<li><div><b>${esc(S.n[e.w])}</b> ضمّ ${esc(e.name)} <span>${e.label}</span></div><b class="num">${M(e.price)}</b></li>`).join('')}</ul></section>`;
}
