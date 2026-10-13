import Link from "next/link";
import { BrandLink } from "@/components/brand-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { features, steps } from "../content";
import { WorkspacePreview } from "./workspace-preview";

/** Public product introduction; no session or backend read is needed to visit. */
export function LandingPage() {
  return <div className="min-h-dvh bg-background text-foreground">
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-4">Skip to content</a>
    <header className="border-b border-border">
      <nav aria-label="Main navigation" className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <BrandLink />
        <div className="flex w-full items-center justify-between gap-2 sm:w-auto sm:justify-start sm:gap-3">
          <ThemeToggle /><Link href="/login" className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "px-2 sm:px-4")}>Sign in</Link>
          <Link href="/signup" className={cn(buttonVariants({ size: "sm" }), "px-3 sm:px-4")}>Create account</Link>
        </div>
      </nav>
    </header>
    <main id="main" className="mx-auto max-w-6xl px-5 sm:px-8">
      <section aria-labelledby="intro-title" className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="flex flex-col items-start gap-7">
          <p className="text-xs font-semibold tracking-widest text-primary uppercase">Less searching. More following through.</p>
          <h1 id="intro-title" className="max-w-xl text-[clamp(2rem,10vw,3rem)] leading-[1.06] font-semibold tracking-tight sm:text-6xl">Every lead.<br />Every conversation.<br /><span className="text-primary">One clear next step.</span></h1>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">LeadFlow keeps your leads, discussion history and follow-up dates together, so you can get back to the right person with the right context.</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
            <Link href="/signup" className={buttonVariants({ size: "lg" })}>Create your account</Link>
            <Link href="#how-it-works" className={buttonVariants({ variant: "outline", size: "lg" })}>See how it works</Link>
          </div>
          <p className="text-xs text-muted-foreground">Your own workspace. Start with a name and build from there.</p>
        </div>
        <WorkspacePreview />
      </section>
      <section aria-labelledby="features-title" className="border-t border-border py-14 sm:py-20">
        <div className="mb-10 flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">Built around the conversation</p>
          <h2 id="features-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">A little structure goes a long way.</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {features.map(feature => <article key={feature.number} className="flex flex-col gap-4 border-t border-border pt-6">
            <span className="text-sm font-medium text-primary">{feature.number}</span>
            <h3 className="text-xl font-semibold tracking-tight">{feature.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
          </article>)}
        </div>
      </section>
      <section id="how-it-works" aria-labelledby="steps-title" className="scroll-mt-8 border-t border-border py-14 sm:py-20">
        <h2 id="steps-title" className="mb-10 text-3xl font-semibold tracking-tight sm:text-4xl">From first hello to next follow-up.</h2>
        <ol className="grid gap-8 md:grid-cols-3">
          {steps.map((step, index) => <li key={step.title} className="flex gap-4">
            <span className="flex size-8 shrink-0 items-center justify-center border border-border text-sm font-medium">{index + 1}</span>
            <div className="flex flex-col gap-3"><h3 className="font-semibold">{step.title}</h3><p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p></div>
          </li>)}
        </ol>
      </section>
      <section aria-labelledby="start-title" className="mb-16 flex flex-col items-start justify-between gap-6 border border-border bg-muted p-7 sm:flex-row sm:items-center sm:p-10">
        <div className="flex flex-col gap-3"><h2 id="start-title" className="text-2xl font-semibold tracking-tight">Give your next conversation a home.</h2><p className="text-sm text-muted-foreground">Create an account and add your first lead.</p></div>
        <Link href="/signup" className={buttonVariants({ size: "lg" })}>Get started</Link>
      </section>
    </main>
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-5 px-5 py-7 sm:px-8">
        <BrandLink /><div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"><span>Keep the conversation moving.</span><Link href="/workspace" className="underline underline-offset-4">Open workspace</Link></div>
      </div>
    </footer>
  </div>;
}
