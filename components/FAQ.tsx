import { FAQ_ITEMS } from "@/lib/faq";

export default function FAQ() {
  return (
    <section id="faq" className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="font-display text-3xl font-bold text-off-white sm:text-4xl">
          Frequently asked questions
        </h2>
        <p className="mt-4 text-base leading-relaxed text-slate-400">
          Common questions about AI water usage, data centre cooling, and how
          this calculator estimates your footprint.
        </p>

        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((item) => (
            <details
              key={item.question}
              className="group rounded-xl border border-teal-900/50 bg-slate-900/50 open:border-teal-700/60"
            >
              <summary className="cursor-pointer list-none px-5 py-4 font-medium text-off-white transition-colors hover:text-teal-200 [&::-webkit-details-marker]:hidden">
                <span className="flex items-center justify-between gap-4">
                  {item.question}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-teal-400 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </span>
              </summary>
              <div className="border-t border-teal-900/30 px-5 pb-5 pt-4">
                <p className="text-base leading-relaxed text-slate-400">
                  {item.answer}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
