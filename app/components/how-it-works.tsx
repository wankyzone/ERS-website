"use client";

import { motion } from "framer-motion";
import { Pencil, UserCheck, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Post your errand",
    desc: "Describe what you need done, set a budget, and submit. It takes under 60 seconds.",
    highlight: "Groceries, pharmacy runs, package pickups — any task.",
    icon: Pencil,
  },
  {
    number: "02",
    title: "A runner accepts",
    desc: "A nearby, verified runner reviews and accepts your task instantly.",
    highlight: "See profile, rating, and ETA before they head out.",
    icon: UserCheck,
  },
  {
    number: "03",
    title: "Track & complete",
    desc: "Follow your runner live on the map. They complete the errand.",
    highlight: "Secure payment released only after delivery.",
    icon: CheckCircle,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1ED760]/5 via-transparent to-[#1ED760]/5" />

      <div className="max-w-6xl mx-auto text-center relative z-10">

        {/* Label */}
        <p className="text-xs tracking-widest text-[#1ED760] mb-4">
          SIMPLE PROCESS
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          How ERS works
        </h2>

        {/* Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-8">

          {steps.map((step, i) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-[#111217] border border-white/10 rounded-2xl p-8 text-left
                hover:-translate-y-2 hover:border-white/20 transition-all duration-300"
              >

                {/* TOP LINE */}
                <div className="flex items-center justify-between mb-6">

                  <span className="text-xs text-[#1ED760] font-semibold">
                    {step.number}
                  </span>

                  <div className="w-10 h-10 rounded-lg bg-[#1ED760]/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#1ED760]" />
                  </div>

                </div>

                {/* Divider line */}
                <div className="h-px w-full bg-gradient-to-r from-[#1ED760]/30 to-transparent mb-6" />

                {/* Title */}
                <h3 className="text-lg font-semibold text-white">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 text-sm mt-3 leading-relaxed">
                  {step.desc}
                </p>

                {/* Highlight box */}
                <div className="mt-6 bg-[#1ED760]/10 border border-[#1ED760]/20 rounded-lg px-4 py-3 text-sm text-[#1ED760]">
                  {step.highlight}
                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}