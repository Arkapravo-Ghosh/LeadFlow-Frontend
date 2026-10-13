import { connection } from "next/server";
import { apiRequest, resultOf } from "@/lib/server/api";
import { LeadWorkspace } from "../components/lead-workspace";
import type { LeadListData } from "../types";
import { ServiceError } from "../components/service-error";

/** Initial lead data is fetched privately and rendered for each incoming request. */
export async function Workspace() {
  await connection();
  const result = await resultOf(() => apiRequest<LeadListData>("/leads"));
  return result.ok ? <LeadWorkspace data={result.data} /> : <ServiceError message={result.message} />;
}
