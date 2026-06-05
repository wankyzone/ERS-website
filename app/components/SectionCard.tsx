"use client";

export default function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group border border-white/10 rounded-2xl p-6 bg-[#111217] hover:border-white/20 transition-all duration-300 hover:-translate-y-1">

      <h2 className="text-xl font-semibold text-white mb-3 group-hover:text-[#1ED760] transition">
        {title}
      </h2>

      <div className="text-gray-400 leading-relaxed">
        {children}
      </div>

    </div>
  );
}