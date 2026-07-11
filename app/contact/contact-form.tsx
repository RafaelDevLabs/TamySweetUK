"use client";

import { FormEvent, useState } from "react";

import { buildWhatsAppUrl } from "@/components/WhatsAppButton";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  interest: string;
  subject: string;
  message: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  interest: "",
  subject: "",
  message: "",
};

export default function ContactForm({
  whatsappNumber,
}: {
  whatsappNumber: string;
}) {
  const [formState, setFormState] = useState<FormState>(initialState);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const composedMessage = [
      `Hello, my name is ${formState.fullName}.`,
      `Email: ${formState.email}.`,
      formState.phone ? `Phone: ${formState.phone}.` : null,
      `Kitten / Breed interested in: ${formState.interest}.`,
      `Subject: ${formState.subject}.`,
      `Message: ${formState.message}`,
    ]
      .filter(Boolean)
      .join(" ");

    window.location.href = buildWhatsAppUrl(composedMessage, whatsappNumber);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[28px] border border-[#F3D6DE] bg-white p-6 shadow-[0_20px_60px_rgba(239,111,145,0.08)] sm:p-8"
    >
      <div>
        <p className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#EF6F91]">
          Contact Form
        </p>
        <h2 className="mt-3 font-serif text-[34px] leading-[1.08] text-[#2F2A2A] sm:text-[42px]">
          Send Me a Message
        </h2>
        <p className="mt-4 max-w-[640px] text-[16px] leading-8 text-[#5F5A5A]">
          Tell us a little about the kitten you are hoping for and your message will open in
          WhatsApp so we can reply personally.
        </p>
      </div>

      <div className="grid gap-5">
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <FormInput
            id="full-name"
            name="fullName"
            label="Full Name"
            autoComplete="name"
            value={formState.fullName}
            onChange={(value) => setFormState((current) => ({ ...current, fullName: value }))}
            required
          />
          <FormInput
            id="email"
            name="email"
            label="Email"
            type="email"
            autoComplete="email"
            value={formState.email}
            onChange={(value) => setFormState((current) => ({ ...current, email: value }))}
            required
          />
        </div>
        <FormInput
          id="phone"
          name="phone"
          label="Phone (optional)"
          autoComplete="tel"
          value={formState.phone}
          onChange={(value) => setFormState((current) => ({ ...current, phone: value }))}
        />
        <FormInput
          id="interest"
          name="interest"
          label="Kitten / Breed interested in"
          autoComplete="off"
          value={formState.interest}
          onChange={(value) => setFormState((current) => ({ ...current, interest: value }))}
          required
        />
        <FormInput
          id="subject"
          name="subject"
          label="Subject"
          autoComplete="off"
          value={formState.subject}
          onChange={(value) => setFormState((current) => ({ ...current, subject: value }))}
          required
        />
        <label htmlFor="message" className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
          <span className="text-[15px] font-medium text-[#2F2A2A]">Message</span>
          <textarea
            id="message"
            name="message"
            autoComplete="off"
            required
            rows={7}
            value={formState.message}
            onChange={(event) =>
              setFormState((current) => ({ ...current, message: event.target.value }))
            }
            className="min-h-[170px] rounded-[14px] border border-[#F3D6DE] bg-white px-4 py-4 text-[15px] text-[#2F2A2A] outline-none transition focus:border-[#EF6F91] focus:shadow-[0_0_0_4px_rgba(239,111,145,0.10)] sm:min-h-[190px]"
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-8 inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#EF6F91] px-6 text-[15px] font-semibold text-white shadow-[0_14px_30px_rgba(239,111,145,0.20)] transition duration-200 hover:-translate-y-[2px] hover:bg-[#E95E84]"
      >
        <WhatsAppIcon className="h-[18px] w-[18px]" />
        Send via WhatsApp
      </button>

      <div className="mt-4 flex items-center gap-3 text-sm text-[#6F6666]">
        <CheckIcon className="h-[18px] w-[18px] shrink-0 text-[#EF6F91]" />
        <p>Your message will open in WhatsApp so I can reply faster.</p>
      </div>
    </form>
  );
}

type FormInputProps = {
  id: string;
  name: string;
  label: string;
  autoComplete?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  type?: string;
};

function FormInput({
  id,
  name,
  label,
  autoComplete,
  value,
  onChange,
  required = false,
  type = "text",
}: FormInputProps) {
  return (
    <label htmlFor={id} className="grid gap-2 text-sm font-medium text-[var(--foreground)]">
      <span className="text-[15px] font-medium text-[#2F2A2A]">{label}</span>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-[52px] rounded-[14px] border border-[#F3D6DE] bg-white px-4 text-[15px] text-[#2F2A2A] outline-none transition focus:border-[#EF6F91] focus:shadow-[0_0_0_4px_rgba(239,111,145,0.10)]"
      />
    </label>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M17.5 6.8A8 8 0 0 0 4.8 16.2L3.6 20.4l4.3-1.1A8 8 0 1 0 17.5 6.8Zm-5.5 11a5.6 5.6 0 0 1-2.8-.8l-.2-.1-2.5.6.7-2.4-.2-.2a5.6 5.6 0 1 1 5 2.9Zm3.1-4.2c-.2-.1-1.1-.6-1.2-.7-.2-.1-.3-.1-.4.1-.1.2-.5.7-.6.8-.1.1-.2.1-.4 0a4.6 4.6 0 0 1-2.3-2c-.1-.2 0-.3.1-.4l.3-.3c.1-.1.1-.2.2-.3.1-.1 0-.2 0-.3l-.5-1.2c-.1-.2-.2-.2-.3-.2h-.3c-.1 0-.3 0-.4.2-.2.2-.7.7-.7 1.6s.7 1.8.8 1.9c.1.1 1.4 2.2 3.4 3 .5.2.9.4 1.2.5.5.2 1 .2 1.4.1.4-.1 1.1-.5 1.2-.9.2-.4.2-.8.1-.9-.1-.1-.2-.1-.4-.2Z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none">
      <path
        d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="m8 12.3 2.6 2.6 5.4-5.8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
