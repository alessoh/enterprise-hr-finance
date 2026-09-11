"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export interface NewsletterFormProps extends React.HTMLAttributes<HTMLFormElement> {
  source?: string;
}

/** Email capture. POSTs { email, source } to /api/waitlist; degrades to a plain message on failure. */
export function NewsletterForm({ source = "footer", className, ...props }: NewsletterFormProps) {
  const [status, setStatus] = React.useState<Status>("idle");
  const [email, setEmail] = React.useState("");
  const id = React.useId();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className={cn("flex flex-col gap-2", className)} {...props}>
      <label htmlFor={`${id}-email`} className="sr-only">
        Work email
      </label>
      <div className="flex w-full max-w-md gap-2">
        <Input
          id={`${id}-email`}
          type="email"
          name="email"
          autoComplete="email"
          inputMode="email"
          required
          placeholder="Work email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          aria-describedby={`${id}-status`}
        />
        <Button type="submit" variant="secondary" loading={status === "loading"} className="shrink-0">
          Subscribe
        </Button>
      </div>
      <p
        id={`${id}-status`}
        role="status"
        aria-live="polite"
        className={cn("min-h-5 text-[0.8125rem]", status === "error" ? "text-danger" : "text-fg-subtle")}
      >
        {status === "success"
          ? "Thanks. One email a month, no more."
          : status === "error"
            ? "That did not go through. Try again in a moment."
            : "Product updates, monthly. No marketing sequences."}
      </p>
    </form>
  );
}
