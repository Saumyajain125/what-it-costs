# Cursor Prompt — AI Water Cost Awareness Tool

---

## Project overview

Build a single-page awareness tool called **"The Hidden Cost"** (working title) that helps people understand how much freshwater is consumed by AI queries. The tool is estimation-based (not real-time metered), transparent about its methodology, and designed to create an emotional moment — not just show a number.

The stack is **Next.js 14 App Router + TypeScript + Tailwind CSS**, hosted on Vercel. No backend, no auth, no database. All state is client-side. All data is hardcoded research estimates.

---

## Aesthetic direction

**Dark, editorial, water-themed.** Think deep ocean blues and teals against a near-black background. Typography should feel like a long-read magazine — weighty, serious, not a SaaS dashboard. One large display font for headlines, a clean serif or sans for body. Avoid generic AI purple gradients entirely.

- Background: near-black (`#0a0f14`)
- Accent: deep teal (`#0d9488`) and electric blue (`#38bdf8`)
- Text: off-white (`#e2e8f0`) and muted slate (`#94a3b8`)
- Danger/impact: a warm coral (`#fb7185`) for the big cost numbers
- Font pairing suggestion: `Fraunces` (display) + `Inter` or `DM Sans` (body) — load from Google Fonts

The one thing someone should remember: **a slowly filling water drop animation** that reacts to the calculator inputs in real time.

---

## File structure

```
/app
  layout.tsx          ← root layout with metadata, OG tags, JSON-LD
  page.tsx            ← single page, imports all sections
  globals.css
/components
  Hero.tsx
  Calculator.tsx
  Results.tsx
  GlobalScale.tsx
  Methodology.tsx
  WaterDrop.tsx       ← animated SVG water drop (reusable)
  ComparisonCard.tsx
/lib
  estimates.ts        ← all water cost data, WUE factors, sources
  calculations.ts     ← pure functions: calcWaterCost(), getComparisons()
  seo.ts              ← metadata helpers, JSON-LD generators
/public
  og-image.png        ← static OG image (1200×630), dark themed
```

---

## Section-by-section instructions

### 1. `layout.tsx` — SEO foundation (build this first)

This is the most important SEO file. Include everything here:

```tsx
export const metadata: Metadata = {
  title: 'The Hidden Cost | How Much Water Does AI Use?',
  description:
    'Every AI query consumes freshwater for data centre cooling. Calculate how much water your ChatGPT, Claude, or Gemini usage costs — backed by peer-reviewed research.',
  keywords: [
    'AI water usage',
    'ChatGPT water consumption',
    'AI environmental impact',
    'data centre water use',
    'AI carbon footprint',
    'how much water does AI use',
    'LLM water cost',
    'AI sustainability',
  ],
  authors: [{ name: 'The Hidden Cost' }],
  openGraph: {
    title: 'The Hidden Cost — AI Isn\'t Free. It Bills the Planet.',
    description:
      'Every answer has a price. Calculate the freshwater cost of your AI usage.',
    url: 'https://yourdomain.com',
    siteName: 'The Hidden Cost',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'A water drop filling up as you type AI queries',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Hidden Cost | AI Water Usage Calculator',
    description:
      'Your ChatGPT session used ~500ml of water. Calculate yours.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: 'https://yourdomain.com',
  },
};
```

Also add a `<link rel="icon">` referencing a water drop favicon.

### 2. `lib/estimates.ts` — data layer

All estimates live here. No magic numbers in components.

```ts
export const MODEL_PROFILES = {
  'gpt-4o': {
    label: 'ChatGPT (GPT-4o)',
    mlPerQuery: 50,        // ml per single query, mid estimate
    kwhPerQuery: 0.001,    // kWh
    source: 'Li et al., UC Riverside, 2023',
  },
  'gpt-3.5': {
    label: 'ChatGPT (GPT-3.5)',
    mlPerQuery: 10,
    kwhPerQuery: 0.0003,
    source: 'Li et al., UC Riverside, 2023',
  },
  'claude': {
    label: 'Claude (Anthropic)',
    mlPerQuery: 30,        // estimated, Anthropic does not disclose
    kwhPerQuery: 0.0007,
    source: 'Estimated from Anthropic data centre disclosures',
  },
  'gemini': {
    label: 'Gemini (Google)',
    mlPerQuery: 40,
    kwhPerQuery: 0.0009,
    source: 'Google Environmental Report 2023',
  },
};

export const REGION_WUE = {
  'us': { label: 'United States', wue: 1.8 },   // litres per kWh
  'eu': { label: 'Europe',        wue: 1.2 },
  'asia': { label: 'Asia',        wue: 2.1 },
  'india': { label: 'India',      wue: 2.4 },
};

export const QUERY_TYPE_MULTIPLIER = {
  simple:    { label: 'Simple Q&A',       multiplier: 1.0 },
  longform:  { label: 'Long-form / essay', multiplier: 2.5 },
  image:     { label: 'Image generation', multiplier: 6.0 },
  code:      { label: 'Code generation',  multiplier: 1.8 },
};

export const SOURCES = [
  {
    title: 'Making AI Less "Thirsty"',
    authors: 'Li et al., UC Riverside & UT Arlington',
    year: 2023,
    url: 'https://arxiv.org/abs/2304.03271',
    note: 'Primary source for per-query water estimates',
  },
  {
    title: 'Google 2023 Environmental Report',
    authors: 'Google LLC',
    year: 2023,
    url: 'https://sustainability.google/reports/google-2023-environmental-report/',
    note: 'Data centre WUE and total water withdrawal figures',
  },
  {
    title: 'IEA — Data Centres and Data Transmission Networks',
    authors: 'International Energy Agency',
    year: 2023,
    url: 'https://www.iea.org/energy-system/buildings/data-centres-and-data-transmission-networks',
    note: 'Global energy and water context',
  },
];
```

### 3. `lib/calculations.ts` — pure functions

```ts
import { MODEL_PROFILES, REGION_WUE, QUERY_TYPE_MULTIPLIER } from './estimates';

export function calcWaterCost({
  model, queryCount, queryType, region,
}: {
  model: keyof typeof MODEL_PROFILES;
  queryCount: number;
  queryType: keyof typeof QUERY_TYPE_MULTIPLIER;
  region: keyof typeof REGION_WUE;
}): { mlTotal: number; litresTotal: number } {
  const profile = MODEL_PROFILES[model];
  const wue = REGION_WUE[region].wue;
  const multiplier = QUERY_TYPE_MULTIPLIER[queryType].multiplier;

  const mlTotal = profile.mlPerQuery * queryCount * multiplier
                + profile.kwhPerQuery * queryCount * multiplier * wue * 1000;

  return {
    mlTotal: Math.round(mlTotal),
    litresTotal: parseFloat((mlTotal / 1000).toFixed(2)),
  };
}

export function getComparisons(mlTotal: number) {
  return [
    {
      icon: '💧',
      label: 'Drinking glasses (250ml)',
      value: (mlTotal / 250).toFixed(1),
      unit: 'glasses',
    },
    {
      icon: '🚿',
      label: 'Fraction of a shower (60L)',
      value: ((mlTotal / 60000) * 100).toFixed(1),
      unit: '% of one shower',
    },
    {
      icon: '🌍',
      label: 'Daily water for 1 person in water-stressed region (2L)',
      value: (mlTotal / 2000).toFixed(1),
      unit: "person's daily supply",
    },
    {
      icon: '📅',
      label: 'If every day this month',
      value: ((mlTotal * 30) / 1000).toFixed(1),
      unit: 'litres per month',
    },
  ];
}

export function getGlobalScale(mlPerSession: number) {
  const usersM = 100; // 100 million assumed daily active
  const totalLitres = (mlPerSession * usersM * 1e6) / 1000;
  const olympicPools = totalLitres / 2_500_000;
  return {
    totalLitresFormatted: (totalLitres / 1e9).toFixed(1) + ' billion litres',
    olympicPools: Math.round(olympicPools),
  };
}
```

### 4. `components/Hero.tsx`

- Full-viewport dark section
- Large `Fraunces` display headline: **"Every answer costs water."**
- Subline: *"AI isn't free — it just bills the planet."*
- Below: a slowly animating `WaterDrop` SVG component, starting at ~20% fill
- Single CTA button: "Calculate my usage →" — scrolls to `#calculator`
- No nav bar needed. Just the logo/wordmark top-left.

Animate the headline in on mount using Framer Motion (`opacity: 0 → 1`, `y: 20 → 0`, staggered per word). Keep it subtle.

### 5. `components/Calculator.tsx`

Four inputs in a dark card (`bg-slate-900` border `border-teal-900`):

1. **Model dropdown** — maps to `MODEL_PROFILES` keys
2. **Query count slider** — range 1–200, step 1, default 10, live numeric label beside it
3. **Query type** — pill/chip selector (not a dropdown), 4 options from `QUERY_TYPE_MULTIPLIER`
4. **Region** — pill selector, 4 options from `REGION_WUE`

All four inputs are controlled React state. The result is calculated live on every change — no submit button needed (remove the CTA button from the original flow; live calculation is better UX).

Pass the result up via a callback or shared state (use `useState` lifted to `page.tsx`).

### 6. `components/WaterDrop.tsx`

An SVG water drop where the fill level is a prop (`fillPercent: number`, 0–100).

- Drop outline: a `<path>` in teal/blue
- Fill: a `<clipPath>` + animated `<rect>` that rises from bottom based on `fillPercent`
- Animate fill changes with a CSS transition (`transition: height 0.6s ease`)
- The fill colour transitions from teal (low) to coral/red (high) via interpolated hex
- Show the litre amount as text centred inside the drop

This component is used in both the Hero (decorative, slow drift) and Results (live, reactive).

### 7. `components/Results.tsx`

Only renders when `mlTotal > 0`. Animate in with Framer Motion (`AnimatePresence`).

Layout:
- Top: large coral number — `~{litresTotal}L` — with label "estimated for your session"
- Below: 2×2 grid of `ComparisonCard` components
- Below that: monthly projection in an amber-tinted callout box
- CTA row: "Share this result" (copies URL with params) | "See the global picture ↓"

For "Share this result": encode inputs as URL search params so the result is shareable and linkable. This also helps SEO via unique URLs.

### 8. `components/GlobalScale.tsx`

- Three stat cards: total daily AI users, avg water per session, YoY growth
- Below: an animated "pool filling" visualisation. Use a simple SVG rectangle that animates width from 0 to full over ~3 seconds when scrolled into view (use `IntersectionObserver`). Label it "X Olympic swimming pools — if 100M users each send 10 queries today."
- Keep the copy punchy. One paragraph max.

### 9. `components/Methodology.tsx`

- Two-column layout: "How we calculate" (formula prose) + "Sources" (linked list)
- Amber disclaimer box: "These are estimates. No AI company publicly discloses per-query water data. Every figure links to its source."
- Each source in `SOURCES` renders as a linked citation with author, year, and note
- "Recalculate ↑" button scrolls back to `#calculator`

---

## SEO — beyond metadata

### JSON-LD structured data (add to `layout.tsx` or `page.tsx`)

```tsx
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'The Hidden Cost — AI Water Usage Calculator',
  url: 'https://yourdomain.com',
  description:
    'Calculate how much freshwater your AI usage consumes, based on peer-reviewed research on data centre water consumption.',
  applicationCategory: 'UtilityApplication',
  operatingSystem: 'Web',
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  author: {
    '@type': 'Organization',
    name: 'The Hidden Cost',
  },
};

// In your <head>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

### `sitemap.xml` — add `app/sitemap.ts`

```ts
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];
}
```

### `robots.txt` — add `app/robots.ts`

```ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://yourdomain.com/sitemap.xml',
  };
}
```

### URL-encoded results (shareable + crawlable)

When the user changes any input, update the URL silently:

```ts
const params = new URLSearchParams({ model, queryCount: String(queryCount), queryType, region });
window.history.replaceState(null, '', `?${params.toString()}`);
```

On mount, read params and pre-fill the calculator. This means shared links land on a pre-calculated result — good for social and for indexing.

### Content SEO — copy guidelines

Write the section headings as proper `<h1>`, `<h2>`, `<h3>` tags, not styled divs:

- `<h1>` — "Every answer costs water." (Hero, one per page)
- `<h2>` — "How much water did your AI session use?" (Calculator)
- `<h2>` — "Your session's water footprint" (Results)
- `<h2>` — "At global scale" (Global Scale)
- `<h2>` — "How we calculate this" (Methodology)

Add a short paragraph of body text in each section (minimum 40 words) — not just numbers and cards. Google crawls text, not components. This body copy is what gets the tool ranking for "how much water does ChatGPT use."

### `next.config.ts` — performance

```ts
const config = {
  images: { formats: ['image/avif', 'image/webp'] },
  experimental: { optimizeCss: true },
};
```

Enable `compression` and set `Cache-Control` headers on static assets via Vercel's `vercel.json`:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

---

## Accessibility

- All interactive elements keyboard navigable
- Sliders have `aria-label` and `aria-valuenow`
- Water drop SVG has `role="img"` and `aria-label="Water drop showing X% fill"`
- Colour contrast ratio ≥ 4.5:1 for all text (check teal on dark bg carefully)
- `prefers-reduced-motion` media query: disable Framer Motion animations when set

---

## What NOT to build

- No login, no database, no API routes
- No cookie banners (no tracking — keep it clean)
- No social media embeds (they add load time and tracking)
- Do not add a "dark mode toggle" — the tool IS dark mode
- Do not use `create-react-app` or Pages Router — App Router only

---

## Build order

1. `lib/estimates.ts` and `lib/calculations.ts` — get the math right first
2. `layout.tsx` with full metadata and JSON-LD
3. `app/sitemap.ts` and `app/robots.ts`
4. `WaterDrop.tsx` — the core visual, used everywhere
5. `Hero.tsx` → `Calculator.tsx` → `Results.tsx` in sequence
6. `GlobalScale.tsx` → `Methodology.tsx`
7. Wire up URL param sharing in `page.tsx`
8. OG image — design a static `og-image.png` (dark, water drop, headline)

---

## Definition of done

- Lighthouse score ≥ 90 on Performance, Accessibility, Best Practices, SEO
- Shareable URLs that pre-fill the calculator and show the result
- Every estimate links to its source paper
- The water drop animates live as inputs change
- Mobile-responsive (single-column stack on < 640px)
- No console errors or TypeScript errors