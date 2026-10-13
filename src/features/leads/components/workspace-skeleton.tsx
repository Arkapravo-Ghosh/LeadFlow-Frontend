import { Skeleton } from "@/components/ui/skeleton";
import { Spinner } from "@/components/ui/spinner";
import { WorkspaceHeader } from "./workspace-header";

/** Reserve the header, toolbar and card layout while the private workspace loads. */
export function WorkspaceSkeleton() {
  return <div className="min-h-dvh bg-background text-foreground" role="status" aria-live="polite" aria-busy="true" aria-label="Loading leads">
    <div aria-hidden="true" inert>
      <WorkspaceHeader><Skeleton className="size-10" /><Skeleton className="h-10 w-40" /><Spinner /></WorkspaceHeader>
      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-5 py-10 sm:px-8 sm:py-12">
        <div className="flex flex-col gap-2"><Skeleton className="h-10 w-full max-w-lg" /><Skeleton className="h-5 w-full max-w-sm" /></div>
        <div className="flex flex-col gap-6 border-y border-border py-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:flex lg:items-end lg:justify-between">
            <Skeleton className="h-10 w-full sm:col-span-2 lg:max-w-sm" />
            <div className="flex flex-col gap-3 lg:w-48"><Skeleton className="h-5 max-w-20" /><Skeleton className="h-11" /></div>
            <div className="flex flex-col gap-3 lg:hidden"><Skeleton className="h-5 max-w-20" /><Skeleton className="h-11" /></div>
          </div>
          <div className="hidden flex-wrap gap-3 lg:flex">{[1, 2, 3, 4, 5, 6, 7].map(item => <Skeleton key={item} className="h-9 w-20" />)}</div>
        </div>
        <Skeleton className="h-4 w-40" />
        {[1, 2, 3].map(item => <div key={item} className="flex flex-col gap-4 border border-border p-5">
          <div className="flex items-center justify-between gap-4"><Skeleton className="h-6 w-40" /><Skeleton className="h-5 w-20" /></div>
          <Skeleton className="h-5 w-full max-w-md" /><Skeleton className="h-4 w-28" />
        </div>)}
      </main>
    </div>
  </div>;
}
