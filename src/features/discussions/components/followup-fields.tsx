import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldError, FieldLabel } from "@/components/ui/field";
import { DateTimePicker } from "@/components/date-time-picker";

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
        <DateTimePicker id="followup-local" value={value} timezone={timezone} disabled={disabled}
          invalid={Boolean(error)} describedBy={error ? "followup-help followup-error" : "followup-help"} onChange={onChange} />
        <FieldDescription id="followup-help">Scheduled in {timezone}. Past dates appear as overdue.</FieldDescription>
        {error && <FieldError id="followup-error">{error}</FieldError>}
      </Field>}
    </>
  );
}
