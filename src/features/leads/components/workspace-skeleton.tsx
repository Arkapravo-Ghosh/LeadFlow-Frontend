import { Skeleton } from "@/components/ui/skeleton";

export function WorkspaceSkeleton() {
  return (
    <main aria-label="Loading leads" className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-6 py-12">
      <Skeleton className="h-12 w-52" />
      <Skeleton className="h-10 w-full" />
      {[1, 2, 3].map(item => <Skeleton key={item} className="h-32 w-full" />)}
    </main>
  );
}
