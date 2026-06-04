"use client";

import { motion } from "framer-motion";
import { Zap, ShieldCheck, MapPin } from "lucide-react";

const features = [
  {
    title: "Instant task posting",
    desc: "Describe your errand in seconds. Our smart system matches you with the nearest available runner within minutes — no phone calls, no hassle.",
    highlight: "< 2 min to post & match",
    icon: Zap,
    color: "text-[#1ED760]",
    border: "from-[#1ED760]",
  },
  {
    title: "Verified runners",
    desc: "Every runner goes through background checks, ID verification, and community ratings. You always know who's handling your errands.",
    highlight: "100% background checked",
    icon: ShieldCheck,
    color: "text-blue-400",
    border: "from-blue-400",
  },
  {
    title: "Real-time tracking",
    desc: "Follow your runner live on a map. Get instant updates at every step — from pickup to delivery. No more guessing or waiting in the dark.",
    highlight: "Live GPS tracking",
    icon: MapPin,
    color: "text-yellow-400",
    border: "from-yellow-400",
  },
];

export default function Solution() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1ED760]/5 via-transparent to-[#1ED760]/5" />

      <div className="max-w-6xl mx-auto text-center relative z-10">

        {/* Label */}
        <p className="text-xs tracking-widest text-[#1ED760] mb-4">
          THE SOLUTION
        </p>

        {/* Heading */}
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          ERS does it <span className="text-[#1ED760]">differently</span>
        </h2>

        {/* Subtext */}
        <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
          A smarter, faster, and more reliable way to get things done in Lagos.
        </p>

        {/* Cards */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">

          {features.map((f, i) => {
            const Icon = f.icon;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-[#111217] border border-white/10 rounded-2xl p-6 text-left 
                hover:-translate-y-2 hover:border-white/20 transition-all duration-300"
              >

                {/* TOP ACCENT LINE */}
                <div className={`absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r ${f.border} to-transparent`} />

                {/* ICON */}
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4">
                  <Icon className={`w-6 h-6 ${f.color}`} />
                </div>

                {/* TITLE */}
                <h3 className="text-base font-semibold text-white">
                  {f.title}
                </h3>

                {/* DESC */}
                <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                  {f.desc}
                </p>

                {/* DIVIDER */}
                <div className="h-px w-full bg-white/5 my-5" />

                {/* HIGHLIGHT METRIC */}
                <p className={`text-sm font-semibold ${f.color}`}>
                  {f.highlight}
                </p>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}