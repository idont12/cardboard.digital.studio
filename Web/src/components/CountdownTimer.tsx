/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface CountdownTimerProps {
  releaseDate: string | null;
}

export default function CountdownTimer({ releaseDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isOver: false,
  });

  useEffect(() => {
    if (!releaseDate) return;

    const calculateTimeLeft = () => {
      const difference = +new Date(releaseDate) - +new Date();
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, isOver: true };
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isOver: false,
      };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [releaseDate]);

  if (!releaseDate) return null;

  const formatNum = (num: number) => num.toString().padStart(2, '0');

  return (
    <div 
      className="bg-white/10 border border-white/20 p-6 md:p-8 rounded-2xl text-center font-mono uppercase text-white shadow-xl blueprint-grid relative overflow-hidden"
      id="next-sprint-countdown"
    >
      {/* Subtle tech corners */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30" />

      {timeLeft.isOver ? (
        <span className="text-emerald-400 font-extrabold text-xl md:text-2xl lg:text-3xl tracking-wider animate-pulse block">
          NEW GAME LIVE NOW !!!
        </span>
      ) : (
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black tracking-widest leading-relaxed">
          NEW GAME IN:{' '}
          <span className="text-amber-400 block mt-2 font-black tracking-tight bg-slate-950/20 px-3 py-1.5 rounded border border-white/5 max-w-xs md:max-w-sm mx-auto">
            {formatNum(timeLeft.days)} : {formatNum(timeLeft.hours)} : {formatNum(timeLeft.minutes)} : {formatNum(timeLeft.seconds)}
          </span>
        </p>
      )}
    </div>
  );
}
