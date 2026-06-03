"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-28 px-6 text-center relative overflow-hidden">

      {/* Subtle background layer */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--accent)]/5 via-transparent to-[var(--accent)]/5"></div>

      <div className="max-w-3xl mx-auto relative z-10">

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold tracking-tight"
        >
          Stop wasting time on errands
        </motion.h2>

        {/* Subtext */}
        <p className="text-secondary mt-6 leading-relaxed">
          Join early users across Lagos and let ERS handle your tasks
          — faster, safer, and stress-free.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          {/* Primary */}
          <button className="px-8 py-4 rounded-xl font-semibold bg-accent text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(30,215,96,0.25)]">
            Join Waitlist
          </button>

          {/* Secondary */}
          <button className="px-8 py-4 rounded-xl border border-white/10 text-white transition-all duration-300 hover:border-white/20">
            See how it works
          </button>

        </div>

        {/* Trust Signal */}
        <p className="mt-6 text-sm text-secondary">
          No upfront payment required • Secure & reliable
        </p>

      </div>
    </section>
  );
}