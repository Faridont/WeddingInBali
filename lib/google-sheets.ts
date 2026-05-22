import { google } from "googleapis";
import type { RsvpFormData } from "@/types/rsvp";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function appendRSVP(data: RsvpFormData) {
  const sheets = google.sheets({
    version: "v4",
    auth,
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
    range: "RSVP!A:H",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        new Date().toISOString(),
        data.fullName || "",
        data.phone || "",
        data.relationship || "",
        data.attendance || "",
        data.companions || "",
        data.guestCount || "",
        data.comment || "",
      ]],
    },
  });
}