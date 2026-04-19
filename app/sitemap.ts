import { MetadataRoute } from 'next'
import { createClient } from '@/lib/supabase/server'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://koperasiminabahari.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const supabase = await createClient()

  // Get all active services
  const { data: services } = (await supabase
    .from('services')
    .select('slug, created_at')
    .eq('is_active', true)) as { data: { slug: string; created_at: string }[] | null }

  const serviceUrls =
    services?.map((service) => ({
      url: `${siteUrl}/layanan/${service.slug}`,
      lastModified: new Date(service.created_at),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })) || []

  // Get all published news articles
  const { data: news } = (await supabase
    .from('news')
    .select('slug, published_at, updated_at')
    .eq('is_published', true)) as { data: { slug: string; published_at: string; updated_at: string }[] | null }

  const newsUrls =
    news?.map((article) => ({
      url: `${siteUrl}/berita/${article.slug}`,
      lastModified: new Date(article.updated_at || article.published_at),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })) || []

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/layanan`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...serviceUrls,
    {
      url: `${siteUrl}/berita`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    ...newsUrls,
    {
      url: `${siteUrl}/kontak`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
