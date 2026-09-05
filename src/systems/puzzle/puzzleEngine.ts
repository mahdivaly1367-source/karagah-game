/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameState, SceneId } from '../../types/game';
import { AnyPuzzle, ItemCombinationPuzzle, ObjectInteractionPuzzle } from '../../types/puzzle';
import { GAME_PUZZLES } from '../../data/puzzles';

export interface PuzzleResult {
  handled: boolean;
  success: boolean;
  puzzleId?: string;
  puzzle?: AnyPuzzle;
  message?: string;
  toastMessage?: string;
  newStateUpdates?: Partial<GameState>;
  triggerScene?: SceneId;
  inspectModal?: {
    title: string;
    description: string;
    subtext?: string;
  };
}

export const PuzzleEngine = {
  /**
   * Attempt to combine two items from the inventory
   */
  combineItems(item1Id: string, item2Id: string, currentState: GameState): PuzzleResult {
    const isMatch = (a: string, b: string, targetA: string, targetB: string) =>
      (a === targetA && b === targetB) || (a === targetB && b === targetA);

    for (const puzzle of Object.values(GAME_PUZZLES)) {
      if (puzzle.type === 'item_combination') {
        const combPuzzle = puzzle as ItemCombinationPuzzle;
        if (isMatch(item1Id, item2Id, combPuzzle.itemA, combPuzzle.itemB)) {
          // Calculate new inventory
          const filteredInv = currentState.inventory.filter(
            id => !combPuzzle.consumedItems.includes(id)
          );
          const updatedInv = [...filteredInv, combPuzzle.resultItemId];

          // Evidence updates
          const updatedEvidence = { ...currentState.evidence };
          if (combPuzzle.evidenceToUnlock) {
            updatedEvidence[combPuzzle.evidenceToUnlock] = true;
          }

          // Flags updates
          const updatedFlags = {
            ...currentState.puzzleFlags,
            ...(combPuzzle.flagsToSet || {}),
          };

          return {
            handled: true,
            success: true,
            puzzleId: combPuzzle.id,
            puzzle: combPuzzle,
            message: combPuzzle.successNotice,
            toastMessage: combPuzzle.successNotice,
            triggerScene: combPuzzle.triggerSceneTransition as SceneId | undefined,
            inspectModal: combPuzzle.inspectModal,
            newStateUpdates: {
              inventory: updatedInv,
              activeItemId: null,
              evidence: updatedEvidence,
              puzzleFlags: updatedFlags,
              inspectModal: combPuzzle.inspectModal,
            },
          };
        }
      }
    }

    // No valid combination
    return {
      handled: true,
      success: false,
      message: 'این دو شیء به هم ربطی ندارند.',
      toastMessage: 'این دو شیء به هم ربطی ندارند.',
      newStateUpdates: { activeItemId: null },
    };
  },

  /**
   * Attempt to use an active item on an interactive object in the scene
   */
  useItemOnObject(itemId: string, objectId: string, currentState: GameState): PuzzleResult {
    // Special shortcut for window matching
    if (objectId === 'obj_window' && (itemId === 'cloth_with_thread' || itemId === 'red_thread')) {
      const puzzle = GAME_PUZZLES.puzzle_window_nail_match as ObjectInteractionPuzzle;
      return {
        handled: true,
        success: true,
        puzzleId: puzzle.id,
        puzzle,
        message: puzzle.successNotice,
        toastMessage: puzzle.successNotice,
        inspectModal: puzzle.inspectModal,
        newStateUpdates: {
          activeItemId: null,
          puzzleFlags: {
            ...currentState.puzzleFlags,
            window_puzzle_solved: true,
          },
          evidence: {
            ...currentState.evidence,
            ev_red_thread_cloth: true,
          },
          inspectModal: puzzle.inspectModal,
        },
      };
    }

    // Special shortcut for desk/ledger + charcoal
    if ((objectId === 'obj_desk' || objectId === 'obj_account_ledger') && itemId === 'charcoal_stick') {
      if (currentState.inventory.includes('account_ledger')) {
        return this.combineItems('charcoal_stick', 'account_ledger', currentState);
      }
    }

    for (const puzzle of Object.values(GAME_PUZZLES)) {
      if (puzzle.type === 'object_interaction') {
        const objPuzzle = puzzle as ObjectInteractionPuzzle;
        if (objPuzzle.targetObjectId === objectId && objPuzzle.requiredItemId === itemId) {
          const updatedInv = objPuzzle.consumeItem 
            ? currentState.inventory.filter(id => id !== itemId) 
            : currentState.inventory;

          const updatedEvidence = { ...currentState.evidence };
          if (objPuzzle.evidenceToUnlock) {
            updatedEvidence[objPuzzle.evidenceToUnlock] = true;
          }

          return {
            handled: true,
            success: true,
            puzzleId: objPuzzle.id,
            puzzle: objPuzzle,
            message: objPuzzle.successNotice,
            toastMessage: objPuzzle.successNotice,
            inspectModal: objPuzzle.inspectModal,
            triggerScene: objPuzzle.triggerSceneTransition as SceneId | undefined,
            newStateUpdates: {
              inventory: updatedInv,
              activeItemId: null,
              evidence: updatedEvidence,
              puzzleFlags: {
                ...currentState.puzzleFlags,
                ...(objPuzzle.flagsToSet || {}),
              },
              inspectModal: objPuzzle.inspectModal,
            },
          };
        }
      }
    }

    return {
      handled: false,
      success: false,
    };
  },
};
