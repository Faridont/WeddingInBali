const AUDIO_SRC = "/audio/blue-bird.mp3";

let audio: HTMLAudioElement | null = null;

export function getBackgroundAudio(): HTMLAudioElement | null {
  if (typeof window === "undefined") return null;
  if (!audio) {
    audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = 0.5;
    audio.preload = "auto";
  }
  return audio;
}

export function preloadBackgroundMusic(): Promise<void> {
  const el = getBackgroundAudio();
  if (!el) return Promise.resolve();

  if (el.readyState >= 3) return Promise.resolve();

  return new Promise((resolve) => {
    const done = () => resolve();
    el.addEventListener("canplaythrough", done, { once: true });
    el.addEventListener("error", done, { once: true });
    el.load();
    window.setTimeout(done, 2500);
  });
}

export async function playBackgroundMusic(): Promise<boolean> {
  const el = getBackgroundAudio();
  if (!el) return false;

  try {
    el.muted = false;
    await el.play();
    return true;
  } catch {
    try {
      el.muted = true;
      await el.play();
      el.muted = false;
      if (!el.paused) return true;
      await el.play();
      return true;
    } catch {
      el.muted = false;
      return false;
    }
  }
}

export function pauseBackgroundMusic() {
  audio?.pause();
}

export function isBackgroundMusicPlaying(): boolean {
  return Boolean(audio && !audio.paused && !audio.ended);
}

/** Агрессивные попытки старта (пока идёт прелоадер). */
export function startMusicDuringPreloader(): () => void {
  void playBackgroundMusic();

  const el = getBackgroundAudio();
  const onReady = () => void playBackgroundMusic();
  el?.addEventListener("canplaythrough", onReady);
  el?.addEventListener("loadeddata", onReady);

  let attempts = 0;
  const interval = window.setInterval(() => {
    if (isBackgroundMusicPlaying()) {
      window.clearInterval(interval);
      return;
    }
    void playBackgroundMusic();
    attempts += 1;
    if (attempts > 20) window.clearInterval(interval);
  }, 400);

  return () => {
    window.clearInterval(interval);
    el?.removeEventListener("canplaythrough", onReady);
    el?.removeEventListener("loadeddata", onReady);
  };
}
