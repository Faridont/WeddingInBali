"use client";

import { motion, useReducedMotion } from "framer-motion";

const SHURIKEN_PATH =
  "M256 24 L296 180 C285 199 292 217 312 224 L488 256 L312 288 C292 295 285 313 296 332 L256 488 L216 332 C227 313 220 295 200 288 L24 256 L200 224 C220 217 227 199 216 180 Z M256 226 A30 30 0 1 0 256 286 A30 30 0 1 0 256 226 Z";

/** Четырёхконечный сюрикен — `public/images/four_point_shuriken.svg`. */
export function FumaShurikenIcon({
  className = "",
  size = 32,
  spin = false,
  flip = false,
}: {
  className?: string;
  size?: number;
  spin?: boolean;
  flip?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const shouldSpin = spin && !reduceMotion;

  return (
    <motion.div
      className="inline-flex shrink-0 items-center justify-center"
      style={{
        width: size,
        height: size,
        scaleX: flip ? -1 : 1,
      }}
      aria-hidden="true"
      animate={shouldSpin ? { rotate: 360 } : undefined}
      transition={
        shouldSpin
          ? { duration: 7, repeat: Infinity, ease: "linear" }
          : undefined
      }
    >
      <svg
        viewBox="0 0 512 512"
        width={size}
        height={size}
        className={className}
        fill="currentColor"
        aria-hidden="true"
      >
        <path fillRule="evenodd" d={SHURIKEN_PATH} />
      </svg>
    </motion.div>
  );
}
