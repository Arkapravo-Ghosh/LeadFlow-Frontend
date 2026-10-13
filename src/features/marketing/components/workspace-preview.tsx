"use client";

import { RiArrowRightUpLine, RiCalendarLine } from "@remixicon/react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { exampleLeads } from "../content";

/** A static illustration, clearly labeled and independent of private API data. */
export function WorkspacePreview() {
  return <figure aria-label="Example LeadFlow workspace" className="min-w-0 border border-border bg-card p-5 text-card-foreground sm:p-7">
    <figcaption className="flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
      <span>Illustrative preview · example data</span><RiArrowRightUpLine className="size-5 text-primary" aria-hidden />
    </figcaption>
    <div className="my-6 flex items-center gap-2 text-sm font-medium"><RiCalendarLine className="size-4 text-primary" aria-hidden />Your leads, at a glance</div>
    <Separator />
    <ul className="divide-y divide-border">
      {exampleLeads.map(lead => <li key={lead.name} className="flex flex-col gap-3 py-5 last:pb-0">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div><p className="font-semibold">{lead.name}</p><p className="mt-1 text-xs text-muted-foreground">{lead.company}</p></div>
          <Badge variant="secondary">{lead.status}</Badge>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">{lead.note}</p>
        <p className="text-xs font-medium">{lead.schedule}</p>
      </li>)}
    </ul>
  </figure>;
}
