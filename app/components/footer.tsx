export default function Footer() {
  return (
    <footer className="text-center py-10 border-t border-white/5 text-gray-500">
      © {new Date().getFullYear()} ERS. All rights reserved.
    </footer>
  );
}