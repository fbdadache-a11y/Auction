/* مؤثرات صوتية خاصة بمزاد الأساطير (الأدوات العامة في shared/js/audio.js) */
const sndBid = () => tone('sine', [520], .12, .18);
const sndPass = () => tone('sawtooth', [200], .22, .07);
const sndDeal = () => tone('triangle', [440, 880], .14, .2);
const sndGoal = () => tone('triangle', [523, 659, 784, 1046], .11, .22);
const sndWhistle = () => tone('sine', [2300, 2000, 2300, 2000], .1, .09);
