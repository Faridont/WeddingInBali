/** Декоративная спираль Узумаки в духе Naruto (не официальный логотип). */
export function NarutoSpiral({
  className = "",
  size = 120,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        r="46"
        stroke="currentColor"
        strokeWidth="3"
        opacity="0.35"
      />
      <path
        d="M50 50
           m0 -28
           a28 28 0 1 1 0 56
           a22 22 0 1 0 0 -44
           a16 16 0 1 1 0 32
           a10 10 0 1 0 0 -20
           a6 6 0 1 1 0 12
           z"
        fill="currentColor"
        opacity="0.5"
      />
      <circle cx="50" cy="50" r="4" fill="currentColor" opacity="0.8" />
    </svg>
  );
}

export function CloudPattern({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 opacity-[0.08] ${className}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cellipse cx='40' cy='40' rx='35' ry='18' fill='%23ff6b00'/%3E%3Cellipse cx='75' cy='45' rx='28' ry='14' fill='%23ff6b00'/%3E%3C/svg%3E")`,
        backgroundSize: "180px 120px",
      }}
      aria-hidden="true"
    />
  );
}
