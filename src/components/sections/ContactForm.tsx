'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button, Checkbox, Input, Select, Textarea } from '@/components/ds';
import { submitContact } from '@/app/actions/contact';
import { contactSubjects } from '@/lib/contact-form';
import type { ContactState } from '@/lib/contact-form';
import styles from './ContactForm.module.css';

const initialState: ContactState = { status: 'idle' };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? 'Wysyłanie…' : 'Wyślij wiadomość'}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContact, initialState);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  return (
    <form action={formAction} className={styles.form} noValidate>
      {/*
        The status region is always in the DOM so assistive tech announces
        changes; role="status" is polite, which suits a form result.
      */}
      {state.status !== 'idle' && state.message && (
        <p
          role="status"
          className={`${styles.status} ${
            state.status === 'success' ? styles.statusSuccess : styles.statusError
          }`}
        >
          {state.message}
        </p>
      )}

      {state.status !== 'success' && (
        <>
          <div className={styles.row}>
            <Input
              label="Imię i nazwisko"
              name="name"
              autoComplete="name"
              required
              error={state.errors?.name}
            />
            <Input
              label="Adres e-mail"
              name="email"
              type="email"
              autoComplete="email"
              required
              error={state.errors?.email}
            />
          </div>

          <div className={styles.row}>
            <Input
              label="Telefon"
              name="phone"
              type="tel"
              autoComplete="tel"
              hint="Opcjonalnie — jeśli wolisz, żebyśmy oddzwonili."
              error={state.errors?.phone}
            />
            <Select
              label="Temat"
              name="subject"
              options={contactSubjects}
              required
              hint="Wybierz „on-line”, jeśli chcesz skorzystać z oferty zdalnej."
              error={state.errors?.subject}
            />
          </div>

          <Textarea
            label="Wiadomość"
            name="message"
            required
            rows={6}
            hint="Napisz, jaki masz cel i czego potrzebujesz — odpowiemy konkretnie."
            error={state.errors?.message}
          />

          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="company">Nazwa firmy</label>
            <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
          </div>

          <Checkbox
            name="consent"
            required
            error={state.errors?.consent}
            label={
              <>
                Wyrażam zgodę na przetwarzanie moich danych osobowych w celu udzielenia odpowiedzi
                na wiadomość, zgodnie z{' '}
                <Link href="/polityka-prywatnosci" className={styles.consentLink}>
                  polityką prywatności
                </Link>
                .
              </>
            }
          />

          {siteKey && (
            <>
              <Script
                src="https://challenges.cloudflare.com/turnstile/v0/api.js"
                strategy="lazyOnload"
              />
              <div className="cf-turnstile" data-sitekey={siteKey} data-language="pl" />
              {state.errors?.captcha && (
                <p className={`${styles.status} ${styles.statusError}`}>{state.errors.captcha}</p>
              )}
            </>
          )}

          <div className={styles.submitRow}>
            <SubmitButton />
            <span className={styles.required}>Pola oznaczone * są wymagane.</span>
          </div>
        </>
      )}
    </form>
  );
}
