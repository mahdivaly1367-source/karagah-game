/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GameState, InteractiveObject, SceneId } from '../../types/game';
import { OBJECT_INTERACTIONS } from '../../data/interactions';
import { soundManager } from '../audio/soundManager';
import { GAME_EVIDENCE } from '../../data/evidence';
import { GAME_ITEMS } from '../../data/items';

export interface InteractionCallbacks {
  showToast: (msg: string) => void;
  changeScene: (sceneId: SceneId) => void;
  discoverEvidence: (evidenceId: string, customNotice?: string) => void;
  addItemToInventory: (itemId: string, customNotice?: string) => void;
}

export interface InteractionResult {
  handled: boolean;
  stateUpdates?: Partial<GameState>;
}

export const InteractionEngine = {
  handleObject(
    obj: InteractiveObject,
    currentState: GameState,
    callbacks: InteractionCallbacks
  ): InteractionResult {
    const def = OBJECT_INTERACTIONS[obj.id];

    if (!def) {
      callbacks.showToast(obj.name);
      return { handled: false };
    }

    // Play custom sound if specified
    if (def.customSound === 'crow') soundManager.playCrow();
    if (def.customSound === 'doorCreak') soundManager.playDoorCreak();
    if (def.customSound === 'footstep') soundManager.playFootstep();
    if (def.customSound === 'puzzleSolved') soundManager.playPuzzleSolved();

    // Scene transition
    if (def.changesScene) {
      callbacks.changeScene(def.changesScene);
      return { handled: true };
    }

    // Starts Dialogue
    if (def.startsDialogue) {
      soundManager.playClick();
      return {
        handled: true,
        stateUpdates: {
          currentDialogue: {
            npcId: def.startsDialogue.npcId,
            currentNodeId: def.startsDialogue.nodeId,
          },
        },
      };
    }

    let finalUpdates: Partial<GameState> = {};

    // Give Item
    if (def.givesItem) {
      callbacks.addItemToInventory(def.givesItem, def.itemPickupNotice);
    }

    // Discover Evidence
    if (def.discoversEvidence) {
      callbacks.discoverEvidence(def.discoversEvidence, def.evidenceNotice);
    }

    // Custom Handler
    if (def.handler) {
      const result = def.handler(currentState);
      if (result) {
        if (result.stateUpdates) {
          finalUpdates = { ...finalUpdates, ...result.stateUpdates };
        }
        if (result.toastMessage) {
          callbacks.showToast(result.toastMessage);
        }
        if (result.playItemSound) {
          soundManager.playItemPickup();
        }
        if (result.playEvidenceSound) {
          soundManager.playEvidenceDiscovered();
        }
      }
    }

    // Inspect modal
    if (def.inspectModal) {
      finalUpdates = {
        ...finalUpdates,
        inspectModal: def.inspectModal,
      };
    }

    return {
      handled: true,
      stateUpdates: Object.keys(finalUpdates).length > 0 ? finalUpdates : undefined,
    };
  },
};
