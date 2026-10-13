"use client";

import { useRef, useState, useTransition } from "react";
import { WorkspaceHeader } from "./workspace-header";
import { Dialog } from "@/components/ui/dialog";
import { SignOutButton } from "@/features/auth/components/sign-out-button";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAutoRefresh } from "../hooks/use-auto-refresh";
import { matchesFollowup, type FollowupFilter } from "../followup-filter";
import { loadTimeline } from "../server/actions";
import { AddLeadDialog } from "./add-lead-dialog";
import { LeadToolbar, type StatusFilter } from "./lead-toolbar";
import { LeadList } from "./lead-list";
import { TimelineDialog } from "./timeline-dialog";
import type { ActionResult, DiscussionSaved, Lead, LeadListData, Timeline } from "../types";

export function LeadWorkspace({ data }: { data: LeadListData }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [followup, setFollowup] = useState<FollowupFilter>("all");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [timeline, setTimeline] = useState<ActionResult<Timeline> | null>(null);
  const [loading, startTransition] = useTransition();
  const request = useRef(0);
  const trigger = useRef<HTMLButtonElement | null>(null);
  useAutoRefresh();

  function open(lead: Lead, button: HTMLButtonElement) {
    trigger.current = button;
    setSelected(lead); setTimeline(null);
    const version = ++request.current;
    startTransition(async () => {
      const result = await loadTimeline(lead.id).catch(() => ({
        ok: false as const, message: "Unable to load discussions. Please try again.", fields: {},
      }));
      if (version === request.current) setTimeline(result);
    });
  }

  function saved(result: DiscussionSaved) {
    // A completed request must not reopen a dialog the user already closed.
    setSelected(current => current?.id === result.lead.id ? result.lead : current);
    setTimeline(previous => previous?.ok ? {
      ok: true, data: { lead: result.lead, discussions: [
        result.discussion,
        ...previous.data.discussions.filter(note => note.id !== result.discussion.id),
      ] },
    } : previous);
  }

  const visible = data.leads.filter(lead =>
    (status === "all" || lead.status === status) && matchesFollowup(lead, followup) &&
    lead.name.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase()),
  );
  const active = data.leads.find(lead => lead.id === selected?.id) ?? selected;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <WorkspaceHeader><ThemeToggle /><AddLeadDialog /><SignOutButton /></WorkspaceHeader>
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-10 sm:px-8 sm:py-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Keep the conversation moving.</h1>
          <p className="text-sm text-muted-foreground">Your leads, discussions, and next steps. All in one place.</p>
        </div>
        <LeadToolbar search={search} status={status} followup={followup}
          onSearch={setSearch} onStatus={setStatus} onFollowup={setFollowup} />
        <div className="flex items-center justify-between gap-3 text-xs text-muted-foreground" aria-live="polite">
          <span>{visible.length} {visible.length === 1 ? "lead" : "leads"}{search || status !== "all" || followup !== "all" ? " matching your filters" : " in your workspace"}</span>
          <span>{data.timezone}</span>
        </div>
        <LeadList leads={visible} now={data.server_time} timezone={data.timezone}
          filtered={Boolean(search || status !== "all" || followup !== "all")} onOpen={open} />
      </main>
      <Dialog open={Boolean(selected)} onOpenChange={value => {
        if (!value) { request.current++; setSelected(null); setTimeline(null); }
      }}>
        {active && <TimelineDialog lead={active} timeline={timeline} loading={loading}
          timezone={data.timezone} now={data.server_time} trigger={trigger}
          onRetry={() => { if (trigger.current) open(active, trigger.current); }}
          onSaved={saved} onStatusSaved={lead => setSelected(current => current?.id === lead.id ? lead : current)} />}
      </Dialog>
    </div>
  );
}
