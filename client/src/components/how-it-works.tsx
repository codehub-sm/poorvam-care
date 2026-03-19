import { Phone, ClipboardCheck, Route, Rocket } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";

const steps = [
  {
    icon: Phone,
    title: "Reach Out",
    description:
      "Contact us for a free consultation. We'll listen to your concerns and guide you to the right service.",
    color: "from-blue-500 to-blue-600",
  },
  {
    icon: ClipboardCheck,
    title: "Assessment",
    description:
      "Our specialists conduct a thorough evaluation to understand unique needs and strengths.",
    color: "from-emerald-500 to-emerald-600",
  },
  {
    icon: Route,
    title: "Personalized Plan",
    description:
      "We create a tailored intervention plan with clear goals and evidence-based strategies.",
    color: "from-cyan-500 to-cyan-600",
  },
  {
    icon: Rocket,
    title: "Begin Your Journey",
    description:
      "Start regular sessions with progress tracking, family support, and milestone celebrations.",
    color: "from-orange-500 to-orange-600",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-warm-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 font-body max-w-2xl mx-auto">
            Your journey with Poorvam Care in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line - desktop only */}
          <div
            className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-blue-200 via-emerald-200 to-orange-200"
            aria-hidden="true"
          />

          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="text-center relative"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg relative z-10`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-heading font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 font-body text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </section>
  );
}
