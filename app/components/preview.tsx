"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Preview() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/lagos-map.png"
          alt="Map of Lagos"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg)] via-transparent to-[var(--bg)]" />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-16">
          See ERS in action
        </h2>

        {/* Floating Phone */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mx-auto relative"
        >
          {/* Subtle glow (REDUCED) */}
          <div className="absolute inset-0 blur-3xl bg-[var(--accent)] opacity-10 rounded-full scale-125"></div>

          {/* Phone */}
          <div className="relative w-[280px] mx-auto rounded-[40px] border border-white/10 bg-black/80 p-3 backdrop-blur-xl">

            {/* Screen */}
            <div className="rounded-[30px] bg-black/40 p-4 space-y-4">

              {/* Header */}
              <div>
                <p className="text-xs text-secondary">Errand</p>
                <h3 className="text-sm font-semibold">
                  Pick up groceries
                </h3>
              </div>

              {/* Map */}
              <div className="h-28 rounded-xl overflow-hidden relative">
                <Image
                  src="/lagos-map.png"
                  alt="Live tracking"
                  fill
                  className="object-cover opacity-60"
                />
                <div className="absolute inset-0 flex items-center justify-center text-xs text-white/70">
                  Live tracking
                </div>
              </div>

              {/* Status */}
              <div className="flex justify-between text-xs">
                <span className="text-secondary">Runner</span>
                <span className="text-accent">Assigned</span>
              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}