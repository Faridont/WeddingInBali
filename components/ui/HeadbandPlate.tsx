import type { ReactNode } from "react";

/** Металлическая «пластина» как на повязке ниндзя. */
export function HeadbandPlate({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative inline-block ${className}`}>
      <div
        className="absolute -inset-1 rounded-md bg-gradient-to-b from-zinc-300 via-zinc-100 to-zinc-400 shadow-naruto"
        aria-hidden="true"
      />
      <div className="relative rounded-md border-[3px] border-ninja-black bg-gradient-to-b from-zinc-200 to-zinc-300 px-1 py-1">
        <div className="rounded border-2 border-ninja-black/80 bg-scroll-texture px-5 py-2 sm:px-8 sm:py-3">
          {children}
        </div>
        <Rivet className="left-1.5 top-1.5" />
        <Rivet className="right-1.5 top-1.5" />
        <Rivet className="left-1.5 bottom-1.5" />
        <Rivet className="right-1.5 bottom-1.5" />
      </div>
    </div>
  );
}

function Rivet({ className }: { className: string }) {
  return (
    <span
      className={`absolute h-2 w-2 rounded-full border border-ninja-black/50 bg-zinc-400 shadow-inner ${className}`}
      aria-hidden="true"
    />
  );
}
