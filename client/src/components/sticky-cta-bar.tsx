import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone } from "lucide-react";
import { Link } from "wouter";

export default function StickyCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-warm-bg border-t border-brown-light/10 shadow-lg px-4 py-3"
        >
          <div className="flex gap-3">
            <Link
              href="/contact"
              className="flex-1 bg-coral text-white text-center font-heading font-semibold py-3 rounded-xl text-sm hover:bg-coral-dark transition-colors shadow-md shadow-coral/20"
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:+918861764343"
              className="flex items-center justify-center bg-sage text-white px-4 rounded-xl hover:bg-sage-dark transition-colors"
              aria-label="Call us"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
