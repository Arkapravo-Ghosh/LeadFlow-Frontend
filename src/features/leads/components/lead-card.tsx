import type { MouseEvent } from "react";
import { RiArrowRightUpLine, RiCalendarEventLine } from "@remixicon/react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDate, relativeTime } from "@/lib/dates";
import { StatusBadge } from "./status-badge";
import type { Lead } from "../types";

type Props = {
  lead: Lead; now: string; timezone: string;
  onOpen: (lead: Lead, trigger: HTMLButtonElement) => void;
};

export function LeadCard({ lead, now, timezone, onOpen }: Props) {
  function open(event: MouseEvent<HTMLButtonElement>) {
    onOpen(lead, event.currentTarget);
  }
  return (
    <button type="button" onClick={open} aria-label={`Open ${lead.name}`}
      data-testid="lead-card" data-lead-id={lead.id}
      className={cn(
        "group flex w-full flex-col gap-4 border border-border bg-card p-5 text-left transition-colors hover:bg-accent/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring sm:p-6",
        lead.is_today && "border-primary/40",
      )}>
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold">{lead.name}</h3>
          {lead.company && <p className="mt-1 truncate text-sm text-muted-foreground">{lead.company}</p>}
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <StatusBadge status={lead.status} />
          <RiArrowRightUpLine aria-hidden className="size-4 text-muted-foreground" />
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <p className="line-clamp-2 min-w-0 text-sm text-muted-foreground">
          {lead.last_note ?? "No discussions yet. Start the conversation."}
        </p>
        <span className="shrink-0 text-xs text-muted-foreground">
          {relativeTime(lead.last_discussion_at, now)}
        </span>
      </div>
      {lead.follow_up_at && (
        <div className={cn("flex flex-wrap items-center gap-2 text-xs", lead.is_overdue ? "text-destructive" : "text-muted-foreground")}>
          <RiCalendarEventLine aria-hidden className="size-4" />
          <span>{lead.is_today ? "Today · " : "Follow-up · "}{formatDate(lead.follow_up_at, timezone)}</span>
          {lead.is_overdue && <Badge variant="destructive">Overdue</Badge>}
        </div>
      )}
    </button>
  );
}
