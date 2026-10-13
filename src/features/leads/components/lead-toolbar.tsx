import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { followupFilters, type FollowupFilter } from "../followup-filter";
import { statuses } from "../status";
import type { LeadStatus } from "../types";

export type StatusFilter = LeadStatus | "all";

type Props = {
  search: string; status: StatusFilter; followup: FollowupFilter;
  onFollowup: (value: FollowupFilter) => void;
  onSearch: (value: string) => void; onStatus: (value: StatusFilter) => void;
};

export function LeadToolbar({ search, status, followup, onSearch, onStatus, onFollowup }: Props) {
  return (
    <div className="flex flex-col gap-6 border-y border-border py-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
      <Field className="min-w-48 flex-1 sm:max-w-sm">
        <FieldLabel htmlFor="lead-search" className="sr-only">Search leads by name</FieldLabel>
        <Input id="lead-search" type="search" placeholder="Search leads by name…"
          value={search} maxLength={120} onChange={event => onSearch(event.target.value)} />
      </Field>
      <Field className="w-full sm:w-48">
        <FieldLabel htmlFor="followup-filter">Follow-up</FieldLabel>
        <Select items={followupFilters} value={followup} onValueChange={value => {
          if (value) onFollowup(value);
        }}>
          <SelectTrigger id="followup-filter" className="w-full"><SelectValue /></SelectTrigger>
          <SelectContent alignItemWithTrigger={false}><SelectGroup>
            {followupFilters.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
          </SelectGroup></SelectContent>
        </Select>
      </Field>
      </div>
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
