import React from 'react';
import { GameState } from '../../types/game';
import { soundManager } from '../../systems/audio/soundManager';
import { 
  Package, 
  BookMarked, 
  Lightbulb, 
  Sparkles, 
  Settings, 
  Save, 
  Compass, 
  Menu 
} from 'lucide-react';

interface TopBarProps {
  gameState: GameState;
  currentSceneName: string;
  isHighlightActive: boolean;
  onToggleHighlight: () => void;
  onOpenInventory: () => void;
  onOpenJournal: () => void;
  onOpenHint: () => void;
  onOpenSettings: () => void;
  onOpenMenu: () => void;
  onOpenSave: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  gameState,
  currentSceneName,
  isHighlightActive,
  onToggleHighlight,
  onOpenInventory,
  onOpenJournal,
  onOpenHint,
  onOpenSettings,
  onOpenMenu,
  onOpenSave,
}) => {
  return (
    <header 
      className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none select-none"
      dir="rtl"
    >
      {/* Location & Act Badges */}
      <div className="pointer-events-auto flex items-center gap-2">
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#1d120a]/90 border border-[#8a5b39] shadow-xl backdrop-blur-md">
          <Compass className="w-4 h-4 text-[#dca66e]" />
          <span className="text-xs md:text-sm font-bold text-[#faecd8]">
            {currentSceneName}
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#2a170d]/80 border border-[#784d2c] text-[11px] font-semibold text-[#f0d6b6] backdrop-blur-md shadow-lg">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          <span>{gameState.act === 2 || gameState.currentScene.includes('act2') || ['bazaar', 'paper_shop', 'yaqub_house', 'yaqub_courtyard', 'qanat_entrance'].includes(gameState.currentScene) ? 'پرده دوم: دفتر خالی' : 'پرده اول: جسد ناپیدا'}</span>
        </div>
      </div>

      {/* Main Controls Tray */}
      <div className="pointer-events-auto flex items-center gap-1.5 md:gap-2 p-1.5 rounded-xl bg-[#1b1009]/90 border border-[#825433] shadow-2xl backdrop-blur-md">
        {/* Highlight Hotspots toggle */}
        <button
          onClick={() => {
            soundManager.playClick();
            onToggleHighlight();
          }}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            isHighlightActive
              ? 'bg-[#b45309] text-white shadow-md'
              : 'bg-[#29170e] text-[#d6b08b] hover:bg-[#3d2417] hover:text-white'
          }`}
          title="برجسته‌سازی تمام اشیاء تعاملی (برای جلوگیری از جستجوی پیکسلی)"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span className="hidden sm:inline">اشیاء تعاملی</span>
        </button>

        {/* Inventory */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenInventory();
          }}
          className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            gameState.isInventoryOpen
              ? 'bg-[#b45309] text-white shadow-md'
              : 'bg-[#29170e] text-[#d6b08b] hover:bg-[#3d2417] hover:text-white'
          }`}
          title="خورجین خانخله"
        >
          <Package className="w-3.5 h-3.5 text-[#e6a86c]" />
          <span className="hidden sm:inline">خورجین</span>
          {gameState.inventory.length > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#993b1f] text-[10px] text-white font-bold flex items-center justify-center">
              {gameState.inventory.length}
            </span>
          )}
        </button>

        {/* Journal */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenJournal();
          }}
          className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            gameState.isJournalOpen
              ? 'bg-[#b45309] text-white shadow-md'
              : 'bg-[#29170e] text-[#d6b08b] hover:bg-[#3d2417] hover:text-white'
          }`}
          title="کتابچه یادداشت و سرنخ‌ها"
        >
          <BookMarked className="w-3.5 h-3.5 text-[#e6a86c]" />
          <span className="hidden sm:inline">یادداشت‌ها</span>
        </button>

        {/* Hint */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenHint();
          }}
          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#29170e] hover:bg-[#3d2417] text-[#d6b08b] hover:text-amber-200 text-xs font-semibold transition-all"
          title="راهنما و الهامات"
        >
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">راهنما</span>
        </button>

        <div className="w-[1px] h-5 bg-[#4e311f] mx-0.5" />

        {/* Save / Load */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenSave();
          }}
          className="p-1.5 rounded-lg bg-[#29170e] hover:bg-[#3d2417] text-[#d6b08b] hover:text-white transition-all"
          title="ذخیره یا بارگذاری"
        >
          <Save className="w-4 h-4" />
        </button>

        {/* Settings */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenSettings();
          }}
          className="p-1.5 rounded-lg bg-[#29170e] hover:bg-[#3d2417] text-[#d6b08b] hover:text-white transition-all"
          title="تنظیمات"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* Menu */}
        <button
          onClick={() => {
            soundManager.playClick();
            onOpenMenu();
          }}
          className="p-1.5 rounded-lg bg-[#3b2011] hover:bg-[#522e1a] text-[#ffd4aa] hover:text-white transition-all"
          title="منوی اصلی"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
