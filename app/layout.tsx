import type { Metadata } from "next";
import { Rubik, Nunito_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const rubik = Rubik({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-head", display: "swap" });
const nunito = Nunito_Sans({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-body", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nafaqo.org"),
  title: { default: "Nafaqo Kitchen \u2014 Nourishing the Future", template: "%s \u2014 Nafaqo Kitchen" },
  description:
    "Nafaqo Kitchen is building a central kitchen in Mogadishu to cook hot meals for schools every morning \u2014 sourced locally, delivered on fixed routes and verified to the child.",
  openGraph: {
    title: "Nafaqo Kitchen",
    description: "Nourishing the Future.",
    url: "https://nafaqo.org",
    siteName: "Nafaqo Kitchen",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={rubik.variable + " " + nunito.variable}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
