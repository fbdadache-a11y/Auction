/* المقاتلون: الدور (B بدني، A قدرات، V سرعة ومهارة)|الاسم العربي|الاسم الإنجليزي (للبحث عن الصورة)|القوة السرية|رمز الأنمي */
const CHARS_RAW = `
B|لوفي|Monkey D. Luffy|92|OP
V|زورو|Roronoa Zoro|84|OP
V|سانجي|Sanji|78|OP
V|أوسب|Usopp|52|OP
A|نامي|Nami|49|OP
A|روبين|Nico Robin|63|OP
B|تشوبر|Tony Tony Chopper|57|OP
B|فرانكي|Franky|63|OP
V|بروك|Brook|60|OP
B|جينبي|Jinbe|73|OP
A|إيس|Portgas D. Ace|75|OP
B|سابو|Sabo|74|OP
B|وايتبيرد|Edward Newgate|86|OP
B|غول دي روجر|Gol D. Roger|88|OP
V|شانكس|Shanks|84|OP
V|ميهوك|Dracule Mihawk|82|OP
B|كايدو|Kaido|88|OP
B|بيج مام|Charlotte Linlin|84|OP
A|بلاك بيرد|Marshall D. Teach|80|OP
A|أكاينو|Sakazuki|78|OP
A|أوكيجي|Kuzan|77|OP
A|كيزارو|Borsalino|75|OP
B|غارب|Monkey D. Garp|79|OP
B|سينغوكو|Sengoku|69|OP
A|كروكودايل|Crocodile|67|OP
A|دوفلامينغو|Donquixote Doflamingo|71|OP
A|لو|Trafalgar Law|70|OP
A|كيد|Eustass Kid|66|OP
A|هانكوك|Boa Hancock|68|OP
V|لوتشي|Rob Lucci|69|OP
A|بارتولوميو|Bartolomeo|47|OP
A|بوجي|Buggy|43|OP
B|سموكر|Smoker|62|OP
V|كوبي|Koby|51|OP
V|كاتاكوري|Charlotte Katakuri|73|OP
V|أودن|Kozuki Oden|72|OP
A|إينيل|Enel|70|OP
B|أرلونغ|Arlong|50|OP
B|دون كريغ|Don Krieg|41|OP
V|كورو|Kuro|39|OP
B|ألفيدا|Alvida|31|OP
A|كوما|Bartholomew Kuma|71|OP
A|فيفي|Nefertari Vivi|36|OP
B|ياماتو|Yamato|74|OP
A|سيزر كلاون|Caesar Clown|45|OP
A|بيرونا|Perona|38|OP
A|مورايا|Gecko Moria|59|OP
V|كاكو|Kaku|57|OP
B|هودي جونز|Hody Jones|53|OP
A|دراغون|Monkey D. Dragon|82|OP
A|ناروتو|Naruto Uzumaki|96|NA
A|ساسكي|Sasuke Uchiha|88|NA
V|كاكاشي|Kakashi Hatake|79|NA
B|ساكورا|Sakura Haruno|64|NA
B|هيناتا|Hinata Hyuuga|56|NA
V|نيجي|Neji Hyuuga|67|NA
A|هيروزن ساروتوبي|Hiruzen Sarutobi|73|NA
A|إيتاتشي|Itachi Uchiha|84|NA
A|جيرايا|Jiraiya|78|NA
B|تسونادي|Tsunade|75|NA
A|أوروتشيمارو|Orochimaru|77|NA
A|مادارا|Madara Uchiha|94|NA
A|أوبيتو|Obito Uchiha|82|NA
A|هاشيراما|Hashirama Senju|86|NA
V|توبيراما|Tobirama Senju|74|NA
V|ميناتو|Minato Namikaze|86|NA
A|كوشينا|Kushina Uzumaki|63|NA
A|ناغاتو|Nagato|80|NA
A|كونان|Konan|64|NA
B|كيساميه|Kisame Hoshigaki|71|NA
A|ديدارا|Deidara|69|NA
A|ساسوري|Sasori|67|NA
B|هيدان|Hidan|59|NA
B|كاكوزو|Kakuzu|68|NA
A|زيتسو|Zetsu|49|NA
A|غارا|Gaara|75|NA
V|روك لي|Rock Lee|70|NA
B|مايت غاي|Might Guy|82|NA
A|شيكامارو|Shikamaru Nara|61|NA
B|تشوجي|Choji Akimichi|52|NA
A|إينو|Ino Yamanaka|41|NA
V|كيبا|Kiba Inuzuka|47|NA
A|شينو|Shino Aburame|49|NA
V|تين تين|Tenten|44|NA
A|كابوتو|Kabuto Yakushi|66|NA
B|كيلر بي|Killer B|74|NA
B|كيوبي|Kurama|84|NA
A|كاغويا|Kaguya Otsutsuki|90|NA
A|هاغوروما|Hagoromo Otsutsuki|88|NA
A|بوروتو|Boruto Uzumaki|69|NA
A|ساردا|Sarada Uchiha|55|NA
A|ميتسوكي|Mitsuki|59|NA
B|كاواكي|Kawaki|79|NA
A|موموشيكي|Momoshiki Otsutsuki|84|NA
V|زابوزا|Zabuza Momochi|63|NA
V|هاكو|Haku|53|NA
V|شيسوي|Shisui Uchiha|78|NA
V|كونوهامارو|Konohamaru Sarutobi|38|NA
V|إيروكا|Iruka Umino|36|NA
A|دانزو|Danzo Shimura|63|NA
B|إيتشيغو|Ichigo Kurosaki|94|BL
A|روكيا|Rukia Kuchiki|67|BL
V|رينجي|Renji Abarai|70|BL
V|بياكويا|Byakuya Kuchiki|79|BL
B|كينباتشي|Kenpachi Zaraki|82|BL
A|توشيرو|Toushirou Hitsugaya|74|BL
A|أوراهارا|Kisuke Urahara|84|BL
V|يورويتشي|Yoruichi Shihouin|78|BL
A|ياماموتو|Genryuusai Yamamoto|90|BL
A|آيزن|Sousuke Aizen|88|BL
V|غين|Gin Ichimaru|73|BL
V|تووسن|Kaname Tousen|61|BL
A|أولكيورا|Ulquiorra Cifer|79|BL
B|غريميو|Grimmjow Jaegerjaquez|77|BL
B|نويتورا|Nnoitra Gilga|68|BL
A|ستارك|Coyote Starrk|86|BL
A|باراغان|Baraggan Louisenbairn|78|BL
A|هاليبل|Tier Harribel|75|BL
A|سزايل|Szayelaporro Granz|63|BL
V|زوماري|Zommari Rureaux|57|BL
A|أرونييرو|Aaroniero Arruruerie|55|BL
B|ياامي|Yammy Llargo|66|BL
A|أوريهيمي|Orihime Inoue|50|BL
A|إيشيدا|Uryuu Ishida|67|BL
B|تشاد|Yasutora Sado|63|BL
B|إيشين|Isshin Kurosaki|80|BL
A|أوكيتاكي|Juushirou Ukitake|77|BL
V|كيوراكو|Shunsui Kyouraku|80|BL
B|كوماموتو|Sajin Komamura|70|BL
V|سوي فونغ|Soifon|68|BL
A|مايوري|Mayuri Kurotsuchi|64|BL
B|أونوهانا|Retsu Unohana|82|BL
A|رانغيكو|Rangiku Matsumoto|57|BL
V|هيساغي|Shuuhei Hisagi|63|BL
B|إيكاكو|Ikkaku Madarame|57|BL
V|يوميتشيكا|Yumichika Ayasegawa|51|BL
B|كون|Kon|32|BL
B|كييغو|Keigo Asano|31|BL
A|دون كانونجي|Don Kanonji|31|BL
A|يهواخ|Yhwach|96|BL
B|غوكو|Son Goku|98|DB
B|فيجيتا|Vegeta|94|DB
B|غوهان|Son Gohan|84|DB
A|بيكولو|Piccolo|77|DB
V|ترانكس|Trunks|78|DB
B|غوتن|Son Goten|61|DB
V|كريلين|Krillin|55|DB
V|تين شين هان|Tenshinhan|59|DB
V|يامشا|Yamcha|47|DB
A|تشاوزو|Chaozu|35|DB
A|السيد روشي|Master Roshi|63|DB
A|بولما|Bulma|31|DB
B|ميستر ساتان|Mr. Satan|32|DB
A|فريزا|Frieza|90|DB
B|سيل|Cell|78|DB
B|ماجين بو|Majin Buu|84|DB
B|رادتز|Raditz|52|DB
B|ناباا|Nappa|53|DB
V|أندرويد 17|Android 17|75|DB
V|أندرويد 18|Android 18|71|DB
B|أندرويد 16|Android 16|67|DB
A|دكتور غيرو|Dr. Gero|49|DB
V|زاربون|Zarbon|59|DB
B|دودوريا|Dodoria|51|DB
A|القبطان جينيو|Captain Ginyu|61|DB
B|ريكوم|Recoome|54|DB
B|الملك كولد|King Cold|68|DB
B|كولر|Cooler|80|DB
B|بروللي|Broly|92|DB
A|بيروس|Beerus|97|DB
A|ويس|Whis|99|DB
B|جيرين|Jiren|86|DB
V|هيت|Hit|82|DB
A|زاماسو|Zamasu|75|DB
V|كابا|Cabba|63|DB
B|كاليفلا|Caulifla|71|DB
B|كيل|Kale|73|DB
A|فيجيتو|Vegito|97|DB
B|غوتنكس|Gotenks|73|DB
A|بابيدي|Babidi|38|DB
A|دابورا|Dabura|66|DB
A|دندي|Dende|34|DB
B|غون|Gon Freecss|75|HX
V|كيلوا|Killua Zoldyck|73|HX
A|كورابيكا|Kurapika|64|HX
B|ليوريو|Leorio Paradinight|47|HX
A|هيسوكا|Hisoka Morow|75|HX
A|كرولو|Chrollo Lucilfer|80|HX
A|إيلومي|Illumi Zoldyck|69|HX
B|سيلفا|Silva Zoldyck|79|HX
V|زينو|Zeno Zoldyck|82|HX
B|نيترو|Isaac Netero|84|HX
B|ميريوم|Meruem|88|HX
A|نفيربيتو|Neferpitou|82|HX
V|شايابوف|Shaiapouf|77|HX
V|كومغي|Komugi|31|HX
A|جينغ|Ging Freecss|86|HX
B|بيسكيت|Biscuit Krueger|64|HX
V|كايت|Kite|59|HX
B|ناكل|Knuckle Bine|62|HX
A|ألوكا|Alluka Zoldyck|78|HX
V|فيتان|Feitan Portor|69|HX
B|فينكس|Phinks Magcub|64|HX
V|نوبو ناغا|Nobunaga Hazama|63|HX
V|ماتشي|Machi Komacine|60|HX
B|أوفوجين|Uvogin|71|HX
A|فرانكلين|Franklin Bordeau|57|HX
A|شالنارك|Shalnark|52|HX
A|باكونودا|Pakunoda|56|HX
V|هانزو|Hanzo|53|HX
A|تونبا|Tonpa|34|HX
B|رازور|Razor|50|HX
A|كالوتو|Kalluto Zoldyck|49|HX
A|وينغ|Wing|48|HX
B|ميدوريا|Izuku Midoriya|80|MH
B|أول مايت|All Might|88|MH
A|باكوغو|Katsuki Bakugo|73|MH
A|شوتو تودوروكي|Shoto Todoroki|75|MH
B|إندفور|Enji Todoroki|70|MH
V|هوكس|Hawks|67|MH
A|شيغاراكي|Tomura Shigaraki|78|MH
A|أول فور وان|All For One|88|MH
A|دابي|Dabi|63|MH
V|توغا|Himiko Toga|50|MH
B|كيريشيما|Eijiro Kirishima|55|MH
V|إيدا|Tenya Iida|57|MH
A|أوراراكا|Ochaco Uraraka|52|MH
A|مومو ياويوروزو|Momo Yaoyorozu|56|MH
V|تسيو أساي|Tsuyu Asui|49|MH
A|توكوياميي|Fumikage Tokoyami|59|MH
A|كامينارى|Denki Kaminari|46|MH
B|شوجي|Mezo Shoji|44|MH
A|ميبا أشيدو|Mina Ashido|43|MH
A|كيوكا جيرو|Kyoka Jiro|41|MH
A|مينيتا|Minoru Mineta|32|MH
B|أوجيرو|Mashirao Ojiro|42|MH
B|ريكيدو ساتو|Rikido Sato|47|MH
V|سيرو|Hanta Sero|39|MH
A|هاغاكوري|Toru Hagakure|35|MH
A|أوياما|Yuga Aoyama|34|MH
B|ميريو توغاتا|Mirio Togata|72|MH
A|تاماكي أماجيكي|Tamaki Amajiki|64|MH
A|نيجيري هادو|Nejire Hado|61|MH
V|أيزاوا|Shota Aizawa|62|MH
V|ستين|Stain|68|MH
A|أوفرهول|Kai Chisaki|69|MH
B|غيغانتوماخيا|Gigantomachia|77|MH
B|موسكولار|Muscular|53|MH
A|كوروغيري|Kurogiri|60|MH
V|غران توريني|Gran Torino|63|MH
A|بيست جينيست|Best Jeanist|57|MH
A|شينسو|Hitoshi Shinso|51|MH
A|مونوما|Neito Monoma|45|MH
B|كيندو|Itsuka Kendo|48|MH
A|غوجو|Satoru Gojo|97|JK
A|سوكونا|Ryomen Sukuna|94|JK
B|يوجي إيتادوري|Yuji Itadori|75|JK
A|ميغومي فوشيغورو|Megumi Fushiguro|68|JK
A|نوبارا كوغيساكي|Nobara Kugisaki|54|JK
V|ماكي زenin|Maki Zenin|72|JK
A|توغي إيناكي|Toge Inumaki|56|JK
B|باندا|Panda|53|JK
A|يوتا أوكوتسو|Yuta Okkotsu|84|JK
V|نانامي|Kento Nanami|69|JK
A|غيتو|Suguru Geto|74|JK
V|توجي فوشيغورو|Toji Fushiguro|82|JK
A|ماهيتو|Mahito|71|JK
A|جوغو|Jogo|73|JK
A|هاناميا|Hanami|64|JK
A|داغون|Dagon|62|JK
A|تشوسو|Choso|61|JK
A|كينجاكو|Kenjaku|79|JK
B|أوي تودو|Aoi Todo|67|JK
A|ماي زينين|Mai Zenin|40|JK
V|ناويا زينين|Naoya Zenin|57|JK
V|ناوبيتو زينين|Naobito Zenin|63|JK
B|يوكي تسوكومو|Yuki Tsukumo|86|JK
B|هاكاري|Kinji Hakari|66|JK
A|كاشيمو|Hajime Kashimo|77|JK
A|ميكامارو|Kokichi Muta|49|JK
A|ياغا|Masamichi Yaga|50|JK
A|إينو|Takuma Ino|42|JK
V|موموكا نيشيميا|Momo Nishimiya|36|JK
V|كاسومي ميوا|Kasumi Miwa|35|JK
A|شوكو إيئيري|Shoko Ieiri|33|JK
V|إيجيتشي|Kiyotaka Ijichi|31|JK
V|تانجيرو|Tanjiro Kamado|71|DS
B|نيزوكو|Nezuko Kamado|62|DS
V|زينيتسو|Zenitsu Agatsuma|61|DS
B|إينوسكي|Inosuke Hashibira|59|DS
V|جيو تومیوكا|Giyu Tomioka|75|DS
V|شينوبو|Shinobu Kocho|57|DS
V|رينغوكو|Kyojuro Rengoku|74|DS
V|تينغن أوزوي|Tengen Uzui|72|DS
V|ميتسوري|Mitsuri Kanroji|70|DS
V|موييتشيرو|Muichiro Tokito|78|DS
V|أوباناي|Obanai Iguro|66|DS
V|سانيمي|Sanemi Shinazugawa|73|DS
B|غيومي هيميجيما|Gyomei Himejima|82|DS
V|كانao|Kanao Tsuyuri|51|DS
B|غينيا|Genya Shinazugawa|49|DS
A|موزان|Muzan Kibutsuji|88|DS
V|كوكوشيبو|Kokushibo|86|DS
A|دوما|Doma|75|DS
B|أكازا|Akaza|79|DS
A|غيوتارو|Gyutaro|67|DS
A|داكي|Daki|57|DS
A|إنمو|Enmu|52|DS
A|روي|Rui|54|DS
A|كيوغاي|Kyogai|44|DS
A|هانتنغو|Hantengu|63|DS
V|كايغاكو|Kaigaku|60|DS
V|يوريتشي|Yoriichi Tsugikuni|94|DS
V|سابيتو|Sabito|55|DS
B|هاغانيزوكا|Hotaru Haganezuka|31|DS
V|موراتا|Murata|34|DS
B|إيرين|Eren Yeager|88|AT
V|ميكاسا|Mikasa Ackerman|78|AT
A|أرمين|Armin Arlert|51|AT
V|ليفاي|Levi Ackerman|80|AT
V|إروين|Erwin Smith|59|AT
A|هانجي|Hange Zoe|47|AT
B|راينر|Reiner Braun|64|AT
B|بيرثولدت|Bertolt Hoover|61|AT
B|آني|Annie Leonhart|67|AT
B|زيك|Zeke Yeager|75|AT
B|بوركو|Porco Galliard|55|AT
B|بيك|Pieck Finger|53|AT
B|فالكو|Falco Grice|45|AT
V|غابي|Gabi Braun|41|AT
V|جان|Jean Kirstein|52|AT
V|كوني|Connie Springer|43|AT
V|ساشا|Sasha Braus|48|AT
B|هيستوريا|Historia Reiss|38|AT
B|يمير|Ymir|57|AT
V|كيني|Kenny Ackerman|63|AT
B|غريشا|Grisha Yeager|54|AT
V|ماركو|Marco Bott|33|AT
V|فلوتش|Floch Forster|34|AT
V|مايك زاكارياس|Mike Zacharias|53|AT
B|دينجي|Denji|63|CM
A|باور|Power|62|CM
A|آكي هاياكاوا|Aki Hayakawa|60|CM
A|ماكيما|Makima|90|CM
A|هيميمو|Himeno|51|CM
V|كوبيني|Kobeni Higashiyama|37|CM
A|شيطان الملاك|Angel Devil|50|CM
B|بوتشيتا|Pochita|79|CM
A|ريزي|Reze|71|CM
V|كوانشي|Quanxi|74|CM
V|كيشيبي|Kishibe|77|CM
A|بيم|Beam|51|CM
V|رجل الكاتانا|Katana Man|66|CM
B|سانتا كلوز|Santa Claus|53|CM
A|يورو|Yoru|84|CM
A|آسا ميتاكا|Asa Mitaka|56|CM
B|أستا|Asta|75|BC
A|يونو|Yuno|78|BC
A|نويل سيلفا|Noelle Silva|59|BC
B|ياامي|Yami Sukehiro|84|BC
A|جوليوس|Julius Novachrono|90|BC
A|ويليام فانجانس|William Vangeance|72|BC
A|تشارمي|Charmy Pappitson|53|BC
A|فانيسا|Vanessa Enoteca|55|BC
A|لاك فولتيا|Luck Voltia|69|BC
A|ماغنا|Magna Swing|57|BC
A|غوش|Gauche Adlai|52|BC
A|غوردون|Gordon Agrippa|42|BC
A|غراي|Grey|44|BC
A|فينرال|Finral Roulacase|56|BC
V|زورا|Zora Ideale|62|BC
A|ميموزا|Mimosa Vermillion|50|BC
A|كلاوس|Klaus Lunettes|51|BC
A|ناخت|Nacht Faust|66|BC
A|سيكري|Secre Swallowtail|46|BC
A|فويغوليون|Fuegoleon Vermillion|71|BC
B|ميريوليونا|Mereoleona Vermillion|79|BC
A|نوزل|Nozel Silva|74|BC
A|دوروثي|Dorothy Unsworth|49|BC
V|لانغريس|Langris Vaude|60|BC
A|لوسيوس زوغراتيس|Lucius Zogratis|94|BC
B|زينون|Zenon Zogratis|70|BC
V|شينرا|Shinra Kusakabe|73|FF
V|آرثر|Arthur Boyle|70|FF
A|ماكي أوزي|Maki Oze|57|FF
A|تاماكي كوتاتسو|Tamaki Kotatsu|53|FF
A|آيريس|Iris|39|FF
V|هيناوا|Takehisa Hinawa|54|FF
B|أوبي|Akitaru Obi|51|FF
V|بينيمارو|Benimaru Shinmon|82|FF
A|شو|Sho Kusakabe|64|FF
V|جوكر|Joker|67|FF
A|هيبانا|Hibana|49|FF
A|إيفانجليست|Evangelist|80|FF
A|ريكا|Rekka Hoshimiya|63|FF
A|هاوميا|Haumea|68|FF
A|سينكو|Senku Ishigami|61|DR
B|تايجو|Taiju Oki|50|DR
V|يوزوريها|Yuzuriha Ogawa|36|DR
B|تسوكاسا|Tsukasa Shishio|79|DR
A|كروم|Chrome|46|DR
V|كوهاكو|Kohaku|63|DR
A|ريوسوي|Ryusui Nanami|48|DR
A|جين|Gen Asagiri|39|DR
B|ماغما|Magma|56|DR
V|هيوغا|Hyoga|53|DR
B|كينرو|Kinro|50|DR
V|جينرو|Ginro|47|DR
B|ماشل|Mash Burnedead|80|MS
V|لانس|Lance Crown|61|MS
A|فين|Finn Ames|51|MS
A|دوت|Dot Barrett|49|MS
A|ليمون|Lemon Irvine|43|MS
A|هابيل|Abel Walker|64|MS
A|إنوسنت زيرو|Innocent Zero|88|MS
A|راين|Rayne Ames|57|MS
B|كافكا|Kafka Hibino|73|K8
V|مينا أشيرو|Mina Ashiro|78|K8
A|ريNO|Reno Ichikawa|52|K8
V|كيكورو|Kikoru Shinomiya|69|K8
V|هوشينا|Soshiro Hoshina|75|K8
V|ناروومي|Gen Narumi|67|K8
V|إيزومو|Haruichi Izumo|40|K8
B|كايجو رقم 9|Kaiju No. 9|84|K8
A|مومو أياسي|Momo Ayase|63|DD
V|أوكارون|Ken Takakura|59|DD
A|إيرا شيراتوري|Aira Shiratori|49|DD
A|جيجي|Jin Enjoji|38|DD
A|تيربو جراني|Turbo Granny|70|DD
A|سيكو أياسي|Seiko Ayase|66|DD
A|فامولا|Vamola|55|DD
B|أكروباتيك سيلكي|Acrobatic Silky|54|DD
B|ساكاموتو|Taro Sakamoto|86|SD
A|شين أساكورا|Shin Asakura|57|SD
V|لو شياوتانغ|Xiaotang Lu|64|SD
V|أوي ساكاموتو|Aoi Sakamoto|39|SD
V|هانا ساكاموتو|Hana Sakamoto|31|SD
V|ناغومو|Nagumo|71|SD
V|غابيمارو|Gabimaru|80|HP
V|ساغيري|Sagiri Yamada Asaemon|53|HP
V|يوزوريها|Yuzuriha|61|HP
A|مي|Mei|73|HP
A|تاو فا|Tao Fa|75|HP
A|جو جين|Zhu Jin|60|HP
B|شوبي|Chobei|67|HP
B|غانتتسوساي|Gantetsusai|69|HP
B|إدوارد إلريك|Edward Elric|73|FM
B|ألفونس إلريك|Alphonse Elric|67|FM
A|روي موستانغ|Roy Mustang|77|FM
V|ريزا هوكاي|Riza Hawkeye|55|FM
B|ألكسندر لويس أرمسترونغ|Alex Louis Armstrong|67|FM
V|كينغ برادلي|King Bradley|84|FM
A|فان هوهنهايم|Van Hohenheim|80|FM
A|الأب|Father|90|FM
A|لست|Lust|59|FM
B|غلوتوني|Gluttony|56|FM
A|إنفي|Envy|63|FM
B|غريد|Greed|64|FM
A|برايد|Pride|78|FM
B|سلوث|Sloth|62|FM
V|لينغ ياو|Ling Yao|59|FM
V|لان فان|Lan Fan|52|FM
B|سكار|Scar|69|FM
A|ماي تشانغ|May Chang|41|FM
V|ماس هيوز|Maes Hughes|38|FM
V|وينري روكبيل|Winry Rockbell|32|FM
B|إيزومي كيرتس|Izumi Curtis|64|FM
V|أوليفييه ميرا أرمسترونغ|Olivier Mira Armstrong|61|FM
A|سولف جي. كيمبلي|Solf J. Kimblee|67|FM
V|جان هافوك|Jean Havoc|39|FM
B|جوناثان جوستار|Jonathan Joestar|61|JJ
B|ديو براندو|Dio Brando|88|JJ
V|سبيدواغون|Robert E.O. Speedwagon|36|JJ
A|جوزيف جوستار|Joseph Joestar|75|JJ
A|قيصر زيبيلي|Caesar Zeppeli|57|JJ
B|كارز|Kars|84|JJ
V|ليزا ليزا|Lisa Lisa|63|JJ
B|وامو|Wamuu|79|JJ
B|جوتارو كوجو|Jotaro Kujo|86|JJ
A|محمد أفدول|Muhammad Avdol|64|JJ
A|نوريعاكي كاكيوين|Noriaki Kakyoin|59|JJ
V|جان بيير بولناريف|Jean Pierre Polnareff|61|JJ
V|إيغي|Iggy|41|JJ
B|جوسكي هيغاشيكاتا|Josuke Higashikata|75|JJ
B|أوكياسو نيجيمورا|Okuyasu Nijimura|61|JJ
A|كويتشي هيروسي|Koichi Hirose|45|JJ
A|روهان كيشيبي|Rohan Kishibe|55|JJ
A|يوشيكاجي كيرا|Yoshikage Kira|72|JJ
A|جورنو جوفانا|Giorno Giovanna|82|JJ
A|برونو بوتشيلاتي|Bruno Bucciarati|71|JJ
V|ليوني أبّاكيو|Leone Abbacchio|50|JJ
V|غيدو ميستا|Guido Mista|53|JJ
V|ناراشيا غيرغا|Narancia Ghirga|43|JJ
B|بانّاكوتا فوغو|Pannacotta Fugo|46|JJ
A|ديابلو|Diavolo|80|JJ
B|جولين كوجو|Jolyne Cujoh|64|JJ
A|إنريكو بوتشي|Enrico Pucci|86|JJ
A|جوني جوستار|Johnny Joestar|59|JJ
V|جايرو زيبيلي|Gyro Zeppeli|67|JJ
A|فاني فالنتاين|Funny Valentine|84|JJ
B|دييغو براندو|Diego Brando|63|JJ
V|هول هورس|Hol Horse|38|JJ
B|ناتسو دراغنيل|Natsu Dragneel|84|FT
A|لوسي هارتفيليا|Lucy Heartfilia|50|FT
A|غراي فولباستر|Gray Fullbuster|73|FT
A|إيرزا سكارليت|Erza Scarlet|78|FT
A|ويندي مارفيل|Wendy Marvell|53|FT
V|هابي|Happy|38|FT
B|غاجيل ريدفوكس|Gajeel Redfox|71|FT
B|لاكسوس دريير|Laxus Dreyar|75|FT
B|ميرا جين ستروس|Mirajane Strauss|73|FT
B|إلفمان ستروس|Elfman Strauss|46|FT
A|ليزانا ستروس|Lisanna Strauss|45|FT
B|غيلدارتس كلايف|Gildarts Clive|86|FT
A|ماكاروف دريير|Makarov Dreyar|79|FT
A|جوفيا لوكسر|Juvia Lockser|63|FT
A|كانا ألبيرونا|Cana Alberona|46|FT
A|ليفي ماكغاردن|Levy McGarden|41|FT
A|جيلال فيرنانديز|Jellal Fernandes|79|FT
A|زيريف دراغنيل|Zeref Dragneel|94|FT
B|أكنولوجيا|Acnologia|96|FT
B|ستينغ يوكليف|Sting Eucliffe|67|FT
V|روغ تشيني|Rogue Cheney|64|FT
A|ألتير ميلكوفيتش|Ultear Milkovich|55|FT
A|ميريدي|Meredy|44|FT
A|مارد غير|Mard Geer Tartaros|77|FT
V|إيتشيا فاندالاي كوتوبوكي|Ichiya Vandalay Kotobuki|34|FT
V|فريد جاستين|Freed Justine|57|FT
A|بيكسلو|Bickslow|46|FT
A|إيفرغرين|Evergreen|52|FT
B|ميليوداس|Meliodas|84|SS
B|بان|Ban|80|SS
B|إسكانور|Escanor|92|SS
A|كينغ|King|78|SS
B|ديان|Diane|70|SS
A|غاوثر|Gowther|72|SS
A|ميرلين|Merlin|86|SS
A|إليزابيث ليونس|Elizabeth Liones|43|SS
B|هوك|Hawk|32|SS
B|زيلديرس|Zeldris|82|SS
B|إستاروسا|Estarossa|79|SS
A|ديريري|Derieri|61|SS
B|هندريكسون|Hendrickson|67|SS
V|غيلثندر|Gilthunder|59|SS
B|هاوزر|Howzer|52|SS
V|غريامور|Griamore|55|SS
B|دريفوس|Dreyfus|68|SS
A|الملك آرثر|Arthur Pendragon|73|SS
A|مايل|Mael|74|SS
A|غالاند|Galand|67|SS
V|جينتوكي ساكاتا|Gintoki Sakata|75|GT
V|شينباتشي شيمورا|Shinpachi Shimura|38|GT
B|كاغورا|Kagura|71|GT
V|سوغو أوكيتا|Sougo Okita|67|GT
V|توشيرو هيجيكاتا|Toshiro Hijikata|63|GT
B|إيساو كوندو|Isao Kondo|45|GT
V|كوتارو كاتسورا|Kotaro Katsura|57|GT
V|شينسوكي تاكاسوغي|Shinsuke Takasugi|69|GT
V|تاتسوما ساكاموتو|Tatsuma Sakamoto|53|GT
B|أومي بوزو|Umibozu|73|GT
B|كامويي|Kamui|79|GT
V|نوبومي إيماي|Nobume Imai|59|GT
B|سادهارو|Sadaharu|46|GT
V|ساغارو يامازاكي|Sagaru Yamazaki|32|GT
B|تايزو هاسيغاوا|Taizou Hasegawa|31|GT
V|تسوكويو|Tsukuyo|57|GT
B|يوسكي أورامشي|Yusuke Urameshi|84|YH
B|كازوما كوابارا|Kazuma Kuwabara|52|YH
A|كوراما|Kurama|73|YH
V|هيي|Hiei|78|YH
A|جينكاي|Genkai|71|YH
B|توغورو|Younger Toguro|80|YH
A|شينوبو سنسوي|Shinobu Sensui|82|YH
B|موكورو|Mukuro|75|YH
B|رايزن|Raizen|86|YH
A|كوينما|Koenma|38|YH
V|بوتان|Botan|34|YH
A|كاراسو|Karasu|63|YH
B|إينوياشا|Inuyasha|75|IY
B|سيشومارو|Sesshomaru|84|IY
A|ناراكو|Naraku|86|IY
A|كاغومي هيغوراشي|Kagome Higurashi|42|IY
A|ميروكو|Miroku|57|IY
V|سانغو|Sango|53|IY
A|شيبو|Shippo|35|IY
A|كيكيو|Kikyo|63|IY
V|كوغا|Koga|61|IY
B|بانكوتسو|Bankotsu|64|IY
V|ميوغا|Myoga|31|IY
A|جاكن|Jaken|34|IY
V|كينشين هيمورا|Kenshin Himura|80|RK
B|سانوسوكي ساغارا|Sanosuke Sagara|61|RK
V|كاورو كاميا|Kaoru Kamiya|34|RK
V|هاجيمي سايتو|Hajime Saito|69|RK
B|شيشيو ماكوتو|Makoto Shishio|75|RK
V|سوجيرو سيتا|Soujiro Seta|73|RK
V|سيجورو هيكو|Seijuro Hiko|84|RK
V|أوشي شينومورى|Aoshi Shinomori|64|RK
B|ماكا ألبارن|Maka Albarn|63|SE
V|سول إيفانز|Soul Evans|59|SE
B|بلاك ستار|Black Star|69|SE
A|ديث ذا كيد|Death the Kid|75|SE
A|كرونا|Crona|67|SE
A|ميدوسا|Medusa|61|SE
B|أسورا|Asura|88|SE
A|فرانكن شتاين|Franken Stein|72|SE
A|إكسكاليبر|Excalibur|34|SE
V|ميفوني|Mifune|69|SE
B|توريكو|Toriko|86|TK
V|كوماتسو|Komatsu|35|TK
A|كوكو|Coco|71|TK
A|صني|Sunny|69|TK
A|زيبرا|Zebra|73|TK
V|رين|Rin|42|TK
V|إيتشيريو|Ichiryu|61|TK
B|جوا|Joa|80|TK
B|سييا|Seiya|73|SY
B|إيكي|Ikki|75|SY
B|شيريو|Shiryu|69|SY
A|هيوغا|Hyoga|64|SY
A|شون|Shun|63|SY
A|شاكا|Shaka|86|SY
B|ألديباران|Aldebaran|71|SY
A|ساوري كيدو|Saori Kido|38|SY
B|سايتاما|Saitama|99|OM
A|جينوس|Genos|75|OM
V|سونيك سريع الضرب|Speed-o'-Sound Sonic|67|OM
B|بوروس|Boros|92|OM
B|غارو|Garou|88|OM
A|تاتسوماكي|Tatsumaki|88|OM
B|كينغ|King|42|OM
B|بانغ|Bang|71|OM
V|فلاش الومضة|Flashy Flash|68|OM
B|ميتال بات|Metal Bat|59|OM
B|موميون رايدر|Mumen Rider|36|OM
A|فوبوكي|Fubuki|61|OM
A|موب|Shigeo Kageyama|96|MP
A|ريجن|Arataka Reigen|36|MP
A|ديمبل|Dimple|50|MP
A|ريتسو كاجيياما|Ritsu Kageyama|63|MP
A|تيروكي هانازاوا|Teruki Hanazawa|73|MP
A|توئيتشيرو سوزوكي|Toichiro Suzuki|84|MP
B|سيريزاوا|Katsuya Serizawa|68|MP
B|موغامي|Keiji Mogami|50|MP
B|شو سوزوكي|Sho Suzuki|59|MP
A|إيتشي ميزاتو|Ichi Mezato|49|MP
A|رين أوكومورا|Rin Okumura|79|BE
V|يوكيو أوكومورا|Yukio Okumura|61|BE
A|شيرو فوجيموتو|Shiro Fujimoto|71|BE
A|ميفيستو فيليس|Mephisto Pheles|84|BE
A|ساتان|Satan|97|BE
V|شورا كيريغاكوري|Shura Kirigakure|59|BE
B|ريوجي سوغورو|Ryuji Suguro|47|BE
B|أيمايمون|Amaimon|73|BE
A|كونيكومارو ميوا|Konekomaru Miwa|32|BE
V|ياتو|Yato|75|NG
V|بيشامون|Bishamon|84|NG
A|يوكينه|Yukine|49|NG
B|هيوري إيكي|Hiyori Iki|31|NG
A|كوفوكو|Kofuku|39|NG
A|دايكوكو|Daikoku|50|NG
V|كورو سينسي|Korosensei|94|AC
V|ناغيسا شيوتا|Nagisa Shiota|53|AC
V|كارما أكابانه|Karma Akabane|57|AC
B|تادأومي كاراسوما|Tadaomi Karasuma|67|AC
V|إيرينا يلافيتش|Irina Jelavic|52|AC
A|إيتونا هوريبي|Itona Horibe|49|AC
B|ريوما تيراساكا|Ryoma Terasaka|43|AC
V|ريو ناكامورا|Rio Nakamura|36|AC
A|مانامي أوكودا|Manami Okuda|31|AC
A|كايدي كاياتو|Kaede Kayano|39|AC
A|لايت ياغامي|Light Yagami|67|DN
V|إل|L|64|DN
A|ريوك|Ryuk|80|DN
A|ريم|Rem|78|DN
A|ميسا أمانه|Misa Amane|41|DN
A|نير|Near|50|DN
B|ميلو|Mello|52|DN
B|سويتشيرو ياغامي|Soichiro Yagami|34|DN
A|تيرو ميكامي|Teru Mikami|38|DN
B|تاكيميتشي هاناغاكي|Takemichi Hanagaki|49|TR
B|مايكي|Manjirou Sano|90|TR
B|دراكن|Ken Ryuguji|79|TR
V|كيسكي باجي|Keisuke Baji|69|TR
B|شوجي هانما|Shuji Hanma|75|TR
B|إيزانا كوروكاوا|Izana Kurokawa|88|TR
V|تشيفيو ماتسونو|Chifuyu Matsuno|59|TR
V|كازوتورا هانيمياء|Kazutora Hanemiya|61|TR
B|تايجو شيبا|Taiju Shiba|63|TR
V|تيتا كيساكي|Tetta Kisaki|35|TR
A|أتيم|Atem|84|YG
A|يوغي موتو|Yugi Mutou|59|YG
A|سيتو كايبا|Seto Kaiba|73|YG
A|جوي ويلر|Katsuya Jonouchi|51|YG
A|ماريك إيشتار|Marik Ishtar|67|YG
A|يامي باكورا|Yami Bakura|71|YG
A|بيغاسوس|Maximillion Pegasus|64|YG
A|مي فالنتاين|Mai Kujaku|41|YG
B|تريستان تايلور|Hiroto Honda|32|YG
A|علاء الدين|Aladdin|88|MG
V|علي بابا سالوجا|Alibaba Saluja|64|MG
B|مورجيانا|Morgiana|69|MG
A|جودار|Judar|80|MG
A|سندباد|Sinbad|84|MG
V|هاكريو رين|Hakuryuu Ren|71|MG
B|كوين رين|Kouen Ren|75|MG
B|مسرور|Masrur|59|MG
V|جعفر|Jafar|63|MG
A|كوغيوكو رين|Kougyoku Ren|47|MG
V|أكامي|Akame|75|AK
B|تاتسومي|Tatsumi|64|AK
A|إيسديث|Esdeath|88|AK
B|ليون|Leone|68|AK
A|ماين|Mine|57|AK
A|ناجيندا|Najenda|59|AK
B|بولات|Bulat|53|AK
V|لابوك|Lubbock|38|AK
B|شيلي|Sheele|49|AK
V|كورومي|Kurome|70|AK
V|ويف|Wave|61|AK
A|سوسانو|Susanoo|84|AK
A|فريرين|Frieren|94|FR
A|فيرن|Fern|71|FR
B|ستارك|Stark|59|FR
V|هيمل|Himmel|73|FR
A|هايتر|Heiter|50|FR
B|آيزن|Eisen|78|FR
A|سيري|Serie|97|FR
A|أورا|Aura|80|FR
A|دنكن|Denken|67|FR
A|لافين|Lawine|45|FR
V|لوید فورجر|Loid Forger|75|SF
V|يور فورجر|Yor Forger|84|SF
A|آنيا فورجر|Anya Forger|49|SF
V|فيونا فروست|Fiona Frost|55|SF
B|يوري برايار|Yuri Briar|53|SF
B|داميان ديزموند|Damian Desmond|34|SF
V|كيريتو|Kirito|78|SA
V|أسونا|Asuna Yuuki|73|SA
V|كلاين|Klein|52|SA
B|أجيل|Agil|50|SA
V|سينون|Sinon|59|SA
A|ليفا|Leafa|57|SA
V|يوكي كونّو|Yuuki Konno|71|SA
A|هيثكليف|Akihiko Kayaba|88|SA
V|يوجيو|Eugeo|63|SA
A|أليس زوبرغ|Alice Zuberg|80|SA
A|الإدارية|Administrator|84|SA
A|سيليكا|Silica|41|SA
B|ليزبيث|Lisbeth|45|SA
A|يوي|Yui|32|SA
A|سوغو|Nobuyuki Sugou|36|SA
B|غابرييل ميلر|Gabriel Miller|75|SA
B|بيركولي|Bercouli Synthesis One|90|SA
V|فاناتيو|Fanatio Synthesis Two|73|SA
B|ديوسولبرت|Deusolbert Synthesis Seven|67|SA
V|كيزمل|Kizmel|61|SA
B|ديافل|Diavel|55|SA
B|كيباو|Kibaou|35|SA
V|سورتيلينا|Sortiliena Serlut|49|SA
A|تييزي|Tiese Schtrinen|34|SA
A|روني|Ronye Arabel|31|SA
V|كورادييل|Kuradeel|43|SA
V|بوه|PoH|64|SA
V|إلدري|Eldrie Synthesis Thirty|53|SA
A|سوبارو ناتسوكي|Subaru Natsuki|38|RZ
A|إيميليا|Emilia|69|RZ
B|ريم|Rem|69|RZ
A|رام|Ram|51|RZ
A|بياتريس|Beatrice|71|RZ
A|روزوال|Roswaal L Mathers|75|RZ
V|راينهارد|Reinhard van Astrea|98|RZ
V|فيلت|Felt|35|RZ
V|جوليوس|Julius Juukulius|71|RZ
V|ويلهلم|Wilhelm van Astrea|73|RZ
A|بريسيلا|Priscilla Barielle|59|RZ
A|أوتو|Otto Suwen|32|RZ
B|غارفيل|Garfiel Tinsel|67|RZ
V|إلسا|Elsa Granhiert|61|RZ
A|بيتلجيوس|Petelgeuse Romanee-Conti|69|RZ
A|ريغولوس|Regulus Corneas|78|RZ
A|إكيدنا|Echidna|67|RZ
A|ساتيلا|Satella|94|RZ
V|تيريزيا|Theresia van Astrea|88|RZ
V|كروش|Crusch Karsten|71|RZ
A|فيريس|Ferris|49|RZ
A|أناستازيا|Anastasia Hoshin|45|RZ
A|آينز أول غاون|Ainz Ooal Gown|97|OV
B|ألبيدو|Albedo|71|OV
V|شالتير|Shalltear Bloodfallen|84|OV
A|ديميورج|Demiurge|78|OV
B|كوسيتوس|Cocytus|73|OV
A|أورا|Aura Bella Fiora|57|OV
A|مار|Mare Bello Fiore|64|OV
B|سيباس|Sebas Tian|71|OV
A|باندورا أكتور|Pandora's Actor|67|OV
A|نابرال|Narberal Gamma|53|OV
A|إنتوما|Entoma Vasilissa Zeta|51|OV
A|سولوشن|Solution Epsilon|47|OV
V|سي زد|CZ2128 Delta|50|OV
B|يوري ألفا|Yuri Alpha|43|OV
A|لوبوسريجينا|Lupusregina Beta|52|OV
V|براين أونغلاوس|Brain Unglaus|55|OV
V|غازيف ستروناف|Gazef Stronoff|63|OV
B|كلايم|Climb|35|OV
A|إيفيلاي|Evileye|69|OV
B|غاغاران|Gagaran|49|OV
V|تيا|Tia|51|OV
B|جيركنيف|Jircniv Rune Farlord El-Nix|31|OV
V|نييا|Neia Baraja|34|OV
A|جالداباوث|Jaldabaoth|75|OV
B|هامسكي|Hamsuke|38|OV
V|زيسي|Zesshi Zetsumei|73|OV
V|كازوما ساتو|Kazuma Satou|39|KS
A|أكوا|Aqua|31|KS
A|ميغومين|Megumin|79|KS
B|داركنس|Darkness|52|KS
A|ويز|Wiz|61|KS
A|فانير|Vanir|73|KS
A|يون يون|Yunyun|47|KS
V|كريس|Chris|51|KS
A|إيريس|Eris|59|KS
B|كيويا ميتسوروغي|Kyouya Mitsurugi|50|KS
B|داست|Dust|35|KS
A|هانز|Hans|47|KS
A|تشومسوكي|Chomusuke|34|KS
B|لونا|Luna|42|KS
A|رودياس غرايرات|Rudeus Greyrat|78|MT
A|روكسي ميغورديا|Roxy Migurdia|59|MT
B|إيريس بوريياس غرايرات|Eris Boreas Greyrat|57|MT
V|سيلفي|Sylphiette|59|MT
B|بول غرايرات|Paul Greyrat|55|MT
A|زينيث غرايرات|Zenith Greyrat|47|MT
B|غيسلين ديدولديا|Ghislaine Dedoldia|67|MT
B|أورستد|Orsted|92|MT
A|نورن غرايرات|Norn Greyrat|45|MT
V|آيشا غرايرات|Aisha Greyrat|49|MT
B|رويجيرد سوبرديا|Ruijerd Superdia|79|MT
A|إلينالايز دراغونرود|Elinalise Dragonroad|55|MT
A|كليف غريمور|Cliff Grimoire|53|MT
B|زانوبا شيرون|Zanoba Shirone|57|MT
B|باديغادي|Badigadi|59|MT
B|كيشيريكا كيشيريسو|Kishirika Kishirisu|55|MT
V|ليليا غرايرات|Lilia Greyrat|35|MT
A|ريمورو تمبست|Rimuru Tempest|98|SL
B|ميليم نافا|Milim Nava|92|SL
B|فيلدورا تمبست|Veldora Tempest|84|SL
B|غاي كريمسون|Guy Crimson|90|SL
A|ديابلو|Diablo|84|SL
B|بينيمارو|Benimaru|77|SL
B|شيون|Shion|73|SL
V|سوي إي|Souei|63|SL
A|شونا|Shuna|49|SL
V|هاكورو|Hakurou|59|SL
V|غوبتا|Gobta|39|SL
B|رانغا|Ranga|69|SL
B|غابيرو|Gabiru|53|SL
V|هيناتا ساكاغوتشي|Hinata Sakaguchi|80|SL
A|كلايمان|Clayman|59|SL
B|فيلزارد|Velzard|80|SL
V|ليون كرومويل|Leon Cromwell|66|SL
A|يوكي كاغورازاكا|Yuuki Kagurazaka|63|SL
A|رامريس|Ramiris|61|SL
B|كاريون|Carrion|59|SL
B|فراي|Frey|61|SL
B|غيلد|Geld|57|SL
V|كوروبي|Kurobe|52|SL
B|غازيل دوارغو|Gazel Dwargo|59|SL
A|شيزو|Shizu|61|SL
B|ناوفومي إيواتاني|Naofumi Iwatani|60|SH
V|رافتاليا|Raphtalia|59|SH
B|فيلو|Filo|53|SH
A|ميلتي ملرومارك|Melty Q. Melromarc|45|SH
V|رين أماكي|Ren Amaki|59|SH
V|إيتسوكي كاواسومي|Itsuki Kawasumi|53|SH
B|موتويازو كيتامورا|Motoyasu Kitamura|53|SH
A|مالتي|Malty S. Melromarc|35|SH
A|ريشيا إيفيريد|Rishia Ivyred|50|SH
V|غلاس|Glass|64|SH
B|كيزونا كازاياما|Kizuna Kazayama|57|SH
A|أوست هورا|Ost Horai|51|SH
V|إيكلير سيايتو|Eclair Seaetto|55|SH
V|سورا|Sora|49|NN
A|شيرو|Shiro|53|NN
B|ستيفاني دولا|Stephanie Dola|32|NN
B|جبريل|Jibril|75|NN
A|إيزونا هاتسوسي|Izuna Hatsuse|43|NN
B|تيت|Tet|84|NN
V|كلامي زيل|Chlammy Zell|47|NN
V|سونغ جين وو|Sung Jin-Woo|94|SO
V|تشا هاي إن|Cha Hae-In|64|SO
B|توماس أندريه|Thomas Andre|80|SO
B|غوتو ريوجي|Goto Ryuji|59|SO
B|ليو جيغانغ|Liu Zhigang|61|SO
A|تشوي جونغ إن|Choi Jong-In|53|SO
B|بايك يون هو|Baek Yoon-Ho|64|SO
B|غو غون هي|Go Gun-Hee|59|SO
B|يو جين هو|Yoo Jin-Ho|35|SO
V|إيغريس|Igris|67|SO
B|بيرو|Beru|71|SO
B|أنتاريس|Antares|90|SO
B|وو جين تشول|Woo Jin-Chul|52|SO
B|كيم تشول|Kim Chul|51|SO
A|شيرو|Shiroe|61|LH
B|ناوتسوغو|Naotsugu|59|LH
V|أكاتسوكي|Akatsuki|57|LH
V|نيانتا|Nyanta|57|LH
A|ماريل|Marielle|43|LH
V|سوجيرو سيتا|Soujirou Seta|59|LH
A|هنرييتا|Henrietta|52|LH
A|مينوري|Minori|39|LH
A|إيسوزو|Isuzu|38|LH
V|بيل كرانيل|Bell Cranel|61|DM
A|هيستيا|Hestia|45|DM
V|آيز فالنستاين|Aiz Wallenstein|80|DM
A|ليفيا فيريديس|Lefiya Viridis|55|DM
V|ريو ليون|Ryu Lion|59|DM
B|ويلف كروزو|Welf Crozzo|53|DM
V|ليليروكا آردي|Liliruca Arde|38|DM
V|ميكوتو ياماتو|Mikoto Yamato|51|DM
A|هاروهيمي سانجونو|Haruhime Sanjouno|36|DM
A|فريا|Freya|64|DM
B|أوتار|Ottar|69|DM
B|بيتي لوغا|Bete Loga|55|DM
A|سيد كاغينو|Cid Kagenou|90|ES
V|ألفا|Alpha|79|ES
V|بيتا|Beta|67|ES
A|غاما|Gamma|63|ES
B|دلتا|Delta|75|ES
V|إبسلون|Epsilon|57|ES
V|زيتا|Zeta|63|ES
V|إيتا|Eta|57|ES
V|ألكسيا ميدغار|Alexia Midgar|55|ES
V|إيريس ميدغار|Iris Midgar|53|ES
V|كلير كاغينو|Claire Kagenou|47|ES
V|روز أوريانا|Rose Oriana|59|ES
V|قاتل الغوبلن|Goblin Slayer|64|GS
A|الكاهنة|Priestess|41|GS
V|رامية الجان|High Elf Archer|59|GS
A|شامان القزم|Dwarf Shaman|55|GS
B|كاهن السحلية|Lizard Priest|55|GS
V|الرمّاح|Spearman|61|GS
A|الساحرة|Witch|57|GS
B|ساداو مايو|Sadao Maou|64|DP
V|إيمي يوسا|Emi Yusa|73|DP
B|تشيهو ساساكي|Chiho Sasaki|32|DP
B|شيرو أشيا|Shirou Ashiya|51|DP
A|هانزو أوروشيهارا|Hanzou Urushihara|41|DP
V|سوزونو كاماتزكي|Suzuno Kamazuki|55|DP
A|تانيا ديغريتشاف|Tanya Degurechaff|69|TY
A|فيكتوريا سيريبرياكوف|Viktoriya Serebryakov|57|TY
A|ماري سو|Mary Sue|63|TY
B|إريش فون ريروغن|Erich von Rerugen|49|TY
V|هانس فون زيتور|Hans von Zettour|36|TY
B|كورت فون رودرسدورف|Kurt von Rudersdorf|38|TY
A|الكائن إكس|Being X|88|TY
B|هاجيمي ناغومو|Hajime Nagumo|78|AR
A|يوي|Yue|73|AR
B|شيا هاوليا|Shea Haulia|64|AR
B|تيو كلاروس|Tio Klarus|63|AR
A|كاوري شيراساكي|Kaori Shirasaki|55|AR
B|كوكي أمانوغاوا|Kouki Amanogawa|52|AR
A|آيكو هاتاياما|Aiko Hatayama|41|AR
A|ميو|Myu|34|AR
V|يوجي إيتامي|Youji Itami|57|GA
B|روري ميركوري|Rory Mercury|59|GA
A|ليلي لا ليلينا|Lelei La Lelena|52|GA
V|توكا لونا مارسو|Tuka Luna Marceau|43|GA
B|بينا كو لادا|Pina Co Lada|34|GA
V|شينو كوريباياشي|Shino Kuribayashi|53|GA
V|هاروهيرو|Haruhiro|45|GR
A|ماناتو|Manato|51|GR
V|يوم|Yume|36|GR
A|شيهورو|Shihoru|35|GR
B|رانتا|Ranta|39|GR
B|موغوزو|Moguzo|50|GR
A|شين وولفورد|Shin Wolford|75|WM
A|ميرلين وولفورد|Merlin Wolford|67|WM
A|ميليدا بوين|Melida Bowen|55|WM
A|سيسيلي فون كلود|Sicily von Claude|51|WM
A|ماريا فون ميسينا|Maria von Messina|45|WM
B|مارك بين|Mark Bean|43|WM
A|تاكوما ساكاموتو|Takuma Sakamoto|71|HN
A|رِم غاليو|Rem Galleu|61|HN
A|شيرا غرينوود|Shera L. Greenwood|59|HN
A|أليسيا كريستيلا|Alicia Crystella|42|HN
V|سيلفي|Sylvie|52|HN
A|كيرا غرينوود|Keera L. Greenwood|55|HN
B|سيلستين بودلير|Celestine Baudelaire|47|HN
A|ماكوتو ميسومي|Makoto Misumi|88|TM
B|تومو إي|Tomoe|75|TM
B|ميئو|Mio|78|TM
A|شيكي|Shiki|64|TM
B|صوفيا بولغا|Sofia Bulga|55|TM
A|لايم لاتيه|Lime Latte|35|TM
V|صنراكو|Sunraku|67|SK
A|إيمول|Emul|50|SK
V|آرثر بنسلغون|Arthur Pencilgon|67|SK
V|راي سايغا|Rei Saiga|64|SK
A|مانا إيواماكي|Mana Iwamaki|42|SK
`;
