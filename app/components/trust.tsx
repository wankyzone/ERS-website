"use client";

import { motion } from "framer-motion";

const trustPoints = [
  {
    title: "Verified runners",
    desc: "Every runner is screened and verified before handling tasks.",
  },
  {
    title: "Live tracking",
    desc: "Track your errand in real-time from start to finish.",
  },
  {
    title: "Secure system",
    desc: "Built with safeguards to ensure safe and reliable execution.",
  },
];

export default function Trust() {
  return (
    <section className="py-20 px-6">

      <div className="max-w-6xl mx-auto text-center">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Built for trust & reliability
        </motion.h2>

        {/* Subtext */}
        <p className="text-secondary mt-6 max-w-2xl mx-auto leading-relaxed">
          We’ve designed ERS to be safe, transparent, and dependable — so you
          never have to worry about your errands.
        </p>

        {/* Trust Cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-14 grid sm:grid-cols-1 md:grid-cols-3 gap-6"
        >
          {trustPoints.map((point, i) => (
            <div
              key={i}
              className="surface p-6 rounded-2xl text-left transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <h3 className="text-base font-semibold">
                {point.title}
              </h3>

              <p className="text-sm text-secondary mt-3 leading-relaxed">
                {point.desc}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Trust Signal */}
        <p className="mt-10 text-sm text-secondary">
          Trusted by early users across Lagos
        </p>

      </div>
    </section>
  );
}