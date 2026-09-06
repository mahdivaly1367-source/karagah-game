import { GameState } from '../types/game';

export interface HintStage {
  condition: (state: GameState) => boolean;
  level1: string; // Vague nudge
  level2: string; // Object or location reference
  level3: string; // Logical guide
}

export const HINTS: HintStage[] = [
  // 1. Initial stage: Examine the crime scene room
  {
    condition: (state: GameState) => (!state.storyFlags['act2_started'] && state.act !== 2) && (!state.evidence['ev_window_dust'] || !state.inventory.includes('coin_hole')),
    level1: 'خانخله باید اول از همه بوی ماجرا رو در خود حجره میرزا صفدر حس کنه. هیچ کارآگاهی بدون بو کشیدن صحنه جرم جلو نرفته.',
    level2: 'در اتاق میرزا صفدر، میز کار، لبه پنجره و دیوار پشت تخت را با دقت بررسی کن. چیزی زیر خاک‌ها و شیارهای چوب پنهان است.',
    level3: 'پنجره اتاق را بررسی کن تا بفهمی کسی اخیراً آن را باز کرده؛ سپس تخته‌های میز کار را بگرد تا سکه سوراخ‌شده و دفتر حساب میرزا را برداری.'
  },
  // 2. Window escape puzzle stage (needs thread & cloth combination)
  {
    condition: (state: GameState) => (!state.storyFlags['act2_started'] && state.act !== 2) && !state.puzzleFlags['window_puzzle_solved'],
    level1: 'آدمی که با عجله فرار می‌کنه، همیشه تکه‌ای از گذشته‌اش رو جا میذاره. چشمات رو تیز کن.',
    level2: 'روی میخ پنجره یا درزهای اتاق نخی جا مانده؛ تکه پارچه‌ای هم در صندوق چوبی افتاده است. آیا این دو با هم نسبتی دارند؟',
    level3: 'نخ قرمز و تکه پارچه را در Inventory با یکدیگر ترکیب (Combine) کن و سپس آن را با لبه پنجره تطبیق بده تا ثابت شود میرزا از پنجره خارج شده است.'
  },
  // 3. Courtyard and Stable interrogation stage (discovering Morteza's lie)
  {
    condition: (state: GameState) => (!state.storyFlags['act2_started'] && state.act !== 2) && !state.evidence['ev_morteza_boots'],
    level1: 'همه در این کاروانسرا راست نمی‌گویند. بعضی‌ها با زبان تسبیح می‌چرخانند و با پا در لای رد می‌اندازند.',
    level2: 'به حیاط مسافرخانه برو و گِل پای حوضچه را بررسی کن. سپس در اصطبل به سراغ چکمه‌های تمیز اما گل‌آلود حاج مرتضی برو.',
    level3: 'گِل حوضچه حیاط را بررسی کن تا سرنخ خاک سرخ را کشف کنی، سپس در اصطبل با حاج مرتضی صحبت کن و تناقض ادعایش را با نشان دادن سرنخ گِل آشکار کن.'
  },
  // 4. Climax stage: Revealing the blank ledger (Act 1)
  {
    condition: (state: GameState) => (!state.storyFlags['act2_started'] && state.act !== 2) && !state.puzzleFlags['ledger_revealed'],
    level1: 'کاغذ سفید مثل آدم لال می‌مونه... ولی اگه درست بهش فشار بیاری، راز دلش رو پس میده.',
    level2: 'دفتر حساب میرزا صفدر در کیف شماست، اما صفحاتش به ظاهر پاک شده. گوشه اجاق خاموش اتاق میرزا یا میز کار تکه زغالی برای سایه‌زدن وجود دارد.',
    level3: 'تکه زغال را با دفتر حساب میرزا صفدر ترکیب کن (یا در منوی Inspect دفتر را زیر نور مایل قرار بده و زغال بمال) تا رد خطوط فرورفته قلم میرزا آشکار شود!'
  },
  // --- ACT 2 HINTS ---
  // 5. Act 2 Start: Re-examining Mirza's room for the second hidden ledger
  {
    condition: (state: GameState) => (state.act === 2 || state.storyFlags['act2_started']) && !state.inventory.includes('ledger_act2_raw') && !state.inventory.includes('reconstructed_ledger_act2'),
    level1: 'میرزا صفدر با تیغ صفحات را بریده، اما فشار قلم هنوز روی کاغذهای سفید باقیمانده زنده است.',
    level2: 'در حجره میرزا صفدر (پرده دوم)، دفترچه بریده‌شده روی میز را بردار و به چراغ‌موشی روی طاقچه نگاه کن.',
    level3: 'دفترچه بریده‌شده روی میز میرزا را بررسی کن تا به کوله‌پشتی اضافه شود؛ سپس متوجه شیارهای عمیق فشار قلم‌نی بر کاغذ آهارمهره خواهی شد.'
  },
  // 6. Act 2: Market & Paper shop - Gathering shading materials
  {
    condition: (state: GameState) => (state.act === 2 || state.storyFlags['act2_started']) && !state.inventory.includes('shading_kit'),
    level1: 'کاغذ آهارمهره اصفهان را با زغال معمولی نمی‌توان خواند؛ دوده لطیف بید می‌خواهد و قلم‌موی موی شتر.',
    level2: 'از در خروجی به بازارچه آبادی برو. در راسته بازار به سراغ دکان کاغذسازی اوستا صادق برو و با او صحبت کن.',
    level3: 'در دکان اوستا صادق، سینی گرد دوده بید و قلم‌موی موی شتر را بردار (یا از اوستا بگیر) و در کوله‌پشتی با هم ترکیب (Combine) کن تا کیت سایه‌زنی ساخته شود.'
  },
  // 7. Act 2: Revealing the Act 2 ledger with the shading kit
  {
    condition: (state: GameState) => (state.act === 2 || state.storyFlags['act2_started']) && !state.puzzleFlags['empty_ledger_act2_solved'],
    level1: 'کیت سایه‌زنی آماده است. حالا وقت نوازش دادن شیارهای سفید کاغذ میرزاست.',
    level2: 'کیت سایه‌زنی دوده را روی دفترچه بریده‌شده میرزا به کار ببر.',
    level3: 'در کوله‌پشتی «کیت سایه‌زنی صحافی» را با «دفترچه دستکاری‌شده میرزا» ترکیب کن تا راز وحشتناک خالی بودن صندوق‌ها فاش شود!'
  },
  // 8. Act 2: Confronting Yaqub and uncovering the bell illusion
  {
    condition: (state: GameState) => (state.act === 2 || state.storyFlags['act2_started']) && !state.puzzleFlags['yaqub_sound_puzzle_solved'],
    level1: 'یعقوب نابینا ادعا می‌کند بیست شتر با زنگوله از کوچه‌اش گذشته‌اند... اما شن‌های کوچه با گوش‌های او هم‌عقیده نیستند.',
    level2: 'به خانه یعقوب در انتهای بازارچه برو؛ با او صحبت کن، سپس به حیاط خلوت یعقوب برو و بوته‌های خار را بگرد.',
    level3: 'زنگوله حلبی لق را از بوته‌های پای دیوار بردار، نزد یعقوب ببر و با به صدا درآوردنش به او ثابت کن که فریب یک صدای ساختگی را خورده است.'
  },
  // 9. Act 2 Climax: Investigating the Qanat Entrance & Copper Token
  {
    condition: (state: GameState) => (state.act === 2 || state.storyFlags['act2_started']) && (!state.evidence['ev_act2_copper_token_cipher'] || !state.storyFlags['act2_completed']),
    level1: 'باد سرد از دهانه قنات متروک زوزه می‌کشد؛ نشانه‌ای فلزی در لای آجرچینی پنهان است.',
    level2: 'از حیاط یعقوب به سمت دهانه قنات متروک برو. آجرچینی دیوار و دهانه تاریک قنات را وارسی کن.',
    level3: 'آجرچینی قنات را بررسی کن تا «پلاک مسین خزانهٔ باد» را بیابی، سپس دهانه قنات را وارسی کن تا خانخله پرده از کل ماجرای غارت صوری بردارد!'
  }
];

export function getActiveHint(state: GameState): { level1: string; level2: string; level3: string } {
  for (const stage of HINTS) {
    if (stage.condition(state)) {
      return {
        level1: stage.level1,
        level2: stage.level2,
        level3: stage.level3,
      };
    }
  }

  return {
    level1: 'تمام سرنخ‌های پرده دوم کشف شده و پرده از راز صندوق‌های تهی برداشته شده است.',
    level2: 'دفترچه بازخوانی‌شده و پلاک مسین را در ذهن مرور کن.',
    level3: 'تحقیقات پرده دوم با موفقیت تکمیل شد.'
  };
}
