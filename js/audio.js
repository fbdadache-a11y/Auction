/* ========== الصوت (Web Audio) ========== */
let AC;
function tone(type, notes, dur, vol) {
  if (muted) return;
  try {
    AC = AC || new (window.AudioContext || window.webkitAudioContext)();
    if (AC.state === 'suspended') AC.resume();
    const t = AC.currentTime, o = AC.createOscillator(), g = AC.createGain();
    o.type = type;
    notes.forEach((f, i) => o.frequency.setValueAtTime(f, t + i * dur));
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur * notes.length);
    o.connect(g); g.connect(AC.destination);
    o.start(t); o.stop(t + dur * notes.length + .02);
  } catch (e) {}
}
const sndBid = () => tone('sine', [520], .12, .18);
const sndPass = () => tone('sawtooth', [200], .22, .07);
const sndDeal = () => tone('triangle', [440, 880], .14, .2);
const sndGoal = () => tone('triangle', [523, 659, 784, 1046], .11, .22);
const sndWhistle = () => tone('sine', [2300, 2000, 2300, 2000], .1, .09);
const sndBtn = () => `<i data-lucide="${muted ? 'volume-x' : 'volume-2'}"></i><span>${muted ? 'الصوت متوقف' : 'الصوت يعمل'}</span>`;
function toggleSound() {
  muted = !muted;
  try { localStorage.setItem('muted', muted ? '1' : '0'); } catch (e) {}
  document.querySelectorAll('[data-snd]').forEach(b => b.innerHTML = sndBtn());
  fx.icons(); sndBid();
}
