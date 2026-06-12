/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ExternalLink, Gamepad2 } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  key?: string;
  game: Game;
  onOpenDetails: (game: Game) => void;
  isNew?: boolean;
}

export default function GameCard({ game, onOpenDetails, isNew }: GameCardProps) {
  return (
    <button 
      onClick={() => onOpenDetails(game)}
      className="w-full text-left relative bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/20 hover:border-white/40 p-4 rounded-xl flex items-center justify-between transition-all duration-150 outline-none focus:ring-2 focus:ring-white group cursor-pointer"
      aria-label={`Open options for ${game.title} ${isNew ? '- New release' : ''}`}
    >
      {/* Sleek Minimal corners */}
      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-white/30" />
      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-white/30" />

      {isNew && (
        <span className="absolute -top-2.5 left-6 bg-amber-400 text-slate-950 font-mono text-xs font-black px-3 py-0.5 rounded shadow-lg uppercase tracking-wider border border-white/10 z-10">
          NEW
        </span>
      )}

      <div className="flex items-center gap-3.5">
        <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-blue-600 transition-all duration-150">
          <Gamepad2 className="w-5 h-5 text-white group-hover:text-blue-600 transition-colors" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-display font-medium text-base text-white tracking-wide uppercase">
              {game.title}
            </h3>
          </div>
          <span className="text-[10px] font-mono text-white/50 tracking-wider">
            PROTOTYPE {game.prototypeWeek}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-white/50 group-hover:text-white transition-colors">
        <span className="text-xs font-mono uppercase tracking-widest hidden sm:inline">VIEW</span>
        <ExternalLink className="w-4 h-4" />
      </div>
    </button>
  );
}
