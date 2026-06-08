import HomePage from "@/components/HomePage";
import { parseStateFromSearchParams } from "@/lib/url-state";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const initialState = parseStateFromSearchParams(params);

  return <HomePage initialState={initialState} />;
}
