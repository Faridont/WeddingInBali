"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";
import { Kunai } from "@/components/ui/naruto";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="divide-y divide-ninja-orange/20 overflow-hidden rounded-lg border-[3px] border-ninja-orange/40 bg-ninja-navy/90"
        role="list"
      >
        {weddingConfig.faq.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} role="listitem">
              <button
                type="button"
                id={`faq-${item.id}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => toggle(item.id)}
                className="flex w-full items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-ninja-orange/10 sm:px-6 sm:py-5"
              >
                <Kunai className="shrink-0 text-ninja-orange/80" size={22} />
                <span className="flex-1 font-display text-sm uppercase tracking-wide text-scroll">
                  {item.question}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 text-ninja-orange"
                  aria-hidden="true"
                >
                  <Kunai size={20} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="border-t border-ninja-orange/20 px-5 pb-5 pt-2 text-sm leading-relaxed text-scroll/80 sm:px-6 sm:pb-6">
                      {item.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

