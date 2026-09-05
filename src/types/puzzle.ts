/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameState, Item } from './game';

export type PuzzleType = 
  | 'item_combination'
  | 'evidence_combination'
  | 'object_interaction'
  | 'dialogue_requirement'
  | 'sequence'
  | 'deduction'
  | 'multi_step';

export interface BasePuzzle {
  id: string;
  name: string;
  type: PuzzleType;
  act: number;
  description: string;
  isSolved: (state: GameState) => boolean;
  hintIds?: string[];
}

export interface ItemCombinationPuzzle extends BasePuzzle {
  type: 'item_combination';
  itemA: string;
  itemB: string;
  resultItemId: string;
  consumedItems: string[]; // items removed from inventory upon success
  successNotice: string;
  evidenceToUnlock?: string;
  flagsToSet?: Record<string, boolean>;
  inspectModal: {
    title: string;
    description: string;
    subtext?: string;
  };
  triggerSceneTransition?: string;
}

export interface ObjectInteractionPuzzle extends BasePuzzle {
  type: 'object_interaction';
  targetObjectId: string;
  requiredItemId: string;
  successNotice: string;
  evidenceToUnlock?: string;
  flagsToSet?: Record<string, boolean>;
  inspectModal: {
    title: string;
    description: string;
    subtext?: string;
  };
  consumeItem?: boolean;
  triggerSceneTransition?: string;
}

export interface EvidenceCombinationPuzzle extends BasePuzzle {
  type: 'evidence_combination';
  evidenceA: string;
  evidenceB: string;
  resultEvidenceId: string;
  deductionText: string;
  flagsToSet?: Record<string, boolean>;
}

export interface DialogueRequirementPuzzle extends BasePuzzle {
  type: 'dialogue_requirement';
  targetNpcId: string;
  requiredEvidenceIds: string[];
  requiredFlags?: string[];
  successDialogueNodeId: string;
}

export interface SequencePuzzle extends BasePuzzle {
  type: 'sequence';
  targetObjectId: string;
  correctSequence: string[];
  currentSequenceKey: string; // state flag tracking steps
  onSuccessFlags: Record<string, boolean>;
  successNotice: string;
}

export interface DeductionPuzzle extends BasePuzzle {
  type: 'deduction';
  question: string;
  requiredEvidenceIds: string[];
  correctChoiceId: string;
  onSuccessFlags: Record<string, boolean>;
  successNotice: string;
}

export interface MultiStepPuzzle extends BasePuzzle {
  type: 'multi_step';
  steps: {
    stepId: string;
    description: string;
    requiredCondition: (state: GameState) => boolean;
  }[];
  finalRewardItemId?: string;
  finalRewardEvidenceId?: string;
  finalFlagsToSet?: Record<string, boolean>;
}

export type AnyPuzzle = 
  | ItemCombinationPuzzle 
  | ObjectInteractionPuzzle 
  | EvidenceCombinationPuzzle 
  | DialogueRequirementPuzzle 
  | SequencePuzzle 
  | DeductionPuzzle 
  | MultiStepPuzzle;
