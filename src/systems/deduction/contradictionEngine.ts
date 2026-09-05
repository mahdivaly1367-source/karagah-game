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

    if (!contra.requiredEvidenceIds.includes(evidenceId)) {
      return {
        success: false,
        contradiction: contra,
        reactionText: 'این سرنخ تناقض مورد نظر را اثبات نمی‌کند.',
      };
    }

    // Build updated state
    const updatedJournal = contra.resolution.journalEntry
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
        evidence: updatedEvidence,
        relationshipFlags: updatedRelationships,
      },
    };
  },
};
