import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type Props = {
  enabled: boolean; value: string; timezone: string; error?: string; disabled: boolean;
  onEnabled: (enabled: boolean) => void; onChange: (value: string) => void;
};

export function FollowUpFields({ enabled, value, timezone, error, disabled, onEnabled, onChange }: Props) {
  return (
    <>
      <Field orientation="horizontal">
        <Checkbox id="schedule-followup" checked={enabled} disabled={disabled} onCheckedChange={onEnabled} />
        <FieldLabel htmlFor="schedule-followup">Set a follow-up</FieldLabel>
      </Field>
      {enabled && <Field data-invalid={Boolean(error)}>
        <FieldLabel htmlFor="followup-local">Follow-up date & time</FieldLabel>
        <Input id="followup-local" type="datetime-local" value={value} required
          disabled={disabled} aria-invalid={Boolean(error)}
          aria-describedby="followup-help" onChange={event => onChange(event.target.value)} />
        <FieldDescription id="followup-help">Scheduled in {timezone}. Past dates appear as overdue.</FieldDescription>
        {error && <FieldError>{error}</FieldError>}
      </Field>}
    </>
  );
}
