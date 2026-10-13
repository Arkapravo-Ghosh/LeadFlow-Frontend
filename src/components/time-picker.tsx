"use client";

import { Field, FieldGroup, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { timeParts, timeValue, type TimePeriod } from "@/lib/time-input";

type Item = { value: string; label: string };
const hours: Item[] = Array.from({ length: 12 }, (_, index) => {
  const value = String(index + 1).padStart(2, "0"); return { value, label: value };
});
const minutes: Item[] = Array.from({ length: 60 }, (_, index) => {
  const value = String(index).padStart(2, "0"); return { value, label: value };
});
const periods: Item[] = [{ value: "AM", label: "AM" }, { value: "PM", label: "PM" }];
type Props = { id: string; value: string; disabled: boolean; invalid: boolean; describedBy: string; onChange: (value: string) => void };
type SegmentProps = Omit<Props, "value"> & { label: string; items: Item[]; value: string };

function TimeSegment({ id, label, value, items, disabled, invalid, describedBy, onChange }: SegmentProps) {
  return <Field className="min-w-0" data-invalid={invalid}>
    <FieldLabel htmlFor={id} className="sr-only">{label}</FieldLabel>
    <Select items={items} value={value || null} disabled={disabled} onValueChange={next => { if (next) onChange(next); }}>
      <SelectTrigger id={id} className="min-h-11 w-full" aria-required="true" aria-invalid={invalid} aria-describedby={describedBy}>
        <SelectValue placeholder={label} />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false} className="max-h-[min(15rem,var(--available-height))] min-w-0 motion-reduce:animate-none">
        <SelectGroup>{items.map(item => <SelectItem key={item.value} value={item.value} className="min-h-11">{item.label}</SelectItem>)}</SelectGroup>
      </SelectContent>
    </Select>
  </Field>;
}

/** A themed time picker composed entirely from shadcn fields and Selects. */
export function TimePicker({ id, value, disabled, invalid, describedBy, onChange }: Props) {
  const parts = timeParts(value);
  const shared = { disabled, invalid, describedBy };
  return <FieldSet className="min-w-0 gap-0" disabled={disabled} aria-describedby={describedBy}>
    <FieldLegend variant="label" className="mb-3 leading-relaxed">Follow-up time</FieldLegend>
    <FieldGroup className="grid grid-cols-3 gap-3">
      <TimeSegment {...shared} id={`${id}-hour`} label="Hour" items={hours} value={parts.hour}
        onChange={hour => onChange(timeValue({ ...parts, hour }))} />
      <TimeSegment {...shared} id={`${id}-minute`} label="Minute" items={minutes} value={parts.minute}
        onChange={minute => onChange(timeValue({ ...parts, minute }))} />
      <TimeSegment {...shared} id={`${id}-period`} label="AM / PM" items={periods} value={parts.period}
        onChange={period => onChange(timeValue({ ...parts, hour: parts.hour || "12", period: period as TimePeriod }))} />
    </FieldGroup>
  </FieldSet>;
}
