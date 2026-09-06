import React, { useState } from 'react';
import { GameState } from '../../types/game';
import { CHARACTERS } from '../../data/characters';
import { GAME_EVIDENCE } from '../../data/evidence';
import { GAME_CONTRADICTIONS } from '../../data/contradictions';
import { soundManager } from '../../systems/audio/soundManager';
import { BookMarked, Users, MapPin, Search, Feather, X, CheckCircle2, AlertTriangle, Scale } from 'lucide-react';

interface JournalModalProps {
  gameState: GameState;
  onClose: () => void;
  onResolveContradiction?: (contradictionId: string) => void;
}

type TabType = 'people' | 'locations' | 'evidence' | 'notes' | 'deductions';

export const JournalModal: React.FC<JournalModalProps> = ({ gameState, onClose, onResolveContradiction }) => {
  const [activeTab, setActiveTab] = useState<TabType>('evidence');

  const discoveredEvidenceList = Object.keys(gameState.evidence)
    .filter(id => gameState.evidence[id])
    .map(id => GAME_EVIDENCE[id])
    .filter(Boolean);

  const discoveredPeople = Object.values(CHARACTERS);

  const contradictionsList = Object.values(GAME_CONTRADICTIONS).filter(
    (c) => c.act <= (gameState.act || 1)
  );

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
    },
    {
      id: 'bazaar',
      name: 'بازارچه سرپوشیده آبادی',
      status: 'قلب داد و ستد آبادی',
      description: 'راسته مسقف بازاری با طاق‌های خشتی، بوی ادویه، پارچه‌های رنگین و داد و ستد کسبه محلی.',
      uncoveredClues: [
        gameState.evidence['ev_act2_qasem_ghoul_hoax'] && 'مشهدی قاسم با داستان‌بافی جن و غول، مردم را از قنات دور نگه می‌دارد.',
        gameState.evidence['ev_act2_red_felt_sacks'] && 'حاج مرتضی تمام نمدهای قرمز مه‌بانو را خریده تا جعبه‌ها را بپوشاند.'
      ].filter(Boolean) as string[]
    },
    {
      id: 'papermaker_shop',
      name: 'کارگاه کاغذسازی اوستا صادق',
      status: 'صنعتگری و مرمت اسناد',
      description: 'حجره‌ای آکنده از بوی نشاسته، قفسه‌های خشک‌کردن کاغذهای دست‌ساز و دیگ‌های جوشان آهار.',
      uncoveredClues: [
        gameState.evidence['ev_act2_paper_grain_sadiq'] && 'کاغذ آهارمهره شیارهای فشار قلم را در خود حفظ می‌کند.',
        gameState.evidence['ev_act2_rana_silence_clue'] && 'زنی با چادر بنفش و بوی کندر پنهانی برای خرید کاغذ به دکان آمده بود.'
      ].filter(Boolean) as string[]
    },
    {
      id: 'yaqub_house',
      name: 'خانه یعقوب نابینا',
      status: 'سکونتگاه پیر دیر',
      description: 'خانه‌ای ساده و کم‌نور با فرشی کهنه و استکان‌های چای دارچین که گوش‌های صاحبش هشیارتر از چشمان آبادی است.',
      uncoveredClues: [
        gameState.evidence['ev_act2_yaqub_bell_testimony'] && 'یعقوب ادعا کرد صدای زنگوله بیست شتر را به سمت قنات شنیده است.',
        gameState.puzzleFlags['yaqub_sound_puzzle_solved'] && 'ثابت شد صدای شترها با یک زنگوله حلبی لق جعل شده بود.'
      ].filter(Boolean) as string[]
    },
    {
      id: 'yaqub_courtyard',
      name: 'حیاط خلوت یعقوب و پای قنات',
      status: 'معبر سری به دهانه قنات',
      description: 'حیاطی محصور با دیوارهای کاهگلی بلند و حوضچه‌ای خشک، مشرف به دهانه خفته قنات آبادی.',
      uncoveredClues: [
        gameState.evidence['ev_act2_camel_tracks_missing'] && 'خاک نرم کوچه دست‌نخورده است و هیچ ردپایی از شتر ندارد.',
        gameState.evidence['ev_act2_iron_clapper_sound'] && 'زنگوله حلبی دست‌ساز در بوته‌های خار پیدا شد.'
      ].filter(Boolean) as string[]
    },
    {
      id: 'qanat_entrance',
      name: 'دهانه قنات متروک',
      status: 'میعادگاه غارت ساختگی',
      description: 'طاق آجری دهانه قنات که بادی سرد و بوی گوگرد از عمق میله‌های آن زوزه می‌کشد.',
      uncoveredClues: [
        gameState.evidence['ev_act2_copper_token_cipher'] && 'پلاک مسین رسمی «خزانهٔ باد» در میان آجرچینی کشف شد.',
        gameState.evidence['ev_act2_qanat_airshaft_echo'] && 'هیچ صندوقی به عمق قنات برده نشده؛ الوارها دست‌نخورده رها شده‌اند.'
      ].filter(Boolean) as string[]
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
    } : null,
    // Act 2 Khan Notes
    gameState.evidence['ev_act2_razor_cut_pages'] ? {
      id: 'note_act2_1',
      title: 'دفترچه بریده‌شده و صفحات سفید',
      date: 'پرده دوم: آغاز',
      content: 'تیغ دباغی تیزی صفحات میانی رو بریده. اما کاتب ناشی نفهمیده قلم‌نی میرزا عمیق‌تر از تیغ روی لعاب نشاسته‌ای کاغذ آهارمهره نشسته!'
    } : null,
    gameState.puzzleFlags['shading_kit_crafted'] ? {
      id: 'note_act2_2',
      title: 'کیت سایه‌زنی دوده اوستا صادق',
      date: 'پرده دوم: کارگاه کاغذ',
      content: 'با گرد دوده بید و قلم‌موی موی شتر صادق میشه بدون نابود کردن بافت کاغذ، خطوط فرورفته رو مثل روز اول خواند. علم صحافی دست‌کمی از جادو نداره.'
    } : null,
    gameState.puzzleFlags['empty_ledger_act2_solved'] ? {
      id: 'note_act2_3',
      title: 'افشای وحشتناک: صندوق‌ها از اول خالی بود!',
      date: 'پرده دوم: کشف راز دفتر',
      content: 'دست‌خط احیاشده میرزا حقیقت رو عریان کرد: «صندوق‌های ۱ تا ۷ در قلعه‌بالا با ماسه و سرب پر شدند... هیچ شمش طلایی بارگیری نشده است!» سرقت در کار نبوده، صحنه‌سازی بوده برای توجیه یک اختلاس عظیم دیوانی!'
    } : null,
    gameState.puzzleFlags['yaqub_sound_puzzle_solved'] ? {
      id: 'note_act2_4',
      title: 'فریب گوش‌های یعقوب پیر',
      date: 'پرده دوم: حیاط یعقوب',
      content: 'یه زنگوله حلبی لق توی بوته‌های خار! با یه چوب دستی و همین حلبی، صدای کاروان بیست‌نفره ساختن تا پیرمرد خیال کنه کاروان به سمت قنات رفته. چه نقشه‌کش‌های موذی و دقیقی.'
    } : null,
    gameState.evidence['ev_act2_copper_token_cipher'] ? {
      id: 'note_act2_5',
      title: 'پلاک مسین «خزانهٔ باد»',
      date: 'پرده دوم: مظهر قنات',
      content: 'پلاک مسین ضرابخانه دربار با نشان هفت ستاره! زن چادر بنفش این رو لای آجرها انداخته بود. پرونده دیگر یک ماجرای محلی کاروانسرا نیست؛ یک توطئه حکومتی کلانه.'
    } : null,
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
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-[#311c10] text-[#ba9a7b] hover:text-white border border-[#4d2d18] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-around border-b border-[#442817] bg-[#1c1109] px-2 py-1.5 text-xs md:text-sm font-semibold overflow-x-auto">
          {[
            { key: 'evidence', label: 'سرنخ‌ها', icon: Search, count: discoveredEvidenceList.length },
            { key: 'deductions', label: 'تناقض‌ها', icon: Scale, count: contradictionsList.filter(c => c.isResolved(gameState)).length },
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
                className={`flex items-center gap-1.5 py-2.5 px-3 min-h-[44px] rounded-lg whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#472714] text-[#ffd4aa] border border-[#a86538] shadow-md'
                    : 'text-[#ab8c70] hover:text-[#faebd7] hover:bg-[#28170d]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
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

          {/* DEDUCTIONS & CONTRADICTIONS TAB */}
          {activeTab === 'deductions' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#180f08] border border-[#52331c] rounded-xl text-xs text-[#d1bcaa] flex items-center justify-between">
                <span>تناقض‌های کشف‌شده میان ادعاها و شواهد عینی را بررسی و با مدارک قطعی اثبات کنید.</span>
                <span className="text-[#e2a87a] font-bold">
                  {contradictionsList.filter(c => c.isResolved(gameState)).length} از {contradictionsList.length} اثبات شده
                </span>
              </div>

              {contradictionsList.map((contra) => {
                const isResolved = contra.isResolved(gameState);
                const isAvailable = contra.isAvailable(gameState);

                return (
                  <div
                    key={contra.id}
                    className={`p-4 rounded-xl border shadow-lg space-y-3 transition-all ${
                      isResolved
                        ? 'bg-[#182319]/90 border-emerald-800/80'
                        : isAvailable
                        ? 'bg-[#291b10]/95 border-amber-600/80 ring-1 ring-amber-500/30'
                        : 'bg-[#1c1109]/80 border-[#492e1b] opacity-80'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[#472d1a] pb-2">
                      <div className="flex items-center gap-2">
                        <Scale className={`w-5 h-5 shrink-0 ${isResolved ? 'text-emerald-400' : isAvailable ? 'text-amber-400' : 'text-[#88694c]'}`} />
                        <span className="font-bold text-[#faedd9] text-base">
                          {contra.name}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#100904] text-[#c99f74] border border-[#472b16]">
                          پرده {contra.act}
                        </span>
                      </div>
                      <div>
                        {isResolved ? (
                          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-700">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            اثبات‌شده
                          </span>
                        ) : isAvailable ? (
                          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700 animate-pulse">
                            آماده اثبات!
                          </span>
                        ) : (
                          <span className="text-xs px-2 py-0.5 rounded bg-[#160c06] text-[#8e6e4e]">
                            نیازمند شواهد بیشتر
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Dual Statement Comparison */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                      {/* Statement A */}
                      <div className="p-3 rounded-lg bg-[#140b06] border border-[#3b2010] space-y-1">
                        <div className="text-xs text-[#df9e66] font-bold flex items-center justify-between">
                          <span>
                            {'speaker' in contra.statementA
                              ? `ادعای ${contra.statementA.speaker}`
                              : contra.statementA.title}
                          </span>
                          <span className="text-[10px] text-[#8b694b] font-normal">{contra.statementA.sourceContext}</span>
                        </div>
                        <p className="text-xs text-[#e6d5c5] italic leading-relaxed">
                          «{contra.statementA.text}»
                        </p>
                      </div>

                      {/* Statement B */}
                      <div className="p-3 rounded-lg bg-[#140b06] border border-[#3b2010] space-y-1">
                        <div className="text-xs text-[#52c41a] font-bold flex items-center justify-between">
                          <span>
                            {'title' in contra.statementB
                              ? `حقیقت مادی: ${contra.statementB.title}`
                              : `ادعای ${contra.statementB.speaker}`}
                          </span>
                          <span className="text-[10px] text-[#8b694b] font-normal">{contra.statementB.sourceContext}</span>
                        </div>
                        <p className="text-xs text-[#dcd1c6] leading-relaxed">
                          {contra.statementB.text}
                        </p>
                      </div>
                    </div>

                    {/* Contradiction core */}
                    <p className="text-xs text-[#f0d4b8] bg-[#1d120a] p-2.5 rounded-lg border border-[#4d301c] leading-relaxed">
                      <strong className="text-[#e2a87a]">مغایرت منطقی: </strong>
                      {contra.contradictionDescription}
                    </p>

                    {/* Resolution / Action Footer */}
                    {isResolved ? (
                      <div className="p-3 rounded-lg bg-[#0e1d10] border border-emerald-800/80 space-y-1 text-xs">
                        <div className="text-emerald-300 font-semibold">
                          {contra.resolution.reactionText}
                        </div>
                        {contra.resolution.subtext && (
                          <div className="text-emerald-400/90 italic font-serif">
                            {contra.resolution.subtext}
                          </div>
                        )}
                      </div>
                    ) : isAvailable ? (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
                        <span className="text-xs text-[#ffc080]">
                          تمام سرنخ‌های لازم برای رد این ادعا در دست است!
                        </span>
                        <button
                          onClick={() => {
                            if (onResolveContradiction) {
                              onResolveContradiction(contra.id);
                            }
                          }}
                          className="min-h-[44px] px-4 py-2 bg-gradient-to-l from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-[#fff7ed] font-bold text-xs rounded-lg border border-amber-400 shadow-md transition-all active:scale-95 flex items-center justify-center shrink-0"
                        >
                          مواجهه و اثبات تناقض
                        </button>
                      </div>
                    ) : (
                      <div className="text-[11px] text-[#937151] pt-1">
                        برای اثبات این تناقض، سرنخ‌های بیشتری در صحنه‌ها یا مکالمات بیابید.
                      </div>
                    )}
                  </div>
                );
              })}
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
