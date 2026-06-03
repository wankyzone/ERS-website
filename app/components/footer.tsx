export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-6">

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

        {/* Brand */}
        <div className="text-left">
          <h2 className="text-base font-semibold text-white">
            ERS
          </h2>
          <p className="text-sm text-secondary mt-2 max-w-xs">
            Run your errands without stress. Built for speed, reliability, and trust.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-secondary">
          <a href="#" className="transition hover:text-white">
            About
          </a>
          <a href="#" className="transition hover:text-white">
            How it works
          </a>
          <a href="#" className="transition hover:text-white">
            Contact
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-secondary text-left md:text-right">
          © {new Date().getFullYear()} ERS. All rights reserved.
        </p>

      </div>
    </footer>
  );
}