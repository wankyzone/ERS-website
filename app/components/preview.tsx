"use client";

import { motion } from "framer-motion";

export default function Preview() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">

      {/* Background image */}
      <div className="absolute inset-0 opacity-20">
        <img
          src="/lagos-map.png"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">

        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          See ERS in action
        </h2>

        {/* Floating UI */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mx-auto max-w-md rounded-2xl bg-[#0B0B0F] border border-white/10 p-4 shadow-[0_0_60px_rgba(30,215,96,0.2)]"
        >
          <div className="space-y-4">

            <div className="text-left">
              <p className="text-sm text-gray-400">Errand</p>
              <h3 className="font-semibold">Pick up groceries</h3>
            </div>

            <div className="h-32 bg-[#1ED760]/10 rounded-lg flex items-center justify-center text-sm text-gray-400">
              Live tracking...
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Runner</span>
              <span className="text-[#1ED760]">Assigned</span>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}