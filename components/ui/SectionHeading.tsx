import { weddingConfig } from "@/lib/wedding-config";
import { LeafEmblem } from "@/components/ui/LeafEmblem";
import { MissionSeal, SectionDivider } from "@/components/ui/naruto";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  variant?: "dark" | "scroll";
}

export function SectionHeading({
  title,
  subtitle,
  className = "",
  variant = "dark",
}: SectionHeadingProps) {
  const isScroll = variant === "scroll";

  return (
    <header className={`mb-10 text-center md:mb-14 ${className}`}>
      <p
        className={`mb-2 flex items-center justify-center gap-2 font-display text-xs uppercase tracking-[0.35em] ${
          isScroll ? "text-ninja-orange-dark" : "text-gold"
        }`}
      >
        <MissionSeal rank="S" className="!h-8 !w-8 !text-sm" />
        <span>{weddingConfig.theme.missionLabel}</span>
      </p>
      <h2
        className={`flex items-center justify-center gap-3 font-display text-3xl uppercase md:text-4xl lg:text-5xl ${
          isScroll ? "text-ninja-orange-dark" : "naruto-title"
        }`}
        style={
          isScroll
            ? {
                textShadow: "2px 2px 0 rgba(0,0,0,0.15)",
              }
            : undefined
        }
      >
        <LeafEmblem
          className={isScroll ? "text-ninja-orange-dark" : "text-ninja-orange"}
          size={36}
        />
        <span>{title}</span>
        <LeafEmblem
          className={isScroll ? "text-ninja-orange-dark" : "text-ninja-orange"}
          size={36}
        />
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed md:text-lg ${
            isScroll ? "text-ninja-ink/80" : "text-scroll/80"
          }`}
        >
          {subtitle}
        </p>
      )}
      <SectionDivider />
    </header>
  );
}
