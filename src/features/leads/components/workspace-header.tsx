import type { ReactNode } from "react";
import { BrandLink } from "@/components/brand-link";

/** Reuse the same header geometry for the workspace and its loading state. */
export function WorkspaceHeader({ children }: { children: ReactNode }) {
  return <header className="border-b border-border">
    <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-5 py-6 sm:px-8">
      <BrandLink />
      <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start">{children}</div>
    </div>
  </header>;
}
