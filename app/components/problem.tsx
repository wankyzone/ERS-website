"use client";
import { motion } from "framer-motion";

export default function Problem() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="py-20 px-6 text-center"
    >
      <h2 className="text-3xl font-semibold">
        Everyday tasks are slowing you down
      </h2>

      <p className="text-gray-400 mt-4 max-w-xl mx-auto">
        Traffic. Long queues. Stress. Lagos isn’t built for efficiency —
        but your time is too valuable to waste.
      </p>
    </motion.section>
  );
}