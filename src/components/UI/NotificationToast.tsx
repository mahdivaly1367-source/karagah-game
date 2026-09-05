import React from 'react';
import { Award, CheckCircle } from 'lucide-react';

interface NotificationToastProps {
  message: string | null;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div 
      className="absolute top-16 left-1/2 -translate-x-1/2 z-40 px-5 py-2.5 rounded-xl bg-[#2b170c]/95 border-2 border-[#b45309] shadow-2xl text-[#fef3c7] text-sm md:text-base font-bold flex items-center gap-2.5 backdrop-blur-md animate-in fade-in slide-in-from-top-3 duration-200 pointer-events-none select-none"
      dir="rtl"
    >
      <Award className="w-5 h-5 text-amber-400 shrink-0 animate-bounce" />
      <span>{message}</span>
    </div>
  );
};
