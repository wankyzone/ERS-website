"use client";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-16 px-6">

      <div className="max-w-6xl mx-auto">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">
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
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition"
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
              <a href="#" className="hover:text-white transition">How it works</a>
              <a href="#" className="hover:text-white transition">For Runners</a>
              <a href="#" className="hover:text-white transition">Pricing</a>
              <a href="#" className="hover:text-white transition">Safety</a>
            </div>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Company
            </h3>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition">About</a>
              <a href="#" className="hover:text-white transition">Blog</a>
              <a href="#" className="hover:text-white transition">Careers</a>
              <a href="#" className="hover:text-white transition">Press</a>
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">
              Legal
            </h3>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition">Privacy Policy</a>
              <a href="#" className="hover:text-white transition">Terms of Service</a>
              <a href="#" className="hover:text-white transition">Cookie Policy</a>
            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">

          <p>
            © {new Date().getFullYear()} ERS — Errand Runners System. Made in Lagos 🇳🇬
          </p>

          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <span>All systems operational</span>
          </div>

        </div>

      </div>
    </footer>
  );
}