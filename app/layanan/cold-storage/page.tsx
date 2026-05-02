import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Check, Phone } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/seo/JsonLd'
import type { Service } from '@/lib/supabase/types'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://koperasiminabahari.com'
const slug = 'cold-storage'

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
    openGraph: {
      title: service.title,
      description: service.description || '',
      type: 'website',
      url: `${siteUrl}/layanan/${slug}`,
      images: [
        {
          url: `${siteUrl}/gambar/Ruang Proses Gudang 100ton.jpg`,
          width: 1200,
          height: 630,
          alt: service.title,
        },
      ],
    },
  }
}

export default async function ColdStoragePage() {
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
      <ServiceJsonLd
        name={service.title}
        description={service.description || ''}
        provider="Koperasi Jasa Sukses Mina Bahari"
        areaServed="Kota Pekalongan"
        url={`${siteUrl}/layanan/${slug}`}
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
                  Fasilitas Cold Storage
                </h3>
                {service.image || service.image2 ? (
                  <div className={`grid gap-4 ${service.image && service.image2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
                    {service.image && (
                      <div className="rounded-xl overflow-hidden shadow-lg relative h-80 sm:h-96 w-full">
                        <Image
                          src={service.image}
                          alt={`${service.title} 1`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="lazy"
                        />
                      </div>
                    )}
                    {service.image2 && (
                      <div className="rounded-xl overflow-hidden shadow-lg relative h-80 sm:h-96 w-full">
                        <Image
                          src={service.image2}
                          alt={`${service.title} 2`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl overflow-hidden shadow-md relative h-64">
                      <Image
                        src="/gambar/Ruang Proses Gudang 100ton.jpg"
                        alt="Ruang Proses Gudang 100 Ton"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                    </div>
                    <div className="rounded-xl overflow-hidden shadow-md relative h-64">
                      <Image
                        src="/gambar/Ruang Proses Gudang 30 Ton.jpg"
                        alt="Ruang Proses Gudang 30 Ton"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-light rounded-xl p-8">
                <h3 className="text-2xl font-bold text-primary mb-4">
                  Mengapa Memilih Cold Storage Kami?
                </h3>
                <p className="text-gray-600 mb-4">
                  Kami bukan sekadar tempat penyimpanan, 
                  tapi mitra bisnis yang menjamin keamanan produk Anda secara legal. 
                  Dengan kepemilikan NIB (Nomor Induk Berusaha) dan SKP (Sertifikat Kelayakan Pengolahan), kami menjamin standar operasional yang telah tersertifikasi oleh negara dan memenuhi regulasi keamanan pangan.
                </p>
                <p className="text-gray-600">
                  Dengan kapasitas penyimpanan hingga 500 ton dan sistem keamanan
                  24/7, kami menjamin produk Anda tersimpan dengan aman dan dapat
                  diakses kapan saja sesuai kebutuhan.
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
                    href="tel:+628156567587"
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
