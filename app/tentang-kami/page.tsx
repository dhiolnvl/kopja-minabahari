import type { Metadata } from 'next'
import { Target, Eye, Award, Users } from 'lucide-react'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://koperasiminabahari.com'

export const metadata: Metadata = {
  title: 'Tentang Kami',
  description:
    'Koperasi Sukses Mina Bahari adalah koperasi perikanan terpercaya di Pekalongan yang telah berpengalaman lebih dari 10 tahun dalam bidang cold storage dan distribusi perikanan.',
  alternates: {
    canonical: `${siteUrl}/tentang-kami`,
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
            <p className="text-xl text-gray-200">
              Koperasi Sukses Mina Bahari adalah mitra terpercaya untuk solusi
              penyimpanan dan distribusi produk perikanan di Pekalongan, Jawa
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
                  Koperasi Sukses Mina Bahari didirikan pada tahun 2014 dengan
                  visi untuk mendukung industri perikanan di Pekalongan. Berawal
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
            <div className="bg-gradient-to-br from-accent/10 to-ocean/10 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <Award className="w-48 h-48 text-primary/30" />
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

          <div className="bg-white rounded-xl p-8">
            <div className="aspect-video bg-gradient-to-br from-primary/10 to-ocean/10 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Pekalongan, Jawa Tengah, Indonesia
                </p>
                <p className="text-sm text-gray-500">
                  (Google Maps akan ditambahkan di sini)
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
