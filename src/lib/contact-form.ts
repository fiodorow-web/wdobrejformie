/**
 * Client-safe half of the contact form's contract.
 *
 * Kept separate from validation.ts on purpose: the form is a client component,
 * and importing anything from the module that holds the Zod schema pulls the
 * whole of Zod into the browser bundle (~290 KB raw). Only the server needs the
 * schema; the client needs these names and types.
 */

/** Subjects offered in the contact form's select. */
export const contactSubjects = [
  'Konsultacja dietetyczna',
  'Plan żywieniowy',
  'Analiza składu ciała',
  'Modelowanie sylwetki',
  'on-line',
  'Inne',
] as const;

export type ContactSubject = (typeof contactSubjects)[number];

export type ContactField =
  | 'name'
  | 'email'
  | 'phone'
  | 'subject'
  | 'message'
  | 'consent'
  | 'company'
  | 'captcha';

export type ContactState = {
  status: 'idle' | 'success' | 'error';
  message?: string;
  /** Field-level messages, keyed by input name. */
  errors?: Partial<Record<ContactField, string>>;
};
