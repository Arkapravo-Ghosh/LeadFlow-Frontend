import { Field, FieldLabel } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { statuses } from "../status";
import type { LeadStatus } from "../types";

export type StatusFilter = LeadStatus | "all";
const options: { value: StatusFilter; label: string }[] = [{ value: "all", label: "All leads" }, ...statuses];
type Props = { value: StatusFilter; onChange: (value: StatusFilter) => void; compact?: boolean };

/** CSS switches presentation without resetting filters or inspecting window during hydration. */
export function StatusFilterControl({ value, onChange, compact = false }: Props) {
  if (compact) return <Field className="min-w-0 lg:hidden">
    <FieldLabel htmlFor="status-filter">Lead status</FieldLabel>
    <Select items={options} value={value} onValueChange={next => { if (next) onChange(next); }}>
      <SelectTrigger id="status-filter" className="min-h-11 w-full"><SelectValue /></SelectTrigger>
      <SelectContent alignItemWithTrigger={false}><SelectGroup>
        {options.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
      </SelectGroup></SelectContent>
    </Select>
  </Field>;
  return <ToggleGroup aria-label="Filter by status" value={[value]} spacing={3} size="sm"
    className="hidden w-full flex-wrap lg:flex"
    onValueChange={values => { if (values[0]) onChange(values[0] as StatusFilter); }}>
    {options.map(item => <ToggleGroupItem key={item.value} value={item.value}>{item.label}</ToggleGroupItem>)}
  </ToggleGroup>;
}
