/* أساسيات مشتركة بين كل ألعاب الكومباطا */
const $ = id => document.getElementById(id);
const rnd = n => Math.floor(Math.random() * n);
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;'}[c]));
const reduced = typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;
let muted = false;                       // حالة الصوت مشتركة بين الألعاب
try { muted = localStorage.getItem('muted') === '1'; } catch (e) {}
