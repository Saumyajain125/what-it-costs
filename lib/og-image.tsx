import { mlToFillPercent } from "@/lib/calculations";
import {
  MODEL_PROFILES,
  QUERY_TYPE_MULTIPLIER,
  REGION_WUE,
  type ModelKey,
  type QueryTypeKey,
  type RegionKey,
} from "@/lib/estimates";
import { SITE_NAME } from "@/lib/seo";

function interpolateFillColor(percent: number): string {
  const low = { r: 13, g: 148, b: 136 };
  const high = { r: 251, g: 113, b: 133 };
  const t = Math.min(1, percent / 100);
  const r = Math.round(low.r + (high.r - low.r) * t);
  const g = Math.round(low.g + (high.g - low.g) * t);
  const b = Math.round(low.b + (high.b - low.b) * t);
  return `rgb(${r}, ${g}, ${b})`;
}

function OgWaterDrop({ fillPercent }: { fillPercent: number }) {
  const clampedFill = Math.min(100, Math.max(0, fillPercent));
  const fillColor = interpolateFillColor(clampedFill);
  const fillHeight = (clampedFill / 100) * 185;
  const fillY = 195 - fillHeight;

  return (
    <svg width="220" height="242" viewBox="0 0 200 220">
      <defs>
        <clipPath id="ogDropClip">
          <path d="M100 10 C100 10 160 80 160 130 C160 175 135 195 100 195 C65 195 40 175 40 130 C40 80 100 10 100 10 Z" />
        </clipPath>
      </defs>
      <path
        d="M100 10 C100 10 160 80 160 130 C160 175 135 195 100 195 C65 195 40 175 40 130 C40 80 100 10 100 10 Z"
        fill="none"
        stroke="#0d9488"
        strokeWidth="2.5"
        opacity="0.6"
      />
      <g clipPath="url(#ogDropClip)">
        <rect
          x="35"
          y={fillY}
          width="130"
          height={fillHeight + 5}
          fill={fillColor}
        />
      </g>
    </svg>
  );
}

export interface OgImageProps {
  litresTotal: number;
  mlTotal: number;
  model: ModelKey;
  queryCount: number;
  queryType: QueryTypeKey;
  region: RegionKey;
}

export function OgImage({
  litresTotal,
  mlTotal,
  model,
  queryCount,
  queryType,
  region,
}: OgImageProps) {
  const fillPercent = mlToFillPercent(mlTotal);
  const modelLabel = MODEL_PROFILES[model].label;
  const queryLabel = QUERY_TYPE_MULTIPLIER[queryType].label;
  const regionLabel = REGION_WUE[region].label;

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #0a0f14 0%, #0f172a 55%, #042f2e 100%)",
        padding: "56px 64px",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        fontFamily: "DM Sans",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          maxWidth: 760,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: "#0d9488",
            }}
          />
          <span
            style={{
              fontSize: 28,
              color: "#94a3b8",
              fontFamily: "DM Sans",
              fontWeight: 500,
            }}
          >
            {SITE_NAME}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 112,
            lineHeight: 1,
            color: "#fb7185",
            fontFamily: "Fraunces",
            fontWeight: 700,
            letterSpacing: "-0.04em",
          }}
        >
          {`~${litresTotal}L`}
        </div>

        <div
          style={{
            marginTop: 20,
            fontSize: 34,
            color: "#e2e8f0",
            fontFamily: "DM Sans",
            fontWeight: 500,
            lineHeight: 1.2,
          }}
        >
          estimated freshwater for this AI session
        </div>

        <div
          style={{
            marginTop: 28,
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <span
            style={{
              fontSize: 24,
              color: "#64748b",
              fontFamily: "DM Sans",
            }}
          >
            {`Your ${modelLabel} session used ~${mlTotal >= 1000 ? `${litresTotal}L` : `${mlTotal}ml`} of water`}
          </span>
          <span
            style={{
              fontSize: 22,
              color: "#475569",
              fontFamily: "DM Sans",
            }}
          >
            {`${queryLabel} · ${regionLabel} · ${queryCount} ${queryCount === 1 ? "query" : "queries"}`}
          </span>
          <span
            style={{
              marginTop: 8,
              fontSize: 20,
              color: "#475569",
              fontFamily: "DM Sans",
              fontStyle: "italic",
            }}
          >
            AI isn&apos;t free — it just bills the planet.
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 32,
        }}
      >
        <OgWaterDrop fillPercent={fillPercent} />
      </div>
    </div>
  );
}
