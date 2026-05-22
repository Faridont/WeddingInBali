import { NextResponse } from "next/server";
import { appendRSVP } from "@/lib/google-sheets";
import { validateRsvp } from "@/lib/rsvp-validation";
import { RsvpStorageNotConfiguredError } from "@/lib/rsvp-storage";
import type { RsvpApiError, RsvpApiSuccess } from "@/types/rsvp";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = validateRsvp(body);

    if (!result.success) {
      const errorResponse: RsvpApiError = {
        ok: false,
        errors: result.errors,
      };
      return NextResponse.json(errorResponse, { status: 400 });
    }

    await appendRSVP(result.data);

    const successResponse: RsvpApiSuccess = { ok: true };
    return NextResponse.json(successResponse);
  } catch (error) {
    if (error instanceof RsvpStorageNotConfiguredError) {
      console.error("[RSVP] Storage not configured:", error.message);
      const errorResponse: RsvpApiError = {
        ok: false,
        message:
          "Форма временно недоступна. Пожалуйста, свяжитесь с организаторами другим способом.",
      };
      return NextResponse.json(errorResponse, { status: 503 });
    }

    console.error("[RSVP] Failed to save:", error);
    const errorResponse: RsvpApiError = {
      ok: false,
      message: "Не удалось сохранить заявку. Попробуйте ещё раз позже.",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
