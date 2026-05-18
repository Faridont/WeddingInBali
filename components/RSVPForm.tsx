"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { weddingConfig } from "@/lib/wedding-config";
import { validateRsvp } from "@/lib/rsvp-validation";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Kunai, NinjaScroll } from "@/components/ui/naruto";
import {
  ATTENDANCE_LABELS,
  ATTENDANCE_OPTIONS,
  EMPTY_RSVP_FORM,
  RELATIONSHIP_LABELS,
  RELATIONSHIP_OPTIONS,
  type RsvpApiResponse,
  type RsvpFormData,
} from "@/types/rsvp";

type FormStatus = "idle" | "loading" | "success" | "error";

export function RSVPForm() {
  const [form, setForm] = useState<RsvpFormData>(EMPTY_RSVP_FORM);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [formError, setFormError] = useState<string | null>(null);

  const updateField = <K extends keyof RsvpFormData>(
    key: K,
    value: RsvpFormData[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[key];
        return next;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const validation = validateRsvp(form);
    if (!validation.success) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setStatus("loading");

    try {
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validation.data),
      });

      const data = (await res.json()) as RsvpApiResponse;

      if (!res.ok || !data.ok) {
        if (!data.ok && data.errors) {
          setErrors(data.errors);
        }
        setFormError(
          !data.ok && data.message
            ? data.message
            : "Не удалось отправить форму. Попробуйте ещё раз.",
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setFormError("Проблема с сетью. Проверьте подключение и попробуйте снова.");
      setStatus("error");
    }
  };

  const inputClass = (field: string) =>
    `form-input ${errors[field] ? "form-input-error" : ""}`;

  return (
    <section id="rsvp" className="section-padding scroll-mt-8 bg-scroll-texture">
      <div className="container-narrow">
        <SectionHeading
          title={weddingConfig.rsvp.title}
          subtitle={weddingConfig.rsvp.subtitle}
          variant="scroll"
        />

        <AnimatePresence mode="wait">
          {status === "success" ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <NinjaScroll>
                <Kunai spin className="mx-auto mb-4 text-ninja-orange" size={36} />
                <p className="font-display text-2xl uppercase text-ninja-orange md:text-3xl">
                  {weddingConfig.rsvp.success}
                </p>
              </NinjaScroll>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6"
              initial={{ opacity: 1 }}
            >
              <NinjaScroll>
              <div className="space-y-6">
              {formError && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {formError}
                </p>
              )}

              <Field label="ФИО" error={errors.fullName} required>
                <input
                  type="text"
                  name="fullName"
                  value={form.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className={inputClass("fullName")}
                  placeholder="Узумаки Наруто Минатоұлы"
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                  disabled={status === "loading"}
                />
              </Field>

              <Field label="Номер телефона" error={errors.phone} required>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className={inputClass("phone")}
                  placeholder="+7 700 123 45 67"
                  autoComplete="tel"
                  inputMode="tel"
                  aria-invalid={!!errors.phone}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  disabled={status === "loading"}
                />
              </Field>

              <Field label="Кто вы для нас" error={errors.relationship} required>
                <select
                  name="relationship"
                  value={form.relationship}
                  onChange={(e) =>
                    updateField(
                      "relationship",
                      e.target.value as RsvpFormData["relationship"],
                    )
                  }
                  className={inputClass("relationship")}
                  aria-invalid={!!errors.relationship}
                  disabled={status === "loading"}
                >
                  {RELATIONSHIP_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {RELATIONSHIP_LABELS[opt]}
                    </option>
                  ))}
                </select>
              </Field>

              <Field
                label="Планируете приехать?"
                error={errors.attendance}
                required
              >
                <div className="space-y-2">
                  {ATTENDANCE_OPTIONS.map((opt) => (
                    <label
                      key={opt}
                      className="flex cursor-pointer items-center gap-3 rounded-md border-2 border-ninja-ink/20 bg-scroll/80 px-4 py-3 transition-colors has-[:checked]:border-ninja-orange has-[:checked]:bg-ninja-orange/15"
                    >
                      <input
                        type="radio"
                        name="attendance"
                        value={opt}
                        checked={form.attendance === opt}
                        onChange={() => updateField("attendance", opt)}
                        className="h-4 w-4 accent-ninja-orange"
                        disabled={status === "loading"}
                      />
                      <span className="text-sm">{ATTENDANCE_LABELS[opt]}</span>
                    </label>
                  ))}
                </div>
              </Field>

              <Field label="С кем приедете?" error={errors.companions}>
                <input
                  type="text"
                  name="companions"
                  value={form.companions ?? ""}
                  onChange={(e) => updateField("companions", e.target.value)}
                  className={inputClass("companions")}
                  placeholder="Один / с супругой / с ребенком / +1"
                  disabled={status === "loading"}
                />
              </Field>

              <Field
                label="Количество гостей (включая вас)"
                error={errors.guestCount}
                required
              >
                <input
                  type="number"
                  name="guestCount"
                  min={1}
                  max={10}
                  value={form.guestCount}
                  onChange={(e) =>
                    updateField("guestCount", parseInt(e.target.value, 10) || 1)
                  }
                  className={inputClass("guestCount")}
                  aria-invalid={!!errors.guestCount}
                  disabled={status === "loading"}
                />
              </Field>

              <Field label="Комментарий / пожелания" error={errors.comment}>
                <textarea
                  name="comment"
                  rows={4}
                  value={form.comment ?? ""}
                  onChange={(e) => updateField("comment", e.target.value)}
                  className={`${inputClass("comment")} resize-y`}
                  placeholder="Всё, что хотите нам сообщить"
                  disabled={status === "loading"}
                />
              </Field>

              <div className="flex justify-center pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  className="gap-2"
                  disabled={status === "loading"}
                >
                  <Kunai size={18} spin={false} className="text-ninja-black" />
                  {status === "loading"
                    ? weddingConfig.rsvp.submitting
                    : weddingConfig.rsvp.submit}
                </Button>
              </div>
              </div>
              </NinjaScroll>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  required,
  children,
}: {
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  const id = label.replace(/\s/g, "-").toLowerCase();
  return (
    <div>
      <label htmlFor={id} className="form-label">
        {label}
        {required && <span className="text-ninja-orange"> *</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
