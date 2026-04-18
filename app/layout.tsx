import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/shared/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://koperasiminabahari.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Koperasi Sukses Mina Bahari - Cold Storage Pekalongan",
    template: "%s | Koperasi Sukses Mina Bahari"
  },
  description: "Layanan cold storage, pembekuan ikan, dan sewa mobil thermoking terpercaya di Pekalongan. Solusi penyimpanan dan distribusi produk perikanan dengan teknologi modern.",
  keywords: ["cold storage pekalongan", "pembekuan ikan pekalongan", "sewa thermoking pekalongan", "koperasi perikanan pekalongan", "cold storage jawa tengah"],
  authors: [{ name: "Koperasi Sukses Mina Bahari" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Koperasi Sukses Mina Bahari",
    title: "Koperasi Sukses Mina Bahari - Cold Storage Pekalongan",
    description: "Layanan cold storage, pembekuan ikan, dan sewa mobil thermoking terpercaya di Pekalongan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koperasi Sukses Mina Bahari - Cold Storage Pekalongan",
    description: "Layanan cold storage, pembekuan ikan, dan sewa mobil thermoking terpercaya di Pekalongan.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
