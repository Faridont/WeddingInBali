"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  isBackgroundMusicPlaying,
  playBackgroundMusic,
  preloadBackgroundMusic,
  startMusicDuringPreloader,
} from "@/lib/background-audio";
import { SAKURA_PRELOADER_MS } from "@/lib/site-constants";

const PETAL_ANIM_SEC = 2.55;
const HUES = ["#ffb7c5", "#ffc8d8", "#f9a8c4", "#ffe4ec", "#fda4af", "#fecdd3"];

type Phase = "boot" | "waiting" | "sakura" | "done";

interface BurstPetal {
  id: number;
  originX: number;
  originY: number;
  tx: number;
  ty: number;
  rot: number;
  delay: number;
  size: number;
  hue: string;
}

interface FallPetal {
  id: number;
  leftPct: number;
  delay: number;
  size: number;
  hue: string;
  drift: number;
  duration: number;
  rot: number;
}

/** Меньше лепестков на слабых/узких экранах — меньше лагов. */
function getPetalDensity(): number {
  const w = window.innerWidth;
  const cores = navigator.hardwareConcurrency ?? 4;
  let d = 1;
  if (w < 480) d = 0.4;
  else if (w < 768) d = 0.58;
  else if (w < 1024) d = 0.78;
  if (cores <= 4) d *= 0.88;
  return d;
}

function buildBurstPetals(width: number, height: number): BurstPetal[] {
  const d = getPetalDensity();
  const petals: BurstPetal[] = [];
  const maxForce = Math.max(width, height) * 0.72;
  const origins = [
    { x: width * 0.5, y: height * 0.48 },
    { x: width * 0.18, y: height * 0.32 },
    { x: width * 0.82, y: height * 0.34 },
    { x: width * 0.28, y: height * 0.68 },
    { x: width * 0.72, y: height * 0.66 },
    { x: width * 0.5, y: height * 0.22 },
    { x: width * 0.5, y: height * 0.78 },
  ];
  const perOrigin = Math.max(4, Math.round(8 * d));

  origins.forEach((origin, oi) => {
    for (let i = 0; i < perOrigin; i++) {
      const angle = Math.random() * Math.PI * 2;
      const force = maxForce * (0.35 + Math.random() * 0.65);
      petals.push({
        id: oi * perOrigin + i,
        originX: origin.x,
        originY: origin.y,
        tx: Math.cos(angle) * force,
        ty: Math.sin(angle) * force + (Math.random() - 0.5) * 120,
        rot: (Math.random() - 0.5) * 900,
        delay: Math.random() * 0.32,
        size: 6 + Math.random() * 14,
        hue: HUES[(oi + i) % HUES.length]!,
      });
    }
  });

  const extra = Math.max(8, Math.round(16 * d));
  for (let i = 0; i < extra; i++) {
    const originX = Math.random() * width;
    const originY = Math.random() * height;
    const angle = Math.random() * Math.PI * 2;
    const force = maxForce * (0.2 + Math.random() * 0.5);
    petals.push({
      id: 10000 + i,
      originX,
      originY,
      tx: Math.cos(angle) * force,
      ty: Math.sin(angle) * force,
      rot: (Math.random() - 0.5) * 600,
      delay: Math.random() * 0.25,
      size: 5 + Math.random() * 11,
      hue: HUES[i % HUES.length]!,
    });
  }

  return petals;
}

function buildFallPetals(): FallPetal[] {
  const count = Math.max(12, Math.round(28 * getPetalDensity()));
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    leftPct: Math.random() * 100,
    delay: Math.random() * 0.4,
    size: 5 + Math.random() * 12,
    hue: HUES[i % HUES.length]!,
    drift: (Math.random() - 0.5) * 80,
    duration: 2.2 + Math.random() * 0.9,
    rot: 200 + i * 7,
  }));
}

function burstStyle(p: BurstPetal): CSSProperties {
  return {
    ["--x0" as string]: `${p.originX}px`,
    ["--y0" as string]: `${p.originY}px`,
    ["--tx" as string]: `${p.tx}px`,
    ["--ty" as string]: `${p.ty}px`,
    ["--rot" as string]: `${p.rot}deg`,
    ["--delay" as string]: `${p.delay}s`,
    ["--dur" as string]: `${PETAL_ANIM_SEC}s`,
    ["--size" as string]: `${p.size}px`,
    ["--hue" as string]: p.hue,
  };
}

function fallStyle(p: FallPetal): CSSProperties {
  return {
    left: `${p.leftPct}%`,
    ["--drift" as string]: `${p.drift}px`,
    ["--rot-fall" as string]: `${p.rot}deg`,
    ["--delay" as string]: `${p.delay}s`,
    ["--dur" as string]: `${p.duration}s`,
    ["--size" as string]: `${p.size}px`,
    ["--hue" as string]: p.hue,
  };
}

export function SakuraPreloader() {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<Phase>(reduceMotion ? "done" : "boot");
  const [burst, setBurst] = useState<BurstPetal[]>([]);
  const [falling, setFalling] = useState<FallPetal[]>([]);
  const stopMusicRetry = useRef<(() => void) | null>(null);

  const launchSakura = useCallback(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    setBurst(buildBurstPetals(w, h));
    setFalling(buildFallPetals());
    setPhase("sakura");
    document.body.style.overflow = "hidden";
    stopMusicRetry.current = startMusicDuringPreloader();
  }, []);

  const beginExperience = useCallback(async () => {
    void Promise.race([
      preloadBackgroundMusic(),
      new Promise<void>((resolve) => window.setTimeout(resolve, 800)),
    ]);
    await playBackgroundMusic();
    launchSakura();
  }, [launchSakura]);

  useEffect(() => {
    if (reduceMotion) return;

    let cancelled = false;

    (async () => {
      await Promise.race([
        preloadBackgroundMusic(),
        new Promise<void>((resolve) => window.setTimeout(resolve, 800)),
      ]);
      const autoplayOk = await playBackgroundMusic();

      if (cancelled) return;

      if (autoplayOk) {
        launchSakura();
      } else {
        setPhase("waiting");
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [reduceMotion, launchSakura]);

  useEffect(() => {
    if (phase !== "sakura") return;

    const timer = window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
      stopMusicRetry.current?.();
      stopMusicRetry.current = null;
    }, SAKURA_PRELOADER_MS);

    return () => window.clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      stopMusicRetry.current?.();
    };
  }, []);

  if (phase === "done" || reduceMotion) return null;

  return (
    <AnimatePresence>
      {phase === "waiting" && (
        <motion.button
          type="button"
          key="waiting"
          className="fixed inset-0 z-[200] flex cursor-pointer flex-col items-center justify-center bg-ninja-black px-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => void beginExperience()}
        >
          <p className="font-display text-xs uppercase tracking-[0.45em] text-gold">
            Миссия ранга S
          </p>
          <p className="naruto-title mt-4 text-2xl sm:text-3xl">
            Нажмите, чтобы принять миссию
          </p>
        </motion.button>
      )}

      {phase === "sakura" && (
        <motion.div
          key="sakura"
          className="fixed inset-0 z-[200] bg-ninja-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.38, ease: "easeInOut" }}
          aria-hidden="true"
          onPointerDown={() => {
            if (!isBackgroundMusicPlaying()) void playBackgroundMusic();
          }}
        >
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="sakura-flash pointer-events-none absolute inset-0" />

            <div className="sakura-petal-layer absolute inset-0">
              {burst.map((p) => (
                <span
                  key={p.id}
                  className="sakura-petal-burst"
                  style={burstStyle(p)}
                />
              ))}
              {falling.map((p) => (
                <span
                  key={`f-${p.id}`}
                  className="sakura-petal-fall"
                  style={fallStyle(p)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
