/* ========== القوائم المنزلقة (مشتركة) ==========
   تعتمد على core.js (reduced). الألوان تأتي من متغيرات CSS في الصفحة المضيفة. */

/* مكوّن القائمة المنزلقة: scroll-snap + أسهم + سحب بالفأرة + تشغيل تلقائي اختياري */
function slider(id, items, cls, auto) {
  return `<div class="slider ${cls || ''}" id="${id}"${auto ? ' data-auto="1"' : ''}>
    <button class="sl-btn" data-d="-1" aria-label="السابق"><i data-lucide="chevron-right"></i></button>
    <div class="track" tabindex="0">${items.map(h => `<div class="sl-i">${h}</div>`).join('')}</div>
    <button class="sl-btn" data-d="1" aria-label="التالي"><i data-lucide="chevron-left"></i></button></div>`;
}
function initSliders() {
  document.querySelectorAll('.slider').forEach(sl => {
    if (sl._on) return; sl._on = 1;
    const tr = sl.querySelector('.track'), [pv, nx] = sl.querySelectorAll('.sl-btn');
    const upd = () => {
      const mx = tr.scrollWidth - tr.clientWidth, x = Math.abs(tr.scrollLeft);
      pv.disabled = x < 4; nx.disabled = x > mx - 4; sl.classList.toggle('no-nav', mx < 4);
    };
    const go = d => {
      const rtl = getComputedStyle(tr).direction === 'rtl';
      tr.scrollBy({left:d * tr.clientWidth * .85 * (rtl ? -1 : 1), behavior:reduced ? 'auto' : 'smooth'});
    };
    pv.onclick = () => go(-1); nx.onclick = () => go(1);
    tr.addEventListener('scroll', upd, {passive:true});
    try { new ResizeObserver(upd).observe(tr); } catch (e) { addEventListener('resize', upd); }
    // سحب بالفأرة (اللمس يتمرّر أصلاً)
    let down = false, moved = false, sx = 0, s0 = 0;
    tr.addEventListener('pointerdown', e => { if (e.pointerType !== 'mouse' || e.button !== 0) return; down = true; moved = false; sx = e.clientX; s0 = tr.scrollLeft; });
    tr.addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - sx;
      if (!moved && Math.abs(dx) > 6) { moved = true; tr.classList.add('drag'); try { tr.setPointerCapture(e.pointerId); } catch (x) {} }
      if (moved) tr.scrollLeft = s0 - dx;
    });
    const end = () => { down = false; tr.classList.remove('drag'); };
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => tr.addEventListener(ev, end));
    tr.addEventListener('click', e => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);
    tr.addEventListener('keydown', e => { if (e.key === 'ArrowLeft') go(getComputedStyle(tr).direction === 'rtl' ? 1 : -1); else if (e.key === 'ArrowRight') go(getComputedStyle(tr).direction === 'rtl' ? -1 : 1); });
    // تشغيل تلقائي بطيء يتوقف عند التفاعل
    if (sl.dataset.auto && !reduced) {
      let hold = false;
      ['pointerenter', 'focusin', 'touchstart'].forEach(ev => sl.addEventListener(ev, () => hold = true, {passive:true}));
      ['pointerleave', 'focusout'].forEach(ev => sl.addEventListener(ev, () => hold = false));
      const t = setInterval(() => {
        if (!sl.isConnected) return clearInterval(t);
        if (hold || document.hidden) return;
        Math.abs(tr.scrollLeft) >= tr.scrollWidth - tr.clientWidth - 4 ? tr.scrollTo({left:0, behavior:'smooth'}) : go(.5);
      }, 3200);
    }
    upd();
  });
}
