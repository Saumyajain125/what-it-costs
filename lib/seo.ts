export const SITE_URL = "https://yourdomain.com";

export const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "The Hidden Cost — AI Water Usage Calculator",
  url: SITE_URL,
  description:
    "Calculate how much freshwater your AI usage consumes, based on peer-reviewed research on data centre water consumption.",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: {
    "@type": "Organization",
    name: "The Hidden Cost",
  },
};
