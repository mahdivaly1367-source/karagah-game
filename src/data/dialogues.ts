import { DialogueNode } from '../types/game';

export const DIALOGUE_NODES: Record<string, DialogueNode> = {
  // -------------------------------------------------------------
  // KAZEM (کاظم)
  // -------------------------------------------------------------
  kazem_root: {
    id: 'kazem_root',
    speaker: 'کاظم',
    speakerTitle: 'پادو آبادی',
    portraitKey: 'kazem',
    text: 'خان! خدا رو شکر بیدار شدی. توی کاروانسرا آشوب به پا شده، کربلایی نعمت داره از ترس به خودش می‌پیچه!',
    options: [
      {
        id: 'opt_kazem_incident',
        text: 'دقیقاً چه اتفاقی افتاده؟ بگو ببینم چه بلایی سر میرزا اومده.',
        nextNodeId: 'kazem_incident',
      },
      {
        id: 'opt_kazem_bandit_theory',
        text: '«کاظم! نکنه کار، کارِ راهزن‌های بیابانی باشه که شبونه شبیخون زدن؟»',
        condition: (s) => !!s.storyFlags.khan_misjudgment_bandit_theory && !s.storyFlags.khan_misjudgment_corrected,
        nextNodeId: 'kazem_bandit_theory_node',
      },
      {
        id: 'opt_kazem_bandit_corrected',
        text: '«کاظم، حدس اولیه‌م درباره راهزن‌ها باد هوا بود! ابریشم سرخ کجا و راهزن پا برهنه کجا!»',
        condition: (s) => !!s.storyFlags.khan_misjudgment_corrected,
        nextNodeId: 'kazem_bandit_corrected_node',
      },
      {
        id: 'opt_kazem_safdar',
        text: 'این میرزا صفدر چه‌جور آدمی بود؟ با کسی خرده‌حسابی داشت؟',
        nextNodeId: 'kazem_safdar',
      },
      {
        id: 'opt_kazem_lastnight',
        text: 'دیشب سر و صدایی، حرکتی، رفت‌وآمد مشکوکی نشنیدی؟',
        nextNodeId: 'kazem_lastnight',
      },
      {
        id: 'opt_kazem_whereabouts',
        text: 'خودت سر شب تا صبح کجا بودی؟',
        nextNodeId: 'kazem_whereabouts',
      },
      {
        id: 'opt_kazem_evidence_menu',
        text: 'بگذار چندتا چیز بهت نشون بدم (ارائه سرنخ...)',
        nextNodeId: 'kazem_evidence_list',
      },
      {
        id: 'opt_kazem_leave',
        text: 'فعلاً برو سر کارهای مسافرخانه تا ببینم چه خاکی باید به سر کنیم.',
        nextNodeId: undefined, // close
      }
    ]
  },
  kazem_incident: {
    id: 'kazem_incident',
    speaker: 'کاظم',
    speakerTitle: 'پادو آبادی',
    portraitKey: 'kazem',
    text: 'صبح که خواستم چای تازه ببرم، در اتاقش قفل نبود اما خودش غیبش زده بود! روی دیوار با زغال نوشته بودن: «حساب، خودش را پس میگیرد». اتاقش به هم ریخته بود ولی پول‌های صندوقش رو نبردن!',
    options: [
      {
        id: 'opt_kazem_back',
        text: 'عجیبه... سوال دیگه‌ای دارم.',
        nextNodeId: 'kazem_root',
      }
    ]
  },
  kazem_safdar: {
    id: 'kazem_safdar',
    speaker: 'کاظم',
    speakerTitle: 'پادو آبادی',
    portraitKey: 'kazem',
    text: 'آدم ساکت و موذی‌ای بود خان. شب‌ها تا سحر پشت میز می‌نشست و کاغذهای کهنه رو ورق می‌زد. چند بار دیدم با حاج مرتضی پچ‌پچ می‌کردن، ولی هر وقت من نزدیک می‌شدم حرفشون رو قطع می‌کردن.',
    options: [
      {
        id: 'opt_kazem_back',
        text: 'پس پای حاج مرتضی هم وسطه... بگذریم.',
        nextNodeId: 'kazem_root',
      }
    ]
  },
  kazem_lastnight: {
    id: 'kazem_lastnight',
    speaker: 'کاظم',
    speakerTitle: 'پادو آبادی',
    portraitKey: 'kazem',
    text: 'حوالی نیمه‌شب، صدای پای اسب شنیدم از سمت کوچه پشتی. بعد صدای افتادن چیزی سنگین توی حیاط... اما کربلایی تشر زد و گفت سرم به کار خودم باشه و بخوابم.',
    options: [
      {
        id: 'opt_kazem_back',
        text: 'جالب شد. چیز دیگه‌ای می‌خواستم بپرسم.',
        nextNodeId: 'kazem_root',
      }
    ]
  },
  kazem_whereabouts: {
    id: 'kazem_whereabouts',
    speaker: 'کاظم',
    speakerTitle: 'پادو آبادی',
    portraitKey: 'kazem',
    text: 'من؟ من توی اصطبل گوشه آخور کاه خوابیده بودم. به جان مادرم راست می‌گم خان! صبح هم اول کتری رو جوش آوردم.',
    options: [
      {
        id: 'opt_kazem_back',
        text: 'باشه پسر، چشمانت دروغ نمیگن.',
        nextNodeId: 'kazem_root',
      }
    ]
  },
  kazem_evidence_list: {
    id: 'kazem_evidence_list',
    speaker: 'کاظم',
    speakerTitle: 'پادو آبادی',
    portraitKey: 'kazem',
    text: 'چیزی پیدا کردی خان؟ نشونم بده شاید بشناسم.',
    options: [
      {
        id: 'opt_kazem_show_coin',
        text: '«این سکه سوراخ‌شده رو تا حالا دیدی؟»',
        condition: (s) => s.inventory.includes('coin_hole'),
        nextNodeId: 'kazem_react_coin',
        isEvidenceOption: true,
      },
      {
        id: 'opt_kazem_show_thread',
        text: '«این نخ قرمز ابریشمی مال کیه؟»',
        condition: (s) => s.inventory.includes('red_thread') || s.inventory.includes('cloth_with_thread'),
        nextNodeId: 'kazem_react_thread',
        isEvidenceOption: true,
      },
      {
        id: 'opt_kazem_show_ledger',
        text: '«این دفتر حساب میرزا رو نگاه کن؛ چرا صفحه‌هاش سفیده؟»',
        condition: (s) => s.inventory.includes('account_ledger') || s.inventory.includes('revealed_ledger'),
        nextNodeId: 'kazem_react_ledger',
        isEvidenceOption: true,
      },
      {
        id: 'opt_kazem_back',
        text: 'ولش کن، بذار چیز دیگه‌ای بپرسم.',
        nextNodeId: 'kazem_root',
      }
    ]
  },
  kazem_react_coin: {
    id: 'kazem_react_coin',
    speaker: 'کاظم',
    speakerTitle: 'پادو آبادی',
    portraitKey: 'kazem',
    text: 'یا ائمه! این سکه... میرزا همیشه این رو به زنجیر نقره گردنش می‌بست! می‌گفت این برات نجاتشه. چطور افتاده بود زیر میزش؟',
    options: [
      {
        id: 'opt_kazem_back',
        text: 'برات نجات؟ عجب... برگردیم به صحبتمون.',
        nextNodeId: 'kazem_root',
      }
    ]
  },
  kazem_react_thread: {
    id: 'kazem_react_thread',
    speaker: 'کاظم',
    speakerTitle: 'پادو آبادی',
    portraitKey: 'kazem',
    text: 'این نخ سرخ اعلا... قاطبه آبادی از کرباس تنشونه خان. تنها کسی که شال ابریشم با این حاشیه دوزی داره حاج مرتضاست! البته خودش میگه دیشب تو آبادی نبوده.',
    options: [
      {
        id: 'opt_kazem_back',
        text: 'دقیقاً همونی بود که حدس می‌زدم. بریم سراغ بقیه حرفا.',
        nextNodeId: 'kazem_root',
      }
    ]
  },
  kazem_react_ledger: {
    id: 'kazem_react_ledger',
    speaker: 'کاظم',
    speakerTitle: 'پادو آبادی',
    portraitKey: 'kazem',
    text: 'میرزا شب و روز سر این دفتر بود و با مداد می‌نوشت. اگه خالیه، یعنی یکی نوشته‌هاش رو با چرم مالیده و پاک کرده!',
    options: [
      {
        id: 'opt_kazem_back',
        text: 'خوب گفتی پسر. اثر فشار قلم رو که نمیشه با مالیدن پاک کرد.',
        nextNodeId: 'kazem_root',
      }
    ]
  },
  kazem_bandit_theory_node: {
    id: 'kazem_bandit_theory_node',
    speaker: 'کاظم',
    speakerTitle: 'پادو آبادی',
    portraitKey: 'kazem',
    text: 'خان! راهزن کجا بود؟! سگ‌های گله اصطبل تا صبح یه بار هم واق‌واق نکردن! بعدشم راهزن اگه می‌زد، اول طویله و قاطرهای بارکش حاج مرتضی رو می‌چپاول کرد، نه اینکه بیاد تو اتاق میرزا در رو هم پشت سرش چفت کنه!',
    options: [
      {
        id: 'opt_kazem_bandit_theory_back',
        text: 'شاید هم حق با تو باشه پسر... این خط خطوط روی دیوار خیلی تمیزتر از دست زمخت راهزنه.',
        nextNodeId: 'kazem_root',
      }
    ]
  },
  kazem_bandit_corrected_node: {
    id: 'kazem_bandit_corrected_node',
    speaker: 'کاظم',
    speakerTitle: 'پادو آبادی',
    portraitKey: 'kazem',
    text: '(چشمانش برق می‌زند) دیدی گفتم خان؟! دزد همین جا زیر گوش خودمونه! کار خود آدم‌های گردن‌کلفت کاروانسرائه!',
    options: [
      {
        id: 'opt_kazem_bandit_corr_back',
        text: 'آفرین... حالا صدات رو بنداز پس کله‌ت تا دم به تله بدن.',
        nextNodeId: 'kazem_root',
      }
    ]
  },

  // -------------------------------------------------------------
  // KARBALAEI NEMAT (کربلایی نعمت)
  // -------------------------------------------------------------
  nemat_root: {
    id: 'nemat_root',
    speaker: 'کربلایی نعمت',
    speakerTitle: 'مسافرخانه‌چی',
    portraitKey: 'nemat',
    text: 'خانخله! اومدی پی غارت یا مفت‌خوری؟ مسافرخونه من جای ولگردی نیست. میرزا هم رفته که رفته، حتماً با کاروان صبح زود راهی شده!',
    options: [
      {
        id: 'opt_nemat_incident',
        text: 'چرا می‌خوای قضیه ناپدید شدنش رو ماست‌مالی کنی، کربلایی؟',
        nextNodeId: 'nemat_incident',
      },
      {
        id: 'opt_nemat_bandit_deflect',
        text: '«کربلایی! اول حدس زدم راهزن‌های بیابان ریختن، ولی الان بوی نخ ابریشم سرخ شهری میاد... دزد تو همین کاروانسرائه!»',
        condition: (s) => !!s.storyFlags.khan_misjudgment_corrected,
        nextNodeId: 'nemat_bandit_corrected_node',
      },
      {
        id: 'opt_nemat_safdar',
        text: 'میرزا صفدر این همه مدت توی اتاق ته راهرو چی کار می‌کرد؟',
        nextNodeId: 'nemat_safdar',
      },
      {
        id: 'opt_nemat_lastnight',
        text: 'دیشب سر و صدای عجیبی توی حیاط بود؛ تو بیدار نبودی؟',
        nextNodeId: 'nemat_lastnight',
      },
      {
        id: 'opt_nemat_whereabouts',
        text: 'دیشب از وقت غروب تا سحر دقیقاً کجا بودی؟',
        nextNodeId: 'nemat_whereabouts',
      },
      {
        id: 'opt_nemat_evidence_menu',
        text: 'نگاهی به این خرت و پرت‌ها بنداز شاید زبونت باز بشه (ارائه سرنخ...)',
        nextNodeId: 'nemat_evidence_list',
      },
      {
        id: 'opt_nemat_leave',
        text: 'کمتر جلز و ولز کن، میرم ببینم توی حجره‌ها چه خبره.',
        nextNodeId: undefined,
      }
    ]
  },
  nemat_incident: {
    id: 'nemat_incident',
    speaker: 'کربلایی نعمت',
    speakerTitle: 'مسافرخانه‌چی',
    portraitKey: 'nemat',
    text: 'ماست‌مالی چیه مردک؟! داروغه بیاد اینجا، در کاروانسرا رو تخته می‌کنه. میرزا خودش بی‌سر و صدا بار و بندیلش رو بست و رفت. اون خط روی دیوار هم شوخی بی‌مزه‌ست!',
    options: [
      {
        id: 'opt_nemat_back',
        text: 'شوخی؟ اون خط شبیه هر چیزی هست جز شوخی.',
        nextNodeId: 'nemat_root',
      }
    ]
  },
  nemat_safdar: {
    id: 'nemat_safdar',
    speaker: 'کربلایی نعمت',
    speakerTitle: 'مسافرخانه‌چی',
    portraitKey: 'nemat',
    text: 'اجاره‌ش رو پیش‌پیش با سکه تمیز داد. حسابدار سابق ارباب‌های یزد بود. می‌گفت اومده چند هفته استراحت کنه. به من چه که تو اتاقش چرتکه می‌انداخت؟!',
    options: [
      {
        id: 'opt_nemat_back',
        text: 'باشه، فرض می‌کنیم تو فقط پول رو می‌شناسی.',
        nextNodeId: 'nemat_root',
      }
    ]
  },
  nemat_lastnight: {
    id: 'nemat_lastnight',
    speaker: 'کربلایی نعمت',
    speakerTitle: 'مسافرخانه‌چی',
    portraitKey: 'nemat',
    text: 'من سرم سنگین بود، دمنوش بادرنجبویه خورده بودم و هفت پادشاه رو خواب می‌دیدم. هیچ صدای عجیبی نبود جز صدای باد و هوهوی بیابون.',
    options: [
      {
        id: 'opt_nemat_back',
        text: 'عجب خواب نازکی... بگذریم.',
        nextNodeId: 'nemat_root',
      }
    ]
  },
  nemat_whereabouts: {
    id: 'nemat_whereabouts',
    speaker: 'کربلایی نعمت',
    speakerTitle: 'مسافرخانه‌چی',
    portraitKey: 'nemat',
    text: 'توی حجره خودم پشت دخل بودم، بعدم رفتم بالاخانه خوابیدم. کاظم هم شاهده! بیخود واسه من پرونده‌سازی نکن خانخله، من خودم زبون داروغه رو خوب بلدم چرب کنم.',
    options: [
      {
        id: 'opt_nemat_back',
        text: 'حرص نخور کربلایی، رگ گردنت می‌زنه بیرون.',
        nextNodeId: 'nemat_root',
      }
    ]
  },
  nemat_evidence_list: {
    id: 'nemat_evidence_list',
    speaker: 'کربلایی نعمت',
    speakerTitle: 'مسافرخانه‌چی',
    portraitKey: 'nemat',
    text: 'چی رو می‌خوای بچسبونی به ریش من؟ نشون بده ببینم.',
    options: [
      {
        id: 'opt_nemat_show_writing',
        text: '«دست‌خط روی دیوار اتاق رو کی نوشته؟ خط میرزا که نیست!»',
        condition: (s) => !!s.evidence['ev_fake_writing'],
        nextNodeId: 'nemat_react_writing',
        isEvidenceOption: true,
      },
      {
        id: 'opt_nemat_show_tea',
        text: '«چرا استکان چای میرزا یخ کرده و دست نخورده؟ اون حتی وقت نوشیدن نداشته!»',
        condition: (s) => !!s.evidence['ev_cold_tea'],
        nextNodeId: 'nemat_react_tea',
        isEvidenceOption: true,
      },
      {
        id: 'opt_nemat_back',
        text: 'بی‌خیال، برگردیم سر حرفمون.',
        nextNodeId: 'nemat_root',
      }
    ]
  },
  nemat_react_writing: {
    id: 'nemat_react_writing',
    speaker: 'کربلایی نعمت',
    speakerTitle: 'مسافرخانه‌چی',
    portraitKey: 'nemat',
    text: '(رنگش می‌پرد) من چه می‌دونم خط کیه؟! شاید طلبکاراش اومدن! اصلاً برو از اون تاجر محترم، حاج مرتضی بپرس... اون از همه به میرزا نزدیک‌تر بود!',
    options: [
      {
        id: 'opt_nemat_back',
        text: 'پس پای حاج مرتضی گیره... خوب داری لو میدی.',
        nextNodeId: 'nemat_root',
      }
    ]
  },
  nemat_react_tea: {
    id: 'nemat_react_tea',
    speaker: 'کربلایی نعمت',
    speakerTitle: 'مسافرخانه‌چی',
    portraitKey: 'nemat',
    text: 'خب شاید شکمش پیچیده رفته مستراح! تو به چای سرد مردم هم کار داری مفتش باشی؟ برو پی کارت!',
    options: [
      {
        id: 'opt_nemat_back',
        text: 'هرچی بیشتر داد می‌زنی، بوی دروغت تندتر میشه کربلایی.',
        nextNodeId: 'nemat_root',
      }
    ]
  },
  nemat_bandit_corrected_node: {
    id: 'nemat_bandit_corrected_node',
    speaker: 'کربلایی نعمت',
    speakerTitle: 'مسافرخانه‌چی',
    portraitKey: 'nemat',
    text: '(تسبیحش به لرزه می‌افتد) چرت و پرت نگو خانخله! ابریشم کجا بود؟! داری برای کاروانسرای بی‌گناه مردم انگ می‌تراشی تا دکان باج‌گیری وا کنی؟! برو رد کارت تا نگفتم مهترها بیرون پرتت کنن!',
    options: [
      {
        id: 'opt_nemat_bandit_back',
        text: 'هرچی بیشتر هول بشی، طناب دار قشنگ‌تر دورت می‌پیچه کربلایی... برمی‌گردم.',
        nextNodeId: 'nemat_root',
      }
    ]
  },

  // -------------------------------------------------------------
  // HAJ MORTEZA (حاج مرتضی)
  // -------------------------------------------------------------
  morteza_root: {
    id: 'morteza_root',
    speaker: 'حاج مرتضی',
    speakerTitle: 'تاجر شال و قماش',
    portraitKey: 'morteza',
    text: 'لا حول ولا قوه الا بالله... سلام علیکم رفعت‌خان. می‌بینم هنوز در این خاک غریب، سر در گریبان و جستجوگر روزگار می‌گذرانی. بگو ببینم چه خدمتی از دست این بنده ناچیز خدا برمی‌آید؟',
    options: [
      {
        id: 'opt_morteza_incident',
        text: 'حاج‌آقا، از گم‌شدن میرزا صفدر خبر دارید؟ همه جا صحبت از اونه.',
        nextNodeId: 'morteza_incident',
      },
      {
        id: 'opt_morteza_safdar',
        text: 'شما با میرزا سر چه موضوعی خلوت می‌کردید؟ معامله منسوجات؟',
        nextNodeId: 'morteza_safdar',
      },
      {
        id: 'opt_morteza_lastnight',
        text: 'دیشب هنگام نیمه‌شب، حال و هوای کاروانسرا چطور بود؟',
        nextNodeId: 'morteza_lastnight',
      },
      {
        id: 'opt_morteza_whereabouts',
        text: 'می‌گویند دیشب تا صبح کجا تشریف داشتید؟',
        nextNodeId: 'morteza_whereabouts',
      },
      {
        id: 'opt_morteza_confront_lie',
        text: '«حاجی! ادعا می‌کنی دیشب اینجا نبودی، اما لای سرخ حیاط کاروانسرا رو چکمه‌هات چسبیده!»',
        condition: (s) => !!s.evidence['ev_morteza_boots'],
        nextNodeId: 'morteza_break_lie',
        isEvidenceOption: true,
      },
      {
        id: 'opt_morteza_evidence_menu',
        text: 'یک نگاهی به این مدارک بیندازید (ارائه سرنخ...)',
        nextNodeId: 'morteza_evidence_list',
      },
      {
        id: 'opt_morteza_leave',
        text: 'التماس دعا حاج‌آقا. به حساب و کتاب شما هم می‌رسیم.',
        nextNodeId: undefined,
      }
    ]
  },
  morteza_incident: {
    id: 'morteza_incident',
    speaker: 'حاج مرتضی',
    speakerTitle: 'تاجر شال و قماش',
    portraitKey: 'morteza',
    text: 'شنیدم... متاسفانه دنیای دون پر از غدر و فریب است. میرزا مردی عاقل بود، اما کنجکاوی در اموری که فراتر از وسعت انسان است، عاقبتش جز گم‌گشتگی در ریگزار نیست.',
    options: [
      {
        id: 'opt_morteza_back',
        text: 'کنجکاوی در کدوم امور؟ جالب شد...',
        nextNodeId: 'morteza_root',
      }
    ]
  },
  morteza_safdar: {
    id: 'morteza_safdar',
    speaker: 'حاج مرتضی',
    speakerTitle: 'تاجر شال و قماش',
    portraitKey: 'morteza',
    text: 'ایشان جویای اسناد قباله‌های املاک قدیمی یزد و ری بودند. بنده نیز تنها به رسم تجارت چند سند ملکی را برای تطبیق عیار به او نشان دادم. دیگر سر و کاری بین ما نبود.',
    options: [
      {
        id: 'opt_morteza_back',
        text: 'قباله‌های املاک؟ مثل املاک کاروان شتران سرخ؟',
        nextNodeId: 'morteza_root',
      }
    ]
  },
  morteza_lastnight: {
    id: 'morteza_lastnight',
    speaker: 'حاج مرتضی',
    speakerTitle: 'تاجر شال و قماش',
    portraitKey: 'morteza',
    text: 'دیشب؟ دیشب من اصلاً در این کاروانسرا حضور نداشتم خانخله! در رباط بالادست با معتمدین ده در حال مذاکره بودیم و با اذان صبح به اینجا وارد شدم.',
    options: [
      {
        id: 'opt_morteza_back',
        text: 'پس دیشب فرسنگ‌ها دور بودید... عجب.',
        nextNodeId: 'morteza_root',
      }
    ]
  },
  morteza_whereabouts: {
    id: 'morteza_whereabouts',
    speaker: 'حاج مرتضی',
    speakerTitle: 'تاجر شال و قماش',
    portraitKey: 'morteza',
    text: 'همان‌طور که عرض کردم، در منزل کدخدای دهکده علیا بیتوته داشتم. گواهان معتبر دارم رفعت‌خان. بیهوده وقت شریفتان را تلف تهمت زدن به تجار آبرومند نکنید.',
    options: [
      {
        id: 'opt_morteza_back',
        text: 'آدم آبرومند همیشه رد پای تمیزی به جا میذاره، نه؟',
        nextNodeId: 'morteza_root',
      }
    ]
  },
  morteza_evidence_list: {
    id: 'morteza_evidence_list',
    speaker: 'حاج مرتضی',
    speakerTitle: 'تاجر شال و قماش',
    portraitKey: 'morteza',
    text: 'بفرمایید، چه چیزی ذهن مشوش شما را مشغول کرده است؟',
    options: [
      {
        id: 'opt_morteza_show_coin',
        text: '«این سکه سوراخ‌شده با نشان کاروان شتران سرخ رو می‌شناسید؟»',
        condition: (s) => s.inventory.includes('coin_hole'),
        nextNodeId: 'morteza_react_coin',
        isEvidenceOption: true,
      },
      {
        id: 'opt_morteza_show_cloth',
        text: '«این تکه پارچه ابریشم سرخ که به لبه پنجره میرزا گیر کرده بود چطور؟»',
        condition: (s) => s.inventory.includes('cloth_with_thread') || s.inventory.includes('red_thread'),
        nextNodeId: 'morteza_react_cloth',
        isEvidenceOption: true,
      },
      {
        id: 'opt_morteza_back',
        text: 'فعلاً بماند... سوال دیگه‌ای دارم.',
        nextNodeId: 'morteza_root',
      }
    ]
  },
  morteza_react_coin: {
    id: 'morteza_react_coin',
    speaker: 'حاج مرتضی',
    speakerTitle: 'تاجر شال و قماش',
    portraitKey: 'morteza',
    text: '(دستش روی دانه‌های تسبیح قفل می‌شود) این سکه... متعلق به اموال مفقوده هفت سال پیش است. میرزا این را پیش خود نگه داشته بود؟ رفعت‌خان، این سکه بوی خون می‌دهد. عاقل باش و روش رو بپوشان.',
    options: [
      {
        id: 'opt_morteza_back',
        text: 'بوی خونش به دماغ من خوش میاد حاجی. بریم سراغ بقیه قضایا.',
        nextNodeId: 'morteza_root',
      }
    ]
  },
  morteza_react_cloth: {
    id: 'morteza_react_cloth',
    speaker: 'حاج مرتضی',
    speakerTitle: 'تاجر شال و قماش',
    portraitKey: 'morteza',
    text: '(به گوشه شال خود نگاه سریعی می‌اندازد) بازار پر از منسوجات سرخ کاشان است خانخله. تکه پارچه‌ای فرسوده دلیلی بر ارتکاب جرم نیست.',
    options: [
      {
        id: 'opt_morteza_back',
        text: 'ولی وقتی لبه شال شما نخ‌کش شده باشه، کمی فرق می‌کنه!',
        nextNodeId: 'morteza_root',
      }
    ]
  },
  morteza_break_lie: {
    id: 'morteza_break_lie',
    speaker: 'حاج مرتضی',
    speakerTitle: 'تاجر شال و قماش',
    portraitKey: 'morteza',
    text: '(لبخند آرامش محو می‌شود و چشمانش تیز و سرد می‌گردد) ...رفعت‌خان. تیزتر از آنی هستی که در قهوه‌خانه‌ها می‌گویند. بله، دیشب در حیاط بودم. میرزا سندی را در دست داشت که نباید به دست نامحرم می‌رسید. اما من نکشتمش! او با پای خودش از پنجره گریخت وقتی فهمید دفترش دیگر حاوی هیچ رازی نیست!',
    options: [
      {
        id: 'opt_morteza_confess_ledger',
        text: '«دفترش حاوی رازی نیست؟ پس چرا صفحات دفترش رو با چرم مالیدید و پاک کردید؟»',
        nextNodeId: 'morteza_confess_ledger',
      }
    ]
  },
  morteza_confess_ledger: {
    id: 'morteza_confess_ledger',
    speaker: 'حاج مرتضی',
    speakerTitle: 'تاجر شال و قماش',
    portraitKey: 'morteza',
    text: 'چون سندی در آن ثبت شده بود که هفت سال سکوت را می‌شکست: مکان اختفای محموله کاروان شتران سرخ! فکر می‌کنی با چند کلمه پاک‌شده چیزی عایدت می‌شود؟ آن دفتر حالا کاغذی سفید بیش نیست!',
    options: [
      {
        id: 'opt_morteza_khan_final_retort',
        text: '«میرزا حسابدار زبردستی بود حاجی... قلم اون گودتر از این حرف‌ها کاغذ رو می‌شکافه. باید برم اون دفتر رو دقیق‌تر وارسی کنم!»',
        nextNodeId: 'morteza_end_climax',
        action: (s) => ({
          puzzleFlags: { ...s.puzzleFlags, morteza_confronted: true }
        })
      }
    ]
  },
  morteza_end_climax: {
    id: 'morteza_end_climax',
    speaker: 'حاج مرتضی',
    speakerTitle: 'تاجر شال و قماش',
    portraitKey: 'morteza',
    text: 'اگر دستت به آن سرنخ برسد، سرت را به باد خواهی داد رفعت‌خان. این آخرین نصیحت من بود.',
    options: [
      {
        id: 'opt_morteza_close',
        text: 'خانخله کلاه نمدیش رو محکم نگه می‌داره، نگران سر من نباش.',
        nextNodeId: undefined,
      }
    ]
  },

  // ========================================================
  // ACT 2 DIALOGUES: MASHHADI QASEM (مشهدی قاسم)
  // ========================================================
  qasem_root: {
    id: 'qasem_root',
    speaker: 'مشهدی قاسم',
    speakerTitle: 'رمال و بقال بازارچه',
    portraitKey: 'qasem',
    text: 'به‌به! خانخله نامدار، کارآگاه بیابان‌خواب! قدم بر چشم ما گذاشتی. بگو ببینم، بوی طلای گمشده به مشامت خورده یا سرکتاب باز کردن برای دفع نحوست این روز باریک می‌خواهی؟',
    options: [
      {
        id: 'opt_qasem_ghoul',
        text: '«شنیدم باز دهانت گرم شده و برای مردم کوچه از جن و طلسم قنات قصه می‌بافی!»',
        nextNodeId: 'qasem_rumors_ghoul',
      },
      {
        id: 'opt_qasem_lemon',
        text: '«قاسم، گفتی نوشته‌های غیبی با آب‌لیمو و آتش چراغ رو میان؟ راسته یا کلک دکانداریه؟»',
        nextNodeId: 'qasem_lemon_ink_advice',
      },
      {
        id: 'opt_qasem_mirza',
        text: '«میرزا صفدر قبل از حادثه سراغ تو نیومده بود؟ چی می‌خواست؟»',
        nextNodeId: 'qasem_mirza_debt',
      },
      {
        id: 'opt_qasem_confront',
        text: '«قاسم! پلاک مسین ضرابخانه و دروغ کاروان شتران رو به کی فروختی؟ کی بهت پول داد این اراجیف رو سر هم کنی؟»',
        condition: (s) => !!s.evidence.ev_act2_copper_token_cipher || !!s.puzzleFlags.empty_ledger_act2_solved || !!s.storyFlags.qasem_hoax_exposed,
        nextNodeId: 'qasem_confront_hoax',
      },
      {
        id: 'opt_qasem_leave',
        text: 'فعلاً بشین پشت بساطت و کمتر چرند به خورد مردم بده.',
        nextNodeId: undefined,
      }
    ]
  },
  qasem_rumors_ghoul: {
    id: 'qasem_rumors_ghoul',
    speaker: 'مشهدی قاسم',
    speakerTitle: 'رمال و بقال بازارچه',
    portraitKey: 'qasem',
    text: 'چرند چیه خان؟! دیشب باد که زوزه کشید، صدای سم جن‌های کویر از طرف مظهر قنات کهنه میومد! کاروانسرادارها هی میگن هفت صندوق، هفت صندوق... ولی من میگم طلسم هفتاد ساله شکسته و زمین اونا رو بلعیده! هر کی پاشو بذاره دم دهانه قنات، خونش پای خودشه!',
    options: [
      {
        id: 'opt_qasem_ghoul_doubt',
        text: '«تو از کی تاحالا وکیل جن‌های کویری شدی قاسم؟ بگو ببینم پشت این حرف‌ها کی نشسته؟»',
        nextNodeId: 'qasem_root',
      }
    ]
  },
  qasem_lemon_ink_advice: {
    id: 'qasem_lemon_ink_advice',
    speaker: 'مشهدی قاسم',
    speakerTitle: 'رمال و بقال بازارچه',
    portraitKey: 'qasem',
    text: 'هاها! اگر کاغذ سفید دستته و فکر می‌کنی رازی توشه، یه شیشه آب‌لیمو شیرازی از من بخر، دو قطره بچکون و بگیر روی شعله چراغ‌موشی! اگر جوهر غیبی باشه مثل آفتاب روشن میشه! (یک شیشه آب‌لیمو روی پیشخوان می‌گذارد)',
    options: [
      {
        id: 'opt_qasem_take_lemon',
        text: '«بده بیاد اون شیشه رو... هرچند حس بویاییم میگه داری چاخان می‌کنی.»',
        action: (s) => {
          const inv = [...s.inventory];
          if (!inv.includes('lemon_juice_bottle')) inv.push('lemon_juice_bottle');
          return { inventory: inv };
        },
        nextNodeId: 'qasem_lemon_given',
      },
      {
        id: 'opt_qasem_back_lemon',
        text: '«من گول معجون‌های تو رو نمی‌خورم قاسم.»',
        nextNodeId: 'qasem_root',
      }
    ]
  },
  qasem_lemon_given: {
    id: 'qasem_lemon_given',
    speaker: 'مشهدی قاسم',
    speakerTitle: 'رمال و بقال بازارچه',
    portraitKey: 'qasem',
    text: 'بفرما خان! امتحانش مجانیه... ولی مواظب باش کاغذ دستت جزغاله نشه که دودش به چشم خودت میره!',
    options: [
      {
        id: 'opt_qasem_lemon_leave',
        text: 'می‌رم امتحانش کنم ببینم چند مرده حلاجی.',
        nextNodeId: 'qasem_root',
      }
    ]
  },
  qasem_mirza_debt: {
    id: 'qasem_mirza_debt',
    speaker: 'مشهدی قاسم',
    speakerTitle: 'رمال و بقال بازارچه',
    portraitKey: 'qasem',
    text: 'میرزا دو روز پیش اومد اینجا، رنگش مثل گچ سفید بود! سراغ تاریخچه قنات متروک و کاروان هفت سال پیش نایب‌الحکومه رو می‌گرفت. می‌گفت: «قاسم، آیا ممکنه کاروانی بیاد و خاک کویر بوی شتر نگیره؟» منم گفتم میرزا، زیاد دود چراغ خوردی، عقلت قاطی کرده!',
    options: [
      {
        id: 'opt_qasem_mirza_thought',
        text: '«عقل اون قاطی نکرده بود... بوی حقه رو از فرسنگ‌ها شنیده بود.»',
        nextNodeId: 'qasem_root',
      }
    ]
  },
  qasem_confront_hoax: {
    id: 'qasem_confront_hoax',
    speaker: 'مشهدی قاسم',
    speakerTitle: 'رمال و بقال بازارچه',
    portraitKey: 'qasem',
    text: '(دستپاچه می‌شود و تسبیح از دستش می‌افتد) خ... خانخله! صداتو بیار پایین، مگه سرت به تنت سنگینی می‌کنه؟! من فقط یه بقال بدبختم، گناه من چیه؟!',
    options: [
      {
        id: 'opt_qasem_squeeze_truth',
        text: '«حرف بزن قاسم! کی بهت پول داد تا مردم رو از قنات بترسونی و افسانه جن ببافی؟»',
        nextNodeId: 'qasem_confess_truth',
      }
    ]
  },
  qasem_confess_truth: {
    id: 'qasem_confess_truth',
    speaker: 'مشهدی قاسم',
    speakerTitle: 'رمال و بقال بازارچه',
    portraitKey: 'qasem',
    text: 'چند شب پیش، زنی با روبنده ابریشمی بنفش و صدای خش‌دار اومد پیشم. ده اشرفی طلا داد و گفت: «تا سه روز توی بازار هوار بکش که قنات طلسم شده و کاروان جن‌ها بار طلا رو برده زیر زمین! نگذار کسی هوس کنه سمت چاه‌ها بره.» به روح پدرم قسم من خبر نداشتم قتلی در کاره خان!',
    options: [
      {
        id: 'opt_qasem_finish_confession',
        text: '«زن با روبنده بنفش... رعنا! پس ریشه‌های توطئه تا عمق حرمسرای والی میرسه. دهنت رو ببند و از جات تکون نخور!»',
        nextNodeId: undefined,
        action: (s) => ({
          puzzleFlags: { ...s.puzzleFlags, qasem_confessed: true }
        })
      }
    ]
  },

  // ========================================================
  // ACT 2 DIALOGUES: OSTA SADIQ (اوستا صادق کاغذفروش)
  // ========================================================
  sadiq_root: {
    id: 'sadiq_root',
    speaker: 'اوستا صادق',
    speakerTitle: 'کاغذفروش و صحاف',
    portraitKey: 'sadiq',
    text: 'سلام و رحمت حق بر خانخله تیزبین. بفرمایید، اینجا دکان کاغذ و مرکب است. هر کاغذی که در این ولایت ورق می‌خورد، شناسنامه‌اش پیش من است.',
    options: [
      {
        id: 'opt_sadiq_paper_texture',
        text: '«اوستا صادق، این کاغذ دفترچه میرزا صفدر رو ببین؛ چه جنس و بافتی داره؟»',
        nextNodeId: 'sadiq_mirza_paper',
      },
      {
        id: 'opt_sadiq_indentation_secret',
        text: '«اگر کسی صفحات دفتری رو ببره یا خطوطش رو پاک کنه، راهی هست که بشه دست‌خط قبلی رو خوند؟»',
        nextNodeId: 'sadiq_ink_erasure',
      },
      {
        id: 'opt_sadiq_tools',
        text: '«به ابزاری احتیاج دارم که بتونم شیارهای فرورفته این کاغذ ضخیم رو بدون صدمه زدن آشکار کنم.»',
        nextNodeId: 'sadiq_charcoal_technique',
      },
      {
        id: 'opt_sadiq_purple_woman',
        text: '«کسی در این یکی دو روز سراغ جنس کاغذ یا دفترچه میرزا نیومده بود؟»',
        nextNodeId: 'sadiq_rana_mention',
      },
      {
        id: 'opt_sadiq_leave',
        text: 'دستت درد نکنه اوستا، برمی‌گردم.',
        nextNodeId: undefined,
      }
    ]
  },
  sadiq_mirza_paper: {
    id: 'sadiq_mirza_paper',
    speaker: 'اوستا صادق',
    speakerTitle: 'کاغذفروش و صحاف',
    portraitKey: 'sadiq',
    text: 'عجب کاغذی! این کاغذ آهارمهره درجه‌یک اصفهان است خان. پنبه فشرده با لعاب کتیرا و نشاسته. وقتی میرزا صفدر با آن قلم‌نی محکم دزفولی‌اش روی این می‌نوشت، تیغه قلم تا سه لایه زیرین را گود می‌انداخت! این جنس کاغذ، حافظه‌ای مثل سنگ دارد.',
    options: [
      {
        id: 'opt_sadiq_back_to_root',
        text: '«پس حتی اگه جوهرش نباشه، رد تیغه قلم پاک‌شدنی نیست!»',
        nextNodeId: 'sadiq_root',
      }
    ]
  },
  sadiq_ink_erasure: {
    id: 'sadiq_ink_erasure',
    speaker: 'اوستا صادق',
    speakerTitle: 'کاغذفروش و صحاف',
    portraitKey: 'sadiq',
    text: 'جوهر دوده را با چرم نمدار می‌شویند یا با تیغ دباغی می‌تراشند، اما شیار فرورفته قلم روی کاغذ آهارمهره تسلیم نمی‌شود. نادان‌ها فکر می‌کنند با تیغ زدن صفحه را نابود کرده‌اند، اما صفحه زیرین تمام کلمات را با برجستگی معکوس در خود ضبط کرده است!',
    options: [
      {
        id: 'opt_sadiq_ask_method',
        text: '«چطور میشه اون خطوط معکوس رو بدون پاره شدن کاغذ بیرون کشید؟»',
        nextNodeId: 'sadiq_charcoal_technique',
      }
    ]
  },
  sadiq_charcoal_technique: {
    id: 'sadiq_charcoal_technique',
    speaker: 'اوستا صادق',
    speakerTitle: 'کاغذفروش و صحاف',
    portraitKey: 'sadiq',
    text: 'اگر زغال درشت بکشی، کاغذ خراش برمی‌دارد و سیاه می‌شود. اما اگر «گرد نرم دوده بید» را با «قلم‌موی موی شتر» آرام و با زاویه مورب روی برگه نوازش دهی، دوده فقط در لبه‌های برجسته شیار می‌نشیند و کلمات مثل نگین فیروزه روی سنگ سیاه می‌درخشند!',
    options: [
      {
        id: 'opt_sadiq_give_me_tools',
        text: '«اوستا، اون سینی گرد دوده و قلم‌مو رو به من امانت بده تا حقیقت این دفتر برملا بشه.»',
        nextNodeId: 'sadiq_give_tools',
      }
    ]
  },
  sadiq_give_tools: {
    id: 'sadiq_give_tools',
    speaker: 'اوستا صادق',
    speakerTitle: 'کاغذفروش و صحاف',
    portraitKey: 'sadiq',
    text: 'مال خودت خان! برای رسوا کردن خائن‌ها، تمام دکان من پیشکش توست. آن سینی گرد دوده بید و قلم‌موی موی شتر روی طاقچه است، بردار و نگذار خون میرزا پایمال شود.',
    options: [
      {
        id: 'opt_sadiq_tools_taken',
        text: '«خیلی مردی اوستا صادق. میرم سراغ دفتر میرزا.»',
        action: (s) => {
          const inv = [...s.inventory];
          if (!inv.includes('charcoal_powder_sadiq') && !inv.includes('shading_kit')) inv.push('charcoal_powder_sadiq');
          if (!inv.includes('camel_hair_brush') && !inv.includes('shading_kit')) inv.push('camel_hair_brush');
          return { inventory: inv };
        },
        nextNodeId: 'sadiq_root',
      }
    ]
  },
  sadiq_rana_mention: {
    id: 'sadiq_rana_mention',
    speaker: 'اوستا صادق',
    speakerTitle: 'کاغذفروش و صحاف',
    portraitKey: 'sadiq',
    text: 'اتفاقاً سحرگاه امروز، قبل از باز شدن کاروانسرا، زنی با چادر زربفت بنفش و بوی عطر کندر و صندل به دکانم آمد. می‌پرسید آیا میرزا در این چند روز کاغذی برای صحافی پیش من گذاشته یا نه. چشمانی بسیار نافذ و وحشتناک داشت... مثل شاهین شکاری!',
    options: [
      {
        id: 'opt_sadiq_rana_reply',
        text: '«رعنا... پس اونم دنبال باقیمانده یادداشت‌های میرزا بوده!»',
        nextNodeId: 'sadiq_root',
      }
    ]
  },

  // ========================================================
  // ACT 2 DIALOGUES: MAHBANOO (مه‌بانو رنگرز)
  // ========================================================
  mahbanoo_root: {
    id: 'mahbanoo_root',
    speaker: 'مه‌بانو',
    speakerTitle: 'رنگرز و قالی‌باف بازارچه',
    portraitKey: 'mahbanoo',
    text: 'سلام خانخله. دست‌های من بوی روناس میده، بوی خاک و زحمت. ولی چشم‌هام هنوز اون‌قدر سو داره که غریبه‌ها و بارهای مشکوک رو توی تاریکی بشناسم.',
    options: [
      {
        id: 'opt_mahbanoo_red_wool',
        text: '«مه‌بانو، این تکه نخ و نمد سرخ رو ببین؛ این رنگ هنر دست خودته؟»',
        nextNodeId: 'mahbanoo_red_wool',
      },
      {
        id: 'opt_mahbanoo_midnight',
        text: '«دیشب از سمت راسته بازار و کوچه خانه یعقوب چیزی دیدی که خوابت رو آشفته کنه؟»',
        nextNodeId: 'mahbanoo_midnight_sighting',
      },
      {
        id: 'opt_mahbanoo_cart',
        text: '«یعقوب میگه بیست تا شتر با زنگوله از کوچه‌ش رد شدن... تو شتری دیدی؟»',
        nextNodeId: 'mahbanoo_suspicious_cart',
      },
      {
        id: 'opt_mahbanoo_leave',
        text: 'خسته نباشی مه‌بانو، به کارت برس.',
        nextNodeId: undefined,
      }
    ]
  },
  mahbanoo_red_wool: {
    id: 'mahbanoo_red_wool',
    speaker: 'مه‌بانو',
    speakerTitle: 'رنگرز و قالی‌باف بازارچه',
    portraitKey: 'mahbanoo',
    text: 'این سرخی اناری روناس یزد است با زاج سپید. سه روز پیش حاج مرتضی شال‌فروش آمد و هفت طاقه نمد ضخیم را با همین رنگ از من خرید. می‌گفت برای روکش صندوق‌های خزانه‌داری می‌خواهد تا رطوبت باران به مال تجارتی آسیب نزند. پولش را هم با سکه‌های کهنه پرداخت کرد.',
    options: [
      {
        id: 'opt_mahbanoo_back_wool',
        text: '«پس حاج مرتضی نمد صندوق‌ها رو تهیه کرده بود...»',
        nextNodeId: 'mahbanoo_root',
      }
    ]
  },
  mahbanoo_midnight_sighting: {
    id: 'mahbanoo_midnight_sighting',
    speaker: 'مه‌بانو',
    speakerTitle: 'رنگرز و قالی‌باف بازارچه',
    portraitKey: 'mahbanoo',
    text: 'دیشب نزدیک‌های نیمه‌شب، کلاف‌های رنگی را روی پشت‌بام پهن می‌کردم. دو مرد قوی‌هیکل با کلاه‌نمدی‌های سیاه دیدم که یک گاری دستی چوبی را به سمت کوچه بن‌بست یعقوب هل می‌دادند. رویش پارچه سیاه کشیده بودند، ولی زیر نور مهتاب دیدم که جعبه‌ها چقدر سبک به نظر می‌رسیدند!',
    options: [
      {
        id: 'opt_mahbanoo_light_boxes',
        text: '«سبک؟! مگه نباید بار صندوق‌ها شمش و شتربار باشه؟»',
        nextNodeId: 'mahbanoo_suspicious_cart',
      }
    ]
  },
  mahbanoo_suspicious_cart: {
    id: 'mahbanoo_suspicious_cart',
    speaker: 'مه‌بانو',
    speakerTitle: 'رنگرز و قالی‌باف بازارچه',
    portraitKey: 'mahbanoo',
    text: 'شتر کجا بود خان؟! یک دانه شتر هم از آن کوچه رد نشد! نه بوی سرگین شتر آمد، نه صدای زنگوله سنگین کاروان. فقط یکی از آن دو مرد، چیزی شبیه زنگوله حلبی را در دستش گرفته بود و هر چند قدم تکان می‌داد! آن پیرمرد نابینا را فریب دادند تا خیال کند کاروان عبور کرده است.',
    options: [
      {
        id: 'opt_mahbanoo_go_yaqub',
        text: '«یعقوب مظلوم... باید برم سراغش و این حیله رو بهش ثابت کنم.»',
        nextNodeId: 'mahbanoo_root',
      }
    ]
  },

  // ========================================================
  // ACT 2 DIALOGUES: YAQUB (یعقوب نابینا)
  // ========================================================
  yaqub_root: {
    id: 'yaqub_root',
    speaker: 'یعقوب نابینا',
    speakerTitle: 'پیرمرد روشن‌دل و حافظ اصوات',
    portraitKey: 'yaqub',
    text: 'صدای پای گیوه کهنه... قدم‌های سنگین ولی بی‌شتاب... رفعت‌خان خانخله هستی، درسته؟ چشم‌هایم چهل سال است خاموشند، ولی گوش‌هایم دروغ نمی‌گویند. بگو برای چه به کلبه خشت و گلی من آمدی؟',
    options: [
      {
        id: 'opt_yaqub_sounds',
        text: '«عمو یعقوب، دیشب از صدای کوچه و بیابان چی شنیدی؟ موبه‌مو برام بگو.»',
        nextNodeId: 'yaqub_hearing_sounds',
      },
      {
        id: 'opt_yaqub_caravan',
        text: '«گفتی کاروان بیست شتر از پشت دیوارت به طرف قنات رد شدند؟ از کجا این‌قدر مطمئنی؟»',
        nextNodeId: 'yaqub_caravan_memory',
      },
      {
        id: 'opt_yaqub_test_bell',
        text: '«یعقوب! به این صدا خوب گوش بده... این زنگوله رو از بوته‌های پای دیوارت پیدا کردم.» (آزمون صوتی)',
        condition: (s) => s.inventory.includes('iron_clapper_bell') || !!s.puzzleFlags.yaqub_sound_puzzle_solved,
        nextNodeId: 'yaqub_audio_test',
      },
      {
        id: 'opt_yaqub_woman_dawn',
        text: '«قبل از سحر کسی به درِ کلبه‌ات نزد؟ بوی عطر غریبه‌ای به مشامت نخورد؟»',
        condition: (s) => !!s.puzzleFlags.yaqub_sound_puzzle_solved || !!s.storyFlags.yaqub_sound_puzzle_solved || !!s.storyFlags.yaqub_contradiction_exposed,
        nextNodeId: 'yaqub_confess_woman',
      },
      {
        id: 'opt_yaqub_leave',
        text: 'آسوده باش یعقوب، مزاحمت نمی‌شم.',
        nextNodeId: undefined,
      }
    ]
  },
  yaqub_hearing_sounds: {
    id: 'yaqub_hearing_sounds',
    speaker: 'یعقوب نابینا',
    speakerTitle: 'پیرمرد روشن‌دل و حافظ اصوات',
    portraitKey: 'yaqub',
    text: 'باد که از ریگستان وزید، صدای شکستن شاخه انار حیاط آمد. بعد، صدای زنگوله‌ها بلند شد... جرنگ... تق... تق... مثل حرکت آرام قافله در ریگ. بعد هم سکوتی غریب، و صدای پژواک هوای سرد از دهانه قنات.',
    options: [
      {
        id: 'opt_yaqub_ask_clapper',
        text: '«گفتی تق... تق...؟ مگه زنگ کاروان برنجی و کشیده نیست؟»',
        nextNodeId: 'yaqub_caravan_memory',
      }
    ]
  },
  yaqub_caravan_memory: {
    id: 'yaqub_caravan_memory',
    speaker: 'یعقوب نابینا',
    speakerTitle: 'پیرمرد روشن‌دل و حافظ اصوات',
    portraitKey: 'yaqub',
    text: 'من در جوانی ساربان بودم خان! صدای زنگ شتر را از فرسنگ‌ها می‌شناسم. زنگ کاروان سرخ همیشه هفت پرده زنگ می‌زند. دیشب هم صدای زنگ آمد... ولی... حالا که می‌پرسی، انگار طنین نداشت! انگار زنگوله در هوا معلق بود و صدای پای شترها در خاک گم شده بود!',
    options: [
      {
        id: 'opt_yaqub_back_root',
        text: '«چون خاکی که شتر روش پا بذاره فرومی‌ریزه، ولی ریگ‌های کوچه دست‌نخورده موندن!»',
        nextNodeId: 'yaqub_root',
      }
    ]
  },
  yaqub_audio_test: {
    id: 'yaqub_audio_test',
    speaker: 'یعقوب نابینا',
    speakerTitle: 'پیرمرد روشن‌دل و حافظ اصوات',
    portraitKey: 'yaqub',
    text: '(خانخله زنگوله حلبی لق را می‌نوازد: تق‌تق... تق‌تق...) یا رب العالمین! این... این صدای همان زنگوله‌ای است که دیشب شنیدم! زنگوله‌ای تک و تنها با زبانه آهنی کج! پس کاروان شتران کجا بود؟! چرا هیچ صدای نفسی از حیوان‌ها نیامد؟! خدایا، چهل سال به گوش‌هایم مغرور بودم، و دیشب فریب یک تکه آهن لق را خوردم!',
    options: [
      {
        id: 'opt_yaqub_comfort',
        text: '«تو مقصر نیستی عمو یعقوب؛ اونا برای فریب دادن همه این نقشه رو کشیده بودن. بگو بعدش چی شد؟»',
        action: (s) => ({
          puzzleFlags: { ...s.puzzleFlags, yaqub_sound_puzzle_solved: true },
          evidence: { ...s.evidence, ev_act2_iron_clapper_sound: true }
        }),
        nextNodeId: 'yaqub_confess_woman',
      }
    ]
  },
  yaqub_confess_woman: {
    id: 'yaqub_confess_woman',
    speaker: 'یعقوب نابینا',
    speakerTitle: 'پیرمرد روشن‌دل و حافظ اصوات',
    portraitKey: 'yaqub',
    text: 'ساعتی قبل از اذان صبح، درِ چوبی حیاط به صدا درآمد. صدای پای سبکی بود، مثل پای غزال روی مخمل. زنی بود با عطری تلخ و تند از عود و صندل. با صدایی محکم و مغرور گفت: «پیرمرد، میرزا دیشب اینجا نیامده بود؟ اگر سندی به تو سپرده بگو، تا کیسه زری در دامنت بریزم.» من گفتم جز باد و تنهایی کسی اینجا نیست. او با خشم رفت، اما صدای افتادن شیئی فلزی لای آجرچینی ورودی قنات به گوشم رسید!',
    options: [
      {
        id: 'opt_yaqub_point_qanat',
        text: '«افتادن شیء فلزی لای آجرچینی قنات! این باید همون نشانه گمشده باشه!»',
        nextNodeId: 'yaqub_qanat_direction',
      }
    ]
  },
  yaqub_qanat_direction: {
    id: 'yaqub_qanat_direction',
    speaker: 'یعقوب نابینا',
    speakerTitle: 'پیرمرد روشن‌دل و حافظ اصوات',
    portraitKey: 'yaqub',
    text: 'برو به دهانه قنات متروک خانخله. دست راستت روی آجر سوم بالاتر از طاقچه سنگی، لای درز ملات سست را بگرد. آن زن در تاریکی آنجا ایستاده بود. مراقب باش، خائن‌ها برای اینکه رازشان سر به مهر بماند از هیچ خونی پروا ندارند!',
    options: [
      {
        id: 'opt_yaqub_final_thanks',
        text: '«ممنونم عمو یعقوب. گوش‌های تو حقیقت رو زنده کرد.»',
        nextNodeId: undefined,
      }
    ]
  },

  // -------------------------------------------------------------
  // ACT 3: HEYDAR (حیدرِ پل)
  // -------------------------------------------------------------
  heydar_root: {
    id: 'heydar_root',
    speaker: 'حیدرِ پل',
    speakerTitle: 'دیده‌بان پل قدیمی',
    portraitKey: 'heydar',
    text: 'سلام مفتش... قدم روی این سنگ‌های یخ‌زده گذاشتی که چی بشه؟ آب گل‌آلود رودخونه که با کسی شوخی نداره. بهتره برگردی آبادی، اینجا فقط سوز سرما و غلغل آبه.',
    options: [
      {
        id: 'opt_heydar_fish',
        text: 'شنیدم دیشب وسط اون هیاهو، سر و صدای عجیبی از زیر طاق پل شنیدی. بگو چی دیدی؟',
        nextNodeId: 'heydar_fish_node',
      },
      {
        id: 'opt_heydar_net',
        text: 'این طناب‌ها و قرقره‌های سنگین که به پایه‌های پل بستی برای چیه؟',
        nextNodeId: 'heydar_net_node',
      },
      {
        id: 'opt_heydar_confront_fish_lie',
        text: '«حیدر! عمو صفر ماهیگیر میگه تو این سرمای گزنده، همه ماهی‌ها تو لجن خوابیدن! کدوم ماهی از تورت پرید؟»',
        condition: (s) => !!s.storyFlags.heydar_fish_lie_exposed && !s.storyFlags.heydar_fully_confessed,
        nextNodeId: 'heydar_fish_lie_reaction',
      },
      {
        id: 'opt_heydar_confront_scroll',
        text: '«حیدر! استوانه فلزی باز شد و طومار مهرشده میرزا روشن پیدا شد! وقت اعترافه.»',
        condition: (s) => !!s.storyFlags.cylinder_opened && !s.storyFlags.heydar_fully_confessed,
        nextNodeId: 'heydar_final_confession',
      },
      {
        id: 'opt_heydar_leave',
        text: 'فعلاً حواست به این پل باشه تا برگردم.',
        nextNodeId: undefined,
      }
    ]
  },
  heydar_fish_node: {
    id: 'heydar_fish_node',
    speaker: 'حیدرِ پل',
    speakerTitle: 'دیده‌بان پل قدیمی',
    portraitKey: 'heydar',
    text: 'چیزی نبود آقا... حدود ساعت دو بامداد، صدای شلپ‌شلوپ بلندی از وسط گرداب اومد. دویدم لبه جان‌پناه... انگار یه ماهی گنده، به هیکل یه گوساله از توی تور پرید بیرون و شیرجه زد ته آب! فقط یه ماهی پرنده بود!',
    options: [
      {
        id: 'opt_heydar_fish_accept',
        text: 'ماهی پرنده به هیکل گوساله وسط زمستان؟! سرنخ عجیبیه... باید از عمو صفر بپرسم.',
        action: (s) => ({
          evidence: { ...s.evidence, ev_act3_heydar_testimony: true }
        }),
        nextNodeId: 'heydar_root',
      }
    ]
  },
  heydar_net_node: {
    id: 'heydar_net_node',
    speaker: 'حیدرِ پل',
    speakerTitle: 'دیده‌بان پل قدیمی',
    portraitKey: 'heydar',
    text: 'کدوم قرقره آقا؟! اینا فقط چند رشته تور کنفی پوسیده است که آویزون کردم خس و خاشاک و ماهی‌های مرده رو بگیرم تا راه آب زیر طاق‌ها مسدود نشه. چیز به درد بخوری اون زیر نیست، دست بهشون نزنید خطرناکه!',
    options: [
      {
        id: 'opt_heydar_net_note',
        text: 'می‌گی فقط تور کهنه کنفیه؟ ولی حس ششم من چیز دیگه‌ای میگه...',
        action: (s) => ({
          evidence: { ...s.evidence, ev_act3_hemp_net_claim: true }
        }),
        nextNodeId: 'heydar_root',
      }
    ]
  },
  heydar_fish_lie_reaction: {
    id: 'heydar_fish_lie_reaction',
    speaker: 'حیدرِ پل',
    speakerTitle: 'دیده‌بان پل قدیمی',
    portraitKey: 'heydar',
    text: 'عمو صفر؟! اون پیرمرد عقلش پاره‌سنگ برمی‌داره! اصلاً من هول شدم، مه بود، تاریک بود... شاید یه کنده درخت بود که تاب می‌خورد. دست از سر من بردار مفتش، من کاره‌ای نیستم!',
    options: [
      {
        id: 'opt_heydar_fish_lie_back',
        text: 'رنگت پریده حیدر. معلومه پنهان‌کاری می‌کنی.',
        nextNodeId: 'heydar_root',
      }
    ]
  },
  heydar_final_confession: {
    id: 'heydar_final_confession',
    speaker: 'حیدرِ پل',
    speakerTitle: 'دیده‌بان پل قدیمی',
    portraitKey: 'heydar',
    text: 'یا غیاث‌المستغیثین... میرزا روشن! پس سند دست شما افتاد... آقا رحم کن! به پیر، به پیغمبر من دزد نیستم! شش ماه پیش آدم‌های دیوان اومدن سراغم، گفتن اگر شب‌ها وینچ رو نچرخونی و اون استوانه‌های رویین رو از آب نگیری، تک‌تک بچه‌هات رو توی چاه قنات غرق می‌کنیم! اون شب شمش هفتم زیر فشار آب کابل رو پاره کرد و از تور در رفت... حیدر بیچاره شد!',
    options: [
      {
        id: 'opt_heydar_confess_end',
        text: '«حقیقت رو گفتی حیدر. تو فقط طعمه بودی؛ آمر اصلی این جنایت میرزا روشنه.»',
        action: (s) => ({
          storyFlags: { ...s.storyFlags, heydar_fully_confessed: true },
          evidence: { ...s.evidence, ev_act3_heydar_fear_confession: true, ev_act3_mirza_roshan_seal: true }
        }),
        nextNodeId: undefined,
      }
    ]
  },

  // -------------------------------------------------------------
  // ACT 3: SAFAR (عمو صفر ماهیگیر)
  // -------------------------------------------------------------
  safar_root: {
    id: 'safar_root',
    speaker: 'عمو صفر',
    speakerTitle: 'ماهیگیر کهنه‌کار رودخانه',
    portraitKey: 'safar',
    text: 'خوش اومدی به کلبه محقر صیاد. بنشین دم این اجاق گرم شو. بوی باروت و فتنه از روی پل میاد، مگه نه مفتش؟',
    options: [
      {
        id: 'opt_safar_fish_query',
        text: 'حیدرِ پل مدعیه دیشب ساعت دو، یه ماهی غول‌پیکر از تارش بیرون پریده و رفته ته آب. ممکنه؟',
        nextNodeId: 'safar_debunk_fish',
      },
      {
        id: 'opt_safar_current',
        text: 'جریان آب رودخونه چطور می‌گرده؟ اگر چیزی توی آب بیفته کجا میره؟',
        nextNodeId: 'safar_current_explain',
      },
      {
        id: 'opt_safar_knife_gift',
        text: '«عمو صفر، ابزاری داری که بتونم باهاش گره‌های کور و موم‌های ضخیم رو باز کنم؟»',
        condition: (s) => !s.inventory.includes('fisherman_knife'),
        nextNodeId: 'safar_give_knife',
      },
      {
        id: 'opt_safar_leave',
        text: 'ممنون عمو صفر، برمی‌گردم.',
        nextNodeId: undefined,
      }
    ]
  },
  safar_debunk_fish: {
    id: 'safar_debunk_fish',
    speaker: 'عمو صفر',
    speakerTitle: 'ماهیگیر کهنه‌کار رودخانه',
    portraitKey: 'safar',
    text: 'هاهاها! ماهی پرنده؟! حیدر یا بنگ کشیده بوده یا داره سرت کلاه می‌ذاره پسرم! پنجاه ساله من تو این آب تور می‌اندازم. تو چله زمستون، ماهیان این رود مثل سنگ کف لجن کز می‌کنن و تکون نمی‌خورن. اون چیزی که حیدر دیده اگر پرتاب شده، دست بشر پرتش کرده نه باله ماهی!',
    options: [
      {
        id: 'opt_safar_debunk_done',
        text: 'دقیقاً همون‌طور که حدس می‌زدم! حیدر دروغ گفته.',
        action: (s) => ({
          evidence: { ...s.evidence, ev_act3_safar_fish_reality: true }
        }),
        nextNodeId: 'safar_root',
      }
    ]
  },
  safar_current_explain: {
    id: 'safar_current_explain',
    speaker: 'عمو صفر',
    speakerTitle: 'ماهیگیر کهنه‌کار رودخانه',
    portraitKey: 'safar',
    text: 'جریان آب از انبار بالادست تند و باریک میشه. از زیر طاق میانی پل رد میشه و بعد از گرداب صخره‌ها، می‌ریزه توی کانال آسیاب ماه‌نگار. اون شناور شاغول‌دار من رو از روی میز بردار، بنداز تو گرداب تا با چشم خودت خط آب رو ببینی.',
    options: [
      {
        id: 'opt_safar_current_ok',
        text: 'متشکرم، حتماً از شناور استفاده می‌کنم.',
        nextNodeId: 'safar_root',
      }
    ]
  },
  safar_give_knife: {
    id: 'safar_give_knife',
    speaker: 'عمو صفر',
    speakerTitle: 'ماهیگیر کهنه‌کار رودخانه',
    portraitKey: 'safar',
    text: 'این کارد استخوان‌ماهی رو بگیر. تیغه‌ش از فولاد آب‌دیده هندیه. هر چرم و موم و گره‌ای رو مثل پنبه می‌بره. مال تو باشه برای خدمت به حقیقت.',
    options: [
      {
        id: 'opt_safar_take_knife',
        text: 'دستت درد نکنه عمو صفر.',
        action: (s) => ({
          inventory: [...s.inventory, 'fisherman_knife'],
        }),
        nextNodeId: 'safar_root',
      }
    ]
  },

  // -------------------------------------------------------------
  // ACT 3: MAHNEGAR (ماه‌نگار زنِ آسیاب)
  // -------------------------------------------------------------
  mahnegar_root: {
    id: 'mahnegar_root',
    speaker: 'ماه‌نگار',
    speakerTitle: 'زنِ آسیاب',
    portraitKey: 'mahnegar',
    text: 'سلام خانخله. گرد آرد و زحمت آسیاب مجال آسایش نمی‌ذاره، اما خوب شد اومدی. دیشب آسیاب من رو کم مانده بود به کشتن بدن!',
    options: [
      {
        id: 'opt_mahnegar_incident',
        text: 'شنیدم دیشب سنگ‌آسیاب با صدای مهیبی از کار افتاده. چی شد ماه‌نگار خانم؟',
        nextNodeId: 'mahnegar_incident_node',
      },
      {
        id: 'opt_mahnegar_sluice',
        text: 'دریچه آبگیر رو بررسی کردی؟ جسمی که به پره‌ها خورد کجاست؟',
        nextNodeId: 'mahnegar_sluice_node',
      },
      {
        id: 'opt_mahnegar_leave',
        text: 'مراقب خودت باش ماه‌نگار، برمی‌گردم.',
        nextNodeId: undefined,
      }
    ]
  },
  mahnegar_incident_node: {
    id: 'mahnegar_incident_node',
    speaker: 'ماه‌نگار',
    speakerTitle: 'زنِ آسیاب',
    portraitKey: 'mahnegar',
    text: 'ساعت دقیقاً دو بامداد بود. با صدای ضربه‌ای مهیب مثل شلیک توپ، چرخ سنگین آسیاب با لرزشی وحشتناک ایستاد! شوهرم مرحومم می‌گفت وقتی سنگ بایسته انگار قلب آسیاب وایساده. رفتم پای کانال دیدم پره چوبی بلوط خرد شده و یه شیء براق و سنگین لای لجن‌گیر گیر افتاده!',
    options: [
      {
        id: 'opt_mahnegar_record_note',
        text: 'ساعت دو بامداد! یعنی دقیقاً همون ساعتی که پاسگاه نوشته آرامش مطلق بوده!',
        action: (s) => ({
          evidence: { ...s.evidence, ev_act3_mill_jam_record: true }
        }),
        nextNodeId: 'mahnegar_root',
      }
    ]
  },
  mahnegar_sluice_node: {
    id: 'mahnegar_sluice_node',
    speaker: 'ماه‌نگار',
    speakerTitle: 'زنِ آسیاب',
    portraitKey: 'mahnegar',
    text: 'برو کنار دریچه آبگیر رو نگاه کن. اون شیء فلزی سنگین لای شکاف سنگ‌ها افتاده. شبیه یک ماهی استوانه‌ای فلزیه با درپوش ممهور سرخ. جرأت نکردم بازش کنم، بوی دربار و خون ازش میاد!',
    options: [
      {
        id: 'opt_mahnegar_sluice_go',
        text: 'میرم برش دارم و بررسیش می‌کنم.',
        nextNodeId: 'mahnegar_root',
      }
    ]
  },

  // -------------------------------------------------------------
  // ACT 3: NAYEB BAHRAM (نایب بهرام مأمور راه)
  // -------------------------------------------------------------
  bahram_root: {
    id: 'bahram_root',
    speaker: 'نایب بهرام',
    speakerTitle: 'مأمور قراولخانه پاسگاه',
    portraitKey: 'bahram',
    text: 'کیستی مردکه؟ اینجا معبر نظامی و راه‌بند دیوانه! با اجازه کی پرسه می‌زنی؟ زودتر کارت رو بگو و راهت رو بکش برو.',
    options: [
      {
        id: 'opt_bahram_log_ask',
        text: 'آمدم دفتر وقایع دیشب پاسگاه را ببینم. تردد کاروان‌ها و بارهای شبانه چطور ثبت شده؟',
        nextNodeId: 'bahram_log_node',
      },
      {
        id: 'opt_bahram_confront_mill',
        text: '«جناب نایب! در دفترت نوشتی ساعت دو بامداد آرامش کامل بوده، در حالی که چرخ آسیاب ماه‌نگار با ضربه شمش فلزی خرد شده!»',
        condition: (s) => !!s.storyFlags.bahram_log_falsification_exposed,
        nextNodeId: 'bahram_confront_reaction',
      },
      {
        id: 'opt_bahram_leave',
        text: 'فعلاً با دفترت سرگرم باش جناب نایب.',
        nextNodeId: undefined,
      }
    ]
  },
  bahram_log_node: {
    id: 'bahram_log_node',
    speaker: 'نایب بهرام',
    speakerTitle: 'مأمور قراولخانه پاسگاه',
    portraitKey: 'bahram',
    text: 'دفتر رسمی نظمیه است! سطر به سطرش قانون دارالخلافه است. ساعت دو بامداد من خودم شخصاً سر پست بودم؛ پشه هم تکان نخورد. راه‌ها بسته، پل خلوت و آرامش صددرصد برقرار بوده. کسی هم اگر غیر از این بگوید جایش در سیاه‌چال است!',
    options: [
      {
        id: 'opt_bahram_log_register',
        text: 'آرامش صددرصد... بگذار این ثبت رسمی کذایی را یادداشت کنم.',
        action: (s) => ({
          evidence: { ...s.evidence, ev_act3_bahram_patrol_log: true }
        }),
        nextNodeId: 'bahram_root',
      }
    ]
  },
  bahram_confront_reaction: {
    id: 'bahram_confront_reaction',
    speaker: 'نایب بهرام',
    speakerTitle: 'مأمور قراولخانه پاسگاه',
    portraitKey: 'bahram',
    text: 'تو... تو چه کاره‌ای که به گزارش مأمور دولت خرده می‌گیری؟! آسیاب زپرتی خراب شده به پاسگاه چه مربوطه؟! اما... اگر یک کلمه از این حرف‌ها به مرکز برسه، می‌دانم چطور زبانت را ببندم مفتش!',
    options: [
      {
        id: 'opt_bahram_threat_back',
        text: 'سکه‌های توی گنجه‌ات با صدای بلندتری دارن حرف می‌زنن نایب بهرام!',
        action: (s) => ({
          evidence: { ...s.evidence, ev_act3_bahram_bribe_toman: true }
        }),
        nextNodeId: 'bahram_root',
      }
    ]
  },

  // -------------------------------------------------------------
  // ACT 3: GHOLI (قلی نوجوان پادو)
  // -------------------------------------------------------------
  gholi_root: {
    id: 'gholi_root',
    speaker: 'قلی',
    speakerTitle: 'نوجوان پادو و قاصد رودخانه',
    portraitKey: 'gholi',
    text: 'سلام آقا! فال می‌خوای؟ انعام داری؟ پیغام برات ببرم تا اون سر ریگستان؟ دو تا شاهی بده تا رازهای بالادست رو برات تعریف کنم!',
    options: [
      {
        id: 'opt_gholi_warehouse_ask',
        text: 'دیشب دم غروب تو انبار متروک بالادست رودخونه چکار می‌کردی قلی؟',
        nextNodeId: 'gholi_toy_node',
      },
      {
        id: 'opt_gholi_confront_cylinder',
        text: '«قلی! استوانه فلزی ممهور از آب بیرون کشیده شد. کدوم مردی با پالتوی خزدار بهت پول داده بود این دروغ‌ها رو بگی؟»',
        condition: (s) => !!s.storyFlags.gholi_prank_debunked,
        nextNodeId: 'gholi_confess_reaction',
      },
      {
        id: 'opt_gholi_leave',
        text: 'برو پی کارت بچه.',
        nextNodeId: undefined,
      }
    ]
  },
  gholi_toy_node: {
    id: 'gholi_toy_node',
    speaker: 'قلی',
    speakerTitle: 'نوجوان پادو و قاصد رودخانه',
    portraitKey: 'gholi',
    text: 'انبار؟! وا... آقا من اصلاً کاری نداشتم! فقط چند تا چوب خشک می‌انداختم تو ناودونی سنگی انبار تا ببینم آب چقدر سریع می‌برتشون زیر پل. بازی بچه‌گونه بود به مولا!',
    options: [
      {
        id: 'opt_gholi_toy_note',
        text: 'چوب‌بازی توی انبار متروک سرد؟ حرفت مشکوکه قلی!',
        action: (s) => ({
          evidence: { ...s.evidence, ev_act3_gholi_diversion_story: true }
        }),
        nextNodeId: 'gholi_root',
      }
    ]
  },
  gholi_confess_reaction: {
    id: 'gholi_confess_reaction',
    speaker: 'قلی',
    speakerTitle: 'نوجوان پادو و قاصد رودخانه',
    portraitKey: 'gholi',
    text: 'وای آقا تو رو قرآن نزن! اعتراف می‌کنم! دم غروب یه آقای شیک‌پوش با کلاه ماهوت و پالتوی خزدار اومد تو انبار. شترها رو آوردن اونجا، هفت تا بار سنگین رو از ناودونی سر دادن تو آب! به من دو تا سکه نقره داد گفت اگر کسی پرسید بگو چوب بازی می‌کردی! آقا من گناهی ندارم!',
    options: [
      {
        id: 'opt_gholi_confess_done',
        text: 'مردی با پالتوی خزدار... پازل داره کامل میشه قلی. آفرین که حقیقت رو گفتی.',
        action: (s) => ({
          storyFlags: { ...s.storyFlags, gholi_fully_confessed: true }
        }),
        nextNodeId: 'gholi_root',
      }
    ]
  }
};
