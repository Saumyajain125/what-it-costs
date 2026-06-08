"use client";

import { useCallback, useMemo, useState } from "react";
import Calculator from "@/components/Calculator";
import GlobalScale from "@/components/GlobalScale";
import Results from "@/components/Results";
import { calcWaterCost } from "@/lib/calculations";
import type { CalculatorState } from "@/lib/calculator-state";

interface CalculatorExperienceProps {
  initialState: CalculatorState;
}

export default function CalculatorExperience({
  initialState,
}: CalculatorExperienceProps) {
  const [state, setState] = useState<CalculatorState>(initialState);

  const updateState = useCallback((newState: CalculatorState) => {
    setState(newState);
    const params = new URLSearchParams({
      model: newState.model,
      queryCount: String(newState.queryCount),
      queryType: newState.queryType,
      region: newState.region,
    });
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, []);

  const { mlTotal, litresTotal } = useMemo(
    () => calcWaterCost(state),
    [state]
  );

  return (
    <>
      <Calculator state={state} onChange={updateState} />
      <Results mlTotal={mlTotal} litresTotal={litresTotal} />
      <GlobalScale mlPerSession={mlTotal} queryCount={state.queryCount} />
    </>
  );
}
