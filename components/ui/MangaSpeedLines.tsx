/** Радиальные «speed lines» как в манге/аниме. */
export function MangaSpeedLines({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <div
        className="absolute left-1/2 top-1/2 h-[200vmax] w-[200vmax] -translate-x-1/2 -translate-y-1/2 opacity-[0.12]"
        style={{
          background: `repeating-conic-gradient(
            from 0deg,
            transparent 0deg 8deg,
            rgba(255, 107, 0, 0.9) 8deg 9deg
          )`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at center, transparent 0%, rgba(10,10,15,0.25) 50%, rgba(10,10,15,0.85) 100%)",
        }}
      />
    </div>
  );
}
