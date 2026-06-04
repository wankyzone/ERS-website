"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function Toast({ show, message }: { show: boolean; message: string }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 
          bg-[#111217] border border-white/10 text-white px-6 py-4 rounded-xl shadow-xl z-50"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}