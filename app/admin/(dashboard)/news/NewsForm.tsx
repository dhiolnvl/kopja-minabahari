'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { News, Database } from '@/lib/supabase/types'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

interface NewsFormProps {
  news?: News
  mode: 'create' | 'edit'
}

export default function NewsForm({ news, mode }: NewsFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    slug: news?.slug || '',
    title: news?.title || '',
    excerpt: news?.excerpt || '',
    content: news?.content || '',
    image: news?.image || '',
    author: news?.author || 'Admin Koperasi',
    is_published: news?.is_published ?? true,
  })

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const handleTitleChange = (title: string) => {
    setFormData((prev) => ({
      ...prev,
      title,
      slug: mode === 'create' ? generateSlug(title) : prev.slug,
    }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()

      if (mode === 'create') {
        const { error } = await supabase.from('news').insert({
          ...formData,
          published_at: new Date().toISOString(),
        } as Database['public']['Tables']['news']['Insert'])

        if (error) {
          alert('Gagal menambah berita: ' + error.message)
          setLoading(false)
          return
        }
      } else {
        const { error } = await supabase
          .from('news')
          .update({
            ...formData,
            updated_at: new Date().toISOString(),
          } as Database['public']['Tables']['news']['Update'])
          .eq('id', news!.id)

        if (error) {
          alert('Gagal mengupdate berita: ' + error.message)
          setLoading(false)
          return
        }
      }

      router.push('/admin/news')
      router.refresh()
    } catch (err) {
      alert('Terjadi kesalahan')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/news"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {mode === 'create' ? 'Tambah Berita' : 'Edit Berita'}
            </h1>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:opacity-50"
        >
          <Save size={20} className="mr-2" />
          {loading ? 'Menyimpan...' : 'Simpan'}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Judul <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            required
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Masukkan judul berita"
          />
        </div>

        {/* Slug */}
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-2">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            id="slug"
            type="text"
            required
            value={formData.slug}
            onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="url-berita"
          />
          <p className="text-sm text-gray-500 mt-1">
            URL: /berita/{formData.slug || 'url-berita'}
          </p>
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">
            Ringkasan
          </label>
          <textarea
            id="excerpt"
            rows={3}
            value={formData.excerpt || ''}
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Ringkasan singkat berita"
          />
        </div>

        {/* Content */}
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Konten <span className="text-red-500">*</span>
          </label>
          <textarea
            id="content"
            rows={15}
            required
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent font-mono text-sm"
            placeholder="Isi berita lengkap"
          />
          <p className="text-sm text-gray-500 mt-1">
            Gunakan baris baru untuk paragraf baru
          </p>
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            URL Gambar
          </label>
          <input
            id="image"
            type="url"
            value={formData.image || ''}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="https://example.com/image.jpg"
          />
          {formData.image && (
            <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </div>

        {/* Author */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
            Penulis
          </label>
          <input
            id="author"
            type="text"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Nama penulis"
          />
        </div>

        {/* Published Status */}
        <div className="flex items-center">
          <input
            id="is_published"
            type="checkbox"
            checked={formData.is_published}
            onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="is_published" className="ml-3 text-sm font-medium text-gray-700">
            Publikasikan berita
          </label>
        </div>
      </div>
    </form>
  )
}
