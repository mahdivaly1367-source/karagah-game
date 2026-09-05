import React from 'react';
import { GameSettings } from '../../types/game';
import { soundManager } from '../../systems/audio/soundManager';
import { Settings, Volume2, Type, Sliders, Eye, X } from 'lucide-react';

interface SettingsModalProps {
  settings: GameSettings;
  onUpdateSettings: (newSettings: Partial<GameSettings>) => void;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  settings,
  onUpdateSettings,
  onClose,
}) => {
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none animate-in fade-in duration-200"
      dir="rtl"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg rounded-2xl bg-[#1d120a] border-2 border-[#946944] shadow-2xl p-5 md:p-6 parchment-bg relative max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
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
        <div className="flex items-center gap-2.5 pb-3 mb-5 border-b border-[#5a3a24]">
          <Settings className="w-6 h-6 text-[#dca66e]" />
          <h3 className="text-lg md:text-xl font-bold text-[#faecd8]">
            تنظیمات بازی و دسترسی‌پذیری
          </h3>
        </div>

        <div className="space-y-5">
          {/* Audio controls */}
          <div className="space-y-3 p-3.5 rounded-xl bg-[#25150d]/80 border border-[#57341e]">
            <div className="flex items-center gap-2 text-sm font-bold text-[#ffd5aa]">
              <Volume2 className="w-4 h-4 text-amber-400" />
              <span>تنظیمات صدا</span>
            </div>

            {/* Master */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#cfb7a1]">
                <span>صدای کلی (Master Volume)</span>
                <span>{settings.masterVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.masterVolume}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onUpdateSettings({ masterVolume: val });
                  soundManager.setVolumes(val, settings.sfxVolume, settings.musicVolume);
                }}
                className="w-full accent-[#d97706] cursor-pointer"
              />
            </div>

            {/* SFX */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#cfb7a1]">
                <span>جلوه‌های صوتی (SFX)</span>
                <span>{settings.sfxVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.sfxVolume}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onUpdateSettings({ sfxVolume: val });
                  soundManager.setVolumes(settings.masterVolume, val, settings.musicVolume);
                }}
                className="w-full accent-[#d97706] cursor-pointer"
              />
            </div>

            {/* Music */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-[#cfb7a1]">
                <span>محیط و موسیقی بیابانی (Ambience)</span>
                <span>{settings.musicVolume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={settings.musicVolume}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onUpdateSettings({ musicVolume: val });
                  soundManager.setVolumes(settings.masterVolume, settings.sfxVolume, val);
                }}
                className="w-full accent-[#d97706] cursor-pointer"
              />
            </div>
          </div>

          {/* Text and Dialogue Speed */}
          <div className="space-y-3 p-3.5 rounded-xl bg-[#25150d]/80 border border-[#57341e]">
            <div className="flex items-center gap-2 text-sm font-bold text-[#ffd5aa]">
              <Type className="w-4 h-4 text-amber-400" />
              <span>متن و سرعت دیالوگ</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-xs text-[#cfb7a1] block mb-1">اندازه قلم</label>
                <div className="flex gap-1">
                  {(['normal', 'large'] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => {
                        soundManager.playClick();
                        onUpdateSettings({ textSize: sz });
                      }}
                      className={`flex-1 py-1.5 rounded text-xs font-semibold border transition-all ${
                        settings.textSize === sz
                          ? 'bg-[#824424] text-white border-[#c97444]'
                          : 'bg-[#180e07] text-[#ab8c70] border-[#3f2515]'
                      }`}
                    >
                      {sz === 'normal' ? 'معمولی' : 'بزرگ'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs text-[#cfb7a1] block mb-1">سرعت نمایش دیالوگ</label>
                <div className="flex gap-1">
                  {(['slow', 'normal', 'fast'] as const).map((spd) => (
                    <button
                      key={spd}
                      onClick={() => {
                        soundManager.playClick();
                        onUpdateSettings({ dialogueSpeed: spd });
                      }}
                      className={`flex-1 py-1.5 rounded text-xs font-semibold border transition-all ${
                        settings.dialogueSpeed === spd
                          ? 'bg-[#824424] text-white border-[#c97444]'
                          : 'bg-[#180e07] text-[#ab8c70] border-[#3f2515]'
                      }`}
                    >
                      {spd === 'slow' ? 'آرام' : spd === 'normal' ? 'معمولی' : 'تند'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Gameplay & Accessibility */}
          <div className="space-y-3 p-3.5 rounded-xl bg-[#25150d]/80 border border-[#57341e]">
            <div className="flex items-center gap-2 text-sm font-bold text-[#ffd5aa]">
              <Eye className="w-4 h-4 text-amber-400" />
              <span>دسترسی‌پذیری و وضوح</span>
            </div>

            <label className="flex items-center justify-between text-xs text-[#cfb7a1] cursor-pointer">
              <span>برجسته‌سازی دائمی اشیاء تعاملی (High Contrast)</span>
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={(e) => {
                  soundManager.playClick();
                  onUpdateSettings({ highContrast: e.target.checked });
                }}
                className="w-4 h-4 accent-[#d97706] rounded cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between text-xs text-[#cfb7a1] cursor-pointer">
              <span>نمایش زیرنویس و اعلان‌های محیطی</span>
              <input
                type="checkbox"
                checked={settings.subtitles}
                onChange={(e) => {
                  soundManager.playClick();
                  onUpdateSettings({ subtitles: e.target.checked });
                }}
                className="w-4 h-4 accent-[#d97706] rounded cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Done */}
        <div className="mt-5 pt-3 border-t border-[#472c1a] flex justify-end">
          <button
            onClick={() => {
              soundManager.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-[#874926] hover:bg-[#a65b32] text-white font-bold text-sm shadow-md transition-colors"
          >
            تأیید و بازگشت
          </button>
        </div>
      </div>
    </div>
  );
};
