"use client";

import { useEffect, useState } from "react";
import { weddingConfig } from "@/lib/wedding-config";
import { SplitFlapUnit } from "@/components/ui/SplitFlapClock";
import { Sharingan } from "@/components/ui/naruto";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function getTimeLeft(targetMs: number): TimeLeft | null {
  const diff = targetMs - Date.now();
  if (diff <= 0) return null;

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function dayDigits(days: number) {
  return Math.max(2, String(days).length);
}

function formatCountdown(t: TimeLeft) {
  const c = weddingConfig.countdown;
  return `${t.days} ${c.daysLabel}, ${t.hours} ${c.hoursLabel}, ${t.minutes} ${c.minutesLabel}, ${t.seconds} ${c.secondsLabel}`;
}

export function Countdown() {
  const targetMs = new Date(weddingConfig.weddingDateTimeISO).getTime();
  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setMounted(true);
    const tick = () => setTimeLeft(getTimeLeft(targetMs));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetMs]);

  if (!mounted) {
    return (
      <div className="mt-10 min-h-[6.5rem]" aria-hidden="true">
        <p className="mb-5 font-display text-xs uppercase tracking-[0.3em] text-gold">
          ★ {weddingConfig.countdown.label} ★
        </p>
        <div className="flex justify-center gap-4 opacity-30">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-16 w-24 animate-pulse rounded-md border border-ninja-orange/30 bg-ninja-navy"
            />
          ))}
        </div>
      </div>
    );
  }

  if (timeLeft === null) {
    return (
      <p className="mt-8 font-display text-xl uppercase text-ninja-orange md:text-2xl">
        {weddingConfig.countdown.pastLabel}
      </p>
    );
  }

  const units = [
    {
      value: timeLeft.days,
      label: weddingConfig.countdown.daysLabel,
      minDigits: dayDigits(timeLeft.days),
    },
    {
      value: timeLeft.hours,
      label: weddingConfig.countdown.hoursLabel,
      minDigits: 2,
    },
    {
      value: timeLeft.minutes,
      label: weddingConfig.countdown.minutesLabel,
      minDigits: 2,
    },
    {
      value: timeLeft.seconds,
      label: weddingConfig.countdown.secondsLabel,
      minDigits: 2,
    },
  ];

  return (
    <div
      className="mt-10"
      aria-live="polite"
      aria-label={`${weddingConfig.countdown.label}: ${formatCountdown(timeLeft)}`}
    >
      <div className="mb-5 flex items-center justify-center gap-3">
        <Sharingan size={32} />
        <p className="font-display text-xs uppercase tracking-[0.3em] text-gold">
          ★ {weddingConfig.countdown.label} ★
        </p>
        <Sharingan size={32} />
      </div>
      <div className="flex flex-wrap items-start justify-center gap-6 sm:gap-10">
        {units.map((unit) => (
          <SplitFlapUnit
            key={unit.label}
            value={unit.value}
            label={unit.label}
            minDigits={unit.minDigits}
          />
        ))}
      </div>
    </div>
  );
}
