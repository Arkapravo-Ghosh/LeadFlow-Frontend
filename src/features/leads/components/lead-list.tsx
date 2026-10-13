import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { LeadCard } from "./lead-card";
import type { Lead } from "../types";

type Props = {
  leads: Lead[]; now: string; timezone: string; filtered: boolean;
  onOpen: (lead: Lead, trigger: HTMLButtonElement) => void;
};

export function LeadList({ leads, now, timezone, filtered, onOpen }: Props) {
  if (!leads.length) return (
    <Empty className="border border-dashed">
      <EmptyHeader>
        <EmptyTitle>{filtered ? "No matching leads" : "Your next conversation starts here"}</EmptyTitle>
        <EmptyDescription>{filtered ? "Try another name or status." : "Add your first lead to start tracking discussions and follow-ups."}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  );
  const today = leads.filter(lead => lead.is_today);
  const other = leads.filter(lead => !lead.is_today);
  return (
    <div className="flex flex-col gap-8">
      {[{ title: "Today’s follow-ups", items: today, pinned: true },
        { title: today.length ? "Other leads" : "All leads", items: other, pinned: false }]
        .filter(group => group.items.length)
        .map(group => (
          <section key={group.title} aria-label={group.title} className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">{group.title}</h2>
              <span className="text-xs text-muted-foreground">{group.items.length}</span>
              {group.pinned && <span className="ml-auto text-xs text-primary">Pinned for today</span>}
            </div>
            {group.items.map(lead => <LeadCard key={lead.id} lead={lead} now={now}
              timezone={timezone} onOpen={onOpen} />)}
          </section>
        ))}
    </div>
  );
}
