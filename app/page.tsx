import dynamic from 'next/dynamic'
import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import { LocalBusinessJsonLd, OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/JsonLd'
import type { Metadata } from 'next'

// Dynamic imports untuk components yang tidak critical (below the fold)
const WhyUs = dynamic(() => import('@/components/home/WhyUs'), {
  loading: () => <div className="py-20 bg-light" />,
})
const Certificates = dynamic(() => import('@/components/home/Certificates'), {
  loading: () => <div className="py-20 bg-white" />,
})
const Gallery = dynamic(() => import('@/components/home/Gallery'), {
  loading: () => <div className="py-20 bg-light" />,
})
const News = dynamic(() => import('@/components/home/News'), {
  loading: () => <div className="py-20 bg-white" />,
})
const ContactCTA = dynamic(() => import('@/components/home/ContactCTA'), {
  loading: () => <div className="py-20 bg-primary" />,
})

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
      <OrganizationJsonLd
        name="Koperasi Jasa Sukses Mina Bahari"
        description="Koperasi perikanan terpercaya di Kota Pekalongan yang menyediakan layanan cold storage, pembekuan ikan, dan distribusi berpendingin dengan standar kualitas internasional."
        url={siteUrl}
        logo={`${siteUrl}/gambar/logo.jpeg`}
        address={{
          streetAddress: 'Jl. Pantai Sari No. 13',
          addressLocality: 'Pekalongan',
          addressRegion: 'Jawa Tengah',
          addressCountry: 'ID',
        }}
        telephone="+6281565675877"
        email="kopjasa.suksesminabaharipkl@gmail.com"
        sameAs={[]}
      />

      <WebSiteJsonLd
        name="Koperasi Jasa Sukses Mina Bahari"
        url={siteUrl}
        description="Layanan cold storage, pembekuan ikan, dan sewa mobil thermoking terpercaya di Kota Pekalongan."
      />

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
        openingHours="Mo-Sa 08:00-16:00"
        priceRange="$$"
      />

      <Hero />
      <Services />
      <WhyUs />
      <Certificates />
      <Gallery />
      <News />
      <ContactCTA />
    </>
  )
}
