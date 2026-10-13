"use client";

import { useState, useTransition } from "react";
import { RiAddLine } from "@remixicon/react";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter,
  DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FieldGroup } from "@/components/ui/field";
import { createLead } from "../server/actions";
import { FormFeedback } from "./form-feedback";
import { TextField } from "./text-field";
import type { FormErrors } from "../types";

const empty = { name: "", company: "", phone: "" };

export function AddLeadDialog() {
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(empty);
  const [fields, setFields] = useState<FormErrors>({});
  const [message, setMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  function submit(event: React.FormEvent) {
    event.preventDefault();
    startTransition(async () => {
      try {
        const result = await createLead(values);
        if (!result.ok) { setMessage(result.message); setFields(result.fields); return; }
        setValues(empty); setFields({}); setMessage(null); setOpen(false);
      } catch {
        setMessage("Connection interrupted. Your entries are still here; please retry.");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={value => { if (!pending) setOpen(value); }}>
      <DialogTrigger render={<Button />}><RiAddLine data-icon="inline-start" />Add New Lead</DialogTrigger>
      <DialogContent className="max-h-[90dvh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add new lead</DialogTitle>
          <DialogDescription>A name is all you need. Every new lead starts with New status.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} aria-busy={pending} className="flex flex-col gap-6">
          <FieldGroup>
            {(["name", "company", "phone"] as const).map(key =>
              <TextField key={key} id={`add-${key}`}
                label={key === "name" ? "Full name *" : `${key === "company" ? "Company" : "Phone"} (optional)`}
                required={key === "name"} maxLength={key === "phone" ? 40 : 120}
                type={key === "phone" ? "tel" : "text"} disabled={pending}
                value={values[key]} error={fields[key]}
                onChange={event => setValues({ ...values, [key]: event.target.value })} />,
            )}
          </FieldGroup>
          <FormFeedback message={message} />
          <DialogFooter>
            <DialogClose render={<Button variant="outline" type="button" disabled={pending} />}>Cancel</DialogClose>
            <Button type="submit" disabled={pending} aria-busy={pending}>{pending && <Spinner aria-hidden="true" data-icon="inline-start" />}{pending ? "Saving…" : "Save Lead"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
