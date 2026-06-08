import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import { jsonLd, SITE_URL } from "@/lib/seo";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "The Hidden Cost | How Much Water Does AI Use?",
  description:
    "Every AI query consumes freshwater for data centre cooling. Calculate how much water your ChatGPT, Claude, or Gemini usage costs — backed by peer-reviewed research.",
  keywords: [
    "AI water usage",
    "ChatGPT water consumption",
    "AI environmental impact",
    "data centre water use",
    "AI carbon footprint",
    "how much water does AI use",
    "LLM water cost",
    "AI sustainability",
  ],
  authors: [{ name: "The Hidden Cost" }],
  openGraph: {
    title: "The Hidden Cost — AI Isn't Free. It Bills the Planet.",
    description:
      "Every answer has a price. Calculate the freshwater cost of your AI usage.",
    url: SITE_URL,
    siteName: "The Hidden Cost",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "A water drop filling up as you type AI queries",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Hidden Cost | AI Water Usage Calculator",
    description: "Your ChatGPT session used ~500ml of water. Calculate yours.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-body">{children}</body>
    </html>
  );
}
