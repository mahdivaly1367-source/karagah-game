import { Item } from '../types/game';

export const GAME_ITEMS: Record<string, Item> = {
  coin_hole: {
    id: 'coin_hole',
    name: 'سکه سوراخ‌شده',
    description: 'یک سکه نقره قدیمی که با درفش یا مته سوراخی تمیز در لبه‌اش ایجاد شده است.',
    inspectText: 'سوراخ سکه کهنه نیست؛ برق فلز تازه است. کسی آن را به قصد نشانه‌گذاری یا آویختن سوراخ کرده، نه برای نذر و طالع‌بینی.',
    icon: 'Coins',
    isEvidence: true,
  },
  red_thread: {
    id: 'red_thread',
    name: 'نخ قرمز ابریشمی',
    description: 'رشته‌ای از نخ کلفت ابریشمی سرخ‌رنگ، پیچیده شده به لبه میخ پنجره.',
    inspectText: 'نخ قرمز از جنس ابریشم اعلاست. در این بیابان خاکی، کاروان‌سالاران معمولی چنین لباسی نمی‌پوشند.',
    icon: 'Scissors',
    canCombineWith: 'torn_cloth',
    combinedResultId: 'cloth_with_thread',
  },
  torn_cloth: {
    id: 'torn_cloth',
    name: 'تکه پارچه پاره‌شده',
    description: 'تکه‌ای از قبای تیره که لبه‌اش پاره شده و تار و پودش باز شده است.',
    inspectText: 'این پارچه به گوشه تیز لبه پنجره یا صندوق گیر کرده و کنده شده. رنگ سرخ لبه‌اش شبیه به تار نخ ابریشمی است.',
    icon: 'Layers',
    canCombineWith: 'red_thread',
    combinedResultId: 'cloth_with_thread',
  },
  cloth_with_thread: {
    id: 'cloth_with_thread',
    name: 'پارچه متصل به نخ قرمز',
    description: 'تکه پارچه و نخ قرمز ابریشمی که با هم مطابقت کامل دارند.',
    inspectText: 'تار نخ قرمز دقیقاً با لبه پاره پارچه جور در می‌آید. شکی نیست که موقع فرار یا کشیده شدن جسد از لبه پنجره کنده شده است.',
    icon: 'FileCheck',
    isEvidence: true,
  },
  account_ledger: {
    id: 'account_ledger',
    name: 'دفتر حساب میرزا صفدر',
    description: 'دفتر ضخیم جلد چرمی با صفحات زرد کاهی. در نگاه اول صفحات اخیر آن سفید و خالی است.',
    inspectText: 'دفتر حساب میرزا صفدر. صفحاتی از آن به شکلی مشکوک با تیغ پاک شده، اما هنوز رد فشار قلم روی کاغذ مانده است.',
    icon: 'BookOpen',
    isEvidence: true,
  },
  charcoal_stick: {
    id: 'charcoal_stick',
    name: 'تکه زغال نیم‌سوز',
    description: 'یک تکه زغال از گوشه اجاق خاموش اتاق. برای سایه‌زدن و خواندن خطوط فرورفته به کار می‌آید.',
    inspectText: 'زغال چوب خشکیده. خانخله بلد است چطور با کشیدن زغال روی کاغذ، رد فرورفته قلم‌های نامرئی را آشکار کند.',
    icon: 'Flame',
    canCombineWith: 'account_ledger',
    combinedResultId: 'revealed_ledger',
  },
  revealed_ledger: {
    id: 'revealed_ledger',
    name: 'دفتر حساب رمزگشایی‌شده',
    description: 'رد مخفی قلم با مالیدن زغال بر صفحه آشکار شده است: «۷ صندوق»',
    inspectText: 'خط فرورفته قلم میرزا زیر گرد زغال خوانا شد: «۷ صندوق - کاروان سرخ». این همان رازی است که به خاطرش ناپدید شد!',
    icon: 'Sparkles',
    isEvidence: true,
  }
};
