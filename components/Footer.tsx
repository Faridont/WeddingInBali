import { weddingConfig } from "@/lib/wedding-config";
import { LeafEmblem } from "@/components/ui/LeafEmblem";
import { NarutoSpiral } from "@/components/ui/NarutoSpiral";
import { Kunai, Sharingan } from "@/components/ui/naruto";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t-4 border-ninja-orange bg-ninja-black py-12">
      <NarutoSpiral
        className="pointer-events-none absolute -left-10 top-1/2 -translate-y-1/2 text-ninja-orange/25"
        size={140}
      />
      <NarutoSpiral
        className="pointer-events-none absolute -right-10 top-1/2 -translate-y-1/2 text-ninja-orange/25"
        size={140}
      />
      <div className="container-narrow relative text-center">
        <div className="mb-3 flex items-center justify-center gap-4">
          <Kunai spin className="text-ninja-orange/70" size={28} />
          <LeafEmblem className="text-ninja-orange" size={48} />
          <Kunai spin className="text-ninja-orange/70" size={28} flip />
        </div>
        <Sharingan
          className="mx-auto mb-3 opacity-80"
          size={36}
          animate={false}
        />
        <p className="font-display text-2xl uppercase text-ninja-orange md:text-3xl">
          {weddingConfig.brideName} & {weddingConfig.groomName}
        </p>
        <p className="mt-2 text-sm text-scroll/70">{weddingConfig.date}</p>
        <p className="mt-1 font-display text-xs uppercase tracking-widest text-gold">
          {weddingConfig.footer.tagline}
        </p>
        <p className="mt-8 text-xs text-scroll/40">
          © {year} Wedding in Bali
        </p>
      </div>
    </footer>
  );
}
