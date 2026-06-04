"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Star, Clock, MessageCircle, Phone } from "lucide-react";

export default function Preview() {
  const [distance, setDistance] = useState(2.3);
  const [eta, setEta] = useState(12);
  const [progress, setProgress] = useState(40);
  const [step, setStep] = useState(0);

  const steps = [
    "Runner accepted",
    "En route to pickup",
    "Item picked up",
    "Heading to delivery",
    "Delivered",
  ];

  // Simulate movement
  useEffect(() => {
    const interval = setInterval(() => {
      setDistance((d) => Math.max(0, +(d - 0.2).toFixed(1)));
      setEta((t) => Math.max(1, t - 1));
      setProgress((p) => Math.min(100, p + 10));
      setStep((s) => Math.min(steps.length - 1, s + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-28 px-6 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1ED760]/5 via-transparent to-[#1ED760]/5" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto text-center relative z-10"
      >

        <p className="text-xs tracking-widest text-[#1ED760] mb-4">
          SEE IT IN ACTION
        </p>

        <h2 className="text-4xl md:text-5xl font-bold">
          Your errand, handled.
        </h2>

        <p className="text-gray-400 mt-4">
          From posting to completion — every step in real-time.
        </p>

        <div className="mt-16 grid md:grid-cols-3 gap-6 items-center">

          {/* LEFT */}
          <div className="space-y-4 text-left">

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="bg-[#111217] border border-white/10 p-4 rounded-xl"
            >
              <p className="text-green-400 text-sm">✓ Runner Assigned</p>
              <p className="text-white font-medium mt-1">Emeka O.</p>
              <p className="text-gray-400 text-sm flex items-center gap-1">
                <Star size={14} /> 4.9 · 312 runs
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#111217] border border-white/10 p-4 rounded-xl"
            >
              <p className="text-gray-400 text-sm flex items-center gap-2">
                <Clock size={14} /> Estimated arrival
              </p>

              <p className="text-white text-xl font-bold mt-2">
                {eta} min
              </p>

              <div className="h-1 bg-white/10 rounded-full mt-2">
                <div
                  className="h-1 bg-[#1ED760] rounded-full transition-all duration-700"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>

          </div>

          {/* CENTER */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-[#111217] border border-white/10 rounded-2xl p-6 text-left relative hover:scale-[1.02] transition-all duration-300 shadow-[0_0_60px_rgba(30,215,96,0.15)]"
          >

            <div className="flex justify-between items-center">
              <p className="text-white font-semibold">Track Errand</p>

              <span className="flex items-center gap-2 text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                In Progress
              </span>
            </div>

            <p className="text-gray-400 text-sm mt-2">
              Pick up dry cleaning from Island Laundry
            </p>

            {/* Map */}
            <div className="mt-4 h-40 bg-black/30 rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 grid grid-cols-4 gap-2 p-4 opacity-20">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="bg-white/10 rounded"></div>
                ))}
              </div>

              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute top-12 left-8 w-28 h-28 border border-dashed border-green-400 rounded-full opacity-60"
              />
            </div>

            {/* Status */}
            <div className="mt-4 flex items-center justify-between">

              <div>
                <p className="text-white text-sm">
                  {distance > 0
                    ? "Emeka is on the way"
                    : "Arriving now"}
                </p>

                <p className="text-gray-400 text-xs">
                  {distance} km away · arriving soon
                </p>
              </div>

              <div className="flex gap-2">
                <button className="p-2 border border-white/10 rounded-lg">
                  <MessageCircle size={16} />
                </button>
                <button className="p-2 bg-[#1ED760] text-black rounded-lg">
                  <Phone size={16} />
                </button>
              </div>

            </div>

          </motion.div>

          {/* RIGHT */}
          <div className="space-y-4 text-left">

            <div className="bg-[#111217] border border-white/10 p-4 rounded-xl">
              <p className="text-gray-400 text-sm">Errand details</p>

              <p className="text-white mt-2 flex items-center gap-2 text-sm">
                <MapPin size={14} />
                Victoria Island, Lagos
              </p>

              <div className="flex justify-between mt-3 text-sm">
                <span className="text-gray-400">Est. cost</span>
                <span className="text-[#1ED760] font-semibold">₦850</span>
              </div>
            </div>

            <div className="bg-[#111217] border border-white/10 p-4 rounded-xl">
              <p className="text-gray-400 text-sm mb-2">Live updates</p>

              <ul className="space-y-2 text-sm">
                {steps.map((s, i) => (
                  <li
                    key={i}
                    className={
                      i <= step
                        ? "text-green-400"
                        : "text-gray-500"
                    }
                  >
                    • {s}
                  </li>
                ))}
              </ul>

            </div>

          </div>

        </div>

      </motion.div>
    </section>
  );
}