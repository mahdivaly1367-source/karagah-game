import React, { useState } from 'react';
import { GameState } from '../../types/game';
import { CHARACTERS } from '../../data/characters';
import { GAME_EVIDENCE } from '../../data/evidence';
import { soundManager } from '../../systems/audio/soundManager';
import { BookMarked, Users, MapPin, Search, Feather, X, CheckCircle2, AlertTriangle } from 'lucide-react';

interface JournalModalProps {
  gameState: GameState;
  onClose: () => void;
}

type TabType = 'people' | 'locations' | 'evidence' | 'notes';

export const JournalModal: React.FC<JournalModalProps> = ({ gameState, onClose }) => {
  const [activeTab, setActiveTab] = useState<TabType>('evidence');

  const discoveredEvidenceList = Object.keys(gameState.evidence)
    .filter(id => gameState.evidence[id])
    .map(id => GAME_EVIDENCE[id])
    .filter(Boolean);

  const discoveredPeople = Object.values(CHARACTERS);

  // Dynamic locations based on exploration
  const locations = [
    {
      id: 'mirza_room',
      name: 'اتاق میرزا صفدر (صحنه جرم)',
      status: 'محل ناپدید شدن',
      description: 'حجره‌ای در انتهای ایوان کاروانسرا. دیوارهای خشتی، پنجره‌ای رو به کوچه پشتی با قفل شکسته، و میزی که مدارک آن دستکاری شده است.',
      uncoveredClues: [
        gameState.evidence['ev_window_dust'] && 'غبار لبه پنجره دستکاری شده و پنجره باز شده.',
        gameState.evidence['ev_cold_tea'] && 'فنجان چای تلخ تا لبه پر و یخ کرده.',
        gameState.evidence['ev_fake_writing'] && 'نوشته روی دیوار ساختگی است و با خط میرزا فرق دارد.'
      ].filter(Boolean) as string[]
    },
    {
      id: 'courtyard',
      name: 'حیاط مرکزی مسافرخانه',
      status: 'محل تردد مسافران',
      description: 'فضایی با حوضچه سنگی که آب از لبه‌اش سرازیر است. رفت‌وآمد کاروانیان و باربند در اینجا جریان دارد.',
      uncoveredClues: [
        gameState.storyFlags['courtyard_visited'] && 'کربلایی نعمت به شدت مضطرب است و سعی در پنهان کردن واقعه دارد.',
        gameState.evidence['ev_morteza_boots'] && 'گِل سرخ‌رنگ پای حوضچه با گل چکمه‌های حاج مرتضی همخوانی دارد.'
      ].filter(Boolean) as string[]
    },
    {
      id: 'stable',
      name: 'اصطبل کاروانسرا',
      status: 'استراحتگاه حیوانات و تجار',
      description: 'طویله‌ای با بوی کاه و پهن و یراق‌های چرمی. حاج مرتضی با آرامش ظاهری در گوشه‌ای نشسته است.',
      uncoveredClues: [
        gameState.evidence['ev_morteza_boots'] && 'حاج مرتضی ادعا کرد دیشب اینجا نبوده، ولی چکمه‌هایش دروغش را فاش کرد.'
      ].filter(Boolean) as string[]
    },
    {
      id: 'outer_alley',
      name: 'کوچه بیرونی و پای درخت',
      status: 'حاشیه آبادی',
      description: 'جاده‌ای خاکی که به کویر و مسیر کاروان شتران سرخ می‌رسد. خانخله صبح‌ها زیر درختش استراحت می‌کرد.',
      uncoveredClues: [
        'کاظم اولین بار خبر ناپدید شدن را اینجا به خانخله رساند.'
      ]
    }
  ];

  // Dynamic notes written by Khan-kholeh in his witty, cynical style
  const khanNotes = [
    {
      id: 'note_1',
      title: 'شروع بازی به خاطر پول',
      date: 'صبح زود',
      content: 'کاظم هراسان دوید و گفت میرزا غیبش زده. به من چه؟ ولی کربلایی نعمت حاضره خرج کنه تا قضیه به گوش داروغه نرسه. بوی چند سکه نقره میاد.'
    },
    gameState.evidence['ev_fake_writing'] ? {
      id: 'note_2',
      title: 'نوشته مضحک دیوار',
      date: 'ساعت اول تفتیش',
      content: '«حساب، خودش را پس میگیرد»! هر خری نوشته خواسته صحنه رو شبیه انتقام نشون بده. دست‌خط شبیه خط بقال‌های بی‌سواده، نه میرزای حسابدار.'
    } : null,
    gameState.puzzleFlags['window_puzzle_solved'] ? {
      id: 'note_3',
      title: 'گریز از پنجره',
      date: 'پیش از ظهر',
      content: 'نخ قرمز و تکه پارچه ابریشم به میخ پنجره گیر کرده بود. یعنی میرزا یا خودش پریده بیرون یا کشان‌کشان بردنش. در هر حال در بسته نبوده.'
    } : null,
    gameState.evidence['ev_morteza_boots'] ? {
      id: 'note_4',
      title: 'دروغ شاخدار حاج مرتضی',
      date: 'ظهر',
      content: 'حاجی می‌گفت دیشب فرسنگ‌ها دورتر با کدخدا نان و ماست می‌خورده! اما پای چکمه‌های ابریشم‌دوزش آلوده به گل سرخ همین حیاطه. مگه میشه پات تو گِل باشه و تنت تو قلعه بالا؟!'
    } : null,
    gameState.puzzleFlags['morteza_confronted'] ? {
      id: 'note_5',
      title: 'اعتراف به پاک کردن دفتر',
      date: 'پس از مواجهه',
      content: 'حاج مرتضی رنگ باخت. اعتراف کرد که میرزا رازی از کاروان شتران سرخ داشته و صفحات دفترش رو پاک کردن! باید بفهمم زیر اون سفیدی چی بوده.'
    } : null
  ].filter(Boolean) as { id: string; title: string; date: string; content: string }[];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none animate-in fade-in duration-200"
      dir="rtl"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-3xl h-[85vh] max-h-[680px] rounded-2xl bg-[#1d120a] border-2 border-[#946944] shadow-2xl flex flex-col parchment-bg overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-[#5a3922] bg-[#170e07]/90">
          <div className="flex items-center gap-2.5">
            <BookMarked className="w-6 h-6 text-[#dca66e]" />
            <h2 className="text-lg md:text-xl font-bold text-[#faecd8]">
              کتابچه یادداشت و تفتیش خانخله
            </h2>
          </div>
          <button 
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="p-1 rounded-lg hover:bg-[#311c10] text-[#ba9a7b] hover:text-white border border-[#4d2d18] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-around border-b border-[#442817] bg-[#1c1109] px-2 py-1.5 text-xs md:text-sm font-semibold">
          {[
            { key: 'evidence', label: 'سرنخ‌ها', icon: Search, count: discoveredEvidenceList.length },
            { key: 'people', label: 'افراد و مظنونین', icon: Users, count: discoveredPeople.length },
            { key: 'locations', label: 'مکان‌ها', icon: MapPin, count: locations.length },
            { key: 'notes', label: 'یادداشت خانخله', icon: Feather, count: khanNotes.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => {
                  soundManager.playClick();
                  setActiveTab(tab.key as TabType);
                }}
                className={`flex items-center gap-1.5 py-2 px-3.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-[#472714] text-[#ffd4aa] border border-[#a86538] shadow-md'
                    : 'text-[#ab8c70] hover:text-[#faebd7] hover:bg-[#28170d]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                <span className="text-[11px] px-1.5 py-0.2 rounded-full bg-[#110a05] text-[#dca66e]">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Body */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
          {/* EVIDENCE TAB */}
          {activeTab === 'evidence' && (
            <div className="space-y-3">
              {discoveredEvidenceList.length === 0 ? (
                <div className="py-12 text-center text-[#997350] text-sm">
                  هنوز سرنخی ثبت نشده است. صحنه جرم را با دقت وارسی کنید.
                </div>
              ) : (
                discoveredEvidenceList.map((ev) => (
                  <div 
                    key={ev.id}
                    className="p-4 rounded-xl bg-[#25160d]/90 border border-[#613c23] shadow-md space-y-2"
                  >
                    <div className="flex items-center justify-between border-b border-[#472a18] pb-1.5">
                      <div className="flex items-center gap-2">
                        {ev.isFakeClue ? (
                          <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                        ) : (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                        )}
                        <span className="font-bold text-[#f5ebd9] text-base">
                          {ev.name}
                        </span>
                        {ev.isFakeClue && (
                          <span className="text-[11px] px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
                            سرنخ جعلی!
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-[#a37951] bg-[#160c07] px-2 py-0.5 rounded">
                        منبع: {ev.source}
                      </span>
                    </div>

                    <p className="text-[#decbbe] text-sm leading-relaxed">
                      {ev.description}
                    </p>

                    {ev.analysisText && (
                      <div className="text-xs text-[#f6ad55] bg-[#190d07] p-2.5 rounded-lg border border-[#4a2b17] italic">
                        {ev.analysisText}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* PEOPLE TAB */}
          {activeTab === 'people' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {discoveredPeople.map((p) => (
                <div 
                  key={p.id}
                  className="p-3.5 rounded-xl bg-[#25160d]/90 border border-[#613c23] flex gap-3.5 shadow-md"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#85542f] shrink-0 bg-stone-900">
                    <img 
                      src={p.portrait} 
                      alt={p.name} 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="font-bold text-[#fceee0] text-base">
                      {p.name}
                    </div>
                    <div className="text-xs text-[#c69b70]">
                      {p.title}
                    </div>
                    <p className="text-xs text-[#d1bcaa] leading-relaxed pt-1 line-clamp-2">
                      {p.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* LOCATIONS TAB */}
          {activeTab === 'locations' && (
            <div className="space-y-3.5">
              {locations.map((loc) => (
                <div 
                  key={loc.id}
                  className="p-4 rounded-xl bg-[#25160d]/90 border border-[#613c23] shadow-md space-y-2"
                >
                  <div className="flex items-center justify-between border-b border-[#472a18] pb-1.5">
                    <span className="font-bold text-[#f5ebd9] text-base">
                      {loc.name}
                    </span>
                    <span className="text-xs text-[#c69363]">
                      {loc.status}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-[#decbbe] leading-relaxed">
                    {loc.description}
                  </p>
                  {loc.uncoveredClues.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-[#381f10] space-y-1">
                      <div className="text-[11px] font-bold text-[#e2a87a]">
                        حقایق ثبت‌شده در این مکان:
                      </div>
                      {loc.uncoveredClues.map((clue, idx) => (
                        <div key={idx} className="text-xs text-[#ffd6ad] flex items-center gap-1.5 pr-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span>{clue}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* KHAN NOTES TAB */}
          {activeTab === 'notes' && (
            <div className="space-y-3">
              {khanNotes.map((note) => (
                <div 
                  key={note.id}
                  className="p-4 rounded-xl bg-[#29170e]/90 border border-[#6d4227] shadow-md space-y-2 relative"
                >
                  <div className="flex items-center justify-between border-b border-[#4d2c19] pb-1">
                    <span className="font-bold text-[#fbebd8] text-sm md:text-base">
                      {note.title}
                    </span>
                    <span className="text-xs text-[#9d734e]">
                      {note.date}
                    </span>
                  </div>
                  <p className="text-sm text-[#e6d3c0] leading-relaxed italic font-serif">
                    «{note.content}»
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
