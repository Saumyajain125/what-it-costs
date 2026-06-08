import type { Metadata } from "next";
import CalculatorExperience from "@/components/CalculatorExperience";
import Hero from "@/components/Hero";
import Methodology from "@/components/Methodology";
import { calcWaterCost } from "@/lib/calculations";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import {
  hasCalculatorSearchParams,
  parseStateFromSearchParams,
} from "@/lib/url-state";

export const revalidate = 86400;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}): Promise<Metadata> {
  const params = await searchParams;

  if (!hasCalculatorSearchParams(params)) {
    return {};
  }

  const state = parseStateFromSearchParams(params);
  const { litresTotal } = calcWaterCost(state);
  const title = `~${litresTotal}L of water — ${SITE_NAME}`;
  const description = `This AI session used an estimated ${litresTotal} litres of freshwater for data centre cooling. ${SITE_DESCRIPTION}`;

  return {
    title: { absolute: title },
    description,
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: SITE_NAME,
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: "Estimated AI water usage",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
    alternates: {
      canonical: SITE_URL,
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialState = parseStateFromSearchParams(params);

  return (
    <main className="bg-ocean-dark">
      <Hero />
      <CalculatorExperience initialState={initialState} />
      <Methodology />
      <footer className="border-t border-teal-900/30 px-6 py-8 text-center text-sm text-slate-500">
        <p>{SITE_NAME} — AI water awareness tool. Estimates only.</p>
      </footer>
    </main>
  );
}
