import React from 'react';
import { GameState, Item } from '../../types/game';
import { GAME_ITEMS } from '../../data/items';
import { soundManager } from '../../systems/audio/soundManager';
import { 
  Coins, 
  Scissors, 
  Layers, 
  FileCheck, 
  BookOpen, 
  Flame, 
  Sparkles, 
  Package, 
  Eye, 
  Combine as CombineIcon, 
  X
} from 'lucide-react';

interface InventoryBarProps {
  gameState: GameState;
  onSelectItem: (itemId: string | null) => void;
  onInspectItem: (item: Item) => void;
  onCombineItems: (item1Id: string, item2Id: string) => void;
  onClose: () => void;
}

export const InventoryBar: React.FC<InventoryBarProps> = ({
  gameState,
  onSelectItem,
  onInspectItem,
  onCombineItems,
  onClose
}) => {
  const getItemIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coins': return <Coins className="w-6 h-6 text-amber-300" />;
      case 'Scissors': return <Scissors className="w-6 h-6 text-rose-400" />;
      case 'Layers': return <Layers className="w-6 h-6 text-stone-300" />;
      case 'FileCheck': return <FileCheck className="w-6 h-6 text-red-400" />;
      case 'BookOpen': return <BookOpen className="w-6 h-6 text-amber-200" />;
      case 'Flame': return <Flame className="w-6 h-6 text-orange-400" />;
      case 'Sparkles': return <Sparkles className="w-6 h-6 text-yellow-300" />;
      default: return <Package className="w-6 h-6 text-amber-100" />;
    }
  };

  const inventoryItems = gameState.inventory
    .map(id => GAME_ITEMS[id])
    .filter(Boolean);

  const activeItem = gameState.activeItemId ? GAME_ITEMS[gameState.activeItemId] : null;

  const handleItemClick = (item: Item) => {
    soundManager.playClick();
    if (!gameState.activeItemId) {
      // Select for use/combine
      onSelectItem(item.id);
    } else if (gameState.activeItemId === item.id) {
      // Deselect
      onSelectItem(null);
    } else {
      // Attempt combination
      onCombineItems(gameState.activeItemId, item.id);
    }
  };

  return (
    <div 
      className="absolute bottom-4 left-4 right-4 z-40 max-w-4xl mx-auto rounded-2xl bg-[#1b120c]/95 border-2 border-[#825c3f] shadow-2xl p-3 md:p-4 backdrop-blur-md animate-in fade-in slide-in-from-bottom-3 duration-200"
      dir="rtl"
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#4d3422]">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-[#dca66e]" />
          <span className="font-bold text-[#f5ebd9] text-sm md:text-base">
            خورجین خانخله (موجودی و اشیاء)
          </span>
          <span className="text-xs text-[#9d734e] bg-[#2a1a11] px-2 py-0.5 rounded-full">
            {inventoryItems.length} شیء
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {activeItem && (
            <div className="flex items-center gap-2 bg-[#3f2516] border border-[#a86e42] px-3 py-1 rounded-lg text-xs md:text-sm text-[#ffd6aa]">
              <CombineIcon className="w-4 h-4 text-amber-300 animate-spin" />
              <span>انتخاب‌شده: {activeItem.name} (برای ترکیب کلیک کنید)</span>
              <button 
                onClick={() => onSelectItem(null)}
                className="text-[#e2a87a] hover:text-white mr-1"
                title="لغو انتخاب"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-[#382215] text-[#b38a66] hover:text-[#fff] transition-colors"
            title="بستن خورجین"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Item Slots */}
      {inventoryItems.length === 0 ? (
        <div className="py-8 text-center text-[#9c7552] text-sm">
          خورجین در حال حاضر خالی است. در اتاق میرزا و حیاط به دنبال سرنخ‌ها و اشیاء بگردید.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2.5">
          {inventoryItems.map((item) => {
            const isSelected = gameState.activeItemId === item.id;
            return (
              <div
                key={item.id}
                className={`relative group rounded-xl p-2.5 flex flex-col items-center justify-between border-2 transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-[#472817] border-[#ffaa5a] shadow-[0_0_12px_rgba(255,170,90,0.35)] scale-105'
                    : 'bg-[#26180f]/90 hover:bg-[#352115] border-[#5a3b25] hover:border-[#966744]'
                }`}
                onClick={() => handleItemClick(item)}
              >
                <div className="w-12 h-12 rounded-lg bg-[#19100a] flex items-center justify-center border border-[#442b1a] mb-1.5 group-hover:scale-105 transition-transform">
                  {getItemIcon(item.icon)}
                </div>

                <div className="text-xs font-semibold text-[#f1e3cf] text-center line-clamp-1 w-full">
                  {item.name}
                </div>

                {/* Quick Inspect Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    soundManager.playClick();
                    onInspectItem(item);
                  }}
                  className="mt-1.5 w-full py-1 rounded bg-[#1c120b] hover:bg-[#3d2415] border border-[#4a311f] text-[11px] text-[#c99f74] hover:text-[#ffe4c7] flex items-center justify-center gap-1 transition-colors"
                  title="وارسی دقیق"
                >
                  <Eye className="w-3 h-3" />
                  <span>وارسی</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
