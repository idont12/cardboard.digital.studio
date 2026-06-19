/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ExternalLink, MessageSquareText, Check, ArrowLeft } from 'lucide-react';
import { Game } from '../types';
import { trackAnalyticsEvent } from '../lib/analytics';

interface GameModalProps {
  game: Game | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function GameModal({
  game,
  isOpen,
  onClose,
}: GameModalProps) {
  const [localGame, setLocalGame] = React.useState<Game | null>(game);

  useEffect(() => {
    if (game) {
      setLocalGame(game);
    }
  }, [game]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!localGame) return null;

  // Render exactly 1 to 2 sentences limit for description robustness
  const getShortenedDescription = (desc: string) => {
    if (!desc) return '';
    const sentences = desc.split(/([.!?]\s+)/).reduce((acc: string[], cur) => {
      if (acc.length === 0 || acc[acc.length - 1].endsWith(' ')) {
        acc.push(cur);
      } else {
        acc[acc.length - 1] += cur;
      }
      return acc;
    }, []);

    const pruned = sentences.slice(0, 2).join('').trim();
    return pruned || desc;
  };

  const shortDesc = getShortenedDescription(localGame.shortDescription);

  // Secure feedback form target (using customizable JSON URL or fallback)
  const feedbackFormUrl = localGame.rateFormUrl || `https://docs.google.com/forms/d/e/1FAIpQLSdvf60D79s6V-SiaTzVsh0X9Ue6rV-K3_n7gW6qNqYVb0qA1w/viewform?embedded=true&entry.948271810=${encodeURIComponent(localGame.title)}`;

  const handlePlayPrototypeClick = () => {
    trackAnalyticsEvent('game_play_prototype_click', {
      game_id: localGame.id,
      game_title: localGame.title,
      destination: localGame.playUrl,
    });
  };

  const handleViewItchClick = () => {
    trackAnalyticsEvent('game_view_itch_click', {
      game_id: localGame.id,
      game_title: localGame.title,
      destination: localGame.itchUrl,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-slate-950/85 backdrop-blur-sm p-0 md:p-4"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop Click */}
          <div className="absolute inset-0 cursor-pointer" onClick={onClose} aria-hidden="true" />

          {/* Modal Container: Drag-to-dismiss swipe option on mobile + layout */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0.1, bottom: 0.8 }}
            onDragEnd={(event, info) => {
              if (info.offset.y > 100 || info.velocity.y > 350) {
                onClose();
              }
            }}
            initial={{ y: '100%', opacity: 0.9 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0.9 }}
            transition={{ type: 'spring', damping: 28, stiffness: 240 }}
            className="relative bg-[#005cd1] border-t md:border border-white/20 rounded-t-3xl md:rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl focus:outline-none blueprint-dots z-10 flex flex-col max-h-[92vh] md:max-h-[85vh] cursor-grab active:cursor-grabbing"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Minimal IOS-style slide grab handle */}
            <div className="w-12 h-1.5 bg-white/30 rounded-full mx-auto my-3 md:my-4 flex-shrink-0 cursor-row-resize" />

            {/* Top Bar containing small back arrow button */}
            <div className="px-6 pb-2 pt-1 flex items-center justify-between text-white/90">
              <button
                onClick={onClose}
                className="p-2 -ml-2 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-colors cursor-pointer inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider"
                aria-label="Back to listing"
                id="back-to-listing"
              >
                <ArrowLeft className="w-4 h-4 text-white" />
                <span>Back</span>
              </button>
              
              <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase select-none">
                SWIPE DOWN TO DISMISS
              </span>
            </div>

            {/* Core Body Container - p-6 space-y-6 */}
            <div className="px-6 pb-8 pt-3 space-y-5 overflow-y-auto flex-1 text-white">
              
              {/* Simple Big Title */}
              <h2 className="text-2xl md:text-3xl font-black font-display uppercase tracking-tight text-white leading-tight">
                {localGame.title}
              </h2>

              {/* Description - simple clean text, NOT styling as blockquote/quote box */}
              <p className="text-sm md:text-base text-white/95 leading-relaxed font-sans font-normal">
                {shortDesc}
              </p>

              {/* Action Buttons Panel */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
                <a
                  href={localGame.playUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handlePlayPrototypeClick}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-blue-600 font-extrabold font-sans py-3 px-5 rounded-xl transition-all text-sm cursor-pointer shadow-lg"
                  aria-label={`Play ${localGame.title}`}
                >
                  <Play className="w-4 h-4 fill-current text-blue-600" />
                  PLAY PROTOTYPE
                </a>

                <a
                  href={localGame.itchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleViewItchClick}
                  className="inline-flex items-center justify-center gap-2 border border-white/40 bg-white/5 hover:bg-white/10 text-white font-bold font-sans py-3 px-5 rounded-xl transition-all text-sm cursor-pointer"
                  aria-label={`View ${localGame.title} on Itch.io`}
                >
                  VIEW ON ITCH
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Standard iframe Google Sheets Form rating component */}
              <div className="hidden space-y-2.5 pt-4 border-t border-white/15">
                <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest text-white/80 font-bold">
                  <MessageSquareText className="w-3.5 h-3.5 text-amber-400" />
                  Rate game
                </div>
                
                <div className="w-full min-h-[240px] h-64 rounded-xl bg-white overflow-hidden border border-white/20 relative shadow-inner">
                  <iframe
                    src={feedbackFormUrl}
                    className="w-full h-full"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    title="Google Rating Form Container"
                  >
                    Loading evaluation sheet...
                  </iframe>
                </div>
              </div>

            </div>

            {/* Micro bottom status strip */}
            <div className="bg-white/5 px-6 py-2 border-t border-white/15 flex justify-between text-[8px] font-mono text-white/30 tracking-wider">
              <span>REFERENCE: {localGame.id.toUpperCase()}</span>
              <span>© CARDBOARD WORKBENCH</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
