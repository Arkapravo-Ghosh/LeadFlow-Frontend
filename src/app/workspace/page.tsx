import type { Metadata } from "next";
import { Suspense } from "react";
import { Workspace } from "@/features/leads/server/workspace";
import { WorkspaceSkeleton } from "@/features/leads/components/workspace-skeleton";

export const metadata: Metadata = { title: "Workspace · LeadFlow", robots: { index: false, follow: false } };

export default function WorkspacePage() {
  return <Suspense fallback={<WorkspaceSkeleton />}><Workspace /></Suspense>;
}
