"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { formatWaterAmount, getComparisons } from "@/lib/calculations";
import { SITE_NAME } from "@/lib/seo";
import ComparisonCard from "./ComparisonCard";
import WaterDrop from "./WaterDrop";
import { mlToFillPercent } from "@/lib/calculations";

interface ResultsProps {
  mlTotal: number;
  litresTotal: number;
}

export default function Results({ mlTotal, litresTotal }: ResultsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [shareStatus, setShareStatus] = useState<"idle" | "copied" | "shared">(
    "idle"
  );
  const comparisons = getComparisons(mlTotal);
  const fillPercent = mlToFillPercent(mlTotal);
  const monthlyLitres = ((mlTotal * 30) / 1000).toFixed(1);

  const shareTitle = `~${litresTotal}L of water — ${SITE_NAME}`;
  const shareText = `My AI session used an estimated ${litresTotal} litres of freshwater for data centre cooling.`;

  const handleShare = async () => {
    const url = window.location.href;

    try {
      if (typeof navigator.share === "function") {
        await navigator.share({ title: shareTitle, text: shareText, url });
        setShareStatus("shared");
      } else {
        await navigator.clipboard.writeText(url);
        setShareStatus("copied");
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }

      try {
        await navigator.clipboard.writeText(url);
        setShareStatus("copied");
      } catch {
        /* clipboard unavailable */
      }
    }

    window.setTimeout(() => setShareStatus("idle"), 2500);
  };

  const shareLabel =
    shareStatus === "copied"
      ? "Link copied!"
      : shareStatus === "shared"
        ? "Shared!"
        : "Share this result";

  if (mlTotal <= 0) return null;

  return (
    <AnimatePresence>
      <motion.section
        initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
        className="px-6 pt-20 pb-8"
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-3xl font-bold text-off-white sm:text-4xl">
            Your session&apos;s water footprint
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">
            Based on your inputs, here is an estimated freshwater cost for this
            AI session. These figures combine direct cooling water and
            electricity-linked water use at data centres in your selected
            region — presented in terms you can actually feel.
          </p>

          <div className="mt-10 flex flex-col items-center gap-8 sm:flex-row sm:items-start sm:justify-center">
            <WaterDrop fillPercent={fillPercent} size={180} showLabel={false} />
            <div className="text-center sm:text-left">
              <p className="font-display text-5xl font-bold text-coral sm:text-6xl">
                {formatWaterAmount(mlTotal)}
              </p>
              <p className="mt-2 text-lg text-slate-400">
                estimated for your session
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {comparisons.map((c) => (
              <ComparisonCard key={c.label} {...c} />
            ))}
          </div>

          <div className="mt-8 rounded-xl border border-amber-900/50 bg-amber-950/30 p-5">
            <p className="text-sm font-medium text-amber-200">
              Monthly projection
            </p>
            <p className="mt-2 text-base text-amber-100/80">
              If you ran this same session every day for a month, you&apos;d
              consume approximately{" "}
              <strong className="text-amber-200">{monthlyLitres} litres</strong>{" "}
              of freshwater — just from AI queries.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleShare}
              aria-live="polite"
              className="rounded-full border border-teal-700 px-6 py-3 text-sm font-medium text-teal-300 transition-colors hover:border-teal-500 hover:text-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              {shareLabel}
            </button>
            <a
              href="#global-scale"
              className="rounded-full bg-teal-600 px-6 py-3 text-center text-sm font-medium text-white transition-colors hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              See the global picture ↓
            </a>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
