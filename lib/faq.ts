export const FAQ_ITEMS = [
  {
    question: "How much water does AI use per query?",
    answer:
      "Peer-reviewed research estimates that a single ChatGPT-style query can consume roughly 10–50 millilitres of freshwater when you combine direct data centre cooling with the water embedded in the electricity that powers the servers. The exact figure depends on the model (larger models use more compute), the type of task (a short answer vs. code or image generation), and where the data centre is located. This tool uses published per-query estimates from Li et al. (2023) as a baseline, then adjusts for your inputs.",
  },
  {
    question: "Which AI model uses the most water?",
    answer:
      "Among the models in this calculator, GPT-4o-class systems generally carry the highest per-query water footprint because they require more compute and electricity per response. GPT-3.5-style models are lighter, while Claude and Gemini sit in between based on disclosed environmental data and published estimates. Image-generation workloads can dwarf text-only queries regardless of model, since synthesising pixels demands far more GPU time and cooling load than a brief text reply.",
  },
  {
    question: "Why do data centres use water?",
    answer:
      "AI models run on dense clusters of GPUs and CPUs that generate enormous heat. Data centres must remove that heat continuously to prevent hardware failure. Many facilities use evaporative cooling — essentially allowing water to evaporate off cooling towers or similar systems — which is energy-efficient but consumes freshwater directly. Even centres that rely on air cooling still draw water indirectly through the power grid, because thermoelectric power plants use water for cooling and steam generation.",
  },
  {
    question: "Is AI water usage a real environmental concern?",
    answer:
      "Yes. Global data centre water withdrawal is already measured in billions of litres per year, and AI workloads are growing faster than general internet traffic. Water stress is acute in regions such as the western United States, parts of India, and other areas where major cloud providers operate large campuses. While any single query is small, billions of daily queries aggregate into meaningful freshwater demand — often in places already facing drought or groundwater depletion.",
  },
  {
    question: "How does data centre region affect AI water usage?",
    answer:
      "Region matters because of Water Usage Effectiveness (WUE) — the litres of water consumed per kilowatt-hour of IT energy at a facility. Hot, dry climates tend to rely more heavily on evaporative cooling and therefore have higher WUE values. A query routed through a US data centre (~1.8 L/kWh) will carry a different water footprint than the same query in Europe (~1.2) or India (~2.5). This calculator applies regional WUE multipliers so you can see how geography changes the hidden cost of the same prompt.",
  },
  {
    question: "What is WUE (Water Usage Effectiveness)?",
    answer:
      "Water Usage Effectiveness (WUE) is a data centre sustainability metric defined as total facility water consumption divided by IT equipment energy use, expressed as litres per kilowatt-hour (L/kWh). A WUE of 1.8 means the site uses 1.8 litres of water for every kilowatt-hour of compute power. Lower WUE is better. Operators report WUE in environmental disclosures; researchers use it to compare cooling efficiency across regions and to estimate the water embedded in cloud workloads such as large language model inference.",
  },
] as const;
