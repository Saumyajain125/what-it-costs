import { SOURCES } from "@/lib/estimates";

export default function Methodology() {
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
                For each query, we start with a base water estimate (millilitres
                per query) drawn from peer-reviewed research — primarily{" "}
                <em>Making AI Less &ldquo;Thirsty&rdquo;</em> by Li et al.
                (2023), which quantified the freshwater footprint of large
                language model inference. We then add the water embedded in the
                electricity consumed by that query, using the regional Water
                Usage Effectiveness (WUE) factor for data centres.
              </p>
              <p>
                WUE measures how many litres of water a facility consumes per
                kilowatt-hour of IT energy. Typical values vary by climate and
                cooling strategy: the United States averages roughly 1.8 L/kWh,
                Europe around 1.2 L/kWh, broader Asia-Pacific regions about 2.1
                L/kWh, and India approximately 2.5 L/kWh — reflecting hotter,
                drier conditions where evaporative cooling is more common. This
                calculator applies the WUE for the region you select.
              </p>
              <p>
                The formula:{" "}
                <code className="rounded bg-slate-800 px-2 py-1 text-sm text-teal-300">
                  ml = (mlPerQuery × queries × typeMultiplier) + (kWh × queries
                  × typeMultiplier × WUE × 1000)
                </code>
              </p>
              <p>
                Query type multipliers account for how much extra compute
                different tasks require. A simple Q&amp;A uses the baseline (×1).
                Long-form essays and reports demand more tokens and GPU time
                (×2.5). Code generation sits between the two (×1.8). Image
                synthesis is the most intensive (×6), since generating pixels
                requires sustained high-power GPU workloads and proportionally
                more cooling.
              </p>
              <p>
                We distinguish two kinds of water use. <strong>Direct</strong>{" "}
                water is consumed on-site for evaporative cooling — water that
                evaporates from cooling towers and is lost from the local
                watershed. <strong>Indirect</strong> water is used upstream to
                generate the electricity powering the servers, especially at
                thermoelectric power plants. Both count toward the total
                freshwater footprint of an AI query.
              </p>
              <p>
                Training a large language model from scratch can consume
                millions of litres of water — orders of magnitude more than any
                single inference session. This tool measures{" "}
                <strong>inference only</strong> (the queries you run day to day),
                because that is what most users can control and because
                per-query inference estimates are better supported by published
                data. Training costs are a separate, much larger discussion.
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
          <a
            href="#calculator"
            className="inline-block rounded-full border border-teal-700 px-6 py-3 text-sm font-medium text-teal-300 transition-colors hover:border-teal-500 hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            Recalculate ↑
          </a>
        </div>
      </div>
    </section>
  );
}
