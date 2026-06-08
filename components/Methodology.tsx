"use client";

import { SOURCES } from "@/lib/estimates";

export default function Methodology() {
  const scrollToCalculator = () => {
    document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-3xl font-bold text-off-white sm:text-4xl">
          How we calculate this
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-400">
          Transparency matters. Every number on this page comes from published
          research or disclosed corporate environmental reports — never from
          undisclosed internal data. Here is exactly how we arrive at your
          estimate.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-display text-xl font-semibold text-off-white">
              How we calculate
            </h3>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-slate-400">
              <p>
                For each query, we start with a base water estimate (ml per
                query) from peer-reviewed research, then add the water
                footprint of electricity consumed, using the regional Water
                Usage Effectiveness (WUE) factor for data centres.
              </p>
              <p>
                The formula:{" "}
                <code className="rounded bg-slate-800 px-2 py-1 text-sm text-teal-300">
                  ml = (mlPerQuery × queries × typeMultiplier) + (kWh × queries
                  × typeMultiplier × WUE × 1000)
                </code>
              </p>
              <p>
                Query type multipliers account for the extra compute required
                by long-form answers, code generation, and image synthesis.
                Regional WUE reflects how water-intensive cooling is in
                different parts of the world.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-xl font-semibold text-off-white">
              Sources
            </h3>
            <ul className="mt-4 space-y-4">
              {SOURCES.map((source) => (
                <li key={source.url}>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block rounded-lg border border-teal-900/50 bg-slate-900/50 p-4 transition-colors hover:border-teal-700"
                  >
                    <p className="font-medium text-teal-300 group-hover:text-teal-200">
                      {source.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {source.authors} ({source.year})
                    </p>
                    <p className="mt-2 text-xs text-slate-500">{source.note}</p>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 rounded-xl border border-amber-900/50 bg-amber-950/30 p-5">
          <p className="text-sm text-amber-200/90">
            <strong className="text-amber-200">Disclaimer:</strong> These are
            estimates. No AI company publicly discloses per-query water data.
            Every figure links to its source. Treat results as directional, not
            precise measurements.
          </p>
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={scrollToCalculator}
            className="rounded-full border border-teal-700 px-6 py-3 text-sm font-medium text-teal-300 transition-colors hover:border-teal-500 hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Recalculate ↑
          </button>
        </div>
      </div>
    </section>
  );
}
