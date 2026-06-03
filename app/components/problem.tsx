"use client";
import { motion } from "framer-motion";

const problems = [
  "Stuck in traffic for hours",
  "Endless queues and delays",
  "No one reliable to help",
];

export default function Problem() {
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
          Lagos is not built for your time
        </motion.h2>

        {/* Subtext */}
        <p className="text-secondary mt-6 max-w-2xl mx-auto leading-relaxed">
          Traffic. Delays. Unreliable help.  
          Getting simple things done shouldn’t feel this hard.
        </p>

        {/* Problem cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-14 grid sm:grid-cols-1 md:grid-cols-3 gap-6"
        >
          {problems.map((text, i) => (
            <div
              key={i}
              className="surface p-6 rounded-2xl text-left transition-all duration-300 hover:-translate-y-2 hover:border-white/20"
            >
              {/* Label */}
              <p className="text-xs text-secondary mb-2 uppercase tracking-wide">
                Problem
              </p>

              {/* Title */}
              <h3 className="text-base font-semibold leading-snug">
                {text}
              </h3>

            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}