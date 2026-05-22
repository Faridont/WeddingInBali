"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";
import { Countdown } from "@/components/Countdown";
import { HeadbandPlate } from "@/components/ui/HeadbandPlate";
import { LeafEmblem } from "@/components/ui/LeafEmblem";
import { MangaSpeedLines } from "@/components/ui/MangaSpeedLines";
import { CloudPattern, NarutoSpiral } from "@/components/ui/NarutoSpiral";
import {
  Kunai,
  MissionSeal,
  NinjaScroll,
  NarutoCorners,
  Rasengan,
  Sharingan,
} from "@/components/ui/naruto";

export function Hero() {
  const scrollToRsvp = () => {
    document.getElementById("rsvp")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-ninja-gradient">
      <NarutoCorners />
      <MangaSpeedLines />
      <CloudPattern />
      <NarutoSpiral
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-ninja-orange/10"
        size={400}
      />
      <motion.div
        className="absolute -left-16 top-20 text-ninja-orange/45"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        <NarutoSpiral size={160} />
      </motion.div>
      <motion.div
        className="absolute -right-12 bottom-32 text-ninja-orange/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <NarutoSpiral size={200} />
      </motion.div>
      <Rasengan
        className="pointer-events-none absolute -bottom-10 -left-10 z-[5] opacity-50 blur-[1px]"
        size={320}
        duration={30}
      />

      <motion.div
        className="container-wide relative z-10 px-4 py-20 pb-28 text-center sm:pb-32 xl:pb-20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <HeadbandPlate className="mb-4">
          <p className="flex items-center justify-center gap-3 font-display text-sm uppercase tracking-[0.25em] text-ninja-ink sm:text-base">
            <LeafEmblem className="text-ninja-orange" size={28} />
            <span>
              {weddingConfig.brideName} & {weddingConfig.groomName}
            </span>
            <LeafEmblem className="text-ninja-orange" size={28} />
          </p>
        </HeadbandPlate>
        <div className="mb-6 flex items-center justify-center gap-3">
          <MissionSeal rank="S" />
          <div className="text-center">
            <p className="font-display text-xs uppercase tracking-[0.4em] text-gold">
              {weddingConfig.theme.missionLabel}
            </p>
            <p className="mt-1 text-xs text-scroll/60">
              {weddingConfig.theme.missionNote}
            </p>
          </div>
          <Sharingan size={44} />
        </div>

        <motion.div className="headband-cloth relative mx-auto mb-6 max-w-3xl px-6 py-2">
          <Kunai spin className="absolute -left-2 top-1/2 -translate-y-1/2 text-ninja-black/40" size={24} />
          <Kunai spin className="absolute -right-2 top-1/2 -translate-y-1/2 text-ninja-black/40" size={24} flip />
          <h1 className="naruto-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            {weddingConfig.hero.title}
          </h1>
        </motion.div>

        <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-scroll/85 md:text-xl">
          {weddingConfig.hero.subtitle}
        </p>

        <motion.div
          className="mx-auto mt-8 max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className="mb-2 text-center font-display text-[10px] uppercase tracking-[0.35em] text-gold/80">
            {weddingConfig.theme.scrollLabel}
          </p>
          <NinjaScroll compact>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
            <div className="flex items-center gap-2 font-medium">
              <CalendarIcon />
              <span>
                {weddingConfig.date}, {weddingConfig.time}
              </span>
            </div>
            <span className="hidden text-ninja-orange sm:inline" aria-hidden="true">
              {" · "}
            </span>
            <div className="flex items-center gap-2">
              <LocationIcon />
              <span>{weddingConfig.location}</span>
            </div>
          </div>
          <p className="mt-2 text-center text-sm text-ninja-ink/60">
            {weddingConfig.timeZoneLabel}
          </p>
          </NinjaScroll>
        </motion.div>

        <Countdown />

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <button
            type="button"
            onClick={scrollToRsvp}
            className="inline-flex items-center justify-center gap-2 rounded-md border-[3px] border-ninja-black bg-ninja-orange px-10 py-4 font-display text-sm uppercase tracking-widest text-ninja-black shadow-naruto transition-all hover:bg-ninja-orange-dark hover:translate-y-0.5 hover:shadow-none focus:outline-none focus:ring-2 focus:ring-ninja-orange focus:ring-offset-2 focus:ring-offset-ninja-black"
          >
            <Kunai size={20} spin={false} className="text-ninja-black" />
            {weddingConfig.hero.cta}
          </button>
        </motion.div>

        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <button
            type="button"
            onClick={scrollToRsvp}
            className="text-ninja-orange/60 transition-colors hover:text-ninja-orange"
            aria-label="Прокрутить к форме"
          >
            <ChevronDownIcon />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

function CalendarIcon() {
  return (
    <svg
      className="h-5 w-5 text-ninja-orange"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      className="h-5 w-5 text-ninja-orange"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  );
}
