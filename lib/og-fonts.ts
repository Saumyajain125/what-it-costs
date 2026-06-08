const FRAUNCES_BOLD =
  "https://fonts.gstatic.com/s/fraunces/v38/6NUh8FyLNQOQZAnv9bYEvDiIdE9Ea92uemAk_WBq8U_9v0c2Wa0K7iN7hzFUPJH58nib1603gg7S2nfgRYIcUByjDg.ttf";
const DM_SANS_REGULAR =
  "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAopxhTg.ttf";
const DM_SANS_MEDIUM =
  "https://fonts.gstatic.com/s/dmsans/v17/rP2tp2ywxg089UriI5-g4vlH9VoD8CmcqZG40F9JadbnoEwAkJxhTg.ttf";

type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: 400 | 500 | 700;
  style: "normal";
};

let fontsPromise: Promise<OgFont[]> | undefined;

async function loadFonts(): Promise<OgFont[]> {
  const [frauncesBold, dmSansRegular, dmSansMedium] = await Promise.all([
    fetch(FRAUNCES_BOLD).then((res) => res.arrayBuffer()),
    fetch(DM_SANS_REGULAR).then((res) => res.arrayBuffer()),
    fetch(DM_SANS_MEDIUM).then((res) => res.arrayBuffer()),
  ]);

  return [
    {
      name: "Fraunces",
      data: frauncesBold,
      weight: 700,
      style: "normal",
    },
    {
      name: "DM Sans",
      data: dmSansRegular,
      weight: 400,
      style: "normal",
    },
    {
      name: "DM Sans",
      data: dmSansMedium,
      weight: 500,
      style: "normal",
    },
  ];
}

export function getOgFonts(): Promise<OgFont[]> {
  if (!fontsPromise) {
    fontsPromise = loadFonts();
  }
  return fontsPromise;
}
