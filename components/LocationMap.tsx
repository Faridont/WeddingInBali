"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NinjaScroll } from "@/components/ui/naruto";

export function LocationMap() {
  const { locationSection, location, locationNote } = weddingConfig;

  return (
    <section id="location" className="section-padding scroll-mt-8 bg-ninja-black">
      <motion.div
        className="container-narrow"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading
          title={locationSection.title}
          subtitle={locationSection.subtitle}
        />

        <NinjaScroll className="mb-4">
          <p className="text-center font-medium text-ninja-ink">{location}</p>
          <p className="mt-2 text-center text-sm text-ninja-ink/70">
            {locationNote}
          </p>
        </NinjaScroll>

        <div className="overflow-hidden rounded-lg border-[3px] border-ninja-orange/50 shadow-naruto">
          <iframe
            title={`Карта: ${location}`}
            src={locationSection.embedUrl}
            className="h-64 w-full border-0 md:h-96"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>

        <p className="mt-4 text-center">
          <a
            href={locationSection.mapsOpenUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-sm uppercase tracking-wide text-ninja-orange underline decoration-ninja-orange/50 underline-offset-4 hover:text-ninja-orange-dark"
          >
            {locationSection.mapsOpenLabel}
          </a>
        </p>
      </motion.div>
    </section>
  );
}
