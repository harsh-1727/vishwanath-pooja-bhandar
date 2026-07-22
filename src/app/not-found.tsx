import type { Metadata } from "next";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
      <p className="font-display text-7xl font-medium text-saffron/30 sm:text-9xl">
        404
      </p>
      <h1 className="mt-4 font-display text-2xl text-ink sm:text-3xl">
        Page not found
      </h1>
      <p className="mt-3 max-w-sm text-sm text-ink/60 sm:text-base">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          href="/"
          variant="primary"
          iconStart={<Home size={16} aria-hidden="true" />}
        >
          Go Home
        </Button>
        <Button
          href="/search"
          variant="outline"
          iconStart={<Search size={16} aria-hidden="true" />}
        >
          Search Products
        </Button>
      </div>
    </div>
  );
}
