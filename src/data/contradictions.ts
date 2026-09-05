/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Contradiction } from '../types/deduction';

export const GAME_CONTRADICTIONS: Record<string, Contradiction> = {
  // Contradiction 1: Haj Morteza's Alibi vs Courtyard Red Mud
  contra_morteza_alibi: {
    id: 'contra_morteza_alibi',
    act: 1,
    name: 'تناقض ادعای حضور حاج مرتضی',
    statementA: {
      speaker: 'حاج مرتضی',
      speakerTitle: 'تاجر شال',
      text: 'من دیشب در قلعه‌بالا بیتوته کرده بودم و سحرگاه با کاروان رسیدم. روحم هم از ماجرای میرزا خبر ندارد.',
      sourceContext: 'گفتگو با حاج مرتضی در اصطبل',
      sourceNodeId: 'morteza_alibi',
    },
    statementB: {
      title: 'خاک سرخ چسبنده',
      text: 'خاک رس قرمز مرطوب تنها در حاشیه حوضچه نشت‌کرده این کاروانسرا وجود دارد و نمونه خشک‌شده آن به وضوح بر پاشنه چکمه‌های حاج مرتضی نقش بسته است.',
      sourceContext: 'بررسی فیزیکی حوضچه و چکمه‌ها',
      sourceEvidenceId: 'ev_morteza_boots',
    },
    contradictionDescription: 'حاج مرتضی ادعا می‌کند دیشب فرسنگ‌ها دورتر بوده، اما چکمه‌هایش ثابت می‌کنند دیشب در حیاط همین کاروانسرا قدم می‌زده است.',
    requiredEvidenceIds: ['ev_morteza_boots'],
    isAvailable: (state) => !!state.evidence['ev_morteza_boots'],
    isResolved: (state) => !!state.dialogueFlags['morteza_mud_confronted'],
    resolution: {
      flagsToSet: {
        morteza_mud_confronted: true,
        morteza_contradiction_exposed: true,
      },
      reactionText: 'رنگ از چهره حاج مرتضی پرید! تسبیح شاه‌مقصود میان انگشتانش خشک شد و لرزشی خفیف در صدایش پدیدار گشت.',
      subtext: 'خانخله: «پای حاج‌آقا توی گِل حیاط گیر کرده، ولی زبونش از زهد و قلعه‌بالا می‌گه!»',
      journalEntry: {
        id: 'journal_contra_morteza',
        category: 'people',
        title: 'اثبات دروغ حاج مرتضی',
        content: 'دروغ حاج مرتضی با سرنخ گِل سرخ حیاط برملا شد. او دیشب در کاروانسرا حضور داشته و پنهانی با میرزا ملاقات کرده است.',
        timestamp: 'لحظاتی پیش',
      },
      relationshipDelta: {
        characterId: 'morteza',
        delta: -2,
      },
    },
  },

  // Contradiction 2: Fake Wall Writing vs Master Calligraphy
  contra_wall_writing: {
    id: 'contra_wall_writing',
    act: 1,
    name: 'تناقض دست‌خط و پیام دیوار',
    statementA: {
      speaker: 'نوشته روی دیوار',
      text: '«حساب، خودش را پس میگیرد» نوشته‌شده با زغال درشت و قلمی بی‌مهارت.',
      sourceContext: 'دیوار گلی اتاق میرزا صفدر',
    },
    statementB: {
      title: 'ویژگی قلم و سوابق میرزا',
      text: 'میرزا صفدر سال‌ها کاتب دیوان بوده و حتی لیست خرید مایحتاج روزمره را با خط تعلیق بی‌نقص می‌نوشته است.',
      sourceContext: 'بررسی دفتر حساب و شهادت کربلایی',
    },
    contradictionDescription: 'نوشته تهدیدآمیز دیوار نمی‌تواند کار میرزا یا طلبکار دیوانی باشد؛ صحنه‌سازی ناشیانه‌ای برای انداختن تقصیر به گردن دزدان و دشمنان است.',
    requiredEvidenceIds: ['ev_fake_writing'],
    isAvailable: (state) => !!state.evidence['ev_fake_writing'],
    isResolved: (state) => !!state.storyFlags['fake_writing_exposed'],
    resolution: {
      flagsToSet: {
        fake_writing_exposed: true,
      },
      reactionText: 'خانخله متوجه شد این دست‌خط یک صحنه‌سازی جعلی است تا همه فکر کنند قتلی کینه‌توزانه رخ داده است.',
      subtext: 'خانخله: «هر کس این رو نوشته، دستش مثل پای شتر می‌لرزیده!»',
      journalEntry: {
        id: 'journal_contra_wall',
        category: 'evidence',
        title: 'کشف صحنه‌سازی روی دیوار',
        content: 'نوشته زغالی دیوار اتاق برای فریب مفتش و مردم محلی نوشته شده است.',
        timestamp: 'لحظاتی پیش',
      },
    },
  },

  // Contradiction 3: Khan-Kholeh's Misjudgment (Bandits vs Silk Thread & Untouched Money)
  contra_khan_bandit_theory: {
    id: 'contra_khan_bandit_theory',
    act: 1,
    name: 'تناقض فرضیه راهزنان بیابان با الیاف حریر',
    statementA: {
      speaker: 'فرضیه شتاب‌زده خانخله',
      text: 'راهزنان کویر ریگستان به اتاق شبیخون زده و میرزا را برای باج‌گیری به کویر برده‌اند!',
      sourceContext: 'برداشت اولیه خانخله در اتاق میرزا',
    },
    statementB: {
      title: 'شواهد مادی درون اتاق',
      text: 'فنجان چای دست‌نخورده، سکه‌های نقره در صندوقچه باقی‌مانده، و تکه پارچه ابریشم سرخ شهری به جا مانده است.',
      sourceContext: 'سرنخ‌های میز، صندوق و لبه پنجره',
    },
    contradictionDescription: 'راهزن کویر فقیر و غارتگر است، نه حریر سرخ گران‌قیمت می‌پوشد و نه سکه نقره را در صندوق باقی می‌گذارد.',
    requiredEvidenceIds: ['ev_red_thread_cloth', 'ev_cold_tea'],
    isAvailable: (state) => !!state.evidence['ev_red_thread_cloth'] && !!state.evidence['ev_cold_tea'],
    isResolved: (state) => !!state.storyFlags['khan_misjudgment_corrected'],
    resolution: {
      flagsToSet: {
        khan_misjudgment_corrected: true,
      },
      reactionText: 'خانخله با تلخ‌کامی و تمسخر اعتراف می‌کند که فرضیه راهزنانش کاملاً غلط بوده است.',
      subtext: 'خانخله: «ای دل غافل! راهزنِ بیابان کجا و حریر سرخ اعلا کجا؟! حدسم کشک بود... کار، کارِ همین مارمولک‌های درباریه!»',
      journalEntry: {
        id: 'journal_contra_khan_theory',
        category: 'notes',
        title: 'تصحیح اشتباه خانخله: توطئه داخلی، نه حمله راهزنان',
        content: 'خانخله متوجه اشتباه محاسباتی خود شد؛ دزد یا فراری از اعیان شهر و کاروانسراست نه راهزنان گرسنه بیابان.',
        timestamp: 'لحظاتی پیش',
      },
    },
  },

  // Act 2 Contradictions
  // Contradiction 4: Yaqub's 20-Camel Caravan Bells vs Soft Sand & Tin Clapper
  contra_yaqub_bells_vs_tracks: {
    id: 'contra_yaqub_bells_vs_tracks',
    act: 2,
    name: 'تناقض نوای بیست شتر یعقوب با ریگزار بی‌ردپا',
    statementA: {
      speaker: 'یعقوب نابینا',
      speakerTitle: 'پیر دیر آبادی',
      text: 'من با همین گوش‌هایم زنگوله بیست نفر شتر قوی‌هیکل را در دل نیمه‌شب شنیدم که به سوی قنات بار می‌بردند.',
      sourceContext: 'گفتگو با یعقوب در خانه‌اش',
      sourceEvidenceId: 'ev_act2_yaqub_bell_testimony',
    },
    statementB: {
      title: 'ریگزار دست‌نخورده و زنگوله با زبانه آهنی لق',
      text: 'کوچه بن‌بست هیچ جای پای عمیقی از شتران ندارد و زنگوله سبک حلبی کشف‌شده با زبانه لق صدایی مقطع و ساختگی تولید می‌کرده است.',
      sourceContext: 'شواهد فیزیکی کوچه و حیاط یعقوب',
      sourceEvidenceId: 'ev_act2_iron_clapper_sound',
    },
    contradictionDescription: 'یعقوب فریب یک صحنه‌سازی صوتی را خورده است؛ هیچ کاروان شتری در کار نبوده و کسی با یک زنگوله معیوب صدای کاروان را جعل کرده بود.',
    requiredEvidenceIds: ['ev_act2_yaqub_bell_testimony', 'ev_act2_iron_clapper_sound'],
    isAvailable: (state) => !!state.evidence['ev_act2_yaqub_bell_testimony'] && !!state.evidence['ev_act2_iron_clapper_sound'],
    isResolved: (state) => !!state.dialogueFlags['yaqub_sound_puzzle_solved'],
    resolution: {
      flagsToSet: {
        yaqub_sound_puzzle_solved: true,
        yaqub_contradiction_exposed: true,
      },
      reactionText: 'یعقوب سرش را با بهت تکان داد: «وای بر گوش‌های من! پس صدای شتر نبود... صدای ارتعاش زبانه حلبی روی نمد بود!»',
      subtext: 'خانخله: «گوش تو عیبی نداره پیرمرد؛ دزدها فقط زرنگ‌تر از گوش‌های تو بودن و برات خیمه‌شب‌بازی راه انداختن!»',
      journalEntry: {
        id: 'journal_contra_yaqub',
        category: 'notes',
        title: 'برملا شدن فریب صوتی کاروان',
        content: 'صدای بیست شتر در کوچه قنات یک جعل صوتی بوده تا توجه همه به مسیر غلط جلب شود.',
        timestamp: 'پرده دوم',
      },
      relationshipDelta: {
        characterId: 'yaqub',
        delta: 3,
      },
    },
  },

  // Contradiction 5: Qasem's Superstition vs Imperial Mint Token
  contra_qasem_ghouls_vs_manifest: {
    id: 'contra_qasem_ghouls_vs_manifest',
    act: 2,
    name: 'تناقض افسانه جن‌های ریگستان با پلاک ضرابخانه',
    statementA: {
      speaker: 'مشهدی قاسم',
      speakerTitle: 'بقال و رمال بازار',
      text: 'صندوق‌های میرزا رو غول ریگستان و ارواح طلسم‌شده بیابون بلعیدن! پای هر کی به قنات برسه خاکستر میشه!',
      sourceContext: 'لاف‌زنی‌های قاسم در بازارچه',
      sourceEvidenceId: 'ev_act2_qasem_ghoul_hoax',
    },
    statementB: {
      title: 'پلاک مسین رسمی «خزانهٔ باد»',
      text: 'پلاک مهرشده کشف‌شده در دهانه قنات نشان رسمی ضرابخانه و دربار دارد و پای حساب‌های کلان دولتی را به میان می‌کشد.',
      sourceContext: 'دهانه قنات متروک',
      sourceEvidenceId: 'ev_act2_copper_token_cipher',
    },
    contradictionDescription: 'خرافات قاسم تنها پوششی برای ترساندن مردم و پنهان کردن زد و بندهای فاسد اداری و تجاری با دربار بوده است.',
    requiredEvidenceIds: ['ev_act2_qasem_ghoul_hoax', 'ev_act2_copper_token_cipher'],
    isAvailable: (state) => !!state.evidence['ev_act2_qasem_ghoul_hoax'] && !!state.evidence['ev_act2_copper_token_cipher'],
    isResolved: (state) => !!state.storyFlags['qasem_hoax_exposed'],
    resolution: {
      flagsToSet: {
        qasem_hoax_exposed: true,
      },
      reactionText: 'مشهدی قاسم عرق پیشانی‌اش را با گوشه شال پاک کرد و لکنت‌زنان عقب کشید.',
      subtext: 'خانخله: «دیو و غول قاسم، سکه‌های ضرابخونه پایتخت رو ضرب نمی‌کنن! بگو ببینم کی بهت پول داده بود این چرندیات رو جار بزنی؟»',
      journalEntry: {
        id: 'journal_contra_qasem',
        category: 'people',
        title: 'اعتراف مشهدی قاسم',
        content: 'قاسم مأمور پخش شایعات برای منصرف کردن مردم از سرک کشیدن به قنات بوده است.',
        timestamp: 'پرده دوم',
      },
    },
  },

  // Contradiction 6: Paper Durability vs Lost Writing
  contra_sadiq_paper_vs_erasure: {
    id: 'contra_sadiq_paper_vs_erasure',
    act: 2,
    name: 'تناقض نابودی همیشگی با راز کاغذ آهارمهره',
    statementA: {
      speaker: 'تصور ظاهری مفتش',
      text: 'صفحات دفتر میرزا با تیغ بریده شده و جوهر بقیه پاک شده؛ دیگر هیچ امیدی به خواندن اسناد نیست.',
      sourceContext: 'بررسی برگه‌های سفید دفترچه',
      sourceEvidenceId: 'ev_act2_razor_cut_pages',
    },
    statementB: {
      title: 'فناوری کاغذسازی اوستا صادق',
      text: 'کاغذ آهارمهره اصفهان دارای لعاب محکم نشاسته است و فشار قلم‌نی سنگین میرزا، شیاری عمیق در لایه‌های زیرین حک کرده است.',
      sourceContext: 'توضیحات کارشناسی اوستا صادق در دکان',
      sourceEvidenceId: 'ev_act2_paper_grain_sadiq',
    },
    contradictionDescription: 'پاک‌کننده ناشی دفتر نمی‌دانسته که قلم سنگین میرزا بر بافت ضخیم آهارمهره اثری همیشگی بر جا می‌گذارد که با سایه‌زنی دوده قابل احیاست.',
    requiredEvidenceIds: ['ev_act2_razor_cut_pages', 'ev_act2_paper_grain_sadiq'],
    isAvailable: (state) => !!state.evidence['ev_act2_razor_cut_pages'] && !!state.evidence['ev_act2_paper_grain_sadiq'],
    isResolved: (state) => !!state.puzzleFlags['paper_technique_understood'],
    resolution: {
      flagsToSet: {
        paper_technique_understood: true,
      },
      reactionText: 'برق امید در چشمان خانخله درخشید: «جوهر مرده، اما استخوان کلمات زیر پوست این کاغذ هنوز نفس می‌کشه!»',
      subtext: 'خانخله: «حالا فقط گرد دوده بید می‌خوایم و قلم‌موی موی شتر تا دهن این کاغذ بسته رو باز کنیم.»',
      journalEntry: {
        id: 'journal_contra_paper',
        category: 'evidence',
        title: 'کلید احیای دفتر خالی میرزا',
        content: 'فناوری ساخت کاغذ آهارمهره ثابت کرد نوشته‌های بریده‌شده میرزا با سایه‌زنی گرد دوده کاملاً قابل بازیابی است.',
        timestamp: 'پرده دوم',
      },
    },
  },
};
