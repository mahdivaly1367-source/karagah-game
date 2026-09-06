import { InteractiveObject, SceneId } from '../types/game';
import { GameImages } from '../assets/images';

export interface SceneConfig {
  id: SceneId;
  name: string;
  bgImage: string;
  ambientSoundType: 'wind' | 'room' | 'courtyard' | 'stable' | 'bazaar' | 'workshop' | 'qanat' | 'river' | 'mill' | 'bridge';
  objects: InteractiveObject[];
}

export const SCENES: Record<SceneId, SceneConfig> = {
  intro: {
    id: 'intro',
    name: 'مقدمه سینمایی: کاروان شتران سرخ',
    bgImage: GameImages.menuBg,
    ambientSoundType: 'wind',
    objects: [],
  },
  outer_alley: {
    id: 'outer_alley',
    name: 'کوچه بیرونی و درخت کهنسال',
    bgImage: GameImages.outerAlleyBg,
    ambientSoundType: 'wind',
    objects: [
      {
        id: 'obj_tree_bed',
        name: 'سایه درخت کهنسال',
        description: 'جایی که خانخله صبح‌ها زیر خنکای شاخه‌هایش چرت می‌زند و از گرمای کویر در امان است.',
        scene: 'outer_alley',
        bounds: { x: 5, y: 35, width: 22, height: 45 },
        cursorType: 'inspect',
        hintDescription: 'درخت سایه‌دار خنک'
      },
      {
        id: 'obj_crow',
        name: 'کلاغ دم‌سیاه',
        description: 'کلاغی که همیشه بالای این شاخه می‌نشیند و به چشم‌های خانخله زل می‌زند.',
        scene: 'outer_alley',
        bounds: { x: 12, y: 15, width: 10, height: 18 },
        cursorType: 'talk',
        hintDescription: 'کلاغ روی شاخه'
      },
      {
        id: 'npc_kazem_alley',
        name: 'کاظم (پادو آبادی)',
        description: 'کاظم، نفس‌زنان با خبری داغ از کاروانسرا ایستاده است.',
        scene: 'outer_alley',
        bounds: { x: 38, y: 48, width: 14, height: 38 },
        cursorType: 'talk',
        hintDescription: 'گفتگو با کاظم'
      },
      {
        id: 'door_to_courtyard',
        name: 'دروازه چوبی مسافرخانه',
        description: 'دروازه سنگین چوبی که به حیاط مرکزی کاروانسرا راه دارد.',
        scene: 'outer_alley',
        bounds: { x: 58, y: 35, width: 18, height: 48 },
        cursorType: 'move',
        hintDescription: 'ورود به حیاط مسافرخانه'
      },
      {
        id: 'obj_desert_road',
        name: 'جاده بیابانی',
        description: 'رد کاروان‌های عبوری به سوی افق ریگزار کشیده شده است.',
        scene: 'outer_alley',
        bounds: { x: 80, y: 45, width: 18, height: 40 },
        cursorType: 'inspect',
        hintDescription: 'جاده بیابان'
      }
    ]
  },
  courtyard: {
    id: 'courtyard',
    name: 'حیاط مسافرخانه و کاروانسرا',
    bgImage: GameImages.courtyardBg,
    ambientSoundType: 'courtyard',
    objects: [
      {
        id: 'obj_mud_pool',
        name: 'گِل سرخ‌رنگ پای حوضچه',
        description: 'نشت آب حوضچه بر خاک رس حیاط، لای سرخ‌رنگ چسبنده‌ای ایجاد کرده که رد پاهای تازه‌ای روی آن پیداست.',
        scene: 'courtyard',
        bounds: { x: 42, y: 72, width: 20, height: 18 },
        cursorType: 'inspect',
        hintDescription: 'بررسی گل و لای حوضچه'
      },
      {
        id: 'npc_nemat_courtyard',
        name: 'کربلایی نعمت (مسافرخانه‌چی)',
        description: 'کربلایی نعمت با اخم‌های درهم و چشمانی نگران در ایوان ایستاده و تسبیح می‌گرداند.',
        scene: 'courtyard',
        bounds: { x: 22, y: 40, width: 14, height: 42 },
        cursorType: 'talk',
        hintDescription: 'گفتگو با کربلایی نعمت'
      },
      {
        id: 'door_to_mirza_room',
        name: 'در چوبی اتاق میرزا صفدر',
        description: 'اتاق انتهای ایوان که دیشب میرزا صفدر در آن اقامت داشت و اینک خالی است.',
        scene: 'courtyard',
        bounds: { x: 6, y: 38, width: 12, height: 45 },
        cursorType: 'move',
        hintDescription: 'ورود به اتاق میرزا صفدر'
      },
      {
        id: 'door_to_stable',
        name: 'دالان اصطبل',
        description: 'ورودی طاق‌دار که به طویله و جایگاه باربند کاروانسرا راه دارد.',
        scene: 'courtyard',
        bounds: { x: 82, y: 40, width: 14, height: 45 },
        cursorType: 'move',
        hintDescription: 'ورود به اصطبل'
      },
      {
        id: 'door_to_alley',
        name: 'خروجی به کوچه بیرونی',
        description: 'دالان خروجی به سمت کوچه خاکی و درخت توت.',
        scene: 'courtyard',
        bounds: { x: 64, y: 42, width: 14, height: 42 },
        cursorType: 'move',
        hintDescription: 'بازگشت به کوچه بیرونی'
      },
      {
        id: 'door_courtyard_to_bazaar',
        name: 'دالان خروجی به بازارچه آبادی',
        description: 'دالانی سنگ‌فرش که از هشتی مسافرخانه به راسته بازارچه آبادی راه دارد.',
        scene: 'courtyard',
        bounds: { x: 46, y: 42, width: 14, height: 42 },
        cursorType: 'move',
        hintDescription: 'رفتن به بازارچه آبادی'
      }
    ]
  },
  mirza_room: {
    id: 'mirza_room',
    name: 'اتاق میرزا صفدر (صحنه جرم)',
    bgImage: GameImages.mirzaRoomBg,
    ambientSoundType: 'room',
    objects: [
      {
        id: 'obj_wall_writing',
        name: 'نوشته روی دیوار گلی',
        description: 'با خطی شتاب‌زده و تکه‌ای زغال درشت نوشته شده: «حساب، خودش را پس میگیرد».',
        scene: 'mirza_room',
        bounds: { x: 44, y: 15, width: 22, height: 20 },
        cursorType: 'inspect',
        hintDescription: 'بررسی نوشته دیوار'
      },
      {
        id: 'obj_window',
        name: 'پنجره رو به کوچه پشتی',
        description: 'پنجره‌ای چوبی با قفلی شکسته. لبه بیرونی آن به کوچه بن‌بست باز می‌شود.',
        scene: 'mirza_room',
        bounds: { x: 74, y: 22, width: 18, height: 35 },
        cursorType: 'inspect',
        hintDescription: 'بررسی پنجره و لبه آن'
      },
      {
        id: 'obj_window_nail_thread',
        name: 'میخ لبه پنجره',
        description: 'میخی زنگ‌زده بر چهارچوب پنجره که رشته‌ای ابریشمی سرخ‌رنگ به آن پیچیده شده است.',
        scene: 'mirza_room',
        bounds: { x: 80, y: 44, width: 8, height: 10 },
        cursorType: 'take',
        hintDescription: 'برداشتن نخ قرمز'
      },
      {
        id: 'obj_desk',
        name: 'میز چوبی کار میرزا',
        description: 'میزی پر از دوات خشکیده، قلم‌تراش، ورق‌های مچاله‌شده و فنجان چای.',
        scene: 'mirza_room',
        bounds: { x: 30, y: 55, width: 26, height: 30 },
        cursorType: 'inspect',
        hintDescription: 'بررسی میز کار'
      },
      {
        id: 'obj_tea_cup',
        name: 'فنجان چای سرد',
        description: 'یک استکان کمرباریک چای که دست نخورده و سرد شده است.',
        scene: 'mirza_room',
        bounds: { x: 34, y: 54, width: 7, height: 9 },
        cursorType: 'inspect',
        hintDescription: 'بررسی فنجان چای'
      },
      {
        id: 'obj_account_ledger',
        name: 'دفتر حساب میرزا صفدر',
        description: 'دفتر قطور جلد چرمی که گوشه میز رها شده است.',
        scene: 'mirza_room',
        bounds: { x: 42, y: 58, width: 12, height: 12 },
        cursorType: 'take',
        hintDescription: 'برداشتن دفتر حساب'
      },
      {
        id: 'obj_holed_coin',
        name: 'سکه سوراخ‌شده لای شیار چوب',
        description: 'برقی فلزی میان شیار تخته‌های زیر میز به چشم می‌خورد.',
        scene: 'mirza_room',
        bounds: { x: 38, y: 76, width: 7, height: 8 },
        cursorType: 'take',
        hintDescription: 'برداشتن سکه سوراخ‌شده'
      },
      {
        id: 'obj_bed',
        name: 'تخت خواب و گلیم پاره',
        description: 'تخت چوبی کوتاه با لحافی پس‌زده شده که نشان می‌دهد میرزا دیشب خواب آسوده‌ای نداشته است.',
        scene: 'mirza_room',
        bounds: { x: 4, y: 52, width: 24, height: 36 },
        cursorType: 'inspect',
        hintDescription: 'بررسی تخت خواب'
      },
      {
        id: 'obj_chest',
        name: 'صندوقچه چوبی میرزا',
        description: 'صندوقچه‌ای با لولاهای فلزی که باز شده و تکه‌ای پارچه لای درز در آن گیر کرده است.',
        scene: 'mirza_room',
        bounds: { x: 18, y: 68, width: 12, height: 16 },
        cursorType: 'inspect',
        hintDescription: 'بررسی صندوقچه'
      },
      {
        id: 'obj_hearth_charcoal',
        name: 'اجاق خاموش و تکه زغال',
        description: 'اجاق کوچک گوشه اتاق با خاکسترهای سرد و یک تکه زغال چوب مناسب.',
        scene: 'mirza_room',
        bounds: { x: 62, y: 70, width: 10, height: 14 },
        cursorType: 'take',
        hintDescription: 'برداشتن تکه زغال'
      },
      {
        id: 'door_back_to_courtyard',
        name: 'در خروجی به حیاط',
        description: 'بازگشت به فضای باز حیاط کاروانسرا.',
        scene: 'mirza_room',
        bounds: { x: 2, y: 25, width: 10, height: 45 },
        cursorType: 'move',
        hintDescription: 'خروج به حیاط'
      }
    ]
  },
  stable: {
    id: 'stable',
    name: 'اصطبل و باربند کاروانسرا',
    bgImage: GameImages.stableBg,
    ambientSoundType: 'stable',
    objects: [
      {
        id: 'npc_morteza_stable',
        name: 'حاج مرتضی (تاجر شال)',
        description: 'حاج مرتضی با قبای فاخر روی سکوی نمدی نشسته و با آرامش غریبی چای می‌نوشد.',
        scene: 'stable',
        bounds: { x: 45, y: 40, width: 18, height: 45 },
        cursorType: 'talk',
        hintDescription: 'گفتگو با حاج مرتضی'
      },
      {
        id: 'obj_morteza_boots',
        name: 'چکمه‌های حاج مرتضی',
        description: 'چکمه‌های چرم ساغری گران‌قیمت با گل سرخ‌رنگ تازه خشکیده روی پاشنه.',
        scene: 'stable',
        bounds: { x: 50, y: 75, width: 10, height: 14 },
        cursorType: 'inspect',
        hintDescription: 'بررسی دقیق چکمه‌های حاج مرتضی'
      },
      {
        id: 'obj_horses',
        name: 'اسب و قاطرهای بارکش',
        description: 'چند اسب خسته که با آرامش از آخور یونجه می‌خورند.',
        scene: 'stable',
        bounds: { x: 12, y: 35, width: 25, height: 42 },
        cursorType: 'inspect',
        hintDescription: 'بررسی اسب‌ها و آخور'
      },
      {
        id: 'obj_leather_harness',
        name: 'زین و برگ چرمی',
        description: 'یراق‌آلات اسب‌های مسافران آویزان به تیرک‌های چوبی سقف.',
        scene: 'stable',
        bounds: { x: 74, y: 25, width: 16, height: 40 },
        cursorType: 'inspect',
        hintDescription: 'بررسی زین و برگ'
      },
      {
        id: 'door_stable_to_courtyard',
        name: 'خروجی به حیاط مسافرخانه',
        description: 'دالان بازگشت به حیاط سنگ‌فرش کاروانسرا.',
        scene: 'stable',
        bounds: { x: 88, y: 35, width: 12, height: 50 },
        cursorType: 'move',
        hintDescription: 'بازگشت به حیاط'
      }
    ]
  },
  act1_outro: {
    id: 'act1_outro',
    name: 'پرده اول: حقیقت آشکار می‌شود',
    bgImage: GameImages.mirzaRoomBg,
    ambientSoundType: 'room',
    objects: []
  },

  // ACT 2 SCENES
  mirza_room_act2: {
    id: 'mirza_room_act2',
    name: 'اتاق میرزا صفدر — بررسی عمیق دفتر خالی',
    bgImage: GameImages.mirzaRoomBg,
    ambientSoundType: 'room',
    objects: [
      {
        id: 'obj_act2_desk_ledger',
        name: 'دفترچه بریده‌شده میرزا روی میز',
        description: 'دفترچه حسابی که پس از کشف رمز «۷ صندوق»، معلوم شد صفحات میانی آن با تیغ بریده شده و صفحات باقیمانده سفیدند.',
        scene: 'mirza_room_act2',
        bounds: { x: 32, y: 52, width: 18, height: 22 },
        cursorType: 'inspect',
        hintDescription: 'بررسی عمیق دفترچه و صفحات سفید'
      },
      {
        id: 'obj_act2_oil_lamp',
        name: 'چراغ‌موشی روی طاقچه',
        description: 'چراغ سفالی کوچک با شعله‌ای لرزان. دود ملایمی از آن بلند می‌شود.',
        scene: 'mirza_room_act2',
        bounds: { x: 74, y: 30, width: 10, height: 16 },
        cursorType: 'use',
        hintDescription: 'آزمایش حرارت یا بوی نفت'
      },
      {
        id: 'obj_act2_window_view',
        name: 'پنجره رو به کوچه بازار',
        description: 'از لای پنجره نیمه‌باز صدای داد و ستد و همهمه مبهم بازارچه آبادی به گوش می‌رسد.',
        scene: 'mirza_room_act2',
        bounds: { x: 50, y: 15, width: 18, height: 35 },
        cursorType: 'inspect',
        hintDescription: 'نگاه به کوچه و بازارچه'
      },
      {
        id: 'door_mirza_to_bazaar',
        name: 'خروجی به بازارچه آبادی',
        description: 'راهرویی که مستقیماً از کاروانسرا به راسته بازارچه آبادی وصل می‌شود.',
        scene: 'mirza_room_act2',
        bounds: { x: 88, y: 35, width: 12, height: 50 },
        cursorType: 'move',
        hintDescription: 'رفتن به بازارچه آبادی'
      },
      {
        id: 'door_act2_to_inn_courtyard',
        name: 'بازگشت به حیاط مسافرخانه',
        description: 'در چوبی که به حیاط اصلی مسافرخانه باز می‌شود.',
        scene: 'mirza_room_act2',
        bounds: { x: 2, y: 35, width: 12, height: 50 },
        cursorType: 'move',
        hintDescription: 'بازگشت به حیاط'
      }
    ]
  },

  bazaar: {
    id: 'bazaar',
    name: 'بازارچه سرپوشیده آبادی',
    bgImage: GameImages.bazaarBg,
    ambientSoundType: 'bazaar',
    objects: [
      {
        id: 'npc_qasem_bazaar',
        name: 'مشهدی قاسم (رمال و بقال)',
        description: 'مشهدی قاسم جلوی بساط ادویه‌اش نشسته و با آب و تاب برای مردم از جن و راهزنان طلسم کویر قصه می‌بافد.',
        scene: 'bazaar',
        bounds: { x: 18, y: 44, width: 16, height: 42 },
        cursorType: 'talk',
        hintDescription: 'صحبت با مشهدی قاسم'
      },
      {
        id: 'npc_mahbanoo_bazaar',
        name: 'مه‌بانو (رنگرز و قالی‌باف)',
        description: 'زنی تیزبین با سرانگشتانی سرخ‌رنگ از روناس، مشغول مرتب کردن کلاف‌های پشمی در سایه طاق.',
        scene: 'bazaar',
        bounds: { x: 42, y: 46, width: 16, height: 40 },
        cursorType: 'talk',
        hintDescription: 'صحبت با مه‌بانو'
      },
      {
        id: 'obj_madder_dye_vats',
        name: 'دیگ‌های روناس و کلاف‌های سرخ',
        description: 'بوی تند روناس جوشیده در هوا پیچیده است. رنگ پارچه‌ها دقیقاً همان سرخی نمد صندوق‌هاست.',
        scene: 'bazaar',
        bounds: { x: 59, y: 55, width: 14, height: 28 },
        cursorType: 'inspect',
        hintDescription: 'بررسی رنگ روناس و الیاف'
      },
      {
        id: 'door_bazaar_to_papermaker',
        name: 'دکان اوستا صادق کاغذفروش',
        description: 'دکانی کوچک با قاب چوبی که دسته‌های کاغذ و طومارهای خطاطی در آن چیده شده است.',
        scene: 'bazaar',
        bounds: { x: 76, y: 38, width: 14, height: 45 },
        cursorType: 'move',
        hintDescription: 'ورود به دکان کاغذفروش'
      },
      {
        id: 'door_bazaar_to_yaqub',
        name: 'کوچه بن‌بست خانه یعقوب',
        description: 'دالانی باریک و سایه‌انداز که به خانه یعقوب نابینا و حاشیه قنات منتهی می‌شود.',
        scene: 'bazaar',
        bounds: { x: 91, y: 35, width: 9, height: 50 },
        cursorType: 'move',
        hintDescription: 'رفتن به خانه یعقوب'
      },
      {
        id: 'door_bazaar_to_mirza_room',
        name: 'بازگشت به اتاق میرزا صفدر',
        description: 'مسیر برگشت به اتاق میرزا در کاروانسرا.',
        scene: 'bazaar',
        bounds: { x: 2, y: 35, width: 12, height: 50 },
        cursorType: 'move',
        hintDescription: 'بازگشت به اتاق میرزا'
      }
    ]
  },

  papermaker_shop: {
    id: 'papermaker_shop',
    name: 'دکان و کارگاه صحافی اوستا صادق',
    bgImage: GameImages.papermakerBg,
    ambientSoundType: 'workshop',
    objects: [
      {
        id: 'npc_sadiq_shop',
        name: 'اوستا صادق (کاغذفروش و صحاف)',
        description: 'اوستا صادق با عینکی ذره‌بینی روی میز کار خم شده و برگه‌های کهنه را آهار می‌زند.',
        scene: 'papermaker_shop',
        bounds: { x: 44, y: 38, width: 18, height: 46 },
        cursorType: 'talk',
        hintDescription: 'صحبت با اوستا صادق'
      },
      {
        id: 'obj_paper_drying_racks',
        name: 'کاغذهای آهارمهره اصفهان',
        description: 'ورق‌های ضخیم پنبه‌ای و دست‌ساز که با نشاسته و کتیرا لعاب خورده و آویزان شده‌اند.',
        scene: 'papermaker_shop',
        bounds: { x: 12, y: 22, width: 22, height: 35 },
        cursorType: 'inspect',
        hintDescription: 'بررسی جنس و بافت کاغذها'
      },
      {
        id: 'obj_sadiq_charcoal_tray',
        name: 'سینی گرد دوده بید و قلم‌موها',
        description: 'ظرفی سفالی پر از نرم‌ترین گرد دوده بید و قلم‌موهای ظریف موی شتر برای سیاه‌مشق و سایه‌اندازی.',
        scene: 'papermaker_shop',
        bounds: { x: 33, y: 65, width: 14, height: 18 },
        cursorType: 'take',
        hintDescription: 'برداشتن گرد دوده و قلم‌مو'
      },
      {
        id: 'obj_calligraphy_press',
        name: 'منگنه چوبی و تیغ صحافی',
        description: 'پرس سنگین بلوط و تیغ‌های صیقلی برای جلدسازی و برش اوراق کتاب.',
        scene: 'papermaker_shop',
        bounds: { x: 72, y: 48, width: 16, height: 36 },
        cursorType: 'inspect',
        hintDescription: 'بررسی ابزار برش و تیغ'
      },
      {
        id: 'door_papermaker_to_bazaar',
        name: 'خروج به بازارچه',
        description: 'در خروجی دکان رو به بازارچه آبادی.',
        scene: 'papermaker_shop',
        bounds: { x: 89, y: 35, width: 11, height: 50 },
        cursorType: 'move',
        hintDescription: 'بازگشت به بازارچه'
      }
    ]
  },

  yaqub_house: {
    id: 'yaqub_house',
    name: 'اندرونی خانه یعقوب نابینا',
    bgImage: GameImages.yaqubHouseBg,
    ambientSoundType: 'room',
    objects: [
      {
        id: 'npc_yaqub_dwelling',
        name: 'یعقوب نابینا',
        description: 'پیرمردی با چهره‌ای نورانی و آرامش عمیق روی گلیم نشسته و دست به عصای چوبی دارد.',
        scene: 'yaqub_house',
        bounds: { x: 42, y: 38, width: 20, height: 48 },
        cursorType: 'talk',
        hintDescription: 'گفتگو با یعقوب نابینا'
      },
      {
        id: 'obj_yaqub_samovar',
        name: 'سماور ورشویی و استکان‌ها',
        description: 'سماوری برنجی با قل‌قل آرام آب و عطر دارچین و چای تازه دم‌کشیده.',
        scene: 'yaqub_house',
        bounds: { x: 18, y: 55, width: 14, height: 25 },
        cursorType: 'inspect',
        hintDescription: 'بررسی سماور و استکان‌ها'
      },
      {
        id: 'obj_singing_bowls',
        name: 'کاسه‌های برنجی و زنگوله‌ها',
        description: 'مجموعه‌ای از کاسه‌های صوتی و زنگوله‌های گوناگون که یعقوب با آن‌ها کوک و ارتعاش اصوات را می‌سنجد.',
        scene: 'yaqub_house',
        bounds: { x: 67, y: 58, width: 18, height: 22 },
        cursorType: 'inspect',
        hintDescription: 'آزمایش و شنیدن کاسه‌های صوتی'
      },
      {
        id: 'door_yaqub_to_courtyard',
        name: 'خروج به حیاط خانه یعقوب',
        description: 'درِ کلون‌دار رو به حیاط خلوت و انتهای کوچه قنات.',
        scene: 'yaqub_house',
        bounds: { x: 88, y: 32, width: 12, height: 52 },
        cursorType: 'move',
        hintDescription: 'رفتن به حیاط خلوت یعقوب'
      },
      {
        id: 'door_yaqub_to_bazaar',
        name: 'بازگشت به بازارچه',
        description: 'کوچه بن‌بست بازگشت به راسته بازارچه.',
        scene: 'yaqub_house',
        bounds: { x: 2, y: 32, width: 12, height: 52 },
        cursorType: 'move',
        hintDescription: 'بازگشت به بازارچه'
      }
    ]
  },

  yaqub_courtyard: {
    id: 'yaqub_courtyard',
    name: 'حیاط خلوت یعقوب و پای دیوار قنات',
    bgImage: GameImages.yaqubCourtyardBg,
    ambientSoundType: 'courtyard',
    objects: [
      {
        id: 'obj_courtyard_soft_sand',
        name: 'ریگزار نرم پای دیوار',
        description: 'شن‌های نرم و دست‌نخورده کوچه. هیچ رد پای عمیقی از بیست شتر در این خاک دیده نمی‌شود.',
        scene: 'yaqub_courtyard',
        bounds: { x: 15, y: 65, width: 28, height: 25 },
        cursorType: 'inspect',
        hintDescription: 'بررسی رد پاها در ریگزار'
      },
      {
        id: 'obj_hidden_iron_bell',
        name: 'بوته خار و زنگوله پنهان',
        description: 'پشت بوته خارهای پای دیوار چیزی فلزی می‌درخشد؛ یک زنگوله سبک با زبانه آهنی لق!',
        scene: 'yaqub_courtyard',
        bounds: { x: 64, y: 62, width: 14, height: 20 },
        cursorType: 'take',
        hintDescription: 'برداشتن زنگوله با زبانه لق آهنی'
      },
      {
        id: 'obj_dry_basin',
        name: 'حوضچه خشکیده و انار خشک',
        description: 'حوضچه‌ای قدیمی با کاشی‌های شکسته فیروزه‌ای که شاخه‌های خشک انار روی آن سایه انداخته‌اند.',
        scene: 'yaqub_courtyard',
        bounds: { x: 44, y: 55, width: 16, height: 25 },
        cursorType: 'inspect',
        hintDescription: 'بررسی حوضچه'
      },
      {
        id: 'door_courtyard_to_house',
        name: 'ورود به اندرونی یعقوب',
        description: 'درِ چوبی بازگشت به خانه یعقوب.',
        scene: 'yaqub_courtyard',
        bounds: { x: 2, y: 35, width: 12, height: 50 },
        cursorType: 'move',
        hintDescription: 'ورود به اتاق یعقوب'
      },
      {
        id: 'door_courtyard_to_qanat',
        name: 'گذرگاه منتهی به قنات متروک',
        description: 'معبر باریک سنگ‌چین‌شده‌ای که به سمت دهانه قنات متروک در لبه آبادی می‌رود.',
        scene: 'yaqub_courtyard',
        bounds: { x: 86, y: 32, width: 14, height: 52 },
        cursorType: 'move',
        hintDescription: 'رفتن به ورودی قنات متروک'
      }
    ]
  },

  qanat_entrance: {
    id: 'qanat_entrance',
    name: 'دهانه ورودی قنات متروک',
    bgImage: GameImages.qanatEntranceBg,
    ambientSoundType: 'qanat',
    objects: [
      {
        id: 'obj_qanat_mouth',
        name: 'دهانه تاریک قنات و میله‌های چاه',
        description: 'باد سرد و بوی گوگرد از اعماق چاه‌های قنات متروک زوزه می‌کشد. نوای پایی از اعماق تاریکی نمی‌آید.',
        scene: 'qanat_entrance',
        bounds: { x: 35, y: 35, width: 28, height: 45 },
        cursorType: 'inspect',
        hintDescription: 'کاوش در دهانه قنات'
      },
      {
        id: 'obj_qanat_brickwork',
        name: 'آجرچینی سست دیواره',
        description: 'لای درز یکی از آجرهای دست‌خورده دهانه، شیئی فلزی جاسازی شده است؛ پلاک مسین «خزانهٔ باد»!',
        scene: 'qanat_entrance',
        bounds: { x: 22, y: 52, width: 12, height: 20 },
        cursorType: 'take',
        hintDescription: 'برداشتن پلاک مسین ضرابخانه'
      },
      {
        id: 'obj_abandoned_wooden_chocks',
        name: 'تیرک‌ها و الوارهای تازه',
        description: 'چوب‌بست‌های ورودی جابه‌جا شده‌اند و خاک رس روی آنها تازه است؛ نشانه این‌که جعبه‌هایی اخیراً از اینجا رد شده‌اند.',
        scene: 'qanat_entrance',
        bounds: { x: 68, y: 56, width: 18, height: 25 },
        cursorType: 'inspect',
        hintDescription: 'بررسی چوب‌بست‌ها و رد حرکت جعبه‌ها'
      },
      {
        id: 'door_qanat_to_yaqub_courtyard',
        name: 'بازگشت به حیاط یعقوب',
        description: 'مسیر برگشت به حیاط خانه یعقوب و کوچه آبادی.',
        scene: 'qanat_entrance',
        bounds: { x: 2, y: 35, width: 14, height: 50 },
        cursorType: 'move',
        hintDescription: 'بازگشت به حیاط یعقوب'
      }
    ]
  },

  act2_outro: {
    id: 'act2_outro',
    name: 'پرده دوم: پایان راز صندوق‌های تهی',
    bgImage: GameImages.qanatEntranceBg,
    ambientSoundType: 'qanat',
    objects: []
  },

  // Act 3 Scenes
  old_bridge: {
    id: 'old_bridge',
    name: 'پل سنگی قدیمی',
    bgImage: GameImages.oldBridgeBg,
    ambientSoundType: 'bridge',
    objects: [
      {
        id: 'npc_heydar_bridge',
        name: 'حیدرِ پل (دیده‌بان)',
        description: 'حیدر با قبای کهنه نمدی کنار لبه پل به جریان خروشان آب خیره شده است.',
        scene: 'old_bridge',
        bounds: { x: 42, y: 38, width: 16, height: 48 },
        cursorType: 'talk',
        hintDescription: 'گفتگو با حیدرِ پل'
      },
      {
        id: 'obj_bridge_parapet',
        name: 'جان‌پناه و کنگره‌های سنگی پل',
        description: 'کنگره‌های خزه بسته سنگی پل که رد ساییدگی کابل‌های ضخیم بر لبه بیرونی آنها مشهود است.',
        scene: 'old_bridge',
        bounds: { x: 12, y: 55, width: 25, height: 35 },
        cursorType: 'inspect',
        hintDescription: 'بررسی کنگره‌های سنگی و رد کابل'
      },
      {
        id: 'obj_heydar_lantern',
        name: 'فانوس دودزده دیده‌بانی',
        description: 'فانوس برنجی سنگین که بوی پیه گرگ و روغن چرخ از آن بلند می‌شود.',
        scene: 'old_bridge',
        bounds: { x: 62, y: 48, width: 8, height: 20 },
        cursorType: 'inspect',
        hintDescription: 'وارسی فانوس دیده‌بان'
      },
      {
        id: 'path_bridge_to_under',
        name: 'پله‌های سنگی زیر پل',
        description: 'پله‌های لغزنده و نمور که به پایه‌های سنگی زیر پل و دهانه گرداب می‌رسند.',
        scene: 'old_bridge',
        bounds: { x: 2, y: 45, width: 12, height: 42 },
        cursorType: 'move',
        hintDescription: 'فرود به زیر طاق‌های پل'
      },
      {
        id: 'path_bridge_to_checkpoint',
        name: 'جاده سنگفرش پاسگاه',
        description: 'مسیر سنگفرش به سمت راه‌بند و قراولخانه نایب بهرام.',
        scene: 'old_bridge',
        bounds: { x: 86, y: 30, width: 12, height: 55 },
        cursorType: 'move',
        hintDescription: 'رفتن به پاسگاه راه'
      },
      {
        id: 'path_bridge_to_river',
        name: 'سراشیبی ساحل رودخانه',
        description: 'کوره راه خاکی به سمت نیزارها و کلبه ماهیگیر.',
        scene: 'old_bridge',
        bounds: { x: 22, y: 70, width: 16, height: 25 },
        cursorType: 'move',
        hintDescription: 'رفتن به ساحل رودخانه'
      }
    ]
  },

  under_bridge: {
    id: 'under_bridge',
    name: 'زیر طاق‌های پل سنگی',
    bgImage: GameImages.underBridgeBg,
    ambientSoundType: 'river',
    objects: [
      {
        id: 'obj_underbridge_winch',
        name: 'وینچ چدنی و قرقره‌های پنهان',
        description: 'چرخ‌دنده‌ها و محوری سنگین متصل به پایه‌های پل برای بالا کشیدن تور و بار از آب.',
        scene: 'under_bridge',
        bounds: { x: 38, y: 35, width: 22, height: 40 },
        cursorType: 'use',
        hintDescription: 'بررسی و راه‌اندازی وینچ'
      },
      {
        id: 'obj_bridge_arches_chain',
        name: 'کابل‌های فولادی و زنجیرهای معلق',
        description: 'رشته‌های کابل سیمی بافته شده که در دهانه خروشان آب غوطه‌ورند.',
        scene: 'under_bridge',
        bounds: { x: 15, y: 25, width: 18, height: 45 },
        cursorType: 'inspect',
        hintDescription: 'بررسی کابل‌های فولادی در آب'
      },
      {
        id: 'obj_heydar_toolbox',
        name: 'جعبه ابزار سنگی متولی',
        description: 'جعبه چوبی پوسیده حاوی سیم‌های بافته و اشیای به دست آمده از آب.',
        scene: 'under_bridge',
        bounds: { x: 68, y: 65, width: 15, height: 25 },
        cursorType: 'take',
        hintDescription: 'بررسی جعبه ابزار حیدر'
      },
      {
        id: 'path_under_to_bridge',
        name: 'پله‌های بازگشت به روی پل',
        description: 'پله‌های سنگی برای بالا رفتن و بازگشت به روی پل.',
        scene: 'under_bridge',
        bounds: { x: 2, y: 20, width: 12, height: 60 },
        cursorType: 'move',
        hintDescription: 'بالا رفتن به روی پل'
      },
      {
        id: 'path_under_to_river',
        name: 'مسیر آبراه به ساحل رودخانه',
        description: 'حاشیه صخره‌ای رودخانه به سمت کلبه صیادی.',
        scene: 'under_bridge',
        bounds: { x: 84, y: 50, width: 14, height: 45 },
        cursorType: 'move',
        hintDescription: 'خروج به سمت ساحل رودخانه'
      }
    ]
  },

  river_bank: {
    id: 'river_bank',
    name: 'کناره و ساحل رودخانه',
    bgImage: GameImages.riverBankBg,
    ambientSoundType: 'river',
    objects: [
      {
        id: 'obj_river_current_whirlpool',
        name: 'گرداب و خط تند جریان آب',
        description: 'جایی که جریان اصلی رودخانه شتاب می‌گیرد و اجسام را به زیر پل یا کانال آسیاب می‌راند.',
        scene: 'river_bank',
        bounds: { x: 45, y: 55, width: 24, height: 30 },
        cursorType: 'use',
        hintDescription: 'بررسی سرعت و مسیر جریان آب'
      },
      {
        id: 'obj_river_reeds_driftwood',
        name: 'نیزارهای وحشی و کنده گیرکرده',
        description: 'نی‌های خشک و بلند در خم رودخانه که خس و خاشاک را در خود به دام می‌اندازند.',
        scene: 'river_bank',
        bounds: { x: 15, y: 60, width: 20, height: 28 },
        cursorType: 'inspect',
        hintDescription: 'جستجو در نیزارها'
      },
      {
        id: 'path_river_to_hut',
        name: 'کوره راه کلبه صیادی',
        description: 'مسیر باریک خاکی به سمت کلبه عمو صفر ماهیگیر.',
        scene: 'river_bank',
        bounds: { x: 2, y: 35, width: 14, height: 50 },
        cursorType: 'move',
        hintDescription: 'ورود به کلبه عمو صفر'
      },
      {
        id: 'path_river_to_mill',
        name: 'کانال انشعابی آسیاب',
        description: 'مسیر در امتداد جویبار سنگ‌چین به سمت آسیاب آبی ماه‌نگار.',
        scene: 'river_bank',
        bounds: { x: 82, y: 35, width: 16, height: 50 },
        cursorType: 'move',
        hintDescription: 'رفتن به آسیاب آبی'
      },
      {
        id: 'path_river_to_bridge',
        name: 'سربالایی پل قدیمی',
        description: 'مسیر برگشت به پل سنگی بزرگ.',
        scene: 'river_bank',
        bounds: { x: 44, y: 15, width: 18, height: 25 },
        cursorType: 'move',
        hintDescription: 'بازگشت به پل قدیمی'
      }
    ]
  },

  fisherman_hut: {
    id: 'fisherman_hut',
    name: 'کلبه عمو صفر ماهیگیر',
    bgImage: GameImages.fishermanHutBg,
    ambientSoundType: 'river',
    objects: [
      {
        id: 'npc_safar_fisherman',
        name: 'عمو صفر (ماهیگیر کهنه‌کار)',
        description: 'پیرمرد سالخورده با دستان پینه‌بسته در حال تعمیر قلاب‌ها و تورهایش.',
        scene: 'fisherman_hut',
        bounds: { x: 38, y: 36, width: 18, height: 52 },
        cursorType: 'talk',
        hintDescription: 'گفتگو با عمو صفر'
      },
      {
        id: 'obj_safar_fish_nets',
        name: 'تورهای کهنه کنفی صیادی',
        description: 'تورهای واقعی نخی و کنفی با بافت درشت و طناب‌های سنتی ماهیگیری.',
        scene: 'fisherman_hut',
        bounds: { x: 10, y: 30, width: 20, height: 45 },
        cursorType: 'inspect',
        hintDescription: 'بررسی تورهای سنتی صیادی'
      },
      {
        id: 'obj_safar_plummet',
        name: 'شناور شاغول‌دار روی میز صیاد',
        description: 'شناور چوب‌پنبه‌ای ویژه با وزنه سربی برای اندازه‌گیری عمق آب.',
        scene: 'fisherman_hut',
        bounds: { x: 65, y: 58, width: 14, height: 24 },
        cursorType: 'take',
        hintDescription: 'برداشتن شناور شاغول‌دار'
      },
      {
        id: 'door_hut_to_river',
        name: 'درگاه خروجی به ساحل رودخانه',
        description: 'خروج از کلبه حصیری به کناره رودخانه.',
        scene: 'fisherman_hut',
        bounds: { x: 85, y: 30, width: 13, height: 58 },
        cursorType: 'move',
        hintDescription: 'بازگشت به ساحل رودخانه'
      }
    ]
  },

  water_mill: {
    id: 'water_mill',
    name: 'آسیاب آبی ماه‌نگار',
    bgImage: GameImages.waterMillBg,
    ambientSoundType: 'mill',
    objects: [
      {
        id: 'npc_mahnegar_mill',
        name: 'ماه‌نگار (زنِ آسیاب)',
        description: 'زنی کاردان و هوشیار با گرد سفید آرد روی چادر که مراقب گردش چرخ آسیاب است.',
        scene: 'water_mill',
        bounds: { x: 36, y: 38, width: 18, height: 52 },
        cursorType: 'talk',
        hintDescription: 'گفتگو با ماه‌نگار'
      },
      {
        id: 'obj_mill_waterwheel',
        name: 'پره‌های بزرگ چوبی چرخ آسیاب',
        description: 'یکی از پره‌های بلوط چرخ چوبی با ضربه‌ای فلزی در ساعت دو بامداد شکسته است.',
        scene: 'water_mill',
        bounds: { x: 65, y: 20, width: 30, height: 60 },
        cursorType: 'inspect',
        hintDescription: 'وارسی پره‌های شکسته چرخ آسیاب'
      },
      {
        id: 'obj_mill_sluice_gate',
        name: 'دریچه آبگیر و لجن‌گیر سنگ‌آسیاب',
        description: 'شیئی براق و سنگین در شکاف سنگ‌چین دریچه آبگیر به چشم می‌خورد؛ استوانه رویین ممهور!',
        scene: 'water_mill',
        bounds: { x: 18, y: 58, width: 16, height: 30 },
        cursorType: 'take',
        hintDescription: 'برداشتن استوانه رویین (ماهی فلزی)'
      },
      {
        id: 'path_mill_to_river',
        name: 'مسیر برگشت به رودخانه',
        description: 'جاده ساحلی به سمت کناره رودخانه و کلبه صیاد.',
        scene: 'water_mill',
        bounds: { x: 2, y: 40, width: 14, height: 50 },
        cursorType: 'move',
        hintDescription: 'بازگشت به رودخانه'
      },
      {
        id: 'path_mill_to_warehouse',
        name: 'راه بالادست به انبار متروک',
        description: 'کوره راه کوهپایه‌ای به سمت انبار کاروان در بالادست رودخانه.',
        scene: 'water_mill',
        bounds: { x: 42, y: 12, width: 18, height: 26 },
        cursorType: 'move',
        hintDescription: 'رفتن به انبار متروک'
      }
    ]
  },

  road_checkpoint: {
    id: 'road_checkpoint',
    name: 'پاسگاه راه و راه‌بند',
    bgImage: GameImages.roadCheckpointBg,
    ambientSoundType: 'wind',
    objects: [
      {
        id: 'npc_bahram_guard',
        name: 'نایب بهرام (مأمور پاسگاه)',
        description: 'افسر قاجاری با کلاه پوستی بلند و سبیل‌های تاب‌داده کنار راه‌بند چوبی ایستاده است.',
        scene: 'road_checkpoint',
        bounds: { x: 32, y: 32, width: 18, height: 55 },
        cursorType: 'talk',
        hintDescription: 'استنطاق نایب بهرام'
      },
      {
        id: 'npc_gholi_runner',
        name: 'قلی (نوجوان پادو)',
        description: 'پسربچه‌ای زرنگ و چابک با کلاه نمدی کج که مدام اطراف پاسگاه سرک می‌کشد.',
        scene: 'road_checkpoint',
        bounds: { x: 55, y: 42, width: 15, height: 46 },
        cursorType: 'talk',
        hintDescription: 'سین‌جیم کردن قلی پادو'
      },
      {
        id: 'obj_patrol_logbook',
        name: 'دفتر وقایع شبانه پاسگاه',
        description: 'دفتر رسمی ثبت ترددها با جوهر آبی و ثبت ادعای آرامش شبانه.',
        scene: 'road_checkpoint',
        bounds: { x: 14, y: 55, width: 14, height: 25 },
        cursorType: 'inspect',
        hintDescription: 'مطالعه دفتر وقایع پاسگاه'
      },
      {
        id: 'obj_patrol_sacks',
        name: 'گونی‌های بار قراولخانه',
        description: 'گونی‌های غله که شیئی سنگین چدنی زیر آنها لمس می‌شود؛ دسته وینچ پل!',
        scene: 'road_checkpoint',
        bounds: { x: 74, y: 58, width: 16, height: 30 },
        cursorType: 'take',
        hintDescription: 'کشف دسته آهنی وینچ پل'
      },
      {
        id: 'obj_bahram_cupboard',
        name: 'گنجه اختصاصی نایب بهرام',
        description: 'گنجه چوبی با قفل برنجی که بوی چرم نو و سکه تازه می‌دهد.',
        scene: 'road_checkpoint',
        bounds: { x: 2, y: 30, width: 10, height: 45 },
        cursorType: 'inspect',
        hintDescription: 'وارسی گنجه نایب بهرام'
      },
      {
        id: 'path_checkpoint_to_bridge',
        name: 'جاده بازگشت به پل قدیمی',
        description: 'مسیر سنگفرش به سمت پل سنگی.',
        scene: 'road_checkpoint',
        bounds: { x: 40, y: 75, width: 20, height: 22 },
        cursorType: 'move',
        hintDescription: 'بازگشت به پل سنگی'
      },
      {
        id: 'path_checkpoint_to_warehouse',
        name: 'راه خاکی به انبار متروک',
        description: 'مسیر بیابانی به سمت انبار بارانداز قدیمی.',
        scene: 'road_checkpoint',
        bounds: { x: 88, y: 25, width: 10, height: 55 },
        cursorType: 'move',
        hintDescription: 'رفتن به انبار متروک'
      }
    ]
  },

  abandoned_warehouse: {
    id: 'abandoned_warehouse',
    name: 'انبار متروک کاروان',
    bgImage: GameImages.abandonedWarehouseBg,
    ambientSoundType: 'room',
    objects: [
      {
        id: 'obj_warehouse_camel_blanket',
        name: 'نمد داغ‌خورده شتران سرخ',
        description: 'نمد پشمی مخفی شده پشت جعبه‌ها با داغ شتران کاروانسرای ریگستان.',
        scene: 'abandoned_warehouse',
        bounds: { x: 18, y: 62, width: 18, height: 26 },
        cursorType: 'take',
        hintDescription: 'برداشتن نمد شتران سرخ'
      },
      {
        id: 'obj_warehouse_culvert_stone',
        name: 'سنگ‌فرش لق و ناودانی به رودخانه',
        description: 'سنگ بزرگ کف انبار که باز شده و آبراهه‌ای شیب‌دار مستقیماً به رودخانه متصل است.',
        scene: 'abandoned_warehouse',
        bounds: { x: 42, y: 68, width: 22, height: 26 },
        cursorType: 'inspect',
        hintDescription: 'کشف دریچه ناودانی به آب'
      },
      {
        id: 'obj_warehouse_crates',
        name: 'صندوق‌های چوبی شکسته‌شده',
        description: 'بقایای صندوق‌های چوبی که نشان هفت ستاره بر آنها نقش بسته است.',
        scene: 'abandoned_warehouse',
        bounds: { x: 68, y: 45, width: 24, height: 42 },
        cursorType: 'inspect',
        hintDescription: 'بررسی صندوق‌های شکسته'
      },
      {
        id: 'obj_warehouse_reconstruction_spot',
        name: 'میز بازسازی نهایی ماجرای حیدرِ پل',
        description: 'محلی برای چیدن تمام شواهد و حل پرونده شبکه سرّی انتقال شمش‌ها در آبراه.',
        scene: 'abandoned_warehouse',
        bounds: { x: 42, y: 32, width: 20, height: 30 },
        cursorType: 'inspect',
        hintDescription: 'آغاز بازسازی نهایی پرونده'
      },
      {
        id: 'path_warehouse_to_mill',
        name: 'سراشیبی به آسیاب آبی',
        description: 'مسیر بازگشت به سمت آسیاب ماه‌نگار.',
        scene: 'abandoned_warehouse',
        bounds: { x: 2, y: 35, width: 12, height: 55 },
        cursorType: 'move',
        hintDescription: 'بازگشت به آسیاب آبی'
      },
      {
        id: 'path_warehouse_to_checkpoint',
        name: 'جاده به پاسگاه راه',
        description: 'مسیر برگشت به پاسگاه نایب بهرام.',
        scene: 'abandoned_warehouse',
        bounds: { x: 86, y: 35, width: 12, height: 55 },
        cursorType: 'move',
        hintDescription: 'بازگشت به پاسگاه'
      }
    ]
  },

  act3_outro: {
    id: 'act3_outro',
    name: 'پرده سوم: پایان ماجرای حیدرِ پل و راز میرزا روشن',
    bgImage: GameImages.oldBridgeBg,
    ambientSoundType: 'bridge',
    objects: []
  }
};
