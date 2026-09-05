import React, { useState, useEffect } from 'react';
import { SaveManager, SaveSlotData } from '../../systems/save/saveManager';
import { GameState } from '../../types/game';
import { soundManager } from '../../systems/audio/soundManager';
import { Save, Download, Trash2, Calendar, MapPin, X, Check } from 'lucide-react';

interface SaveLoadModalProps {
  mode: 'save' | 'load';
  currentState: GameState;
  onLoadState: (loadedData: SaveSlotData) => void;
  onClose: () => void;
}

export const SaveLoadModal: React.FC<SaveLoadModalProps> = ({
  mode,
  currentState,
  onLoadState,
  onClose,
}) => {
  const [slots, setSlots] = useState<Record<string, SaveSlotData | null>>({});
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const refreshSlots = () => {
    setSlots(SaveManager.getAllSlots());
  };

  useEffect(() => {
    refreshSlots();
  }, []);

  const handleSave = (slot: number) => {
    soundManager.playClick();
    const success = SaveManager.saveToSlot(slot, currentState);
    if (success) {
      soundManager.playEvidenceDiscovered();
      setFeedbackMsg(`بازی در جایگاه ${slot} با موفقیت ذخیره شد.`);
      refreshSlots();
      setTimeout(() => setFeedbackMsg(null), 2500);
    }
  };

  const handleLoad = (slotData: SaveSlotData) => {
    soundManager.playClick();
    soundManager.playDoorCreak();
    onLoadState(slotData);
    onClose();
  };

  const handleDelete = (slot: number | 'auto', e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playClick();
    SaveManager.deleteSlot(slot);
    refreshSlots();
  };

  const slotNumbers = [1, 2, 3];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm select-none animate-in fade-in duration-200"
      dir="rtl"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-xl rounded-2xl bg-[#1d120a] border-2 border-[#946944] shadow-2xl p-5 md:p-6 parchment-bg relative"
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
        <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-[#5a3a24]">
          {mode === 'save' ? (
            <Save className="w-6 h-6 text-[#dca66e]" />
          ) : (
            <Download className="w-6 h-6 text-[#dca66e]" />
          )}
          <h3 className="text-lg md:text-xl font-bold text-[#faecd8]">
            {mode === 'save' ? 'ذخیره پرونده بازی' : 'بارگذاری پرونده قبلی'}
          </h3>
        </div>

        {/* Success toast */}
        {feedbackMsg && (
          <div className="mb-4 p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-600 text-emerald-300 text-xs md:text-sm flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Slots List */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {/* Auto Save Slot */}
          {slots.auto && (
            <div 
              className={`p-3.5 rounded-xl border-2 transition-all flex items-center justify-between ${
                mode === 'load'
                  ? 'bg-[#29170e]/90 hover:bg-[#3b2214] border-[#8a522c] cursor-pointer'
                  : 'bg-[#1e1109]/90 border-[#4a2916]'
              }`}
              onClick={() => mode === 'load' && slots.auto && handleLoad(slots.auto)}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#4a2211] text-[#ffd6ad]">
                    ذخیره خودکار (AutoSave)
                  </span>
                </div>
                <div className="text-xs text-[#c49e7b] flex items-center gap-3 pt-1">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{slots.auto.timestamp}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{slots.auto.sceneName}</span>
                  </span>
                </div>
              </div>

              {mode === 'load' && (
                <button
                  className="px-3.5 py-1.5 rounded-lg bg-[#b45309] hover:bg-[#d97706] text-white text-xs font-bold"
                >
                  بارگذاری
                </button>
              )}
            </div>
          )}

          {/* 3 Manual Slots */}
          {slotNumbers.map((num) => {
            const slotData = slots[num];
            return (
              <div
                key={num}
                className={`p-3.5 rounded-xl border-2 transition-all flex items-center justify-between ${
                  slotData
                    ? 'bg-[#25150d]/90 hover:bg-[#382013] border-[#704223] cursor-pointer'
                    : 'bg-[#190e08]/60 border-[#381f10] border-dashed'
                }`}
                onClick={() => {
                  if (mode === 'save') handleSave(num);
                  else if (slotData) handleLoad(slotData);
                }}
              >
                <div className="space-y-1">
                  <div className="font-bold text-sm text-[#f5ebd9]">
                    جایگاه شماره {num}
                  </div>
                  {slotData ? (
                    <div className="text-xs text-[#c49e7b] flex items-center gap-3 pt-0.5">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{slotData.timestamp}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{slotData.sceneName}</span>
                      </span>
                    </div>
                  ) : (
                    <div className="text-xs text-[#704d30] italic">
                      خالی - آماده ذخیره‌سازی
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {mode === 'save' ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSave(num);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-[#924a21] hover:bg-[#b55e2c] text-white text-xs font-bold transition-colors"
                    >
                      {slotData ? 'بازنویسی (Save)' : 'ذخیره'}
                    </button>
                  ) : slotData ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLoad(slotData);
                      }}
                      className="px-4 py-1.5 rounded-lg bg-[#b45309] hover:bg-[#d97706] text-white text-xs font-bold transition-colors"
                    >
                      بارگذاری
                    </button>
                  ) : null}

                  {slotData && (
                    <button
                      onClick={(e) => handleDelete(num, e)}
                      className="p-1.5 rounded-lg hover:bg-rose-950/80 text-[#85513d] hover:text-rose-400 transition-colors"
                      title="حذف ذخیره"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
