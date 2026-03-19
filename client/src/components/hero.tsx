import { motion } from "framer-motion";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 overflow-hidden"
    >
      {/* Decorative blobs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl blob" aria-hidden="true" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl blob" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-gray-900 leading-tight mb-6"
          >
            Every Child Deserves{" "}
            <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
              to Thrive
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-lg md:text-xl text-gray-600 font-body mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            Expert therapy, hearing care, and enrichment programs — trusted by
            2500+ families in Bangalore.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/contact"
              className="bg-blue-600 text-white px-8 py-4 rounded-xl font-heading font-bold text-base hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25"
            >
              Book a Free Consultation
            </Link>
            <a
              href="#services"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-heading font-bold text-base hover:border-blue-600 hover:text-blue-600 transition-colors"
            >
              Explore Our Services
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
