"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, Label } from "@/components/ui/label";

import { PreviewNotice } from "./preview-notice";
import { SsoButtons } from "./sso-buttons";

export function LoginForm() {
  const id = React.useId();
  const [notice, setNotice] = React.useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNotice(true);
  }

  return (
    <div className="flex flex-col gap-6">
      <SsoButtons onSelect={() => setNotice(true)} />

      <form onSubmit={onSubmit} className="flex flex-col gap-5">
        <Field label="Work email" htmlFor={`${id}-email`}>
          <Input
            id={`${id}-email`}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            required
            placeholder="you@company.com"
          />
        </Field>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-baseline justify-between">
            <Label htmlFor={`${id}-password`}>Password</Label>
            <Link
              href="/contact?intent=support"
              className="text-[0.8125rem] leading-none text-accent underline-offset-4 hover:text-accent-hover hover:underline"
            >
              Forgot password
            </Link>
          </div>
          <Input
            id={`${id}-password`}
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="Your password"
          />
        </div>

        <PreviewNotice open={notice} />

        <Button type="submit" className="w-full">
          Sign in
        </Button>
      </form>
    </div>
  );
}
