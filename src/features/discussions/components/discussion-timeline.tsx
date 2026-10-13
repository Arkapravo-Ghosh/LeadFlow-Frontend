import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { formatDate, relativeTime } from "@/lib/dates";
import type { Discussion } from "@/features/leads/types";

export function DiscussionTimeline({ discussions, now, timezone }: {
  discussions: Discussion[]; now: string; timezone: string;
}) {
  if (!discussions.length) return (
    <Empty><EmptyHeader><EmptyTitle>No discussions yet</EmptyTitle>
      <EmptyDescription>Record your first conversation below.</EmptyDescription>
    </EmptyHeader></Empty>
  );
  return (
    <ol aria-label="Discussion history" className="flex flex-col gap-6 border-l border-border pl-5">
      {discussions.map(note => (
        <li key={note.id} className="relative flex flex-col gap-2">
          <span aria-hidden className="absolute -left-[1.6rem] top-1 size-2 border border-background bg-primary" />
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <time dateTime={note.created_at}>{formatDate(note.created_at, timezone)}</time>
            <span>· {relativeTime(note.created_at, now)}</span>
          </div>
          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">{note.note}</p>
          {note.follow_up_at && <p className="text-xs text-muted-foreground">
            Follow-up set for {formatDate(note.follow_up_at, timezone)}
          </p>}
        </li>
      ))}
    </ol>
  );
}
