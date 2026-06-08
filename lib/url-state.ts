import type { CalculatorState } from "@/components/Calculator";
import type { ModelKey, QueryTypeKey, RegionKey } from "@/lib/estimates";

export const DEFAULT_STATE: CalculatorState = {
  model: "gpt-4o",
  queryCount: 10,
  queryType: "simple",
  region: "us",
};

function isValidModel(v: string | undefined): v is ModelKey {
  return v === "gpt-4o" || v === "gpt-3.5" || v === "claude" || v === "gemini";
}

function isValidQueryType(v: string | undefined): v is QueryTypeKey {
  return v === "simple" || v === "longform" || v === "image" || v === "code";
}

function isValidRegion(v: string | undefined): v is RegionKey {
  return v === "us" || v === "eu" || v === "asia" || v === "india";
}

export function parseStateFromSearchParams(
  params: Record<string, string | string[] | undefined>
): CalculatorState {
  const model = typeof params.model === "string" ? params.model : undefined;
  const queryCount =
    typeof params.queryCount === "string" ? params.queryCount : undefined;
  const queryType =
    typeof params.queryType === "string" ? params.queryType : undefined;
  const region = typeof params.region === "string" ? params.region : undefined;

  return {
    model: isValidModel(model) ? model : DEFAULT_STATE.model,
    queryCount: queryCount
      ? Math.min(
          200,
          Math.max(1, parseInt(queryCount, 10) || DEFAULT_STATE.queryCount)
        )
      : DEFAULT_STATE.queryCount,
    queryType: isValidQueryType(queryType)
      ? queryType
      : DEFAULT_STATE.queryType,
    region: isValidRegion(region) ? region : DEFAULT_STATE.region,
  };
}
