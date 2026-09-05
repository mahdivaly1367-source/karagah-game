/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameState, SceneId } from '../types/game';

export interface ObjectInteractionDef {
  objectId: string;
  role: 'Lore' | 'Evidence' | 'Puzzle' | 'Item' | 'Navigation' | 'Character Interaction';
  inspectModal?: {
    title: string;
    description: string;
    subtext?: string;
  };
  customSound?: 'crow' | 'doorCreak' | 'footstep' | 'puzzleSolved';
  givesItem?: string;
  itemPickupNotice?: string;
  discoversEvidence?: string;
  evidenceNotice?: string;
  changesScene?: SceneId;
  startsDialogue?: {
    npcId: string;
    nodeId: string;
  };
  handler?: (state: GameState) => {
    stateUpdates?: Partial<GameState>;
    toastMessage?: string;
    playEvidenceSound?: boolean;
    playItemSound?: boolean;
  } | void;
}

export const OBJECT_INTERACTIONS: Record<string, ObjectInteractionDef> = {
  // --- Outer Alley ---
  obj_tree_bed: {
    objectId: 'obj_tree_bed',
    role: 'Lore',
    inspectModal: {
      title: 'درخت کهنسال توت',
      description: 'سایه‌ای خنک در حاشیه کوچه خاکی کاروانسرا. خانخله شب‌ها و صبح‌های زود روی پوستین نمدی زیر این درخت چرت می‌زند.',
      subtext: 'خانخله: «خواب زیر درخت مفته، هوای کویر هم تا لنگ ظهر نسیم داره... کاش این کاظم زلزله بیدارم نمی‌کرد.»',
    },
  },

  obj_crow: {
    objectId: 'obj_crow',
    role: 'Lore',
    customSound: 'crow',
    inspectModal: {
      title: 'کلاغ دم‌سیاه',
      description: 'کلاغ با چشم‌های براقش به دهان خانخله نگاه می‌کند و صدایی از ته گلو بیرون می‌دهد: «قار! قار!»',
      subtext: 'خانخله: «حتی این کلاغ هم به شامه من حسودی می‌کنه! دنبال گوشت نباش حیوان، اینجا فقط بوی پول سوخته میاد.»',
    },
  },

  npc_kazem_alley: {
    objectId: 'npc_kazem_alley',
    role: 'Character Interaction',
    startsDialogue: {
      npcId: 'kazem',
      nodeId: 'kazem_root',
    },
  },

  door_to_courtyard: {
    objectId: 'door_to_courtyard',
    role: 'Navigation',
    changesScene: 'courtyard',
  },

  obj_desert_road: {
    objectId: 'obj_desert_road',
    role: 'Lore',
    inspectModal: {
      title: 'جاده ریگستان',
      description: 'جاده‌ای خاکی که کاروان‌ها از آن به سوی ری و یزد حرکت می‌کنند. در افق باد گرد و خاک بلند کرده است.',
      subtext: 'خانخله: «بیابان برای شترها و راهزن‌هاست، نه پای پیاده من. تا قضیه میرزا روشن نشه یه قدم تو این گرما برنمی‌دارم.»',
    },
  },

  // --- Courtyard ---
  obj_mud_pool: {
    objectId: 'obj_mud_pool',
    role: 'Evidence',
    discoversEvidence: 'ev_morteza_boots',
    evidenceNotice: 'کشف شد: گل سرخ‌رنگ پای حوضچه با چکمه‌های حاج مرتضی همخوانی دارد!',
    inspectModal: {
      title: 'گِل سرخ‌رنگ لای حوضچه',
      description: 'آب حوضچه روی خاک رس قرمز مسافرخانه جاری شده و گِل چسبنده کم‌نظیری ساخته است. رد چکمه‌های نوک‌تیز ساغری بر آن حک شده است.',
      subtext: 'خانخله: «این خاک فقط تو حیاط این کاروانسراست. هر کی دیشب پاش به اینجا خورده باشه، تا سه روز از چکمه‌هاش پاک نمیشه!»',
    },
  },

  npc_nemat_courtyard: {
    objectId: 'npc_nemat_courtyard',
    role: 'Character Interaction',
    startsDialogue: {
      npcId: 'nemat',
      nodeId: 'nemat_root',
    },
  },

  door_to_mirza_room: {
    objectId: 'door_to_mirza_room',
    role: 'Navigation',
    changesScene: 'mirza_room',
  },

  door_to_stable: {
    objectId: 'door_to_stable',
    role: 'Navigation',
    changesScene: 'stable',
  },

  door_to_alley: {
    objectId: 'door_to_alley',
    role: 'Navigation',
    changesScene: 'outer_alley',
  },

  // --- Mirza's Room ---
  obj_wall_writing: {
    objectId: 'obj_wall_writing',
    role: 'Evidence',
    discoversEvidence: 'ev_fake_writing',
    evidenceNotice: 'سرنخ مشکوک: نوشته روی دیوار ساختگی است!',
    handler: (state) => {
      // Khan-Kholeh's initial hasty inference if not visited yet
      const updates: Partial<GameState> = {};
      if (!state.storyFlags.khan_misjudgment_bandit_theory) {
        updates.storyFlags = {
          ...state.storyFlags,
          khan_misjudgment_bandit_theory: true,
        };
        updates.journal = [
          ...state.journal,
          {
            id: 'journal_misjudgment_bandit',
            category: 'notes',
            title: 'تئوری اولیه خانخله: حمله راهزنان',
            content: 'خانخله با دیدن دست‌خط شتاب‌زده دیوار و پنجره باز، حدس زد راهزنان بیابان میرزا را به اسارت برده‌اند.',
            timestamp: 'لحظاتی پیش',
          },
        ];
      }
      return { stateUpdates: updates };
    },
    inspectModal: {
      title: 'نوشته روی دیوار گلی',
      description: 'با خطی شتاب‌زده با زغال حک شده: «حساب، خودش را پس میگیرد».',
      subtext: 'خانخله: «میرزا حتی روی سیاهه نمک و فلفل قلم تعلیق می‌زد. این خط زمخت کار یه آدم کم‌سواد و دستپاچه‌ست که خواسته صحنه رو کینه‌توزانه جلوه بده.»',
    },
  },

  obj_window: {
    objectId: 'obj_window',
    role: 'Puzzle',
    discoversEvidence: 'ev_window_dust',
    evidenceNotice: 'کشف شد: گرد و خاک لبه پنجره دستکاری شده!',
    inspectModal: {
      title: 'پنجره چوبی رو به کوچه پشتی',
      description: 'لبه گلی پنجره خراشیده شده و خاک روی آن به هم خورده است. لولای چوبی پنجره به زور باز شده است.',
      subtext: 'خانخله: «پنجره رو نه نسیم باز کرده، نه مهتاب. یکی تنه‌اش رو داده به این چوب‌ها و پریده بیرون.»',
    },
  },

  obj_window_nail_thread: {
    objectId: 'obj_window_nail_thread',
    role: 'Item',
    givesItem: 'red_thread',
    itemPickupNotice: 'نخ قرمز ابریشمی از روی میخ پنجره برداشته شد.',
  },

  obj_desk: {
    objectId: 'obj_desk',
    role: 'Lore',
    inspectModal: {
      title: 'میز کار میرزا صفدر',
      description: 'میز کوتاه چوبی پر از دوات خشکیده، قلم‌نی‌های شکسته و ورق‌های پراکنده. فنجان چای دست‌نخورده و دفتر قطوری روی آن به چشم می‌خورد.',
      subtext: 'خانخله: «میرزا آدم نظیفی بود... معلومه قبل از رفتن یا بردنش، وقت جمع کردن خرت و پرت‌هاش رو نداشته.»',
    },
  },

  obj_tea_cup: {
    objectId: 'obj_tea_cup',
    role: 'Evidence',
    discoversEvidence: 'ev_cold_tea',
    evidenceNotice: 'کشف شد: فنجان چای دست‌نخورده و سرد است!',
    inspectModal: {
      title: 'فنجان چای سرد',
      description: 'استکان تا لبه پر از چای کهنه و سیاه است، اما نعلبکی خشک است و لب به آن نزده‌اند.',
      subtext: 'خانخله: «میرزا حتی وقت نکرده قند رو تو استکان بندازه. ماجرا اونقدری ناگهانی بوده که چای گرمش یخ زده.»',
    },
  },

  obj_account_ledger: {
    objectId: 'obj_account_ledger',
    role: 'Item',
    givesItem: 'account_ledger',
    itemPickupNotice: 'دفتر حساب میرزا صفدر برداشته شد.',
  },

  obj_holed_coin: {
    objectId: 'obj_holed_coin',
    role: 'Item',
    givesItem: 'coin_hole',
    discoversEvidence: 'ev_holed_coin',
    evidenceNotice: 'کشف شد: سکه سوراخ‌شده با نشان کاروان شتران سرخ!',
    itemPickupNotice: 'سکه سوراخ‌شده از زیر تخته‌های میز برداشته شد.',
  },

  obj_bed: {
    objectId: 'obj_bed',
    role: 'Lore',
    inspectModal: {
      title: 'تخت خواب میرزا',
      description: 'لحاف کرباسی پس زده شده و متکا کج شده است. نشانی از خون یا درگیری مرگبار دیده نمی‌شود.',
      subtext: 'خانخله: «خونی در کار نبوده. یا با پای خودش رفته، یا با شمشیر زیر گلوش بدرقه‌ش کردن.»',
    },
  },

  obj_chest: {
    objectId: 'obj_chest',
    role: 'Puzzle',
    handler: (state) => {
      if (!state.inventory.includes('torn_cloth') && !state.inventory.includes('cloth_with_thread')) {
        return {
          stateUpdates: {
            inventory: [...state.inventory, 'torn_cloth'],
          },
          playItemSound: true,
          toastMessage: 'تکه پارچه پاره‌شده از گوشه صندوق برداشته شد.',
        };
      }
      return {
        stateUpdates: {
          inspectModal: {
            title: 'صندوقچه چوبی میرزا',
            description: 'صندوق خالی است و تمام لباس‌های اضافی و وسایل باارزش جابه‌جا شده است.',
            subtext: 'خانخله: «چیز دندون‌گیری تو این صندوق نمونده جز خاک بیابون.»',
          },
        },
      };
    },
  },

  obj_hearth_charcoal: {
    objectId: 'obj_hearth_charcoal',
    role: 'Item',
    givesItem: 'charcoal_stick',
    itemPickupNotice: 'تکه زغال نیم‌سوز از اجاق برداشته شد.',
  },

  door_back_to_courtyard: {
    objectId: 'door_back_to_courtyard',
    role: 'Navigation',
    changesScene: 'courtyard',
  },

  // --- Stable ---
  npc_morteza_stable: {
    objectId: 'npc_morteza_stable',
    role: 'Character Interaction',
    startsDialogue: {
      npcId: 'morteza',
      nodeId: 'morteza_root',
    },
  },

  obj_morteza_boots: {
    objectId: 'obj_morteza_boots',
    role: 'Evidence',
    discoversEvidence: 'ev_morteza_boots',
    evidenceNotice: 'کشف شد: تناقض چکمه‌های گل‌آلود حاج مرتضی!',
    inspectModal: {
      title: 'چکمه‌های گران‌قیمت حاج مرتضی',
      description: 'پای چکمه‌های چرم ساغری با خاک رس سرخ و خشکیده مسافرخانه پوشیده شده است. در حالی که او ادعا می‌کند دیشب فرسنگ‌ها دورتر در ده بالا بوده است!',
      subtext: 'خانخله: «پای حاج‌آقا توی گِل حیاط گیر کرده، ولی زبونش از زهد و ده بالا می‌گه. این چکمه مدرک زنده دروغشه!»',
    },
  },

  obj_horses: {
    objectId: 'obj_horses',
    role: 'Lore',
    inspectModal: {
      title: 'اسب‌ها و قاطرهای بارکش',
      description: 'قاطرهای قوی‌هیکل با زین‌های خاکی که به تیرک بسته شده‌اند و از توبره کاه می‌خورند.',
      subtext: 'خانخله: «حیوان زبون‌بسته لااقل سرش به یونجه خودشه، نه مثل آدم‌ها به مال غارت‌شده مردم.»',
    },
  },

  obj_leather_harness: {
    objectId: 'obj_leather_harness',
    role: 'Lore',
    inspectModal: {
      title: 'یراق‌آلات و زین چرمی',
      description: 'تسمه‌ها و دهنه‌های چرمی روغنی که از سقف آویزان شده‌اند.',
      subtext: 'خانخله: «چرم خوبیه، ولی به درد حل معمای ما نمی‌خوره.»',
    },
  },

  door_stable_to_courtyard: {
    objectId: 'door_stable_to_courtyard',
    role: 'Navigation',
    changesScene: 'courtyard',
  },

  // ========================================================
  // ACT 2 INTERACTIONS
  // ========================================================

  // --- Mirza Room (Act 2) ---
  obj_act2_desk_ledger: {
    objectId: 'obj_act2_desk_ledger',
    role: 'Puzzle',
    handler: (state) => {
      const updates: Partial<GameState> = {};
      const newInv = [...state.inventory];
      if (!newInv.includes('ledger_act2_raw') && !newInv.includes('reconstructed_ledger_act2')) {
        newInv.push('ledger_act2_raw');
        updates.inventory = newInv;
      }
      return {
        stateUpdates: updates,
        toastMessage: 'دفترچه دستکاری‌شده میرزا بررسی و به کوله‌پشتی اضافه شد.',
        playEvidenceSound: true,
      };
    },
    discoversEvidence: 'ev_act2_razor_cut_pages',
    inspectModal: {
      title: 'دفترچه بریده‌شده میرزا صفدر',
      description: 'رد تیغ دباغی بسیار ظریفی روی عطف دفتر به جا مانده است؛ صفحات شماره ۹ تا ۱۲ بریده شده‌اند. اما در صفحات سفید پایانی، شیارهای عمیق ناشی از فشار قلم‌نی میرزا بر کاغذ آهارمهره اصفهان قابل مشاهده است!',
      subtext: 'خانخله: «جوهر رو پاک کردی یا صفحه رو بریدی، اما قلم‌نی میرزا عمیق‌تر از تیغ تو به تن این کاغذ فرو رفته! اگه روش سایه بزنیم، خطوط خودشون رو نشون میدن.»',
    },
  },

  obj_act2_oil_lamp: {
    objectId: 'obj_act2_oil_lamp',
    role: 'Puzzle',
    inspectModal: {
      title: 'چراغ‌موشی سفالی',
      description: 'شعله چراغ ملایم است و بوی روغن پیه می‌دهد. برای دیدن خطوط مورب یا آزمایش گرما روی کاغذ به کار می‌آید.',
      subtext: 'خانخله: «حرارت ملایم شاید جوهر لیمو رو بسوزونه، ولی بافت این کاغذ نشاسته‌ای با آتیش بازی نمی‌کنه.»',
    },
  },

  obj_act2_window_view: {
    objectId: 'obj_act2_window_view',
    role: 'Lore',
    inspectModal: {
      title: 'چشم‌انداز کوچه بازارچه',
      description: 'از لای پرده پنجره، راسته بازارچه آبادی و گنبدهای خشتی پیداست. همهمه مسافران و بوی روناس و ادویه به مشام می‌رسد.',
      subtext: 'خانخله: «آبادی بیدار شده... همه دنبال روزی خودشونن، غافل از این‌که چه توطئه‌ای زیر گوششون خوابیده.»',
    },
  },

  door_mirza_to_bazaar: {
    objectId: 'door_mirza_to_bazaar',
    role: 'Navigation',
    changesScene: 'bazaar',
  },

  door_act2_to_inn_courtyard: {
    objectId: 'door_act2_to_inn_courtyard',
    role: 'Navigation',
    changesScene: 'courtyard',
  },

  // --- Bazaar ---
  npc_qasem_bazaar: {
    objectId: 'npc_qasem_bazaar',
    role: 'Character Interaction',
    startsDialogue: {
      npcId: 'qasem',
      nodeId: 'qasem_root',
    },
  },

  npc_mahbanoo_bazaar: {
    objectId: 'npc_mahbanoo_bazaar',
    role: 'Character Interaction',
    startsDialogue: {
      npcId: 'mahbanoo',
      nodeId: 'mahbanoo_root',
    },
  },

  obj_madder_dye_vats: {
    objectId: 'obj_madder_dye_vats',
    role: 'Evidence',
    discoversEvidence: 'ev_act2_red_felt_sacks',
    givesItem: 'red_madder_fiber',
    itemPickupNotice: 'الیاف پشم رنگ‌شده با روناس به کوله‌پشتی اضافه شد.',
    inspectModal: {
      title: 'دیگ‌های روناس و کلاف‌های سرخ',
      description: 'رنگدانه‌های ارغوانی-سرخ روناس با لعاب زاج سفید روی الیاف نمد نشسته است؛ دقیقاً همان جنس و رنگی که روی صندوق‌ها کشیده شده بود.',
      subtext: 'خانخله: «این سرخی چشم‌نواز کار دست مه‌بانوئه... بوی روناسش هنوز تازه است!»',
    },
  },

  door_bazaar_to_papermaker: {
    objectId: 'door_bazaar_to_papermaker',
    role: 'Navigation',
    changesScene: 'papermaker_shop',
  },

  door_bazaar_to_yaqub: {
    objectId: 'door_bazaar_to_yaqub',
    role: 'Navigation',
    changesScene: 'yaqub_house',
  },

  door_bazaar_to_mirza_room: {
    objectId: 'door_bazaar_to_mirza_room',
    role: 'Navigation',
    changesScene: 'mirza_room_act2',
  },

  // --- Papermaker Shop ---
  npc_sadiq_shop: {
    objectId: 'npc_sadiq_shop',
    role: 'Character Interaction',
    startsDialogue: {
      npcId: 'sadiq',
      nodeId: 'sadiq_root',
    },
  },

  obj_paper_drying_racks: {
    objectId: 'obj_paper_drying_racks',
    role: 'Evidence',
    discoversEvidence: 'ev_act2_paper_grain_sadiq',
    evidenceNotice: 'سرنخ ثبت شد: شناخت بافت کاغذ آهارمهره اصفهان!',
    inspectModal: {
      title: 'کاغذهای دست‌ساز آهارمهره',
      description: 'ورق‌های ضخیم پنبه‌ای با آهار نشاسته و مهره‌کشی سنگ یشم. این کاغذها فشار قلم را بدون پاره شدن لایه‌های زیرین در خود ثبت می‌کنند.',
      subtext: 'خانخله: «استخوان‌بندی این کاغذ مثل سنگه؛ قلم روش بلغزه شیارش ابدی میشه!»',
    },
  },

  obj_sadiq_charcoal_tray: {
    objectId: 'obj_sadiq_charcoal_tray',
    role: 'Item',
    handler: (state) => {
      const updates: Partial<GameState> = {};
      const newInv = [...state.inventory];
      let added = false;
      if (!newInv.includes('charcoal_powder_sadiq') && !newInv.includes('shading_kit')) {
        newInv.push('charcoal_powder_sadiq');
        added = true;
      }
      if (!newInv.includes('camel_hair_brush') && !newInv.includes('shading_kit')) {
        newInv.push('camel_hair_brush');
        added = true;
      }
      if (added) {
        updates.inventory = newInv;
      }
      return {
        stateUpdates: updates,
        toastMessage: 'گرد دوده بید و قلم‌موی موی شتر برداشته شد.',
        playItemSound: true,
      };
    },
    inspectModal: {
      title: 'سینی ابزار سیاه‌مشق و پرداخت',
      description: 'ظرفی پر از گرد نرم دوده چوب بید و قلم‌موهای دست‌ساز با موی شتر صحرا.',
      subtext: 'خانخله: «این همون چیزیه که برای کشیدن خطوط غیبی دفتر میرزا لازم داریم!»',
    },
  },

  obj_calligraphy_press: {
    objectId: 'obj_calligraphy_press',
    role: 'Lore',
    inspectModal: {
      title: 'منگنه و پرس صحافی',
      description: 'دستگاه پرس چوب گردو با پیچ‌های بزرگ برای فرم‌دهی عطف کتاب‌ها و اوراق رسمی.',
      subtext: 'خانخله: «صادق هم برای خودش مهندسیه؛ اگر قالی نفروشه کتاب می‌بافه.»',
    },
  },

  door_papermaker_to_bazaar: {
    objectId: 'door_papermaker_to_bazaar',
    role: 'Navigation',
    changesScene: 'bazaar',
  },

  // --- Yaqub House ---
  npc_yaqub_dwelling: {
    objectId: 'npc_yaqub_dwelling',
    role: 'Character Interaction',
    startsDialogue: {
      npcId: 'yaqub',
      nodeId: 'yaqub_root',
    },
  },

  obj_yaqub_samovar: {
    objectId: 'obj_yaqub_samovar',
    role: 'Lore',
    inspectModal: {
      title: 'سماور ورشویی یعقوب',
      description: 'آهنگ ملایم جوشیدن قطرات آب در مخزن سماور؛ یعقوب با ریتم این صدا آرامش می‌گیرد.',
      subtext: 'خانخله: «پیرمرد جهانش رو با صداها چیده... هر قلپی از این سماور براش یه زنگ ساعته.»',
    },
  },

  obj_singing_bowls: {
    objectId: 'obj_singing_bowls',
    role: 'Puzzle',
    customSound: 'doorCreak',
    inspectModal: {
      title: 'کاسه‌های صوتی و زنگوله‌های یعقوب',
      description: 'کاسه‌های برنجی و زنگوله‌های گوناگون که با ضربه چوبی مرتعش می‌شوند. طنین زنگوله‌های اصیل برنجی کاروان با زنگوله‌های حلبی بسیار متفاوت است.',
      subtext: 'خانخله: «ضربه به برنج طنین کشیده میده... اما آهن حلبی فقط تق‌تق می‌کنه. کلید تناقض حرف‌های یعقوب اینجاست!»',
    },
  },

  door_yaqub_to_courtyard: {
    objectId: 'door_yaqub_to_courtyard',
    role: 'Navigation',
    changesScene: 'yaqub_courtyard',
  },

  door_yaqub_to_bazaar: {
    objectId: 'door_yaqub_to_bazaar',
    role: 'Navigation',
    changesScene: 'bazaar',
  },

  // --- Yaqub Courtyard ---
  obj_courtyard_soft_sand: {
    objectId: 'obj_courtyard_soft_sand',
    role: 'Evidence',
    discoversEvidence: 'ev_act2_camel_tracks_missing',
    evidenceNotice: 'سرنخ ثبت شد: فقدان رد سم شتر در ریگزار کوچه!',
    inspectModal: {
      title: 'ریگزار نرم و دست‌نخورده کوچه',
      description: 'خاک نرم این کوچه هیچ رد پایی از کاروان شتران ۲۰ نفره نشان نمی‌دهد؛ تنها رد چرخ‌های باریک یک گاری دستی سبک به جا مانده است.',
      subtext: 'خانخله: «یعقوب گفت ۲۰ تا شتر... ولی خاک میگه حتی یه شتر یک‌کوهانه هم از اینجا رد نشده! گوش‌های پیرمرد فریب خورده.»',
    },
  },

  obj_hidden_iron_bell: {
    objectId: 'obj_hidden_iron_bell',
    role: 'Puzzle',
    givesItem: 'iron_clapper_bell',
    discoversEvidence: 'ev_act2_iron_clapper_sound',
    itemPickupNotice: 'زنگوله با زبانه لق آهنی برداشته شد!',
    inspectModal: {
      title: 'زنگوله حلبی با زبانه لقّ آهنی',
      description: 'زنگوله‌ای سبک و زنگ‌زده که در بوته‌های خار پنهان شده بود. زبانه‌اش آهن لق است و صدایی خشک، توخالی و مقطع تولید می‌کند.',
      subtext: 'خانخله: «این همون ابزار صداسازیه! با تکان دادن این حلبی، صدای کاروان شتران رو جعل کردن تا یعقوب فکر کنه شترها به سمت قنات رفتن!»',
    },
  },

  obj_dry_basin: {
    objectId: 'obj_dry_basin',
    role: 'Lore',
    inspectModal: {
      title: 'حوضچه خشکیده فیروزه‌ای',
      description: 'حوضچه‌ای قدیمی با کاشی‌های دوره صفوی که سال‌هاست آبی به خود ندیده است.',
      subtext: 'خانخله: «آبادی وقتی آبش خشک بشه، آدم‌هاش هم مثل ریگ خشک و خشن میشن.»',
    },
  },

  door_courtyard_to_house: {
    objectId: 'door_courtyard_to_house',
    role: 'Navigation',
    changesScene: 'yaqub_house',
  },

  door_courtyard_to_qanat: {
    objectId: 'door_courtyard_to_qanat',
    role: 'Navigation',
    changesScene: 'qanat_entrance',
  },

  // --- Qanat Entrance ---
  obj_qanat_mouth: {
    objectId: 'obj_qanat_mouth',
    role: 'Evidence',
    discoversEvidence: 'ev_act2_qanat_airshaft_echo',
    evidenceNotice: 'سرنخ ثبت شد: پژواک توخالی میله‌های قنات متروک!',
    inspectModal: {
      title: 'دهانه تاریک قنات متروک',
      description: 'بادی سرد و بوی خاکستر و گوگرد از دالان‌های عمیق زیرزمینی قنات به بیرون می‌وزد. صدای عبور آب شنیده نمی‌شود.',
      subtext: 'خانخله: «قنات خشکه، ولی ردپای موش‌های دوپا همه‌جا ریخته. کسی صندوق‌ها رو این پایین نکشیده...»',
    },
  },

  obj_qanat_brickwork: {
    objectId: 'obj_qanat_brickwork',
    role: 'Item',
    givesItem: 'qanat_copper_token',
    discoversEvidence: 'ev_act2_copper_token_cipher',
    itemPickupNotice: 'پلاک مسین سرّی «خزانهٔ باد» پیدا شد!',
    inspectModal: {
      title: 'پلاک مسین ضرابخانه سرّی',
      description: 'پلاک مسی اکسیدشده با نشان عقاب دو سر و هفت ستاره. نام «خزانهٔ باد» با حروف ابجد بر آن حک شده است.',
      subtext: 'خانخله: «این پلاک مهر دیوانی داره! میرزا صفدر راز یک اختلاس بزرگ سلطنتی رو کشف کرده بود، نه چند من نمک و گندم کاروانسرا!»',
    },
  },

  obj_abandoned_wooden_chocks: {
    objectId: 'obj_abandoned_wooden_chocks',
    role: 'Lore',
    inspectModal: {
      title: 'تیرک‌های چوبی و اهرم‌های بارکشی',
      description: 'الوارهای کاج که برای مهار کردن صندوق‌ها در دهانه قنات چیده شده بودند اما دست‌نخورده رها شده‌اند.',
      subtext: 'خانخله: «کسی زحمت بردن این بارها به عمق قنات رو به خودش نداده... همه چیز یک نمایش برای خریدن وقت بوده!»',
    },
  },

  door_qanat_to_yaqub_courtyard: {
    objectId: 'door_qanat_to_yaqub_courtyard',
    role: 'Navigation',
    changesScene: 'yaqub_courtyard',
  },
};
