import "./globals.css";

export const metadata = {
  title: "ERS Platform",
  description: "Errand Runners System",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0B0F14] text-gray-100">
        {children}
      </body>
    </html>
  );
}