/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnyPuzzle, ItemCombinationPuzzle, ObjectInteractionPuzzle } from '../types/puzzle';

export const GAME_PUZZLES: Record<string, AnyPuzzle> = {
  // Puzzle 1: Combining the red silk thread with torn cloth
  puzzle_combine_cloth_thread: {
    id: 'puzzle_combine_cloth_thread',
    name: 'تطبیق تار و پود ابریشم سرخ',
    type: 'item_combination',
    act: 1,
    description: 'ترکیب نخ قرمز گیرکرده به میخ پنجره با تکه پارچه پاره‌شده صندوقچه برای اثبات فرار از پنجره.',
    itemA: 'red_thread',
    itemB: 'torn_cloth',
    resultItemId: 'cloth_with_thread',
    consumedItems: ['red_thread', 'torn_cloth'],
    successNotice: 'معما حل شد: اثبات گریز از پنجره با نخ قرمز!',
    evidenceToUnlock: 'ev_red_thread_cloth',
    flagsToSet: {
      window_puzzle_solved: true,
      red_thread_matched: true,
    },
    inspectModal: {
      title: 'ترکیب موفقیت‌آمیز اشیاء!',
      description: 'تکه پارچه و نخ قرمز ابریشمی با هم چفت شدند. لبه پاره پارچه دقیقاً تار و پود همان نخ ابریشمی اعلا را دارد.',
      subtext: 'خانخله: «پس یا دیوار از پارچه خوشش میاد... یا یکی از همین‌جا رد شده و خلعتی گرون‌قیمتش به میخ گیر کرده.»',
    },
    isSolved: (state) => !!state.puzzleFlags['window_puzzle_solved'],
  } as ItemCombinationPuzzle,

  // Puzzle 2: Object interaction - matching thread or cloth with the window nail
  puzzle_window_nail_match: {
    id: 'puzzle_window_nail_match',
    name: 'تطبیق سرنخ با لبه پنجره',
    type: 'object_interaction',
    act: 1,
    description: 'استفاده از نخ یا پارچه متصل برای مطابقت با لبه پنجره چوبی اتاق میرزا.',
    targetObjectId: 'obj_window',
    requiredItemId: 'cloth_with_thread',
    successNotice: 'تطبیق سرنخ با لبه پنجره با موفقیت ثبت شد.',
    evidenceToUnlock: 'ev_red_thread_cloth',
    flagsToSet: {
      window_puzzle_solved: true,
    },
    inspectModal: {
      title: 'تطبیق سرنخ با لبه پنجره',
      description: 'لبه پاره پارچه و نخ سرخ دقیقاً با میخ چهارچوب پنجره چفت می‌شود. رد پای بیرون پنجره هم نشان می‌دهد شخصی با شتاب به کوچه پشتی پریده است.',
      subtext: 'خانخله: «پس یا دیوار از پارچه خوشش میاد... یا یکی از همین‌جا رد شده.»',
    },
    isSolved: (state) => !!state.puzzleFlags['window_puzzle_solved'],
  } as ObjectInteractionPuzzle,

  // Puzzle 3: Revealing the blank ledger using charcoal
  puzzle_reveal_ledger: {
    id: 'puzzle_reveal_ledger',
    name: 'آشکارسازی خطوط فرورفته دفتر حساب',
    type: 'item_combination',
    act: 1,
    description: 'سایه‌زدن با تکه زغال نیم‌سوز بر صفحات ظاهراً سفید دفتر حساب میرزا برای خواندن رد قلم.',
    itemA: 'charcoal_stick',
    itemB: 'account_ledger',
    resultItemId: 'revealed_ledger',
    consumedItems: ['account_ledger'],
    successNotice: 'راز دفتر حساب فاش شد: ۷ صندوق - کاروان سرخ!',
    flagsToSet: {
      ledger_revealed: true,
    },
    inspectModal: {
      title: 'دفتر حساب رمزگشایی شد!',
      description: 'با کشیدن زغال روی کاغذ زرد کاهی، شیارهای فرورفته قلم میرزا مثل ستاره در شب درخشیدند: «۷ صندوق - کاروان سرخ - تحویل به...»',
      subtext: 'خانخله: «میرزای خدا بیامرز! فکر کردی زرنگی، ولی زغال از جوهر هم رسواتره!»',
    },
    triggerSceneTransition: 'act1_outro',
    isSolved: (state) => !!state.puzzleFlags['ledger_revealed'],
  } as ItemCombinationPuzzle,

  // ========================================================
  // ACT 2 PUZZLES
  // ========================================================

  // Puzzle Act 2-1: Combine willow charcoal dust and camel hair brush
  puzzle_act2_combine_shading_kit: {
    id: 'puzzle_act2_combine_shading_kit',
    name: 'ساخت کیت سایه‌زنی صحافی',
    type: 'item_combination',
    act: 2,
    description: 'ترکیب گرد دوده بید و قلم‌موی موی شتر برای ایجاد ابزار حرفه‌ای سایه‌زدن بدون تخریب الیاف کاغذ.',
    itemA: 'charcoal_powder_sadiq',
    itemB: 'camel_hair_brush',
    resultItemId: 'shading_kit',
    consumedItems: ['charcoal_powder_sadiq', 'camel_hair_brush'],
    successNotice: 'کیت تخصصی سایه‌زنی ساخته شد!',
    flagsToSet: {
      shading_kit_crafted: true,
    },
    inspectModal: {
      title: 'کیت تخصصی سایه‌زنی و بازخوانی اسناد',
      description: 'قلم‌موی موی شتر با گرد نرم دوده بید آغشته شد. این ابزار دقیقاً برای برجسته‌سازی شیارهای ناشی از فشار قلم بر کاغذ آهارمهره مناسب است.',
      subtext: 'خانخله: «حالا بیا ببینیم میرزا روی اون کاغذهای سفید چی حک کرده که ترسیدن و بریدنش!»',
    },
    isSolved: (state) => !!state.puzzleFlags['shading_kit_crafted'],
  } as ItemCombinationPuzzle,

  // Puzzle Act 2-2: Reveal the indentations on Mirza's Act 2 ledger
  puzzle_act2_reveal_ledger: {
    id: 'puzzle_act2_reveal_ledger',
    name: 'رمزگشایی شیارهای دفتر خالی میرزا',
    type: 'item_combination',
    act: 2,
    description: 'سایه‌زدن آرام با کیت دوده و موی شتر روی صفحات سفید دفترچه میرزا برای خواندن متن فشار قلم.',
    itemA: 'shading_kit',
    itemB: 'ledger_act2_raw',
    resultItemId: 'reconstructed_ledger_act2',
    consumedItems: ['ledger_act2_raw'],
    successNotice: 'حقیقت تکان‌دهنده آشکار شد: صندوق‌ها از ابتدا خالی بودند!',
    evidenceToUnlock: 'ev_act2_empty_chests_revelation',
    flagsToSet: {
      empty_ledger_act2_solved: true,
      act2_ledger_unveiled: true,
    },
    inspectModal: {
      title: 'افشای دست‌نوشته پنهان میرزا صفدر!',
      description: 'با سایه ملایم دوده بید، رد عمیق قلم‌نی میرزا بر بافت آهارمهره کلمه به کلمه جان گرفت:\n\n«صندوق‌ها تهی بودند. هیچ طلایی در کاروانسرا تخلیه نشد. هفت صندوق را با شمش‌های سربی و ماسه سنگین کرده بودند تا وزن خزانه را جعل کنند. شتران کاروان سرخ به سمت قنات نرفتند؛ پیش از بارگیری شبانه محموله اصلی به کاروانسرای متروک دیگری برده شده بود... پلاک مسین خزانهٔ باد را در دهانه قنات انداختند تا شایعه غارت بسازند.»',
      subtext: 'خانخله: «یا شاه چراغ! صندوق‌ها خالی بودن! دزدی در کار نبوده، این یک صحنه‌سازی شیطانی برای سرپوش گذاشتن روی غارت قبل از ورود به کاروانسرا بوده!»',
    },
    isSolved: (state) => !!state.puzzleFlags['empty_ledger_act2_solved'],
  } as ItemCombinationPuzzle,

  // Puzzle Act 2-3: Object interaction shortcut: shading kit on desk ledger
  puzzle_act2_use_shading_on_desk: {
    id: 'puzzle_act2_use_shading_on_desk',
    name: 'سایه‌زنی دفترچه روی میز میرزا',
    type: 'object_interaction',
    act: 2,
    description: 'استفاده از کیت دوده و قلم‌مو روی دفترچه میرزا.',
    targetObjectId: 'obj_act2_desk_ledger',
    requiredItemId: 'shading_kit',
    successNotice: 'شیارهای عمیق دفترچه روی میز سایه زده و آشکار شد!',
    evidenceToUnlock: 'ev_act2_empty_chests_revelation',
    flagsToSet: {
      empty_ledger_act2_solved: true,
      act2_ledger_unveiled: true,
    },
    inspectModal: {
      title: 'افشای دست‌نوشته پنهان میرزا صفدر!',
      description: 'با مالش دوده، نوشته‌های فرورفته میرزا آشکار شدند: صندوق‌ها حاوی سرب و ماسه بوده‌اند و کاروان شتران سرخ ساختگی بوده است!',
      subtext: 'خانخله: «میرزا صفدر با جانش تاوان کشف این دروغ بزرگ رو داد... صندوق‌ها از اول تهی بودن!»',
    },
    isSolved: (state) => !!state.puzzleFlags['empty_ledger_act2_solved'],
  } as ObjectInteractionPuzzle,

  // Puzzle Act 2-4: Confront Yaqub with the fake iron bell
  puzzle_act2_confront_yaqub_bell: {
    id: 'puzzle_act2_confront_yaqub_bell',
    name: 'اثبات تناقض صوتی به یعقوب',
    type: 'object_interaction',
    act: 2,
    description: 'به صدا درآوردن زنگوله حلبی لق در حضور یعقوب برای اثبات فریب صوتی.',
    targetObjectId: 'npc_yaqub_dwelling',
    requiredItemId: 'iron_clapper_bell',
    successNotice: 'پرده از فریب گوش‌های یعقوب برداشته شد!',
    evidenceToUnlock: 'ev_act2_iron_clapper_sound',
    flagsToSet: {
      yaqub_sound_puzzle_solved: true,
    },
    inspectModal: {
      title: 'فروپاشی توهم کاروان شتران!',
      description: 'خانخله زنگوله حلبی لق را در هوا تکان داد: تق‌تق... تق‌تق...\nیعقوب از جا پرید: «این صدا... خدای من! این صدای همون شترهایی بود که دیشب شنیدم! صدای تکان دادن یک زنگوله حلبی بی‌ارزش در باد، نه طنین ۲۸ زنگ برنجی کاروان زرین!»',
      subtext: 'خانخله: «چشمات بی‌گناهه عمو یعقوب، ولی گوش‌هات رو با این حلبی بازی دادن تا شاهد دروغین بسازن!»',
    },
    isSolved: (state) => !!state.puzzleFlags['yaqub_sound_puzzle_solved'],
  } as ObjectInteractionPuzzle,

  // Puzzle Act 2-5: False lead - Lemon Juice on Oil Lamp
  puzzle_act2_false_lemon: {
    id: 'puzzle_act2_false_lemon',
    name: 'آزمایش ناموفق جوهر نامرئی با آب‌لیمو',
    type: 'object_interaction',
    act: 2,
    description: 'تست فرضیه آب‌لیمو و حرارت روی چراغ‌موشی.',
    targetObjectId: 'obj_act2_oil_lamp',
    requiredItemId: 'lemon_juice_bottle',
    successNotice: 'آزمایش ناموفق: کاغذ فقط سوخت و بوی ترشی گرفت!',
    evidenceToUnlock: 'ev_act2_false_lemon_burn',
    flagsToSet: {
      lemon_hypothesis_tested: true,
    },
    inspectModal: {
      title: 'آزمایش ناموفق آب‌لیمو روی حرارت',
      description: 'حرارت چراغ‌موشی تنها باعث زردی و سوختگی سطحی آهار نشاسته شد. هیچ نوشته پنهانی با آب‌لیمو وجود ندارد؛ میرزا نه اهل جادو بود و نه جوهر نامرئی!',
      subtext: 'خانخله: «مشهدی قاسم هرچی تو قهوه‌خونه شنیده بلغور می‌کنه! این کاغذ شیار فیزیکی داره، جوهر گیاهی کجای ماجراست؟»',
    },
    isSolved: (state) => !!state.puzzleFlags['lemon_hypothesis_tested'],
  } as ObjectInteractionPuzzle,

  // Act 3 Puzzles
  // 1. Winch repair under bridge
  puzzle_act3_winch_repair: {
    id: 'puzzle_act3_winch_repair',
    name: 'راه‌اندازی وینچ و کابل پایه‌های پل',
    type: 'object_interaction',
    act: 3,
    description: 'جایگذاری دسته آهنی چدنی در محور وینچ زیر پل و بیرون کشیدن کابل‌های معلق در آب.',
    targetObjectId: 'obj_underbridge_winch',
    requiredItemId: 'winch_crank_handle',
    successNotice: 'وینچ زیر پل به چرخش درآمد و کابل‌های فولادی بالا کشیده شدند!',
    evidenceToUnlock: 'ev_act3_underbridge_wire_cable',
    flagsToSet: {
      winch_repaired: true,
      underbridge_mechanism_revealed: true,
    },
    inspectModal: {
      title: 'بیرون کشیدن شبکه گیرنده پنهان زیر آب',
      description: 'دسته چدنی جا افتاد و با چرخش چرخ‌دنده‌ها، رشته‌ای از کابل‌های قطور فولادی و یک سبد توری سنگین سیمی از دل گرداب رودخانه بالا آمد. تکه‌های سیم پاره‌شده نشان می‌دهد که یکی از محموله‌ها زیر فشار آب کابل را دریده و گریخته است!',
      subtext: 'خانخله: «این تور صید نهنگه نه قزل‌آلا! زیر پایه‌های پل ایستگاه بارگیری سرّی ساخته بودن!»',
    },
    isSolved: (state) => !!state.puzzleFlags['winch_repaired'],
  } as ObjectInteractionPuzzle,

  // 2. Open the zinc fish cylinder with the fisherman's knife
  puzzle_act3_knife_open_cylinder: {
    id: 'puzzle_act3_knife_open_cylinder',
    name: 'برش موم و گشودن استوانه فلزی ماهی',
    type: 'item_combination',
    act: 3,
    description: 'استفاده از کارد تیز استخوانی صیادی برای تراشیدن موم سرخ سلطنتی و باز کردن درپوش پیچی استوانه.',
    itemA: 'zinc_fish_cylinder',
    itemB: 'fisherman_knife',
    resultItemId: 'opened_fish_cylinder',
    consumedItems: ['zinc_fish_cylinder'],
    successNotice: 'استوانه رویین باز شد و طومار محرمانه دیوان آشکار گردید!',
    evidenceToUnlock: 'ev_act3_oilskin_scroll_content',
    flagsToSet: {
      cylinder_opened: true,
      scroll_discovered: true,
    },
    inspectModal: {
      title: 'رمزگشایی بطن ماهی فلزی!',
      description: 'تیغه تیز کارد لایه ضخیم موم قرمز را کنار زد و با یک چرخش تق‌مانند، درپوش پیچی استوانه باز شد. طوماری چرمی و خشک از درون آن بیرون آمد که بر پیشانی‌اش نگاشته شده: "صورت‌جلسه محرمانه تحویل ماهیان هفت‌گانه ضرابخانه - مهر: میرزا روشن".',
      subtext: 'خانخله: «ماهی حیدر بالاخره لب باز کرد! شمش‌های زرین توی این قالب‌های فلزی در آب شناور می‌شدن!»',
    },
    isSolved: (state) => !!state.puzzleFlags['cylinder_opened'],
  } as ItemCombinationPuzzle,

  // 3. Water current plummet measurement
  puzzle_act3_water_drift_plummet: {
    id: 'puzzle_act3_water_drift_plummet',
    name: 'محاسبه خط سیر گرداب و مسیر آبراهه',
    type: 'object_interaction',
    act: 3,
    description: 'انداختن شناور شاغول‌دار در گرداب تند رودخانه برای کشف مسیر دقیق حرکت اجسام از انبار تا آسیاب.',
    targetObjectId: 'obj_river_current_whirlpool',
    requiredItemId: 'water_plummet_float',
    successNotice: 'مسیر دقیق جریان هیدرولیکی آبراهه کشف و ترسیم شد!',
    evidenceToUnlock: 'ev_act3_river_drift_calculation',
    flagsToSet: {
      river_flow_calculated: true,
    },
    inspectModal: {
      title: 'ردگیری مسیر جریان آبراهه',
      description: 'شناور شاغول‌دار در خط اصلی جریان رها شد. آب شناور را مستقیماً از ناودانی انبار بالادست به زیر طاق میانی پل کشاند، و با گذر از نقطه پارگی تور، دقیقاً به دریچه سنگ‌آسیاب ماه‌نگار اصابت کرد. همه قطعات پازل جغرافیایی جور شدند!',
      subtext: 'خانخله: «آب هیچ‌وقت دروغ نمیگه؛ اگر استوانه‌ای تو انبار به آب انداخته بشه، دقیقاً ساعت دو میرسه لای پره‌های ماه‌نگار!»',
    },
    isSolved: (state) => !!state.puzzleFlags['river_flow_calculated'],
  } as ObjectInteractionPuzzle,

  // 4. Confronting Heydar with the revealed scroll
  puzzle_act3_confront_heydar: {
    id: 'puzzle_act3_confront_heydar',
    name: 'مواجهه نهایی با حیدر بر سر طومار میرزا روشن',
    type: 'object_interaction',
    act: 3,
    description: 'ارائه طومار محرمانه و افشای نقشه ماهیان هفت‌گانه برای شکستن سکوت و ترس حیدر.',
    targetObjectId: 'npc_heydar_bridge',
    requiredItemId: 'opened_fish_cylinder',
    successNotice: 'مقاومت حیدر در هم شکست و نقشه میرزا روشن افشا شد!',
    evidenceToUnlock: 'ev_act3_heydar_fear_confession',
    flagsToSet: {
      heydar_fully_confessed: true,
      heydar_bridge_cleared: true,
    },
    inspectModal: {
      title: 'اعتراف تکان‌دهنده حیدرِ پل',
      description: 'حیدر با دیدن مهر میرزا روشن سرش را میان دست‌هایش گرفت و به گریه افتاد: «من فقط کلیددار بودم... گفتن اگر کابل رو نکشی، بچه‌هات رو سر به نیست می‌کنیم! اون شب هفتمین ماهی کابل رو برید و رفت سمت آسیاب...»',
      subtext: 'خانخله: «آسوده باش مرد، تو فقط طعمه بودی؛ سر این اژدها توی دارالخلافه نشسته و اسمش میرزا روشنه!»',
    },
    isSolved: (state) => !!state.puzzleFlags['heydar_fully_confessed'],
  } as ObjectInteractionPuzzle,
};
