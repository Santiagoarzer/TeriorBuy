import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TeriorBuy - Discover & Shop Real Interiors",
  description: "The ultimate discovery and shopping experience for real-world interiors.",
};

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import { VisualSearch } from "@/components/search/VisualSearch";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${inter.variable} ${outfit.variable} antialiased flex flex-col min-h-screen`}
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <VisualSearch />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
