"use client";

import { motion } from "framer-motion";

const features = [
  {
    title: "Instant task posting",
    desc: "Create errands in seconds and get matched immediately.",
  },
  {
    title: "Verified runners",
    desc: "Trusted individuals ready to handle your tasks reliably.",
  },
  {
    title: "Real-time tracking",
    desc: "Monitor progress live from pickup to completion.",
  },
];

export default function Solution() {
  return (
    <section className="py-24 px-6">

      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          ERS handles it for you
        </motion.h2>

        {/* Subtext */}
        <p className="text-secondary mt-6 max-w-2xl mx-auto leading-relaxed">
          Skip the stress. From pickups to deliveries, ERS connects you with
          trusted runners who get things done — fast and reliably.
        </p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-14 grid sm:grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <div
              key={i}
              className="surface p-6 rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 hover:border-white/20"
            >
              {/* Title */}
              <h3 className="text-base font-semibold">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-secondary mt-3 leading-relaxed">
                {feature.desc}
              </p>

            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}