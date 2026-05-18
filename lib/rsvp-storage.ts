import { google } from "googleapis";
import {
  ATTENDANCE_LABELS,
  RELATIONSHIP_LABELS,
  type RsvpFormData,
} from "@/types/rsvp";

export class RsvpStorageNotConfiguredError extends Error {
  constructor() {
    super("RSVP storage is not configured");
    this.name = "RsvpStorageNotConfiguredError";
  }
}

function isGoogleSheetsConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEETS_SPREADSHEET_ID &&
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
      process.env.GOOGLE_PRIVATE_KEY,
  );
}

function logRsvpToConsole(data: RsvpFormData, timestamp: string): void {
  console.log(
    "[RSVP]",
    JSON.stringify(
      {
        receivedAt: timestamp,
        ...data,
      },
      null,
      2,
    ),
  );
}

async function appendToGoogleSheet(
  data: RsvpFormData,
  timestamp: string,
): Promise<void> {
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!spreadsheetId || !clientEmail || !privateKey) {
    throw new RsvpStorageNotConfiguredError();
  }

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: "RSVP!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          timestamp,
          data.fullName,
          data.phone,
          RELATIONSHIP_LABELS[data.relationship],
          ATTENDANCE_LABELS[data.attendance],
          data.companions ?? "",
          data.guestCount,
          data.comment ?? "",
        ],
      ],
    },
  });
}

export async function saveRsvp(data: RsvpFormData): Promise<void> {
  const timestamp = new Date().toISOString();

  if (isGoogleSheetsConfigured()) {
    await appendToGoogleSheet(data, timestamp);
    return;
  }

  if (process.env.NODE_ENV === "development") {
    console.warn(
      "[RSVP] Google Sheets env not set — logging to console (dev only).",
    );
    logRsvpToConsole(data, timestamp);
    return;
  }

  throw new RsvpStorageNotConfiguredError();
}
