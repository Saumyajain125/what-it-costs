import { generateOgResponse } from "@/lib/generate-og-response";

export const runtime = "edge";

export async function GET(request: Request) {
  return generateOgResponse(request);
}
