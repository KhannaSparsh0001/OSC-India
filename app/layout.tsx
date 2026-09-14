import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://osci.osconnect.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Open Source Connect India | OSCI",
    template: "%s | Open Source Connect India",
  },
  description:
    "India's premier open-source community connecting contributors, mentors, and innovative projects across the nation.",
  keywords: [
    "open source",
    "India",
    "OSCI",
    "contributors",
    "mentors",
    "open source connect",
    "developer community",
    "open source India",
  ],
  authors: [{ name: "Open Source Connect India" }],

  // Open Graph — Facebook, LinkedIn, Discord, WhatsApp, Telegram, Slack
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Open Source Connect India",
    title: "Open Source Connect India | OSCI",
    description:
      "India's premier open-source community connecting contributors, mentors, and innovative projects across the nation.",
    images: [
      {
        url: "/og-image.png",
        width: 1024,
        height: 537,
        alt: "Open Source Connect India — Connecting The World Through Open Source",
        type: "image/png",
      },
    ],
  },

  // Twitter / X Card
  twitter: {
    card: "summary_large_image",
    title: "Open Source Connect India | OSCI",
    description:
      "India's premier open-source community connecting contributors, mentors, and innovative projects across the nation.",
    images: ["/og-image.png"],
  },

  // Favicons and App Icons for all browsers (Chrome, Brave, Safari, Firefox, Edge, Android, iOS)
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-48x48.png", type: "image/png", sizes: "48x48" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",

  // Additional social hints
  other: {
    "theme-color": "#FF7518",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning data-scroll-behavior="smooth">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
