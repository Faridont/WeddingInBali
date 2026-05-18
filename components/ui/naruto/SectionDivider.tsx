import { Kunai } from "./Kunai";
import { Shuriken } from "./Shuriken";

export function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`mx-auto mt-6 flex max-w-md items-center justify-center gap-3 ${className}`}
      aria-hidden="true"
    >
      <Kunai spin className="text-ninja-orange/70" size={28} flip />
      <div className="h-0.5 flex-1 bg-gradient-to-r from-ninja-orange/20 via-ninja-orange to-ninja-orange/20" />
      <Shuriken spin className="text-ninja-orange" size={20} />
      <div className="h-0.5 flex-1 bg-gradient-to-r from-ninja-orange/20 via-ninja-orange to-ninja-orange/20" />
      <Kunai spin className="text-ninja-orange/70" size={28} />
    </div>
  );
}
