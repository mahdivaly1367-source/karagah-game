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
    condition: (state: GameState) => !state.evidence['ev_window_dust'] || !state.inventory.includes('coin_hole'),
    level1: 'خانخله باید اول از همه بوی ماجرا رو در خود حجره میرزا صفدر حس کنه. هیچ کارآگاهی بدون بو کشیدن صحنه جرم جلو نرفته.',
    level2: 'در اتاق میرزا صفدر، میز کار، لبه پنجره و دیوار پشت تخت را با دقت بررسی کن. چیزی زیر خاک‌ها و شیارهای چوب پنهان است.',
    level3: 'پنجره اتاق را بررسی کن تا بفهمی کسی اخیراً آن را باز کرده؛ سپس تخته‌های میز کار را بگرد تا سکه سوراخ‌شده و دفتر حساب میرزا را برداری.'
  },
  // 2. Window escape puzzle stage (needs thread & cloth combination)
  {
    condition: (state: GameState) => !state.puzzleFlags['window_puzzle_solved'],
    level1: 'آدمی که با عجله فرار می‌کنه، همیشه تکه‌ای از گذشته‌اش رو جا میذاره. چشمات رو تیز کن.',
    level2: 'روی میخ پنجره یا درزهای اتاق نخی جا مانده؛ تکه پارچه‌ای هم در صندوق چوبی افتاده است. آیا این دو با هم نسبتی دارند؟',
    level3: 'نخ قرمز و تکه پارچه را در Inventory با یکدیگر ترکیب (Combine) کن و سپس آن را با لبه پنجره تطبیق بده تا ثابت شود میرزا از پنجره خارج شده است.'
  },
  // 3. Courtyard and Stable interrogation stage (discovering Morteza's lie)
  {
    condition: (state: GameState) => !state.evidence['ev_morteza_boots'],
    level1: 'همه در این کاروانسرا راست نمی‌گویند. بعضی‌ها با زبان تسبیح می‌چرخانند و با پا در لای رد می‌اندازند.',
    level2: 'به حیاط مسافرخانه برو و گِل پای حوضچه را بررسی کن. سپس در اصطبل به سراغ چکمه‌های تمیز اما گل‌آلود حاج مرتضی برو.',
    level3: 'گِل حوضچه حیاط را بررسی کن تا سرنخ خاک سرخ را کشف کنی، سپس در اصطبل با حاج مرتضی صحبت کن و تناقض ادعایش را با نشان دادن سرنخ گِل آشکار کن.'
  },
  // 4. Climax stage: Revealing the blank ledger (Act 1)
  {
    condition: (state: GameState) => !state.puzzleFlags['ledger_revealed'],
    level1: 'کاغذ سفید مثل آدم لال می‌مونه... ولی اگه درست بهش فشار بیاری، راز دلش رو پس میده.',
    level2: 'دفتر حساب میرزا صفدر در کیف شماست، اما صفحاتش به ظاهر پاک شده. گوشه اجاق خاموش اتاق میرزا یا میز کار تکه زغالی برای سایه‌زدن وجود دارد.',
    level3: 'تکه زغال را با دفتر حساب میرزا صفدر ترکیب کن (یا در منوی Inspect دفتر را زیر نور مایل قرار بده و زغال بمال) تا رد خطوط فرورفته قلم میرزا آشکار شود!'
  },
  // --- ACT 2 HINTS ---
  // 5. Act 2 Start: Re-examining Mirza's room for the second hidden ledger
  {
    condition: (state: GameState) => (state.act === 2 || state.storyFlags['act2_started']) && !state.inventory.includes('ledger_act2_raw'),
    level1: 'خانخله می‌داند میرزا صفدر آدم یک‌دفتره‌ای نبوده است. حس ششم می‌گوید یک تخته زیر فرش لق می‌زند.',
    level2: 'در حجره میرزا صفدر (پرده دوم)، کف‌پوش چوبی کنار میز و لبه طاقچه را بکاو. تختهٔ چوبی شل زیر فرش صدای توخالی می‌دهد.',
    level3: 'روی تخته شل کف اتاق میرزا صفدر کلیک کن تا دفترچه جلد چرمی پنهان با صفحات سفید آهارمهره را برداری.'
  },
  // 6. Act 2: Market & Paper shop - Gathering shading materials and listening to bells
  {
    condition: (state: GameState) => (state.act === 2 || state.storyFlags['act2_started']) && !state.inventory.includes('shading_kit'),
    level1: 'کاغذ آهارمهره را با زغال معمولی نمی‌شود خواند؛ دوده لطیف بید می‌خواهد و موی شتر. بازارچه را زیر پا بگذار.',
    level2: 'به بازارچه سرپوشیده برو؛ قاسم زنگوله‌ساز را پیدا کن و به صدای زنگوله‌های تقلبی‌اش گوش بده. سپس وارد دکان کاغذفروشی صادق شو.',
    level3: 'در دکان کاغذفروشی با صادق صحبت کن، جعبه دوده بید و قلم‌موی موی شتر را بگیر و در اینونتوری این دو را با هم ترکیب کن تا «کیت سایه‌زنی» ساخته شود.'
  },
  // 7. Act 2: Revealing the Act 2 ledger with the shading kit
  {
    condition: (state: GameState) => (state.act === 2 || state.storyFlags['act2_started']) && !state.puzzleFlags['act2_ledger_revealed'],
    level1: 'ابزار آماده است. حالا وقت سایه‌زدن بر شیارهای سفید کاغذ شاهانه میرزاست.',
    level2: 'کیت سایه‌زنی را روی دفترچه سفید آهارمهره استفاده کن، یا در اینونتوری دفترچه را Inspect کن و گزینه سایه‌زنی را بزن.',
    level3: '«کیت سایه‌زنی دوده بید» را با «دفترچه جلد چرمی با صفحات سفید» ترکیب کن تا نام یعقوب رمال و رمز هفت صندوق آشکار شود.'
  },
  // 8. Act 2: Confronting Yaqub and searching the courtyard
  {
    condition: (state: GameState) => (state.act === 2 || state.storyFlags['act2_started']) && !state.evidence['ev_qanat_secret_path'],
    level1: 'یعقوب رمال خیال کرده با فال نخود و آیینه می‌شود بوی توطئه را پنهان کرد. حیاط خانه‌اش را وارسی کن.',
    level2: 'به خانه یعقوب برو. با یعقوب و مه‌بانو گفتگو کن و تناقض صدای زنگوله یا کاغذ آهارمهره را به رخ او بکش. سپس حیاط خلوت یعقوب را بگرد.',
    level3: 'در حیاط خلوت یعقوب، چاه کهنه آب و لانه کبوترها را بررسی کن تا بفهمی راه مخفی به مظهر قنات متروکه می‌رسد.'
  },
  // 9. Act 2 Climax: Investigating the Qanat Entrance
  {
    condition: (state: GameState) => (state.act === 2 || state.storyFlags['act2_started']) && !state.puzzleFlags['act2_qanat_unlocked'],
    level1: 'باد در دهانه قنات زوزه می‌کشد. سنگ‌بند قنات آخرین مهر و موم راز شتران سرخ است.',
    level2: 'به مظهر قنات متروکه برو. روزنهٔ سنگی، رد فرغون‌ها و خاک تلمبارشده قنات را به دقت بررسی کن.',
    level3: 'انگشتر برنجی یا چراغ‌موشی را بر روزنه سنگی قنات به کار ببر تا پلاک مسین ضرابخانه را بیابی و ثابت کنی صندوق‌ها از همان ابتدا خالی بودند!'
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
