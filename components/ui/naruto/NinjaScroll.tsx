import type { ReactNode } from "react";

/** Свиток ниндзя с «палочками» и верёвкой — как в аниме. */
export function NinjaScroll({
  children,
  className = "",
  compact = false,
}: {
  children: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div className={`ninja-scroll relative ${className}`}>
      <div className="ninja-scroll-rod ninja-scroll-rod-left" aria-hidden="true" />
      <div className="ninja-scroll-rod ninja-scroll-rod-right" aria-hidden="true" />
      <div className="ninja-scroll-rope ninja-scroll-rope-top" aria-hidden="true" />
      <div className="ninja-scroll-rope ninja-scroll-rope-bottom" aria-hidden="true" />
      <div
        className={`ninja-scroll-paper text-ninja-ink ${
          compact ? "px-4 py-4 sm:px-5 sm:py-5" : "px-5 py-6 sm:px-8 sm:py-8"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
