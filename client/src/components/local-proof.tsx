/**
 * Local-SEO proof blocks for centre and locality landing pages.
 *
 * GSC showed these pages ranking ~5 with near-zero CTR: the local 3-pack takes
 * the tap because it shows a map, a phone number, and stars — and our pages
 * showed none of those. These blocks put the same trust signals on the page
 * itself: an embedded Google Map per centre and parent review snippets.
 */

import { Star, MapPin } from "lucide-react";
import { LOCATIONS, type Location } from "@/config/site";
import { testimonials } from "@/components/testimonials";

/** Keyless Google Maps embed for a centre. */
function mapEmbedUrl(location: Location): string {
  const query = encodeURIComponent(
    `${location.name}, ${location.streetAddress}, Bengaluru ${location.postalCode}`,
  );
  return `https://www.google.com/maps?q=${query}&output=embed`;
}

interface CentreMapsProps {
  /** Location ids from LOCATIONS to embed; defaults to both centres. */
  locationIds?: string[];
  heading?: string;
}

export function CentreMaps({ locationIds, heading = "Find Us on the Map" }: CentreMapsProps) {
  const locations = locationIds
    ? LOCATIONS.filter((l) => locationIds.includes(l.id))
    : LOCATIONS;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-heading font-bold text-brown-deep mb-8">{heading}</h2>
        <div className={`grid grid-cols-1 gap-8 ${locations.length > 1 ? "lg:grid-cols-2" : ""}`}>
          {locations.map((location) => (
            <div key={location.id} className="rounded-2xl overflow-hidden border border-warm-gray-200">
              <iframe
                src={mapEmbedUrl(location)}
                title={`Map — ${location.name}`}
                className="w-full h-[300px] border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
              <div className="p-5 bg-warm-bg flex items-start gap-3">
                <MapPin className="w-5 h-5 text-coral flex-shrink-0 mt-0.5" />
                <div className="text-sm font-body text-brown-mid">
                  <span className="font-semibold text-brown-deep block mb-1">{location.name}</span>
                  {location.streetAddress}, Bengaluru {location.postalCode}
                  <a
                    href={location.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-2 text-coral font-heading font-semibold hover:underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

interface ReviewSnippetsProps {
  heading?: string;
  /** How many snippets to show. */
  count?: number;
}

export function ReviewSnippets({
  heading = "What Parents Say About Us",
  count = 3,
}: ReviewSnippetsProps) {
  const snippets = testimonials.slice(0, count);

  return (
    <section className="py-16 bg-warm-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-heading font-bold text-brown-deep mb-8">{heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {snippets.map((t) => (
            <figure key={t.name} className="bg-white rounded-2xl p-6 border border-warm-gray-200 flex flex-col">
              <div className="flex gap-1 mb-4" aria-label={`${t.rating} out of 5 stars`}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                ))}
              </div>
              <blockquote className="text-brown-mid font-body text-sm leading-relaxed italic flex-1">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-4">
                <span className="font-heading font-semibold text-brown-deep text-sm block">{t.name}</span>
                <span className="text-xs text-brown-light font-body">{t.condition}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
