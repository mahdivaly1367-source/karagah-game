import React, { useState, useEffect } from 'react';
import { soundManager } from '../../systems/audio/soundManager';
import { ShieldCheck, ScrollText, Home, Compass } from 'lucide-react';

interface OutroAct3Props {
  onReturnToMenu: () => void;
  onExplore: () => void;
}

export const OutroAct3: React.FC<OutroAct3Props> = ({ onReturnToMenu, onExplore }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    soundManager.playPuzzleSolved();

    const timers = [
      setTimeout(() => setStep(1), 1800),  // "ماهی پرنده، استوانه‌ای رویین با مغزی از شمش زرین بود..."
      setTimeout(() => setStep(2), 4800),  // "کاروان شتران سرخ، بارها را به انبار بالادست بردند و در ناودانی به آب سپردند..."
      setTimeout(() => setStep(3), 8000),  // "و استوانه هفتم، سرنوشت را به پره‌های آسیاب کوبید!"
      setTimeout(() => setStep(4), 11500), // Cut to black & title card "پرده سوم: حیدرِ پل"
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div 
      className="relative w-full h-full flex flex-col items-center justify-center p-6 bg-black select-none text-center"
      dir="rtl"
    >
      {/* Background vignette */}
      <div className="absolute inset-0 bg-radial from-cyan-950/25 via-black to-black opacity-85" />

      {step < 4 ? (
        <div className="relative z-10 max-w-2xl mx-auto space-y-8 animate-in fade-in duration-700">
          {/* Visual of the cylinder and royal seal scroll */}
          <div className="relative mx-auto w-72 h-96 md:w-88 md:h-[430px] rounded-2xl bg-[#0e171b] border-4 border-[#0284c7] shadow-[0_0_60px_rgba(2,132,199,0.3)] p-6 flex flex-col justify-between overflow-hidden">
            <div className="text-xs text-cyan-400/80 border-b border-[#164e63] pb-2 text-right font-serif">
              استوانه ممهور رویین • طومار سرّی دیوان محاسبات
            </div>

            {/* Glowing reconstructed text */}
            <div className="my-auto flex flex-col items-center justify-center transition-all duration-1000">
              {step >= 3 ? (
                <div className="space-y-4 animate-in fade-in zoom-in-95 duration-1000">
                  <div className="text-xs text-cyan-400 font-serif">
                    سند رسمی اختلاس ماهیان هفت‌گانه ضرابخانه:
                  </div>
                  <div className="text-2xl md:text-3xl font-black text-[#f0f9ff] drop-shadow-[0_0_20px_rgba(56,189,248,0.8)] font-serif leading-relaxed">
                    «شمش‌ها در آبراهه روانه شوند؛ حیدر در پل برگیرد و به کالسکه‌های دارالخلافه سپارد. مهر دیوان: میرزا روشن»
                  </div>
                  <div className="text-xs text-amber-300 font-mono">
                    مهر موم سرخ سلطنتی • پرونده بزرگ فساد پایتخت
                  </div>
                </div>
              ) : (
                <div className="text-[#38bdf8] text-xs italic">
                  قطرات آب زلال از درپوش فلزی استوانه می‌چکد...
                </div>
              )}
            </div>

            <div className="text-[11px] text-[#0284c7] border-t border-[#164e63] pt-2 text-left font-serif">
              راز ماهیان رودخانه فاش شد
            </div>
          </div>

          {/* Voiceover */}
          <div className="space-y-3 min-h-[90px]">
            {step >= 1 && (
              <p className="text-xl md:text-2xl font-bold text-[#e0f2fe] animate-in fade-in slide-in-from-bottom-2 duration-500">
                خانخله: «ماهی پرنده، کپسول سربی شمش‌های طلا در دل آب بود...»
              </p>
            )}
            {step >= 2 && (
              <p className="text-lg md:text-xl text-[#bae6fd] italic animate-in fade-in slide-in-from-bottom-2 duration-500 font-serif">
                «رودخانه حامل زر و سیم بود و زیر پایه‌های پل، تور صید غارت پهن شده بود!»
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Final Cut to Black Card */
        <div className="relative z-10 max-w-xl mx-auto space-y-6 animate-in fade-in zoom-in-90 duration-1000">
          <div className="w-16 h-16 rounded-full bg-cyan-950/80 border-2 border-cyan-400 flex items-center justify-center mx-auto shadow-2xl">
            <ShieldCheck className="w-8 h-8 text-cyan-300" />
          </div>

          <div className="space-y-2">
            <div className="text-cyan-400 text-sm md:text-base font-bold tracking-widest uppercase">
              پایان موفقیت‌آمیز
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-[#f0f9ff] font-serif">
              پرده سوم
            </h1>
            <h2 className="text-xl md:text-2xl text-[#38bdf8] font-semibold">
              حیدرِ پل و راز میرزا روشن
            </h2>
          </div>

          <p className="text-sm md:text-base text-[#cbd5e1] leading-relaxed max-w-lg mx-auto">
            خانخله پرده از افسانه ماهی پرنده برداشت، شبکه مکانیکی زیر طاق‌های پل را با وینچ و کابل بالا کشید، رشوه نایب بهرام را برملا ساخت و با کشف استوانه رویین در آسیاب، طومار ممهور میرزا روشن را به دست آورد. اکنون نام آمر اصلی فساد فاش شده است!
          </p>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onReturnToMenu}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-black text-sm md:text-base flex items-center justify-center gap-2 shadow-2xl transition-all"
            >
              <Home className="w-5 h-5" />
              <span>بازگشت به منوی اصلی</span>
            </button>
            <button
              onClick={onExplore}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0f172a] hover:bg-[#1e293b] text-[#e2e8f0] hover:text-white border border-[#334155] font-semibold text-sm md:text-base flex items-center justify-center gap-2 transition-all"
            >
              <Compass className="w-5 h-5" />
              <span>کاوش در پل و رودخانه</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
