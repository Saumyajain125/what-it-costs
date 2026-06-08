"use client";

import { useCallback, useMemo, useState } from "react";
import Calculator from "@/components/Calculator";
import GlobalScale from "@/components/GlobalScale";
import Results from "@/components/Results";
import { calcWaterCost } from "@/lib/calculations";
import type { CalculatorState } from "@/lib/calculator-state";
import { stateToSearchParams } from "@/lib/og-url";

interface CalculatorExperienceProps {
  initialState: CalculatorState;
}

export default function CalculatorExperience({
  initialState,
}: CalculatorExperienceProps) {
  const [state, setState] = useState<CalculatorState>(initialState);

  const updateState = useCallback((newState: CalculatorState) => {
    setState(newState);
    window.history.replaceState(
      null,
      "",
      `?${stateToSearchParams(newState).toString()}`
    );
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
