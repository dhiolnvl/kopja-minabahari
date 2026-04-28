import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/layout/LayoutWrapper";

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
  preload: false,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://koperasiminabahari.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Koperasi Jasa Sukses Mina Bahari - Cold Storage Kota Pekalongan",
    template: "%s | Koperasi Jasa Sukses Mina Bahari"
  },
  description: "Layanan cold storage, pembekuan ikan, dan sewa mobil thermoking terpercaya di Kota Pekalongan. Membangun ekonomi kerakyatan di masyarakat pesisir pantai dengan solusi penyimpanan dan distribusi produk perikanan berteknologi modern.",
  keywords: ["cold storage pekalongan", "pembekuan ikan pekalongan", "sewa thermoking pekalongan", "koperasi perikanan pekalongan", "cold storage jawa tengah", "koperasi jasa sukses mina bahari", "penyimpanan ikan beku", "cold storage murah"],
  authors: [{ name: "Koperasi Jasa Sukses Mina Bahari" }],
  creator: "Koperasi Jasa Sukses Mina Bahari",
  publisher: "Koperasi Jasa Sukses Mina Bahari",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  icons: {
    icon: [
      { url: '/gambar/logo.jpeg', sizes: 'any', type: 'image/jpeg' },
      { url: '/icon.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/gambar/logo.jpeg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "Koperasi Jasa Sukses Mina Bahari",
    title: "Koperasi Jasa Sukses Mina Bahari - Cold Storage Kota Pekalongan",
    description: "Layanan cold storage, pembekuan ikan, dan sewa mobil thermoking terpercaya di Kota Pekalongan.",
    images: [
      {
        url: `${siteUrl}/gambar/Gedung Tampak Depan 2.jpg`,
        width: 1200,
        height: 630,
        alt: "Koperasi Jasa Sukses Mina Bahari - Gedung Cold Storage Pekalongan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Koperasi Jasa Sukses Mina Bahari - Cold Storage Kota Pekalongan",
    description: "Layanan cold storage, pembekuan ikan, dan sewa mobil thermoking terpercaya di Kota Pekalongan.",
    images: [`${siteUrl}/gambar/Gedung Tampak Depan 2.jpg`],
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: 'business',
  alternates: {
    canonical: siteUrl,
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
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-full flex flex-col">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
