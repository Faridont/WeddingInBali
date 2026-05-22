"use client";

import { motion, useReducedMotion } from "framer-motion";

/** Голубой расенган — WebP с прозрачным фоном. */
export function Rasengan({
  className = "",
  size = 48,
  animate = true,
  duration = 6,
}: {
  className?: string;
  size?: number;
  animate?: boolean;
  duration?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={`inline-flex shrink-0 items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
      animate={animate && !reduceMotion ? { rotate: 360 } : undefined}
      transition={
        animate && !reduceMotion
          ? { duration, repeat: Infinity, ease: "linear" }
          : undefined
      }
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/rasengan-icon.webp"
        alt=""
        width={size}
        height={size}
        className="h-full w-full object-contain"
        style={{
          filter: "drop-shadow(0 0 12px rgba(120,200,255,0.55))",
        }}
        draggable={false}
      />
    </motion.div>
  );
}
