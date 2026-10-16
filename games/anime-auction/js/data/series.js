/* الأنميات: الرمز|الاسم العربي|كلمات مطابقة اسم الأنمي في AniList (تفصلها ~)|النوع (S شونين، I إيسيكاي) */
const SERIES_RAW = `
OP|ون بيس|One Piece|S
NA|ناروتو|Naruto~Boruto|S
BL|بليتش|Bleach|S
DB|دراغون بول|Dragon Ball|S
HX|هانتر × هانتر|Hunter x Hunter|S
MH|بطلي الأكاديمي|Boku no Hero Academia~My Hero Academia|S
JK|جوجوتسو كايسن|Jujutsu Kaisen|S
DS|قاتل الشياطين|Kimetsu no Yaiba~Demon Slayer|S
AT|هجوم العمالقة|Shingeki no Kyojin~Attack on Titan|S
CM|رجل المنشار|Chainsaw Man|S
BC|بلاك كلوفر|Black Clover|S
FF|فرقة النار|Enen no Shouboutai~Fire Force|S
DR|دكتور ستون|Dr. STONE|S
MS|ماشل|Mashle|S
K8|كايجو رقم 8|Kaijuu 8-gou~Kaiju No. 8|S
DD|داندادان|Dandadan|S
SD|أيام ساكاموتو|Sakamoto Days|S
HP|جنة الجحيم|Jigokuraku~Hell's Paradise|S
FM|الخيميائي المعدني الكامل|Hagane no Renkinjutsushi~Fullmetal Alchemist|S
JJ|مغامرات جوجو الغريبة|JoJo no Kimyou na Bouken~JoJo's Bizarre Adventure|S
FT|فيري تيل|Fairy Tail|S
SS|الخطايا السبع المميتة|Nanatsu no Taizai~The Seven Deadly Sins|S
GT|غينتاما|Gintama|S
YH|يو يو هاكوشو|Yuu Yuu Hakusho~Yu Yu Hakusho|S
IY|إينوياشا|Inuyasha|S
RK|الساموراي كينشين|Rurouni Kenshin|S
SE|سول إيتر|Soul Eater|S
TK|توريكو|Toriko|S
SY|فرسان الزودياك|Saint Seiya|S
OM|ون بانش مان|One Punch Man~One-Punch Man|S
MP|موب سايكو 100|Mob Psycho 100|S
BE|المشعوذ الأزرق|Ao no Exorcist~Blue Exorcist|S
NG|نوراغامي|Noragami|S
AC|فصل الاغتيال|Ansatsu Kyoushitsu~Assassination Classroom|S
DN|مذكرة الموت|Death Note|S
TR|طوكيو ريفنجرز|Tokyo Revengers|S
YG|يوغي أوه|Yu-Gi-Oh|S
MG|ماجي|Magi|S
AK|أكامي|Akame ga Kill|S
FR|فريرين|Sousou no Frieren~Frieren|S
SF|سباي × فاميلي|Spy x Family|S
SA|سورد آرت أونلاين|Sword Art Online|I
RZ|ري:زيرو|Re:Zero~Re:ZERO|I
OV|أوفرلورد|Overlord|I
KS|كونوسوبا|Kono Subarashii Sekai ni Shukufuku wo~KonoSuba|I
MT|موشوكو تينسي|Mushoku Tensei|I
SL|تنسي شيتارا سلايم|Tensei shitara Slime Datta Ken~That Time I Got Reincarnated as a Slime|I
SH|بطل الدرع|Tate no Yuusha no Nariagari~The Rising of the Shield Hero|I
NN|نو غيم نو لايف|No Game No Life|I
SO|سولو ليفلنج|Ore dake Level Up na Ken~Solo Leveling|I
LH|لوغ هورايزن|Log Horizon|I
DM|دانماتشي|Dungeon ni Deai wo Motomeru~DanMachi|I
ES|الشخصية الغامضة في الظل|Kage no Jitsuryokusha~The Eminence in Shadow|I
GS|قاتل الغوبلن|Goblin Slayer|I
DP|الشيطان موظف بدوام جزئي|Hataraku Maou-sama~The Devil is a Part-Timer|I
TY|حكاية تانيا الشريرة|Youjo Senki~Saga of Tanya the Evil|I
AR|أريفوريتا|Arifureta|I
GA|البوابة|Gate|I
GR|غريمغار|Grimgar|I
WM|حفيد الحكيم|Kenja no Mago~Wise Man's Grandchild|I
HN|كيف لا تستدعي ملك الشياطين|Isekai Maou to Shoukan Shoujo~How NOT to Summon a Demon Lord|I
TM|تسوكيميتشي|Tsuki ga Michibiku Isekai Douchuu~Tsukimichi|I
SK|شانغري-لا فرونتير|Shangri-La Frontier|I
`;
const SERIES = {};
SERIES_RAW.trim().split('\n').forEach(l => { const [id, ar, keys, g] = l.split('|'); SERIES[id] = {id, ar, keys:keys.split('~').map(k => k.toLowerCase()), g}; });
