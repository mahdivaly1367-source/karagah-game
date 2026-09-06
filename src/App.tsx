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
import { GAME_CONTRADICTIONS } from './data/contradictions';
import { DIALOGUE_NODES } from './data/dialogues';
import { soundManager } from './systems/audio/soundManager';
import { SaveManager, SaveSlotData, CURRENT_SAVE_VERSION } from './systems/save/saveManager';
import { PuzzleEngine } from './systems/puzzle/puzzleEngine';
import { ContradictionEngine } from './systems/deduction/contradictionEngine';
import { InteractionEngine } from './systems/interaction/interactionEngine';

// Components
import { MainMenu } from './components/Menu/MainMenu';
import { SettingsModal } from './components/Menu/SettingsModal';
import { SaveLoadModal } from './components/Menu/SaveLoadModal';
import { IntroCinematic } from './components/GameCanvas/IntroCinematic';
import { GameScene } from './components/GameCanvas/GameScene';
import { OutroAct1 } from './components/GameCanvas/OutroAct1';
import { OutroAct2 } from './components/GameCanvas/OutroAct2';
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
  saveVersion: CURRENT_SAVE_VERSION,

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

      let newState: GameState = {
        ...prev,
        evidence: updatedEvidence,
        journal: updatedJournal,
      };

      // Check if discovered evidence triggers contradiction resolution against Khan's hasty bandit misjudgment
      if (
        (evidenceId === 'ev_red_thread_cloth' || evidenceId === 'ev_cold_tea') &&
        newState.evidence['ev_red_thread_cloth'] &&
        newState.evidence['ev_cold_tea'] &&
        newState.storyFlags.khan_misjudgment_bandit_theory &&
        !newState.storyFlags.khan_misjudgment_corrected
      ) {
        const contra = ContradictionEngine.resolveWithEvidence('contra_khan_bandit_theory', 'ev_red_thread_cloth', newState);
        if (contra?.success && contra.newStateUpdates) {
          newState = {
            ...newState,
            ...contra.newStateUpdates,
          };
          soundManager.playContradictionExposed();
          setTimeout(() => {
            showToast('استنتاج جدید خانخله: تئوری حمله راهزنان منتفی شد!');
          }, 1000);
        }
      }

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

  // Combine Items Handler (Delegated to PuzzleEngine)
  const handleCombineItems = useCallback((item1Id: string, item2Id: string) => {
    soundManager.playClick();

    const result = PuzzleEngine.combineItems(item1Id, item2Id, gameState);

    if (result.success && result.puzzle) {
      soundManager.playPuzzleSolved();

      setGameState(prev => {
        let newState: GameState = {
          ...prev,
          activeItemId: null,
          ...(result.newStateUpdates || {}),
        };

        if (result.inspectModal) {
          newState.inspectModal = result.inspectModal;
        }

        if (result.triggerScene) {
          newState.currentScene = result.triggerScene;
        }

        if (result.toastMessage) {
          showToast(result.toastMessage);
        }

        // Check if red thread + cloth was made -> trigger contradiction resolution if bandit theory was active
        if (
          result.puzzle!.id === 'puzzle_combine_cloth_thread' &&
          newState.storyFlags.khan_misjudgment_bandit_theory &&
          !newState.storyFlags.khan_misjudgment_corrected
        ) {
          const contraRes = ContradictionEngine.resolveWithEvidence('contra_khan_bandit_theory', 'ev_red_thread_cloth', newState);
          if (contraRes?.success && contraRes.newStateUpdates) {
            newState = {
              ...newState,
              ...contraRes.newStateUpdates,
            };
            soundManager.playContradictionExposed();
            setTimeout(() => {
              showToast('استنتاج جدید خانخله: تئوری راهزنان بیابانی رد شد!');
            }, 1200);
          }
        }

        autoSave(newState);
        return newState;
      });
      return;
    }

    // Invalid combination
    showToast(result.toastMessage || 'این دو شیء به هم ربطی ندارند.');
    setGameState(prev => ({ ...prev, activeItemId: null }));
  }, [gameState, showToast, autoSave]);

  // Object Interaction Handler (Delegated to PuzzleEngine & InteractionEngine)
  const handleInteractObject = useCallback((obj: InteractiveObject) => {
    // 1. If active item selected from inventory, try to use it on object via PuzzleEngine
    if (gameState.activeItemId) {
      const puzzleResult = PuzzleEngine.useItemOnObject(gameState.activeItemId, obj.id, gameState);
      if (puzzleResult.handled) {
        if (puzzleResult.success) {
          soundManager.playPuzzleSolved();
          setGameState(prev => {
            let newState: GameState = {
              ...prev,
              activeItemId: null,
              ...(puzzleResult.newStateUpdates || {}),
            };

            if (puzzleResult.inspectModal) {
              newState.inspectModal = puzzleResult.inspectModal;
            }

            if (puzzleResult.triggerScene) {
              newState.currentScene = puzzleResult.triggerScene;
            }

            if (puzzleResult.toastMessage) {
              showToast(puzzleResult.toastMessage);
            }

            autoSave(newState);
            return newState;
          });
          return;
        } else {
          // Failed attempt using item on this object
          if (puzzleResult.toastMessage) {
            showToast(puzzleResult.toastMessage);
          }
          setGameState(prev => ({ ...prev, activeItemId: null }));
          return;
        }
      }
    }

    // 2. Otherwise, delegate to InteractionEngine (data-driven object interactions)
    const interactionResult = InteractionEngine.handleObject(obj, gameState, {
      showToast,
      changeScene,
      discoverEvidence,
      addItemToInventory,
    });

    if (interactionResult.stateUpdates) {
      setGameState(prev => {
        const nextState = {
          ...prev,
          ...interactionResult.stateUpdates,
        };
        autoSave(nextState);
        return nextState;
      });
    }
  }, [gameState, showToast, changeScene, discoverEvidence, addItemToInventory, autoSave]);

  // Handle Inspecting Item from Inventory
  const handleInspectInventoryItem = (item: Item) => {
    // Act 1: If inspecting ledger, provide charcoal action if charcoal in inventory!
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

    // Act 2: If inspecting raw Act 2 ledger, provide shading kit action if in inventory
    if (item.id === 'ledger_act2_raw' && gameState.inventory.includes('shading_kit')) {
      setGameState(prev => ({
        ...prev,
        inspectModal: {
          title: item.name,
          description: item.description,
          subtext: item.inspectText,
          actionLabel: 'سایه‌زدن با کیت دوده بید و قلم‌موی موی شتر بر شیارهای سفید',
          onAction: () => {
            handleCombineItems('shading_kit', 'ledger_act2_raw');
          }
        }
      }));
      return;
    }

    // Act 2: If inspecting charcoal powder and has camel hair brush, offer craft shading kit
    if (item.id === 'charcoal_powder_sadiq' && gameState.inventory.includes('camel_hair_brush')) {
      setGameState(prev => ({
        ...prev,
        inspectModal: {
          title: item.name,
          description: item.description,
          subtext: item.inspectText,
          actionLabel: 'ترکیب با قلم‌موی موی شتر (ساخت کیت تخصصی سایه‌زنی)',
          onAction: () => {
            handleCombineItems('charcoal_powder_sadiq', 'camel_hair_brush');
          }
        }
      }));
      return;
    }

    // Act 2: If inspecting fake iron clapper bell, allow testing sound
    if (item.id === 'iron_clapper_bell') {
      setGameState(prev => ({
        ...prev,
        inspectModal: {
          title: item.name,
          description: item.description,
          subtext: item.inspectText,
          actionLabel: 'تکان دادن زنگوله و شنیدن صدای خشک آهن لق (پازل صوتی)',
          onAction: () => {
            soundManager.playFakeClapper();
          }
        }
      }));
      return;
    }

    // Act 2: If inspecting authentic camel bell, allow testing sound
    if (item.id === 'authentic_camel_bell') {
      setGameState(prev => ({
        ...prev,
        inspectModal: {
          title: item.name,
          description: item.description,
          subtext: item.inspectText,
          actionLabel: 'نواختن زنگوله برنجی و شنیدن طنین اصیل کاروان (پازل صوتی)',
          onAction: () => {
            soundManager.playAuthenticBell();
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

  // Handle Resolving Contradiction from Journal/Deduction
  const handleResolveContradiction = (contradictionId: string) => {
    const contra = GAME_CONTRADICTIONS[contradictionId];
    if (!contra) return;

    // 1. Guard against Double Resolution (Idempotent)
    if (contra.isResolved(gameState)) {
      showToast('این تناقض قبلاً اثبات و ثبت شده است.');
      return;
    }

    // 2. Guard against Premature Resolution
    if (!contra.isAvailable(gameState)) {
      showToast('هنوز تمام شواهد و سرنخ‌های لازم برای رد این ادعا به دست نیامده است.');
      return;
    }

    soundManager.playContradictionExposed();

    setGameState(prev => {
      // 3. Deduplicate journal entries
      const alreadyInJournal = contra.resolution.journalEntry && prev.journal.some(
        j => typeof j === 'object' && j.id === contra.resolution.journalEntry?.id
      );
      const updatedJournal = contra.resolution.journalEntry && !alreadyInJournal
        ? [...prev.journal, contra.resolution.journalEntry]
        : prev.journal;

      const updatedStoryFlags = {
        ...prev.storyFlags,
        ...contra.resolution.flagsToSet,
      };

      const updatedDialogueFlags = {
        ...prev.dialogueFlags,
        ...contra.resolution.flagsToSet,
      };

      const updatedPuzzleFlags = {
        ...prev.puzzleFlags,
        ...contra.resolution.flagsToSet,
      };

      const updatedEvidence = { ...prev.evidence };
      if (contra.resolution.unlockedEvidenceId) {
        updatedEvidence[contra.resolution.unlockedEvidenceId] = true;
      }

      const updatedRelationships = { ...prev.relationshipFlags };
      if (contra.resolution.relationshipDelta) {
        const { characterId, delta } = contra.resolution.relationshipDelta;
        const current = typeof updatedRelationships[characterId] === 'number'
          ? (updatedRelationships[characterId] as number)
          : 0;
        updatedRelationships[characterId] = current + delta;
      }

      const nextState: GameState = {
        ...prev,
        journal: updatedJournal,
        storyFlags: updatedStoryFlags,
        dialogueFlags: updatedDialogueFlags,
        puzzleFlags: updatedPuzzleFlags,
        evidence: updatedEvidence,
        relationshipFlags: updatedRelationships,
        inspectModal: {
          title: `تناقض اثبات شد: ${contra.name}`,
          description: contra.resolution.reactionText,
          subtext: contra.resolution.subtext || 'خانخله: «دروغ هرچقدر هم قشنگ بافته بشه، لای انگشت‌های واقعیت پاره میشه!»',
        },
      };

      autoSave(nextState);
      return nextState;
    });

    showToast(`تناقض اثبات شد: ${contra.name}`);
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
        /* 3. Outro Climax Act 1 */
        <OutroAct1
          onStartAct2={() => {
            soundManager.playDoorCreak();
            setGameState(prev => {
              const nextState: GameState = {
                ...prev,
                currentScene: 'mirza_room_act2',
                act: 2,
                storyFlags: { ...prev.storyFlags, act2_started: true },
              };
              autoSave(nextState);
              return nextState;
            });
          }}
          onRestart={() => {
            soundManager.playClick();
            setGameState(prev => {
              const nextState: GameState = {
                ...prev,
                currentScene: 'mirza_room',
              };
              autoSave(nextState);
              return nextState;
            });
          }}
          onReturnToMenu={() => {
            soundManager.playClick();
            setGameState(prev => ({ ...prev, isMenuOpen: true }));
          }}
        />
      ) : gameState.currentScene === 'act2_outro' ? (
        /* 4. Outro Climax Act 2 */
        <OutroAct2
          onReturnToMenu={() => {
            soundManager.playClick();
            setGameState(prev => ({ ...prev, isMenuOpen: true }));
          }}
          onExplore={() => {
            soundManager.playClick();
            setGameState(prev => {
              const nextState: GameState = {
                ...prev,
                currentScene: 'bazaar',
              };
              autoSave(nextState);
              return nextState;
            });
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
              onResolveContradiction={handleResolveContradiction}
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
