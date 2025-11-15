import { NextResponse } from "next/server";
import { google } from "googleapis";

const SCOPES = ["https://www.googleapis.com/auth/spreadsheets"];
const SPREADSHEET_ID = process.env.GOOGLE_SHEETS_ID; // also moved to env

// -------------------------------
// Types
// -------------------------------
interface LeadData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  message: string;
}

// -------------------------------
// Sanitizers
// -------------------------------
const sanitizeString = (value: unknown, maxLength = 200): string => {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
};

const isValidEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Type guard
function isLeadData(obj: unknown): obj is LeadData {
  if (typeof obj !== "object" || obj === null) return false;
  const d = obj as Record<string, unknown>;
  return (
    typeof d.name === "string" &&
    typeof d.email === "string" &&
    typeof d.message === "string"
  );
}

// -------------------------------
// API ROUTE
// -------------------------------
export async function POST(req: Request) {
  //
  // 1 — Parse JSON safely
  //
  let rawData: unknown;
  try {
    rawData = await req.json();
  } catch (err) {
    return NextResponse.json({ success: false, error: "Invalid JSON" }, { status: 400 });
  }

  //
  // 2 — Validate structure
  //
  if (!isLeadData(rawData)) {
    return NextResponse.json({ success: false, error: "Invalid data structure" }, { status: 400 });
  }

  //
  // 3 — Sanitize input
  //
  const data: LeadData = {
    name: sanitizeString(rawData.name, 50),
    email: sanitizeString(rawData.email, 100),
    company: sanitizeString(rawData.company, 100),
    phone: sanitizeString(rawData.phone, 20),
    message: sanitizeString(rawData.message, 500),
  };

  //
  // 4 — Email validation
  //
  if (!isValidEmail(data.email)) {
    return NextResponse.json(
      { success: false, error: "Invalid email format" },
      { status: 400 }
    );
  }

  //
  // 5 — Load service account from Base64 in env
  //
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    return NextResponse.json(
      { success: false, error: "Missing GOOGLE_SERVICE_ACCOUNT_KEY" },
      { status: 500 }
    );
  }

  const serviceAccount = JSON.parse(
    Buffer.from(process.env.GOOGLE_SERVICE_ACCOUNT_KEY, "base64").toString("utf8")
  );

  //
  // 6 — Authenticate + Write to Sheets
  //
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: serviceAccount,
      scopes: SCOPES,
    });

    const sheets = google.sheets({ version: "v4", auth });

    const values = [
      [
        data.name,
        data.email,
        data.company || "",
        data.phone || "",
        data.message,
        new Date().toISOString(),
      ],
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: "Leads!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error("Sheets API error:", err);
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}