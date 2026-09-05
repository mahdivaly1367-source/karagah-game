import { Evidence } from '../types/game';

export const GAME_EVIDENCE: Record<string, Evidence> = {
  ev_window_dust: {
    id: 'ev_window_dust',
    name: 'رد خاک جابه‌جاشده بر لبه پنجره',
    description: 'لایه غبار نشسته بر لبه گلی پنجره خراشیده شده و بادگیر چوبی به تازگی از داخل یا خارج به زور گشوده شده است.',
    source: 'پنجره اتاق میرزا صفدر',
    relatedCharacters: ['میرزا صفدر', 'ناشناس'],
    relatedLocations: ['اتاق میرزا صفدر', 'کوچه بیرونی'],
    relatedPuzzles: ['puzzle_window_escape'],
    discovered: false,
    analysisText: 'خانخله: «پنجره رو نه باد وا کرده، نه بوی بهار. یکی وزنش رو انداخته رو این چوب‌های کهنه و پریده بیرون... یا اومده تو.»'
  },
  ev_cold_tea: {
    id: 'ev_cold_tea',
    name: 'فنجان چای دست‌نخورده',
    description: 'فنجان چای تلخ ساعت‌ها پیش ریخته شده و سرد شده است، اما تا لبه پر است و حتی یک جرعه از آن نوشیده نشده.',
    source: 'میز کار اتاق',
    relatedCharacters: ['میرزا صفدر'],
    relatedLocations: ['اتاق میرزا صفدر'],
    relatedPuzzles: ['puzzle_timeline'],
    discovered: false,
    analysisText: 'خانخله: «میرزا آدم اهل دود و دمی نبود، ولی چایش سر ساعت باید سر می‌رفت. این فنجان نشون میده فرصت نکرده حتی دست به نعلبکی بزنه.»'
  },
  ev_holed_coin: {
    id: 'ev_holed_coin',
    name: 'سکه سوراخ‌شده مرموز',
    description: 'یک سکه قدیمی با سوراخی عمدی و نشانه‌ای ریز حک‌شده بر حاشیه آن. این نوع نشانه‌ها معمولاً رمز شناسایی میان کاروان‌های خاص است.',
    source: 'زیر تخته‌های میز کار',
    relatedCharacters: ['میرزا صفدر', 'حاج مرتضی', 'کربلایی نعمت'],
    relatedLocations: ['اتاق میرزا صفدر', 'اصطبل'],
    relatedPuzzles: ['puzzle_confront_morteza'],
    discovered: false,
    analysisText: 'خانخله: «این سکه خرج نونوایی نمیشه. علامت کاروان "شتران سرخ" روش خورده... همون کاروانی که هفت سال پیش می‌گفتن دود شد رفت هوا.»'
  },
  ev_red_thread_cloth: {
    id: 'ev_red_thread_cloth',
    name: 'نخ قرمز و الیاف پارچه پاره‌شده',
    description: 'الیاف نخ سرخ ابریشمی که با لبه پاره‌شده پارچه پیوند خورده است. پارچه از قبا یا شالی اعلا کنده شده است.',
    source: 'میخ پنجره و شکاف صندوق',
    relatedCharacters: ['حاج مرتضی'],
    relatedLocations: ['اتاق میرزا صفدر', 'حیاط مسافرخانه'],
    relatedPuzzles: ['puzzle_window_escape'],
    discovered: false,
    analysisText: 'خانخله: «یا دیوار اتاق عاشق ابریشم سرخ بوده... یا یکی از همین‌جا با عجله و ترس رد شده و خلعتی گرون‌قیمتش به میخ گیر کرده.»'
  },
  ev_fake_writing: {
    id: 'ev_fake_writing',
    name: 'نوشته ساختگی روی دیوار',
    description: 'عبارت «حساب، خودش را پس میگیرد» با ذغال درشت و نامرتب نوشته شده. دست‌خط آن کوچک‌ترین شباهتی به خط خوش و دقیق میرزا ندارد.',
    source: 'دیوار اتاق میرزا',
    relatedCharacters: ['میرزا صفدر', 'کربلایی نعمت'],
    relatedLocations: ['اتاق میرزا صفدر'],
    relatedPuzzles: ['puzzle_fake_clue'],
    discovered: false,
    isFakeClue: true,
    analysisText: 'خانخله: «میرزا حتی روی سیاهه‌ تخم‌مرغ‌ها قلم تعلیق می‌زد. این خط زمخت کار یه آدم کم‌سواد و عصبیه که خواسته صحنه رو شبیه انتقام نشون بده.»'
  },
  ev_morteza_boots: {
    id: 'ev_morteza_boots',
    name: 'گل سرخ‌رنگ چکمه‌های حاج مرتضی',
    description: 'پای چکمه‌های چرمی گران‌بهای حاج مرتضی آغشته به گل سرخ‌رنگ خشکیده‌ای است که منحصراً در لای حوضچه حیاط این مسافرخانه وجود دارد.',
    source: 'بررسی دقیق حاج مرتضی در اصطبل',
    relatedCharacters: ['حاج مرتضی'],
    relatedLocations: ['اصطبل', 'حیاط مسافرخانه'],
    relatedPuzzles: ['puzzle_confront_morteza'],
    discovered: false,
    analysisText: 'خانخله: «حاج آقا می‌فرمایند دیشب فرسنگ‌ها دورتر بودن... اما لای سرخ پای چکمهاش عطر همین حیاط رو میده. پای دروغگو همیشه توی گله!»'
  },

  // Act 2 Evidence
  ev_act2_razor_cut_pages: {
    id: 'ev_act2_razor_cut_pages',
    name: 'صفحات بریده‌شده با تیغ دباغی',
    description: 'رد برش تیغ بسیار نازک و تیزی روی عطف چرمی دفتر باقی مانده است. صفحات شماره ۹ تا ۱۲ با خشونت بریده و برده شده‌اند.',
    source: 'بررسی دوباره دفتر میرزا در اتاق',
    relatedCharacters: ['میرزا صفدر', 'ناشناس'],
    relatedLocations: ['اتاق میرزا صفدر'],
    relatedPuzzles: ['puzzle_empty_ledger_step1'],
    discovered: false,
    analysisText: 'خانخله: «این کار با قیچی پاره نشده؛ یکی با تیغ سلمونی یا دباغی ورق‌ها رو بیخ تا بیخ بریده. ولی فراموش کرده که قلم‌نی روی ورق‌های زیرین هم یادگاری می‌ذاره!»'
  },
  ev_act2_pen_indentation: {
    id: 'ev_act2_pen_indentation',
    name: 'اثر فرورفتگی قلم‌نی بر کاغذ زیرین',
    description: 'زیر نور ملایم پنجره، شیارهای برجسته و فرورفته دست‌خط میرزا روی برگه‌های سفید باقی‌مانده دیده می‌شود.',
    source: 'صفحات سفید انتهای دفتر میرزا',
    relatedCharacters: ['میرزا صفدر', 'اوستا صادق'],
    relatedLocations: ['اتاق میرزا صفدر', 'دکان کاغذفروش'],
    relatedPuzzles: ['puzzle_empty_ledger_step2'],
    discovered: false,
    analysisText: 'خانخله: «کاغذ خالیه، اما کرک‌های پنبه‌ایش گود افتاده. میرزا موقع نوشتن این کلمات اون‌قدر عصبی بوده که قلم‌نی سنگینش تا مغز استخون کاغذ فرورفته!»'
  },
  ev_act2_paper_grain_sadiq: {
    id: 'ev_act2_paper_grain_sadiq',
    name: 'شناخت بافت کاغذ آهارمهره اصفهان',
    description: 'اوستا صادق تصدیق کرد این کاغذ پنبه‌ای ضخیم، لعاب نشاسته و کتیرا دارد و اگر با پودر دوده و قلم‌موی لطیف سایه بخورد، نوشته‌ها بی‌نقص آشکار می‌شوند.',
    source: 'دکان اوستا صادق در بازار',
    relatedCharacters: ['اوستا صادق'],
    relatedLocations: ['دکان کاغذفروش'],
    relatedPuzzles: ['puzzle_empty_ledger_step3'],
    discovered: false,
    analysisText: 'خانخله: «اوستا صادق حرف حساب زد. جوهر رو میشه تراشید، ولی استخون‌بندی کاغذ نشاسته‌دار به این راحتی رازهاش رو تسلیم باد نمی‌کنه.»'
  },
  ev_act2_false_lemon_burn: {
    id: 'ev_act2_false_lemon_burn',
    name: 'تست شکست‌خورده جوهر نامرئی (شایعه قاسم)',
    description: 'مالیدن عصاره لیمو و حرارت ملایم چراغ هیچ نوشته‌ای ظاهر نکرد و تنها نشاسته کاغذ را لکه‌دار کرد؛ فرضیه جوهر نامرئی شیمیایی باطل شد.',
    source: 'آزمایش خانخله در دکان بازارچه',
    relatedCharacters: ['مشهدی قاسم'],
    relatedLocations: ['بازار آبادی'],
    relatedPuzzles: ['puzzle_false_lead_lemon'],
    discovered: false,
    isFakeClue: true,
    analysisText: 'خانخله: «این مشهدی قاسم فقط بلده افسانه سر هم کنه! آب‌لیمو فقط به درد شربت بعدازظهر می‌خوره، نه کشف اسرار دولتی.»'
  },
  ev_act2_yaqub_bell_testimony: {
    id: 'ev_act2_yaqub_bell_testimony',
    name: 'شهادت یعقوب: نوای بیست شتر در نیمه‌شب',
    description: 'یعقوب با اطمینان مدعی است نیمه‌شب صدای زنگوله سنگین ۲۰ شتر قطارشده را شنیده که از کوچه باریک پشتی به سوی قنات می‌رفته‌اند.',
    source: 'گفتگو با یعقوب در خانه‌اش',
    relatedCharacters: ['یعقوب نابینا'],
    relatedLocations: ['خانه یعقوب', 'حیاط خانه یعقوب'],
    relatedPuzzles: ['puzzle_audio_bell_contradiction'],
    discovered: false,
    analysisText: 'خانخله: «گوش یعقوب خطکش دهاته، ولی بیست تا شتر بارکش تو اون کوچه تنگ حتی نمیتونن دور بزنن چه برسه بی‌صدا رد بشن!»'
  },
  ev_act2_iron_clapper_sound: {
    id: 'ev_act2_iron_clapper_sound',
    name: 'زنگوله با زبانه لقّ آهنی و صدای ساختگی',
    description: 'زنگوله‌ای سبک با زبانه آهنی نامنظم در حیاط یعقوب پیدا شد. طنین آن توخالی و مقطع است؛ نه طنین ممتد و بم زنگوله‌های سنگین برنجی کاروان.',
    source: 'حیاط خانه یعقوب و پای دیوار قنات',
    relatedCharacters: ['یعقوب نابینا', 'ناشناس'],
    relatedLocations: ['حیاط خانه یعقوب'],
    relatedPuzzles: ['puzzle_audio_bell_contradiction'],
    discovered: false,
    analysisText: 'خانخله: «این صدای شتر واقعی نبوده! یک نفر فقط این زنگوله حلبی رو با تکان‌های مرتب به صدا درآورده تا ادای کاروان رو دربیاره.»'
  },
  ev_act2_camel_tracks_missing: {
    id: 'ev_act2_camel_tracks_missing',
    name: 'فقدان رد سم شتر در ریگزار کوچه',
    description: 'خاک رس و شن نرم کوچه قنات هیچ اثری از فرورفتگی پاهای پهن و سنگین شتران نشان نمی‌دهد؛ تنها رد دو قاطر لاغر و چرخ دستی تک‌اسبه وجود دارد.',
    source: 'بررسی کوچه و حیاط بیرونی یعقوب',
    relatedCharacters: ['یعقوب نابینا'],
    relatedLocations: ['حیاط خانه یعقوب', 'ورودی قنات متروک'],
    relatedPuzzles: ['puzzle_audio_bell_contradiction'],
    discovered: false,
    analysisText: 'خانخله: «بیست تا شتر اگر از اینجا رد می‌شدن تا زانو تو ریگ می‌رفتن! یعقوب پیر صدای نمایش رو با کاروان واقعی اشتباه گرفته.»'
  },
  ev_act2_red_felt_sacks: {
    id: 'ev_act2_red_felt_sacks',
    name: 'شهادت مه‌بانو و رویت نمد سرخ صندوق‌ها',
    description: 'مه‌بانو پیش از نیمه‌شب مردانی با روبند تیره را دیده که صندوق‌های سنگینی با پوشش نمد سرخ روناسی را به سمت قنات می‌کشیده‌اند.',
    source: 'گفتگو با مه‌بانو در بازار',
    relatedCharacters: ['مه‌بانو'],
    relatedLocations: ['بازار آبادی'],
    relatedPuzzles: ['puzzle_reconstruction_act2'],
    discovered: false,
    analysisText: 'خانخله: «نمد سرخ روناس! همون رنگ نخ ابریشمی که دیشب به میخ پنجره میرزا گیر کرده بود. همه خطوط به یک جا ختم میشن.»'
  },
  ev_act2_qanat_airshaft_echo: {
    id: 'ev_act2_qanat_airshaft_echo',
    name: 'پژواک توخالی میله‌های قنات متروک',
    description: 'هوای متصاعدشده از دهانه قنات بوی گوگرد و خاک سوخته می‌دهد و نسیمی سرد از اعماق تاریک آن زوزه می‌کشد.',
    source: 'دهانه قنات متروک در حاشیه آبادی',
    relatedCharacters: ['میرزا صفدر'],
    relatedLocations: ['ورودی قنات متروک'],
    relatedPuzzles: ['puzzle_qanat_investigation'],
    discovered: false,
    analysisText: 'خانخله: «قنات سال‌هاست خشکه... ولی کسی این پایین رفت‌وآمد داشته. چوب‌بست‌های ورودی تازه جابه‌جا شده‌اند.»'
  },
  ev_act2_copper_token_cipher: {
    id: 'ev_act2_copper_token_cipher',
    name: 'پلاک مسین سرّی «خزانهٔ باد»',
    description: 'پلاک ضرب‌شده مخفی با نشان عقاب و هفت ستاره که لای سنگ‌چین دهانه قنات پنهان شده بود. پشت آن نام "ضرابخانه سلطانی" حک شده است.',
    source: 'لای آجرچین ورودی قنات متروک',
    relatedCharacters: ['میرزا صفدر', 'حاج مرتضی'],
    relatedLocations: ['ورودی قنات متروک'],
    relatedPuzzles: ['puzzle_qanat_investigation'],
    discovered: false,
    analysisText: 'خانخله: «این پلاک مال تاجرها و شتردارها نیست؛ این نشان مهر خزانه سلطنتیه! میرزا پاش رو توی چه لجنزار سیاهی گذاشته بود؟»'
  },
  ev_act2_empty_chests_revelation: {
    id: 'ev_act2_empty_chests_revelation',
    name: 'افشای متن میرزا: «صندوق‌ها تهی بودند»',
    description: 'نوشته سایه‌خورده و بازیابی‌شده دفتر: «صندوق‌ها در قنات نیستند... آنها چیزی را حمل نمی‌کردند. همه چیز برای فریب نگاه‌ها بود.»',
    source: 'رمزگشایی کامل صفحات دفتر میرزا',
    relatedCharacters: ['میرزا صفدر'],
    relatedLocations: ['اتاق میرزا صفدر', 'دکان کاغذفروش'],
    relatedPuzzles: ['puzzle_empty_ledger_step6'],
    discovered: false,
    analysisText: 'خانخله: «یا شاه چراغ! صندوق‌ها خالی بودن؟! پس اون همه جنگ و دعوا و گروگان‌گیری برای چی بود؟ میرزا حقیقت رو فهمید و به همین خاطر فراریش دادن... یا کشتنش!»'
  },
  ev_act2_qasem_ghoul_hoax: {
    id: 'ev_act2_qasem_ghoul_hoax',
    name: 'شایعه دیو و راهزنان طلسم‌شده قاسم',
    description: 'مشهدی قاسم با بافتن خرافات و جن‌زدگی در دهانه قنات سعی در فراری دادن تجسس‌کنندگان داشت تا دزدی‌های انبار خودش برملا نشود.',
    source: 'استنطاق مشهدی قاسم در بازار',
    relatedCharacters: ['مشهدی قاسم'],
    relatedLocations: ['بازار آبادی'],
    relatedPuzzles: ['puzzle_confront_qasem'],
    discovered: false,
    isFakeClue: true,
    analysisText: 'خانخله: «هر وقت کسی از غول بیابونی و آل حرف میزنه، بدون دستش تو جیب رفیقشه! قاسم می‌خواست ما پامون رو به قنات نذاریم.»'
  },
  ev_act2_rana_silence_clue: {
    id: 'ev_act2_rana_silence_clue',
    name: 'مسافر ناشناس با شال ارغوانی',
    description: 'یعقوب به خاطر آورد زنی با بوی عطر کندر و شال ارغوانی پیش از سحر درِ خانه او را زده و سراغ دست‌نوشته‌های میرزا را گرفته بود.',
    source: 'اعتراف تکمیلی یعقوب پس از حل پازل صوتی',
    relatedCharacters: ['یعقوب نابینا', 'رعنا'],
    relatedLocations: ['خانه یعقوب'],
    relatedPuzzles: ['puzzle_audio_bell_contradiction'],
    discovered: false,
    analysisText: 'خانخله: «عطر کندر و شال ارغوانی... رعنا! پس اون فقط یه مسافر ساده نبوده؛ قبل از این‌که آفتاب بزنه دنبال اسناد میرزا بوده.»'
  }
};
