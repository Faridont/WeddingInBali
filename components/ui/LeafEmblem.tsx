/** Стилизованный символ «лист» в духе аниме-ниндзя (не официальный логотип). */
export function LeafEmblem({
  className = "",
  size = 56,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M32 4 C18 12 8 26 8 40 C8 52 18 60 32 60 C46 60 56 52 56 40 C56 26 46 12 32 4 Z"
        fill="currentColor"
        opacity="0.2"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M32 22 C32 22 42 28 44 38 C46 48 38 52 32 48 C26 44 20 40 22 30 C24 24 32 22 32 22 Z"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M32 26 C36 30 40 36 38 42 C36 48 32 50 28 46 C24 42 26 34 32 26 Z"
        fill="currentColor"
      />
      <circle cx="32" cy="36" r="3" fill="#0a0a0f" opacity="0.35" />
    </svg>
  );
}
