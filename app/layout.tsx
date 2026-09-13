import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nafaqo.org"),
  title: {
    default: "Nafaqo Kitchen \u2014 Nourishing Learning. Strengthening Food Systems.",
    template: "%s \u2014 Nafaqo Kitchen",
  },
  description:
    "A Somali-led institution built for safe, reliable and accountable school feeding. Centralised kitchens, local sourcing, school delivery and digital verification.",
  openGraph: {
    title: "Nafaqo Kitchen",
    description: "Building a Somalia where no child has to learn hungry.",
    url: "https://nafaqo.org",
    siteName: "Nafaqo Kitchen",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={figtree.variable}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
