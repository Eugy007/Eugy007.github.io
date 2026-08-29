'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react';
import clsx from 'clsx';
import { contact, profile } from '@/data/site';
import SectionHeading from './SectionHeading';

type Status = 'idle' | 'submitting' | 'success' | 'error';

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>('idle');

  function validate(): boolean {
    const next: Errors = {};
    if (!values.name.trim()) next.name = 'Tell me who this is from.';
    if (!values.email.trim()) next.email = 'An email address is required.';
    else if (!EMAIL_RE.test(values.email)) next.email = "That doesn't look like a valid email.";
    if (!values.message.trim()) next.message = "Don't leave this empty.";
    else if (values.message.trim().length < 10) next.message = 'A few more words would help.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('submitting');
    try {
      const res = await fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus('success');
        setValues({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-shell px-5 sm:px-8">
        <SectionHeading eyebrow="Let's talk" title={contact.title} description={contact.lede} />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-2xl border border-line bg-surface p-6 sm:p-8"
          >
            <Field
              label="Name"
              name="name"
              value={values.name}
              error={errors.name}
              onChange={(v) => setValues((s) => ({ ...s, name: v }))}
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={values.email}
              error={errors.email}
              onChange={(v) => setValues((s) => ({ ...s, email: v }))}
            />
            <Field
              label="Message"
              name="message"
              as="textarea"
              value={values.message}
              error={errors.message}
              onChange={(v) => setValues((s) => ({ ...s, message: v }))}
            />

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-signal px-5 py-3.5 font-mono text-sm font-medium text-bg transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {status === 'submitting' ? 'Sending...' : 'Send message'}
              <Send size={15} />
            </button>

            {status === 'success' && (
              <p className="mt-4 font-mono text-[13px] text-signal">Sent. I&apos;ll reply from {profile.email}.</p>
            )}
            {status === 'error' && (
              <p className="mt-4 font-mono text-[13px] text-[#f0806b]">
                Something didn&apos;t go through, email me directly at {profile.email} instead.
              </p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-3"
          >
            <ContactCard icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <ContactCard icon={Phone} label="Phone" value={profile.phone} href={profile.phoneHref} />
            <ContactCard icon={Github} label="GitHub" value={profile.github.replace('https://', '')} href={profile.github} />
            <ContactCard
              icon={Linkedin}
              label="LinkedIn"
              value={profile.linkedin.replace('https://', '')}
              href={profile.linkedin}
            />
            <ContactCard icon={MapPin} label="Location" value={profile.location} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface FieldProps {
  label: string;
  name: string;
  value: string;
  error?: string;
  as?: 'input' | 'textarea';
  type?: string;
  onChange: (v: string) => void;
}

function Field({ label, name, value, error, as = 'input', type = 'text', onChange }: FieldProps) {
  const shared = clsx(
    'w-full rounded-lg border bg-bg/40 px-3.5 py-2.5 font-mono text-sm text-ink outline-none transition-colors placeholder:text-mutedDim',
    error ? 'border-[#f0806b]/60 focus:border-[#f0806b]' : 'border-line focus:border-signal'
  );

  return (
    <div className="mb-5">
      <label htmlFor={name} className="mb-1.5 block font-mono text-[12px] text-muted">
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={name}
          name={name}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={clsx(shared, 'resize-none')}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          className={shared}
        />
      )}
      {error && (
        <p id={`${name}-error`} className="mt-1.5 font-mono text-[11px] text-[#f0806b]">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <>
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-line text-signal">
        <Icon size={16} />
      </span>
      <span className="min-w-0">
        <span className="block font-mono text-[11px] text-mutedDim">{label}</span>
        <span className="block truncate text-sm font-medium text-ink">{value}</span>
      </span>
    </>
  );

  const className =
    'flex items-center gap-3.5 rounded-xl border border-line bg-surface px-4 py-3.5 transition-colors hover:border-signal/40';

  return href ? (
    <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className={className}>
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
