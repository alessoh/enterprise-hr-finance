/**
 * Contact form contract. Shared by the API route (server) and the form (client)
 * so the two never drift: the same schema validates in the browser and on POST.
 */
import { z } from "zod";

export const contactIntents = ["demo", "sales", "support", "partner"] as const;
export type ContactIntent = (typeof contactIntents)[number];

export const intentLabels: Record<ContactIntent, string> = {
  demo: "Book a demo",
  sales: "Talk to sales",
  support: "Get support",
  partner: "Partner with Meridian",
};

export function isContactIntent(value: unknown): value is ContactIntent {
  return typeof value === "string" && (contactIntents as readonly string[]).includes(value);
}

export const companySizes = ["1-199", "200-999", "1000-4999", "5000-19999", "20000+"] as const;
export type CompanySize = (typeof companySizes)[number];

export const sizeLabels: Record<CompanySize, string> = {
  "1-199": "1–199 employees",
  "200-999": "200–999 employees",
  "1000-4999": "1,000–4,999 employees",
  "5000-19999": "5,000–19,999 employees",
  "20000+": "20,000+ employees",
};

export const MESSAGE_MAX = 2000;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().min(1, "Enter your work email.").pipe(z.email("Enter a valid work email.")),
  company: z.string().trim().min(2, "Enter your company name."),
  size: z.enum(companySizes, { error: "Choose a company size." }),
  intent: z.enum(contactIntents, { error: "Choose a topic." }),
  message: z.string().trim().max(MESSAGE_MAX, `Keep the message under ${MESSAGE_MAX.toLocaleString("en-US")} characters.`),
  /** Honeypot. Hidden from people; anything in it fails validation. */
  website: z.string().max(0, "Leave this field empty.").optional(),
});

export type ContactInput = z.input<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

/** First message per field, keyed by the top-level path segment. */
export function fieldErrors(error: { issues: ReadonlyArray<{ path: ReadonlyArray<PropertyKey>; message: string }> }): ContactFieldErrors {
  const out: ContactFieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && key in contactSchema.shape && !(key in out)) {
      out[key as ContactField] = issue.message;
    }
  }
  return out;
}
