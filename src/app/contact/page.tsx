import type { Metadata } from "next";
import { businessConfig, contactConfig } from "@/config";
import { buildTelLink } from "@/lib/utils/contact-links";
import { formatWeeklyHours } from "@/lib/utils/format-hours";
import { MapPin, Phone, Clock } from "lucide-react";
import { ContactActions } from "@/components/contact/ContactActions";

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${businessConfig.name}. Visit us at West Patel Nagar, New Delhi, or message us on WhatsApp.`,
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const { address } = contactConfig;
  const fullAddress = `${address.line1}, ${address.locality}, ${address.city}`;
  const directionsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${businessConfig.name}, ${fullAddress}`
  )}`;

  return (
    <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">
        Contact Us
      </h1>
      <p className="mt-3 max-w-xl text-sm text-ink/60 sm:text-base">
        Walk in, call, or message us on WhatsApp — whatever&apos;s easiest for
        you. We&apos;re happy to help you find the right puja kit.
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        {/* Contact details */}
        <div className="rounded-card border border-ink/10 bg-base p-6 sm:p-8">
          <h2 className="font-display text-2xl text-ink">Get in Touch</h2>

          <dl className="mt-6 space-y-5">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron/10 text-saffron">
                <MapPin size={18} aria-hidden="true" />
              </div>
              <div>
                <dt className="font-body text-sm font-semibold text-ink">
                  Address
                </dt>
                <dd className="mt-1 text-sm text-ink/70">{fullAddress}</dd>
                <dd className="mt-1 text-sm text-ink/70">
                  {address.region}, {address.country}
                </dd>
                <a
                  href={directionsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-medium text-saffron hover:underline"
                >
                  Get Directions &rarr;
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron/10 text-saffron">
                <Phone size={18} aria-hidden="true" />
              </div>
              <div>
                <dt className="font-body text-sm font-semibold text-ink">
                  Phone
                </dt>
                <dd className="mt-1">
                  <a
                    href={buildTelLink()}
                    className="text-sm text-ink/70 hover:text-ink"
                  >
                    {contactConfig.phone}
                  </a>
                </dd>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-saffron/10 text-saffron">
                <Clock size={18} aria-hidden="true" />
              </div>
              <div>
                <dt className="font-body text-sm font-semibold text-ink">
                  Hours
                </dt>
                <dd className="mt-1 text-sm text-ink/70">
                  {formatWeeklyHours(contactConfig.hours)}
                </dd>
              </div>
            </div>
          </dl>

          <ContactActions />
        </div>

        {/* Map placeholder */}
        <div className="flex flex-col items-center justify-center rounded-card border border-dashed border-ink/15 bg-cream p-10 text-center">
          <MapPin size={32} className="text-gold" aria-hidden="true" />
          <p className="mt-4 font-display text-lg text-ink">
            {businessConfig.name}
          </p>
          <p className="mt-2 text-sm text-ink/60">{fullAddress}</p>
          <p className="mt-1 text-sm text-ink/60">
            {address.region}, {address.country}
          </p>
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded-full bg-saffron px-4 py-2 text-sm font-medium text-white hover:bg-saffron/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/50"
          >
            Open in Google Maps
          </a>
          <p className="mt-4 text-xs text-ink/40">
            Map embed coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
