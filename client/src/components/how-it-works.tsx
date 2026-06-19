import { Phone, ClipboardCheck, Route, Rocket } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "wouter";

const steps = [
  {
    icon: Phone,
    title: "Reach Out",
    description:
      "Contact us for a consultation. We'll listen to your concerns and guide you to the right service.",
    gradient: "from-coral-light to-coral",
    shadow: "shadow-coral/25",
  },
  {
    icon: ClipboardCheck,
    title: "Assessment",
    description:
      "Our specialists conduct a thorough evaluation to understand unique needs and strengths.",
    gradient: "from-sage-light to-sage",
    shadow: "shadow-sage/25",
  },
  {
    icon: Route,
    title: "Personalized Plan",
    description:
      "We create a tailored intervention plan with clear goals and evidence-based strategies.",
    gradient: "from-gold-light to-gold",
    shadow: "shadow-gold/25",
  },
  {
    icon: Rocket,
    title: "Begin Your Journey",
    description:
      "Start regular sessions with progress tracking, family support, and milestone celebrations.",
    gradient: "from-sky to-sky/70",
    shadow: "shadow-sky/25",
  },
];

export default function HowItWorks() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-20 bg-warm-bg" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="inline-block text-coral font-body text-sm font-semibold tracking-wider uppercase mb-3 bg-coral/10 px-4 py-1.5 rounded-full">
            Your Path Forward
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-brown-deep mb-4">
            How It Works
          </h2>
          <p className="text-lg text-brown-light font-body max-w-2xl mx-auto">
            Your journey with Poorvam Care in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connecting line - desktop only */}
          <div
            className="hidden lg:block absolute top-10 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-coral-light via-gold-light to-sage-light"
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
                  className={`w-20 h-20 bg-gradient-to-br ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg ${step.shadow} relative z-10`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-heading font-bold text-brown-deep mb-2">
                  {step.title}
                </h3>
                <p className="text-brown-light font-body text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-block bg-coral text-white px-8 py-4 rounded-xl font-heading font-bold hover:bg-coral-dark transition-colors shadow-lg shadow-coral/25"
          >
            Get Started Today
          </Link>
        </div>
      </div>
    </section>
  );
}
