/* ========== مولّد الرسم اليدوي ==========
   إن حُمّلت مكتبة rough.js (اختيارية، من الشبكة) استُعملت في الرسم.
   وإلا يرسم هذا الملف بنفسه خطوطاً مزدوجة مهتزة بالأسلوب نفسه، فيبقى الشكل يدوياً دائماً. */
const SK = (() => {
  const NS = 'http://www.w3.org/2000/svg';
  let seed = 11;
  const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
  const jit = a => (rand() - .5) * 2 * a;
  const el = (n, at) => { const e = document.createElementNS(NS, n); for (const k in at) e.setAttribute(k, at[k]); return e; };
  const INK = '#1F1F23';
  const base = o => Object.assign({stroke:INK, width:2.4, rough:1.1, fill:null}, o);
  const RC = svg => { try { return window.rough && window.rough.svg ? window.rough.svg(svg) : null; } catch (e) { return null; } };
  const viaRough = (svg, o, make) => {          // يعيد true إذا نجح الرسم بـ rough.js
    const rc = RC(svg); if (!rc) return false;
    try {
      const cfg = {stroke:o.stroke, strokeWidth:o.width, roughness:o.rough};
      if (o.fill) Object.assign(cfg, {fill:o.fill, fillStyle:'solid'});
      svg.appendChild(make(rc, cfg)); return true;
    } catch (e) { return false; }
  };
  const A = o => o.rough * 1.5;
  const f1 = n => n.toFixed(1);
  const stroke = (svg, d, o) => svg.appendChild(el('path', {d, fill:'none', stroke:o.stroke, 'stroke-width':o.width, 'stroke-linecap':'round', 'stroke-linejoin':'round', pathLength:1}));

  // نقاط → منحنى سلس (Catmull-Rom إلى Bezier)
  function smooth(pts, closed) {
    const n = pts.length, P = i => pts[closed ? (i + n) % n : Math.max(0, Math.min(n - 1, i))];
    let d = `M${f1(P(0)[0])} ${f1(P(0)[1])}`;
    for (let i = 0, last = closed ? n : n - 1; i < last; i++) {
      const p0 = P(i - 1), p1 = P(i), p2 = P(i + 1), p3 = P(i + 2);
      d += `C${f1(p1[0] + (p2[0] - p0[0]) / 6)} ${f1(p1[1] + (p2[1] - p0[1]) / 6)} ${f1(p2[0] - (p3[0] - p1[0]) / 6)} ${f1(p2[1] - (p3[1] - p1[1]) / 6)} ${f1(p2[0])} ${f1(p2[1])}`;
    }
    return d;
  }
  function line(svg, x1, y1, x2, y2, o) {
    o = base(o);
    if (viaRough(svg, o, (rc, c) => rc.line(x1, y1, x2, y2, c))) return;
    for (let k = 0; k < 2; k++) {
      const a = A(o);
      stroke(svg, `M${f1(x1 + jit(a))} ${f1(y1 + jit(a))}Q${f1((x1 + x2) / 2 + jit(a * 1.6))} ${f1((y1 + y2) / 2 + jit(a * 1.6))} ${f1(x2 + jit(a))} ${f1(y2 + jit(a))}`, o);
    }
  }
  function curve(svg, pts, o) {                 // منحنى مفتوح عبر النقاط
    o = base(o);
    if (viaRough(svg, o, (rc, c) => rc.curve(pts, c))) return;
    for (let k = 0; k < 2; k++) stroke(svg, smooth(pts.map(p => [p[0] + jit(A(o)), p[1] + jit(A(o))]), false), o);
  }
  function open(svg, pts, o) { for (let i = 0; i < pts.length - 1; i++) line(svg, pts[i][0], pts[i][1], pts[i + 1][0], pts[i + 1][1], o); }
  function poly(svg, pts, o) {                  // مضلع مغلق
    o = base(o);
    if (viaRough(svg, o, (rc, c) => rc.polygon(pts, c))) return;
    if (o.fill) svg.appendChild(el('path', {d:'M' + pts.map(p => p.join(' ')).join('L') + 'Z', fill:o.fill, stroke:'none'}));
    pts.forEach((p, i) => { const q = pts[(i + 1) % pts.length]; line(svg, p[0], p[1], q[0], q[1], Object.assign({}, o, {fill:null})); });
  }
  function rect(svg, x, y, w, h, o) { poly(svg, [[x, y], [x + w, y], [x + w, y + h], [x, y + h]], o); }
  function ellipse(svg, cx, cy, w, h, o) {
    o = base(o);
    if (viaRough(svg, o, (rc, c) => rc.ellipse(cx, cy, w, h, c))) return;
    if (o.fill) svg.appendChild(el('ellipse', {cx, cy, rx:w / 2, ry:h / 2, fill:o.fill, stroke:'none'}));
    for (let k = 0; k < 2; k++) {
      const n = 14, t0 = rand() * 6.28, pts = [];
      for (let i = 0; i <= n; i++) {             // يتجاوز الدورة قليلاً فيلتقي الطرفان كما في الرسم باليد
        const t = t0 + i / n * 6.28 * 1.05, r = 1 + jit(.025 * o.rough);
        pts.push([cx + Math.cos(t) * w / 2 * r, cy + Math.sin(t) * h / 2 * r]);
      }
      stroke(svg, smooth(pts, false), o);
    }
  }
  // تدوير نقاط حول مركز (بالدرجات)
  const rot = (pts, cx, cy, deg) => { const a = deg * Math.PI / 180, c = Math.cos(a), s = Math.sin(a); return pts.map(([x, y]) => [cx + (x - cx) * c - (y - cy) * s, cy + (x - cx) * s + (y - cy) * c]); };
  // يضبط خصائص الحركة بعد الرسم: مسارات rough.js لا تحمل pathLength
  const finish = (svg, dashed) => svg.querySelectorAll('path').forEach(p => {
    if (!dashed && p.getAttribute('stroke') !== 'none' && !p.hasAttribute('pathLength')) p.setAttribute('pathLength', 1);
  });
  return {line, curve, open, poly, rect, ellipse, rot, finish, seed:s => { seed = s; }, rough:() => !!RC(el('svg', {}))};
})();
