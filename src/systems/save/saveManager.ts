import { GameState } from '../../types/game';

export interface SaveSlotData {
  slotId: number | 'auto';
  title: string;
  timestamp: string;
  sceneName: string;
  state: {
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

const STORAGE_KEY_PREFIX = 'khankholeh_save_slot_';
const AUTO_SAVE_KEY = 'khankholeh_autosave';

export const SaveManager = {
  saveToSlot(slot: number | 'auto', state: GameState, customTitle?: string): boolean {
    try {
      const sceneNames: Record<string, string> = {
        intro: 'مقدمه سینمایی',
        outer_alley: 'کوچه بیرونی',
        courtyard: 'حیاط مسافرخانه',
        mirza_room: 'اتاق میرزا صفدر',
        stable: 'اصطبل کاروانسرا',
        act1_outro: 'پرده اول: پایان'
      };

      const now = new Date();
      const dateStr = now.toLocaleDateString('fa-IR', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const slotData: SaveSlotData = {
        slotId: slot,
        title: customTitle || (slot === 'auto' ? 'ذخیره خودکار' : `ذخیره شماره ${slot}`),
        timestamp: dateStr,
        sceneName: sceneNames[state.currentScene] || state.currentScene,
        state: {
          currentScene: state.currentScene,
          inventory: [...state.inventory],
          evidence: { ...state.evidence },
          journal: [...state.journal],
          storyFlags: { ...state.storyFlags },
          dialogueFlags: { ...state.dialogueFlags },
          puzzleFlags: { ...state.puzzleFlags },
          relationshipFlags: { ...state.relationshipFlags },
          saveVersion: state.saveVersion || 1,
          settings: { ...state.settings }
        }
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
      return JSON.parse(raw) as SaveSlotData;
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
  }
};
