import "./globals.css";

export const metadata = {
  title: "ERS — Run your errands effortlessly",
  description: "Get anything done by trusted runners in minutes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0B0B0F] text-white antialiased tracking-tight">
        {children}
      </body>
    </html>
  );
}  