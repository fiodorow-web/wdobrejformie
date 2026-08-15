'use server';

import { Resend } from 'resend';
import { contactSchema } from '@/lib/validation';
import type { ContactState } from '@/lib/contact-form';
import { site } from '@/content/site';

const TURNSTILE_VERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

async function verifyTurnstile(token: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // No secret configured (local dev, preview before keys land) — skip the check
  // rather than blocking every submission. Production sets the variable.
  if (!secret) return true;
  if (!token) return false;

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  });

  if (!response.ok) return false;
  const result = (await response.json()) as { success: boolean };
  return result.success;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export async function submitContact(
  _previous: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const parsed = contactSchema.safeParse({
    name: formData.get('name') ?? '',
    email: formData.get('email') ?? '',
    phone: formData.get('phone') ?? '',
    subject: formData.get('subject') ?? '',
    message: formData.get('message') ?? '',
    consent: formData.get('consent') ?? '',
    company: formData.get('company') ?? '',
  });

  if (!parsed.success) {
    const errors: ContactState['errors'] = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0];
      if (typeof field === 'string' && !(field in errors)) {
        Object.assign(errors, { [field]: issue.message });
      }
    }
    return { status: 'error', message: 'Popraw zaznaczone pola i wyślij ponownie.', errors };
  }

  // Honeypot filled → silently accept so the bot does not learn it was caught.
  if (parsed.data.company) {
    return { status: 'success', message: 'Dziękujemy, wiadomość została wysłana.' };
  }

  const captchaOk = await verifyTurnstile(formData.get('cf-turnstile-response') as string | null);
  if (!captchaOk) {
    return {
      status: 'error',
      message: 'Weryfikacja antyspamowa nie powiodła się. Odśwież stronę i spróbuj ponownie.',
      errors: { captcha: 'Nie udało się potwierdzić, że nie jesteś robotem.' },
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('submitContact: RESEND_API_KEY is not configured');
    return {
      status: 'error',
      message: `Nie udało się wysłać wiadomości. Zadzwoń do nas: ${site.phone}.`,
    };
  }

  const { name, email, phone, subject, message } = parsed.data;
  const isOnline = subject === 'on-line';

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Formularz <formularz@wdobrejformie.net>',
      to: site.email,
      replyTo: email,
      subject: `${isOnline ? '[ON-LINE] ' : ''}${subject} — ${name}`,
      html: `
        <h2>Nowa wiadomość z formularza</h2>
        <p><strong>Imię i nazwisko:</strong> ${escapeHtml(name)}</p>
        <p><strong>E-mail:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${escapeHtml(phone)}</p>` : ''}
        <p><strong>Temat:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Wiadomość:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('submitContact: Resend rejected the message', error);
      return {
        status: 'error',
        message: `Nie udało się wysłać wiadomości. Zadzwoń do nas: ${site.phone}.`,
      };
    }
  } catch (error) {
    console.error('submitContact: unexpected failure', error);
    return {
      status: 'error',
      message: `Nie udało się wysłać wiadomości. Zadzwoń do nas: ${site.phone}.`,
    };
  }

  return {
    status: 'success',
    message: isOnline
      ? `Dziękujemy. ${site.onlineReplyPromise}`
      : 'Dziękujemy — wiadomość dotarła. Odezwiemy się najszybciej, jak to możliwe.',
  };
}
