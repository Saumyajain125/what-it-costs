import type { ModelKey, QueryTypeKey, RegionKey } from "@/lib/estimates";

export interface CalculatorState {
  model: ModelKey;
  queryCount: number;
  queryType: QueryTypeKey;
  region: RegionKey;
}

export const DEFAULT_STATE: CalculatorState = {
  model: "gpt-4o",
  queryCount: 10,
  queryType: "simple",
  region: "us",
};
