import React, { useState, useEffect } from 'react';
import { GameImages } from '../../assets/images';
import { soundManager } from '../../systems/audio/soundManager';
import { ChevronLeft, Play, SkipForward } from 'lucide-react';

interface IntroCinematicProps {
  onComplete: () => void;
}

interface Slide {
  id: string;
  title: string;
  text: string;
  subtext?: string;
  durationMs: number;
}

export const IntroCinematic: React.FC<IntroCinematicProps> = ({ onComplete }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const slides: Slide[] = [
    {
      id: 'night_desert',
      title: 'هفت سال پیش... بیابان کویر ریگستان',
      text: 'شبی سرد در دل ریگ‌های روان... سکوت کویر را تنها زنگوله شتری خسته می‌شکست.',
      subtext: 'کاروان مشهور به «شتران سرخ» با اسناد زرین و قباله‌های ولایت، در دل طوفان ناپدید شد.',
      durationMs: 5500,
    },
    {
      id: 'mysterious_man',
      title: 'چاه متروک در انتهای آبادی',
      text: 'مردی ناشناس در پناه تاریکی به دهانه چاه خشکیده‌ای نزدیک شد. کیسه‌ای چرمین و سنگین در دست داشت.',
      subtext: 'بسته‌ای از اسناد محرمانه به قعر تاریکی چاه فرو افتاد.',
      durationMs: 5500,
    },
    {
      id: 'three_men',
      title: 'سایه‌های ناظر',
      text: 'در سایه‌سار بادگیرها، سه مرد سواره با کلاه‌های تیره ایستاده بودند... شاهدانی که سکوت را خریدند.',
      subtext: 'همه گمان بردند راهزنان کاروان را تاراج کرده‌اند، غافل از آنکه غارتگران در میان بزرگان شهر بودند.',
      durationMs: 6000,
    },
    {
      id: 'cut_to_morning',
      title: 'هفت سال بعد... صبح دم در حاشیه کاروانسرا',
      text: 'میرزا صفدر، حسابدار دقیق، سندی قدیمی را از دل اسناد خاک‌خورده بیرون کشید... و ناگهان غیبش زد.',
      subtext: 'در حجره‌اش تنها یک خط زغالین به جا ماند: «حساب، خودش را پس می‌گیرد.»',
      durationMs: 6000,
    },
    {
      id: 'khan_under_tree',
      title: 'و اینک... رفعت‌خان (خانخله)',
      text: 'مفتش خودخوانده، فرصت‌طلب و باهوش... فارغ از غم عالم، زیر سایه خنک درخت توت خروپف می‌کند.',
      subtext: 'تا اینکه پادوی مسافرخانه با سر و صدا از راه می‌رسد...',
      durationMs: 5000,
    }
  ];

  useEffect(() => {
    soundManager.startAmbientWind();
  }, []);

  const handleNext = () => {
    soundManager.playClick();
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const currentSlide = slides[currentSlideIndex];

  return (
    <div 
      className="relative w-full h-full flex flex-col justify-between p-6 md:p-12 select-none overflow-hidden bg-black"
      dir="rtl"
    >
      {/* Cinematic Background with atmospheric zoom */}
      <div className="absolute inset-0 z-0">
        <img 
          src={GameImages.menuBg} 
          alt="Intro Cinema" 
          className="w-full h-full object-cover filter brightness-75 contrast-125 scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/75" />
        <div className="vignette-overlay absolute inset-0" />
      </div>

      {/* Top Skip Button */}
      <div className="relative z-10 flex justify-end">
        <button
          onClick={() => {
            soundManager.playClick();
            onComplete();
          }}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-black/60 hover:bg-black/90 text-[#e6d0ba] hover:text-white border border-[#7a4e2f] backdrop-blur-md text-xs md:text-sm font-semibold transition-all"
        >
          <span>رد کردن پیش‌درآمد (Skip)</span>
          <SkipForward className="w-4 h-4" />
        </button>
      </div>

      {/* Center Cinematic Card */}
      <div className="relative z-10 max-w-3xl mx-auto w-full text-center space-y-4 my-auto animate-in fade-in zoom-in-95 duration-500 key={currentSlide.id}">
        <div className="text-amber-400 font-bold text-sm md:text-lg tracking-wide">
          {currentSlide.title}
        </div>
        
        <h2 className="text-2xl md:text-4xl font-extrabold text-[#faebd7] leading-relaxed drop-shadow-md">
          {currentSlide.text}
        </h2>

        {currentSlide.subtext && (
          <p className="text-sm md:text-lg text-[#d8be9f] font-serif max-w-2xl mx-auto leading-relaxed italic">
            «{currentSlide.subtext}»
          </p>
        )}
      </div>

      {/* Bottom Nav & Progress */}
      <div className="relative z-10 flex items-center justify-between max-w-3xl mx-auto w-full pt-4">
        {/* Progress dots */}
        <div className="flex gap-2">
          {slides.map((s, idx) => (
            <div
              key={s.id}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentSlideIndex 
                  ? 'w-8 bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' 
                  : idx < currentSlideIndex 
                  ? 'w-2.5 bg-amber-800' 
                  : 'w-2.5 bg-stone-700'
              }`}
            />
          ))}
        </div>

        {/* Next / Proceed Button */}
        <button
          onClick={handleNext}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-white font-bold text-sm md:text-base shadow-2xl transition-all hover:scale-105 active:scale-95"
        >
          <span>{currentSlideIndex === slides.length - 1 ? 'شروع ماجرا' : 'ادامه'}</span>
          <ChevronLeft className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
