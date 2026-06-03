"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-28 px-6 gradient-bg">

      {/* Glow (reduced intensity) */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent opacity-10 blur-[140px] rounded-full"
      />

      <div className="max-w-6xl mx-auto text-center relative z-10">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight"
        >
          Run your errands
          <br />
          <span className="text-accent">
            without leaving your seat
          </span>
        </motion.h1>

        {/* Subtext */}
        <p className="text-secondary mt-6 max-w-xl mx-auto text-base sm:text-lg leading-relaxed">
          Skip traffic, queues, and stress.  
          ERS connects you with trusted runners across Lagos — instantly.
        </p>

        {/* CTA */}
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">

          {/* Primary */}
          <button className="px-6 py-3 rounded-xl font-semibold bg-accent text-black hover:scale-105 transition-all duration-300">
            Join Waitlist
          </button>

          {/* Secondary */}
          <button className="px-6 py-3 rounded-xl border border-white/10 text-white hover:border-[var(--accent)] hover:text-accent transition-all duration-300">
            Watch Demo
          </button>

        </div>

        {/* Live Signal */}
        <p className="mt-6 text-sm text-secondary">
          ⚡ 120+ errands completed today in Lagos
        </p>

        {/* MINI PRODUCT PREVIEW */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 mx-auto w-[260px] rounded-[30px] border border-white/10 surface p-3 shadow-[0_0_40px_rgba(0,0,0,0.5)]"
        >
          <div className="rounded-[20px] bg-black/40 p-3 space-y-3 text-left">

            <div>
              <p className="text-xs text-secondary">Errand</p>
              <p className="text-sm font-semibold">Pick up groceries</p>
            </div>

            <div className="h-20 rounded-lg overflow-hidden relative">
              <Image
                src="/lagos-map.png"
                alt="Tracking"
                fill
                className="object-cover opacity-60"
              />
            </div>

            <div className="flex justify-between text-xs">
              <span className="text-secondary">Runner</span>
              <span className="text-accent">Assigned</span>
            </div>

          </div>
        </motion.div>

      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-[var(--bg)]" />

    </section>
  );
}