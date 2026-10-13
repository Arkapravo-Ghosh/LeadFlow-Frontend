"use client";

import { useTheme } from "next-themes";
import { RiMoonLine, RiSunLine } from "@remixicon/react";
import { Button } from "@/components/ui/button";

/** Use the preset's existing light/dark tokens and persist the user's choice. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const dark = resolvedTheme === "dark";
  return <Button variant="outline" size="icon" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    title={dark ? "Switch to light mode" : "Switch to dark mode"}
    onClick={() => setTheme(dark ? "light" : "dark")}>
    {dark ? <RiSunLine /> : <RiMoonLine />}
  </Button>;
}
