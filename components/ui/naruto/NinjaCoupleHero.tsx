"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";

const columnBase = "pointer-events-none fixed z-[25] flex justify-center";

/** Телефон + планшет: нижние углы. xl+: по центру высоты сбоку */
const sideImg =
  "block h-auto w-full max-w-full object-contain drop-shadow-[0_0_28px_rgba(255,107,0,0.35)] " +
  "max-h-[18svh] sm:max-h-[22svh] md:max-h-[24svh] lg:max-h-[26svh] " +
  "xl:max-h-[60vh] 2xl:max-h-[min(74vh,710px)]";

const brideColumn =
  `${columnBase} bottom-0 left-0 items-end w-[min(26vw,84px)] ` +
  `sm:bottom-1 sm:w-[min(28vw,100px)] md:w-[min(22vw,115px)] lg:w-[min(20vw,130px)] ` +
  `xl:top-0 xl:bottom-0 xl:h-svh xl:items-center xl:w-[min(19vw,213px)] xl:left-[10%] xl:-translate-x-1/2 ` +
  `2xl:w-[min(23vw,271px)]`;

const groomColumn =
  `${columnBase} bottom-0 right-0 left-auto items-end w-[min(26vw,84px)] ` +
  `sm:bottom-1 sm:w-[min(28vw,100px)] md:w-[min(22vw,115px)] lg:w-[min(20vw,130px)] ` +
  `xl:top-0 xl:right-auto xl:bottom-0 xl:h-svh xl:items-center xl:w-[min(19vw,213px)] xl:left-[77%] xl:-translate-x-1/2 ` +
  `2xl:w-[min(23vw,271px)]`;

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
            src="/images/ninja-bride.png"
            alt={`${weddingConfig.brideName} — невеста в стиле Naruto, Коноха`}
            width={872}
            height={1177}
            unoptimized
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
            src="/images/ninja-groom.png"
            alt={`${weddingConfig.groomName} — жених в стиле Naruto, Коноха`}
            width={861}
            height={1074}
            unoptimized
            className={sideImg}
            priority
          />
        </motion.div>
      </motion.div>
    </>
  );
}
