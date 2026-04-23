import type { Metadata } from 'next'
import Image from 'next/image'
import { Target, Eye, Award, Users } from 'lucide-react'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://koperasiminabahari.com'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'Koperasi Jasa Sukses Mina Bahari adalah koperasi perikanan terpercaya di Kota Pekalongan yang telah berpengalaman lebih dari 10 tahun dalam bidang cold storage dan distribusi perikanan.',
  alternates: {
    canonical: `${siteUrl}/tentang-kami`,
  },
  openGraph: {
    title: 'Tentang Kami - Koperasi Jasa Sukses Mina Bahari',
    description:
      'Koperasi Jasa Sukses Mina Bahari adalah koperasi perikanan terpercaya di Kota Pekalongan yang telah berpengalaman lebih dari 10 tahun dalam bidang cold storage dan distribusi perikanan.',
    type: 'website',
    url: `${siteUrl}/tentang-kami`,
    images: [
      {
        url: `${siteUrl}/gambar/Gedung Tampa Depan.jpg`,
        width: 1200,
        height: 630,
        alt: 'Gedung Koperasi Jasa Sukses Mina Bahari',
      },
    ],
  },
}

export default function TentangKami() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: siteUrl },
          { name: 'Tentang Kami', url: `${siteUrl}/tentang-kami` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-ocean py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Tentang Kami</h1>
            <p className="text-accent text-lg italic font-semibold mb-4">
              "Membangun Ekonomi Kerakyatan di Masyarakat Pesisir Pantai Kota Pekalongan"
            </p>
            <p className="text-xl text-gray-200">
              Koperasi Jasa Sukses Mina Bahari adalah mitra terpercaya untuk solusi
              penyimpanan dan distribusi produk perikanan di Kota Pekalongan, Jawa
              Tengah.
            </p>
          </div>
        </div>
      </section>

      {/* Sejarah */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Sejarah Koperasi
              </h2>
              <div className="prose prose-lg text-gray-600 space-y-4">
                <p>
                  Koperasi Jasa Sukses Mina Bahari didirikan pada tahun 2014 dengan
                  visi untuk mendukung industri perikanan di Kota Pekalongan. Berawal
                  dari kebutuhan para nelayan dan pengusaha perikanan akan
                  fasilitas penyimpanan berpendingin yang berkualitas.
                </p>
                <p>
                  Selama lebih dari 10 tahun, kami telah berkembang menjadi salah
                  satu penyedia layanan cold storage, pembekuan ikan, dan
                  distribusi berpendingin terpercaya di wilayah Jawa Tengah.
                </p>
                <p>
                  Dengan komitmen pada kualitas dan kepuasan pelanggan, kami terus
                  berinovasi dan meningkatkan standar layanan kami untuk memenuhi
                  kebutuhan industri perikanan modern.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-xl relative h-96">
              <Image
                src="/gambar/Gedung Tampa Depan.jpg"
                alt="Gedung Koperasi Sukses Mina Bahari"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visi & Misi */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Visi */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                <Eye className="text-primary" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Visi</h3>
              <p className="text-gray-600 text-lg">
                Menjadi koperasi perikanan terdepan di Indonesia yang menyediakan
                solusi penyimpanan dan distribusi produk perikanan berkualitas
                tinggi dengan standar internasional.
              </p>
            </div>

            {/* Misi */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <Target className="text-accent" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Misi</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Menyediakan fasilitas cold storage berteknologi tinggi
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Memberikan layanan terbaik kepada mitra nelayan dan pengusaha
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Mendukung peningkatan nilai tambah produk perikanan
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  Berkontribusi pada pengembangan ekonomi maritim Indonesia
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai-nilai */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Nilai-Nilai Perusahaan
            </h2>
            <p className="text-lg text-gray-600">
              Fondasi yang mendasari setiap layanan kami
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-primary" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Profesionalisme
              </h3>
              <p className="text-gray-600">
                Melayani dengan standar profesional dan dedikasi tinggi
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="text-accent" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Integritas</h3>
              <p className="text-gray-600">
                Menjunjung tinggi kejujuran dan transparansi
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-ocean/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="text-ocean" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Inovasi</h3>
              <p className="text-gray-600">
                Terus berinovasi untuk memberikan solusi terbaik
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Lokasi */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Lokasi Kami</h2>
            <p className="text-lg text-gray-600">
              Berlokasi strategis di pusat industri perikanan Pekalongan
            </p>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="w-full overflow-hidden rounded-lg" style={{ height: '450px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.256033199203!2d109.68793287555779!3d-6.859887393138602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7025ad5e4c3253%3A0xa5bf3cc94766c805!2sKoperasi%20Jasa%20Sukses%20Mina%20Bahari!5e0!3m2!1sid!2sid!4v1776760097720!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Koperasi Jasa Sukses Mina Bahari"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
