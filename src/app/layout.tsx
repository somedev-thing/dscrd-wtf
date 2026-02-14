import type { Metadata } from "next";
import { Outfit, Lexend, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  adjustFontFallback: false,
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
  adjustFontFallback: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "dscrd.wtf | The Discord Identity Layer",
  description: "Stop sending expired invites. Turn your User ID into a beautiful, permanent profile card.",
  icons: {
    icon: '/assets/img/dscrd.wtf-logo-full.png',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${lexend.variable} ${jetbrainsMono.variable} antialiased bg-void text-gray-200 font-body selection:bg-electric selection:text-white`}
      >
        <div className="noise-bg fixed inset-0 z-50 opacity-[0.04] pointer-events-none mix-blend-overlay"></div>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
