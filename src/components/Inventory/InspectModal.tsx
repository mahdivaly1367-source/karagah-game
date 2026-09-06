import React from 'react';
import { Item } from '../../types/game';
import { soundManager } from '../../systems/audio/soundManager';
import { X, Search, Sparkles } from 'lucide-react';

interface InspectModalProps {
  item?: Item | null;
  customData?: {
    title: string;
    description: string;
    subtext?: string;
    actionLabel?: string;
    onAction?: () => void;
  } | null;
  onClose: () => void;
}

export const InspectModal: React.FC<InspectModalProps> = ({
  item,
  customData,
  onClose,
}) => {
  if (!item && !customData) return null;

  const title = customData?.title || item?.name || '';
  const description = customData?.description || item?.description || '';
  const inspectText = customData?.subtext || item?.inspectText || '';

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm select-none animate-in fade-in duration-200"
      dir="rtl"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-lg rounded-2xl bg-[#1d130c] border-2 border-[#946944] shadow-2xl p-5 md:p-6 parchment-bg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-4 left-4 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-[#2a1b12] hover:bg-[#42291a] text-[#bda083] hover:text-white border border-[#5a3821] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-2.5 pb-3 mb-4 border-b border-[#5a3a24]">
          <Search className="w-5 h-5 text-[#dca66e]" />
          <h3 className="text-lg md:text-xl font-bold text-[#faecd8]">
            {title}
          </h3>
        </div>

        {/* Core Visual / Description */}
        <div className="space-y-4">
          <div className="p-3.5 rounded-xl bg-[#140b06]/80 border border-[#442817] text-[#e0cfba] text-sm md:text-base leading-relaxed">
            {description}
          </div>

          {/* Khan-kholeh's Investigation note */}
          <div className="p-3.5 rounded-xl bg-[#2a170d]/90 border border-[#824424] text-[#f8d4b2] text-sm md:text-base leading-relaxed flex items-start gap-2.5 shadow-inner">
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-bold text-[#f59e0b] mb-1">
                یادداشت تیزبینی خانخله:
              </div>
              <div className="italic">
                «{inspectText}»
              </div>
            </div>
          </div>

          {/* Optional Action Button */}
          {customData?.actionLabel && customData?.onAction && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => {
                  soundManager.playClick();
                  customData.onAction?.();
                }}
                className="min-h-[44px] px-5 py-2 rounded-xl bg-[#b45309] hover:bg-[#d97706] text-white font-bold text-sm shadow-lg transition-all"
              >
                {customData.actionLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
