import Link from "next/link";
import { SITE_NAME } from "@/lib/seo";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-ocean-dark px-6 text-center">
      <h1 className="font-display text-4xl font-bold text-off-white">404</h1>
      <p className="mt-4 max-w-md text-slate-400">
        This page does not exist. Head back to the {SITE_NAME} calculator.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-teal-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-teal-500"
      >
        Go home
      </Link>
    </main>
  );
}
