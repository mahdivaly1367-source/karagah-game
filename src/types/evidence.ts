/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneId } from './game';

export type EvidenceCredibility = 'verified' | 'suspicious' | 'fabricated' | 'unexamined';

export interface EvidenceNode {
  id: string;
  name: string;
  description: string;
  source: string;
  act: number;
  credibility: EvidenceCredibility;
  isFakeClue?: boolean;
  analysisText?: string;
  
  // Explicit Graph Relationships
  connectedCharacters: string[]; // e.g. ['morteza', 'safdar']
  connectedScenes: SceneId[];    // e.g. ['mirza_room', 'stable']
  connectedObjects: string[];   // e.g. ['obj_mud_pool', 'obj_morteza_boots']
  connectedEvidence: string[];  // e.g. ['ev_cold_tea', 'ev_window_dust']
  connectedDialogues: string[]; // e.g. ['morteza_root', 'morteza_confront']
  connectedPuzzles: string[];   // e.g. ['puzzle_window_escape']
  contradictionIds?: string[];  // e.g. ['contra_morteza_alibi']
}
