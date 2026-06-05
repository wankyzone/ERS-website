import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import CookieBanner from "./components/CookieBanner";
import Analytics from "./components/Analytics";

// Display font — distinctive, strong, memorable
const syne = Syne({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
});

// Body font — clean, legible at small sizes
const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["300", "400", "500", "600"],
});

const BASE_URL = "https://ers.wankysoftware.com";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ERS — Errand Runners in Lagos",
    template: "%s | ERS",
  },
  description:
    "Get errands done without leaving your seat. ERS connects you with trusted runners across Lagos for deliveries, pickups, and more.",
  keywords: [
    "errand runner Lagos",
    "delivery Lagos",
    "errand service Nigeria",
    "pickup Lagos",
    "ERS",
  ],
  authors: [{ name: "ERS" }],
  creator: "ERS",
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: BASE_URL,
    siteName: "ERS",
    title: "ERS — Errand Runners in Lagos",
    description:
      "Get errands done without leaving your seat. ERS connects you with trusted runners across Lagos.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ERS — Errand Runners in Lagos",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ERS — Errand Runners in Lagos",
    description:
      "Get errands done without leaving your seat. Trusted runners across Lagos.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0B0D12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ldJson = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "ERS",
    url: BASE_URL,
    description:
      "Errand runner platform connecting people with trusted runners across Lagos, Nigeria.",
    areaServed: {
      "@type": "City",
      name: "Lagos",
    },
    serviceType: "Errand Running Service",
  };

  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* LD+JSON must be in <head> for crawlers — not afterInteractive */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
        />
      </head>
      <body className="bg-[#0B0D12] text-white antialiased font-sans">
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}