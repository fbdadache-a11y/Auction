/* ========== الرسومات اليدوية للمينيو ==========
   كل رسمة دالة تأخذ عنصر svg وتملؤه بخطوط. أضف رسمة جديدة لكل لعبة جديدة. */
const HL = '#FFE45E';
const DOODLES = {
  // شعار الكومباطا: قرص أصفر بحرف C وشرارتين
  logo(s) {
    SK.ellipse(s, 32, 32, 56, 56, {fill:HL, width:2.6});
    SK.curve(s, [[43, 21], [33, 15], [22, 20], [16, 32], [21, 45], [32, 50], [43, 44]], {width:5});
    SK.line(s, 47, 14, 52, 8, {width:2.4}); SK.line(s, 51, 20, 57, 19, {width:2.4});
  },
  star(s) {
    const pts = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? 7 : 16; pts.push([20 + Math.cos(a) * r, 20 + Math.sin(a) * r]); }
    SK.poly(s, pts, {fill:HL, width:2});
  },
  arrow(s) {
    SK.curve(s, [[6, 8], [30, 4], [58, 14], [74, 42]], {width:2.4});
    SK.line(s, 74, 42, 63, 38, {width:2.4}); SK.line(s, 74, 42, 77, 30, {width:2.4});
  },
  // مزاد الأساطير: كرة قدم ومطرقة وقاعدة
  auction(s) {
    SK.ellipse(s, 62, 84, 80, 80, {fill:'#FBFBF8', width:2.6});
    const pent = [], rays = [];
    for (let i = 0; i < 5; i++) { const a = -Math.PI / 2 + i * 2 * Math.PI / 5; pent.push([62 + Math.cos(a) * 14, 84 + Math.sin(a) * 14]); rays.push([62 + Math.cos(a) * 38, 84 + Math.sin(a) * 38]); }
    SK.poly(s, pent, {fill:'#1F1F23', width:1.6});
    pent.forEach((p, i) => SK.line(s, p[0], p[1], rays[i][0], rays[i][1], {width:2}));
    const cx = 172, cy = 56, R = pts => SK.rot(pts, cx, cy, 35);
    SK.poly(s, R([[cx - 5, cy + 13], [cx + 5, cy + 13], [cx + 5, cy + 82], [cx - 5, cy + 82]]), {fill:'#FBFBF8', width:2.2});
    SK.poly(s, R([[cx - 34, cy - 14], [cx + 34, cy - 14], [cx + 34, cy + 14], [cx - 34, cy + 14]]), {fill:HL, width:2.6});
    SK.rect(s, 138, 126, 84, 14, {fill:'#FBFBF8', width:2.4});
    SK.line(s, 116, 36, 108, 26, {width:2.2}); SK.line(s, 124, 42, 124, 30, {width:2.2}); SK.line(s, 110, 46, 100, 42, {width:2.2});
  },
  // قتال الأنمي: مقاتلان وبرق بينهما
  fighters(s) {
    const L = {head:[60, 40], spikes:[[47, 32], [43, 14], [54, 23], [58, 7], [65, 22], [74, 11], [74, 30]],
      parts:[[[60, 54], [60, 100]], [[60, 66], [98, 58]], [[60, 66], [42, 84]], [[60, 100], [44, 134]], [[60, 100], [82, 132]]]};
    const draw = m => {
      const X = x => m ? 240 - x : x, o = {width:2.6};
      SK.ellipse(s, X(L.head[0]), L.head[1], 26, 28, Object.assign({fill:'#FBFBF8'}, o));
      SK.open(s, L.spikes.map(p => [X(p[0]), p[1]]), o);
      L.parts.forEach(([a, b]) => SK.line(s, X(a[0]), a[1], X(b[0]), b[1], o));
    };
    draw(false); draw(true);
    SK.poly(s, [[126, 18], [110, 66], [124, 66], [112, 112], [136, 56], [122, 56]], {fill:HL, width:2.4});
    SK.line(s, 104, 40, 96, 34, {width:2}); SK.line(s, 140, 40, 148, 34, {width:2});
  },
  // خط تمييز عريض بلون الماركر تحت العنوان
  marker(s) { SK.curve(s, [[4, 9], [70, 5], [150, 10], [230, 5], [296, 9]], {stroke:HL, width:11, rough:.8}); }
};
function drawArt(svg) {
  const f = DOODLES[svg.dataset.art]; if (!f) return;
  svg.innerHTML = ''; SK.seed(5 + [...svg.dataset.art].reduce((a, c) => a + c.charCodeAt(0), 0));
  f(svg); SK.finish(svg);
}
