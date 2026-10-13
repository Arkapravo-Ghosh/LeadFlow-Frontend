import { Suspense } from "react";
import { Workspace } from "@/features/leads/server/workspace";
import { WorkspaceSkeleton } from "@/features/leads/components/workspace-skeleton";

export default function Home() {
  return <Suspense fallback={<WorkspaceSkeleton />}><Workspace /></Suspense>;
}
