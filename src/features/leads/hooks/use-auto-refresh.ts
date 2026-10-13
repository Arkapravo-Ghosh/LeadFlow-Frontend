"use client";

import { useEffect, useTransition } from "react";
import { useRouter } from "next/navigation";

/** Reconcile time-dependent reminders without remounting views or clearing drafts. */
export function useAutoRefresh() {
  const router = useRouter();
  const [, startTransition] = useTransition();
  useEffect(() => {
    const refresh = () => {
      if (document.visibilityState === "visible") startTransition(() => router.refresh());
    };
    const timer = window.setInterval(refresh, 60000);
    window.addEventListener("focus", refresh);
    return () => { window.clearInterval(timer); window.removeEventListener("focus", refresh); };
  }, [router]);
}
