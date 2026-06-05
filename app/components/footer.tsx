"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 pt-16 pb-10 px-6 bg-[#0B0D12]">

      <div className="max-w-6xl mx-auto">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <h2 className="text-xl font-bold text-white mb-4">
              ERS
            </h2>

            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              On-demand errands in Lagos. Verified runners,
              real-time tracking, and secure payments.
            </p>

            {/* SOCIALS */}
            <div className="flex gap-3">
              {["X", "in", "f"].map((s, i) => (
                <div
                  key={i}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition cursor-pointer"
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* PRODUCT */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Product
            </h3>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <Link href="/" className="hover:text-white">How it works</Link>
              <Link href="/" className="hover:text-white">For Runners</Link>
              <Link href="/" className="hover:text-white">Pricing</Link>
              <Link href="/" className="hover:text-white">Safety</Link>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Company
            </h3>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <Link href="/" className="hover:text-white">About</Link>
              <Link href="/" className="hover:text-white">Blog</Link>
              <Link href="/" className="hover:text-white">Careers</Link>
              <Link href="/" className="hover:text-white">Press</Link>
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Legal
            </h3>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="/cookie-policy" className="hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">

          <p>
            © {new Date().getFullYear()} ERS — Errand Runners System.
          </p>

          {/* LEGAL INLINE LINKS (Glovo-style) */}
          <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm">
            <Link href="/terms-of-service" className="hover:text-white">
              Terms
            </Link>
            <Link href="/privacy-policy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/cookie-policy" className="hover:text-white">
              Cookies
            </Link>
          </div>

        </div>

      </div>
    </footer>
  );
}