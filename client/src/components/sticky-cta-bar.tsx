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
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white border-t border-gray-200 shadow-lg px-4 py-3"
        >
          <div className="flex gap-3">
            <Link
              href="/contact"
              className="flex-1 bg-blue-600 text-white text-center font-heading font-semibold py-3 rounded-xl text-sm hover:bg-blue-700 transition-colors"
            >
              Book Free Consultation
            </Link>
            <a
              href="tel:+918861764343"
              className="flex items-center justify-center bg-emerald-600 text-white px-4 rounded-xl hover:bg-emerald-700 transition-colors"
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
