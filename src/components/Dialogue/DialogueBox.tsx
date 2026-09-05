import React, { useState, useEffect } from 'react';
import { DialogueNode, DialogueOption, GameState } from '../../types/game';
import { CHARACTERS } from '../../data/characters';
import { soundManager } from '../../systems/audio/soundManager';
import { ChevronLeft, Award } from 'lucide-react';

interface DialogueBoxProps {
  dialogueNode: DialogueNode;
  gameState: GameState;
  onSelectOption: (option: DialogueOption) => void;
  onClose: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  dialogueNode,
  gameState,
  onSelectOption,
  onClose,
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const character = CHARACTERS[dialogueNode.portraitKey] || CHARACTERS.khan;
  const fullText = dialogueNode.text;

  // Speed calculation based on settings
  const charDelay = 
    gameState.settings.dialogueSpeed === 'fast' ? 12 : 
    gameState.settings.dialogueSpeed === 'slow' ? 40 : 22;

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setIsTypingComplete(false);

    const timer = setInterval(() => {
      index++;
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        if (index % 3 === 0) {
          soundManager.playTypewriter();
        }
      } else {
        setIsTypingComplete(true);
        clearInterval(timer);
      }
    }, charDelay);

    return () => clearInterval(timer);
  }, [fullText, charDelay]);

  const handleBoxClick = () => {
    if (!isTypingComplete) {
      // Fast forward typewriter
      setDisplayedText(fullText);
      setIsTypingComplete(true);
      soundManager.playClick();
    }
  };

  // Filter available options
  const availableOptions = (dialogueNode.options || []).filter(opt => {
    if (!opt.condition) return true;
    return opt.condition(gameState);
  });

  return (
    <div 
      className="absolute bottom-4 left-4 right-4 z-40 max-w-5xl mx-auto flex flex-col md:flex-row items-stretch gap-4 select-none animate-in fade-in slide-in-from-bottom-4 duration-200"
      dir="rtl"
    >
      {/* Character Portrait Card */}
      <div className="relative shrink-0 flex flex-col items-center justify-center p-2 rounded-xl bg-[#201711]/95 border-2 border-[#8b6546] shadow-2xl backdrop-blur-md w-28 md:w-40">
        <div className="w-20 h-20 md:w-28 md:h-28 rounded-lg overflow-hidden border border-[#b88c64] bg-stone-900 shadow-inner">
          <img 
            src={character.portrait} 
            alt={dialogueNode.speaker} 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="mt-2 text-center">
          <div className="font-bold text-[#f5ebd9] text-sm md:text-base leading-tight">
            {dialogueNode.speaker}
          </div>
          {dialogueNode.speakerTitle && (
            <div className="text-[11px] text-[#c49a6c] mt-0.5 leading-tight">
              {dialogueNode.speakerTitle}
            </div>
          )}
        </div>
      </div>

      {/* Speech Content & Options */}
      <div 
        className="flex-1 flex flex-col justify-between p-4 md:p-5 rounded-xl bg-[#1c130d]/95 border-2 border-[#8b6546] shadow-2xl backdrop-blur-md cursor-pointer relative"
        onClick={handleBoxClick}
      >
        {/* Dialogue Text */}
        <div className="min-h-[60px] md:min-h-[75px] text-[#faebd7] leading-relaxed text-base md:text-lg font-medium pr-1">
          {displayedText}
          {!isTypingComplete && (
            <span className="inline-block w-2 h-4 bg-[#e6a86c] ml-1 animate-pulse" />
          )}
        </div>

        {/* Options List */}
        {isTypingComplete && availableOptions.length > 0 && (
          <div 
            className="mt-3 pt-3 border-t border-[#4a3322] flex flex-col gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            {availableOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  soundManager.playClick();
                  onSelectOption(opt);
                }}
                className={`group flex items-center justify-between px-3.5 py-2 rounded-lg text-right text-sm md:text-base transition-all duration-150 border ${
                  opt.isEvidenceOption
                    ? 'bg-[#3d1a15]/80 hover:bg-[#57221a] border-[#a83b2d] text-[#ffcfc7]'
                    : 'bg-[#2b1c14]/80 hover:bg-[#422a1e] border-[#5e3e29] text-[#ecd8c2] hover:text-[#fff5e8]'
                }`}
              >
                <span className="flex items-center gap-2">
                  {opt.isEvidenceOption && (
                    <Award className="w-4 h-4 text-[#ff8c7a] shrink-0" />
                  )}
                  <span className="group-hover:translate-x-[-2px] transition-transform">
                    {opt.text}
                  </span>
                </span>
                <ChevronLeft className="w-4 h-4 text-[#9c714b] group-hover:text-[#ffd6a5] transition-colors shrink-0" />
              </button>
            ))}
          </div>
        )}

        {/* Continue / Close prompt when no options left */}
        {isTypingComplete && availableOptions.length === 0 && (
          <div className="mt-2 flex justify-end">
            <button
              onClick={(e) => {
                e.stopPropagation();
                soundManager.playClick();
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg bg-[#3a2518] hover:bg-[#523422] border border-[#7a4e30] text-[#eddac6] text-xs md:text-sm font-medium transition-colors flex items-center gap-1.5"
            >
              <span>پایان گفتگو</span>
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
