/* ========== مساعدات اللعبة ========== */
const T = i => esc(S.n[i]);
const cnt = (i, pos) => S.sq[i].filter(p => p.pos === pos).length;
const open = (i, pos) => cnt(i, pos) < S.form[pos];
const need = i => Object.keys(S.form).filter(p => open(i, p)).map(p => `${POS[p]} ×${S.form[p] - cnt(i, p)}`).join('، ');
const slotsLeft = i => S.N + 1 - S.sq[i].length - (S.co[i] ? 1 : 0);
const maxBid = i => S.m[i] - (slotsLeft(i) - 1); // يبقى 1M لكل مركز ناقص
const take = (list, item) => { list.splice(list.indexOf(item), 1); return item; };
const give = (i, it) => it.t === 'p' ? S.sq[i].push(it) : (S.co[i] = it);
const bonus = i => Math.round(S.co[i].r * S.N / 7);
const done = i => !need(i) && S.co[i];

/* ========== بطاقة اللاعب والمكوّنات ========== */
function fcard(it, o) {
  o = o || {};
  const past = it.t === 'p' && it.e === 'P';
  const r = o.rating != null ? o.rating : '؟؟';
  const pos = it.t === 'c' ? 'مدرب' : POS[it.pos];
  const lg = it.t === 'c' ? 'خبرته سرية' : `${LG[it.lg]} · ${past ? 'من الماضي' : 'من الحاضر'}`;
  return `<div class="fc ${it.t === 'c' ? 'coach' : past ? 'past' : ''} ${o.fresh ? 'fresh' : ''}" ${o.w ? `style="--w:${o.w}px"` : ''}><div class="fc-in">
    <div class="fc-top"><div class="fc-r num ${o.rating != null ? '' : 'hid'}">${r}</div><div class="fc-p">${pos}</div></div>
    <div class="fc-ph">${av(it)}</div><div class="fc-nm">${esc(it.name)}</div><div class="fc-lg">${lg}</div></div>${o.stamp || ''}</div>`;
}
function pitchHTML(i, o) {
  o = o || {};
  const xy = FORM_XY[S.mode];
  let h = `<div class="pitch" style="--kit:${S.k[i]}">${PITCH_SVG}`;
  for (const pos of 'GDMF') {
    const list = S.sq[i].filter(p => p.pos === pos);
    xy[pos].forEach(([x, y], j) => {
      const p = list[j];
      if (p) h += `<div class="slot filled" data-id="${esc(p.en)}" style="left:${x}%;top:${y}%"><div class="pk">${av(p)}<span class="sn">${esc(p.name)}</span>${o.reveal ? `<span class="rt hid" data-r="${p.r}">؟؟</span>` : ''}</div></div>`;
      else h += `<div class="slot${S.stage < 5 && ORD[S.stage] === pos ? ' target' : ''}" style="left:${x}%;top:${y}%"><div class="pk"><span class="box">${POS[pos]}</span></div></div>`;
    });
  }
  return h + '</div>';
}
function teamPitch(i, o) {
  return `<div class="tp"><div class="tp-h" style="--kit:${S.k[i]}"><span class="sw"></span><b>${T(i)}</b><span class="num mut">${S.sq[i].length}/${S.N}</span></div>${pitchHTML(i, o)}
    <div class="coach-row">${S.co[i] ? `${av(S.co[i])}<span>المدرب: <b>${esc(S.co[i].name)}</b></span>` : '<span class="mut">المدرب: لم يُشترَ بعد</span>'}</div></div>`;
}
const pitches = o => `<section class="pair">${teamPitch(0, o)}${teamPitch(1, o)}</section>`;
const topbar = () => `<header class="top"><div class="brand"><i data-lucide="gavel"></i><span>مزاد الأساطير</span></div><div class="tools">
  <span class="chip" id="modeChip">${MODES[mode].n} · <span class="num">${M(MODES[mode].money)}</span></span>
  <button class="icon-btn" data-snd onclick="toggleSound()" aria-label="تشغيل الصوت أو إيقافه">${sndBtn()}</button></div></header>`;
function board(turn) {
  const tm = i => `<div class="sbt${turn === i ? ' on' : ''}" style="--kit:${S.k[i]}"><div class="sbh"><span class="sbn">${T(i)}</span>${turn === i ? '<span class="turn">دوره</span>' : ''}${done(i) ? '<span class="turn ok">مكتمل</span>' : ''}</div>
    <div class="sbm num">${M(S.m[i])}</div><div class="sbs">المصروف ${M(S.spent[i])}</div></div>`;
  const total = 2 * S.N + 2;
  return `<section class="sb">${tm(0)}<div class="sbc"><div class="st">${LBL[ORD[Math.min(S.stage, 4)]]}</div><div class="ln">الصفقة <span class="num">${Math.min(S.lotNo, total)}</span> من <span class="num">${total}</span></div>
    <div class="prog"><i style="width:${Math.min(100, S.lotNo / total * 100)}%"></i></div></div>${tm(1)}</section>`;
}
const stepper = () => `<div class="steps">${ORD.map((p, i) => `<span class="${i < S.stage ? 'done' : i === S.stage ? 'on' : ''}">${LBL[p]}</span>`).join('')}</div>`;
function logCard() {
  if (!S.log.length) return '';
  return `<section class="card log"><h3>سجل الانتقالات</h3><ul>${S.log.slice(-6).reverse().map(e =>
    `<li><div><b>${esc(S.n[e.w])}</b> ضمّ ${esc(e.name)} <span>${e.label}</span></div><b class="num">${M(e.price)}</b></li>`).join('')}</ul></section>`;
}
