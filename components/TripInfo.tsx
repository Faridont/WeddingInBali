"use client";

import { motion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Kunai, NinjaScroll } from "@/components/ui/naruto";

const linkClass =
  "font-medium text-ninja-orange underline decoration-ninja-orange/50 underline-offset-2 hover:text-ninja-orange-dark";

export function TripInfo() {
  const { trip } = weddingConfig;
  const { agency } = trip;

  return (
    <section id="trip" className="section-padding scroll-mt-8 bg-ninja-gradient">
      <motion.div
        className="container-narrow"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
      >
        <SectionHeading title={trip.title} subtitle={trip.subtitle} />

        <NinjaScroll className="mb-8">
          <p className="text-center font-display text-xs uppercase tracking-widest text-ninja-ink/60">
            Даты поездки
          </p>
          <p className="mt-2 text-center font-display text-3xl text-ninja-orange md:text-4xl">
            {trip.datesLabel}
          </p>
          <p className="mt-2 text-center text-sm leading-relaxed text-ninja-ink/75 md:text-base">
            {trip.datesNote}
          </p>
        </NinjaScroll>

        <NinjaScroll>
          <p className="text-center text-sm leading-relaxed text-ninja-ink/80 md:text-base">
            {agency.intro}
          </p>
          <h3 className="mt-6 text-center font-display text-xl uppercase text-ninja-orange md:text-2xl">
            {agency.name}
          </h3>

          <ul className="mx-auto mt-6 max-w-md space-y-4">
            <ContactRow
              label={`${agency.managerLabel}: ${agency.managerName}`}
              href={agency.whatsappUrl}
              linkText={`WhatsApp ${agency.whatsapp}`}
            />
            <ContactRow
              label="Email"
              href={`mailto:${agency.email}`}
              linkText={agency.email}
            />
            <ContactRow
              label="Instagram"
              href={agency.instagramUrl}
              linkText={agency.instagram}
              external
            />
            <ContactRow
              label="Офис"
              href={agency.mapsUrl}
              linkText={agency.address}
              external
            />
          </ul>
        </NinjaScroll>
      </motion.div>
    </section>
  );
}

function ContactRow({
  label,
  href,
  linkText,
  external = false,
}: {
  label: string;
  href: string;
  linkText: string;
  external?: boolean;
}) {
  return (
    <li>
      <div className="flex gap-3">
        <Kunai spin className="mt-0.5 shrink-0 text-ninja-orange" size={22} />
        <div>
          <p className="text-xs font-display uppercase tracking-wide text-ninja-ink/60">
            {label}
          </p>
          <a
            href={href}
            className={`mt-1 inline-block text-sm ${linkClass}`}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
          >
            {linkText}
          </a>
        </div>
      </div>
    </li>
  );
}
