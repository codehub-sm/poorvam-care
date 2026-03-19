import { Heart, Ear, Sparkles, ArrowRight } from "lucide-react";
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
    color: "blue",
    gradient: "from-blue-500 to-blue-700",
    bg: "bg-blue-50",
    span: true,
  },
  {
    title: "Hearing Center",
    subtitle: "Hearing Tests & Aids",
    description:
      "Comprehensive audiological care for all ages — from pediatric screening to senior hearing solutions with state-of-the-art equipment.",
    services: ["Hearing Assessments", "Hearing Aids", "Cochlear Implant Support", "Tinnitus Management"],
    icon: Ear,
    href: "/hearing-center",
    color: "cyan",
    gradient: "from-cyan-500 to-cyan-700",
    bg: "bg-cyan-50",
    span: false,
  },
  {
    title: "Ucube",
    subtitle: "Enrichment & Skills",
    description:
      "Dance, yoga, music, art, public speaking, and soft skills programs to unlock every child's hidden talents.",
    services: ["Dance & Yoga", "Music & Art", "Public Speaking", "Soft Skills"],
    icon: Sparkles,
    href: "/ucube",
    color: "emerald",
    gradient: "from-emerald-500 to-emerald-700",
    bg: "bg-emerald-50",
    span: false,
  },
];

export default function ServicePillars() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className="py-20 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
            How We Can Help
          </h2>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
            Three specialized areas of care, all under one roof
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={pillar.span ? "md:col-span-2" : ""}
              >
                <Link href={pillar.href} className="block group">
                  <div
                    className={`${pillar.bg} rounded-2xl p-8 h-full border border-gray-100 hover:shadow-lg transition-all duration-300`}
                  >
                    <div className="flex items-start gap-5">
                      <div
                        className={`w-14 h-14 bg-gradient-to-br ${pillar.gradient} rounded-xl flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="w-7 h-7 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-heading font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                          {pillar.title}
                        </h3>
                        <p className="text-sm text-gray-500 font-body mb-3">
                          {pillar.subtitle}
                        </p>
                        <p className="text-gray-600 font-body mb-4 leading-relaxed">
                          {pillar.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {pillar.services.map((s) => (
                            <span
                              key={s}
                              className={`px-3 py-1 rounded-full text-xs font-medium ${
                                pillar.color === "blue"
                                  ? "bg-blue-100 text-blue-700"
                                  : pillar.color === "cyan"
                                  ? "bg-cyan-100 text-cyan-700"
                                  : "bg-emerald-100 text-emerald-700"
                              }`}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 text-sm font-heading font-semibold text-blue-600 group-hover:gap-2 transition-all">
                          Learn More <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
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
