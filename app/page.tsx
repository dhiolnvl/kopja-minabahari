import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import WhyUs from '@/components/home/WhyUs'
import Certificates from '@/components/home/Certificates'
import Gallery from '@/components/home/Gallery'
import ContactCTA from '@/components/home/ContactCTA'
import { LocalBusinessJsonLd } from '@/components/seo/JsonLd'
import type { Metadata } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://koperasiminabahari.com'

export const metadata: Metadata = {
  title: 'Beranda',
  alternates: {
    canonical: siteUrl,
  },
}

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd
        name="Koperasi Jasa Sukses Mina Bahari"
        description="Layanan cold storage, pembekuan ikan, dan sewa mobil thermoking terpercaya di Kota Pekalongan untuk menjaga kualitas produk perikanan Anda."
        address={{
          streetAddress: 'Jl. Pantai Sari No. 13',
          addressLocality: 'Pekalongan',
          addressRegion: 'Jawa Tengah',
          addressCountry: 'ID',
        }}
        telephone="+6281565675877"
        email="kopjasa.suksesminabaharipkl@gmail.com"
        url={siteUrl}
        openingHours="Mo-Sa 08:00-17:00"
        priceRange="$$"
      />

      <Hero />
      <Services />
      <WhyUs />
      <Certificates />
      <Gallery />
      <ContactCTA />
    </>
  )
}
