"use client";

import {
  MODEL_PROFILES,
  QUERY_TYPE_MULTIPLIER,
  REGION_WUE,
  type ModelKey,
  type QueryTypeKey,
  type RegionKey,
} from "@/lib/estimates";

export interface CalculatorState {
  model: ModelKey;
  queryCount: number;
  queryType: QueryTypeKey;
  region: RegionKey;
}

interface CalculatorProps {
  state: CalculatorState;
  onChange: (state: CalculatorState) => void;
}

export default function Calculator({ state, onChange }: CalculatorProps) {
  const update = (partial: Partial<CalculatorState>) => {
    onChange({ ...state, ...partial });
  };

  return (
    <section id="calculator" className="px-6 py-20">
      <div className="mx-auto max-w-2xl">
        <h2 className="font-display text-3xl font-bold text-off-white sm:text-4xl">
          How much water did your AI session use?
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-400">
          Adjust the inputs below to match your typical AI usage. The calculator
          combines per-query water estimates from peer-reviewed research with
          regional data centre cooling efficiency to produce a transparent
          estimate — updated live as you change each setting.
        </p>

        <div className="mt-10 space-y-8 rounded-2xl border border-teal-900 bg-slate-900 p-6 sm:p-8">
          <div>
            <label
              htmlFor="model-select"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              AI Model
            </label>
            <select
              id="model-select"
              value={state.model}
              onChange={(e) => update({ model: e.target.value as ModelKey })}
              className="w-full rounded-lg border border-teal-900 bg-slate-800 px-4 py-3 text-off-white focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              {Object.entries(MODEL_PROFILES).map(([key, profile]) => (
                <option key={key} value={key}>
                  {profile.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="query-slider"
                className="text-sm font-medium text-slate-300"
              >
                Number of queries
              </label>
              <span className="font-mono text-lg font-semibold text-electric-blue">
                {state.queryCount}
              </span>
            </div>
            <input
              id="query-slider"
              type="range"
              min={1}
              max={200}
              step={1}
              value={state.queryCount}
              onChange={(e) =>
                update({ queryCount: parseInt(e.target.value, 10) })
              }
              aria-label="Number of AI queries"
              aria-valuemin={1}
              aria-valuemax={200}
              aria-valuenow={state.queryCount}
              className="w-full accent-teal-500"
            />
            <div className="mt-1 flex justify-between text-xs text-slate-500">
              <span>1</span>
              <span>200</span>
            </div>
          </div>

          <div>
            <span className="mb-3 block text-sm font-medium text-slate-300">
              Query type
            </span>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Query type">
              {(
                Object.entries(QUERY_TYPE_MULTIPLIER) as [
                  QueryTypeKey,
                  (typeof QUERY_TYPE_MULTIPLIER)[QueryTypeKey],
                ][]
              ).map(([key, { label }]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => update({ queryType: key })}
                  aria-pressed={state.queryType === key}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    state.queryType === key
                      ? "bg-teal-600 text-white"
                      : "border border-teal-900 text-slate-400 hover:border-teal-700 hover:text-off-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="mb-3 block text-sm font-medium text-slate-300">
              Data centre region
            </span>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Data centre region">
              {(
                Object.entries(REGION_WUE) as [
                  RegionKey,
                  (typeof REGION_WUE)[RegionKey],
                ][]
              ).map(([key, { label }]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => update({ region: key })}
                  aria-pressed={state.region === key}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    state.region === key
                      ? "bg-teal-600 text-white"
                      : "border border-teal-900 text-slate-400 hover:border-teal-700 hover:text-off-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
