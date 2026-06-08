import {
  MODEL_PROFILES,
  REGION_WUE,
  QUERY_TYPE_MULTIPLIER,
  type ModelKey,
  type QueryTypeKey,
  type RegionKey,
} from "./estimates";

export function calcWaterCost({
  model,
  queryCount,
  queryType,
  region,
}: {
  model: ModelKey;
  queryCount: number;
  queryType: QueryTypeKey;
  region: RegionKey;
}): { mlTotal: number; litresTotal: number } {
  const profile = MODEL_PROFILES[model];
  const wue = REGION_WUE[region].wue;
  const multiplier = QUERY_TYPE_MULTIPLIER[queryType].multiplier;

  const rawMl =
    profile.mlPerQuery * queryCount * multiplier +
    profile.kwhPerQuery * queryCount * multiplier * wue * 1000;
  const mlTotal = Math.round(rawMl);

  return {
    mlTotal,
    litresTotal: parseFloat((mlTotal / 1000).toFixed(2)),
  };
}

export function formatWaterAmount(mlTotal: number): string {
  if (mlTotal < 1000) {
    return `~${mlTotal}ml`;
  }
  return `~${parseFloat((mlTotal / 1000).toFixed(2))}L`;
}

export function getComparisons(mlTotal: number) {
  return [
    {
      icon: "💧",
      label: "Drinking glasses (250ml)",
      value: (mlTotal / 250).toFixed(1),
      unit: "glasses",
    },
    {
      icon: "🚿",
      label: "Fraction of a shower (60L)",
      value: ((mlTotal / 60000) * 100).toFixed(1),
      unit: "% of one shower",
    },
    {
      icon: "🌍",
      label: "Daily water for 1 person in water-stressed region (2L)",
      value: (mlTotal / 2000).toFixed(1),
      unit: "person's daily supply",
    },
    {
      icon: "📅",
      label: "If every day this month",
      value: ((mlTotal * 30) / 1000).toFixed(1),
      unit: "litres per month",
    },
  ];
}

export function getGlobalScale(mlPerSession: number) {
  const usersM = 100;
  const totalLitres = (mlPerSession * usersM * 1e6) / 1000;
  const olympicPools = totalLitres / 2_500_000;
  return {
    totalLitresFormatted: (totalLitres / 1e9).toFixed(1) + " billion litres",
    olympicPools: Math.round(olympicPools),
  };
}

export function mlToFillPercent(mlTotal: number, maxMl = 5000): number {
  return Math.min(100, (mlTotal / maxMl) * 100);
}
