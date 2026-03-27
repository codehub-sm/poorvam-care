import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { useRef, useEffect, useState } from "react";

/* ── CountUp ── */
function CountUp({ target, suffix = "" }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
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
      {count}
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
              Every Child Deserves
              <br />
              to{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-coral">Thrive</span>
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
              Expert speech therapy, occupational therapy, hearing care, and enrichment
              programs — trusted by families across Bangalore for over a decade.
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
                Book a Free Consultation
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
                { target: 13, suffix: "+", label: "Years" },
                { target: 2500, suffix: "+", label: "Families" },
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
            {/* Image frame */}
            <div className="relative">
              <div className="w-[280px] h-[320px] sm:w-[340px] sm:h-[380px] md:w-[400px] md:h-[440px] rounded-3xl overflow-hidden rotate-2 shadow-2xl shadow-brown-deep/10 border-4 border-white/80">
                <img
                  src="https://poorvam-staff.s3.us-east-1.amazonaws.com/Poorvam-Logo+(1).jpg"
                  alt="Poorvam Care - Child Development Center"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Decorative ring behind image */}
              <div
                className="absolute -top-4 -right-4 w-full h-full rounded-3xl border-2 border-dashed border-sage/30 rotate-2"
                aria-hidden="true"
              />

              {/* ── Floating card: Play-Based ── */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -left-6 sm:-left-10 top-8 sm:top-12 animate-gentle-float"
              >
                <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg shadow-brown-deep/5 border border-warm-gray-200">
                  <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-coral" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-brown-deep leading-tight">
                      Play-Based
                    </p>
                    <p className="font-body text-xs text-brown-light">
                      Approach
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* ── Floating card: Evidence-Based ── */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="absolute -right-6 sm:-right-10 bottom-8 sm:bottom-12 animate-gentle-float"
                style={{ animationDelay: "-3s" }}
              >
                <div className="flex items-center gap-3 bg-white/90 backdrop-blur-md rounded-2xl px-4 py-3 shadow-lg shadow-brown-deep/5 border border-warm-gray-200">
                  <div className="w-10 h-10 rounded-xl bg-sage/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-heading font-bold text-sm text-brown-deep leading-tight">
                      Evidence-Based
                    </p>
                    <p className="font-body text-xs text-brown-light">
                      Therapy
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
