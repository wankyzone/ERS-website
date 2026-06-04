"use client";

import { useEffect, useRef } from "react";

export default function Hero({
  task,
  setTask,
}: {
  task: string;
  setTask: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus when task changes (from categories click)
  useEffect(() => {
    if (task) {
      inputRef.current?.focus();
    }
  }, [task]);

  const handleSubmit = async () => {
    if (!task) return;

    await fetch("/api/errands", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task }),
    });

    alert("Errand submitted: " + task);
  };

  return (
    <section id="hero" className="py-28 px-6 text-center">

      <h1 className="text-4xl md:text-6xl font-bold">
        Run your errands{" "}
        <span className="text-[#1ED760]">
          without leaving your seat.
        </span>
      </h1>

      <div className="mt-10 max-w-2xl mx-auto flex items-center bg-[#111217] border border-white/10 rounded-xl overflow-hidden">

        <input
          ref={inputRef}
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="What do you need done?"
          className="flex-1 bg-transparent px-4 py-4 text-white outline-none"
        />

        <button
          onClick={handleSubmit}
          className="bg-[#1ED760] text-black px-6 py-4 font-semibold"
        >
          Find runner →
        </button>

      </div>
    </section>
  );
}