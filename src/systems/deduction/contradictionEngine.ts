/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameState } from '../../types/game';
import { Contradiction } from '../../types/deduction';
import { GAME_CONTRADICTIONS } from '../../data/contradictions';

export interface ContradictionResolutionResult {
  success: boolean;
  contradiction: Contradiction;
  newStateUpdates?: Partial<GameState>;
  reactionText: string;
  subtext?: string;
}

export const ContradictionEngine = {
  /**
   * Get all contradictions that have their prerequisites met in current state
   */
  getAvailableContradictions(state: GameState): Contradiction[] {
    return Object.values(GAME_CONTRADICTIONS).filter(contra => contra.isAvailable(state));
  },

  /**
   * Check if a specific evidence resolves a contradiction
   */
  resolveWithEvidence(contradictionId: string, evidenceId: string, state: GameState): ContradictionResolutionResult | null {
    const contra = GAME_CONTRADICTIONS[contradictionId];
    if (!contra) return null;

    // 1. Guard against Double Resolution (Idempotent)
    if (contra.isResolved(state)) {
      return {
        success: true,
        contradiction: contra,
        reactionText: 'این تناقض قبلاً اثبات و ثبت شده است.',
        subtext: contra.resolution.subtext,
      };
    }

    // 2. Guard against Premature Resolution
    if (!contra.isAvailable(state)) {
      return {
        success: false,
        contradiction: contra,
        reactionText: 'هنوز تمام شواهد و سرنخ‌های لازم برای رد این ادعا به دست نیامده است.',
      };
    }

    // 3. Guard against Invalid Evidence Selection
    if (!contra.requiredEvidenceIds.includes(evidenceId)) {
      return {
        success: false,
        contradiction: contra,
        reactionText: 'این سرنخ تناقض مورد نظر را اثبات نمی‌کند.',
      };
    }

    // 4. Build updated state with deduplication
    const alreadyInJournal = contra.resolution.journalEntry && state.journal.some(
      j => typeof j === 'object' && j.id === contra.resolution.journalEntry?.id
    );
    const updatedJournal = contra.resolution.journalEntry && !alreadyInJournal
      ? [...state.journal, contra.resolution.journalEntry]
      : state.journal;

    const updatedFlags = {
      ...state.storyFlags,
      ...contra.resolution.flagsToSet,
    };

    const updatedEvidence = { ...state.evidence };
    if (contra.resolution.unlockedEvidenceId) {
      updatedEvidence[contra.resolution.unlockedEvidenceId] = true;
    }

    const updatedRelationships = { ...state.relationshipFlags };
    if (contra.resolution.relationshipDelta) {
      const { characterId, delta } = contra.resolution.relationshipDelta;
      const current = typeof updatedRelationships[characterId] === 'number'
        ? (updatedRelationships[characterId] as number)
        : 0;
      updatedRelationships[characterId] = current + delta;
    }

    return {
      success: true,
      contradiction: contra,
      reactionText: contra.resolution.reactionText,
      subtext: contra.resolution.subtext,
      newStateUpdates: {
        journal: updatedJournal,
        storyFlags: updatedFlags,
        dialogueFlags: {
          ...state.dialogueFlags,
          ...contra.resolution.flagsToSet,
        },
        puzzleFlags: {
          ...state.puzzleFlags,
          ...contra.resolution.flagsToSet,
        },
        evidence: updatedEvidence,
        relationshipFlags: updatedRelationships,
      },
    };
  },
};
