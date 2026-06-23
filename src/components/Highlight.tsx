/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { Game } from '../types';

interface HighlightProps {
  games: Game[];
  highlightIds: string[];
  onOpenDetails: (game: Game) => void;
  onBackToAllProjects: () => void;
}

function resolvePublicPath(path: string) {
  if (/^(https?:|data:|blob:)/i.test(path)) {
    return path;
  }

  const normalized = path.replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${normalized}`;
}

export default function Highlight({
  games,
  highlightIds,
  onOpenDetails,
  onBackToAllProjects,
}: HighlightProps) {
  const selectedGames = highlightIds
    .map((id) => games.find((game) => game.id === id))
    .filter((game): game is Game => Boolean(game));

  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/15 bg-slate-950/10 p-4 sm:p-6 shadow-[0_24px_80px_rgba(2,8,23,0.35)]" aria-labelledby="highlight-title">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.12),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_35%)] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-5">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.3em] text-white/70">
            <Sparkles className="h-3.5 w-3.5 text-amber-300" />
            Highlight reel
          </div>
          <h2 id="highlight-title" className="text-2xl sm:text-3xl md:text-4xl font-black font-display uppercase tracking-tight text-white leading-none">
            Selected projects
          </h2>
        </div>

        <button
          type="button"
          onClick={onBackToAllProjects}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-xs font-mono uppercase tracking-[0.22em] text-white/85 transition-colors hover:bg-white/12 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          All projects
        </button>
      </div>

      {selectedGames.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-5 relative">
          {selectedGames.map((game) => {
            const backgroundImage = game.backgroundImage
              ? `url(${resolvePublicPath(game.backgroundImage)})`
              : 'linear-gradient(135deg, rgba(15,23,42,0.95), rgba(37,99,235,0.6))';
            const genre = game.genre || game.Ganre || 'Genre TBD';

            return (
              <button
                key={game.id}
                type="button"
                onClick={() => onOpenDetails(game)}
                className="group relative overflow-hidden rounded-2xl border border-white/15 bg-slate-950/40 text-left min-h-[210px] sm:min-h-[240px] shadow-lg transition-transform duration-200 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label={`Open details for ${game.title}`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage }}
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#0065e1] via-[#0065e1]/50 to-[#0065e1]/10"></div>
                <div className="absolute inset-0 opacity-40 bg-[linear-gradient(90deg,rgba(255,255,255,0.07)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:18px_18px]" />

                <div className="relative z-10 flex h-full flex-col justify-end p-5 sm:p-6">
                  <div className="max-w-[90%] space-y-2">
                    <span className="inline-flex items-center rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.22em] text-white/80 backdrop-blur-md">
                      {genre}
                    </span>
                    <h3 className="text-2xl sm:text-[2rem] font-black font-display uppercase tracking-tight text-white leading-none drop-shadow-[0_1px_2px_rgba(0,0,0,0.45)]">
                      {game.title}
                    </h3>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <div className="rounded-2xl border border-white/15 bg-white/5 p-6 text-white/75">
          <p className="mb-2 text-sm font-mono uppercase tracking-[0.22em] text-white/45">
            No matching prototypes
          </p>
          <p className="text-sm leading-relaxed">
            The highlight IDs in the URL did not match anything in the loaded game data.
          </p>
        </div>
      )}
    </section>
  );
}