# ألعاب الكومباطا

منصة ألعاب لاعبين اثنين على جهاز واحد. موقع ثابت (GitHub Pages) بلا بناء ولا تسجيل.

## الهيكل

```
index.html            المينيو (الصفحة الرئيسية)
hub/                  كل ما يخص المينيو: css/hub.css  js/sketch.js (الرسم اليدوي)  js/doodles.js (الرسومات)  js/hub.js
shared/               مشترك بين الألعاب: js/core.js  fx.js  audio.js  slider.js  css/slider.css
games/registry.js     سجل الألعاب الذي يقرأ منه المينيو
games/auction/        مزاد الأساطير (css/ js/ js/data/)
games/anime-fighter/  قتال الأنمي (صفحة «قريباً» حالياً)
tools/bundle.py       يجمع لعبة في ملف HTML واحد
```

## إضافة لعبة جديدة

1. أنشئ `games/<id>/index.html` وأضف إليه رابط عودة `../../index.html`.
2. أضف سطراً في `games/registry.js`. حقل `status` يكون `ready` أو `soon`، وحقل `art` اسم رسمة في `hub/js/doodles.js`.
3. إن احتجت رسمة جديدة للبطاقة أضفها إلى `DOODLES` في `hub/js/doodles.js`.

## قواعد مهمة

- السكربتات عادية وليست وحدات ES، وتتشارك النطاق العام، فترتيبها في `index.html` مهم.
- الروابط تشير إلى `index.html` صراحة (لا مجلدات) كي تعمل عند الفتح من الملفات مباشرة.
- المينيو فاتح بورق مربعات: الرسم اليدوي يعمل بمحرك داخلي، ويستعمل rough.js تلقائياً إن وصل من الشبكة.

## ملف واحد لكل لعبة

```
python3 tools/bundle.py auction     # ينتج dist/auction.html
```
