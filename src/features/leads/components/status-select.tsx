"use client";

import { useState, useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { statuses } from "../status";
import { changeStatus } from "../server/actions";
import type { Lead, LeadStatus } from "../types";

export function StatusSelect({ lead, onSaved }: { lead: Lead; onSaved: (lead: Lead) => void }) {
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  function change(status: LeadStatus | null) {
    if (!status || status === lead.status) return;
    startTransition(async () => {
      try {
        const result = await changeStatus(lead.id, status);
        if (!result.ok) { setError(result.message); return; }
        setError(null); onSaved(result.data);
      } catch { setError("Unable to update status. Please retry."); }
    });
  }
  return (
    <Field className="max-w-48" data-invalid={Boolean(error)}>
      <FieldLabel htmlFor="lead-status">Status{pending && <><Spinner aria-hidden="true" /><span className="sr-only" role="status">Saving status</span></>}</FieldLabel>
      <Select items={statuses} value={lead.status} onValueChange={change} disabled={pending}>
        <SelectTrigger id="lead-status" aria-busy={pending} aria-invalid={Boolean(error)} className="w-full"><SelectValue /></SelectTrigger>
        <SelectContent alignItemWithTrigger={false}><SelectGroup>
          {statuses.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
        </SelectGroup></SelectContent>
      </Select>
      {error && <FieldError>{error}</FieldError>}
    </Field>
  );
}
