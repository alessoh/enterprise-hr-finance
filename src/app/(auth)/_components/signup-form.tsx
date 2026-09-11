"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/ui/label";
import { NativeSelect } from "@/components/ui/select";

import { PreviewNotice } from "./preview-notice";
import { SsoButtons } from "./sso-buttons";

const companySizes = ["1-50", "51-250", "251-1,000", "1,001-5,000", "5,000+"] as const;

export function SignupForm() {
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

        <Field label="Company" htmlFor={`${id}-company`}>
          <Input
            id={`${id}-company`}
            name="company"
            type="text"
            autoComplete="organization"
            required
            placeholder="Company name"
          />
        </Field>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Company size" htmlFor={`${id}-size`}>
            <NativeSelect id={`${id}-size`} name="size" required defaultValue="">
              <option value="" disabled>
                Employees
              </option>
              {companySizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </NativeSelect>
          </Field>

          <Field label="Role" htmlFor={`${id}-role`} optional>
            <Input
              id={`${id}-role`}
              name="role"
              type="text"
              autoComplete="organization-title"
              placeholder="VP People Operations"
            />
          </Field>
        </div>

        <PreviewNotice open={notice} />

        <Button type="submit" className="w-full">
          Create workspace
        </Button>
      </form>
    </div>
  );
}
