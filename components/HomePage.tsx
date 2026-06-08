"use client";

import { useCallback, useMemo, useState } from "react";
import Calculator, { type CalculatorState } from "@/components/Calculator";
import GlobalScale from "@/components/GlobalScale";
import Hero from "@/components/Hero";
import Methodology from "@/components/Methodology";
import Results from "@/components/Results";
import { calcWaterCost } from "@/lib/calculations";

interface HomePageProps {
  initialState: CalculatorState;
}

export default function HomePage({ initialState }: HomePageProps) {
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
    <main className="bg-ocean-dark">
      <Hero />
      <Calculator state={state} onChange={updateState} />
      <Results mlTotal={mlTotal} litresTotal={litresTotal} />
      <GlobalScale mlPerSession={mlTotal} queryCount={state.queryCount} />
      <Methodology />
      <footer className="border-t border-teal-900/30 px-6 py-8 text-center text-sm text-slate-500">
        <p>What It Costs — AI water awareness tool. Estimates only.</p>
      </footer>
    </main>
  );
}
