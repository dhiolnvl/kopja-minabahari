import Link from 'next/link'
import { Calendar, ArrowRight, Newspaper } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { News as NewsType } from '@/lib/supabase/types'

export default async function News() {
  const supabase = await createClient()

  const { data: news } = (await supabase
    .from('news')
    .select('*')
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .limit(3)) as { data: NewsType[] | null }

  if (!news || news.length === 0) {
    return null
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-ocean/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Newspaper className="text-primary w-12 h-12" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Berita & Kegiatan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Informasi terkini seputar kegiatan dan pencapaian Koperasi Jasa Sukses
            Mina Bahari
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item) => (
            <article
              key={item.id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
            >
              {item.image && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
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
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">
                  <Link href={`/berita/${item.slug}`}>{item.title}</Link>
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
                <Link
                  href={`/berita/${item.slug}`}
                  className="inline-flex items-center text-primary hover:text-accent font-semibold transition-colors"
                >
                  Baca Selengkapnya
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {news.length >= 3 && (
          <div className="text-center mt-12">
            <Link
              href="/berita"
              className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Lihat Semua Berita
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}
