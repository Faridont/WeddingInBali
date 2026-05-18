"use client";

import { useCallback, useEffect, useState } from "react";
import {
  getBackgroundAudio,
  pauseBackgroundMusic,
  playBackgroundMusic,
} from "@/lib/background-audio";

export function BackgroundMusic() {
  const [playing, setPlaying] = useState(false);
  const [missingFile, setMissingFile] = useState(false);

  const syncPlaying = useCallback(() => {
    const el = getBackgroundAudio();
    setPlaying(Boolean(el && !el.paused));
  }, []);

  useEffect(() => {
    const el = getBackgroundAudio();
    if (!el) return;

    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    const onError = () => setMissingFile(true);

    el.addEventListener("play", onPlay);
    el.addEventListener("pause", onPause);
    el.addEventListener("error", onError);

    fetch("/audio/blue-bird.mp3", { method: "HEAD" })
      .then((res) => {
        if (!res.ok) setMissingFile(true);
      })
      .catch(() => setMissingFile(true));

    const interval = window.setInterval(syncPlaying, 400);

    return () => {
      el.removeEventListener("play", onPlay);
      el.removeEventListener("pause", onPause);
      el.removeEventListener("error", onError);
      window.clearInterval(interval);
    };
  }, [syncPlaying]);

  const turnOff = useCallback(() => {
    pauseBackgroundMusic();
    setPlaying(false);
  }, []);

  const turnOn = useCallback(() => {
    void playBackgroundMusic().then((ok) => setPlaying(ok));
  }, []);

  const toggle = useCallback(() => {
    if (playing) turnOff();
    else turnOn();
  }, [playing, turnOff, turnOn]);

  return (
    <div className="fixed bottom-4 right-4 z-[210] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">
      {missingFile && (
        <p className="max-w-[200px] rounded-md border border-red-400/50 bg-ninja-black/90 px-2 py-1.5 text-right text-[10px] leading-snug text-red-200">
          Добавьте файл{" "}
          <code className="text-pink-200">public/audio/blue-bird.mp3</code>
        </p>
      )}
      <button
        type="button"
        onClick={toggle}
        className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ninja-orange bg-ninja-black/95 text-ninja-orange shadow-naruto backdrop-blur-sm transition-colors hover:bg-ninja-orange hover:text-ninja-black focus:outline-none focus:ring-2 focus:ring-ninja-orange focus:ring-offset-2 focus:ring-offset-ninja-black"
        aria-label={playing ? "Выключить музыку" : "Включить музыку"}
        title={
          missingFile
            ? "Нет файла blue-bird.mp3"
            : playing
              ? "Blue Bird — выключить"
              : "Blue Bird — включить"
        }
      >
        {playing ? <SpeakerOnIcon /> : <SpeakerOffIcon />}
      </button>
    </div>
  );
}

function SpeakerOnIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11 5L6 9H3v6h3l5 4V5zm5.5 2.5a7 7 0 010 9M14 7.5a4 4 0 010 9" stroke="currentColor" strokeWidth={1.8} fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SpeakerOffIcon() {
  return (
    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11 5L6 9H3v6h3l5 4V5zM19 9l-6 6M13 9l6 6" stroke="currentColor" strokeWidth={1.8} fill="none" strokeLinecap="round" />
    </svg>
  );
}
