import React from 'react';

export const SLOTIFY_BLUE = "#0069FF";

export const SlotifyLogo = () => (
  <div className="flex items-center gap-2">
    <img 
      src="/logo.png" 
      alt="Slotify Logo" 
      className="w-9 h-9 object-contain" 
    />
    <span className="font-bold text-[28px] tracking-tight text-slate-800">
      Slotify
    </span>
  </div>
);
