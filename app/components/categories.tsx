"use client";

import {
  ShoppingCart,
  Package,
  Pill,
  Box,
  Zap,
  Coffee,
} from "lucide-react";

const categories = [
  { title: "Groceries", icon: ShoppingCart, color: "text-green-400 bg-green-500/10" },
  { title: "Deliveries", icon: Package, color: "text-blue-400 bg-blue-500/10" },
  { title: "Pharmacy", icon: Pill, color: "text-yellow-400 bg-yellow-500/10" },
  { title: "Packages", icon: Box, color: "text-purple-400 bg-purple-500/10" },
  { title: "Quick Tasks", icon: Zap, color: "text-orange-400 bg-orange-500/10" },
  { title: "Food & Drinks", icon: Coffee, color: "text-pink-400 bg-pink-500/10" },
];

export default function Categories({
  setTask,
}: {
  setTask: (v: string) => void;
}) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* Label */}
        <p className="text-xs tracking-widest text-gray-500 mb-10">
          WHAT CAN WE DO FOR YOU?
        </p>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">

          {categories.map((cat, i) => {
            const Icon = cat.icon;

            return (
              <div
                key={i}
                onClick={() => {
                  setTask(cat.title);

                  const el = document.getElementById("hero");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                }}
                className="
                  group
                  bg-[#111217]
                  border border-white/10
                  rounded-2xl
                  p-6
                  flex flex-col items-center justify-center
                  cursor-pointer
                  transition-all duration-300
                  hover:-translate-y-2
                  hover:border-white/20
                  hover:shadow-[0_0_40px_rgba(30,215,96,0.08)]
                "
              >
                {/* Icon */}
                <div
                  className={`
                    ${cat.color}
                    w-12 h-12
                    flex items-center justify-center
                    rounded-xl
                    mb-4
                    transition-all duration-300
                    group-hover:scale-110
                  `}
                >
                  <Icon size={20} />
                </div>

                {/* Title */}
                <p className="text-sm text-white font-medium">
                  {cat.title}
                </p>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}