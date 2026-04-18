import Hero from '@/components/home/Hero'
import Stats from '@/components/home/Stats'
import Services from '@/components/home/Services'
import WhyUs from '@/components/home/WhyUs'
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
        name="Koperasi Sukses Mina Bahari"
        description="Layanan cold storage, pembekuan ikan, dan sewa mobil thermoking terpercaya di Pekalongan untuk menjaga kualitas produk perikanan Anda."
        address={{
          addressLocality: 'Pekalongan',
          addressRegion: 'Jawa Tengah',
          addressCountry: 'ID',
        }}
        telephone="+6281234567890"
        email="info@suksesminabahari.com"
        url={siteUrl}
        openingHours="Mo-Sa 08:00-17:00"
        priceRange="$$"
      />

      <Hero />
      <Stats />
      <Services />
      <WhyUs />
      <ContactCTA />
    </>
  )
}
