"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export function ServiceError({ message }: { message: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  return (
    <main className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-6 py-16">
      <h1 className="text-2xl font-semibold">LeadFlow</h1>
      <Alert variant="destructive">
        <AlertTitle>We couldn’t load your leads</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
      <Button className="w-fit" disabled={pending}
        onClick={() => startTransition(() => router.refresh())}>
        {pending ? "Retrying…" : "Try again"}
      </Button>
    </main>
  );
}
