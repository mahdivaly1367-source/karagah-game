import React, { useState, useEffect } from 'react';
import { GameImages } from '../../assets/images';
import { SaveManager, SaveSlotData } from '../../systems/save/saveManager';
import { soundManager } from '../../systems/audio/soundManager';
import { Play, RotateCcw, Download, Settings, Info, Compass, ShieldAlert, Sparkles } from 'lucide-react';

interface MainMenuProps {
  onStartIntro: () => void;
  onNewGame: () => void;
  onContinue: (slotData: SaveSlotData) => void;
  onOpenLoad: () => void;
  onOpenSettings: () => void;
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartIntro,
  onNewGame,
  onContinue,
  onOpenLoad,
  onOpenSettings,
}) => {
  const [latestSave, setLatestSave] = useState<SaveSlotData | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  useEffect(() => {
    soundManager.startAmbientWind();
    const allSlots = SaveManager.getAllSlots();
    const existing = allSlots.auto || allSlots[1] || allSlots[2] || allSlots[3];
    setLatestSave(existing);
  }, []);

  return (
    <div 
      className="relative w-full h-full flex flex-col justify-between p-6 md:p-12 select-none overflow-hidden bg-black"
      dir="rtl"
    >
      {/* Background digital painting */}
      <div className="absolute inset-0 z-0">
        <img 
          src={GameImages.menuBg} 
          alt="Menu Desert Sunset" 
          className="w-full h-full object-cover filter contrast-110 brightness-95"
          referrerPolicy="no-referrer"
        />
        <div className="vignette-overlay absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60" />
      </div>

      {/* Top Bar Header */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 border border-[#7a4e2e] backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-semibold text-[#f5ebd9]">
            نسخه آزمایشی عمودی (Vertical Slice) • پرده اول
          </span>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            setIsAboutOpen(true);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/60 hover:bg-black/80 text-[#e6cfb8] hover:text-white border border-[#7a4e2e] backdrop-blur-md text-xs font-semibold transition-colors"
        >
          <Info className="w-4 h-4" />
          <span>درباره بازی و شناسنامه تیم</span>
        </button>
      </div>

      {/* Center/Foreground Title & Branding */}
      <div className="relative z-10 my-auto flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto w-full">
        {/* Title side */}
        <div className="text-center md:text-right space-y-3">
          <div className="inline-block px-3.5 py-1 rounded-full bg-[#824424]/90 border border-[#c97444] text-[#ffe6cc] text-xs md:text-sm font-bold shadow-lg">
            بازی ماجراجویی اشاره و کلیک کارآگاهی
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#fff5eb] tracking-tight font-serif drop-shadow-[0_8px_20px_rgba(0,0,0,0.9)]">
            خانخله
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#f59e0b] drop-shadow-md">
            سایه بر کاروان
          </h2>
          <p className="text-sm md:text-base text-[#ded0bf] max-w-md leading-relaxed font-sans pt-2 drop-shadow">
            روایتی طنز و معمایی از سرنوشت کاروان گمشده «شتران سرخ»، میرزا صفدر حسابدار و تیزبینی رفعت‌خان ملقب به خانخله.
          </p>
        </div>

        {/* Buttons Menu */}
        <div className="w-full sm:w-80 flex flex-col gap-2.5">
          {/* Continue button if save exists */}
          {latestSave && (
            <button
              onClick={() => {
                soundManager.playClick();
                soundManager.playDoorCreak();
                onContinue(latestSave);
              }}
              className="group flex items-center justify-between px-6 py-3.5 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-white font-bold text-base shadow-2xl transition-all hover:scale-105 active:scale-95"
            >
              <div className="flex items-center gap-2.5">
                <Play className="w-5 h-5 fill-white" />
                <span>ادامه پرونده</span>
              </div>
              <span className="text-xs font-normal opacity-85">
                ({latestSave.sceneName})
              </span>
            </button>
          )}

          {/* Start with Intro */}
          <button
            onClick={() => {
              soundManager.playClick();
              onStartIntro();
            }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#28160d]/90 hover:bg-[#3d2417] text-[#faedd9] hover:text-white border-2 border-[#7a4e2e] hover:border-[#b45309] font-bold text-base shadow-xl backdrop-blur-md transition-all hover:translate-x-[-4px]"
          >
            <Compass className="w-5 h-5 text-amber-400" />
            <span>شروع بازی (با پیش‌درآمد سینمایی)</span>
          </button>

          {/* New Game directly */}
          <button
            onClick={() => {
              soundManager.playClick();
              onNewGame();
            }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#28160d]/90 hover:bg-[#3d2417] text-[#faedd9] hover:text-white border-2 border-[#7a4e2e] hover:border-[#b45309] font-bold text-base shadow-xl backdrop-blur-md transition-all hover:translate-x-[-4px]"
          >
            <RotateCcw className="w-5 h-5 text-amber-400" />
            <span>شروع بازی جدید</span>
          </button>

          {/* Load Game */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenLoad();
            }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#28160d]/90 hover:bg-[#3d2417] text-[#faedd9] hover:text-white border-2 border-[#7a4e2e] hover:border-[#b45309] font-bold text-base shadow-xl backdrop-blur-md transition-all hover:translate-x-[-4px]"
          >
            <Download className="w-5 h-5 text-amber-400" />
            <span>بارگذاری پرونده (Save / Load)</span>
          </button>

          {/* Settings */}
          <button
            onClick={() => {
              soundManager.playClick();
              onOpenSettings();
            }}
            className="flex items-center gap-2.5 px-6 py-3 rounded-xl bg-[#28160d]/90 hover:bg-[#3d2417] text-[#faedd9] hover:text-white border-2 border-[#7a4e2e] hover:border-[#b45309] font-bold text-base shadow-xl backdrop-blur-md transition-all hover:translate-x-[-4px]"
          >
            <Settings className="w-5 h-5 text-amber-400" />
            <span>تنظیمات و دسترسی‌پذیری</span>
          </button>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between text-xs text-[#a88970] pt-4 border-t border-[#4a2e1c]">
        <div>
          تیم بازیسازی «خانخله»: طراحی روایت، پازل، تصویرسازی ۲ بعدی، صدا و پیاده‌سازی کامل Point & Click
        </div>
        <div className="mt-1 sm:mt-0 font-mono">
          V1.0 • React + TypeScript + WebAudio API
        </div>
      </div>

      {/* About Modal */}
      {isAboutOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsAboutOpen(false)}
        >
          <div 
            className="w-full max-w-lg rounded-2xl bg-[#1d120a] border-2 border-[#946944] shadow-2xl p-6 parchment-bg space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-[#faecd8] border-b border-[#5a3a24] pb-2">
              شناسنامه بازی «خانخله: سایه بر کاروان»
            </h3>
            <div className="space-y-2 text-sm text-[#e0cfba] leading-relaxed">
              <p>
                <strong>ژانر:</strong> ماجراجویی کارآگاهی تاریخی (Point & Click Adventure) با چاشنی طنز و درام.
              </p>
              <p>
                <strong>زبان و خط:</strong> فارسی اصیل، راست‌به‌چپ (RTL)، تایپوگرافی اصیل با خط وزیرمتن.
              </p>
              <p>
                <strong>تیم کامل بازی‌سازی:</strong> Game Design, Narrative Design, Puzzle Design, UX/UI, 2D Art Direction, Web Audio Synthesis & QA Engineering.
              </p>
              <p>
                <strong>پلتفرم:</strong> وب‌محور، بدون نیاز به بک‌اند خارجی، همراه با سیستم ذخیره و بارگذاری ۳ شیاره و ذخیره خودکار در حافظه محلی.
              </p>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsAboutOpen(false)}
                className="px-5 py-2 rounded-xl bg-[#8a4a25] hover:bg-[#ab5d2f] text-white font-bold text-sm"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
