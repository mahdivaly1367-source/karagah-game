import { InteractiveObject, SceneId } from '../types/game';
import { GameImages } from '../assets/images';

export interface SceneConfig {
  id: SceneId;
  name: string;
  bgImage: string;
  ambientSoundType: 'wind' | 'room' | 'courtyard' | 'stable';
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
  }
};
