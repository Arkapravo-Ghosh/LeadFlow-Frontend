import type { RefObject } from "react";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { DiscussionTimeline } from "@/features/discussions/components/discussion-timeline";
import { DiscussionForm } from "@/features/discussions/components/discussion-form";
import { StatusSelect } from "./status-select";
import { FormFeedback } from "./form-feedback";
import type { ActionResult, DiscussionSaved, Lead, Timeline } from "../types";

type Props = {
  lead: Lead; timeline: ActionResult<Timeline> | null; loading: boolean;
  now: string; timezone: string; trigger: RefObject<HTMLButtonElement | null>;
  onRetry: () => void; onSaved: (result: DiscussionSaved) => void;
  onStatusSaved: (lead: Lead) => void;
};

export function TimelineDialog({ lead, timeline, loading, now, timezone, trigger,
  onRetry, onSaved, onStatusSaved }: Props) {
  return (
    <DialogContent className="flex max-h-[92dvh] flex-col gap-5 overflow-y-auto sm:max-w-2xl sm:overflow-y-hidden" finalFocus={trigger}>
      <DialogHeader className="shrink-0 pr-7">
        <DialogTitle className="break-words">{lead.name}</DialogTitle>
        <DialogDescription>{[lead.company, lead.phone].filter(Boolean).join(" · ") || "Lead discussion history and next steps."}</DialogDescription>
      </DialogHeader>
      <StatusSelect lead={lead} onSaved={onStatusSaved} />
      <Separator />
      <div className="min-h-16 shrink-0 pr-2 sm:flex-1 sm:shrink sm:overflow-y-auto" aria-busy={loading} data-testid="timeline-scroll">
        {!timeline ? <div className="flex flex-col gap-4"><Skeleton className="h-16 w-full" /><Skeleton className="h-16 w-full" /></div>
          : timeline.ok ? <DiscussionTimeline discussions={timeline.data.discussions} now={now} timezone={timezone} />
          : <div className="flex flex-col gap-4"><FormFeedback message={timeline.message} />
            <Button variant="outline" disabled={loading} onClick={onRetry}>Retry discussions</Button></div>}
      </div>
      {timeline?.ok && <><Separator /><DiscussionForm leadId={lead.id} timezone={timezone} onSaved={onSaved} /></>}
    </DialogContent>
  );
}
