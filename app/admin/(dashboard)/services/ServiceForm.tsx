'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Service, Database } from '@/lib/supabase/types'
import { ArrowLeft, Save, Plus, X } from 'lucide-react'
import Link from 'next/link'

interface ServiceFormProps {
  service?: Service
  mode: 'create' | 'edit'
}

export default function ServiceForm({ service, mode }: ServiceFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  // Parse features dari JSON atau gunakan array kosong
  const initialFeatures =
    service?.features && Array.isArray(service.features) ? (service.features as string[]) : []

  const [formData, setFormData] = useState({
    slug: service?.slug || '',
    title: service?.title || '',
    description: service?.description || '',
    icon: service?.icon || '',
    image: service?.image || '',
    image2: service?.image2 || '',
    price_info: service?.price_info || '',
    is_active: service?.is_active ?? true,
  })

  const [features, setFeatures] = useState<string[]>(initialFeatures as string[])
  const [newFeature, setNewFeature] = useState('')

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

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()

      if (mode === 'create') {
        const insertData: Database['public']['Tables']['services']['Insert'] = {
          slug: formData.slug,
          title: formData.title,
          description: formData.description || null,
          icon: formData.icon || null,
          image: formData.image || null,
          image2: formData.image2 || null,
          features: features,
          price_info: formData.price_info || null,
          is_active: formData.is_active,
        }

        const { error } = await supabase.from('services').insert(insertData as any)

        if (error) {
          alert('Gagal menambah layanan: ' + error.message)
          setLoading(false)
          return
        }
      } else {
        const updateData: Database['public']['Tables']['services']['Update'] = {
          slug: formData.slug,
          title: formData.title,
          description: formData.description || null,
          icon: formData.icon || null,
          image: formData.image || null,
          image2: formData.image2 || null,
          features: features,
          price_info: formData.price_info || null,
          is_active: formData.is_active,
        }

        const { error } = await supabase
          .from('services')
          .update(updateData as any)
          .eq('id', service!.id)

        if (error) {
          alert('Gagal mengupdate layanan: ' + error.message)
          setLoading(false)
          return
        }
      }

      router.push('/admin/services')
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
            href="/admin/services"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {mode === 'create' ? 'Tambah Layanan' : 'Edit Layanan'}
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
            Nama Layanan <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            required
            value={formData.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Jasa Cold Storage"
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
            placeholder="cold-storage"
          />
          <p className="text-sm text-gray-500 mt-1">
            ID unik untuk layanan (tanpa spasi, huruf kecil)
          </p>
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi
          </label>
          <textarea
            id="description"
            rows={4}
            value={formData.description || ''}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Deskripsi singkat tentang layanan..."
          />
        </div>

        {/* Icon */}
        <div>
          <label htmlFor="icon" className="block text-sm font-medium text-gray-700 mb-2">
            Icon (Lucide React)
          </label>
          <input
            id="icon"
            type="text"
            value={formData.icon || ''}
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Warehouse, Snowflake, Truck"
          />
          <p className="text-sm text-gray-500 mt-1">
            Nama icon dari Lucide React (contoh: Warehouse, Snowflake, Truck)
          </p>
        </div>

        {/* Image 1 URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            URL Gambar Layanan 1 (Opsional)
          </label>
          <input
            id="image"
            type="text"
            value={formData.image || ''}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="https://example.com/layanan1.jpg atau /gambar/layanan1.jpg"
          />
          {formData.image && (
            <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
              <img
                src={formData.image}
                alt="Preview 1"
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </div>

        {/* Image 2 URL */}
        <div>
          <label htmlFor="image2" className="block text-sm font-medium text-gray-700 mb-2">
            URL Gambar Layanan 2 (Opsional)
          </label>
          <input
            id="image2"
            type="text"
            value={formData.image2 || ''}
            onChange={(e) => setFormData({ ...formData, image2: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="https://example.com/layanan2.jpg atau /gambar/layanan2.jpg"
          />
          {formData.image2 && (
            <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
              <img
                src={formData.image2}
                alt="Preview 2"
                className="w-full h-64 object-cover"
              />
            </div>
          )}
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fitur/Keunggulan
          </label>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={feature}
                  readOnly
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(index)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            ))}

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addFeature()
                  }
                }}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Tambah fitur baru..."
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Price Info */}
        <div>
          <label htmlFor="price_info" className="block text-sm font-medium text-gray-700 mb-2">
            Informasi Harga
          </label>
          <input
            id="price_info"
            type="text"
            value={formData.price_info || ''}
            onChange={(e) => setFormData({ ...formData, price_info: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Hubungi kami untuk penawaran"
          />
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
            Aktifkan layanan (tampilkan di website)
          </label>
        </div>
      </div>
    </form>
  )
}
