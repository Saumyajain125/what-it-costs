import type { CalculatorState } from "@/lib/calculator-state";
import { SITE_URL } from "@/lib/seo";

export function stateToSearchParams(state: CalculatorState): URLSearchParams {
  return new URLSearchParams({
    model: state.model,
    queryCount: String(state.queryCount),
    queryType: state.queryType,
    region: state.region,
  });
}

export function buildOgImageUrl(state: CalculatorState): string {
  return `${SITE_URL}/api/og?${stateToSearchParams(state).toString()}`;
}
