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
