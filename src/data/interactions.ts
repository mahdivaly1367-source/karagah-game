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
    handler: (state) => ({
      stateUpdates: {
        currentScene: (state.act === 2 || state.storyFlags?.act2_started) ? 'mirza_room_act2' : 'mirza_room',
      },
    }),
  },

  door_courtyard_to_bazaar: {
    objectId: 'door_courtyard_to_bazaar',
    role: 'Navigation',
    changesScene: 'bazaar',
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
      updates.evidence = {
        ...state.evidence,
        ev_act2_razor_cut_pages: true,
        ev_act2_pen_indentation: true,
      };
      return {
        stateUpdates: updates,
        toastMessage: 'دفترچه دستکاری‌شده میرزا بررسی و به کوله‌پشتی اضافه شد.',
        playEvidenceSound: true,
      };
    },
    discoversEvidence: 'ev_act2_razor_cut_pages',
    inspectModal: {
      title: 'دفترچه بریده‌شده میرزا صفدر',
      description: 'رد تیغ دباغی بسیار ظریفی روی عطف دفتر به جا مانده است؛ صفحات شماره ۹ تا ۱۲ بریده شده‌اند. اما در صفحات سفید پایانی، شیارهای عمیق ناشی از فشار قلم‌نی میرزا بر کاغذ آهارمهره اصفهان به وضوح حس می‌شود!',
      subtext: 'خانخله: «جوهر رو پاک کردی یا صفحه رو بریدی، اما قلم‌نی میرزا عمیق‌تر از تیغ تو به تن این کاغذ فرو رفته! اگه روش سایه بزنیم، خطوط خودشون رو نشون میدن.»',
    },
  },

  obj_act2_oil_lamp: {
    objectId: 'obj_act2_oil_lamp',
    role: 'Puzzle',
    discoversEvidence: 'ev_act2_pen_indentation',
    evidenceNotice: 'سرنخ آشکار شد: نور مایل چراغ‌موشی شیارهای فشار قلم‌نی را نشان داد!',
    inspectModal: {
      title: 'چراغ‌موشی سفالی و زاویه نور مایل',
      description: 'با نزدیک کردن شعله چراغ‌موشی با زاویه مایل به صفحات سفید دفترچه، سایه‌های ریزی در دل شیارهای عمیق قلم‌نی پدیدار می‌شود که گواه حک شدن متنی زیرین است.',
      subtext: 'خانخله: «نور کج چراغ سایه میندازه روی چاله‌های قلم‌نی میرزا. نوشته‌ای زیر این سفیدی دفن شده که با سایه‌زنی دوده زنده میشه!»',
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
    handler: (state) => {
      const hasSolvedLedger = !!state.puzzleFlags.empty_ledger_act2_solved;
      const hasSolvedSound = !!state.puzzleFlags.yaqub_sound_puzzle_solved;
      const hasToken = !!state.evidence.ev_act2_copper_token_cipher || state.inventory.includes('qanat_copper_token');

      if (hasSolvedLedger && hasSolvedSound && hasToken) {
        return {
          stateUpdates: {
            currentScene: 'act2_outro',
            storyFlags: {
              ...state.storyFlags,
              act2_completed: true,
            },
            evidence: {
              ...state.evidence,
              ev_act2_qanat_airshaft_echo: true,
            }
          },
          toastMessage: 'تکه‌های معما کنار هم قرار گرفتند: راز پرده دوم فاش شد!',
          playPuzzleSound: true,
        };
      }

      let missingMsg = '';
      if (!hasSolvedLedger) {
        missingMsg = 'هنوز راز دستکاری صفحات دفترچه سفید میرزا را آشکار نکرده‌ای (به سایه‌زنی با دوده نیاز داری).';
      } else if (!hasSolvedSound) {
        missingMsg = 'هنوز فریب صوتی کاروان شتران را به یعقوب نابینا ثابت نکرده‌ای.';
      } else if (!hasToken) {
        missingMsg = 'هنوز آجرچینی مظهر قنات را برای یافتن نشان پنهان به دقت نگشته‌ای.';
      }

      return {
        stateUpdates: {
          evidence: {
            ...state.evidence,
            ev_act2_qanat_airshaft_echo: true,
          },
          inspectModal: {
            title: 'دهانه تاریک قنات متروک',
            description: `بادی سرد و بوی خاکستر از دالان‌های عمیق قنات زوزه می‌کشد. شواهد نشان می‌دهد که نقشه غارت ساختگی بوده است، اما هنوز پازل کامل نشده است.\n\n[راهنمایی خانخله: ${missingMsg}]`,
            subtext: 'خانخله: «باید دست پر باشم تا بتونم تو دهن این دزدها و رمال‌ها بزنم. بریم بقیه شواهد رو جمع کنیم!»',
          }
        },
        toastMessage: 'سرنخ ثبت شد: پژواک توخالی میله‌های قنات متروک',
        playEvidenceSound: true,
      };
    },
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

  // -------------------------------------------------------------
  // ACT 3: OLD BRIDGE (پل سنگی قدیمی)
  // -------------------------------------------------------------
  npc_heydar_bridge: {
    objectId: 'npc_heydar_bridge',
    role: 'Character Interaction',
    startsDialogue: {
      npcId: 'heydar',
      nodeId: 'heydar_root',
    },
  },

  obj_bridge_parapet: {
    objectId: 'obj_bridge_parapet',
    role: 'Evidence',
    discoversEvidence: 'ev_act3_underbridge_wire_cable',
    inspectModal: {
      title: 'کنگره‌های سنگی پل و سایش کابل',
      description: 'لبه سنگ‌های تراش‌خورده پل دچار خوردگی و سایش عمیق ناشی از کشیده شدن کابل‌های فلزی سنگین شده است. کسی بارهای سنگین را با کابل از آب بالا می‌کشیده است.',
      subtext: 'خانخله: «این سایش کار دیروز و امروز نیست؛ ماه‌هاست که شبانه بار از این آب بالا می‌کشیدن!»',
    },
  },

  obj_heydar_lantern: {
    objectId: 'obj_heydar_lantern',
    role: 'Lore',
    inspectModal: {
      title: 'فانوس دودزده دیده‌بان',
      description: 'فانوس برنجی سنگین که بوی پیه گرگ و روغن چرخ از آن بلند می‌شود.',
      subtext: 'خانخله: «فانوس روشنه، یعنی دیده‌بان تمام شب بیدار بوده و همه‌چیز رو دیده!»',
    },
  },

  path_bridge_to_under: {
    objectId: 'path_bridge_to_under',
    role: 'Navigation',
    changesScene: 'under_bridge',
  },

  path_bridge_to_checkpoint: {
    objectId: 'path_bridge_to_checkpoint',
    role: 'Navigation',
    changesScene: 'road_checkpoint',
  },

  path_bridge_to_river: {
    objectId: 'path_bridge_to_river',
    role: 'Navigation',
    changesScene: 'river_bank',
  },

  // -------------------------------------------------------------
  // ACT 3: UNDER BRIDGE (زیر طاق‌های پل سنگی)
  // -------------------------------------------------------------
  obj_underbridge_winch: {
    objectId: 'obj_underbridge_winch',
    role: 'Puzzle',
    handler: (state: GameState) => {
      const hasHandle = state.inventory.includes('winch_crank_handle');
      const isRepaired = !!state.puzzleFlags.winch_repaired;

      if (isRepaired) {
        return {
          inspectModal: {
            title: 'وینچ راه‌اندازی‌شده زیر پل',
            description: 'دسته چدنی در جای خود محکم شده و کابل‌های فولادی بیرون کشیده شده‌اند. محل صید پنهان شمش‌ها کاملاً آشکار است.',
            subtext: 'خانخله: «دستگاه آماده است؛ فقط باید اعتراف حیدر رو بگیریم.»',
          }
        };
      }

      if (hasHandle) {
        return {
          stateUpdates: {
            inventory: state.inventory.filter(id => id !== 'winch_crank_handle'),
            puzzleFlags: {
              ...state.puzzleFlags,
              winch_repaired: true,
              underbridge_mechanism_revealed: true,
            },
            evidence: {
              ...state.evidence,
              ev_act3_underbridge_wire_cable: true,
            },
            inspectModal: {
              title: 'راه‌اندازی وینچ و بالا کشیدن کابل‌ها',
              description: 'دسته چدنی را در محور پیچاندی و با صدای غرش چرخ‌دنده‌ها، کابل‌های بافته فولادی و سبد فلزی از عمق گرداب بیرون کشیده شد!',
              subtext: 'خانخله: «این تور صید نهنگه نه ماهی قزل‌آلا! ایستگاه بارگیری سرّی زیر پایه‌های پل کشف شد!»',
            }
          },
          toastMessage: 'وینچ راه اندازی شد و کابل‌های فولادی بالا کشیده شدند!',
          playEvidenceSound: true,
        };
      }

      return {
        inspectModal: {
          title: 'وینچ چدنی بدون دسته',
          description: 'محور وینچ سنگین زیر پل بدون دسته چدنی خود قفل شده است. دسته گرداننده باید در حوالی پاسگاه یا انبارهای اطراف باشد.',
          subtext: 'خانخله: «بدون اهرم نمی‌شه چرخ‌دنده‌ها رو گردوند؛ باید دسته رو پیدا کنم.»',
        }
      };
    },
  },

  obj_bridge_arches_chain: {
    objectId: 'obj_bridge_arches_chain',
    role: 'Evidence',
    discoversEvidence: 'ev_act3_underbridge_wire_cable',
    inspectModal: {
      title: 'کابل‌های معلق در آب خروشان',
      description: 'رشته‌های کابل سیمی بافته‌شده و تسمه‌های بارکش که به پایه‌های سنگی زیر پل متصل شده‌اند.',
      subtext: 'خانخله: «این تور صید نهنگه نه قزل‌آلا! زیر پایه‌های پل ایستگاه بارگیری سرّی ساخته بودن!»',
    },
  },

  obj_heydar_toolbox: {
    objectId: 'obj_heydar_toolbox',
    role: 'Item',
    givesItem: 'heydar_wire_fragment',
    itemPickupNotice: 'تکه سیم بافته‌شده فولادی از جعبه ابزار حیدر برداشته شد!',
    inspectModal: {
      title: 'جعبه ابزار فلزی حیدر',
      description: 'تکه‌های سیم فولادی بریده‌شده با همان بافت کابل‌های زیر پل.',
      subtext: 'خانخله: «دقیقاً همان آلیاژ سیمی که به وینچ بسته شده؛ حیدر خودش کابل‌ها رو تعمیر می‌کرده!»',
    },
  },

  path_under_to_bridge: {
    objectId: 'path_under_to_bridge',
    role: 'Navigation',
    changesScene: 'old_bridge',
  },

  path_under_to_river: {
    objectId: 'path_under_to_river',
    role: 'Navigation',
    changesScene: 'river_bank',
  },

  // -------------------------------------------------------------
  // ACT 3: RIVER BANK (کناره و ساحل رودخانه)
  // -------------------------------------------------------------
  obj_river_current_whirlpool: {
    objectId: 'obj_river_current_whirlpool',
    role: 'Puzzle',
    handler: (state: GameState) => {
      const hasFloat = state.inventory.includes('water_plummet_float');
      const isCalculated = !!state.puzzleFlags.river_flow_calculated;

      if (isCalculated) {
        return {
          inspectModal: {
            title: 'خط سیر اثبات‌شده گرداب و آبراهه',
            description: 'مسیر حرکت آب از ناودانی انبار بالادست شروع شده، به زیر پل می‌رسد و سپس مستقیماً به دریچه آبگیر آسیاب ماه‌نگار می‌ریزد.',
            subtext: 'خانخله: «هیدرولیک کویر هیچ دروغی رو پنهان نمی‌کنه!»',
          }
        };
      }

      if (hasFloat) {
        return {
          stateUpdates: {
            inventory: state.inventory.filter(id => id !== 'water_plummet_float'),
            puzzleFlags: {
              ...state.puzzleFlags,
              river_flow_calculated: true,
            },
            evidence: {
              ...state.evidence,
              ev_act3_river_drift_calculation: true,
            },
            inspectModal: {
              title: 'ردگیری مسیر جریان با شناور شاغول‌دار',
              description: 'شناور شاغول‌دار در خط اصلی گرداب رها شد. آب آن را شتابان از زیر طاق میانی پل به سمت دریچه آبگیر سنگ‌آسیاب ماه‌نگار کشاند!',
              subtext: 'خانخله: «همه چیز مثل زنجیر به هم وصله؛ استوانه‌ای که از تور در رفته، مستقیم رفته لای پره‌های آسیاب!»',
            }
          },
          toastMessage: 'مسیر جریان هیدرولیکی رودخانه کشف و اثبات شد!',
          playEvidenceSound: true,
        };
      }

      return {
        inspectModal: {
          title: 'گرداب تند صخره‌های ساحلی',
          description: 'آب با شتاب زیاد می‌چرخد. برای فهمیدن مسیر دقیق حرکت اشیا در این عمق، به یک شناور یا شاغول صیادی نیاز داری.',
          subtext: 'خانخله: «عمو صفر ماهیگیر حتماً ابزار مناسبی برای رصد جریان آب داره.»',
        }
      };
    },
  },

  obj_river_reeds_driftwood: {
    objectId: 'obj_river_reeds_driftwood',
    role: 'Lore',
    inspectModal: {
      title: 'نیزارهای وحشی و کنده گیرکرده',
      description: 'نی‌های بلند و گل‌آلود ساحل که رد آب‌بردگی اجسام را نشان می‌دهند.',
      subtext: 'خانخله: «رد آب همه چیز رو شسته، اما خط جریان به سمت آسیاب میره.»',
    },
  },

  path_river_to_hut: {
    objectId: 'path_river_to_hut',
    role: 'Navigation',
    changesScene: 'fisherman_hut',
  },

  path_river_to_mill: {
    objectId: 'path_river_to_mill',
    role: 'Navigation',
    changesScene: 'water_mill',
  },

  path_river_to_bridge: {
    objectId: 'path_river_to_bridge',
    role: 'Navigation',
    changesScene: 'old_bridge',
  },

  // -------------------------------------------------------------
  // ACT 3: FISHERMAN HUT (کلبه عمو صفر ماهیگیر)
  // -------------------------------------------------------------
  npc_safar_fisherman: {
    objectId: 'npc_safar_fisherman',
    role: 'Character Interaction',
    startsDialogue: {
      npcId: 'safar',
      nodeId: 'safar_root',
    },
  },

  obj_safar_fish_nets: {
    objectId: 'obj_safar_fish_nets',
    role: 'Evidence',
    discoversEvidence: 'ev_act3_safar_fish_reality',
    inspectModal: {
      title: 'تورهای کهنه کنفی ماهیگیر',
      description: 'تورهای سنتی و سبک صیادی با منافذ درشت نخی؛ کاملاً متفاوت با سیم‌های صنعتی زیر پل!',
      subtext: 'خانخله: «تور واقعی صیادی اینه! نه سیم بوکسل فولادی حیدرِ پل!»',
    },
  },

  obj_safar_plummet: {
    objectId: 'obj_safar_plummet',
    role: 'Item',
    givesItem: 'water_plummet_float',
    itemPickupNotice: 'شناور شاغول‌دار عمو صفر برداشته شد!',
    inspectModal: {
      title: 'شناور شاغول‌دار صیاد',
      description: 'ابزار سنتی برای ردگیری جریان عمقی آب و یافتن گرداب‌ها.',
      subtext: 'خانخله: «با این شناور می‌تونیم دقیقاً ببینیم آب چی رو تا کجا می‌بره!»',
    },
  },

  door_hut_to_river: {
    objectId: 'door_hut_to_river',
    role: 'Navigation',
    changesScene: 'river_bank',
  },

  // -------------------------------------------------------------
  // ACT 3: WATER MILL (آسیاب آبی ماه‌نگار)
  // -------------------------------------------------------------
  npc_mahnegar_mill: {
    objectId: 'npc_mahnegar_mill',
    role: 'Character Interaction',
    startsDialogue: {
      npcId: 'mahnegar',
      nodeId: 'mahnegar_root',
    },
  },

  obj_mill_waterwheel: {
    objectId: 'obj_mill_waterwheel',
    role: 'Evidence',
    discoversEvidence: 'ev_act3_mill_jam_record',
    inspectModal: {
      title: 'پره چوبی شکسته چرخ آسیاب',
      description: 'اثر برخورد جسم سنگین فلزی در ساعت دو بامداد بر پره بلوطی چرخ به وضوح پیداست.',
      subtext: 'خانخله: «ضربه مهیب یک جسم سربی سنگین؛ ساعت دقیقاً دو بامداد ثبت شده!»',
    },
  },

  obj_mill_sluice_gate: {
    objectId: 'obj_mill_sluice_gate',
    role: 'Item',
    givesItem: 'zinc_fish_cylinder',
    discoversEvidence: 'ev_act3_zinc_fish_cylinder',
    itemPickupNotice: 'استوانه رویین شمش‌ها (ماهی فلزی) از لجن‌گیر آسیاب خارج شد!',
    inspectModal: {
      title: 'استوانه رویین ممهور',
      description: 'استوانه فلزی ضدآب با موم سرخ درباری و نقش مهر دیوان سلطنتی.',
      subtext: 'خانخله: «این همون ماهی پرنده حیدره! استوانه‌ای برای غوطه‌ور ساختن شمش‌های طلا در آب!»',
    },
  },

  path_mill_to_river: {
    objectId: 'path_mill_to_river',
    role: 'Navigation',
    changesScene: 'river_bank',
  },

  path_mill_to_warehouse: {
    objectId: 'path_mill_to_warehouse',
    role: 'Navigation',
    changesScene: 'abandoned_warehouse',
  },

  // -------------------------------------------------------------
  // ACT 3: ROAD CHECKPOINT (پاسگاه راه و راه‌بند)
  // -------------------------------------------------------------
  npc_bahram_guard: {
    objectId: 'npc_bahram_guard',
    role: 'Character Interaction',
    startsDialogue: {
      npcId: 'bahram',
      nodeId: 'bahram_root',
    },
  },

  npc_gholi_runner: {
    objectId: 'npc_gholi_runner',
    role: 'Character Interaction',
    startsDialogue: {
      npcId: 'gholi',
      nodeId: 'gholi_root',
    },
  },

  obj_patrol_logbook: {
    objectId: 'obj_patrol_logbook',
    role: 'Evidence',
    discoversEvidence: 'ev_act3_bahram_patrol_log',
    inspectModal: {
      title: 'دفتر وقایع رسمی پاسگاه',
      description: 'گزارش رسمی نایب بهرام که با ادعای سکوت و آرامش مطلق در ساعت دو بامداد ثبت شده است.',
      subtext: 'خانخله: «وقتی همه جا بلوا بوده، نایب نوشته هیچ صدایی نیامده! دستش با دزدها تو یه کاسه است!»',
    },
  },

  obj_patrol_sacks: {
    objectId: 'obj_patrol_sacks',
    role: 'Item',
    givesItem: 'winch_crank_handle',
    itemPickupNotice: 'دسته آهنی وینچ پل در زیر گونی‌های پاسگاه کشف شد!',
    inspectModal: {
      title: 'دسته آهنی وینچ زیر گونی‌ها',
      description: 'اهرم چدنی گرداننده چرخ‌دنده‌های وینچ زیر پل که نایب بهرام آن را پنهان کرده بود.',
      subtext: 'خانخله: «مچت باز شد نایب! دسته وینچ رو اینجا قایم کردی تا کسی نتونه کابل‌ها رو بالا بکشه!»',
    },
  },

  obj_bahram_cupboard: {
    objectId: 'obj_bahram_cupboard',
    role: 'Evidence',
    discoversEvidence: 'ev_act3_bahram_bribe_toman',
    inspectModal: {
      title: 'گنجه مخفی نایب بهرام',
      description: 'کیسه‌های حاوی سکه‌های اشرفی نو با مهر دیوان که رشوه چشم‌پوشی نایب بهرام بوده است.',
      subtext: 'خانخله: «حق‌السکوت نایب بهرام برای بستن چشم‌هاش روی غارت شبانه!»',
    },
  },

  path_checkpoint_to_bridge: {
    objectId: 'path_checkpoint_to_bridge',
    role: 'Navigation',
    changesScene: 'old_bridge',
  },

  path_checkpoint_to_warehouse: {
    objectId: 'path_checkpoint_to_warehouse',
    role: 'Navigation',
    changesScene: 'abandoned_warehouse',
  },

  // -------------------------------------------------------------
  // ACT 3: ABANDONED WAREHOUSE (انبار متروک کاروان)
  // -------------------------------------------------------------
  obj_warehouse_camel_blanket: {
    objectId: 'obj_warehouse_camel_blanket',
    role: 'Item',
    givesItem: 'red_camel_blanket_scrap',
    discoversEvidence: 'ev_act3_warehouse_camels_harness',
    itemPickupNotice: 'نمد پشمی با داغ شتران سرخ کاروانسرا کشف شد!',
    inspectModal: {
      title: 'نمد پشمی شتران سرخ',
      description: 'تکه نمدی با داغ هفت ستاره کاروانسرای ریگستان که نشان می‌دهد شتران مستقیماً به این انبار آورده شده‌اند.',
      subtext: 'خانخله: «شترها هرگز ناپدید نشدن؛ یک‌راست اومدن به این انبار تا بارهاشون به آب ریخته بشه!»',
    },
  },

  obj_warehouse_culvert_stone: {
    objectId: 'obj_warehouse_culvert_stone',
    role: 'Evidence',
    discoversEvidence: 'ev_act3_secret_culvert_hatch',
    inspectModal: {
      title: 'دریچه ناودانی سنگی به رودخانه',
      description: 'آبراهه شیب‌دار زیر سنگ کف که شمش‌ها و استوانه‌ها را مستقیماً به جریان تند آب هدایت می‌کرده است.',
      subtext: 'خانخله: «بارها رو از اینجا سُر می‌دادن تو آبراهه تند، تا با جریان آب برسه زیر پل و تو تور حیدر بیفته!»',
    },
  },

  obj_warehouse_crates: {
    objectId: 'obj_warehouse_crates',
    role: 'Lore',
    inspectModal: {
      title: 'صندوق‌های چوبی خالی شکسته',
      description: 'صندوق‌هایی مشابه آنچه در کاروانسرا بود، اما اینجا در انبار تخلیه و به آب ریخته شده‌اند.',
      subtext: 'خانخله: «صندوق‌های سنگین قلابی در کاروانسرا موندن، و بار اصلی اینجا تو آب غوطه‌ور شده!»',
    },
  },

  obj_warehouse_reconstruction_spot: {
    objectId: 'obj_warehouse_reconstruction_spot',
    role: 'Puzzle',
    handler: (state: GameState) => {
      // Check if all 4 Act 3 contradictions are resolved and evidence collected
      const c1 = !!state.storyFlags.heydar_fish_lie_exposed;
      const c2 = !!state.storyFlags.underbridge_mechanism_revealed;
      const c3 = !!state.storyFlags.bahram_log_falsification_exposed;
      const c4 = !!state.storyFlags.gholi_prank_debunked;
      const confessed = !!state.storyFlags.heydar_fully_confessed;

      const solvedCount = [c1, c2, c3, c4].filter(Boolean).length;

      if (solvedCount < 4 || !confessed) {
        return {
          inspectModal: {
            title: 'میز بازسازی شواهد پرونده حیدرِ پل',
            description: `برای تکمیل بازسازی و اثبات کل زنجیره سرقت، باید تمام تناقض‌های پرده سوم را در دفترچه حل کنی و اعتراف حیدر را بگیری.\n\n[پیشرفت تناقض‌ها: ${solvedCount} از ۴]\n[وضعیت اعتراف حیدر: ${confessed ? 'انجام شده' : 'هنوز مقاومت می‌کند'}]`,
            subtext: 'خانخله: «قطعات هنوز چفت نشدن؛ اول باید دهن دروغگوها رو ببندیم!»',
          }
        };
      }

      // Ready for Act 3 Outro Climax!
      return {
        stateUpdates: {
          currentScene: 'act3_outro',
          storyFlags: {
            ...state.storyFlags,
            act3_completed: true,
          },
        },
        toastMessage: 'پرونده حیدرِ پل بسته شد! آغاز راز میرزا روشن...',
        playEvidenceSound: true,
      };
    },
  },

  path_warehouse_to_mill: {
    objectId: 'path_warehouse_to_mill',
    role: 'Navigation',
    changesScene: 'water_mill',
  },

  path_warehouse_to_checkpoint: {
    objectId: 'path_warehouse_to_checkpoint',
    role: 'Navigation',
    changesScene: 'road_checkpoint',
  },
};
