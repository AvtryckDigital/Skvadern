import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
    <html lang="sv" className="h-full">
      <body className="flex flex-col min-h-full antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
