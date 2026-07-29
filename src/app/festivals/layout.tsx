import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Hindu Festival Calendar & Puja Kits",
  description:
    "Complete Hindu lunar festival calendar and essential puja samagri kits. Hand-assembled kits for Navratri, Diwali, Holi, Janmashtami, and more.",
  alternates: {
    canonical: "/festivals",
  },
};

export default function FestivalsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
