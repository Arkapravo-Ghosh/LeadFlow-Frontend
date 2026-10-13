import { Badge } from "@/components/ui/badge";
import { statusLabels } from "../status";
import type { LeadStatus } from "../types";

export function StatusBadge({ status }: { status: LeadStatus }) {
  return <Badge variant={status === "lost" ? "secondary" : "default"}>{statusLabels[status]}</Badge>;
}
