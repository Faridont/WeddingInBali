"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FAQ } from "@/components/FAQ";
import { CloudPattern } from "@/components/ui/NarutoSpiral";
import { NarutoCorners, Shuriken } from "@/components/ui/naruto";

export function FaqSection() {
  return (
    <section className="section-padding relative overflow-hidden bg-ninja-gradient">
      <NarutoCorners />
      <CloudPattern />
      <Shuriken className="pointer-events-none absolute left-[8%] top-[15%] text-ninja-orange/25" size={40} />
      <Shuriken className="pointer-events-none absolute right-[10%] bottom-[20%] text-ninja-orange/20" size={32} />
      <motion.div
        className="container-wide relative z-10"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading
          title="Вопросы и ответы"
          subtitle="Полезная информация перед поездкой"
        />
        <FAQ />
      </motion.div>
    </section>
  );
}
