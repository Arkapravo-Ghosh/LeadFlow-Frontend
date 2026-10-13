import type { Metadata } from "next";
import { LandingPage } from "@/features/marketing/components/landing-page";

export const metadata: Metadata = {
  title: "LeadFlow | Leads, conversations and follow-ups",
  description: "Keep your leads, discussion history and follow-up dates together. Create a private LeadFlow workspace and make your next step clear.",
};

export default function Home() {
  return <LandingPage />;
}
