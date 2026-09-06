import React, { useState, useEffect } from 'react';
import { soundManager } from '../../systems/audio/soundManager';
import { Sparkles, ScrollText, RotateCcw, Home, Compass, ArrowRight } from 'lucide-react';

interface OutroAct2Props {
  onReturnToMenu: () => void;
  onExplore: () => void;
  onStartAct3?: () => void;
}

export const OutroAct2: React.FC<OutroAct2Props> = ({ onReturnToMenu, onExplore, onStartAct3 }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    soundManager.playPuzzleSolved();

    const timers = [
      setTimeout(() => setStep(1), 1800),  // "صندوق‌ها هرگز پر از طلا نبودند..."
      setTimeout(() => setStep(2), 4800),  // "سرقت یک دروغ بود؛ غارت پیش از ورود آغاز شده بود."
      setTimeout(() => setStep(3), 8000),  // Dramatic revelation: "خزانهٔ باد تهی بود"
      setTimeout(() => setStep(4), 11500), // Cut to black & title card "پرده دوم: دفتر خالی"
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div 
      className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-black select-none text-center"
      dir="rtl"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 bg-radial from-red-950/25 via-black to-black opacity-85" />

      {step < 4 ? (
        <div className="relative z-10 max-w-2xl mx-auto space-y-8 animate-in fade-in duration-700">
          {/* Visual of the reconstructed ledger page */}
          <div className="relative mx-auto w-72 h-96 md:w-88 md:h-[430px] rounded-2xl bg-[#1e130c] border-4 border-[#b45309] shadow-[0_0_60px_rgba(220,38,38,0.3)] p-6 flex flex-col justify-between overflow-hidden">
            <div className="text-xs text-amber-500/80 border-b border-[#4d3320] pb-2 text-right font-serif">
              دفترچه بازخوانی‌شده میرزا صفدر • دوده بید بر کاغذ آهارمهره
            </div>

            {/* Glowing reconstructed text */}
            <div className="my-auto flex flex-col items-center justify-center transition-all duration-1000">
              {step >= 3 ? (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-1000">
                  <div className="text-xs text-amber-400 font-serif">
                    اعتراف خاموش در شیارهای عمیق قلم‌نی:
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-[#ffedd5] drop-shadow-[0_0_20px_rgba(251,191,36,0.8)] font-serif leading-relaxed">
                    «صندوق‌ها تهی بودند. طلایی در کار نبود. هفت صندوق با سرب و ماسه سنگین شده بودند...»
                  </div>
                  <div className="text-xs text-amber-300/80 font-mono">
                    نشان ضرابخانه سلطنتی • پلاک خزانهٔ باد
                  </div>
                </div>
              ) : (
                <div className="text-[#69482d] text-xs italic">
                  غبار نرم دوده بر شیارهای معکوس کاغذ می‌نشیند...
                </div>
              )}
            </div>

            <div className="text-[11px] text-[#855836] border-t border-[#4d3320] pt-2 text-left font-serif">
              امضای رمزی: «باد بر آب حکومت می‌کند»
            </div>
          </div>

          {/* Voiceover */}
          <div className="space-y-3 min-h-[90px]">
            {step >= 1 && (
              <p className="text-xl md:text-2xl font-bold text-[#fed7aa] animate-in fade-in slide-in-from-bottom-2 duration-500">
                خانخله: «صندوق‌ها هرگز پر از طلا نبودند...»
              </p>
            )}
            {step >= 2 && (
              <p className="text-lg md:text-xl text-[#fecaca] italic animate-in fade-in slide-in-from-bottom-2 duration-500 font-serif">
                «سرقت یک نمایش بود؛ تا همه به دنبال شتران خیالی بگردند، در حالی که غارت سال‌ها پیش انجام شده بود.»
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Final Cut to Black Card */
        <div className="relative z-10 max-w-xl mx-auto space-y-6 animate-in fade-in zoom-in-90 duration-1000">
          <div className="w-16 h-16 rounded-full bg-red-950/80 border-2 border-amber-500 flex items-center justify-center mx-auto shadow-2xl">
            <ScrollText className="w-8 h-8 text-amber-400" />
          </div>

          <div className="space-y-2">
            <div className="text-amber-500 text-sm md:text-base font-bold tracking-widest uppercase">
              پایان موفقیت‌آمیز
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[#fff5eb] font-serif">
              پرده دوم
            </h1>
            <h2 className="text-xl md:text-2xl text-[#f59e0b] font-semibold">
              دفتر خالی و راز صندوق‌های تهی
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#cfb7a1] leading-relaxed max-w-lg mx-auto">
            خانخله پرده از دروغ صوتی زنگوله برداشت، رمال بازارچه را به اعتراف واداشت و با کشف راز بافت کاغذ آهارمهره، بزرگ‌ترین توطئه جعل خزانه را برملا کرد: طلایی به سرقت نرفته بود، چون صندوق‌ها از همان آغاز با ماسه و سرب پر شده بودند!
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            {onStartAct3 && (
              <button
                onClick={onStartAct3}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-stone-950 font-black text-sm md:text-base flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(16,185,129,0.4)] transition-all"
              >
                <span>آغاز پرده سوم: حیدرِ پل</span>
                <ArrowRight className="w-5 h-5 rotate-180" />
              </button>
            )}
            <button
              onClick={onReturnToMenu}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black text-sm md:text-base flex items-center justify-center gap-2 shadow-2xl transition-all"
            >
              <Home className="w-5 h-5" />
              <span>بازگشت به منوی اصلی</span>
            </button>
            <button
              onClick={onExplore}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#29170e] hover:bg-[#3d2417] text-[#eddac6] hover:text-white border border-[#7a4e2f] font-semibold text-sm md:text-base flex items-center justify-center gap-2 transition-all"
            >
              <Compass className="w-5 h-5" />
              <span>کاوش در بازارچه و آبادی</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
