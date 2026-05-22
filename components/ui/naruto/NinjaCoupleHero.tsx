"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";

const columnBase = "pointer-events-none fixed z-[25] flex justify-center";

/** Телефон + планшет: нижние углы. xl+: по центру высоты сбоку */
const sideImg =
  "block h-auto w-full max-w-full object-contain drop-shadow-[0_0_28px_rgba(255,107,0,0.35)] " +
  "max-h-[18svh] sm:max-h-[22svh] md:max-h-[24svh] lg:max-h-[26svh] " +
  "xl:max-h-[78vh] 2xl:max-h-[min(96vh,923px)]";

const brideColumn =
  `${columnBase} bottom-0 left-0 items-end w-[min(26vw,84px)] ` +
  `sm:bottom-1 sm:w-[min(28vw,100px)] md:w-[min(22vw,115px)] lg:w-[min(20vw,130px)] ` +
  `xl:top-0 xl:bottom-0 xl:h-svh xl:items-center xl:justify-start xl:w-[min(25vw,277px)] xl:left-0 xl:translate-x-0 xl:pl-2 ` +
  `2xl:w-[min(30vw,352px)]`;

const groomColumn =
  `${columnBase} bottom-0 right-0 left-auto items-end w-[min(26vw,84px)] ` +
  `sm:bottom-1 sm:w-[min(28vw,100px)] md:w-[min(22vw,115px)] lg:w-[min(20vw,130px)] ` +
  `xl:top-0 xl:bottom-0 xl:h-svh xl:items-center xl:justify-end xl:w-[min(25vw,277px)] xl:right-0 xl:left-auto xl:translate-x-0 xl:pr-2 ` +
  `2xl:w-[min(30vw,352px)]`;

export function NinjaCoupleHero() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <motion.div
        className={brideColumn}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/images/ninja-bride.webp"
            alt={`${weddingConfig.brideName} — невеста в стиле Naruto, Коноха`}
            width={720}
            height={971}
            sizes="(max-width: 1024px) 130px, 277px"
            className={sideImg}
            priority
          />
        </motion.div>
      </motion.div>

      <motion.div
        className={groomColumn}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.25 }}
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -6, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        >
          <Image
            src="/images/ninja-groom.webp"
            alt={`${weddingConfig.groomName} — жених в стиле Naruto, Коноха`}
            width={720}
            height={897}
            sizes="(max-width: 1024px) 130px, 277px"
            className={sideImg}
            priority
          />
        </motion.div>
      </motion.div>
    </>
  );
}
