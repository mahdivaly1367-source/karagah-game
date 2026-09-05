/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SceneId } from '../../types/game';
import { EvidenceNode } from '../../types/evidence';
import { GAME_EVIDENCE } from '../../data/evidence';

// Enhanced evidence nodes with explicit graph connectivity
export const EVIDENCE_GRAPH: Record<string, EvidenceNode> = {
  ev_window_dust: {
    ...GAME_EVIDENCE.ev_window_dust,
    act: 1,
    credibility: 'verified',
    connectedCharacters: ['safdar', 'khan'],
    connectedScenes: ['mirza_room', 'outer_alley'],
    connectedObjects: ['obj_window', 'obj_window_nail_thread'],
    connectedEvidence: ['ev_red_thread_cloth'],
    connectedDialogues: ['kazem_lastnight'],
    connectedPuzzles: ['puzzle_combine_cloth_thread', 'puzzle_window_nail_match'],
  },
  ev_cold_tea: {
    ...GAME_EVIDENCE.ev_cold_tea,
    act: 1,
    credibility: 'verified',
    connectedCharacters: ['safdar', 'nemat'],
    connectedScenes: ['mirza_room'],
    connectedObjects: ['obj_tea_cup', 'obj_desk'],
    connectedEvidence: ['ev_fake_writing', 'ev_red_thread_cloth'],
    connectedDialogues: ['nemat_safdar'],
    connectedPuzzles: ['puzzle_timeline'],
    contradictionIds: ['contra_khan_bandit_theory'],
  },
  ev_holed_coin: {
    ...GAME_EVIDENCE.ev_holed_coin,
    act: 1,
    credibility: 'verified',
    connectedCharacters: ['safdar', 'morteza', 'nemat'],
    connectedScenes: ['mirza_room', 'stable'],
    connectedObjects: ['obj_holed_coin', 'obj_desk'],
    connectedEvidence: ['ev_morteza_boots'],
    connectedDialogues: ['morteza_coin', 'nemat_coin'],
    connectedPuzzles: ['puzzle_confront_morteza'],
  },
  ev_red_thread_cloth: {
    ...GAME_EVIDENCE.ev_red_thread_cloth,
    act: 1,
    credibility: 'verified',
    connectedCharacters: ['morteza', 'safdar'],
    connectedScenes: ['mirza_room', 'stable'],
    connectedObjects: ['obj_window_nail_thread', 'obj_chest'],
    connectedEvidence: ['ev_window_dust', 'ev_morteza_boots'],
    connectedDialogues: ['morteza_alibi'],
    connectedPuzzles: ['puzzle_combine_cloth_thread', 'puzzle_window_nail_match'],
    contradictionIds: ['contra_khan_bandit_theory'],
  },
  ev_fake_writing: {
    ...GAME_EVIDENCE.ev_fake_writing,
    act: 1,
    credibility: 'fabricated',
    connectedCharacters: ['safdar', 'nemat'],
    connectedScenes: ['mirza_room'],
    connectedObjects: ['obj_wall_writing', 'obj_hearth_charcoal'],
    connectedEvidence: ['ev_cold_tea'],
    connectedDialogues: ['nemat_writing', 'kazem_incident'],
    connectedPuzzles: ['puzzle_reveal_ledger'],
    contradictionIds: ['contra_wall_writing'],
  },
  ev_morteza_boots: {
    ...GAME_EVIDENCE.ev_morteza_boots,
    act: 1,
    credibility: 'verified',
    connectedCharacters: ['morteza'],
    connectedScenes: ['courtyard', 'stable'],
    connectedObjects: ['obj_mud_pool', 'obj_morteza_boots'],
    connectedEvidence: ['ev_red_thread_cloth', 'ev_holed_coin'],
    connectedDialogues: ['morteza_root', 'morteza_confront'],
    connectedPuzzles: ['puzzle_confront_morteza'],
    contradictionIds: ['contra_morteza_alibi'],
  },
};

export const EvidenceGraph = {
  getNode(id: string): EvidenceNode | undefined {
    return EVIDENCE_GRAPH[id];
  },

  getAllNodes(): EvidenceNode[] {
    return Object.values(EVIDENCE_GRAPH);
  },

  getRelatedEvidence(evidenceId: string): EvidenceNode[] {
    const node = EVIDENCE_GRAPH[evidenceId];
    if (!node) return [];
    return node.connectedEvidence
      .map(id => EVIDENCE_GRAPH[id])
      .filter((n): n is EvidenceNode => Boolean(n));
  },

  getEvidenceForScene(sceneId: SceneId): EvidenceNode[] {
    return Object.values(EVIDENCE_GRAPH).filter(node => 
      node.connectedScenes.includes(sceneId)
    );
  },

  getEvidenceForCharacter(characterId: string): EvidenceNode[] {
    return Object.values(EVIDENCE_GRAPH).filter(node => 
      node.connectedCharacters.includes(characterId)
    );
  },

  getContradictionsForEvidence(evidenceId: string): string[] {
    return EVIDENCE_GRAPH[evidenceId]?.contradictionIds || [];
  },
};
