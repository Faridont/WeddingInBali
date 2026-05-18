"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { NinjaScroll } from "@/components/ui/naruto";

export function About() {
  return (
    <section className="section-padding bg-scroll-texture">
      <motion.div
        className="container-narrow"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading
          title={weddingConfig.intro.title}
          variant="scroll"
        />
        <NinjaScroll>
          <p className="text-center text-base leading-relaxed text-ninja-ink/90 md:text-lg">
            {weddingConfig.intro.text}
          </p>
          <p className="mt-6 text-center text-sm leading-relaxed text-ninja-ink/70 md:text-base">
            {weddingConfig.intro.note}
          </p>
        </NinjaScroll>
      </motion.div>
    </section>
  );
}
