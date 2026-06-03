import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "ERS — Run your errands effortlessly",
  description:
    "Skip traffic and stress. Get errands done by trusted runners across Lagos in minutes.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[var(--bg)] text-[var(--text-primary)] antialiased font-sans">

        {/* Global Wrapper */}
        <div className="min-h-screen flex flex-col">

          {/* Page Content */}
          <main className="flex-1">
            {children}
          </main>

        </div>

      </body>
    </html>
  );
}