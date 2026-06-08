export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com";

export const SITE_NAME = "What It Costs";

export const SITE_DESCRIPTION =
  "Every AI query consumes freshwater for data centre cooling. Calculate how much water your ChatGPT, Claude, or Gemini usage costs — backed by peer-reviewed research.";

export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "en-US",
    },
    {
      "@type": "WebApplication",
      name: `${SITE_NAME} — AI Water Usage Calculator`,
      url: SITE_URL,
      description:
        "Calculate how much freshwater your AI usage consumes, based on peer-reviewed research on data centre water consumption.",
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
      browserRequirements: "Requires JavaScript",
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      author: {
        "@type": "Organization",
        name: SITE_NAME,
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "How much water does AI use per query?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Estimates vary by model and query type, but a typical ChatGPT session can consume hundreds of millilitres of freshwater when cooling and electricity-linked water use at data centres are combined.",
          },
        },
        {
          "@type": "Question",
          name: "How is the water cost calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We combine per-query water estimates from peer-reviewed research with regional Water Usage Effectiveness (WUE) factors for data centre cooling, adjusted by query type multipliers for long-form, code, and image generation workloads.",
          },
        },
        {
          "@type": "Question",
          name: "Are these AI water usage figures exact?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. These are transparent estimates based on published research. No AI company publicly discloses per-query water data, so results should be treated as directional rather than precise measurements.",
          },
        },
      ],
    },
  ],
};
