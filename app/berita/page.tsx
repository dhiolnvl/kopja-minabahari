import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { News } from '@/lib/supabase/types'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://koperasiminabahari.com'

export const metadata: Metadata = {
  title: 'Berita & Kegiatan',
  description:
    'Informasi terkini seputar kegiatan, pencapaian, dan berita terbaru dari Koperasi Jasa Sukses Mina Bahari di Kota Pekalongan.',
  alternates: {
    canonical: `${siteUrl}/berita`,
  },
  openGraph: {
    title: 'Berita & Kegiatan',
    description:
      'Informasi terkini seputar kegiatan, pencapaian, dan berita terbaru dari Koperasi Jasa Sukses Mina Bahari di Kota Pekalongan.',
    type: 'website',
    url: `${siteUrl}/berita`,
    images: [
      {
        url: `${siteUrl}/gambar/Gedung Tampak Depan 2.jpg`,
        width: 1200,
        height: 630,
        alt: 'Koperasi Jasa Sukses Mina Bahari - Berita & Kegiatan',
      },
    ],
  },
}

export default async function BeritaPage() {
  const supabase = await createClient()

  const { data: news } = (await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })) as { data: News[] | null }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: siteUrl },
          { name: 'Berita', url: `${siteUrl}/berita` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-ocean py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Berita & Kegiatan
            </h1>
            <p className="text-xl text-gray-200">
              Informasi terkini seputar kegiatan, pencapaian, dan berita terbaru
              dari Koperasi Jasa Sukses Mina Bahari
            </p>
          </div>
        </div>
      </section>

      {/* News List Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!news || news.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Belum ada berita yang tersedia saat ini.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <article
                  key={item.id}
                  className="bg-gradient-to-br from-primary/5 to-ocean/5 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  {item.image && (
                    <div className="aspect-video overflow-hidden relative">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar size={16} className="mr-2" />
                      <time dateTime={item.published_at}>
                        {formatDate(item.published_at)}
                      </time>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                      <Link href={`/berita/${item.slug}`}>{item.title}</Link>
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.excerpt}
                    </p>
                    <Link
                      href={`/berita/${item.slug}`}
                      className="inline-flex items-center text-primary hover:text-accent font-semibold transition-colors"
                    >
                      Baca Selengkapnya
                      <ArrowRight
                        className="ml-2 group-hover:translate-x-1 transition-transform"
                        size={16}
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
