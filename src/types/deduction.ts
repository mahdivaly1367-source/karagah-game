/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameState, JournalEntry } from './game';

export interface DialogueStatement {
  speaker: string;
  speakerTitle?: string;
  text: string;
  sourceContext: string; // e.g. "شهادت کربلایی نعمت در حیاط"
  sourceNodeId?: string;
}

export interface FactStatement {
  title: string;
  text: string;
  sourceContext: string; // e.g. "بررسی فیزیکی حوضچه و خاک سرخ"
  sourceEvidenceId?: string;
}

export interface Contradiction {
  id: string;
  act: number;
  name: string;
  statementA: DialogueStatement | FactStatement;
  statementB: DialogueStatement | FactStatement;
  contradictionDescription: string;
  requiredEvidenceIds: string[];
  isAvailable: (state: GameState) => boolean;
  isResolved: (state: GameState) => boolean;
  resolution: {
    flagsToSet: Record<string, boolean>;
    unlockedEvidenceId?: string;
    reactionText: string;
    subtext?: string;
    journalEntry?: JournalEntry;
    relationshipDelta?: {
      characterId: string;
      delta: number;
    };
  };
}
