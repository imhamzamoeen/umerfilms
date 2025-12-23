import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Cinzel } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { Navigation, Footer, TransitionLayout, SkipToContent } from "@/components/layout";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "UmerFilms - Videographer Portfolio",
  description:
    "Professional videographer portfolio showcasing cinematic storytelling, commercial projects, and creative video production.",
  keywords: ["videographer", "portfolio", "video production", "cinematography"],
  authors: [{ name: "UmerFilms" }],
  creator: "UmerFilms",
  openGraph: {
    title: "UmerFilms - Cinematic Videographer",
    description: "Professional videography and cinematic storytelling",
    url: "https://umerfilms.com",
    siteName: "UmerFilms",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "UmerFilms - Cinematic Videographer",
    description: "Professional videography and cinematic storytelling",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cinzel.variable} antialiased bg-background text-foreground`}
      >
        <SkipToContent />
        <TransitionLayout>
          <Navigation />
          <main id="main-content" className="pt-16">{children}</main>
          <Footer />
        </TransitionLayout>
        <Analytics />
      </body>
    </html>
  );
}
