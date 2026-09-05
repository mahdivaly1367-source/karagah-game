import React, { useState } from 'react';
import { GameState } from '../../types/game';
import { getActiveHint } from '../../data/hints';
import { soundManager } from '../../systems/audio/soundManager';
import { Lightbulb, Lock, Unlock, HelpCircle, X, ChevronDown } from 'lucide-react';

interface HintModalProps {
  gameState: GameState;
  onClose: () => void;
}

export const HintModal: React.FC<HintModalProps> = ({ gameState, onClose }) => {
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const activeHint = getActiveHint(gameState);

  const handleUnlockNext = () => {
    soundManager.playClick();
    if (unlockedLevel < 3) {
      setUnlockedLevel(prev => prev + 1);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none animate-in fade-in duration-200"
      dir="rtl"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg rounded-2xl bg-[#1d120a] border-2 border-[#946944] shadow-2xl p-5 md:p-6 parchment-bg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button 
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 left-4 p-1.5 rounded-lg bg-[#2a1b12] hover:bg-[#42291a] text-[#bda083] hover:text-white border border-[#5a3821] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-[#5a3a24]">
          <Lightbulb className="w-6 h-6 text-amber-400 animate-pulse" />
          <div>
            <h3 className="text-lg md:text-xl font-bold text-[#faecd8]">
              الهامات و سرنخ‌های ذهن خانخله
            </h3>
            <p className="text-xs text-[#a37951]">
              راهنمای گام‌به‌گام برای جلوگیری از گیر کردن در معماها
            </p>
          </div>
        </div>

        {/* 3 Tiers */}
        <div className="space-y-3.5">
          {/* LEVEL 1: Vague Nudge */}
          <div className="p-3.5 rounded-xl bg-[#24150c]/90 border border-[#6b4227] space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-[#ffd5aa]">
              <span className="flex items-center gap-1.5">
                <Unlock className="w-4 h-4 text-emerald-400" />
                <span>سطح ۱: اشاره مبهم و حس بویایی کارآگاه</span>
              </span>
              <span className="text-[11px] text-[#8f6847]">رایگان</span>
            </div>
            <p className="text-sm text-[#ecd9c7] leading-relaxed pt-1">
              {activeHint.level1}
            </p>
          </div>

          {/* LEVEL 2: Object / Location Pointer */}
          <div className={`p-3.5 rounded-xl border transition-all ${
            unlockedLevel >= 2 
              ? 'bg-[#29170e]/90 border-[#874f2d]' 
              : 'bg-[#180e07]/60 border-[#3d2313] opacity-75'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-[#ffd5aa]">
                {unlockedLevel >= 2 ? (
                  <Unlock className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-500" />
                )}
                <span>سطح ۲: نشانی از شیء یا گوشه اتاق</span>
              </span>
            </div>
            {unlockedLevel >= 2 ? (
              <p className="text-sm text-[#ecd9c7] leading-relaxed pt-1">
                {activeHint.level2}
              </p>
            ) : (
              <p className="text-xs text-[#8f6847] italic pt-1">
                برای باز کردن راهنمایی مکان یا اشیاء، دکمه زیر را لمس کنید.
              </p>
            )}
          </div>

          {/* LEVEL 3: Logical Guide */}
          <div className={`p-3.5 rounded-xl border transition-all ${
            unlockedLevel >= 3 
              ? 'bg-[#311b10]/90 border-[#a86036]' 
              : 'bg-[#180e07]/60 border-[#3d2313] opacity-75'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center gap-1.5 text-[#ffd5aa]">
                {unlockedLevel >= 3 ? (
                  <Unlock className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Lock className="w-4 h-4 text-amber-500" />
                )}
                <span>سطح ۳: نتیجه‌گیری استنتاجی و دستورالعمل منطقی</span>
              </span>
            </div>
            {unlockedLevel >= 3 ? (
              <p className="text-sm text-[#ecd9c7] leading-relaxed pt-1">
                {activeHint.level3}
              </p>
            ) : (
              <p className="text-xs text-[#8f6847] italic pt-1">
                راهنمای حل قطعی معما تا این مرحله.
              </p>
            )}
          </div>

          {/* Unlock action */}
          {unlockedLevel < 3 && (
            <div className="pt-2 flex justify-center">
              <button
                onClick={handleUnlockNext}
                className="px-4 py-2 rounded-xl bg-[#80421e] hover:bg-[#a35527] text-white text-xs md:text-sm font-bold flex items-center gap-1.5 shadow-md transition-all"
              >
                <span>باز کردن سطح بعدی راهنمایی ({unlockedLevel + 1})</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
