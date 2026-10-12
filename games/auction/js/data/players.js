/* اللاعبون: المركز|الاسم|الاسم الإنجليزي (لجلب الصورة)|التقييم السري|الحقبة (P ماضٍ / N حاضر)|الدوري */
const PLAYERS = `
G|ياشين|Lev Yashin|97|P|O
G|بوفون|Gianluigi Buffon|95|P|I
G|كاسياس|Iker Casillas|94|P|S
G|كاهن|Oliver Kahn|93|P|G
G|شمايكل|Peter Schmeichel|93|P|E
G|نوير|Manuel Neuer|93|H|G
G|زوف|Dino Zoff|92|P|I
G|بيتر تشيك|Petr Čech|92|P|E
G|كورتوا|Thibaut Courtois|92|H|S
G|بانكس|Gordon Banks|91|P|E
G|فان در سار|Edwin van der Sar|90|P|E
G|سيب ماير|Sepp Maier|90|P|G
G|شيلتون|Peter Shilton|90|P|E
G|أليسون|Alisson Becker|90|H|E
G|أوبلاك|Jan Oblak|89|H|S
G|جيلمار|Gilmar dos Santos Neves|88|P|O
G|إيدرسون|Ederson (footballer, born 1993)|88|H|E
G|ماينيان|Mike Maignan|88|H|I
G|إيميليانو مارتينيز|Emiliano Martínez|88|H|E
G|ترشتيغن|Marc-André ter Stegen|88|N|S
G|تافاريل|Cláudio Taffarel|87|P|I
G|داساييف|Rinat Dasayev|87|P|O
G|بات جينينغز|Pat Jennings|87|P|E
G|بونو|Yassine Bounou|87|H|S
G|غروسيتش|Gyula Grosics|86|P|O
G|بارتيز|Fabien Barthez|86|P|F
G|سيمان|David Seaman|86|P|E
G|زينغا|Walter Zenga|86|P|I
G|تشيلافيرت|José Luis Chilavert|86|P|O
G|دوناروما|Gianluigi Donnarumma|86|N|I
G|كوبل|Gregor Kobel|86|N|G
G|فيلول|Ubaldo Fillol|85|P|O
G|بفاف|Jean-Marie Pfaff|85|P|G
G|بريود هوم|Michel Preud'homme|85|P|O
G|ليمان|Jens Lehmann|85|P|G
G|فالديس|Víctor Valdés|85|P|S
G|كاريزو|Amadeo Carrizo|85|P|O
G|بيروتسي|Angelo Peruzzi|85|P|I
G|ري كليمنس|Ray Clemence|85|P|E
G|يان سومر|Yann Sommer|85|N|G
G|دي خيا|David de Gea|85|N|E
G|الحضري|Essam El-Hadary|84|P|O
G|رينا|Pepe Reina|84|P|E
G|هاندانوفيتش|Samir Handanović|84|P|I
G|باجليوكا|Gianluca Pagliuca|84|P|I
G|تولدو|Francesco Toldo|84|P|I
G|باربوسا|Moacir Barbosa|84|P|O
G|مازوركيفيتش|Ladislao Mazurkiewicz|84|P|O
G|كيلور نافاس|Keylor Navas|84|N|S
G|لوريس|Hugo Lloris|84|N|E
G|أوناي سيمون|Unai Simón|84|N|S
G|ديوغو كوستا|Diogo Costa|84|N|O
G|دافيد رايا|David Raya|84|N|E
G|كانيساريس|Santiago Cañizares|83|P|S
G|الدعيع|Mohamed Al-Deayea|83|P|O
G|دوديك|Jerzy Dudek|82|P|E
G|جيفن|Shay Given|82|P|E
G|كلاوديو برافو|Claudio Bravo|82|P|S
G|رشدي ريتشبر|Rüştü Reçber|82|P|O
G|غروبيلار|Bruce Grobbelaar|82|P|E
G|رافيلي|Thomas Ravelli|82|P|O
G|لاما|Bernard Lama|82|P|F
G|فريدل|Brad Friedel|82|P|E
G|تيم هوارد|Tim Howard|82|P|E
G|هيغيتا|René Higuita|82|P|O
G|لينو|Bernd Leno|82|N|E
G|بيكفورد|Jordan Pickford|82|N|E
G|سيزني|Wojciech Szczęsny|82|N|I
G|كاسبر شمايكل|Kasper Schmeichel|82|N|E
G|إدوارد ميندي|Édouard Mendy|82|N|E
G|هرادسكي|Lukáš Hrádecký|82|N|G
G|ماماردشفيلي|Giorgi Mamardashvili|82|N|S
G|فيكاريو|Guglielmo Vicario|82|N|E
G|كيلير|Caoimhín Kelleher|82|N|E
G|شوارزر|Mark Schwarzer|81|P|E
G|أوشوا|Guillermo Ochoa|81|N|O
G|مبولحي|Raïs M'Bolhi|80|P|O
G|سيرخيو روميرو|Sergio Romero|80|P|E
G|أونانا|André Onana|80|N|E
G|هارت|Joe Hart|80|N|E
G|موسليرا|Fernando Muslera|80|N|O
G|أريولا|Alphonse Areola|80|N|E
G|تراب|Kevin Trapp|80|N|G
G|باومان|Oliver Baumann|80|N|G
G|كاستيلس|Koen Casteels|80|N|G
G|باتريسيو|Rui Patrício|80|N|O
G|ميريت|Alex Meret|80|N|I
G|بروفيديل|Ivan Provedel|80|N|I
G|سفيلار|Mile Svilar|80|N|I
G|كيبا|Kepa Arrizabalaga|80|N|E
G|موسو|Juan Musso|80|N|I
G|الشناوي|Mohamed El Shenawy|80|N|O
G|رامسديل|Aaron Ramsdale|80|N|E
G|فليكن|Mark Flekken|79|N|E
G|كارنيسيكي|Marco Carnesecchi|79|N|I
G|ريان|Mathew Ryan|79|N|O
G|العويس|Mohammed Al-Owais|79|N|O
G|بوب|Nick Pope|79|N|E
G|جيرونيمو روي|Gerónimo Rulli|79|N|S
G|سا|José Sá (footballer)|79|N|E
G|هندرسون|Dean Henderson|78|N|E
G|فابيانسكي|Łukasz Fabiański|78|N|E
G|غوايتا|Vicente Guaita|78|N|S
G|نوبل|Alexander Nübel|78|N|G
G|بولكا|Marcin Bułka|78|N|F
G|فيربروغن|Bart Verbruggen|78|N|E
G|أنتوني لوبيز|Anthony Lopes|78|N|F
G|سيلس|Matz Sels|77|N|E
G|غوندوز|Alexis Guendouz|74|N|F
G|ماندريا|Anthony Mandrea|72|N|F
G|لوكا زيدان|Luca Zidane|72|N|S
D|بيكنباور|Franz Beckenbauer|97|P|G
D|مالديني|Paolo Maldini|96|P|I
D|بوبي مور|Bobby Moore|94|P|E
D|شيريا|Gaetano Scirea|94|P|I
D|روبرتو كارلوس|Roberto Carlos|94|P|S
D|نيستا|Alessandro Nesta|94|P|I
D|نيلتون سانتوس|Nilton Santos|94|P|O
D|جالما سانتوس|Djalma Santos|94|P|O
D|كافو|Cafu|93|P|I
D|كانافارو|Fabio Cannavaro|93|P|I
D|جون تيري|John Terry|93|P|E
D|باريزي|Franco Baresi|93|P|I
D|كارلوس ألبرتو|Carlos Alberto Torres|93|P|O
D|فاكيتي|Giacinto Facchetti|93|P|I
D|فان دايك|Virgil van Dijk|93|H|E
D|راموس|Sergio Ramos|93|H|S
D|بويول|Carles Puyol|92|P|S
D|داني ألفيس|Dani Alves|92|P|S
D|مارسيلو|Marcelo (footballer, born 1988)|92|P|S
D|رونالد كومان|Ronald Koeman|92|P|S
D|ستام|Jaap Stam|91|P|E
D|فيليب لام|Philipp Lahm|91|P|G
D|ريو فيرديناند|Rio Ferdinand|91|P|E
D|تياغو سيلفا|Thiago Silva|91|P|O
D|ديسايي|Marcel Desailly|91|P|I
D|فيدييتش|Nemanja Vidić|91|P|E
D|بريتنر|Paul Breitner|91|P|G
D|ماتياس سامر|Matthias Sammer|91|P|G
D|زانيتي|Javier Zanetti|91|P|I
D|تورام|Lilian Thuram|90|P|I
D|أشلي كول|Ashley Cole|90|P|E
D|بيكيه|Gerard Piqué|90|P|S
D|لوسيو|Lúcio|90|P|G
D|هييرو|Fernando Hierro|90|P|S
D|لوران بلان|Laurent Blanc|90|P|F
D|كيللييني|Giorgio Chiellini|90|P|I
D|كرول|Ruud Krol|90|P|O
D|فوغتس|Berti Vogts|90|P|G
D|باساريلا|Daniel Passarella|90|P|O
D|روبن دياز|Rúben Dias|90|H|E
D|بونوتشي|Leonardo Bonucci|89|P|I
D|كولر|Jürgen Kohler|89|P|G
D|حكيمي|Achraf Hakimi|89|H|O
D|أرنولد|Trent Alexander-Arnold|89|H|E
D|غودين|Diego Godín|88|P|S
D|بيبي|Pepe (footballer, born 1983)|88|P|S
D|أدامز|Tony Adams (footballer)|88|P|E
D|كامبل|Sol Campbell|88|P|E
D|كاراغر|Jamie Carragher|88|P|E
D|إيفرا|Patrice Evra|88|P|E
D|زامبروتا|Gianluca Zambrotta|88|P|I
D|كوستاكورتا|Alessandro Costacurta|88|P|I
D|بيرغومي|Giuseppe Bergomi|88|P|I
D|جنتيلي|Claudio Gentile|88|P|I
D|برامه|Andreas Brehme|88|P|G
D|بريغل|Hans-Peter Briegel|88|P|G
D|ليزارازو|Bixente Lizarazu|88|P|G
D|ريكاردو كارفاليو|Ricardo Carvalho|88|P|E
D|هوميلس|Mats Hummels|88|P|G
D|صامويل|Walter Samuel|88|P|I
D|بيليني|Hilderaldo Bellini|88|P|O
D|ساليبا|William Saliba|88|H|E
D|روديغر|Antonio Rüdiger|88|H|O
D|ماركينيوس|Marquinhos (footballer, born 1994)|88|H|O
D|ألدير|Aldair|87|P|I
D|دي بوير|Frank de Boer|87|P|O
D|فورستر|Karlheinz Förster|87|P|G
D|باركزاغي|Andrea Barzagli|87|P|I
D|كارفاخال|Dani Carvajal|87|H|S
D|بويتينغ|Jérôme Boateng|86|P|G
D|بيناتيا|Medhi Benatia|86|P|O
D|غالاس|William Gallas|86|P|E
D|تاسوتي|Mauro Tassotti|86|P|I
D|فييرتشوفود|Pietro Vierchowod|86|P|I
D|كابريني|Antonio Cabrini|86|P|I
D|إروين|Denis Irwin|86|P|E
D|ماكغراث|Paul McGrath (footballer)|86|P|E
D|روغيري|Óscar Ruggeri|86|P|O
D|بيرفومو|Roberto Perfumo|86|P|O
D|أيالا|Roberto Ayala|86|P|S
D|كانسيلو|João Cancelo|86|H|E
D|روبرتسون|Andrew Robertson|86|H|E
D|غفارديول|Joško Gvardiol|86|N|E
D|غابرييل ماغالايش|Gabriel Magalhães|86|N|E
D|أبيدال|Éric Abidal|85|P|S
D|مونتيرو|Paolo Montero|85|P|I
D|جي نيفيل|Gary Neville|85|P|E
D|ستيوارت بيرس|Stuart Pearce|85|P|E
D|ميرتساكر|Per Mertesacker|85|P|E
D|أزبيليكويتا|César Azpilicueta|85|P|E
D|فان برونكهورست|Giovanni van Bronckhorst|85|P|O
D|دانيي بليند|Danny Blind|85|P|O
D|إيفانوفيتش|Branislav Ivanović|85|P|E
D|واكر|Kyle Walker|85|N|E
D|ستونز|John Stones|85|N|E
D|تيو هيرنانديز|Theo Hernandez|85|N|O
D|كوليبالي|Kalidou Koulibaly|85|N|I
D|كوندي|Jules Koundé|85|N|S
D|كريستيان روميرو|Cristian Romero|85|N|E
D|نونو مينديش|Nuno Mendes|85|N|F
D|جوردي ألبا|Jordi Alba|85|N|S
D|ألكورتا|Rafael Alkorta|84|P|S
D|أبيلاردو|Abelardo Fernández|84|P|S
D|فيراري|Ciro Ferrara|84|P|I
D|فرانك لوبوف|Frank Leboeuf|84|P|E
D|ليدلي كينغ|Ledley King|84|P|E
D|ديفيس|Alphonso Davies|84|N|G
D|ريس جيمس|Reece James|84|N|E
D|لابورت|Aymeric Laporte|84|N|E
D|ميليتاو|Éder Militão|84|N|S
D|ليساندرو مارتينيز|Lisandro Martínez|84|N|E
D|باستوني|Alessandro Bastoni|84|N|I
D|أراوخو|Ronald Araújo|84|N|S
D|أوباميكانو|Dayot Upamecano|84|N|G
D|تاه|Jonathan Tah|84|N|G
D|بريمر|Bremer (footballer)|84|N|I
D|ديماركو|Federico Dimarco|84|N|I
D|غريمالدو|Alejandro Grimaldo|84|N|G
D|ألبيول|Raúl Albiol|83|P|S
D|دي ليخت|Matthijs de Ligt|83|N|G
D|دومفريس|Denzel Dumfries|83|N|I
D|أكانجي|Manuel Akanji|83|N|E
D|كوناتي|Ibrahima Konaté|83|N|E
D|ألابا|David Alaba|83|N|G
D|شلوتربيك|Nico Schlotterbeck|83|N|G
D|تيمبر|Jurriën Timber|83|N|E
D|أكي|Nathan Aké|83|N|E
D|غيهي|Marc Guéhi|83|N|E
D|سكرينيار|Milan Škriniar|83|N|I
D|ميخيل سالغادو|Míchel Salgado|82|P|S
D|ميتسيلدر|Christoph Metzelder|82|P|G
D|ميلبيرغ|Olof Mellberg|82|P|E
D|ساغنا|Bacary Sagna|82|P|E
D|سيلفستر|Mikaël Silvestre|82|P|E
D|ألديرفايريلد|Toby Alderweireld|82|P|E
D|غامارا|Carlos Gamarra|82|P|S
D|فاران|Raphaël Varane|82|N|S
D|بيدرو بورو|Pedro Porro|82|N|E
D|فان دي فين|Micky van de Ven|82|N|E
D|كولويل|Levi Colwill|82|N|E
D|بن وايت|Ben White (footballer)|82|N|E
D|كالافيوري|Riccardo Calafiori|82|N|I
D|بالدي|Alejandro Balde|82|N|S
D|كوبارسي|Pau Cubarsí|82|N|S
D|إينييغو مارتينيز|Íñigo Martínez|82|N|S
D|ناتشو|Nacho Fernández|82|N|S
D|خيمينيز|José María Giménez|82|N|S
D|أوتامندي|Nicolás Otamendi|82|N|E
D|دي لورينزو|Giovanni Di Lorenzo|82|N|I
D|توموري|Fikayo Tomori|82|N|I
D|لوكاس هيرنانديز|Lucas Hernandez|82|N|G
D|ويليام باتشو|Willian Pacho|82|N|F
D|كيمبيمبي|Presnel Kimpembe|82|N|F
D|أنطونيو سيلفا|António Silva (footballer, born 2003)|82|N|O
D|غيريرو|Raphaël Guerreiro|82|N|G
D|هينكابي|Piero Hincapié|82|N|G
D|كوكوريا|Marc Cucurella|81|N|E
D|غاري ميدل|Gary Medel|80|P|O
D|لوفرين|Dejan Lovren|80|P|E
D|كيير|Simon Kjær|80|P|I
D|كولاروف|Aleksandar Kolarov|80|P|E
D|فيرتونخن|Jan Vertonghen|80|P|E
D|كولو توريه|Kolo Touré|80|P|E
D|ريغوبير سونغ|Rigobert Song|80|P|O
D|ميندي|Ferland Mendy|80|N|S
D|بافارد|Benjamin Pavard|80|N|G
D|ماغواير|Harry Maguire|80|N|E
D|تريبيير|Kieran Trippier|80|N|E
D|كيم مين جاي|Kim Min-jae|80|N|G
D|ماتيب|Joël Matip|80|N|E
D|جوميز|Joe Gomez|80|N|E
D|فريمبونغ|Jeremie Frimpong|80|N|E
D|فوفانا|Wesley Fofana|80|N|E
D|أندرسن|Joachim Andersen|80|N|E
D|برانثويت|Jarrad Branthwaite|80|N|E
D|باو توريس|Pau Torres|80|N|S
D|بوتمان|Sven Botman|80|N|E
D|لو نورمان|Robin Le Normand|80|N|S
D|كريستنسن|Andreas Christensen|80|N|S
D|هوييسن|Dean Huijsen|80|N|E
D|ستيفان سافيتش|Stefan Savić|80|N|S
D|مولينا|Nahuel Molina|80|N|I
D|بوونجورنو|Alessandro Buongiorno|80|N|I
D|كامبياسو|Andrea Cambiaso|80|N|I
D|أتشيربي|Francesco Acerbi|80|N|I
D|دي فراي|Stefan de Vrij|80|N|I
D|كالولو|Pierre Kalulu|80|N|I
D|رحماني|Amir Rrahmani|80|N|I
D|سولي|Niklas Süle|80|N|G
D|كاسترو|Castello Lukeba|80|N|G
D|تودييبو|Jean-Clair Todibo|80|N|F
D|دانيلو|Danilo Luiz da Silva|80|N|I
D|أليكس ساندرو|Alex Sandro|80|N|I
D|أكونيا|Marcos Acuña|80|N|S
D|دانيلو بيريرا|Danilo Pereira|80|N|F
D|إنياسيو|Gonçalo Inácio|80|N|O
D|بلايند|Daley Blind|80|N|O
D|هاتو|Jorrel Hato|80|N|O
D|ميلينكوفيتش|Nikola Milenković|80|N|I
D|كاديوغلو|Ferdi Kadıoğlu|80|N|E
D|زابارني|Illia Zabarnyi|80|N|E
D|أنتوني روبنسون|Antonee Robinson|80|N|E
D|لوك شو|Luke Shaw|80|N|E
D|دالوت|Diogo Dalot|80|N|E
D|مزراوي|Noussair Mazraoui|80|N|G
D|بن سباعيني|Ramy Bensebaini|80|N|G
D|صايس|Romain Saïss|80|N|E
D|سيماكان|Mohamed Simakan|80|N|G
D|كوسونو|Odilon Kossounou|79|N|G
D|ديمرال|Merih Demiral|79|N|O
D|كونسا|Ezri Konsa|79|N|E
D|تاركوفسكي|James Tarkowski|79|N|E
D|مانشيني|Gianluca Mancini|79|N|I
D|ندايكا|Evan Ndicka|79|N|I
D|ماتياس غينتر|Matthias Ginter|79|N|G
D|غوستو|Malo Gusto|79|N|E
D|ريكاردو رودريغيز|Ricardo Rodríguez (footballer)|79|N|I
D|أنتون|Waldemar Anton|79|N|G
D|هانكو|David Hancko|79|N|O
D|بوغيرا|Madjid Bougherra|78|P|O
D|هاني رمزي|Hany Ramzy|78|P|G
D|حجازي|Ahmed Hegazi|78|P|O
D|بيرفيس إستوبينيان|Pervis Estupiñán|78|N|E
D|ليندلوف|Victor Lindelöf|78|N|E
D|ديير|Eric Dier|78|N|E
D|ديفيس بن|Ben Davies (footballer, born 1993)|78|N|E
D|تشالوبا|Trevoh Chalobah|78|N|E
D|باديل|Benoît Badiashile|78|N|E
D|زينتشينكو|Oleksandr Zinchenko|78|N|E
D|تومياسو|Takehiro Tomiyasu|78|N|E
D|دونك|Lewis Dunk|78|N|E
D|ميتشل|Tyrick Mitchell|78|N|E
D|كاش|Matty Cash|78|N|E
D|دين|Lucas Digne|78|N|E
D|شار|Fabian Schär|78|N|O
D|أودوجي|Destiny Udogie|78|N|E
D|كيركيز|Milos Kerkez|78|N|E
D|تسيميكاس|Kostas Tsimikas|78|N|E
D|فيفيان|Dani Vivian|78|N|S
D|ديبست|Zeno Debast|78|N|O
D|كاستين|Timothy Castagne|78|N|E
D|جوسيب ستانيسيتش|Josip Stanišić|78|N|G
D|ميه|Joakim Mæhle|78|N|I
D|هين|Isak Hien|78|N|I
D|دانسو|Kevin Danso|78|N|E
D|إلفيدي|Nico Elvedi|78|N|G
D|سوينتشو|Çağlar Söyüncü|78|N|E
D|ماتفيينكو|Mykola Matviyenko|78|N|O
D|دانيال مونيوز|Daniel Muñoz (footballer, born 1996)|78|N|E
D|ياري مينا|Yerry Mina|78|N|E
D|دافينسون سانشيز|Davinson Sánchez|78|N|E
D|أوليفيرا|Mathías Olivera|78|N|I
D|غوستافو غوميز|Gustavo Gómez (footballer, born 1993)|78|N|O
D|مونتييل|Gonzalo Montiel|78|N|S
D|تاغليافيكو|Nicolás Tagliafico|78|N|F
D|أغيرد|Nayef Aguerd|78|N|E
D|ماندي|Aïssa Mandi|78|N|S
D|تروست إيكونغ|William Troost-Ekong|78|N|O
D|نيلسون سيميدو|Nélson Semedo|78|N|E
D|جيرتروي|Lutsharel Geertruida|78|N|G
D|يورو|Leny Yoro|78|N|F
D|فرساليكو|Šime Vrsaljko|78|P|S
D|أشلي يونغ|Ashley Young|78|P|E
D|ديفيد رام|David Raum|78|N|G
D|كوخ|Robin Koch (footballer)|78|N|G
D|معلول|Ali Maâloul|78|N|O
D|فاندرسون|Vanderson|77|N|F
D|مبيمبا|Chancel Mbemba|77|N|F
D|كيفيور|Jakub Kiwior|77|N|E
D|مونتيس|César Montes|77|N|O
D|بوسخ|Stefan Posch|77|N|G
D|يوسف عطال|Youcef Atal|76|N|F
D|مايا يوشيدا|Maya Yoshida|76|P|E
D|عبد المنعم|Mohamed Abdelmonem|76|N|O
D|فيدا|Domagoj Vida|75|P|O
D|حليش|Rafik Halliche|74|P|O
D|حسن تمبكتي|Hassan Tambakti|74|N|O
D|البليهي|Ali Al-Bulaihi|74|N|O
D|الشهراني|Yasser Al-Shahrani|74|N|O
M|زيدان|Zinedine Zidane|98|P|S
M|رونالدينيو|Ronaldinho|96|P|S
M|إنييستا|Andrés Iniesta|95|P|S
M|تشافي|Xavi|95|P|S
M|بلاتيني|Michel Platini|95|P|I
M|دي بروين|Kevin De Bruyne|95|H|E
M|ماتيوس|Lothar Matthäus|94|P|G
M|كاكا|Kaká|94|P|I
M|زيكو|Zico|94|P|O
M|باجيو|Roberto Baggio|94|P|I
M|بوبي تشارلتون|Bobby Charlton|94|P|E
M|مودريتش|Luka Modrić|94|H|S
M|رودري|Rodri (footballer, born 1996)|94|H|E
M|بيرلو|Andrea Pirlo|93|P|I
M|جيرارد|Steven Gerrard|93|P|E
M|لامبارد|Frank Lampard|93|P|E
M|ديل بييرو|Alessandro Del Piero|93|P|I
M|غوليت|Ruud Gullit|93|P|I
M|فيغو|Luís Figo|93|P|S
M|كروس|Toni Kroos|93|H|S
M|سكولز|Paul Scholes|92|P|E
M|بوسكيتس|Sergio Busquets|92|P|S
M|ريفالدو|Rivaldo|92|P|S
M|توتي|Francesco Totti|92|P|I
M|سقراط|Sócrates|92|P|O
M|ديدي|Didi|92|P|O
M|ريفيرا|Gianni Rivera|92|P|I
M|ماتسولا|Sandro Mazzola|92|P|I
M|هاجي|Gheorghe Hagi|92|P|O
M|مايكل لاودروب|Michael Laudrup|92|P|S
M|بيلينغهام|Jude Bellingham|92|H|S
M|بيكهام|David Beckham|91|P|E
M|فييرا|Patrick Vieira|91|P|E
M|ريكيلمي|Juan Román Riquelme|91|P|O
M|ألونسو|Xabi Alonso|91|P|S
M|نيدفيد|Pavel Nedvěd|91|P|I
M|فالكاو|Paulo Roberto Falcão|91|P|I
M|رايكارد|Frank Rijkaard|91|P|I
M|شفاينشتايغر|Bastian Schweinsteiger|91|P|G
M|ريدوندو|Fernando Redondo|91|P|S
M|روي كين|Roy Keane|91|P|E
M|بيدري|Pedri|91|H|S
M|ماكيليلي|Claude Makélélé|90|P|E
M|سيدورف|Clarence Seedorf|90|P|I
M|جيرسون|Gérson|90|P|O
M|نيسكينز|Johan Neeskens|90|P|O
M|شيافينو|Juan Alberto Schiaffino|90|P|I
M|لويس سواريز ميرامونتيس|Luis Suárez Miramontes|90|P|I
M|دنكان إدواردز|Duncan Edwards|90|P|E
M|بريان روبسون|Bryan Robson|90|P|E
M|غاسكوين|Paul Gascoigne|90|P|E
M|تارديلي|Marco Tardelli|90|P|I
M|رومي كوستا|Rui Costa|90|P|I
M|ياية توريه|Yaya Touré|90|P|E
M|أوكوتشا|Jay-Jay Okocha|90|P|O
M|فيرتز|Florian Wirtz|90|H|G
M|فالفيردي|Federico Valverde|90|H|S
M|برناردو سيلفا|Bernardo Silva|90|H|E
M|فودين|Phil Foden|90|H|E
M|كيميتش|Joshua Kimmich|90|H|G
M|ديفيد سيلفا|David Silva|89|P|E
M|دي روسي|Daniele De Rossi|89|P|I
M|بالاك|Michael Ballack|89|P|G
M|أودغارد|Martin Ødegaard|89|H|E
M|توماس مولر|Thomas Müller|89|H|G
M|جاتوزو|Gennaro Gattuso|88|P|I
M|ديكو|Deco|88|P|S
M|دوناتوني|Roberto Donadoni|88|P|I
M|ألبرتيني|Demetrio Albertini|88|P|I
M|بوبان|Zvonimir Boban|88|P|I
M|سافيتشيفيتش|Dejan Savićević|88|P|I
M|شوستر|Bernd Schuster|88|P|S
M|إيفنبرغ|Stefan Effenberg|88|P|G
M|أوزيل|Mesut Özil|88|P|E
M|أبو تريكة|Mohamed Aboutrika|88|P|O
M|الخطيب|Mahmoud El Khatib|88|P|O
M|أبيدي بيليه|Abedi Pelé|88|P|F
M|براين لاودروب|Brian Laudrup|88|P|I
M|جراهام سونيس|Graeme Souness|88|P|E
M|غافي|Gavi (footballer)|88|H|S
M|كامافينغا|Eduardo Camavinga|88|H|S
M|رايس|Declan Rice|88|H|E
M|كاسيميرو|Casemiro|88|H|S
M|برونو فرنانديز|Bruno Fernandes|88|H|E
M|كول بالمر|Cole Palmer|88|H|E
M|موسيالا|Jamal Musiala|88|H|G
M|راكيتيتش|Ivan Rakitić|87|P|S
M|غوتي|Guti|87|P|S
M|إسيان|Michael Essien|87|P|E
M|محرز|Riyad Mahrez|87|N|E
M|بلومي|Lakhdar Belloumi|86|P|O
M|ليتبارسكي|Pierre Littbarski|86|P|G
M|خضيرة|Sami Khedira|86|P|I
M|كانتي|N'Golo Kanté|86|N|E
M|تشالهانوغلو|Hakan Çalhanoğlu|86|N|I
M|أوليسه|Michael Olise|86|N|G
M|دونغا|Dunga|85|P|O
M|ماكمانامان|Steve McManaman|85|P|E
M|فيدال|Arturo Vidal|85|P|I
M|فيتينيا|Vitinha (footballer, born 2000)|85|N|F
M|بارييلا|Nicolò Barella|85|N|I
M|ماك أليستر|Alexis Mac Allister|85|N|E
M|دي يونغ|Frenkie de Jong|85|N|S
M|غوندوغان|İlkay Gündoğan|85|N|E
M|بوغبا|Paul Pogba|85|N|E
M|تشواميني|Aurélien Tchouaméni|85|N|S
M|سوبوسلاي|Dominik Szoboszlai|85|N|E
M|برونو غيماريش|Bruno Guimarães|85|N|E
M|دانيي أولمو|Dani Olmo|85|N|S
M|إيسكو|Isco|85|N|S
M|حاجي|Mustapha Hadji|84|P|O
M|باولو سوزا|Paulo Sousa|84|P|O
M|فاتينيو|Fabinho|84|N|E
M|جاكا|Granit Xhaka|84|N|E
M|كوتينيو|Philippe Coutinho|84|N|E
M|ألكانتارا|Thiago Alcântara|84|N|G
M|فيراتي|Marco Verratti|84|N|F
M|إنزو فرنانديز|Enzo Fernández|84|N|E
M|كايسيدو|Moisés Caicedo|84|N|E
M|زوبيميندي|Martín Zubimendi|84|N|S
M|فابيان رويز|Fabián Ruiz|84|N|F
M|باكيتا|Lucas Paquetá|84|N|E
M|جواو نيفيس|João Neves|84|N|F
M|زيلينسكي|Piotr Zieliński|83|N|I
M|كوفاسيتش|Mateo Kovačić|83|N|E
M|بروزوفيتش|Marcelo Brozović|83|N|I
M|ميلينكوفيتش سافيتش|Sergej Milinković-Savić|83|N|I
M|تونالي|Sandro Tonali|83|N|I
M|رابيو|Adrien Rabiot|83|N|F
M|غرافنبيرخ|Ryan Gravenberch|83|N|E
M|ريندرز|Tijjani Reijnders|83|N|I
M|شافي سيمونز|Xavi Simons|83|N|G
M|غولر|Arda Güler|83|N|S
M|بارتي|Thomas Partey|83|N|E
M|إريكسن|Christian Eriksen|83|N|E
M|كوكي|Koke (footballer)|83|N|S
M|ماديسون|James Maddison|82|N|E
M|دي بول|Rodrigo De Paul|82|N|S
M|مرينو|Mikel Merino|82|N|E
M|يوريونتي|Marcos Llorente|82|N|S
M|زاير إيميري|Warren Zaïre-Emery|82|N|F
M|كامارا|Boubacar Kamara|82|N|E
M|نكونكو|Christopher Nkunku|82|N|G
M|دوي|Désiré Doué|82|N|F
M|مايكو|Kobbie Mainoo|82|N|E
M|غريليش|Jack Grealish|82|N|E
M|ماكتوميناي|Scott McTominay|82|N|I
M|روجرز|Morgan Rogers|82|N|E
M|إيزي|Eberechi Eze|82|N|E
M|بالينيا|João Palhinha|82|N|E
M|روبن نيفيس|Rúben Neves|82|N|E
M|بينتانكور|Rodrigo Bentancur|82|N|E
M|أراسكايتا|Giorgian de Arrascaeta|82|N|O
M|لوبوتكا|Stanislav Lobotka|82|N|I
M|تيليمانس|Youri Tielemans|82|N|E
M|كوبمينرز|Teun Koopmeiners|82|N|I
M|هويبيرغ|Pierre-Emile Højbjerg|82|N|E
M|كولوسيفسكي|Dejan Kulusevski|82|N|E
M|سابيتسر|Marcel Sabitzer|82|N|G
M|غوريتسكا|Leon Goretzka|82|N|G
M|كيسيه|Franck Kessié|82|N|I
M|جيمس رودريغيز|James Rodríguez|82|N|S
M|زياش|Hakim Ziyech|82|N|E
M|أمرابط|Sofyan Amrabat|82|N|E
M|بن ناصر|Ismaël Bennacer|82|N|I
M|ماتيتش|Nemanja Matić|80|P|E
M|موتينيو|João Moutinho|80|P|E
M|أرانغيز|Charles Aránguiz|80|P|G
M|ماونت|Mason Mount|80|N|E
M|غالاغر|Conor Gallagher|80|N|E
M|وارتون|Adam Wharton|80|N|E
M|غروس|Pascal Groß|80|N|E
M|بافلوفيتش|Aleksandar Pavlović|80|N|G
M|براندت|Julian Brandt|80|N|G
M|فراتيسي|Davide Frattesi|80|N|I
M|جورجينيو|Jorginho (Italian footballer)|80|N|E
M|لوكاتيلي|Manuel Locatelli|80|N|I
M|بيليغريني|Lorenzo Pellegrini|80|N|I
M|مخيتاريان|Henrikh Mkhitaryan|80|N|I
M|أنغيسا|André-Frank Zambo Anguissa|80|N|I
M|كوني|Manu Koné|80|N|I
M|فوفانا يوسف|Youssouf Fofana|80|N|I
M|غيندوزي|Matteo Guendouzi|80|N|I
M|شيرقي|Rayan Cherki|80|N|F
M|فيرمين لوبيز|Fermín López|80|N|S
M|بايينا|Álex Baena|80|N|S
M|بابلو باريوس|Pablo Barrios|80|N|S
M|جويلينتون|Joelinton|80|N|E
M|دوغلاس لويز|Douglas Luiz|80|N|E
M|جيرسون البرازيلي|Gerson (footballer, born 1997)|80|N|F
M|أوغارتي|Manuel Ugarte|80|N|E
M|باريديس|Leandro Paredes|80|N|I
M|لو سيلسو|Giovani Lo Celso|80|N|S
M|باالاسيوس|Exequiel Palacios|80|N|G
M|ألمادا|Thiago Almada|80|N|O
M|ماتيوس نونيس|Matheus Nunes|80|N|E
M|بيدرو غونسالفيس|Pedro Gonçalves|80|N|O
M|ويتسل|Axel Witsel|80|N|O
M|أونانا أمادو|Amadou Onana|80|N|E
M|فينالدوم|Georginio Wijnaldum|80|N|E
M|كوكجو|Orkun Kökçü|80|N|O
M|لايمر|Konrad Laimer|80|N|G
M|بومغارتنر|Christoph Baumgartner|80|N|G
M|إدريسا غاي|Idrissa Gana Gueye|80|N|E
M|بابي مطر سار|Pape Matar Sarr|80|N|E
M|فوفانا سيكو|Seko Fofana|80|N|F
M|الدوسري|Salem Al-Dawsari|80|N|O
M|لي كانغ إن|Lee Kang-in|80|N|F
M|كوادرادو|Juan Cuadrado|79|P|I
M|هندرسون جوردان|Jordan Henderson|79|N|E
M|وارد براوس|James Ward-Prowse|79|N|E
M|أندريتش|Robert Andrich|79|N|G
M|إيمري جان|Emre Can|79|N|G
M|ريفريلر|Remo Freuler|79|N|I
M|دايتشي كامادا|Daichi Kamada|79|N|G
M|هوانغ إن بوم|Hwang In-beom|79|N|O
M|ماكيني|Weston McKennie|79|N|I
M|تايلر آدامز|Tyler Adams (soccer)|79|N|E
M|إدسون ألفاريز|Edson Álvarez|79|N|E
M|سول|Saúl Ñíguez|79|N|S
M|ندايدي|Wilfred Ndidi|79|N|E
M|إيوبي|Alex Iwobi|79|N|E
M|هيريرا|Héctor Herrera|78|P|O
M|فيغولي|Sofiane Feghouli|78|P|S
M|براهيمي|Yacine Brahimi|78|P|O
M|تريزيغيه|Mahmoud Hassan Trezeguet|78|N|E
M|ستيلر|Angelo Stiller|78|N|G
M|روفيلا|Nicolò Rovella|78|N|I
M|ريتشي|Samuele Ricci|78|N|I
M|كريستانتي|Bryan Cristante|78|N|I
M|باشاليتش|Mario Pašalić|78|N|I
M|فلاشيتش|Nikola Vlašić|78|N|I
M|كوستيتش|Filip Kostić|78|N|O
M|بيرغه|Sander Berge|78|N|E
M|سميث رو|Emile Smith Rowe|78|N|E
M|ديلاني|Thomas Delaney|78|N|G
M|دامسغارد|Mikkel Damsgaard|78|N|E
M|فورسبيرغ|Emil Forsberg|78|N|G
M|شلاجر|Xaver Schlager|78|N|G
M|سيوالد|Nicolas Seiwald|78|N|G
M|زكريا|Denis Zakaria|78|N|G
M|إندو|Wataru Endō|78|N|E
M|موريتا|Hidemasa Morita|78|N|O
M|يوسف موسى|Yunus Musah|78|N|I
M|أوستاكيو|Stephen Eustáquio|78|N|O
M|ميغيل ألميرون|Miguel Almirón|78|N|E
M|دي لا كروز|Nicolás de la Cruz|78|N|O
M|توريرا|Lucas Torreira|78|N|E
M|ماستانتونو|Franco Mastantuono|78|N|S
M|أوتافيو|Otávio (footballer, born 1995)|78|N|O
M|جواو ماريو|João Mário (footballer, born 1993)|78|N|O
M|رينياتو سانشيز|Renato Sanches|78|N|F
M|فكير|Nabil Fekir|78|N|F
M|تولييسو|Corentin Tolisso|78|N|G
M|خيفرين تورام|Khéphren Thuram|78|N|I
M|أكليوش|Maghnes Akliouche|78|N|F
M|سانغاري|Ibrahim Sangaré|78|N|E
M|كيتا|Naby Keïta|78|N|E
M|كاسادو|Marc Casadó|78|N|S
M|أليكس غارسيا|Aleix García|78|N|S
M|سيبالوس|Dani Ceballos|78|N|S
M|مينديز برايس|Brais Méndez|78|N|S
M|ماكغين|John McGinn|78|N|E
M|كورتيس جونز|Curtis Jones|78|N|E
M|هارفي إليوت|Harvey Elliott|78|N|E
M|فيرمان|Joey Veerman|78|N|O
M|فانيكين|Hans Vanaken|78|N|O
M|هايدارا|Amadou Haidara|77|N|G
M|ريينا|Gio Reyna|77|N|G
M|هاتاتي|Reo Hatate|77|N|O
M|تشافيز|Luis Chávez (footballer)|77|N|O
M|هوفمان|Jonas Hofmann|77|N|G
M|جاكوب رامزي|Jacob Ramsey|77|N|E
M|إيبيرشر|Michel Aebischer|77|N|I
M|تايدر|Saphir Taïder|76|P|I
M|سيرجي روبرتو|Sergi Roberto|76|P|S
M|إيليس سخيري|Ellyes Skhiri|76|N|G
M|شايبي|Farès Chaïbi|76|N|F
M|أوار|Houssem Aouar|76|N|F
M|الفرج|Salman Al-Faraj|76|N|O
M|بوداوي|Hicham Boudaoui|74|N|F
M|زروقي|Ramiz Zerrouki|74|N|O
M|كانو|Mohamed Kanno|74|N|O
M|مجبري|Hannibal Mejbri|74|N|E
M|بن طالب|Nabil Bentaleb|72|N|E
M|بلقبلة|Haris Belkebla|72|N|F
M|زرقان|Adem Zorgane|72|N|O
F|بيليه|Pelé|99|P|O
F|مارادونا|Diego Maradona|99|P|I
F|ميسي|Lionel Messi|99|H|S
F|كرويف|Johan Cruyff|98|P|S
F|رونالدو الظاهرة|Ronaldo (Brazilian footballer)|98|P|S
F|كريستيانو|Cristiano Ronaldo|98|H|S
F|دي ستيفانو|Alfredo Di Stéfano|97|P|S
F|فان باستن|Marco van Basten|97|P|I
F|بوشكاش|Ferenc Puskás|97|P|S
F|غارينشا|Garrincha|97|P|O
F|جورج بيست|George Best|96|P|E
F|جيرد مولر|Gerd Müller|96|P|G
F|يوسيبيو|Eusébio|96|P|O
F|مبابي|Kylian Mbappé|96|H|F
F|هالاند|Erling Haaland|96|H|E
F|هنري|Thierry Henry|95|P|E
F|صلاح|Mohamed Salah|95|H|E
F|بيرغكامب|Dennis Bergkamp|94|P|E
F|روماريو|Romário|94|P|O
F|جيرزينيو|Jairzinho|94|P|O
F|ريفيلينو|Rivellino|94|P|O
F|ليفاندوفسكي|Robert Lewandowski|94|H|G
F|بنزيما|Karim Benzema|94|H|S
F|هاري كين|Harry Kane|94|H|E
F|فينيسيوس|Vinícius Júnior|94|H|S
F|ميازا|Giuseppe Meazza|94|P|I
F|توستاو|Tostão|93|P|O
F|كيني دالغليش|Kenny Dalglish|93|P|E
F|شيفتشينكو|Andriy Shevchenko|93|P|I
F|راؤول|Raúl (footballer, born 1977)|93|P|S
F|كانتونا|Eric Cantona|93|P|E
F|روني|Wayne Rooney|93|P|E
F|زلاتان|Zlatan Ibrahimović|93|P|I
F|سواريز|Luis Suárez|93|H|S
F|نيمار|Neymar|93|H|F
F|جنتو|Francisco Gento|93|P|S
F|ستانلي ماثيوز|Stanley Matthews|93|P|E
F|دينيس لو|Denis Law|93|P|E
F|كيفن كيغان|Kevin Keegan|92|P|E
F|باتيستوتا|Gabriel Batistuta|92|P|I
F|دروغبا|Didier Drogba|92|P|E
F|فان نيستلروي|Ruud van Nistelrooy|92|P|E
F|رومينيغه|Karl-Heinz Rummenigge|92|P|G
F|غيجي ريفا|Gigi Riva|92|P|I
F|كوبا|Raymond Kopa|92|P|O
F|فونتين|Just Fontaine|92|P|F
F|جيمي غريفز|Jimmy Greaves|92|P|E
F|توم فيني|Tom Finney|92|P|E
F|بيولا|Silvio Piola|92|P|I
F|هنريك لارسون|Henrik Larsson|92|P|O
F|هوغو سانشيز|Hugo Sánchez|92|P|S
F|غاري لينيكر|Gary Lineker|91|P|E
F|شيرر|Alan Shearer|91|P|E
F|أوين|Michael Owen|91|P|E
F|توريس|Fernando Torres|91|P|E
F|كلوزه|Miroslav Klose|91|P|G
F|ستويشكوف|Hristo Stoichkov|91|P|S
F|ماريو كيمبس|Mario Kempes|91|P|S
F|باولو روسي|Paolo Rossi|91|P|I
F|أغويرو|Sergio Agüero|91|P|E
F|جورج ويا|George Weah|91|P|I
F|ماني|Sadio Mané|91|H|E
F|غريزمان|Antoine Griezmann|91|H|S
F|أوفي زيلر|Uwe Seeler|91|P|G
F|كلينسمان|Jürgen Klinsmann|91|P|G
F|إيتو|Samuel Eto'o|90|P|S
F|فيا|David Villa|90|P|S
F|هازارد|Eden Hazard|90|P|E
F|إيان راش|Ian Rush|90|P|E
F|بوكايو ساكا|Bukayo Saka|90|H|E
F|دي ماريا|Ángel Di María|90|H|F
F|سون|Son Heung-min|90|H|E
F|بيبيتو|Bebeto|90|P|S
F|رودي فولر|Rudi Völler|90|P|G
F|بونيبيرتي|Giampiero Boniperti|90|P|I
F|بابان|Jean-Pierre Papin|90|P|F
F|فرانشيسكولي|Enzo Francescoli|90|P|O
F|تريزيغيه|David Trezeguet|90|P|I
F|كريستيان فييري|Christian Vieri|89|P|I
F|زولا|Gianfranco Zola|89|P|I
F|كارلوس تيفيز|Carlos Tevez|89|P|E
F|كافاني|Edinson Cavani|89|P|F
F|فيالي|Gianluca Vialli|88|P|I
F|هيرنان كريسبو|Hernán Crespo|88|P|I
F|دافور شوكر|Davor Šuker|88|P|S
F|غونزالو هيغواين|Gonzalo Higuaín|88|P|I
F|فورلان|Diego Forlán|88|P|S
F|ديميتار برباتوف|Dimitar Berbatov|88|P|E
F|روبي فاولر|Robbie Fowler|88|P|E
F|ماجر|Rabah Madjer|88|P|O
F|علي دائي|Ali Daei|88|P|G
F|لامين يامال|Lamine Yamal|88|H|S
F|لاوتارو|Lautaro Martínez|88|H|I
F|لوكاكو|Romelu Lukaku|88|H|I
F|جيف هيرست|Geoff Hurst|88|P|E
F|بونينسيغنا|Roberto Boninsegna|88|P|I
F|كاريكا|Careca|88|P|I
F|كانيجيا|Claudio Caniggia|88|P|I
F|سولشاير|Ole Gunnar Solskjær|88|P|E
F|مانشيني اللاعب|Roberto Mancini|88|P|I
F|إنزاغي|Filippo Inzaghi|87|P|I
F|إيان رايت|Ian Wright|87|P|E
F|روجر ميلا|Roger Milla|87|P|O
F|أوسيمين|Victor Osimhen|87|N|I
F|جوليان ألفاريز|Julián Álvarez|87|N|E
F|ديمبيلي|Ousmane Dembélé|87|N|F
F|رافينيا|Raphinha|87|N|S
F|ميليتو|Diego Milito|87|P|I
F|لوكا توني|Luca Toni|87|P|I
F|أنيلكا|Nicolas Anelka|87|P|E
F|مانزوكيتش|Mario Mandžukić|87|P|I
F|أرشافين|Andrey Arshavin|87|P|O
F|دوايت يورك|Dwight Yorke|86|P|E
F|راشفورد|Marcus Rashford|86|N|E
F|رويس|Marco Reus|86|N|G
F|خفيتشا كفاراتسخيليا|Khvicha Kvaratskhelia|86|N|I
F|رودريغو|Rodrygo|86|N|S
F|لويس دياز|Luis Díaz|86|N|E
F|رافائيل لياو|Rafael Leão|86|N|I
F|هاكان شوكور|Hakan Şükür|86|P|O
F|شيلاتشي|Salvatore Schillaci|86|P|I
F|بيردسلي|Peter Beardsley|86|P|O
F|بلانكو|Cuauhtémoc Blanco|86|P|O
F|ماركيلو سالاس|Marcelo Salas|86|P|I
F|زامورانو|Iván Zamorano|86|P|I
F|أورتيغا|Ariel Ortega|86|P|O
F|تيدي شيرينغهام|Teddy Sheringham|85|P|E
F|أندي كول|Andy Cole|85|P|E
F|كانو|Nwankwo Kanu|85|P|E
F|حسام حسن|Hossam Hassan|85|P|O
F|ماجد عبد الله|Majed Abdullah|85|P|O
F|سعيد العويران|Saeed Al-Owairan|85|P|O
F|ماريو غوميز|Mario Gómez|85|P|G
F|لوكاس بودولسكي|Lukas Podolski|85|P|G
F|ستيرلينغ|Raheem Sterling|85|N|E
F|إيزاك|Alexander Isak|85|N|E
F|غنابري|Serge Gnabry|85|N|G
F|هافرتز|Kai Havertz|85|N|E
F|ساني|Leroy Sané|85|N|G
F|ميكيل أويارزابال|Mikel Oyarzabal|85|N|S
F|نيكو ويليامز|Nico Williams|85|N|S
F|أوليفييه جيرو|Olivier Giroud|85|P|E
F|دييغو جوتا|Diogo Jota|85|N|E
F|ديبالا|Paulo Dybala|85|N|I
F|فيكتور غيوكيريس|Viktor Gyökeres|85|N|E
F|تشيتشاريتو|Javier Hernández (footballer)|85|P|E
F|فالكاو|Radamel Falcao|85|P|S
F|غاكبو|Cody Gakpo|85|N|E
F|بيزارو|Claudio Pizarro|84|P|G
F|فيرمينو|Roberto Firmino|84|N|E
F|فيليكس|João Félix|84|N|S
F|غابرييل جيسوس|Gabriel Jesus|84|N|E
F|مارتينيلي|Gabriel Martinelli|84|N|E
F|كينغسلي كومان|Kingsley Coman|84|N|G
F|بيير إيميريك أوباميانغ|Pierre-Emerick Aubameyang|84|N|G
F|فلاهوفيتش|Dušan Vlahović|84|N|I
F|عمر مرموش|Omar Marmoush|84|N|G
F|جيلاردينو|Alberto Gilardino|84|P|I
F|ساويولا|Javier Saviola|84|P|S
F|أسبريلا|Faustino Asprilla|84|P|I
F|بيرهوف|Oliver Bierhoff|84|P|I
F|واتكنز|Ollie Watkins|84|N|E
F|قدوس|Mohammed Kudus|84|N|E
F|دزيكو|Edin Džeko|84|N|I
F|ماركوس تورام|Marcus Thuram|83|N|I
F|جيريمي دوكو|Jérémy Doku|83|N|E
F|لوكمان|Ademola Lookman|83|N|I
F|غوارسيو|Serhou Guirassy|83|N|G
F|إيمانويل أديبايور|Emmanuel Adebayor|82|P|E
F|سامي الجابر|Sami Al-Jaber|82|P|O
F|ياسر القحطاني|Yasser Al-Qahtani|82|P|O
F|أسينسيو|Marco Asensio|82|N|S
F|ديباي|Memphis Depay|82|N|O
F|نونيز|Darwin Núñez|82|N|E
F|هالك|Hulk (footballer)|82|P|O
F|ألفارو موراتا|Álvaro Morata|82|N|S
F|بيدرو نيتو|Pedro Neto|82|N|E
F|ماتيوس كونيا|Matheus Cunha|82|N|E
F|لياندرو تروسار|Leandro Trossard|82|N|E
F|تشيزا|Federico Chiesa|82|N|I
F|إمموبيلي|Ciro Immobile|82|N|I
F|أرتيم دوفبيك|Artem Dovbyk|82|N|S
F|كريستيان بوليسيتش|Christian Pulisic|82|N|I
F|مهدي طارمي|Mehdi Taremi|82|N|O
F|تاكيفوسا كوبو|Takefusa Kubo|82|N|S
F|كاورو ميتوما|Kaoru Mitoma|82|N|E
F|دريس ميرتنز|Dries Mertens|82|P|I
F|أليكسيس سانشيز|Alexis Sánchez|82|P|E
F|كاهيل|Tim Cahill|82|P|E
F|كيويل|Harry Kewell|82|P|E
F|فيدوكا|Mark Viduka|82|P|E
F|لافيزي|Ezequiel Lavezzi|82|P|F
F|فيلتور|Sylvain Wiltord|82|P|E
F|ساها|Louis Saha|82|P|E
F|رافانيلي|Fabrizio Ravanelli|82|P|I
F|إيليتشيتش|Josip Iličić|82|P|I
F|تومسون|Jon Dahl Tomasson|82|P|O
F|شيشكو|Benjamin Šeško|82|N|G
F|أنتوني غوردون|Anthony Gordon|82|N|E
F|بوين|Jarrod Bowen|82|N|E
F|مبيومو|Bryan Mbeumo|82|N|E
F|توني|Ivan Toney|82|N|E
F|شيك|Patrik Schick|82|N|G
F|سانتياغو خيمينيز|Santiago Giménez|82|N|O
F|جوناثان ديفيد|Jonathan David|82|N|F
F|براهيم دياز|Brahim Díaz|82|N|S
F|ميتروفيتش|Aleksandar Mitrović|82|N|E
F|أوبندا|Lois Openda|82|N|G
F|ميدو|Mido (footballer)|80|P|O
F|جاكسون|Nicolas Jackson|80|N|E
F|فولكروغ|Niclas Füllkrug|80|N|G
F|إندريك|Endrick (footballer)|80|N|S
F|ريتشارليسون|Richarlison|80|N|E
F|بيدرو|Pedro (footballer, born 1997)|80|N|O
F|غابرييل باربوسا|Gabriel Barbosa|80|N|O
F|ويليان|Willian (footballer, born 1988)|80|P|E
F|أوسكار|Oscar (footballer, born 1991)|80|P|E
F|باولينيو|Paulinho (footballer, born 1988)|80|P|O
F|ألكسندر باتو|Alexandre Pato|80|P|I
F|لوكاس مورا|Lucas Moura|80|P|E
F|فيران توريس|Ferran Torres|80|N|S
F|أنسو فاتي|Ansu Fati|80|N|S
F|كولو مواني|Randal Kolo Muani|80|N|G
F|غونزالو راموس|Gonçalo Ramos|80|N|O
F|سكاماكا|Gianluca Scamacca|80|N|I
F|رتيغي|Mateo Retegui|80|N|I
F|ألكسندر سورلوث|Alexander Sørloth|80|N|S
F|أمين غويري|Amine Gouiri|80|N|F
F|يوسف النصيري|Youssef En-Nesyri|80|N|S
F|سيباستيان هالر|Sébastien Haller|80|N|G
F|ويلفريد زاها|Wilfried Zaha|80|N|E
F|سردار أزمون|Sardar Azmoun|80|N|O
F|هوانغ هي تشان|Hwang Hee-chan|80|N|E
F|كروتش|Peter Crouch|80|P|E
F|ليفرديناند|Les Ferdinand|80|P|E
F|كانشلسكيس|Andrei Kanchelskis|80|P|E
F|شاكيري|Xherdan Shaqiri|80|P|E
F|بوراك يلماظ|Burak Yılmaz|80|P|O
F|ماتيتا|Jean-Philippe Mateta|80|N|E
F|سولانكي|Dominic Solanke|80|N|E
F|فيسا|Yoane Wissa|80|N|E
F|سيمينيو|Antoine Semenyo|80|N|E
F|غارناتشو|Alejandro Garnacho|80|N|E
F|جواو بيدرو|João Pedro (footballer, born 2001)|80|N|E
F|إيكيتيكي|Hugo Ekitiké|80|N|E
F|مالن|Donyell Malen|80|N|G
F|بونيفاس|Victor Boniface|80|N|G
F|كين موسى|Moise Kean|80|N|I
F|إنسينيي|Lorenzo Insigne|80|N|I
F|بيراردي|Domenico Berardi|80|N|I
F|نيكو غونزاليس|Nico González|80|N|S
F|نيكولاس غونزاليس|Nicolás González (footballer, born 1998)|80|N|I
F|راؤول خيمينيز|Raúl Jiménez|80|N|E
F|ساندي|Iliman Ndiaye|80|N|E
F|سار|Ismaïla Sarr|80|N|E
F|عمورة|Mohamed Amoura|80|N|G
F|تاديتش|Dušan Tadić|80|N|O
F|بيريشيتش|Ivan Perišić|80|N|I
F|كراماريتش|Andrej Kramarić|80|N|G
F|أرناوتوفيتش|Marko Arnautović|80|N|E
F|رافا سيلفا|Rafa Silva|80|N|O
F|بيرخفاين|Steven Bergwijn|80|N|O
F|إيناكي ويليامز|Iñaki Williams|79|N|S
F|ريتسو دوان|Ritsu Dōan|79|N|G
F|أونداف|Deniz Undav|79|N|G
F|أنخيل كوريا|Ángel Correa|79|N|S
F|جيوفاني سيميوني|Giovanni Simeone|79|N|I
F|إمبولو|Breel Embolo|79|N|F
F|أنتوني|Antony (Brazilian footballer)|78|N|E
F|خوسيلو|Joselu|78|N|S
F|فرانسيسكو كونسيساو|Francisco Conceição|78|N|O
F|بيلوتي|Andrea Belotti|78|N|I
F|ماتيو بوليتانو|Matteo Politano|78|N|I
F|فولارين بالوغون|Folarin Balogun|78|N|F
F|إسلام سليماني|Islam Slimani|78|P|O
F|بغداد بونجاح|Baghdad Bounedjah|78|N|O
F|ريان أيت نوري|Rayan Aït-Nouri|78|N|E
F|أيوب الكعبي|Ayoub El Kaabi|78|N|O
F|نيكولا بيبي|Nicolas Pépé|78|N|F
F|دوست|Bas Dost|78|P|O
F|بنتيكي|Christian Benteke|78|P|E
F|هويلوند|Rasmus Højlund|78|N|E
F|زيركزي|Joshua Zirkzee|78|N|E
F|أماد ديالو|Amad Diallo|78|N|E
F|مادويكي|Noni Madueke|78|N|E
F|برينان جونسون|Brennan Johnson|78|N|E
F|أديمي|Karim Adeyemi|78|N|G
F|ديميروفيتش|Ermedin Demirović|78|N|G
F|بوركهارت|Jonathan Burkardt|78|N|G
F|لوكيباكيو|Dodi Lukebakio|78|N|S
F|ميليك|Arkadiusz Milik|78|N|I
F|راسبادوري|Giacomo Raspadori|78|N|I
F|كاستيانوس|Valentín Castellanos|78|N|I
F|جون دوران|Jhon Durán|78|N|E
F|زاباتا|Duván Zapata|78|N|I
F|لوزانو|Hirving Lozano|78|N|I
F|تشوكويزي|Samuel Chukwueze|78|N|S
F|أدينغرا|Simon Adingra|78|N|E
F|بن رحمة|Saïd Benrahma|78|N|E
F|الزلزولي|Abde Ezzalzouli|78|N|S
F|ندوي|Dan Ndoye|78|N|I
F|مودريك|Mykhailo Mudryk|78|N|E
F|سوداكوف|Georgiy Sudakov|78|N|O
F|أكتوركوغلو|Kerem Aktürkoğlu|78|N|O
F|غونسالو غيديس|Gonçalo Guedes|78|N|O
F|أندريه سيلفا|André Silva (footballer, born 1995)|78|N|G
F|لويس دي يونغ|Luuk de Jong|78|N|O
F|فيغهورست|Wout Weghorst|78|N|E
F|بروبي|Brian Brobbey|78|N|O
F|نوا لانغ|Noa Lang|78|N|O
F|دي كيتيلير|Charles De Ketelaere|78|N|I
F|مصطفى محمد|Mostafa Mohamed|76|N|F
F|أوريجي|Divock Origi|76|P|E
F|هيسكي|Emile Heskey|76|P|E
F|ياز|Roman Pavlyuchenko|76|P|O
F|جيوم|Artem Dzyuba|76|P|O
F|ياريمنكو|Andriy Yarmolenko|76|P|O
F|أحمد موسى|Ahmed Musa|76|P|O
F|أندريه أيو|André Ayew|76|P|F
F|فراس البريكان|Firas Al-Buraikan|74|N|O
F|بلعيلي|Youcef Belaïli|74|P|O
F|دلور|Andy Delort|74|N|F
F|علي لاجامي|Ali Lajami|70|N|O
`;
