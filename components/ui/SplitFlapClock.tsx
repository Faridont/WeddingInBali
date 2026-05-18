"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const FLIP_MS = 520;

interface SplitFlapDigitProps {
  digit: number;
}

function DigitHalf({
  digit,
  part,
}: {
  digit: number;
  part: "top" | "bottom";
}) {
  return (
    <div
      className={`absolute left-0 right-0 flex h-[200%] w-full items-center justify-center ${
        part === "top" ? "top-0" : "bottom-0"
      }`}
    >
      <span className="select-none font-display text-[2.35rem] leading-none text-ninja-orange sm:text-[2.75rem]">
        {digit}
      </span>
    </div>
  );
}

export function SplitFlapDigit({ digit }: SplitFlapDigitProps) {
  const reduceMotion = useReducedMotion();
  const safe = Math.min(9, Math.max(0, digit));
  const [current, setCurrent] = useState(safe);
  const [previous, setPrevious] = useState(safe);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (safe === current) return;

    if (reduceMotion) {
      setCurrent(safe);
      setPrevious(safe);
      return;
    }

    setPrevious(current);
    setFlipping(true);

    const timer = window.setTimeout(() => {
      setCurrent(safe);
      setFlipping(false);
    }, FLIP_MS);

    return () => window.clearTimeout(timer);
  }, [safe, current, reduceMotion]);

  return (
    <motion.div
      className="flip-digit relative mx-0.5"
      style={{ width: 48, height: 64 }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 rounded-md border-2 border-ninja-orange/50 bg-ninja-black shadow-[0_4px_0_#ff6b00,inset_0_0_20px_rgba(255,107,0,0.1)]" />

      <div className="absolute bottom-0 left-0 right-0 h-1/2 overflow-hidden rounded-b-md bg-ninja-navy">
        <DigitHalf digit={flipping ? safe : current} part="bottom" />
      </div>

      <div className="absolute left-0 right-0 top-0 z-0 h-1/2 overflow-hidden rounded-t-md bg-ninja-ink">
        <DigitHalf digit={safe} part="top" />
      </div>

      {flipping && (
        <motion.div
          className="flip-flap absolute left-0 right-0 top-0 z-20 h-1/2 origin-bottom overflow-hidden rounded-t-md border-b border-ninja-orange/30 bg-ninja-navy"
          initial={{ rotateX: 0 }}
          animate={{ rotateX: -180 }}
          transition={{ duration: FLIP_MS / 1000, ease: [0.4, 0, 0.2, 1] }}
          style={{
            transformPerspective: 320,
            boxShadow: "0 4px 12px rgba(255, 107, 0, 0.3)",
          }}
        >
          <DigitHalf digit={previous} part="top" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ninja-orange/10 to-black/50" />
        </motion.div>
      )}

      <div className="absolute left-0 right-0 top-1/2 z-30 h-[2px] -translate-y-1/2 bg-ninja-orange/60" />
      <div className="absolute left-1 top-1/2 z-30 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ninja-orange shadow-[0_0_6px_#ff6b00]" />
      <div className="absolute right-1 top-1/2 z-30 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ninja-orange shadow-[0_0_6px_#ff6b00]" />
    </motion.div>
  );
}

export function SplitFlapPair({ value, minDigits = 2 }: { value: number; minDigits?: number }) {
  const str = String(Math.max(0, value)).padStart(minDigits, "0");
  return (
    <div className="flex">
      {str.split("").map((char, i) => (
        <SplitFlapDigit key={i} digit={parseInt(char, 10)} />
      ))}
    </div>
  );
}

export function SplitFlapUnit({
  value,
  label,
  minDigits = 2,
}: {
  value: number;
  label: string;
  minDigits?: number;
}) {
  return (
    <div className="flex flex-col items-center">
      <SplitFlapPair value={value} minDigits={minDigits} />
      <span className="mt-3 font-display text-[10px] uppercase tracking-[0.25em] text-gold sm:text-xs">
        {label}
      </span>
    </div>
  );
}
