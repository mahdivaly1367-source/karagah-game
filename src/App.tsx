/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { 
  GameState, 
  SceneId, 
  InteractiveObject, 
  DialogueOption, 
  Item, 
  CursorType 
} from './types/game';
import { SCENES } from './data/scenes';
import { GAME_ITEMS } from './data/items';
import { GAME_EVIDENCE } from './data/evidence';
import { DIALOGUE_NODES } from './data/dialogues';
import { soundManager } from './systems/audio/soundManager';
import { SaveManager, SaveSlotData } from './systems/save/saveManager';

// Components
import { MainMenu } from './components/Menu/MainMenu';
import { SettingsModal } from './components/Menu/SettingsModal';
import { SaveLoadModal } from './components/Menu/SaveLoadModal';
import { IntroCinematic } from './components/GameCanvas/IntroCinematic';
import { GameScene } from './components/GameCanvas/GameScene';
import { OutroAct1 } from './components/GameCanvas/OutroAct1';
import { DialogueBox } from './components/Dialogue/DialogueBox';
import { InventoryBar } from './components/Inventory/InventoryBar';
import { InspectModal } from './components/Inventory/InspectModal';
import { JournalModal } from './components/Journal/JournalModal';
import { HintModal } from './components/HintSystem/HintModal';
import { TopBar } from './components/UI/TopBar';
import { NotificationToast } from './components/UI/NotificationToast';

const INITIAL_GAME_STATE: GameState = {
  currentScene: 'outer_alley',
  inventory: [],
  activeItemId: null,
  evidence: {},
  journal: [
    {
      id: 'init_note',
      category: 'notes',
      title: 'بیدار شدن زیر سایه درخت',
      content: 'صبح گرمی در کاروانسرای ریگستان. کاظم پادوی آبادی با چشمانی وحشت‌زده آمد و گفت میرزا صفدر غیبش زده.',
      timestamp: 'صبح اول وقت'
    }
  ],
  storyFlags: {
    intro_watched: false,
  },
  dialogueFlags: {},
  puzzleFlags: {},
  relationshipFlags: {},
  saveVersion: 1,

  // UI state
  isMenuOpen: true, // Start at main menu
  isJournalOpen: false,
  isInventoryOpen: false,
  isHintOpen: false,
  isSettingsOpen: false,
  isSaveLoadOpen: false,
  saveLoadMode: 'save',

  currentDialogue: null,
  inspectModal: null,
  toastMessage: null,
  hoveredObject: null,
  activeCursor: 'default',
  settings: {
    textSize: 'normal',
    dialogueSpeed: 'normal',
    masterVolume: 80,
    musicVolume: 50,
    sfxVolume: 85,
    highContrast: false,
    subtitles: true,
    hintStrength: 'subtle',
  },
};

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    // Try to restore settings from storage
    const saved = SaveManager.loadFromSlot('auto');
    if (saved?.state) {
      return {
        ...INITIAL_GAME_STATE,
        settings: saved.state.settings || INITIAL_GAME_STATE.settings,
        isMenuOpen: true,
      };
    }
    return INITIAL_GAME_STATE;
  });

  const [isHighlightActive, setIsHighlightActive] = useState(false);

  // Trigger toast with auto-dismiss
  const showToast = useCallback((msg: string) => {
    setGameState(prev => ({ ...prev, toastMessage: msg }));
    setTimeout(() => {
      setGameState(prev => ({ ...prev, toastMessage: null }));
    }, 3500);
  }, []);

  // Save automatically when significant milestones occur
  const autoSave = useCallback((stateToSave: GameState) => {
    SaveManager.saveToSlot('auto', stateToSave);
  }, []);

  // Keyboard accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.isMenuOpen || gameState.currentScene === 'intro') return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsHighlightActive(prev => !prev);
      } else if (e.key === 'i' || e.key === 'I') {
        setGameState(prev => ({ ...prev, isInventoryOpen: !prev.isInventoryOpen }));
      } else if (e.key === 'j' || e.key === 'J') {
        setGameState(prev => ({ ...prev, isJournalOpen: !prev.isJournalOpen }));
      } else if (e.key === 'h' || e.key === 'H') {
        setGameState(prev => ({ ...prev, isHintOpen: !prev.isHintOpen }));
      } else if (e.key === 'Escape') {
        setGameState(prev => {
          if (prev.isInspectModalOpen || prev.inspectModal) return { ...prev, inspectModal: null };
          if (prev.isInventoryOpen) return { ...prev, isInventoryOpen: false };
          if (prev.isJournalOpen) return { ...prev, isJournalOpen: false };
          if (prev.isHintOpen) return { ...prev, isHintOpen: false };
          if (prev.isSettingsOpen) return { ...prev, isSettingsOpen: false };
          if (prev.isSaveLoadOpen) return { ...prev, isSaveLoadOpen: false };
          if (prev.currentDialogue) return { ...prev, currentDialogue: null };
          return { ...prev, isMenuOpen: true };
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState.isMenuOpen, gameState.currentScene]);

  // Discover evidence helper
  const discoverEvidence = useCallback((evidenceId: string, customNotice?: string) => {
    const evidenceData = GAME_EVIDENCE[evidenceId];
    if (!evidenceData) return;

    setGameState(prev => {
      if (prev.evidence[evidenceId]) return prev; // already discovered

      soundManager.playEvidenceDiscovered();
      const updatedEvidence = { ...prev.evidence, [evidenceId]: true };
      const updatedJournal = [
        ...prev.journal,
        {
          id: `ev_entry_${evidenceId}`,
          category: 'evidence' as const,
          title: `سرنخ جدید: ${evidenceData.name}`,
          content: evidenceData.description,
          timestamp: 'لحظاتی پیش'
        }
      ];

      const newState = {
        ...prev,
        evidence: updatedEvidence,
        journal: updatedJournal,
      };

      showToast(customNotice || `سرنخ کشف شد: ${evidenceData.name}`);
      autoSave(newState);
      return newState;
    });
  }, [showToast, autoSave]);

  // Add Item helper
  const addItemToInventory = useCallback((itemId: string, customNotice?: string) => {
    const itemData = GAME_ITEMS[itemId];
    if (!itemData) return;

    setGameState(prev => {
      if (prev.inventory.includes(itemId)) return prev;

      soundManager.playItemPickup();
      const updatedInv = [...prev.inventory, itemId];
      const newState = {
        ...prev,
        inventory: updatedInv,
      };

      showToast(customNotice || `شیء برداشته شد: ${itemData.name}`);
      autoSave(newState);
      return newState;
    });
  }, [showToast, autoSave]);

  // Scene transitions
  const changeScene = useCallback((sceneId: SceneId) => {
    soundManager.playDoorCreak();
    soundManager.playFootstep();

    setGameState(prev => {
      const newState = {
        ...prev,
        currentScene: sceneId,
        currentDialogue: null,
        storyFlags: {
          ...prev.storyFlags,
          [`${sceneId}_visited`]: true,
        }
      };
      autoSave(newState);
      return newState;
    });
  }, [autoSave]);

  // Dialogue Selection Handler
  const handleSelectDialogueOption = (option: DialogueOption) => {
    soundManager.playClick();

    if (option.action) {
      const stateUpdates = option.action(gameState);
      if (stateUpdates) {
        setGameState(prev => ({ ...prev, ...stateUpdates }));
      }
    }

    if (option.nextNodeId) {
      setGameState(prev => ({
        ...prev,
        currentDialogue: prev.currentDialogue ? {
          ...prev.currentDialogue,
          currentNodeId: option.nextNodeId!
        } : null
      }));
    } else {
      // Close dialogue
      setGameState(prev => ({ ...prev, currentDialogue: null }));
    }
  };

  // Combine Items Handler
  const handleCombineItems = useCallback((item1Id: string, item2Id: string) => {
    soundManager.playClick();

    const isMatch = (idA: string, idB: string, targetA: string, targetB: string) => {
      return (idA === targetA && idB === targetB) || (idA === targetB && idB === targetA);
    };

    // 1. Combine Red Thread + Torn Cloth
    if (isMatch(item1Id, item2Id, 'red_thread', 'torn_cloth')) {
      soundManager.playPuzzleSolved();

      setGameState(prev => {
        const filteredInv = prev.inventory.filter(id => id !== 'red_thread' && id !== 'torn_cloth');
        const updatedInv = [...filteredInv, 'cloth_with_thread'];
        const updatedEvidence = { ...prev.evidence, ev_red_thread_cloth: true };
        const updatedFlags = { ...prev.puzzleFlags, window_puzzle_solved: true };

        const newState = {
          ...prev,
          inventory: updatedInv,
          activeItemId: null,
          evidence: updatedEvidence,
          puzzleFlags: updatedFlags,
          inspectModal: {
            title: 'ترکیب موفقیت‌آمیز اشیاء!',
            description: 'تکه پارچه و نخ قرمز ابریشمی با هم چفت شدند. لبه پاره پارچه دقیقاً تار و پود همان نخ ابریشمی را دارد.',
            subtext: 'خانخله: «پس یا دیوار از پارچه خوشش میاد... یا یکی از همین‌جا رد شده.»',
          }
        };

        showToast('معما حل شد: اثبات گریز از پنجره با نخ قرمز!');
        autoSave(newState);
        return newState;
      });
      return;
    }

    // 2. Combine Charcoal Stick + Account Ledger
    if (isMatch(item1Id, item2Id, 'charcoal_stick', 'account_ledger')) {
      soundManager.playPuzzleSolved();

      setGameState(prev => {
        const filteredInv = prev.inventory.filter(id => id !== 'account_ledger');
        const updatedInv = [...filteredInv, 'revealed_ledger'];
        const updatedFlags = { ...prev.puzzleFlags, ledger_revealed: true };

        const newState = {
          ...prev,
          inventory: updatedInv,
          activeItemId: null,
          puzzleFlags: updatedFlags,
          currentScene: 'act1_outro', // Trigger the climax!
        };

        autoSave(newState);
        return newState;
      });
      return;
    }

    // Invalid combination
    showToast('این دو شیء به هم ربطی ندارند.');
    setGameState(prev => ({ ...prev, activeItemId: null }));
  }, [showToast, autoSave]);

  // Object Interaction Handler
  const handleInteractObject = useCallback((obj: InteractiveObject) => {
    // If active item selected from inventory, try to use it on object
    if (gameState.activeItemId) {
      const activeItem = GAME_ITEMS[gameState.activeItemId];

      // Window + cloth_with_thread or red_thread
      if (obj.id === 'obj_window' && (gameState.activeItemId === 'cloth_with_thread' || gameState.activeItemId === 'red_thread')) {
        soundManager.playPuzzleSolved();
        setGameState(prev => ({
          ...prev,
          activeItemId: null,
          puzzleFlags: { ...prev.puzzleFlags, window_puzzle_solved: true },
          inspectModal: {
            title: 'تطبیق سرنخ با لبه پنجره',
            description: 'لبه پاره پارچه و نخ سرخ دقیقاً با میخ چهارچوب پنجره چفت می‌شود. جای پای بیرون پنجره هم نشان می‌دهد شخصی با شتاب به کوچه پشتی پریده است.',
            subtext: 'خانخله: «پس یا دیوار از پارچه خوشش میاد... یا یکی از همینجا رد شده.»'
          }
        }));
        return;
      }

      // Desk + charcoal on ledger
      if ((obj.id === 'obj_desk' || obj.id === 'obj_account_ledger') && gameState.activeItemId === 'charcoal_stick') {
        if (gameState.inventory.includes('account_ledger')) {
          handleCombineItems('charcoal_stick', 'account_ledger');
          return;
        }
      }
    }

    // Standard Interactions per object
    switch (obj.id) {
      // Outer Alley
      case 'obj_tree_bed':
        setGameState(prev => ({
          ...prev,
          inspectModal: {
            title: 'درخت کهنسال توت',
            description: 'سایه‌ای خنک در حاشیه کوچه خاکی کاروانسرا. خانخله شب‌ها و صبح‌های زود روی پوستین نمدی زیر این درخت چرت می‌زند.',
            subtext: 'خانخله: «خواب زیر درخت مفته، هوای کویر هم تا لنگ ظهر نسیم داره... کاش این کاظم زلزله بیدارم نمی‌کرد.»'
          }
        }));
        break;

      case 'obj_crow':
        soundManager.playCrow();
        setGameState(prev => ({
          ...prev,
          inspectModal: {
            title: 'کلاغ دم‌سیاه',
            description: 'کلاغ با چشم‌های براقش به دهان خانخله نگاه می‌کند و صدایی از ته گلو بیرون می‌دهد: «قار! قار!»',
            subtext: 'خانخله: «حتی این کلاغ هم به شامه من حسودی می‌کنه! دنبال گوشت نباش حیوان، اینجا فقط بوی پول سوخته میاد.»'
          }
        }));
        break;

      case 'npc_kazem_alley':
        soundManager.playClick();
        setGameState(prev => ({
          ...prev,
          currentDialogue: {
            npcId: 'kazem',
            currentNodeId: 'kazem_root'
          }
        }));
        break;

      case 'door_to_courtyard':
        changeScene('courtyard');
        break;

      case 'obj_desert_road':
        setGameState(prev => ({
          ...prev,
          inspectModal: {
            title: 'جاده ریگستان',
            description: 'جاده‌ای خاکی که کاروان‌ها از آن به سوی ری و یزد حرکت می‌کنند. در افق باد گرد و خاک بلند کرده است.',
            subtext: 'خانخله: «بیابان برای شترها و راهزن‌هاست، نه پای پیاده من. تا قضیه میرزا روشن نشه یه قدم تو این گرما برنمی‌دارم.»'
          }
        }));
        break;

      // Courtyard
      case 'obj_mud_pool':
        discoverEvidence('ev_morteza_boots', 'کشف شد: گل سرخ‌رنگ پای حوضچه با چکمه‌های حاج مرتضی همخوانی دارد!');
        setGameState(prev => ({
          ...prev,
          inspectModal: {
            title: 'گِل سرخ‌رنگ لای حوضچه',
            description: 'آب حوضچه روی خاک رس قرمز مسافرخانه جاری شده و گِل چسبنده کم‌نظیری ساخته است. رد چکمه‌های نوک‌تیز ساغری بر آن حک شده است.',
            subtext: 'خانخله: «این خاک فقط تو حیاط این کاروانسراست. هر کی دیشب پاش به اینجا خورده باشه، تا سه روز از چکمهاش پاک نمیشه!»'
          }
        }));
        break;

      case 'npc_nemat_courtyard':
        soundManager.playClick();
        setGameState(prev => ({
          ...prev,
          currentDialogue: {
            npcId: 'nemat',
            currentNodeId: 'nemat_root'
          }
        }));
        break;

      case 'door_to_mirza_room':
        changeScene('mirza_room');
        break;

      case 'door_to_stable':
        changeScene('stable');
        break;

      case 'door_to_alley':
        changeScene('outer_alley');
        break;

      // Mirza's Room
      case 'obj_wall_writing':
        discoverEvidence('ev_fake_writing', 'سرنخ مشکوک: نوشته روی دیوار ساختگی است!');
        setGameState(prev => ({
          ...prev,
          inspectModal: {
            title: 'نوشته روی دیوار گلی',
            description: 'با خطی شتاب‌زده با زغال حک شده: «حساب، خودش را پس میگیرد».',
            subtext: 'خانخله: «میرزا حتی روی سیاهه نمک و فلفل قلم تعلیق می‌زد. این خط زمخت کار یه آدم کم‌سواد و دستپاچه‌ست که خواسته صحنه رو کینه‌توزانه جلوه بده.»'
          }
        }));
        break;

      case 'obj_window':
        discoverEvidence('ev_window_dust', 'کشف شد: گرد و خاک لبه پنجره دستکاری شده!');
        setGameState(prev => ({
          ...prev,
          inspectModal: {
            title: 'پنجره چوبی رو به کوچه پشتی',
            description: 'لبه گلی پنجره خراشیده شده و خاک روی آن به هم خورده است. لولای چوبی پنجره به زور باز شده است.',
            subtext: 'خانخله: «پنجره رو نه نسیم باز کرده، نه مهتاب. یکی تنه‌اش رو داده به این چوب‌ها و پریده بیرون.»'
          }
        }));
        break;

      case 'obj_window_nail_thread':
        addItemToInventory('red_thread', 'نخ قرمز ابریشمی از روی میخ پنجره برداشته شد.');
        break;

      case 'obj_desk':
        setGameState(prev => ({
          ...prev,
          inspectModal: {
            title: 'میز کار میرزا صفدر',
            description: 'میز کوتاه چوبی پر از دوات خشکیده، قلم‌نی‌های شکسته و ورق‌های پراکنده. فنجان چای دست‌نخورده و دفتر قطوری روی آن به چشم می‌خورد.',
            subtext: 'خانخله: «میرزا آدم نظیفی بود... معلومه قبل از رفتن یا بردنش، وقت جمع کردن خرت و پرت‌هاش رو نداشته.»'
          }
        }));
        break;

      case 'obj_tea_cup':
        discoverEvidence('ev_cold_tea', 'کشف شد: فنجان چای دست‌نخورده و سرد است!');
        setGameState(prev => ({
          ...prev,
          inspectModal: {
            title: 'فنجان چای سرد',
            description: 'استکان تا لبه پر از چای کهنه و سیاه است، اما نعلبکی خشک است و لب به آن نزده‌اند.',
            subtext: 'خانخله: «میرزا حتی وقت نکرده قند رو تو استکان بندازه. ماجرا اونقدری ناگهانی بوده که چای گرمش یخ زده.»'
          }
        }));
        break;

      case 'obj_account_ledger':
        addItemToInventory('account_ledger', 'دفتر حساب میرزا صفدر برداشته شد.');
        break;

      case 'obj_holed_coin':
        addItemToInventory('coin_hole', 'سکه سوراخ‌شده از زیر تخته‌های میز برداشته شد.');
        discoverEvidence('ev_holed_coin', 'کشف شد: سکه سوراخ‌شده با نشان کاروان شتران سرخ!');
        break;

      case 'obj_bed':
        setGameState(prev => ({
          ...prev,
          inspectModal: {
            title: 'تخت خواب میرزا',
            description: 'لحاف کرباسی پس زده شده و متکا کج شده است. نشانی از خون یا درگیری مرگبار دیده نمی‌شود.',
            subtext: 'خانخله: «خونی در کار نبوده. یا با پای خودش رفته، یا با شمشیر زیر گلوش بدرقه‌ش کردن.»'
          }
        }));
        break;

      case 'obj_chest':
        if (!gameState.inventory.includes('torn_cloth') && !gameState.inventory.includes('cloth_with_thread')) {
          addItemToInventory('torn_cloth', 'تکه پارچه پاره‌شده از گوشه صندوق برداشته شد.');
        } else {
          setGameState(prev => ({
            ...prev,
            inspectModal: {
              title: 'صندوقچه چوبی میرزا',
              description: 'صندوق خالی است و تمام لباس‌های اضافی و وسایل باارزش جابه‌جا شده است.',
              subtext: 'خانخله: «چیز دندون‌گیری تو این صندوق نمونده جز خاک بیابون.»'
            }
          }));
        }
        break;

      case 'obj_hearth_charcoal':
        addItemToInventory('charcoal_stick', 'تکه زغال نیم‌سوز از اجاق برداشته شد.');
        break;

      case 'door_back_to_courtyard':
        changeScene('courtyard');
        break;

      // Stable
      case 'npc_morteza_stable':
        soundManager.playClick();
        setGameState(prev => ({
          ...prev,
          currentDialogue: {
            npcId: 'morteza',
            currentNodeId: 'morteza_root'
          }
        }));
        break;

      case 'obj_morteza_boots':
        discoverEvidence('ev_morteza_boots', 'کشف شد: تناقض چکمه‌های گل‌آلود حاج مرتضی!');
        setGameState(prev => ({
          ...prev,
          inspectModal: {
            title: 'چکمه‌های گران‌قیمت حاج مرتضی',
            description: 'پای چکمه‌های چرم ساغری با خاک رس سرخ و خشکیده مسافرخانه پوشیده شده است. در حالی که او ادعا می‌کند دیشب فرسنگ‌ها دورتر در ده بالا بوده است!',
            subtext: 'خانخله: «پای حاج‌آقا توی گِل حیاط گیر کرده، ولی زبونش از زهد و ده بالا می‌گه. این چکمه مدرک زنده دروغشه!»'
          }
        }));
        break;

      case 'obj_horses':
        setGameState(prev => ({
          ...prev,
          inspectModal: {
            title: 'اسب‌ها و قاطرهای بارکش',
            description: 'قاطرهای قوی‌هیکل با زین‌های خاکی که به تیرک بسته شده‌اند و از توبره کاه می‌خورند.',
            subtext: 'خانخله: «حیوان زبون‌بسته لااقل سرش به یونجه خودشه، نه مثل آدم‌ها به مال غارت‌شده مردم.»'
          }
        }));
        break;

      case 'obj_leather_harness':
        setGameState(prev => ({
          ...prev,
          inspectModal: {
            title: 'یراق‌آلات و زین چرمی',
            description: 'تسمه‌ها و دهنه‌های چرمی روغنی که از سقف آویزان شده‌اند.',
            subtext: 'خانخله: «چرم خوبیه، ولی به درد حل معمای ما نمی‌خوره.»'
          }
        }));
        break;

      case 'door_stable_to_courtyard':
        changeScene('courtyard');
        break;

      default:
        showToast(obj.name);
    }
  }, [gameState, discoverEvidence, addItemToInventory, changeScene, showToast, handleCombineItems]);

  // Handle Inspecting Item from Inventory
  const handleInspectInventoryItem = (item: Item) => {
    // If inspecting ledger, provide charcoal action if charcoal in inventory!
    if (item.id === 'account_ledger' && gameState.inventory.includes('charcoal_stick')) {
      setGameState(prev => ({
        ...prev,
        inspectModal: {
          title: item.name,
          description: item.description,
          subtext: item.inspectText,
          actionLabel: 'مالیدن گرد زغال روی صفحات سفید (آشکارسازی خطوط فرورفته)',
          onAction: () => {
            handleCombineItems('charcoal_stick', 'account_ledger');
          }
        }
      }));
      return;
    }

    setGameState(prev => ({
      ...prev,
      inspectModal: {
        title: item.name,
        description: item.description,
        subtext: item.inspectText,
      }
    }));
  };

  // Main UI render
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black select-none text-[#e8ded2] font-sans">
      {/* 1. Main Menu Overlay */}
      {gameState.isMenuOpen ? (
        <MainMenu
          onStartIntro={() => {
            setGameState(prev => ({
              ...INITIAL_GAME_STATE,
              currentScene: 'intro',
              isMenuOpen: false,
            }));
          }}
          onNewGame={() => {
            soundManager.playDoorCreak();
            setGameState(prev => ({
              ...INITIAL_GAME_STATE,
              currentScene: 'outer_alley',
              isMenuOpen: false,
            }));
          }}
          onContinue={(slotData) => {
            setGameState(prev => ({
              ...prev,
              currentScene: slotData.state.currentScene,
              inventory: slotData.state.inventory,
              evidence: slotData.state.evidence,
              journal: slotData.state.journal,
              storyFlags: slotData.state.storyFlags,
              dialogueFlags: slotData.state.dialogueFlags,
              puzzleFlags: slotData.state.puzzleFlags,
              relationshipFlags: slotData.state.relationshipFlags,
              settings: slotData.state.settings || prev.settings,
              isMenuOpen: false,
            }));
          }}
          onOpenLoad={() => {
            setGameState(prev => ({ ...prev, isSaveLoadOpen: true, saveLoadMode: 'load' }));
          }}
          onOpenSettings={() => {
            setGameState(prev => ({ ...prev, isSettingsOpen: true }));
          }}
        />
      ) : gameState.currentScene === 'intro' ? (
        /* 2. Intro Cinematic */
        <IntroCinematic
          onComplete={() => {
            soundManager.playDoorCreak();
            setGameState(prev => ({
              ...prev,
              currentScene: 'outer_alley',
              storyFlags: { ...prev.storyFlags, intro_watched: true },
            }));
          }}
        />
      ) : gameState.currentScene === 'act1_outro' ? (
        /* 3. Outro Climax */
        <OutroAct1
          onRestart={() => {
            setGameState(prev => ({
              ...prev,
              currentScene: 'mirza_room',
            }));
          }}
          onReturnToMenu={() => {
            setGameState(prev => ({ ...prev, isMenuOpen: true }));
          }}
        />
      ) : (
        /* 4. Active Gameplay Stage */
        <div className="relative w-full h-full">
          {/* Top Bar Header */}
          <TopBar
            gameState={gameState}
            currentSceneName={SCENES[gameState.currentScene]?.name || ''}
            isHighlightActive={isHighlightActive}
            onToggleHighlight={() => setIsHighlightActive(prev => !prev)}
            onOpenInventory={() => setGameState(prev => ({ ...prev, isInventoryOpen: !prev.isInventoryOpen }))}
            onOpenJournal={() => setGameState(prev => ({ ...prev, isJournalOpen: true }))}
            onOpenHint={() => setGameState(prev => ({ ...prev, isHintOpen: true }))}
            onOpenSettings={() => setGameState(prev => ({ ...prev, isSettingsOpen: true }))}
            onOpenMenu={() => setGameState(prev => ({ ...prev, isMenuOpen: true }))}
            onOpenSave={() => setGameState(prev => ({ ...prev, isSaveLoadOpen: true, saveLoadMode: 'save' }))}
          />

          {/* Toast Notifications */}
          <NotificationToast message={gameState.toastMessage} />

          {/* Interactive Scene Canvas */}
          <GameScene
            gameState={gameState}
            isHighlightActive={isHighlightActive}
            onInteract={handleInteractObject}
            onHoverObject={(data) => {
              setGameState(prev => ({
                ...prev,
                hoveredObject: data ? { name: data.name, actionText: data.actionText } : null,
                activeCursor: data ? data.cursorType : 'default',
              }));
            }}
          />

          {/* Inventory Tray */}
          {gameState.isInventoryOpen && (
            <InventoryBar
              gameState={gameState}
              onSelectItem={(itemId) => setGameState(prev => ({ ...prev, activeItemId: itemId }))}
              onInspectItem={handleInspectInventoryItem}
              onCombineItems={handleCombineItems}
              onClose={() => setGameState(prev => ({ ...prev, isInventoryOpen: false }))}
            />
          )}

          {/* Dialogue System */}
          {gameState.currentDialogue && (
            <DialogueBox
              dialogueNode={DIALOGUE_NODES[gameState.currentDialogue.currentNodeId]}
              gameState={gameState}
              onSelectOption={handleSelectDialogueOption}
              onClose={() => setGameState(prev => ({ ...prev, currentDialogue: null }))}
            />
          )}

          {/* Inspect Modal */}
          {gameState.inspectModal && (
            <InspectModal
              customData={gameState.inspectModal}
              onClose={() => setGameState(prev => ({ ...prev, inspectModal: null }))}
            />
          )}

          {/* Journal Modal */}
          {gameState.isJournalOpen && (
            <JournalModal
              gameState={gameState}
              onClose={() => setGameState(prev => ({ ...prev, isJournalOpen: false }))}
            />
          )}

          {/* Hint Modal */}
          {gameState.isHintOpen && (
            <HintModal
              gameState={gameState}
              onClose={() => setGameState(prev => ({ ...prev, isHintOpen: false }))}
            />
          )}
        </div>
      )}

      {/* Global Modals (Settings & Save/Load) */}
      {gameState.isSettingsOpen && (
        <SettingsModal
          settings={gameState.settings}
          onUpdateSettings={(updated) => {
            setGameState(prev => {
              const newSettings = { ...prev.settings, ...updated };
              autoSave({ ...prev, settings: newSettings });
              return { ...prev, settings: newSettings };
            });
          }}
          onClose={() => setGameState(prev => ({ ...prev, isSettingsOpen: false }))}
        />
      )}

      {gameState.isSaveLoadOpen && (
        <SaveLoadModal
          mode={gameState.saveLoadMode}
          currentState={gameState}
          onLoadState={(slotData) => {
            setGameState(prev => ({
              ...prev,
              currentScene: slotData.state.currentScene,
              inventory: slotData.state.inventory,
              evidence: slotData.state.evidence,
              journal: slotData.state.journal,
              storyFlags: slotData.state.storyFlags,
              dialogueFlags: slotData.state.dialogueFlags,
              puzzleFlags: slotData.state.puzzleFlags,
              relationshipFlags: slotData.state.relationshipFlags,
              settings: slotData.state.settings || prev.settings,
              isMenuOpen: false,
              isSaveLoadOpen: false,
            }));
            showToast(`پرونده «${slotData.title}» با موفقیت بارگذاری شد.`);
          }}
          onClose={() => setGameState(prev => ({ ...prev, isSaveLoadOpen: false }))}
        />
      )}
    </div>
  );
}
