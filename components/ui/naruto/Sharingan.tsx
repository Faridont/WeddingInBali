"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Референс-патч «три томоэ» — картинка 1:1 с макетом. */
export function Sharingan({
  className = "",
  size = 40,
  animate = true,
  spinDuration = 16,
}: {
  className?: string;
  size?: number;
  animate?: boolean;
  /** Seconds per full rotation when animate is true */
  spinDuration?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
      animate={
        animate && !reduceMotion ? { rotate: 360 } : undefined
      }
      transition={
        animate && !reduceMotion
          ? { duration: spinDuration, repeat: Infinity, ease: "linear" }
          : undefined
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/sharingan-icon.webp"
        alt=""
        width={size}
        height={size}
        className="h-full w-full object-contain"
        draggable={false}
      />
    </motion.div>
  );
}
