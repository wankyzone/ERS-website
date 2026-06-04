"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Star, Lock, Camera, Headphones, BadgeCheck } from "lucide-react";
import { useEffect, useState } from "react";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const features = [
  {
    title: "Full background checks",
    desc: "Identity verification, criminal checks, and document review before approval.",
    icon: ShieldCheck,
  },
  {
    title: "Community ratings",
    desc: "Low-rated runners are automatically reviewed and suspended.",
    icon: Star,
  },
  {
    title: "Secure payments",
    desc: "Escrow-based system — pay only after successful delivery.",
    icon: Lock,
  },
  {
    title: "Photo confirmation",
    desc: "Visual proof at pickup and delivery for transparency.",
    icon: Camera,
  },
  {
    title: "24/7 support",
    desc: "Always available support team across Lagos.",
    icon: Headphones,
  },
  {
    title: "ERS verified badge",
    desc: "Top-tier runners with 50+ errands and 4.9+ rating.",
    icon: BadgeCheck,
  },
];

const testimonials = [
  {
    name: "Tunde A.",
    text: "ERS saved me 3 hours in Lagos traffic. This is a game changer.",
  },
  {
    name: "Ada K.",
    text: "Finally, reliable help. My errands get done without stress.",
  },
  {
    name: "Chinedu O.",
    text: "The tracking and updates make it feel very secure.",
  },
];

export default function Trust() {
  return (
    <section className="py-28 px-6 relative overflow-hidden">

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#1ED760]/5 via-transparent to-[#1ED760]/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1ED760]/10 blur-[140px] rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10 text-center">

        {/* Heading */}
        <p className="text-xs tracking-widest text-[#1ED760] mb-4">
          BUILT FOR TRUST
        </p>

        <h2 className="text-4xl md:text-6xl font-bold">
          Your safety is our priority
        </h2>

        <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
          Built from the ground up for reliability — not as an afterthought.
        </p>

        {/* STATS */}
        <div className="mt-14 grid md:grid-cols-3 gap-8">

          <div>
            <p className="text-3xl font-bold text-[#1ED760]">
              <Counter target={100} suffix="%" />
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Verified runners
            </p>
          </div>

          <div>
            <p className="text-3xl font-bold text-[#1ED760]">
              <Counter target={4.9} />★
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Average rating
            </p>
          </div>

          <div>
            <p className="text-3xl font-bold text-[#1ED760]">
              ₦<Counter target={0} />
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Lost in disputes
            </p>
          </div>

        </div>

        {/* FEATURES */}
        <div className="mt-16 grid md:grid-cols-3 gap-6">

          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#111217] border border-white/10 rounded-2xl p-6 text-left hover:border-white/20 hover:-translate-y-1 transition"
              >
                <Icon className="w-6 h-6 text-[#1ED760] mb-4" />

                <h3 className="text-sm font-semibold text-white">
                  {f.title}
                </h3>

                <p className="text-sm text-gray-400 mt-2">
                  {f.desc}
                </p>
              </motion.div>
            );
          })}

        </div>

        {/* TESTIMONIALS */}
        <div className="mt-20">

          <h3 className="text-lg font-semibold text-white mb-6">
            Loved by early users in Lagos
          </h3>

          <div className="grid md:grid-cols-3 gap-6">

            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-[#0E0F13] border border-white/10 rounded-xl p-5 text-left"
              >
                <p className="text-sm text-gray-300">
                  “{t.text}”
                </p>
                <p className="text-xs text-gray-500 mt-4">
                  — {t.name}
                </p>
              </div>
            ))}

          </div>

        </div>

        {/* TRUST BADGES */}
        <div className="mt-16 flex flex-wrap justify-center gap-6 text-gray-500 text-sm">

          <span className="border border-white/10 px-4 py-2 rounded-lg">
            Paystack Secured
          </span>

          <span className="border border-white/10 px-4 py-2 rounded-lg">
            NDPR Compliant
          </span>

          <span className="border border-white/10 px-4 py-2 rounded-lg">
            End-to-end encryption
          </span>

        </div>

      </div>
    </section>
  );
}