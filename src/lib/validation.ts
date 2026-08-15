import { z } from 'zod';
import { contactSubjects } from './contact-form';

/**
 * Server-side validation schema.
 *
 * Import this only from server code. The client-facing names and types live in
 * contact-form.ts so the browser never has to download Zod.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Podaj imię i nazwisko.').max(120, 'To pole jest za długie.'),
  email: z.string().trim().email('Podaj poprawny adres e-mail.'),
  phone: z.string().trim().max(32, 'To pole jest za długie.').optional().or(z.literal('')),
  subject: z.enum(contactSubjects, { message: 'Wybierz temat wiadomości.' }),
  message: z
    .string()
    .trim()
    .min(10, 'Napisz kilka słów — minimum 10 znaków.')
    .max(4000, 'Wiadomość jest za długa.'),
  consent: z.literal('on', { message: 'Bez zgody nie możemy odpowiedzieć na wiadomość.' }),
  /**
   * Honeypot. Real people never see this field, so anything in it is a bot.
   * Named plausibly because scrapers skip fields called "honeypot".
   */
  company: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
