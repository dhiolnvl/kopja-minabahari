import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import ServiceCard from '@/components/shared/ServiceCard'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import type { Service } from '@/lib/supabase/types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://koperasiminabahari.com'

export const metadata: Metadata = {
  title: 'Layanan Kami',
  description:
    'Layanan lengkap cold storage, pembekuan ikan, dan sewa mobil thermoking untuk kebutuhan penyimpanan dan distribusi produk perikanan Anda di Pekalongan.',
  alternates: {
    canonical: `${siteUrl}/layanan`,
  },
}

export default async function LayananPage() {
  const supabase = await createClient()

  const { data: services } = (await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)) as { data: Service[] | null }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: siteUrl },
          { name: 'Layanan', url: `${siteUrl}/layanan` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-ocean py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Layanan Kami</h1>
            <p className="text-xl text-gray-200">
              Solusi lengkap untuk kebutuhan penyimpanan, pembekuan, dan
              distribusi produk perikanan dengan standar kualitas terbaik.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {services && services.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600">Belum ada layanan yang tersedia.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">
            Butuh Konsultasi?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Tim kami siap membantu Anda menemukan solusi terbaik untuk kebutuhan
            penyimpanan dan distribusi produk perikanan Anda.
          </p>
          <a
            href="/kontak"
            className="inline-block bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
          >
            Hubungi Kami
          </a>
        </div>
      </section>
    </>
  )
}
