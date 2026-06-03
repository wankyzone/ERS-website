export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-white/5 backdrop-blur-md sticky top-0 z-50">
      
      <h1 className="text-xl font-semibold text-[#1ED760] glow-text">
        ERS
      </h1>

      <button className="bg-[#1ED760] text-black px-4 py-2 rounded-lg font-medium hover:scale-105 transition-all duration-300 glow-green">
        Join Waitlist
      </button>
    </nav>
  );
}