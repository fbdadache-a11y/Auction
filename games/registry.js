/* سجل الألعاب: المينيو يقرأ منه. لإضافة لعبة جديدة أضف مجلداً تحت games/ وسطراً هنا.
   status: 'ready' تُفتح، 'soon' تظهر مقفلة بختم «قريباً». art: اسم الرسمة في hub/js/doodles.js */
const GAMES = [
  {id:'auction', title:'مزاد الأساطير', status:'ready', href:'games/auction/index.html', art:'auction',
   blurb:'زايد على نجوم كرة القدم بتقييمات سرية، وابنِ فريقك بميزانية محدودة، ثم اكشف الفائز في مباراة مباشرة.',
   tags:['لاعبان', 'مزاد', 'كرة قدم']},
  {id:'anime-auction', title:'مزاد الأنمي', status:'ready', href:'games/anime-auction/index.html', art:'animeauction',
   blurb:'زايد على ألف بطل من أنميات الشونين والإيسيكاي بقوى سرية، ثم خض معركة جولة بعد جولة باختيار سري.',
   tags:['لاعبان', 'مزاد', 'مانجا']},
  {id:'anime-fighter', title:'قتال الأنمي', status:'soon', href:'games/anime-fighter/index.html', art:'fighters',
   blurb:'مواجهة بين مقاتلين على جهاز واحد. هذه هي اللعبة القادمة.',
   tags:['لاعبان', 'قتال']}
];
