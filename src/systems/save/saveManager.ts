/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameState } from '../../types/game';

export interface SaveSlotData {
  slotId: number | 'auto';
  title: string;
  timestamp: string;
  sceneName: string;
  state: {
    act?: number;
    currentScene: GameState['currentScene'];
    inventory: GameState['inventory'];
    evidence: GameState['evidence'];
    journal: GameState['journal'];
    storyFlags: GameState['storyFlags'];
    dialogueFlags: GameState['dialogueFlags'];
    puzzleFlags: GameState['puzzleFlags'];
    relationshipFlags: GameState['relationshipFlags'];
    saveVersion: number;
    settings: GameState['settings'];
  };
}

export const CURRENT_SAVE_VERSION = 2;
const STORAGE_KEY_PREFIX = 'khankholeh_save_slot_';
const AUTO_SAVE_KEY = 'khankholeh_autosave';

export const SaveManager = {
  /**
   * Migrate old or incomplete saved states to current schema version
   */
  migrateState(savedState: any): SaveSlotData['state'] {
    const version = typeof savedState.saveVersion === 'number' ? savedState.saveVersion : 1;

    // Base polyfills
    const polyfilled: SaveSlotData['state'] = {
      act: typeof savedState.act === 'number' ? savedState.act : (savedState.storyFlags?.act2_started ? 2 : 1),
      currentScene: savedState.currentScene || 'outer_alley',
      inventory: Array.isArray(savedState.inventory) ? [...savedState.inventory] : [],
      evidence: typeof savedState.evidence === 'object' && savedState.evidence ? { ...savedState.evidence } : {},
      journal: Array.isArray(savedState.journal) ? [...savedState.journal] : [],
      storyFlags: typeof savedState.storyFlags === 'object' && savedState.storyFlags ? { ...savedState.storyFlags } : {},
      dialogueFlags: typeof savedState.dialogueFlags === 'object' && savedState.dialogueFlags ? { ...savedState.dialogueFlags } : {},
      puzzleFlags: typeof savedState.puzzleFlags === 'object' && savedState.puzzleFlags ? { ...savedState.puzzleFlags } : {},
      relationshipFlags: typeof savedState.relationshipFlags === 'object' && savedState.relationshipFlags ? { ...savedState.relationshipFlags } : {},
      saveVersion: CURRENT_SAVE_VERSION,
      settings: savedState.settings ? {
        textSize: savedState.settings.textSize || 'normal',
        dialogueSpeed: savedState.settings.dialogueSpeed || 'normal',
        masterVolume: typeof savedState.settings.masterVolume === 'number' ? savedState.settings.masterVolume : 80,
        musicVolume: typeof savedState.settings.musicVolume === 'number' ? savedState.settings.musicVolume : 50,
        sfxVolume: typeof savedState.settings.sfxVolume === 'number' ? savedState.settings.sfxVolume : 85,
        highContrast: !!savedState.settings.highContrast,
        subtitles: savedState.settings.subtitles !== false,
        hintStrength: savedState.settings.hintStrength || 'subtle',
      } : {
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

    // Version-specific migrations
    if (version < 2) {
      // Version 2 introduced Khan's misjudgment and deduction graph flags
      if (!polyfilled.storyFlags.khan_misjudgment_bandit_theory) {
        polyfilled.storyFlags.khan_misjudgment_bandit_theory = false;
      }
    }

    return polyfilled;
  },

  saveToSlot(slot: number | 'auto', state: GameState, customTitle?: string): boolean {
    try {
      const sceneNames: Record<string, string> = {
        intro: 'مقدمه سینمایی',
        outer_alley: 'کوچه بیرونی',
        courtyard: 'حیاط مسافرخانه',
        mirza_room: 'اتاق میرزا صفدر (پرده ۱)',
        stable: 'اصطبل کاروانسرا',
        act1_outro: 'پرده اول: پایان',
        mirza_room_act2: 'اتاق میرزا (پرده ۲: دفتر خالی)',
        bazaar: 'بازارچه سرپوشیده',
        papermaker_shop: 'دکان کاغذسازی صادق',
        yaqub_house: 'خانه یعقوب نابینا',
        yaqub_courtyard: 'حیاط خلوت یعقوب',
        qanat_entrance: 'دهانه قنات متروک',
        act2_outro: 'پرده دوم: پایان',
      };

      const now = new Date();
      const dateStr = now.toLocaleDateString('fa-IR', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });

      const slotData: SaveSlotData = {
        slotId: slot,
        title: customTitle || (slot === 'auto' ? 'ذخیره خودکار' : `ذخیره شماره ${slot}`),
        timestamp: dateStr,
        sceneName: sceneNames[state.currentScene] || state.currentScene,
        state: {
          act: state.act || (state.storyFlags?.act2_started ? 2 : 1),
          currentScene: state.currentScene,
          inventory: [...state.inventory],
          evidence: { ...state.evidence },
          journal: [...state.journal],
          storyFlags: { ...state.storyFlags },
          dialogueFlags: { ...state.dialogueFlags },
          puzzleFlags: { ...state.puzzleFlags },
          relationshipFlags: { ...state.relationshipFlags },
          saveVersion: CURRENT_SAVE_VERSION,
          settings: { ...state.settings },
        },
      };

      const key = slot === 'auto' ? AUTO_SAVE_KEY : `${STORAGE_KEY_PREFIX}${slot}`;
      localStorage.setItem(key, JSON.stringify(slotData));
      return true;
    } catch (e) {
      console.error('Error saving game state:', e);
      return false;
    }
  },

  loadFromSlot(slot: number | 'auto'): SaveSlotData | null {
    try {
      const key = slot === 'auto' ? AUTO_SAVE_KEY : `${STORAGE_KEY_PREFIX}${slot}`;
      const raw = localStorage.getItem(key);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || !parsed.state) return null;

      // Ensure data conforms to latest schema via migration
      parsed.state = this.migrateState(parsed.state);
      return parsed as SaveSlotData;
    } catch (e) {
      console.error('Error loading save slot:', e);
      return null;
    }
  },

  getAllSlots(): Record<string, SaveSlotData | null> {
    return {
      auto: this.loadFromSlot('auto'),
      1: this.loadFromSlot(1),
      2: this.loadFromSlot(2),
      3: this.loadFromSlot(3),
    };
  },

  deleteSlot(slot: number | 'auto'): void {
    const key = slot === 'auto' ? AUTO_SAVE_KEY : `${STORAGE_KEY_PREFIX}${slot}`;
    localStorage.removeItem(key);
  },
};
