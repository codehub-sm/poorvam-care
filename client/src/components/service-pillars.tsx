import { Heart, Sparkles, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";

const pillars = [
  {
    title: "Child Development Center",
    subtitle: "Therapies & Counselling",
    description:
      "Evidence-based speech therapy, occupational therapy, behavioral interventions, and special education for children with developmental needs.",
    services: ["Speech Therapy", "Occupational Therapy", "ABA Therapy", "Special Education"],
    icon: Heart,
    href: "/child-development",
    borderColor: "border-t-coral",
    iconBg: "bg-coral/10",
    iconText: "text-coral",
    pillBg: "bg-coral/10",
    pillText: "text-coral",
    photo: "/img/photo-developmental-education.jpeg",
    photoAlt: "Therapist working one-on-one with a child on a learning activity",
    photoPosition: "object-[center_35%]",
  },
  {
    title: "Therapeutic Enrichment",
    subtitle: "Designed for Children Who Learn Differently",
    description:
      "Sensory art, movement therapy, music, yoga, and social skills groups — structured by our therapy team to build on each child's individual goals.",
    services: ["Sensory Art", "Movement Therapy", "Therapeutic Yoga", "Social Skills Groups"],
    icon: Sparkles,
    href: "/therapeutic-enrichment",
    borderColor: "border-t-sage",
    iconBg: "bg-sage/10",
    iconText: "text-sage",
    pillBg: "bg-sage/10",
    pillText: "text-sage",
    photo: "/img/photo-social-skills-group.jpeg",
    photoAlt: "Children laughing together in a group session",
    photoPosition: "object-[center_70%]",
  },
];

export default function ServicePillars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-20 bg-warm-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-coral" />
            <span className="text-sm font-heading font-semibold text-coral uppercase tracking-widest">
              What We Offer
            </span>
            <span className="w-8 h-[2px] bg-coral" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brown-deep mb-4">
            How We Can Help
          </h2>
          <p className="text-lg text-warm-gray font-body max-w-2xl mx-auto">
            Two specialized areas of care, all under one roof
          </p>
        </div>

        {/* Pillar Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
              >
                <Link href={pillar.href} className="block group h-full">
                  <div
                    className={`bg-[#FFFBF5] rounded-2xl overflow-hidden h-full border border-brown-light/30 border-t-4 ${pillar.borderColor} hover:shadow-xl hover:shadow-brown-light/20 hover:border-t-[6px] transition-all duration-300 hover:-translate-y-1`}
                  >
                    {/* Card photo */}
                    <div className="h-52 overflow-hidden relative">
                      <img
                        src={pillar.photo}
                        alt={pillar.photoAlt}
                        loading="lazy"
                        className={`w-full h-full object-cover ${pillar.photoPosition} group-hover:scale-105 transition-transform duration-500`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                    </div>
                    <div className="p-8">
                      <div className="flex items-start gap-4">
                        <div
                          className={`w-12 h-12 ${pillar.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform`}
                        >
                          <Icon className={`w-6 h-6 ${pillar.iconText}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-xl font-heading font-bold text-brown-deep group-hover:text-coral transition-colors">
                            {pillar.title}
                          </h3>
                          <p className="text-sm text-warm-gray font-body">
                            {pillar.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-brown-mid font-body mt-4 mb-4 leading-relaxed">
                        {pillar.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {pillar.services.map((s) => (
                          <span
                            key={s}
                            className={`px-3 py-1 rounded-full text-xs font-medium ${pillar.pillBg} ${pillar.pillText}`}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-heading font-semibold text-coral group-hover:gap-2 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
