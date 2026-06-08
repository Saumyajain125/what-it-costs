import type { CalculatorState } from "@/lib/calculator-state";

export function stateToSearchParams(state: CalculatorState): URLSearchParams {
  return new URLSearchParams({
    model: state.model,
    queryCount: String(state.queryCount),
    queryType: state.queryType,
    region: state.region,
  });
}

export function buildOgImageUrl(state: CalculatorState): string {
  return `/api/og?${stateToSearchParams(state).toString()}`;
}
