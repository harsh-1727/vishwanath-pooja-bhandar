/**
 * src/components/layout/Footer.tsx
 *
 * Server Component — purely presentational, all data from config/.
 * The social links section only renders when
 * navigationConfig.socialLinks has entries (currently empty — see
 * OWNER_GUIDE.md), so no placeholder/dead icons ever ship.
 */

import Link from "next/link";
import { MapPin, Phone as PhoneIcon, Clock } from "lucide-react";
import { businessConfig, contactConfig, navigationConfig } from "@/config";
import { formatWeeklyHours } from "@/lib/utils/format-hours";
import { buildTelLink } from "@/lib/utils/contact-links";

export function Footer() {
  const { address } = contactConfig;

  return (
    <footer className="border-t border-ink/10 bg-cream">
      <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-3">
          <div>
            <p className="font-display text-lg text-ink">{businessConfig.name}</p>
            <p className="mt-2 text-sm text-ink/70">{businessConfig.tagline}</p>
            <p className="mt-2 text-xs uppercase tracking-wide text-gold">
              {businessConfig.yearsInBusiness}
            </p>
          </div>

          <div>
            <p className="mb-3 font-body text-sm font-semibold text-ink">
              Explore
            </p>
            <ul className="space-y-2">
              {navigationConfig.footer.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink/70 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-3 font-body text-sm font-semibold text-ink">
              Visit Us
            </p>
            <div className="flex items-start gap-2 text-sm text-ink/70">
              <MapPin
                size={16}
                className="mt-0.5 shrink-0 text-gold"
                aria-hidden="true"
              />
              <span>
                {address.line1}, {address.locality}, {address.city}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-ink/70">
              <Clock size={16} className="shrink-0 text-gold" aria-hidden="true" />
              <span>{formatWeeklyHours(contactConfig.hours)}</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-ink/70">
              <PhoneIcon
                size={16}
                className="shrink-0 text-gold"
                aria-hidden="true"
              />
              <a href={buildTelLink()} className="hover:text-ink">
                {contactConfig.phone}
              </a>
            </div>
          </div>
        </div>

        {navigationConfig.socialLinks.length > 0 && (
          <div className="mt-8 flex gap-4 border-t border-ink/10 pt-6">
            {/* Social icons render here once profiles are confirmed —
                see navigation.config.ts and OWNER_GUIDE.md. */}
          </div>
        )}

        <div className="mt-8 border-t border-ink/10 pt-6 text-xs text-ink/50">
          © {new Date().getFullYear()} {businessConfig.name}. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
