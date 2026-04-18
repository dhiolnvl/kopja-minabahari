import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

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
    default: "Koperasi Jasa Sukses Mina Bahari - Cold Storage Kota Pekalongan",
    template: "%s | Koperasi Jasa Sukses Mina Bahari"
  },
  description: "Layanan cold storage, pembekuan ikan, dan sewa mobil thermoking terpercaya di Kota Pekalongan. Membangun ekonomi kerakyatan di masyarakat pesisir pantai dengan solusi penyimpanan dan distribusi produk perikanan berteknologi modern.",
  keywords: ["cold storage pekalongan", "pembekuan ikan pekalongan", "sewa thermoking pekalongan", "koperasi perikanan pekalongan", "cold storage jawa tengah", "koperasi jasa sukses mina bahari"],
  authors: [{ name: "Koperasi Jasa Sukses Mina Bahari" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Koperasi Jasa Sukses Mina Bahari",
    title: "Koperasi Jasa Sukses Mina Bahari - Cold Storage Kota Pekalongan",
    description: "Layanan cold storage, pembekuan ikan, dan sewa mobil thermoking terpercaya di Kota Pekalongan.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Koperasi Jasa Sukses Mina Bahari - Cold Storage Kota Pekalongan",
    description: "Layanan cold storage, pembekuan ikan, dan sewa mobil thermoking terpercaya di Kota Pekalongan.",
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
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
