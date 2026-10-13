"use client";

import { useState, useTransition } from "react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { FormFeedback } from "@/features/leads/components/form-feedback";
import { saveDiscussion } from "@/features/leads/server/actions";
import type { DiscussionSaved, FormErrors } from "@/features/leads/types";
import { FollowUpFields } from "./followup-fields";

export function DiscussionForm({ leadId, timezone, onSaved }: {
  leadId: string; timezone: string; onSaved: (data: DiscussionSaved) => void;
}) {
  const [note, setNote] = useState("");
  const [enabled, setEnabled] = useState(false);
  const [followUp, setFollowUp] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(event: React.FormEvent) {
    event.preventDefault();
    startTransition(async () => {
      try {
        const result = await saveDiscussion({
          leadId, note, followUpLocal: enabled ? followUp : undefined,
        });
        if (!result.ok) { setMessage(result.message); setErrors(result.fields); return; }
        onSaved(result.data);
        setNote(""); setFollowUp(""); setEnabled(false); setErrors({}); setMessage(null);
      } catch { setMessage("Connection interrupted. Your note is still here; please retry."); }
    });
  }
  return (
    <form onSubmit={submit} aria-busy={pending} className="flex shrink-0 flex-col gap-5">
      <FieldGroup className="gap-4">
        <Field data-invalid={Boolean(errors.note)}>
          <FieldLabel htmlFor="discussion-note">Log a discussion</FieldLabel>
          <Textarea id="discussion-note" value={note} required maxLength={5000} disabled={pending}
            aria-invalid={Boolean(errors.note)} placeholder="What did you discuss? What happens next?"
            className="max-h-40 min-h-24" onChange={event => setNote(event.target.value)} />
          {errors.note && <FieldError>{errors.note}</FieldError>}
        </Field>
        <FollowUpFields enabled={enabled} value={followUp} timezone={timezone}
          error={errors.followUpLocal} disabled={pending} onEnabled={setEnabled} onChange={setFollowUp} />
      </FieldGroup>
      <FormFeedback message={message} />
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-muted-foreground">Notes without a date keep your existing follow-up.</p>
        <Button type="submit" disabled={pending} aria-busy={pending}>{pending && <Spinner aria-hidden="true" data-icon="inline-start" />}{pending ? "Saving…" : "Save Note"}</Button>
      </div>
    </form>
  );
}
