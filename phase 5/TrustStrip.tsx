/**
 * src/components/home/TrustStrip.tsx
 *
 * Only durable, verifiable facts — no invented review counts, no
 * catalog-size numbers that could quietly go stale (see
 * categories.config.ts's comment on the same principle). Every line
 * here is something that was actually confirmed by the owner.
 */

import { Award, MapPin, PackageCheck } from "lucide-react";
import { businessConfig, contactConfig } from "@/config";

const markers = [
  {
    icon: Award,
    label: businessConfig.yearsInBusiness,
    caption: "Serving the community",
  },
  {
    icon: MapPin,
    label: contactConfig.address.locality,
    caption: contactConfig.address.city,
  },
  {
    icon: PackageCheck,
    label: "Complete Kits",
    caption: "Everything for your puja, in one place",
  },
] as const;

export function TrustStrip() {
  return (
    <section className="border-y border-ink/10 bg-base py-10">
      <div className="mx-auto grid max-w-content gap-6 px-4 sm:grid-cols-3 sm:px-6">
        {markers.map((marker) => (
          <div key={marker.caption} className="flex items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/10 text-gold">
              <marker.icon size={20} aria-hidden="true" />
            </div>
            <div>
              <p className="font-display text-lg text-ink">{marker.label}</p>
              <p className="text-sm text-ink/60">{marker.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
