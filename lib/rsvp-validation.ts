import {
  ATTENDANCE_OPTIONS,
  RELATIONSHIP_OPTIONS,
  type Attendance,
  type Relationship,
  type RsvpFormData,
} from "@/types/rsvp";

export type ValidationResult =
  | { success: true; data: RsvpFormData }
  | { success: false; errors: Record<string, string> };

function isRelationship(value: unknown): value is Relationship {
  return (
    typeof value === "string" &&
    RELATIONSHIP_OPTIONS.includes(value as Relationship)
  );
}

function isAttendance(value: unknown): value is Attendance {
  return (
    typeof value === "string" &&
    ATTENDANCE_OPTIONS.includes(value as Attendance)
  );
}

export function validateRsvp(body: unknown): ValidationResult {
  const errors: Record<string, string> = {};

  if (!body || typeof body !== "object") {
    return { success: false, errors: { _form: "Некорректные данные формы" } };
  }

  const raw = body as Record<string, unknown>;

  const fullName =
    typeof raw.fullName === "string" ? raw.fullName.trim() : "";
  if (!fullName) {
    errors.fullName = "Укажите ФИО";
  } else if (fullName.length < 2) {
    errors.fullName = "ФИО должно содержать минимум 2 символа";
  }

  const phone = typeof raw.phone === "string" ? raw.phone.trim() : "";
  const phoneDigits = phone.replace(/\D/g, "");
  if (!phone) {
    errors.phone = "Укажите номер телефона";
  } else if (phoneDigits.length < 10 || phoneDigits.length > 15) {
    errors.phone = "Введите корректный номер телефона";
  }

  const relationship = raw.relationship;
  if (!isRelationship(relationship)) {
    errors.relationship = "Выберите, кто вы для нас";
  }

  const attendance = raw.attendance;
  if (!isAttendance(attendance)) {
    errors.attendance = "Укажите, планируете ли вы приехать";
  }

  let guestCount = 1;
  if (raw.guestCount === undefined || raw.guestCount === "") {
    errors.guestCount = "Укажите количество гостей";
  } else {
    const parsed = Number(raw.guestCount);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > 10) {
      errors.guestCount = "Количество гостей: от 1 до 10";
    } else {
      guestCount = parsed;
    }
  }

  const companions =
    typeof raw.companions === "string" ? raw.companions.trim() : undefined;
  const comment =
    typeof raw.comment === "string" ? raw.comment.trim() : undefined;

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  return {
    success: true,
    data: {
      fullName,
      phone,
      relationship: relationship as Relationship,
      attendance: attendance as Attendance,
      companions: companions || undefined,
      guestCount,
      comment: comment || undefined,
    },
  };
}
