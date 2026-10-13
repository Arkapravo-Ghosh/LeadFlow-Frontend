"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";

const subscribe = () => () => undefined;

/** Keep SSR and hydration identical before reading the browser's theme. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  // The server snapshot also runs during hydration of streamed Suspense content.
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const ready = hydrated && Boolean(resolvedTheme);
  const dark = ready && resolvedTheme === "dark";
  const target = dark ? "light" : "dark";
  const label = ready ? `Switch to ${target} mode` : "Toggle color theme";

  return <Button variant="outline" size="icon" disabled={!ready}
    aria-label={label} title={label} onClick={() => setTheme(target)}>
    {ready ? (dark ? <RiSunLine /> : <RiMoonLine />) : <span className="size-4" aria-hidden />}
  </Button>;
}
