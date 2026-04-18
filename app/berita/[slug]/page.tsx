import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Calendar, ArrowLeft, User } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import type { News } from '@/lib/supabase/types'
import { BreadcrumbJsonLd, ArticleJsonLd } from '@/components/seo/JsonLd'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://koperasiminabahari.com'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()

  const { data: news } = await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!news) {
    return {
      title: 'Berita Tidak Ditemukan',
    }
  }

  return {
    title: news.title,
    description: news.excerpt || news.title,
    alternates: {
      canonical: `${siteUrl}/berita/${slug}`,
    },
    openGraph: {
      title: news.title,
      description: news.excerpt || news.title,
      type: 'article',
      publishedTime: news.published_at,
      authors: [news.author],
      images: news.image ? [news.image] : [],
    },
  }
}

export default async function BeritaDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: news } = (await supabase
    .from('news')
    .select('*')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()) as { data: News | null }

  if (!news) {
    notFound()
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
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: siteUrl },
          { name: 'Berita', url: `${siteUrl}/berita` },
          { name: news.title, url: `${siteUrl}/berita/${slug}` },
        ]}
      />
      <ArticleJsonLd
        title={news.title}
        description={news.excerpt || news.title}
        image={news.image || ''}
        datePublished={news.published_at}
        dateModified={news.updated_at}
        author={news.author}
      />

      {/* Hero Section with Image */}
      <section className="relative bg-gradient-to-br from-primary to-ocean">
        {news.image && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={news.image}
              alt={news.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-white">
          <Link
            href="/berita"
            className="inline-flex items-center text-white/90 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="mr-2" size={20} />
            Kembali ke Berita
          </Link>
          <h1 className="text-3xl md:text-5xl font-bold mb-6">{news.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-white/90">
            <div className="flex items-center">
              <User size={18} className="mr-2" />
              <span>{news.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar size={18} className="mr-2" />
              <time dateTime={news.published_at}>
                {formatDate(news.published_at)}
              </time>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <article className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {news.image && (
            <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
              <img
                src={news.image}
                alt={news.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {news.excerpt && (
            <div className="text-xl text-gray-600 mb-8 pb-8 border-b border-gray-200">
              {news.excerpt}
            </div>
          )}

          <div className="prose prose-lg max-w-none">
            {news.content.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Back to News List */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/berita"
              className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <ArrowLeft className="mr-2" size={20} />
              Kembali ke Berita
            </Link>
          </div>
        </div>
      </article>
    </>
  )
}
