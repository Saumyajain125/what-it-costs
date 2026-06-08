import { ImageResponse } from "next/og";
import { calcWaterCost } from "@/lib/calculations";
import { getOgFonts } from "@/lib/og-fonts";
import { OgImage } from "@/lib/og-image";
import { parseStateFromSearchParams } from "@/lib/url-state";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const params = Object.fromEntries(searchParams.entries());
  const state = parseStateFromSearchParams(params);
  const { mlTotal, litresTotal } = calcWaterCost(state);
  const fonts = await getOgFonts();

  return new ImageResponse(
    (
      <OgImage
        litresTotal={litresTotal}
        mlTotal={mlTotal}
        model={state.model}
        queryCount={state.queryCount}
        queryType={state.queryType}
        region={state.region}
      />
    ),
    {
      width: 1200,
      height: 630,
      fonts,
    }
  );
}
