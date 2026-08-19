import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { useRef, useEffect, useState } from "react";
import { STATS } from "@/config/site";

/* ── CountUp ── */
/**
 * Counts up to `target` once scrolled into view, but renders `target` until
 * that happens. Seeded at 0, the prerendered snapshot Google indexes shipped
 * "0+ Families" — the crawler never scrolls, so the animation never ran.
 */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    setCount(0);
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const id = setInterval(() => {
      start += step;
      if (start >= target) {
        start = target;
        clearInterval(id);
      }
      setCount(start);
    }, 16);
    return () => clearInterval(id);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-heading font-bold text-2xl md:text-3xl text-brown-deep">
      {count ?? target}
      {suffix}
    </span>
  );
}

/* ── Stagger helpers ── */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ── Hero ── */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-cream overflow-hidden"
    >
      {/* ── Organic blob backgrounds ── */}
      <div
        className="absolute -top-24 -left-24 w-[420px] h-[420px] bg-coral/10 animate-blob-morph blur-2xl"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 -right-32 w-[500px] h-[500px] bg-sage/10 animate-blob-morph blur-2xl"
        style={{ animationDelay: "-3s" }}
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 left-1/3 w-[360px] h-[360px] bg-gold/10 animate-blob-morph blur-2xl"
        style={{ animationDelay: "-5s" }}
        aria-hidden="true"
      />
      {/* Subtle dots texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #3D2C2C 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
        aria-hidden="true"
      />

      {/* ── Content grid ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32"
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-center">

          {/* ──────── Left: Text ──────── */}
          <div className="flex flex-col items-start text-left">
            {/* Badge */}
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-sage/40 bg-sage/5 text-sage-dark text-sm font-body font-medium">
                <span aria-hidden="true">&#11088;</span>
                Bangalore&apos;s Trusted Therapy Center
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={fadeUp}
              className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-6xl leading-[1.1] text-brown-deep"
            >
              Speech Therapy &amp; Occupational Therapy for Children in{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-coral">Electronic City, Bangalore</span>
                {/* Gold underline highlight */}
                <span
                  className="absolute bottom-1 left-0 w-full h-[0.3em] bg-gold/30 -skew-y-1 rounded-sm z-0"
                  aria-hidden="true"
                />
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeUp}
              className="mt-5 font-body text-lg md:text-xl text-brown-mid leading-relaxed max-w-lg"
            >
              Expert speech therapy, occupational therapy, ABA therapy, special education,
              and therapeutic enrichment — trusted by families across Bangalore for over {STATS.years} years.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-2 bg-coral hover:bg-coral-dark text-white px-7 py-3.5 rounded-xl font-heading font-bold text-base transition-all shadow-lg shadow-coral/25 hover:shadow-xl hover:shadow-coral/30"
              >
                Book a Consultation
                <svg
                  className="w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="#services"
                className="group inline-flex items-center gap-2 border-2 border-brown-deep/15 text-brown-deep px-7 py-3.5 rounded-xl font-heading font-bold text-base hover:border-sage hover:text-sage-dark transition-all"
              >
                <svg
                  className="w-5 h-5 text-sage"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Explore Services
              </a>
            </motion.div>

            {/* Trust stats */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap gap-8 md:gap-10"
            >
              {[
                { target: STATS.years, suffix: "+", label: "Years" },
                { target: STATS.families, suffix: "+", label: "Families" },
              ].map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <CountUp target={stat.target} suffix={stat.suffix} />
                  <span className="font-body text-sm text-brown-light mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
              <div className="flex flex-col">
                <span className="font-heading font-bold text-2xl md:text-3xl text-brown-deep flex items-center gap-1.5">
                  <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  RCI
                </span>
                <span className="font-body text-sm text-brown-light mt-0.5">
                  Licensed
                </span>
              </div>
            </motion.div>
          </div>

          {/* ──────── Right: Visual ──────── */}
          <motion.div
            variants={fadeUp}
            className="relative flex items-center justify-center lg:justify-end"
          >
            {/* Soft floating accents behind photo */}
            <div className="absolute -top-4 -right-2 w-24 h-24 rounded-full bg-gold/30 blur-xl" aria-hidden="true" />
            <div className="absolute -bottom-6 -left-4 w-28 h-28 rounded-full bg-sage/25 blur-xl" aria-hidden="true" />
            <div className="relative w-[300px] sm:w-[360px] md:w-[400px] aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-brown-deep/15 ring-1 ring-brown-light/20 rotate-1">
              <img
                src="/img/photo-occupational-therapy.jpeg"
                alt="Poorvam therapist guiding a child through a fine-motor play session"
                loading="eager"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
