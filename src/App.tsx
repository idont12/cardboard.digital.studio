/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Gamepad2, RefreshCw } from 'lucide-react';

import { GamesData, Game } from './types';
import SocialLinks from './components/SocialLinks';
import CountdownTimer from './components/CountdownTimer';
import AboutSection from './components/AboutSection';
import GameCard from './components/GameCard';
import GameModal from './components/GameModal';

// Imported blueprint logo
import studioLogo from './assets/images/studio_logo_1781240650704.jpg';

export default function App() {
  const [data, setData] = useState<GamesData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal active states
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Fetch games configuration on mount
  useEffect(() => {
    fetch('games.json')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to download blueprint data stream.');
        }
        return res.json();
      })
      .then((jsonData: GamesData) => {
        setData(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err instanceof Error ? err.message : 'Blueprint loader error.');
        setLoading(false);
      });
  }, []);

  // Open & Close detailing modals
  const handleOpenDetails = (game: Game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  // Determine current local time
  const now = new Date();

  // Filter games based on current date
  // Released: Games with a releaseDate in the past or equal to now, sorted descending from new to old (by prototypeWeek)
  const releasedGames = data
    ? data.games
        .filter((g) => new Date(g.releaseDate) <= now)
        .sort((a, b) => b.prototypeWeek - a.prototypeWeek)
    : [];

  // Upcoming: Games with a releaseDate in the future, sorted ascending (closest release first)
  const upcomingGames = data
    ? data.games
        .filter((g) => new Date(g.releaseDate) > now)
        .sort((a, b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())
    : [];

  // Nearest upcoming target date
  const nextReleaseDate = upcomingGames.length > 0 ? upcomingGames[0].releaseDate : null;

  // The very newest released game in terms of prototypeWeek gets the "NEW" tag (only if releasedGames is not empty)
  const newestWeek = releasedGames.length > 0 
    ? Math.max(...releasedGames.map(g => g.prototypeWeek)) 
    : -1;

  return (
    <div className="blueprint-dots min-h-screen text-white font-sans selection:bg-white selection:text-blue-600 pb-16">
      
      {/* Keyboard Access Skip Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-55 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold border border-white focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Main Container Workpad */}
      <div className="max-w-6xl mx-auto px-6 pt-6 md:pt-12">
        
        {/* Dynamic Responsive PC / Landscape Layout split */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-14 items-start">
          
          {/* Left Column (Sticky Sidebar on Desktop) */}
          <div className="md:col-span-5 md:sticky md:top-8 space-y-8">
            
            {/* Minimal direct header without card borders or top banner images */}
            <header className="flex flex-col items-center md:items-start text-center md:text-left space-y-5">
              
              {/* Floating Blueprint Circular Logo - enlarged as 'the fort' size upgrade */}
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white/30 bg-slate-950 p-1 overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-200">
                <img 
                  src={studioLogo} 
                  alt="Cardboard Digital Studio Schematic Vector Box Icon" 
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Title representation & Subtitles styled in much bigger typography */}
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-amber-400 text-slate-950 font-mono text-xs tracking-[0.25em] font-black uppercase shadow-md rotate-[-1deg] self-center md:self-start">
                  Weekly Prototype Lab
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black font-display tracking-tight text-white uppercase leading-none">
                  Cardboard Digital Studio
                </h1>

                <p className="max-w-sm text-sm md:text-base text-white/85 font-light leading-relaxed">
                  Welcome to Cardboard Digital Studio. Help us make our first Steam game.
                </p>
              </div>

              {/* Social linkages block */}
              <div className="pt-2 border-t border-dashed border-white/15 w-full max-w-xs self-center md:self-start">
                <SocialLinks />
              </div>
            </header>

            {/* Live Sprint Countdown Segment */}
            {nextReleaseDate && (
              <div className="pt-2">
                <CountdownTimer releaseDate={nextReleaseDate} />
              </div>
            )}

          </div>

          {/* Right Column (Playable prototypes Feed & About Studio specs) */}
          <div className="md:col-span-7 space-y-8" id="main-content">
            
            {loading ? (
              <div className="bg-white/5 border border-white/20 rounded-xl p-10 text-center space-y-3">
                <RefreshCw className="w-6 h-6 text-white animate-spin mx-auto" />
                <p className="font-mono text-xs text-white/60">Retrieving weekly prototypes...</p>
              </div>
            ) : error ? (
              <div className="bg-white/5 border border-white/20 rounded-xl p-10 text-center space-y-3">
                <div className="inline-block bg-rose-950/40 text-rose-300 px-3 py-1 rounded border border-rose-500/20 font-mono text-xs font-bold">
                  LOAD_ERROR: {error}
                </div>
                <p className="text-xs text-white/60">
                  Please check `/public/games.json` or refresh the environment.
                </p>
              </div>
            ) : (
              <>
                {/* List Header specs */}
                <section className="space-y-4" aria-labelledby="prototypes-heading">
                  <div className="flex items-center gap-2 border-b border-white/10 pb-2.5">
                    <Gamepad2 className="w-5 h-5 text-emerald-300 animate-pulse" />
                    <h2 id="prototypes-heading" className="text-sm font-bold font-mono tracking-widest text-white uppercase">
                      PROTOTYPE RELEASES
                    </h2>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 ml-auto">
                      {releasedGames.length} active builds
                    </span>
                  </div>

                  {/* Single Column Linktree Link stack */}
                  <div className="flex flex-col gap-3">
                    {releasedGames.length > 0 ? (
                      releasedGames.map((g: Game) => (
                        <GameCard
                          key={g.id}
                          game={g}
                          onOpenDetails={handleOpenDetails}
                          isNew={g.prototypeWeek === newestWeek}
                        />
                      ))
                    ) : (
                      <p className="text-sm text-white/50 font-mono italic">
                        No active builds unlocked yet. Check back when the sprint counter ends!
                      </p>
                    )}
                  </div>
                </section>

                {/* Read-Only text of about section */}
                <AboutSection
                  defaultData={data ? data.aboutSection : null}
                />
              </>
            )}

            {/* Workbench Blueprint Footer */}
            <footer className="pt-8 border-t border-dashed border-white/10 text-center md:text-left space-y-2 font-mono text-[9px] tracking-wider text-white/40">
              <p>
                Cardboard Digital Studio © 2026. Made with high-fidelity blueprint aesthetics.
              </p>
            </footer>

          </div>

        </div>

      </div>

      {/* Options popup with slide-up Apple style */}
      <GameModal
        game={selectedGame}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
