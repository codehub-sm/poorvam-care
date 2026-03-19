import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Users, Award, Shield, Clock } from "lucide-react";

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  { icon: Clock, value: 12, suffix: "+", label: "Years of Experience" },
  { icon: Users, value: 2500, suffix: "+", label: "Lives Touched" },
  { icon: Shield, value: 0, suffix: "", label: "RCI Registered", display: "RCI" },
  { icon: Award, value: 0, suffix: "", label: "ISHA Certified", display: "ISHA" },
];

export default function TrustBar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <section className="bg-gradient-to-r from-blue-600 to-emerald-600 py-6" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center text-white"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <Icon className="w-5 h-5 opacity-80" />
                <div className="text-2xl md:text-3xl font-heading font-bold">
                  {stat.display ? (
                    stat.display
                  ) : (
                    <CountUp end={stat.value} suffix={stat.suffix} />
                  )}
                </div>
                <div className="text-sm opacity-90 font-body">{stat.label}</div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
