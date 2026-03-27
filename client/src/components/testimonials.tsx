import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

const testimonials = [
  {
    quote: "Poorvam completely changed our lives. My son started speaking his first words after just 3 months of speech therapy. The therapists are incredibly patient and caring.",
    name: "Priya M.",
    condition: "Speech Delay",
    rating: 5,
  },
  {
    quote: "We were lost before finding Poorvam. Their occupational therapy team helped our daughter with sensory processing issues. She's now thriving in school and making friends.",
    name: "Rajesh K.",
    condition: "Sensory Processing",
    rating: 5,
  },
  {
    quote: "The hearing center team fitted my father with hearing aids that work perfectly. They took time to explain everything and followed up regularly. Highly recommend!",
    name: "Sneha R.",
    condition: "Adult Hearing Loss",
    rating: 5,
  },
  {
    quote: "Our autistic son has made incredible progress with the behavioral therapy at Poorvam. The individualized approach and regular parent training sessions make all the difference.",
    name: "Arun & Meena S.",
    condition: "Autism Spectrum",
    rating: 5,
  },
  {
    quote: "My daughter loves the Ucube dance and art classes. Her confidence has soared, and she's performing on stage now! The instructors really know how to engage kids.",
    name: "Kavitha D.",
    condition: "Enrichment Programs",
    rating: 5,
  },
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block text-gold font-body text-sm font-semibold tracking-wider uppercase mb-3 bg-gold/10 px-4 py-1.5 rounded-full">
            Family Stories
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brown-deep mb-4">
            Stories from Our Families
          </h2>
          <p className="text-lg text-brown-light font-body max-w-2xl mx-auto">
            Real experiences from parents and families who trust Poorvam Care
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.33%] px-2"
              >
                <div className="bg-warm-bg rounded-2xl p-8 h-full border border-warm-gray-200 shadow-sm shadow-warm-gray-200/50 flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-gold fill-gold"
                      />
                    ))}
                  </div>
                  <blockquote className="text-brown-mid font-body leading-relaxed mb-6 flex-1 italic">
                    "{t.quote}"
                  </blockquote>
                  <div>
                    <p className="font-heading font-semibold text-brown-deep">
                      {t.name}
                    </p>
                    <p className="text-sm text-brown-light font-body">
                      {t.condition}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === selectedIndex ? "bg-coral" : "bg-warm-gray-200"
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
