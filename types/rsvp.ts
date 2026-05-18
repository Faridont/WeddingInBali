export type Relationship =
  | "groom_family"
  | "bride_family"
  | "groom_friend"
  | "bride_friend"
  | "couple_friend"
  | "colleague"
  | "other";

export type Attendance = "yes" | "no";

export interface RsvpFormData {
  fullName: string;
  phone: string;
  relationship: Relationship;
  attendance: Attendance;
  companions?: string;
  guestCount: number;
  comment?: string;
}

export interface RsvpApiSuccess {
  ok: true;
}

export interface RsvpApiError {
  ok: false;
  errors?: Record<string, string>;
  message?: string;
}

export type RsvpApiResponse = RsvpApiSuccess | RsvpApiError;

export const RELATIONSHIP_OPTIONS: Relationship[] = [
  "groom_family",
  "bride_family",
  "groom_friend",
  "bride_friend",
  "couple_friend",
  "colleague",
  "other",
];

export const RELATIONSHIP_LABELS: Record<Relationship, string> = {
  groom_family: "Семья жениха",
  bride_family: "Семья невесты",
  groom_friend: "Друг жениха",
  bride_friend: "Подруга невесты",
  couple_friend: "Друг пары",
  colleague: "Коллега",
  other: "Другое",
};

export const ATTENDANCE_OPTIONS: Attendance[] = ["yes", "no"];

export const ATTENDANCE_LABELS: Record<Attendance, string> = {
  yes: "Да, точно смогу",
  no: "Не смогу",
};

export const EMPTY_RSVP_FORM: RsvpFormData = {
  fullName: "",
  phone: "",
  relationship: "couple_friend",
  attendance: "yes",
  companions: "",
  guestCount: 1,
  comment: "",
};
