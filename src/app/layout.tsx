import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const display = localFont({
  src: [
    {
      path: "../fonts/cormorant-garamond-normal.woff2",
      style: "normal",
    },
    {
      path: "../fonts/cormorant-garamond-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = localFont({
  src: [
    {
      path: "../fonts/source-sans-3-normal.woff2",
      style: "normal",
    },
    {
      path: "../fonts/source-sans-3-italic.woff2",
      style: "italic",
    },
  ],
  variable: "--font-source-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://skvadern.net";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Skvaderns Hembygdsförening",
  description: "En studentförening vid Norrlands nation i Uppsala, grundad 1950.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="sv" className={`${display.variable} ${sans.variable} h-full`}>
      <body className="flex flex-col min-h-full antialiased font-sans">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
