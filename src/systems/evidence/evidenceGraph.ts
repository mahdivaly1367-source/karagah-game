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

  // --- ACT 2 EVIDENCE NODES ---
  ev_act2_razor_cut_pages: {
    ...GAME_EVIDENCE.ev_act2_razor_cut_pages,
    act: 2,
    credibility: 'verified',
    connectedCharacters: ['safdar', 'sadiq'],
    connectedScenes: ['mirza_room_act2'],
    connectedObjects: ['obj_act2_desk_ledger'],
    connectedEvidence: ['ev_act2_pen_indentation', 'ev_act2_paper_grain_sadiq'],
    connectedDialogues: ['sadiq_mirza_paper'],
    connectedPuzzles: ['puzzle_act2_craft_shading_kit', 'puzzle_act2_reveal_ledger'],
  },
  ev_act2_pen_indentation: {
    ...GAME_EVIDENCE.ev_act2_pen_indentation,
    act: 2,
    credibility: 'verified',
    connectedCharacters: ['safdar', 'sadiq'],
    connectedScenes: ['mirza_room_act2', 'papermaker_shop'],
    connectedObjects: ['obj_act2_desk_ledger', 'obj_act2_oil_lamp'],
    connectedEvidence: ['ev_act2_razor_cut_pages', 'ev_act2_paper_grain_sadiq'],
    connectedDialogues: ['sadiq_root'],
    connectedPuzzles: ['puzzle_act2_reveal_ledger'],
    contradictionIds: ['contra_sadiq_paper_vs_erasure'],
  },
  ev_act2_paper_grain_sadiq: {
    ...GAME_EVIDENCE.ev_act2_paper_grain_sadiq,
    act: 2,
    credibility: 'verified',
    connectedCharacters: ['sadiq', 'safdar'],
    connectedScenes: ['papermaker_shop'],
    connectedObjects: ['obj_paper_drying_racks', 'obj_charcoal_tray'],
    connectedEvidence: ['ev_act2_pen_indentation', 'ev_act2_razor_cut_pages'],
    connectedDialogues: ['sadiq_mirza_paper'],
    connectedPuzzles: ['puzzle_act2_craft_shading_kit'],
    contradictionIds: ['contra_sadiq_paper_vs_erasure'],
  },
  ev_act2_false_lemon_burn: {
    ...GAME_EVIDENCE.ev_act2_false_lemon_burn,
    act: 2,
    credibility: 'fabricated',
    connectedCharacters: ['qasem'],
    connectedScenes: ['mirza_room_act2', 'bazaar'],
    connectedObjects: ['obj_act2_oil_lamp'],
    connectedEvidence: ['ev_act2_qasem_ghoul_hoax'],
    connectedDialogues: ['qasem_confront_hoax'],
    connectedPuzzles: ['puzzle_act2_lemon_heat_false_lead'],
    contradictionIds: ['contra_qasem_ghouls_vs_manifest'],
  },
  ev_act2_yaqub_bell_testimony: {
    ...GAME_EVIDENCE.ev_act2_yaqub_bell_testimony,
    act: 2,
    credibility: 'suspicious',
    connectedCharacters: ['yaqub'],
    connectedScenes: ['yaqub_house'],
    connectedObjects: ['obj_yaqub_rug'],
    connectedEvidence: ['ev_act2_iron_clapper_sound', 'ev_act2_camel_tracks_missing'],
    connectedDialogues: ['yaqub_caravan_memory', 'yaqub_audio_test'],
    connectedPuzzles: ['puzzle_act2_confront_yaqub_bell'],
    contradictionIds: ['contra_yaqub_bells_vs_tracks'],
  },
  ev_act2_iron_clapper_sound: {
    ...GAME_EVIDENCE.ev_act2_iron_clapper_sound,
    act: 2,
    credibility: 'verified',
    connectedCharacters: ['yaqub', 'qasem'],
    connectedScenes: ['yaqub_courtyard', 'yaqub_house'],
    connectedObjects: ['obj_hidden_iron_bell'],
    connectedEvidence: ['ev_act2_yaqub_bell_testimony', 'ev_act2_camel_tracks_missing'],
    connectedDialogues: ['yaqub_audio_test'],
    connectedPuzzles: ['puzzle_act2_confront_yaqub_bell'],
    contradictionIds: ['contra_yaqub_bells_vs_tracks'],
  },
  ev_act2_camel_tracks_missing: {
    ...GAME_EVIDENCE.ev_act2_camel_tracks_missing,
    act: 2,
    credibility: 'verified',
    connectedCharacters: ['yaqub', 'mahbanoo'],
    connectedScenes: ['yaqub_courtyard', 'bazaar'],
    connectedObjects: ['obj_courtyard_soft_sand'],
    connectedEvidence: ['ev_act2_yaqub_bell_testimony', 'ev_act2_red_felt_sacks'],
    connectedDialogues: ['mahbanoo_suspicious_cart'],
    connectedPuzzles: ['puzzle_act2_confront_yaqub_bell'],
    contradictionIds: ['contra_yaqub_bells_vs_tracks'],
  },
  ev_act2_red_felt_sacks: {
    ...GAME_EVIDENCE.ev_act2_red_felt_sacks,
    act: 2,
    credibility: 'verified',
    connectedCharacters: ['mahbanoo', 'morteza'],
    connectedScenes: ['bazaar'],
    connectedObjects: ['obj_fabric_hanging'],
    connectedEvidence: ['ev_act2_camel_tracks_missing', 'ev_act2_empty_chests_revelation'],
    connectedDialogues: ['mahbanoo_red_wool'],
    connectedPuzzles: [],
  },
  ev_act2_qanat_airshaft_echo: {
    ...GAME_EVIDENCE.ev_act2_qanat_airshaft_echo,
    act: 2,
    credibility: 'verified',
    connectedCharacters: ['yaqub'],
    connectedScenes: ['qanat_entrance'],
    connectedObjects: ['obj_qanat_mouth', 'obj_abandoned_wooden_chocks'],
    connectedEvidence: ['ev_act2_copper_token_cipher', 'ev_act2_empty_chests_revelation'],
    connectedDialogues: [],
    connectedPuzzles: [],
  },
  ev_act2_copper_token_cipher: {
    ...GAME_EVIDENCE.ev_act2_copper_token_cipher,
    act: 2,
    credibility: 'verified',
    connectedCharacters: ['rana', 'safdar'],
    connectedScenes: ['qanat_entrance'],
    connectedObjects: ['obj_qanat_brickwork'],
    connectedEvidence: ['ev_act2_empty_chests_revelation', 'ev_act2_rana_silence_clue'],
    connectedDialogues: ['yaqub_woman_dawn', 'sadiq_rana_mention'],
    connectedPuzzles: [],
  },
  ev_act2_empty_chests_revelation: {
    ...GAME_EVIDENCE.ev_act2_empty_chests_revelation,
    act: 2,
    credibility: 'verified',
    connectedCharacters: ['safdar', 'morteza'],
    connectedScenes: ['mirza_room_act2', 'qanat_entrance'],
    connectedObjects: ['obj_act2_desk_ledger'],
    connectedEvidence: ['ev_act2_copper_token_cipher', 'ev_act2_red_felt_sacks'],
    connectedDialogues: [],
    connectedPuzzles: ['puzzle_act2_reveal_ledger'],
  },
  ev_act2_qasem_ghoul_hoax: {
    ...GAME_EVIDENCE.ev_act2_qasem_ghoul_hoax,
    act: 2,
    credibility: 'fabricated',
    connectedCharacters: ['qasem'],
    connectedScenes: ['bazaar'],
    connectedObjects: ['obj_spice_stall'],
    connectedEvidence: ['ev_act2_false_lemon_burn', 'ev_act2_rana_silence_clue'],
    connectedDialogues: ['qasem_rumors_ghoul', 'qasem_confront_hoax'],
    connectedPuzzles: [],
    contradictionIds: ['contra_qasem_ghouls_vs_manifest'],
  },
  ev_act2_rana_silence_clue: {
    ...GAME_EVIDENCE.ev_act2_rana_silence_clue,
    act: 2,
    credibility: 'verified',
    connectedCharacters: ['rana', 'sadiq', 'yaqub'],
    connectedScenes: ['papermaker_shop', 'yaqub_house'],
    connectedObjects: ['obj_paper_drying_racks'],
    connectedEvidence: ['ev_act2_copper_token_cipher'],
    connectedDialogues: ['sadiq_rana_mention', 'yaqub_woman_dawn'],
    connectedPuzzles: [],
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
