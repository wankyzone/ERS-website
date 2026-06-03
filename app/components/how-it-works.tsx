"use client";
import { motion } from "framer-motion";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

export default function HowItWorks() {
  return (
    <section className="py-20 px-6">
      <h2 className="text-center text-3xl font-semibold mb-10">
        How it works
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid sm:grid-cols-1 md:grid-cols-3 gap-6"
      >
        {[
          "Post an errand",
          "Runner accepts",
          "Task gets done",
        ].map((step, i) => (
          <motion.div
            key={i}
            variants={item}
            className="bg-[#111217] p-6 rounded-xl border border-white/5 hover:border-[#1ED760]/30 hover:shadow-[0_0_30px_rgba(30,215,96,0.15)] transition-all duration-300 hover:-translate-y-2"
          >
            <p className="text-[#1ED760] font-semibold mb-2">
              Step {i + 1}
            </p>
            <h3 className="text-lg">{step}</h3>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}