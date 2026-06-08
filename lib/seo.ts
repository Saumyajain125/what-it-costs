import { FAQ_ITEMS } from "@/lib/faq";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://whatitcosts.vercel.app";

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
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
};
