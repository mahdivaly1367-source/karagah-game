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
  }
};
