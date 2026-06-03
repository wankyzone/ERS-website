"use client";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[var(--bg)]/70 border-b border-white/10">

      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo (subtle, not loud) */}
        <h1 className="text-base font-semibold tracking-tight text-white">
          ERS
        </h1>

        {/* CTA */}
        <button className="px-5 py-2 rounded-lg font-medium bg-accent text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(30,215,96,0.25)]">
          Join Waitlist
        </button>

      </div>
    </nav>
  );
}