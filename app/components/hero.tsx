"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-28 px-6 gradient-bg">

      {/* Glow Orb */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#1ED760] opacity-20 blur-[120px] rounded-full"
      />

      {/* Container */}
      <div className="max-w-6xl mx-auto text-center relative z-10">

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
        >
          Get Anything Done
          <br />
          <span className="text-[#1ED760] glow-text">
            Without Stress
          </span>
        </motion.h1>

        {/* Subtext */}
        <p className="text-gray-400 mt-6 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          ERS connects you with trusted runners who handle your errands
          — fast, secure, and reliable.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          {/* Primary Button */}
          <button className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-semibold text-black bg-[#1ED760] rounded-xl group transition-all duration-300 hover:scale-105">
            <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-10 transition duration-300"></span>
            <span className="relative z-10">Get Early Access</span>
          </button>

          {/* Secondary Button */}
          <button className="px-6 py-3 rounded-xl border border-white/10 text-white hover:border-[#1ED760] hover:text-[#1ED760] transition-all duration-300">
            See How It Works
          </button>

        </div>

        {/* Live System Signal */}
        <p className="mt-6 text-sm text-gray-500">
          ⚡ 120+ errands completed today in Lagos
        </p>

      </div>

      {/* Bottom Fade (section blending) */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[#0B0B0F]" />

    </section>
  );
}