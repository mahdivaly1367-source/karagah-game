export type SceneId = 
  | 'intro' 
  | 'mirza_room' 
  | 'courtyard' 
  | 'stable' 
  | 'outer_alley' 
  | 'act1_outro'
  | 'mirza_room_act2'
  | 'bazaar'
  | 'papermaker_shop'
  | 'yaqub_house'
  | 'yaqub_courtyard'
  | 'qanat_entrance'
  | 'act2_outro';

export type CursorType = 'default' | 'inspect' | 'talk' | 'take' | 'use' | 'move' | 'combine';

export interface Item {
  id: string;
  name: string;
  description: string;
  inspectText: string;
  icon: string; // lucide icon identifier or visual SVG
  canCombineWith?: string; // itemId
  combinedResultId?: string; // result itemId
  isEvidence?: boolean;
}

export interface Evidence {
  id: string;
  name: string;
  description: string;
  source: string;
  relatedCharacters: string[];
  relatedLocations: string[];
  relatedPuzzles: string[];
  discovered: boolean;
  isFakeClue?: boolean;
  analysisText?: string;
}

export interface JournalEntry {
  id: string;
  category: 'people' | 'locations' | 'evidence' | 'notes' | 'open_questions';
  title: string;
  content: string;
  timestamp: string;
}

export interface InteractiveObject {
  id: string;
  name: string;
  description: string;
  scene: SceneId;
  bounds: {
    x: number; // percentage (0-100)
    y: number; // percentage (0-100)
    width: number; // percentage (0-100)
    height: number; // percentage (0-100)
  };
  cursorType: CursorType;
  hintDescription?: string;
  isVisible?: (state: GameState) => boolean;
  isDisabled?: (state: GameState) => boolean;
}

export interface DialogueOption {
  id: string;
  text: string;
  nextNodeId?: string;
  condition?: (state: GameState) => boolean;
  action?: (state: GameState) => Partial<GameState> | void;
  requiredEvidenceId?: string;
  isEvidenceOption?: boolean;
}

export interface DialogueNode {
  id: string;
  speaker: string;
  speakerTitle?: string;
  portraitKey: 'khan' | 'kazem' | 'nemat' | 'morteza' | 'yaqub' | 'sadiq' | 'qasem' | 'mahbanoo';
  text: string;
  options: DialogueOption[];
  onEnter?: (state: GameState) => Partial<GameState> | void;
}

export interface GameSettings {
  textSize: 'normal' | 'large';
  dialogueSpeed: 'fast' | 'normal' | 'slow';
  masterVolume: number; // 0-100
  musicVolume: number; // 0-100
  sfxVolume: number; // 0-100
  highContrast: boolean;
  subtitles: boolean;
  hintStrength: 'subtle' | 'direct';
}

export interface GameState {
  act?: number;
  currentScene: SceneId;
  inventory: string[];
  activeItemId: string | null;
  evidence: Record<string, boolean>; // evidenceId -> discovered
  journal: JournalEntry[];
  storyFlags: Record<string, boolean>;
  dialogueFlags: Record<string, boolean>;
  puzzleFlags: Record<string, boolean>;
  relationshipFlags: Record<string, number | boolean>;
  saveVersion: number;
  lastSavedTimestamp?: string;
  
  // UI states
  isMenuOpen: boolean;
  isJournalOpen: boolean;
  isInventoryOpen: boolean;
  isHintOpen: boolean;
  isSettingsOpen: boolean;
  isSaveLoadOpen: boolean;
  saveLoadMode: 'save' | 'load';
  
  // Active interaction
  currentDialogue: {
    npcId: string;
    currentNodeId: string;
  } | null;
  
  inspectModal: {
    title: string;
    description: string;
    subtext?: string;
    itemId?: string;
    actionLabel?: string;
    onAction?: () => void;
  } | null;

  toastMessage: string | null;
  hoveredObject: { name: string; actionText: string } | null;
  activeCursor: CursorType;
  settings: GameSettings;
}
