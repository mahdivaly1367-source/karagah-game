import React, { useState, useEffect } from 'react';
import { soundManager } from '../../systems/audio/soundManager';
import { Sparkles, CheckCircle2, RotateCcw, Home, ArrowLeft } from 'lucide-react';

interface OutroAct1Props {
  onRestart: () => void;
  onReturnToMenu: () => void;
  onStartAct2?: () => void;
}

export const OutroAct1: React.FC<OutroAct1Props> = ({ onRestart, onReturnToMenu, onStartAct2 }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    soundManager.playPuzzleSolved();

    const timers = [
      setTimeout(() => setStep(1), 1800),  // "دفتر خالی نیست..."
      setTimeout(() => setStep(2), 4800),  // "یکی فقط بلد بوده چطور خالیش کنه."
      setTimeout(() => setStep(3), 8000),  // Faint glowing text "۷ صندوق"
      setTimeout(() => setStep(4), 11500), // Cut to black & title card "پرده اول"
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div 
      className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-black select-none text-center"
      dir="rtl"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 bg-radial from-amber-950/20 via-black to-black opacity-80" />

      {step < 4 ? (
        <div className="relative z-10 max-w-2xl mx-auto space-y-8 animate-in fade-in duration-700">
          {/* Visual of the ledger page */}
          <div className="relative mx-auto w-72 h-96 md:w-80 md:h-[420px] rounded-2xl bg-[#2a1d13] border-4 border-[#8c5e37] shadow-[0_0_50px_rgba(180,83,9,0.3)] p-6 flex flex-col justify-between overflow-hidden">
            <div className="text-xs text-[#a37951] border-b border-[#4d3320] pb-2 text-right">
              دفتر ثبت مالی کاروانسرای ریگستان - صفحه آخر
            </div>

            {/* Faint indentation that emerges */}
            <div className="my-auto flex flex-col items-center justify-center transition-all duration-1000">
              {step >= 3 ? (
                <div className="space-y-3 animate-in fade-in zoom-in-95 duration-1000">
                  <div className="text-xs text-amber-500 font-serif">
                    رد فشار قلم زیر غبار زغال پدیدار شد:
                  </div>
                  <div className="text-4xl md:text-5xl font-black text-[#ffedd5] drop-shadow-[0_0_15px_rgba(255,237,213,0.8)] font-serif tracking-wider">
                    « ۷ صندوق »
                  </div>
                  <div className="text-xs text-[#c49a6c]">
                    کاروان شتران سرخ • مهر و موم در کوهستان بیستون
                  </div>
                </div>
              ) : (
                <div className="text-[#523824] text-xs italic">
                  صفحه در نگاه اول سفید و سترده شده به نظر می‌رسد...
                </div>
              )}
            </div>

            <div className="text-[11px] text-[#704d30] border-t border-[#4d3320] pt-2 text-left">
              میرزا صفدر • یزد
            </div>
          </div>

          {/* Khan-kholeh's Voiceover lines */}
          <div className="space-y-3 min-h-[90px]">
            {step >= 1 && (
              <p className="text-xl md:text-2xl font-bold text-[#fed7aa] animate-in fade-in slide-in-from-bottom-2 duration-500">
                خانخله: «دفتر خالی نیست...»
              </p>
            )}
            {step >= 2 && (
              <p className="text-lg md:text-xl text-[#ffedd5] italic animate-in fade-in slide-in-from-bottom-2 duration-500 font-serif">
                «یکی فقط بلد بوده چطور خالیش کنه.»
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Final Cut to Black Card */
        <div className="relative z-10 max-w-xl mx-auto space-y-6 animate-in fade-in zoom-in-90 duration-1000">
          <div className="w-16 h-16 rounded-full bg-amber-950/80 border-2 border-amber-600 flex items-center justify-center mx-auto shadow-2xl">
            <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
          </div>

          <div className="space-y-2">
            <div className="text-amber-500 text-sm md:text-base font-bold tracking-widest uppercase">
              پایان نسخه آزمایشی عمودی (Vertical Slice)
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[#fff5eb] font-serif">
              پرده اول
            </h1>
            <h2 className="text-xl md:text-2xl text-[#d97706] font-semibold">
              جسد ناپیدا و راز هفت صندوق
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#cfb7a1] leading-relaxed max-w-lg mx-auto">
            خانخله نخستین پرده از راز کاروان گمشده شتران سرخ را گشود. 
            دروغ حاج مرتضی افشا شد، سرنخ پنجره به نتیجه رسید و راز پنهان میرزا صفدر آشکار گردید.
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            {onStartAct2 && (
              <button
                onClick={onStartAct2}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black text-sm md:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(245,158,11,0.5)] border border-amber-300 transition-all transform hover:scale-105"
              >
                <span>شروع پرده دوم: دفتر خالی</span>
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onReturnToMenu}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#29170e] hover:bg-[#3d2417] text-[#eddac6] hover:text-white border border-[#7a4e2f] font-semibold text-sm md:text-base flex items-center justify-center gap-2 transition-all"
            >
              <Home className="w-5 h-5" />
              <span>بازگشت به منوی اصلی</span>
            </button>
            <button
              onClick={onRestart}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#1c100a] hover:bg-[#2e1a10] text-[#a8896c] hover:text-[#d6b493] border border-[#523520] text-xs md:text-sm flex items-center justify-center gap-2 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              <span>بررسی مجدد پرده اول</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
