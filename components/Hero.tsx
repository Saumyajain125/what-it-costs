"use client";

import { motion, useReducedMotion } from "framer-motion";
import WaterDrop from "./WaterDrop";

const headline = ["Every", "answer", "costs", "water."];

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-20">
      <div className="absolute left-6 top-6">
        <span className="font-display text-lg font-semibold tracking-tight text-teal-400">
          What It Costs
        </span>
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-off-white sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="sr-only">Every answer costs water.</span>
          <span aria-hidden="true">
            {headline.map((word, i) => (
              <motion.span
                key={word}
                className="mr-[0.25em] inline-block"
                initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: prefersReducedMotion ? 0 : i * 0.12,
                  ease: "easeOut",
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          className="mt-6 text-lg italic text-slate-400 sm:text-xl"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.6 }}
        >
          AI isn&apos;t free — it just bills the planet.
        </motion.p>

        <motion.p
          className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-slate-400"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 0.8 }}
        >
          Every time you ask ChatGPT, Claude, or Gemini a question, data centres
          pull freshwater to keep servers cool. This tool estimates how much
          water your AI sessions consume — so you can see the hidden cost behind
          every answer.
        </motion.p>

        <motion.div
          className="mt-10 flex justify-center"
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: prefersReducedMotion ? 0 : 1 }}
        >
          <WaterDrop fillPercent={20} size={160} showLabel={false} />
        </motion.div>

        <motion.a
          href="#calculator"
          className="mt-10 inline-block rounded-full bg-teal-600 px-8 py-3 text-base font-medium text-white transition-colors hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2 focus:ring-offset-ocean-dark"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: prefersReducedMotion ? 0 : 1.2 }}
        >
          Calculate my usage →
        </motion.a>
      </div>
    </section>
  );
}
