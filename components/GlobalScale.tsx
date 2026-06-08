"use client";

import { useEffect, useRef, useState } from "react";
import { getGlobalScale } from "@/lib/calculations";

interface GlobalScaleProps {
  mlPerSession: number;
  queryCount: number;
}

export default function GlobalScale({ mlPerSession, queryCount }: GlobalScaleProps) {
  const { totalLitresFormatted, olympicPools } = getGlobalScale(mlPerSession);
  const poolRef = useRef<HTMLDivElement>(null);
  const [poolWidth, setPoolWidth] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = poolRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          requestAnimationFrame(() => setPoolWidth(100));
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section id="global-scale" className="px-6 py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-3xl font-bold text-off-white sm:text-4xl">
          At global scale
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-400">
          Your session is one drop. But hundreds of millions of people use AI
          every day. When you multiply a single session&apos;s water cost across
          the entire user base, the numbers become impossible to ignore.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-teal-900/50 bg-slate-900/80 p-5 text-center">
            <p className="font-display text-3xl font-bold text-electric-blue">
              100M
            </p>
            <p className="mt-2 text-sm text-slate-400">daily AI users (est.)</p>
          </div>
          <div className="rounded-xl border border-teal-900/50 bg-slate-900/80 p-5 text-center">
            <p className="font-display text-3xl font-bold text-electric-blue">
              {(mlPerSession / 1000).toFixed(2)}L
            </p>
            <p className="mt-2 text-sm text-slate-400">avg water per session</p>
          </div>
          <div className="rounded-xl border border-teal-900/50 bg-slate-900/80 p-5 text-center">
            <p className="font-display text-3xl font-bold text-electric-blue">
              3×
            </p>
            <p className="mt-2 text-sm text-slate-400">YoY growth in AI usage</p>
          </div>
        </div>

        <div ref={poolRef} className="mt-12">
          <div className="relative h-16 overflow-hidden rounded-xl border border-teal-900 bg-slate-900">
            <div
              className="absolute bottom-0 left-0 top-0 bg-gradient-to-r from-teal-600 to-electric-blue transition-[width] duration-[3000ms] ease-out"
              style={{ width: `${poolWidth}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-lg font-semibold text-off-white drop-shadow-lg">
                {olympicPools.toLocaleString()} Olympic swimming pools
              </span>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-slate-400">
            {olympicPools.toLocaleString()} Olympic swimming pools — if 100M users
            each send {queryCount} queries today ({totalLitresFormatted}).
          </p>
        </div>

        <p className="mt-8 text-center text-base leading-relaxed text-slate-400">
          That&apos;s freshwater pulled from rivers and aquifers — not recycled
          greywater — to cool the servers that power your answers.
        </p>
      </div>
    </section>
  );
}
