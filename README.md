# ألعاب الكومباطا

منصة ألعاب لاعبين اثنين على جهاز واحد. موقع ثابت (GitHub Pages) بلا بناء ولا تسجيل.

## التشغيل على خادم محلي

لا يلزم بناء ولا تثبيت، يكفي Python. على ويندوز انقر مرتين على `start.bat`، وعلى ماك أو لينكس شغّل `./start.sh`، أو يدوياً:

```
python3 serve.py        # ثم http://localhost:8000
```

بدلاً من ذلك: `npx serve` أو امتداد Live Server في VS Code. التقدّم المحفوظ للمزاد يُخزَّن لكل عنوان ومنفذ، فتغيير المنفذ يعني لعبة جديدة.

## الهيكل

```
index.html            المينيو (الصفحة الرئيسية)
hub/                  كل ما يخص المينيو: css/hub.css  js/sketch.js (الرسم اليدوي)  js/doodles.js (الرسومات)  js/hub.js
shared/               مشترك بين الألعاب: js/core.js  fx.js  audio.js  slider.js  css/slider.css
games/registry.js     سجل الألعاب الذي يقرأ منه المينيو
games/auction/        مزاد الأساطير (css/ js/ js/data/)
games/anime-auction/  مزاد الأنمي بواجهة مانجا (css/ js/ js/data/ + check.html لفحص الصور)
games/anime-fighter/  قتال الأنمي (صفحة «قريباً» حالياً)
serve.py / start.*    تشغيل محلي
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
python3 tools/bundle.py auction         # ينتج dist/auction.html
python3 tools/bundle.py anime-auction   # ينتج dist/anime-auction.html
```
