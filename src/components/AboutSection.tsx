/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AboutSection as AboutType } from '../types';

interface AboutSectionProps {
  defaultData: AboutType | null;
}

export default function AboutSection({ defaultData }: AboutSectionProps) {
  const defaultText = defaultData?.text || '';

  return (
    <section 
      className="relative bg-white/5 backdrop-blur-md border border-white/20 text-white rounded-xl p-6 overflow-hidden" 
      aria-labelledby="about-title"
    >
      {/* Sleek Interface Signature Corners */}
      <div className="tech-corner-tl" />
      <div className="tech-corner-tr" />
      <div className="tech-corner-bl" />
      <div className="tech-corner-br" />

      {/* Decorative technical ruler at the top */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-white/10 blueprint-ruler opacity-40" />

      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-white animate-pulse"></div>
          <h2 id="about-title" className="text-sm font-bold font-display uppercase tracking-widest text-white">
            {defaultData?.title || 'About Studio'}
          </h2>
        </div>
      </div>

      <div className="font-sans text-sm md:text-base leading-relaxed">
        <p className="whitespace-pre-line text-white/80 font-sans font-light">
          {defaultText || 'Loading description...'}
        </p>
      </div>

      {/* Craft detail block */}
      <div className="mt-4 pt-3 border-t border-dashed border-white/10 flex justify-between items-center text-[10px] font-mono text-white/40">
        <span>LOC: DEPT_DRAFT_2</span>
        <span>CARD_EST: 2026</span>
      </div>
    </section>
  );
}
