import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { statuses } from "../status";
import type { LeadStatus } from "../types";

export type StatusFilter = LeadStatus | "all";

type Props = {
  search: string; status: StatusFilter;
  onSearch: (value: string) => void; onStatus: (value: StatusFilter) => void;
};

export function LeadToolbar({ search, status, onSearch, onStatus }: Props) {
  return (
    <div className="flex flex-col gap-6 border-y border-border py-6">
      <Field className="max-w-sm">
        <FieldLabel htmlFor="lead-search" className="sr-only">Search leads by name</FieldLabel>
        <Input id="lead-search" type="search" placeholder="Search leads by name…"
          value={search} maxLength={120} onChange={event => onSearch(event.target.value)} />
      </Field>
      <div className="max-w-full overflow-x-auto pb-1">
        <ToggleGroup aria-label="Filter by status" value={[status]} spacing={3} size="sm"
          onValueChange={values => { if (values[0]) onStatus(values[0] as StatusFilter); }}>
          {[{ value: "all", label: "All leads" }, ...statuses].map(item =>
            <ToggleGroupItem key={item.value} value={item.value}>{item.label}</ToggleGroupItem>,
          )}
        </ToggleGroup>
      </div>
    </div>
  );
}
