/** Печать миссии ранга S — для главного события (свадьба). */
export function MissionSeal({
  rank = "S",
  className = "",
}: {
  rank?: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-[3px] border-ninja-black bg-ninja-orange font-display text-xl text-ninja-black shadow-naruto ${className}`}
      title={`Миссия ранга ${rank}`}
      aria-label={`Миссия ранга ${rank}`}
    >
      {rank}
    </span>
  );
}
