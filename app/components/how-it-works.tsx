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

const steps = [
  {
    title: "Post an errand",
    desc: "Tell us what you need done in seconds — pickup, delivery, or any task.",
  },
  {
    title: "Runner accepts",
    desc: "A nearby verified runner picks up your request instantly.",
  },
  {
    title: "Track & complete",
    desc: "Watch progress in real-time until your errand is completed.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6">

      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <h2 className="text-center text-4xl md:text-5xl font-bold tracking-tight mb-16">
          How it works
        </h2>

        {/* Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-1 md:grid-cols-3 gap-8"
        >
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={item}
              className="relative surface p-8 rounded-2xl transition-all duration-300 hover:-translate-y-2 hover:border-white/20"
            >
              {/* Step Number (SUBTLE, not loud) */}
              <div className="absolute -top-4 left-6 text-xs font-semibold text-secondary bg-black px-3 py-1 rounded-full border border-white/10">
                {i + 1}
              </div>

              {/* Title */}
              <h3 className="text-lg font-semibold mt-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-secondary text-sm mt-3 leading-relaxed">
                {step.desc}
              </p>

            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}