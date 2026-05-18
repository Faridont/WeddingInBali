"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";
import { NinjaScroll, Shuriken } from "@/components/ui/naruto";

export function Accommodation() {
  return (
    <section className="section-padding relative overflow-hidden bg-ninja-gradient">
      <motion.div
        className="container-narrow relative z-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
      >
        <NinjaScroll>
          <Shuriken className="mx-auto mb-4 text-ninja-orange" size={36} />
          <h2 className="text-center font-display text-2xl uppercase text-ninja-orange md:text-3xl">
            Размещение гостей
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-center text-base leading-relaxed text-ninja-ink/85 md:text-lg">
            {weddingConfig.accommodation.text}
          </p>
        </NinjaScroll>
      </motion.div>
    </section>
  );
}

