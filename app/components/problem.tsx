"use client";

import { motion } from "framer-motion";
import { Car, Hourglass, Frown } from "lucide-react";

const problems = [
  {
    title: "Traffic is brutal",
    desc: "Lagos traffic wastes hours of your day. A 15-minute errand turns into a 2-hour nightmare.",
    stat: "2–4 hrs",
    statLabel: "lost to traffic daily",
    icon: Car,
  },
  {
    title: "Queues eat your time",
    desc: "Bank queues, pharmacy lines, government offices — you spend half your day just waiting.",
    stat: "45 min",
    statLabel: "avg queue time",
    icon: Hourglass,
  },
  {
    title: "No reliable help",
    desc: "Finding trusted help is hard. Informal agents are unreliable, slow, and unsafe.",
    stat: "68%",
    statLabel: "errands handled poorly",
    icon: Frown,
  },
];

export default function Problem() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">

      {/* subtle red glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 via-transparent to-red-500/5" />

      <div className="max-w-6xl mx-auto text-center relative z-10">

        {/* Label */}
        <p className="text-xs tracking-widest text-gray-500 mb-4">
          THE PROBLEM
        </p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-bold tracking-tight"
        >
          Lagos errands are{" "}
          <span className="text-red-500">broken</span>
        </motion.h2>

        {/* Subtext */}
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
          Every day, millions of Lagosians waste hours on avoidable errands
          that could be handled for them.
        </p>

        {/* Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">

          {problems.map((p, i) => {
            const Icon = p.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-[#111217] border border-white/10 rounded-2xl p-6 text-left
                hover:-translate-y-2 hover:border-red-500/30 transition-all duration-300"
              >

                {/* TOP RED LINE */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-500 to-transparent" />

                {/* ICON */}
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-red-500" />
                </div>

                {/* TITLE */}
                <h3 className="text-base font-semibold text-white">
                  {p.title}
                </h3>

                {/* DESC */}
                <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                  {p.desc}
                </p>

                {/* DIVIDER */}
                <div className="h-px w-full bg-white/5 my-5" />

                {/* STAT */}
                <p className="text-red-500 font-bold text-lg">
                  {p.stat}
                  <span className="text-gray-500 text-sm font-normal ml-2">
                    {p.statLabel}
                  </span>
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}