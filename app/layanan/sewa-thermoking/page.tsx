import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Check, Phone } from 'lucide-react'
import Link from 'next/link'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'
import type { Service } from '@/lib/supabase/types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://koperasiminabahari.com'
const slug = 'sewa-thermoking'

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient()
  const { data: service } = (await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()) as { data: Service | null }

  if (!service) {
    return {
      title: 'Layanan Tidak Ditemukan',
    }
  }

  return {
    title: service.title,
    description: service.description || '',
    alternates: {
      canonical: `${siteUrl}/layanan/${slug}`,
    },
  }
}

export default async function SewaThermoKingPage() {
  const supabase = await createClient()

  const { data: service } = (await supabase
    .from('services')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()) as { data: Service | null }

  if (!service) {
    notFound()
  }

  const features = (service.features as string[]) || []

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: siteUrl },
          { name: 'Layanan', url: `${siteUrl}/layanan` },
          { name: service.title, url: `${siteUrl}/layanan/${slug}` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-ocean py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {service.title}
            </h1>
            <p className="text-xl text-gray-200">{service.description}</p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-primary mb-6">
                Fitur & Keunggulan
              </h2>

              <div className="space-y-4 mb-12">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Check className="text-accent flex-shrink-0 mt-1" size={20} />
                    <span className="text-gray-700 text-lg">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Gallery Images */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-primary mb-6">
                  Peralatan & Fasilitas
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <img
                      src="/gambar/Peralatan Proses.jpg"
                      alt="Peralatan Proses"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <img
                      src="/gambar/penyusunan di troli.jpg"
                      alt="Penyusunan di Troli"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-light rounded-xl p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Mengapa Memilih Armada Kami?
                </h3>
                <p className="text-gray-600 mb-4">
                  Armada kendaraan berpendingin kami dilengkapi dengan sistem
                  thermoking terpercaya yang menjaga suhu optimal selama
                  perjalanan, memastikan produk perikanan Anda sampai ke tujuan
                  dalam kondisi segar.
                </p>
                <p className="text-gray-600">
                  Dengan sopir berpengalaman dan sistem GPS tracking real-time,
                  Anda dapat memantau pengiriman produk Anda kapan saja. Tersedia
                  pilihan sewa harian atau bulanan sesuai kebutuhan.
                </p>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-primary text-white rounded-xl p-8 sticky top-24">
                <h3 className="text-2xl font-bold mb-6">Tertarik?</h3>
                <p className="text-gray-200 mb-6">
                  Hubungi kami sekarang untuk konsultasi gratis dan penawaran
                  terbaik.
                </p>

                <div className="space-y-4">
                  <Link
                    href="/kontak"
                    className="block w-full bg-accent hover:bg-accent-dark text-white text-center px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Hubungi Kami
                  </Link>

                  <a
                    href="tel:+6281234567890"
                    className="flex items-center justify-center w-full bg-white hover:bg-gray-100 text-primary px-6 py-3 rounded-lg font-semibold transition-colors"
                  >
                    <Phone size={20} className="mr-2" />
                    Telepon
                  </a>
                </div>

                {service.price_info && (
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <p className="text-sm text-gray-300">{service.price_info}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
