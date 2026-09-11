"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

import {
  companySizes,
  contactIntents,
  contactSchema,
  fieldErrors,
  intentLabels,
  MESSAGE_MAX,
  sizeLabels,
  type ContactField,
  type ContactFieldErrors,
  type ContactIntent,
} from "./contact-schema";

export interface ContactFormProps {
  /** Preselected topic, from ?intent=. */
  intent: ContactIntent;
  /** Optional prefilled message (e.g. a role from /careers). */
  initialMessage?: string;
  /** Fallback address shown when the request fails. */
  contactEmail: string;
  className?: string;
}

type Status = "idle" | "submitting" | "success" | "error";

interface Values {
  name: string;
  email: string;
  company: string;
  size: string;
  intent: ContactIntent;
  message: string;
  website: string;
}

const submitLabels: Record<ContactIntent, string> = {
  demo: "Request a demo",
  sales: "Contact sales",
  support: "Send request",
  partner: "Start the conversation",
};

/**
 * Contact form. Validates with the same zod schema the API route uses, posts
 * JSON to /api/contact, and renders submitting, success, and error states inline.
 * Every control is a native element so the form works before hydration.
 * The page keys this component by intent, so a new ?intent= link remounts it.
 */
export function ContactForm({ intent, initialMessage = "", contactEmail, className }: ContactFormProps) {
  const id = React.useId();
  const fieldId = (name: ContactField) => `${id}-${name}`;

  const [values, setValues] = React.useState<Values>({
    name: "",
    email: "",
    company: "",
    size: "",
    intent,
    message: initialMessage,
    website: "",
  });
  const [errors, setErrors] = React.useState<ContactFieldErrors>({});
  const [status, setStatus] = React.useState<Status>("idle");
  const [attempted, setAttempted] = React.useState(false);
  const errorRef = React.useRef<HTMLDivElement>(null);

  const validate = React.useCallback((next: Values): ContactFieldErrors => {
    const result = contactSchema.safeParse(next);
    return result.success ? {} : fieldErrors(result.error);
  }, []);

  const update = (name: keyof Values, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [name]: value } as Values;
      if (attempted) setErrors(validate(next));
      return next;
    });
  };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAttempted(true);
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = (Object.keys(nextErrors) as ContactField[])[0];
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus();
      return;
    }

    setStatus("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { errors?: ContactFieldErrors } | null;
        if (data?.errors && Object.keys(data.errors).length > 0) setErrors(data.errors);
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  React.useEffect(() => {
    if (status === "error") errorRef.current?.focus();
  }, [status]);

  if (status === "success") {
    return (
      <Card padding="lg" className={className} aria-live="polite">
        <Callout variant="success" title="Request received">
          Thanks — we reply within one business day.
        </Callout>
        <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-sm">
          <dt className="text-fg-muted">Topic</dt>
          <dd className="text-fg">{intentLabels[values.intent]}</dd>
          <dt className="text-fg-muted">Reply to</dt>
          <dd className="truncate text-fg">{values.email}</dd>
        </dl>
        <p className="mt-6 text-sm text-fg-muted">
          In the meantime, the{" "}
          <Link href="/dashboard" className="text-accent underline underline-offset-4 hover:text-accent-hover">
            live dashboard
          </Link>{" "}
          shows the agents at work, and{" "}
          <Link href="/pricing" className="text-accent underline underline-offset-4 hover:text-accent-hover">
            pricing
          </Link>{" "}
          has the credit calculator.
        </p>
      </Card>
    );
  }

  const submitting = status === "submitting";

  return (
    <Card
      as="section"
      padding="none"
      className={cn("overflow-hidden", className)}
      aria-labelledby={`${id}-title`}
    >
      {/* Head and body: a tinted band with a hairline under it, the same treatment the
          story tiles use, so the card is not one undifferentiated block of padding. */}
      <div className="border-b border-border bg-bg-subtle px-8 py-6 lg:px-10">
        <h2 id={`${id}-title`} className="text-h5 text-fg">
          Tell us about your team
        </h2>
        <p className="mt-1.5 text-sm text-fg-muted">All fields except the message are required.</p>
      </div>

      <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5 px-8 py-8 lg:px-10 lg:py-10">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full name" htmlFor={fieldId("name")} error={errors.name}>
            <Input
              id={fieldId("name")}
              name="name"
              autoComplete="name"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              disabled={submitting}
            />
          </Field>
          <Field label="Work email" htmlFor={fieldId("email")} error={errors.email}>
            <Input
              id={fieldId("email")}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="name@company.com"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              disabled={submitting}
            />
          </Field>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Company" htmlFor={fieldId("company")} error={errors.company}>
            <Input
              id={fieldId("company")}
              name="company"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => update("company", e.target.value)}
              disabled={submitting}
            />
          </Field>
          <Field label="Company size" htmlFor={fieldId("size")} error={errors.size}>
            <NativeSelect
              id={fieldId("size")}
              name="size"
              value={values.size}
              onChange={(e) => update("size", e.target.value)}
              disabled={submitting}
              className={values.size === "" ? "text-fg-subtle" : undefined}
            >
              <option value="" disabled>
                Select a range
              </option>
              {companySizes.map((size) => (
                <option key={size} value={size}>
                  {sizeLabels[size]}
                </option>
              ))}
            </NativeSelect>
          </Field>
        </div>

        <Field label="Topic" htmlFor={fieldId("intent")} error={errors.intent}>
          <NativeSelect
            id={fieldId("intent")}
            name="intent"
            value={values.intent}
            onChange={(e) => update("intent", e.target.value)}
            disabled={submitting}
          >
            {contactIntents.map((value) => (
              <option key={value} value={value}>
                {intentLabels[value]}
              </option>
            ))}
          </NativeSelect>
        </Field>

        <Field
          label="Message"
          htmlFor={fieldId("message")}
          optional
          error={errors.message}
          help={`Which workflow, which systems, and what you want to measure. Up to ${MESSAGE_MAX.toLocaleString("en-US")} characters.`}
        >
          <Textarea
            id={fieldId("message")}
            name="message"
            rows={5}
            maxLength={MESSAGE_MAX + 200}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            disabled={submitting}
          />
        </Field>

        {/* Honeypot: hidden from people and assistive tech; bots that fill it fail validation. */}
        <div aria-hidden className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
          <label htmlFor={fieldId("website")}>Website</label>
          <input
            id={fieldId("website")}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>

        {status === "error" ? (
          <div ref={errorRef} tabIndex={-1} className="outline-none">
            <Callout variant="danger" title="We could not send that">
              Check the highlighted fields and try again, or email{" "}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>.
            </Callout>
          </div>
        ) : null}

        <div className="mt-1 flex flex-col gap-4">
          <Button type="submit" size="lg" loading={submitting} className="w-full sm:w-auto sm:self-start">
            {submitting ? "Sending" : submitLabels[values.intent]}
          </Button>
          <p className="text-[0.8125rem] leading-relaxed text-fg-subtle">
            By submitting, you agree that Meridian Systems, Inc. may contact you about this request. We process the
            details you provide as described in the{" "}
            <Link href="/legal/privacy" className="text-accent underline underline-offset-4 hover:text-accent-hover">
              privacy policy
            </Link>
            . No marketing sequences.
          </p>
        </div>
      </form>
    </Card>
  );
}
