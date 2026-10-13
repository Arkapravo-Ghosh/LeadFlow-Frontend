import { apiRequest } from "@/lib/server/api";

export async function GET() {
  try {
    await apiRequest("/health");
    return Response.json({ status: "ok" });
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503 });
  }
}
