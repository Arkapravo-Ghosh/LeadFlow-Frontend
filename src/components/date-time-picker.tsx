"use client";

import { useState } from "react";
import { RiCalendarLine } from "@remixicon/react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTitle, PopoverTrigger } from "@/components/ui/popover";
import { calendarDate, calendarDateValue } from "@/lib/calendar-input";

type Props = {
  id: string; value: string; timezone: string; disabled: boolean; invalid: boolean;
  describedBy: string; onChange: (value: string) => void;
};

/** Compose shadcn's date picker with a time input; emit local wall time for the server. */
export function DateTimePicker({ id, value, timezone, disabled, invalid, describedBy, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [dateValue = "", timeValue = ""] = value.split("T");
  const selected = calendarDate(dateValue, timezone);
  const label = selected ? new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: timezone }).format(selected) : "Pick a date";
  return <div className="grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-[1fr_9rem]">
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={id}>Follow-up date</FieldLabel>
      <Popover open={open && !disabled} onOpenChange={setOpen}>
        <PopoverTrigger render={<Button id={id} type="button" variant="outline" disabled={disabled}
          aria-invalid={invalid} aria-describedby={describedBy} data-empty={!selected}
          className="w-full justify-start text-left data-[empty=true]:text-muted-foreground" />}>
          <RiCalendarLine aria-hidden data-icon="inline-start" />{label}
        </PopoverTrigger>
        <PopoverContent align="start" className="max-h-(--available-height) w-auto max-w-[calc(100vw-2rem)] overflow-y-auto p-0 motion-reduce:animate-none">
          <PopoverTitle className="sr-only">Choose a follow-up date</PopoverTitle>
          <Calendar mode="single" timeZone={timezone} selected={selected} defaultMonth={selected} autoFocus
            onSelect={date => {
              onChange(date ? `${calendarDateValue(date)}T${timeValue}` : "");
              setOpen(false);
            }} />
        </PopoverContent>
      </Popover>
    </Field>
    <Field data-invalid={invalid}>
      <FieldLabel htmlFor={`${id}-time`}>Follow-up time</FieldLabel>
      <Input id={`${id}-time`} type="time" step={60} value={timeValue} required disabled={disabled}
        aria-invalid={invalid} aria-describedby={describedBy} className="min-w-0"
        onChange={event => onChange(`${dateValue}T${event.target.value}`)} />
    </Field>
  </div>;
}
