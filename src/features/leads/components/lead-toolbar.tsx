import { Input } from "@/components/ui/input";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { followupFilters, type FollowupFilter } from "../followup-filter";
import { StatusFilterControl, type StatusFilter } from "./status-filter";

export type { StatusFilter } from "./status-filter";

type Props = {
  search: string; status: StatusFilter; followup: FollowupFilter;
  onFollowup: (value: FollowupFilter) => void;
  onSearch: (value: string) => void; onStatus: (value: StatusFilter) => void;
};

export function LeadToolbar({ search, status, followup, onSearch, onStatus, onFollowup }: Props) {
  return (
    <div className="flex flex-col gap-6 border-y border-border py-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-end lg:justify-between">
      <Field className="min-w-0 sm:col-span-2 lg:max-w-sm lg:flex-1">
        <FieldLabel htmlFor="lead-search" className="sr-only">Search leads by name</FieldLabel>
        <Input id="lead-search" type="search" placeholder="Search leads by name…"
          value={search} maxLength={120} onChange={event => onSearch(event.target.value)} />
      </Field>
      <Field className="min-w-0 lg:w-48">
        <FieldLabel htmlFor="followup-filter">Follow-up</FieldLabel>
        <Select items={followupFilters} value={followup} onValueChange={value => {
          if (value) onFollowup(value);
        }}>
          <SelectTrigger id="followup-filter" className="min-h-11 w-full"><SelectValue /></SelectTrigger>
          <SelectContent alignItemWithTrigger={false}><SelectGroup>
            {followupFilters.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}
          </SelectGroup></SelectContent>
        </Select>
      </Field>
      <StatusFilterControl compact value={status} onChange={onStatus} />
      </div>
      <StatusFilterControl value={status} onChange={onStatus} />
    </div>
  );
}
