export const MODEL_PROFILES = {
  "gpt-4o": {
    label: "ChatGPT (GPT-4o)",
    mlPerQuery: 50,
    kwhPerQuery: 0.001,
    source: "Li et al., UC Riverside, 2023",
  },
  "gpt-3.5": {
    label: "ChatGPT (GPT-3.5)",
    mlPerQuery: 10,
    kwhPerQuery: 0.0003,
    source: "Li et al., UC Riverside, 2023",
  },
  claude: {
    label: "Claude (Anthropic)",
    mlPerQuery: 30,
    kwhPerQuery: 0.0007,
    source: "Estimated from Anthropic data centre disclosures",
  },
  gemini: {
    label: "Gemini (Google)",
    mlPerQuery: 40,
    kwhPerQuery: 0.0009,
    source: "Google Environmental Report 2023",
  },
} as const;

export const REGION_WUE = {
  us: { label: "United States", wue: 1.8 },
  eu: { label: "Europe", wue: 1.2 },
  asia: { label: "Asia", wue: 2.1 },
  india: { label: "India", wue: 2.5 },
} as const;

export const QUERY_TYPE_MULTIPLIER = {
  simple: { label: "Simple Q&A", multiplier: 1.0 },
  longform: { label: "Long-form / essay", multiplier: 2.5 },
  image: { label: "Image generation", multiplier: 6.0 },
  code: { label: "Code generation", multiplier: 1.8 },
} as const;

export const SOURCES = [
  {
    title: 'Making AI Less "Thirsty"',
    authors: "Li et al., UC Riverside & UT Arlington",
    year: 2023,
    url: "https://arxiv.org/abs/2304.03271",
    note: "Primary source for per-query water estimates",
  },
  {
    title: "Google 2023 Environmental Report",
    authors: "Google LLC",
    year: 2023,
    url: "https://sustainability.google/reports/google-2023-environmental-report/",
    note: "Data centre WUE and total water withdrawal figures",
  },
  {
    title: "IEA — Data Centres and Data Transmission Networks",
    authors: "International Energy Agency",
    year: 2023,
    url: "https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks",
    note: "Global energy and water context",
  },
] as const;

export type ModelKey = keyof typeof MODEL_PROFILES;
export type RegionKey = keyof typeof REGION_WUE;
export type QueryTypeKey = keyof typeof QUERY_TYPE_MULTIPLIER;
