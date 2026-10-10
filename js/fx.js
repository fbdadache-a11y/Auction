/* ========== المؤثرات (مكتبات خارجية اختيارية: GSAP وcanvas-confetti وlucide) ========== */
const fx = {
  icons() { try { if (window.lucide) lucide.createIcons(); } catch (e) {} },
  boom(o) { try { if (window.confetti && !reduced) confetti(Object.assign({ticks:160, disableForReducedMotion:true, zIndex:60}, o)); } catch (e) {} },
  count(el, to, from, dur) {
    if (!el) return;
    if (window.gsap && !reduced && from !== to) {
      const o = {v:from}; el.textContent = from;
      gsap.to(o, {v:to, duration:dur || .4, ease:'power2.out', onUpdate() { el.textContent = Math.round(o.v); }, onComplete() { el.textContent = to; }});
    } else el.textContent = to;
  },
  slam(el) { if (el && window.gsap && !reduced) gsap.fromTo(el, {scale:2.6, opacity:0, rotation:-24}, {scale:1, opacity:1, rotation:-8, duration:.5, ease:'back.out(1.8)'}); },
  at(el) { if (!el) return {x:.5, y:.5}; const r = el.getBoundingClientRect(); return {x:(r.left + r.width / 2) / innerWidth, y:(r.top + r.height / 2) / innerHeight}; },
  cannons(colors, ms) {
    const end = Date.now() + ms;
    (function frame() {
      fx.boom({particleCount:5, angle:60, spread:55, origin:{x:0, y:.65}, colors});
      fx.boom({particleCount:5, angle:120, spread:55, origin:{x:1, y:.65}, colors});
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }
};
window.__lu = fx.icons;

/* ===== تمرير ناعم (Lenis) ===== */
let LEN;
function initLenis() {
  try {
    if (LEN || !window.Lenis || reduced) return;
    LEN = new Lenis({lerp:.1});
    document.documentElement.classList.add('lenis');
    const raf = t => { LEN.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  } catch (e) { LEN = null; }
}
window.__lenis = initLenis; initLenis();
const toTop = () => { try { LEN ? LEN.scrollTo(0, {immediate:true}) : window.scrollTo(0, 0); } catch (e) { window.scrollTo(0, 0); } };

/* ===== كرة قدم ثلاثية الأبعاد (Three.js) ===== */
function ball() {
  const c = $('ball');
  if (!c || !window.THREE || c.dataset.on) return;
  try {
    c.style.display = 'block';
    const w = c.clientWidth || 120, h = c.clientHeight || 120;
    const r = new THREE.WebGLRenderer({canvas:c, alpha:true, antialias:true});
    r.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2)); r.setSize(w, h, false);
    const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(35, w / h, .1, 50); cam.position.z = 3.6;
    const g = new THREE.IcosahedronGeometry(1, 1);
    const n = v => (Math.round(v * 100) / 100 + 0).toFixed(2), key = (x, y, z) => n(x) + ',' + n(y) + ',' + n(z);
    const o = new THREE.IcosahedronGeometry(1, 0).getAttribute('position'), orig = new Set();
    for (let i = 0; i < o.count; i++) orig.add(key(o.getX(i), o.getY(i), o.getZ(i)));
    const p = g.getAttribute('position'), col = new Float32Array(p.count * 3);
    for (let f = 0; f < p.count; f += 3) {   // المثلثات الملامسة لرؤوس المجسم الأصلي تُلوَّن داكنة كبقع الكرة
      let dark = false;
      for (let k = 0; k < 3; k++) if (orig.has(key(p.getX(f + k), p.getY(f + k), p.getZ(f + k)))) dark = true;
      const rgb = dark ? [.09, .09, .1] : [.96, .95, .91];
      for (let k = 0; k < 3; k++) col.set(rgb, (f + k) * 3);
    }
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const m = new THREE.Mesh(g, new THREE.MeshStandardMaterial({vertexColors:true, flatShading:true, roughness:.5, metalness:.05}));
    m.rotation.x = .4;
    const d = new THREE.DirectionalLight(0xffffff, 1.2); d.position.set(3, 4, 5);
    sc.add(m); sc.add(new THREE.AmbientLight(0xffffff, .75)); sc.add(d);
    c.dataset.on = 1;
    const loop = () => {
      if (!c.isConnected) { r.dispose(); return; }
      if (!reduced) m.rotation.y += .012;
      r.render(sc, cam); requestAnimationFrame(loop);
    };
    loop();
  } catch (e) { c.style.display = 'none'; }
}
window.__ball = ball;
