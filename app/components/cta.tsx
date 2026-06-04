"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Toast from "./Toast";

export default function CTA() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleJoin = async () => {
    if (!email) return;

    setLoading(true);

    try {
      await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setEmail("");

      // ✅ Show toast
      setShowToast(true);

      // auto hide after 3s
      setTimeout(() => setShowToast(false), 3000);

    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <>
      {/* TOAST */}
      <Toast show={showToast} message="You're on the waitlist 🚀" />

      <section className="py-32 px-6 text-center relative overflow-hidden">

        {/* Glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1ED760]/5 via-transparent to-[#1ED760]/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#1ED760]/10 blur-[140px] rounded-full" />

        <div className="max-w-3xl mx-auto relative z-10">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#1ED760]/10 text-[#1ED760] text-sm mb-6">
            ⚡ Join 2,000+ on the waitlist
          </div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          >
            Stop wasting time{" "}
            <span className="text-[#1ED760]">
              on errands.
            </span>
          </motion.h2>

          {/* Subtext */}
          <p className="text-gray-400 mt-6 leading-relaxed max-w-xl mx-auto">
            ERS launches in Lagos soon. Be first in line — join the
            waitlist and get early access with free errand credits.
          </p>

          {/* Input */}
          <div className="mt-10 max-w-xl mx-auto relative">

            <div className="flex items-center bg-[#111217] border border-white/10 rounded-xl overflow-hidden shadow-lg">

              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-transparent px-4 py-4 text-sm outline-none text-white placeholder:text-gray-500"
              />

              <button
                onClick={handleJoin}
                disabled={loading}
                className="bg-[#1ED760] text-black px-6 py-4 font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Joining..." : "Join Waitlist →"}
              </button>

            </div>

            {/* Glow */}
            <div className="absolute inset-0 blur-xl bg-[#1ED760]/10 -z-10 rounded-xl"></div>

          </div>

          {/* Trust */}
          <p className="mt-6 text-sm text-gray-500">
            No spam. Early access + ₦500 errand credit when we launch.
          </p>

        </div>
      </section>
    </>
  );
}