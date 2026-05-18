"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Kunai, NinjaScroll } from "@/components/ui/naruto";

export function VisaInfo() {
  const { visa } = weddingConfig;

  return (
    <section className="section-padding bg-scroll-texture">
      <motion.div
        className="container-narrow"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading
          title={visa.title}
          subtitle={visa.subtitle}
          variant="scroll"
        />

        <NinjaScroll className="mb-8">
          <p className="text-center font-display text-xs uppercase tracking-widest text-ninja-ink/60">
            Свиток: стоимость e-VOA
          </p>
          <p className="mt-2 text-center font-display text-3xl text-ninja-orange md:text-4xl">
            {visa.feeIdr}
          </p>
          <p className="mt-1 text-center text-sm text-ninja-ink/70">{visa.feeApprox}</p>
        </NinjaScroll>

        <ul className="space-y-4">
          {visa.points.map((point, index) => (
            <motion.li
              key={point.title}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <NinjaScroll compact>
                <div className="flex gap-4">
                  <Kunai spin className="shrink-0 text-ninja-orange" size={28} />
                  <div>
                    <h3 className="font-display uppercase tracking-wide text-ninja-ink">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ninja-ink/75">
                      {point.text}
                    </p>
                  </div>
                </div>
              </NinjaScroll>
            </motion.li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-ninja-ink/70">
          {visa.disclaimer}{" "}
          <a
            href={visa.officialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-ninja-orange underline decoration-ninja-orange/50 underline-offset-2 hover:text-ninja-orange-dark"
          >
            {visa.officialLinkLabel}
          </a>
        </p>
      </motion.div>
    </section>
  );
}
