'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Gallery, Database } from '@/lib/supabase/types'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

interface GalleryFormProps {
  gallery?: Gallery
  mode: 'create' | 'edit'
}

export default function GalleryForm({ gallery, mode }: GalleryFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: gallery?.title || '',
    description: gallery?.description || '',
    image: gallery?.image || '',
    category: gallery?.category || 'other',
    is_active: gallery?.is_active ?? true,
    sort_order: gallery?.sort_order || 0,
  })

  const categories = [
    { value: 'facility', label: 'Fasilitas' },
    { value: 'activity', label: 'Kegiatan' },
    { value: 'product', label: 'Produk' },
    { value: 'other', label: 'Lainnya' },
  ]

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()

      if (mode === 'create') {
        const insertData: Database['public']['Tables']['gallery']['Insert'] = {
          title: formData.title,
          description: formData.description || null,
          image: formData.image,
          category: formData.category || null,
          is_active: formData.is_active,
          sort_order: formData.sort_order,
        }

        const { error } = await supabase.from('gallery').insert(insertData as any)

        if (error) {
          alert('Gagal menambah foto: ' + error.message)
          setLoading(false)
          return
        }
      } else {
        const updateData: Database['public']['Tables']['gallery']['Update'] = {
          title: formData.title,
          description: formData.description || null,
          image: formData.image,
          category: formData.category || null,
          is_active: formData.is_active,
          sort_order: formData.sort_order,
        }

        const { error } = await supabase.from('gallery')
          .update(updateData as any)
          .eq('id', gallery!.id)

        if (error) {
          alert('Gagal mengupdate foto: ' + error.message)
          setLoading(false)
          return
        }
      }

      router.push('/admin/gallery')
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
            href="/admin/gallery"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {mode === 'create' ? 'Tambah Foto Galeri' : 'Edit Foto Galeri'}
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
            Judul Foto <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Ruang Cold Storage"
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi
          </label>
          <textarea
            id="description"
            rows={3}
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Deskripsi singkat tentang foto..."
          />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            URL Gambar <span className="text-red-500">*</span>
          </label>
          <input
            id="image"
            type="text"
            required
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="https://example.com/foto.jpg atau /gambar/foto.jpg"
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

        {/* Category & Sort Order */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
              Kategori
            </label>
            <select
              id="category"
              value={formData.category || 'other'}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="sort_order" className="block text-sm font-medium text-gray-700 mb-2">
              Urutan Tampilan
            </label>
            <input
              id="sort_order"
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: parseInt(e.target.value) })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="0"
            />
            <p className="text-sm text-gray-500 mt-1">Semakin kecil, semakin di atas</p>
          </div>
        </div>

        {/* Active Status */}
        <div className="flex items-center">
          <input
            id="is_active"
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="is_active" className="ml-3 text-sm font-medium text-gray-700">
            Aktifkan foto (tampilkan di website)
          </label>
        </div>
      </div>
    </form>
  )
}
