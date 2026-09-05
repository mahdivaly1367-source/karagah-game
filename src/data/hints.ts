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
  // 4. Climax stage: Revealing the blank ledger
  {
    condition: (state: GameState) => !state.puzzleFlags['ledger_revealed'],
    level1: 'کاغذ سفید مثل آدم لال می‌مونه... ولی اگه درست بهش فشار بیاری، راز دلش رو پس میده.',
    level2: 'دفتر حساب میرزا صفدر در کیف شماست، اما صفحاتش به ظاهر پاک شده. گوشه اجاق خاموش اتاق میرزا یا میز کار تکه زغالی برای سایه‌زدن وجود دارد.',
    level3: 'تکه زغال را با دفتر حساب میرزا صفدر ترکیب کن (یا در منوی Inspect دفتر را زیر نور مایل قرار بده و زغال بمال) تا رد خطوط فرورفته قلم میرزا آشکار شود!'
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
    level1: 'پرونده پرده اول به اوج خودش رسیده است. حقیقت دفتر حساب را ورق بزن.',
    level2: 'دفتر حساب میرزا را بازبینی کن تا راز «۷ صندوق» آشکار گردد.',
    level3: 'با کلیک بر روی دفتر حساب کشف‌شده، پرده اول را به پایان برسان.'
  };
}
