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
  }
};
