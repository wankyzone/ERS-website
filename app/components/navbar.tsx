"use client";

import { Menu } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#0B0D12]/70 border-b border-white/10">

      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LEFT: Logo */}
        <div className="flex items-center gap-2">
          {/* Logo icon */}
          <div className="w-6 h-6 bg-[#1ED760] rounded-md flex items-center justify-center">
            <div className="w-2 h-2 bg-black rounded-full" />
          </div>

          {/* Brand */}
          <span className="text-white font-semibold text-sm tracking-tight">
            ERS
          </span>

          <span className="text-gray-500 text-xs hidden sm:block">
            Errand Runners
          </span>
        </div>

        {/* CENTER: Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
          <a href="#how" className="hover:text-white transition">
            How it works
          </a>
          <a href="#runners" className="hover:text-white transition">
            For Runners
          </a>
          <a href="#about" className="hover:text-white transition">
            About
          </a>
        </div>

        {/* RIGHT: CTA + Mobile Menu */}
        <div className="flex items-center gap-3">

          {/* CTA */}
          <button className="hidden sm:block px-5 py-2 rounded-lg font-medium bg-[#1ED760] text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(30,215,96,0.25)]">
            Join Waitlist
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg border border-white/10"
          >
            <Menu size={18} />
          </button>

        </div>

      </div>

      {/* MOBILE DROPDOWN */}
      {open && (
        <div className="md:hidden px-6 pb-4 space-y-4 text-sm text-gray-400 border-t border-white/10">

          <a href="#how" className="block hover:text-white">
            How it works
          </a>
          <a href="#runners" className="block hover:text-white">
            For Runners
          </a>
          <a href="#about" className="block hover:text-white">
            About
          </a>

          <button className="w-full mt-2 px-4 py-3 rounded-lg bg-[#1ED760] text-black font-medium">
            Join Waitlist
          </button>

        </div>
      )}
    </nav>
  );
}