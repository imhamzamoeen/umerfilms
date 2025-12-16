import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
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

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
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
        className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} antialiased bg-background text-foreground`}
      >
        <SkipToContent />
        <TransitionLayout>
          <Navigation />
          <main id="main-content" className="pt-16">{children}</main>
          <Footer />
        </TransitionLayout>
      </body>
    </html>
  );
}
