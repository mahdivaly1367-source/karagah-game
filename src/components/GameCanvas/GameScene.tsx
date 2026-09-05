import React, { useState } from 'react';
import { GameState, InteractiveObject, CursorType } from '../../types/game';
import { SCENES } from '../../data/scenes';
import { soundManager } from '../../systems/audio/soundManager';
import { 
  Eye, 
  MessageSquare, 
  Hand, 
  Wrench, 
  Compass, 
  Combine as CombineIcon, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';

interface GameSceneProps {
  gameState: GameState;
  isHighlightActive: boolean;
  onInteract: (obj: InteractiveObject) => void;
  onHoverObject: (hoverData: { name: string; actionText: string; cursorType: CursorType } | null) => void;
}

export const GameScene: React.FC<GameSceneProps> = ({
  gameState,
  isHighlightActive,
  onInteract,
  onHoverObject,
}) => {
  const currentSceneConfig = SCENES[gameState.currentScene];
  const [hoveredObjectId, setHoveredObjectId] = useState<string | null>(null);

  if (!currentSceneConfig) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black text-amber-500">
        صحنه یافت نشد.
      </div>
    );
  }

  const getActionLabel = (cursorType: CursorType, name: string) => {
    switch (cursorType) {
      case 'inspect': return `وارسی ${name}`;
      case 'talk': return `گفتگو با ${name}`;
      case 'take': return `برداشتن ${name}`;
      case 'use': return `استفاده از ${name}`;
      case 'move': return `رفتن به ${name}`;
      case 'combine': return `ترکیب با ${name}`;
      default: return name;
    }
  };

  const getCursorIcon = (cursorType: CursorType) => {
    switch (cursorType) {
      case 'inspect': return <Eye className="w-4 h-4 text-amber-300" />;
      case 'talk': return <MessageSquare className="w-4 h-4 text-cyan-300" />;
      case 'take': return <Hand className="w-4 h-4 text-emerald-300" />;
      case 'use': return <Wrench className="w-4 h-4 text-yellow-300" />;
      case 'move': return <Compass className="w-4 h-4 text-orange-300" />;
      case 'combine': return <CombineIcon className="w-4 h-4 text-rose-300" />;
      default: return null;
    }
  };

  // Filter objects based on visibility rules (e.g. items already picked up)
  const visibleObjects = currentSceneConfig.objects.filter(obj => {
    if (obj.isVisible) return obj.isVisible(gameState);

    // Default item pickup visibility checks
    if (obj.id === 'obj_window_nail_thread' && (gameState.inventory.includes('red_thread') || gameState.inventory.includes('cloth_with_thread'))) {
      return false;
    }
    if (obj.id === 'obj_holed_coin' && gameState.inventory.includes('coin_hole')) {
      return false;
    }
    if (obj.id === 'obj_account_ledger' && (gameState.inventory.includes('account_ledger') || gameState.inventory.includes('revealed_ledger'))) {
      return false;
    }
    if (obj.id === 'obj_hearth_charcoal' && gameState.inventory.includes('charcoal_stick')) {
      return false;
    }

    return true;
  });

  return (
    <div 
      className="relative w-full h-full overflow-hidden select-none bg-stone-950"
      dir="rtl"
    >
      {/* Background Image */}
      <img 
        src={currentSceneConfig.bgImage} 
        alt={currentSceneConfig.name}
        className="w-full h-full object-cover select-none pointer-events-none transition-all duration-700 ease-out"
        referrerPolicy="no-referrer"
      />

      {/* Atmospheric Vignette & Color Grading */}
      <div className="vignette-overlay absolute inset-0" />

      {/* Interactive Hotspots Layer */}
      <div className="absolute inset-0 z-20">
        {visibleObjects.map((obj) => {
          const isHovered = hoveredObjectId === obj.id;
          const actionText = getActionLabel(obj.cursorType, obj.name);

          return (
            <div
              key={obj.id}
              style={{
                left: `${obj.bounds.x}%`,
                top: `${obj.bounds.y}%`,
                width: `${obj.bounds.width}%`,
                height: `${obj.bounds.height}%`,
              }}
              className={`absolute cursor-pointer transition-all duration-200 rounded-xl group ${
                isHighlightActive || gameState.settings.highContrast
                  ? 'border-2 border-amber-400/80 bg-amber-500/15 shadow-[0_0_15px_rgba(245,158,11,0.3)] animate-pulse'
                  : isHovered
                  ? 'border border-amber-300/60 bg-amber-400/10'
                  : 'bg-transparent'
              }`}
              onMouseEnter={() => {
                setHoveredObjectId(obj.id);
                onHoverObject({
                  name: obj.name,
                  actionText,
                  cursorType: obj.cursorType,
                });
              }}
              onMouseLeave={() => {
                setHoveredObjectId(null);
                onHoverObject(null);
              }}
              onClick={() => {
                soundManager.playClick();
                onInteract(obj);
              }}
            >
              {/* Optional Hotspot Label Badge on Hover or Highlight */}
              {(isHovered || isHighlightActive) && (
                <div className="absolute -top-7 right-1/2 translate-x-1/2 z-30 px-2.5 py-1 rounded-md bg-[#1d120a]/95 border border-[#8a5b39] shadow-xl text-[11px] md:text-xs font-bold text-[#ffd7a8] whitespace-nowrap flex items-center gap-1.5 pointer-events-none backdrop-blur-sm animate-in fade-in zoom-in-95 duration-150">
                  {getCursorIcon(obj.cursorType)}
                  <span>{actionText}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Floating Hover Status Bar */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 pointer-events-none select-none">
        {hoveredObjectId && (
          <div className="px-4 py-1.5 rounded-full bg-black/75 border border-[#8a5b39] text-[#faedd9] text-xs md:text-sm font-semibold backdrop-blur-md shadow-2xl flex items-center gap-2 animate-in fade-in duration-150">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{visibleObjects.find(o => o.id === hoveredObjectId)?.name}</span>
          </div>
        )}
      </div>
    </div>
  );
};
