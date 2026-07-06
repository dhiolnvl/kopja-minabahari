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
  const [imageUploading, setImageUploading] = useState(false)
  const [videoUploading, setVideoUploading] = useState(false)
  const [mediaType, setMediaType] = useState<'image' | 'video'>(
    gallery?.video_url ? 'video' : 'image'
  )
  const [formData, setFormData] = useState({
    title: gallery?.title || '',
    description: gallery?.description || '',
    image: gallery?.image || '',
    video_url: gallery?.video_url || '',
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

  const handleFileUpload = async (file: File, type: 'image' | 'video') => {
    const isImage = type === 'image'
    if (isImage) {
      setImageUploading(true)
    } else {
      setVideoUploading(true)
    }

    try {
      const supabase = createClient()
      
      // Clean up file name to prevent special character issues in URL
      const cleanFileName = file.name.replace(/[^a-zA-Z0-9.]/g, '_')
      const filePath = `${type}s/${Date.now()}_${cleanFileName}`

      const { data, error } = await supabase.storage
        .from('galeri')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        })

      if (error) {
        throw error
      }

      const { data: { publicUrl } } = supabase.storage
        .from('galeri')
        .getPublicUrl(filePath)

      setFormData((prev) => ({
        ...prev,
        [type === 'image' ? 'image' : 'video_url']: publicUrl,
      }))
    } catch (err: any) {
      console.error('Upload error:', err)
      alert(
        `Gagal mengunggah ${isImage ? 'gambar' : 'video'}: ${err.message || 'Error tidak diketahui'}.\n\n` +
        `Pastikan Anda sudah membuat bucket bernama "galeri" di Supabase Storage Anda dan mengatur aksesnya agar Publik (Public Read/Write policies). Anda juga tetap bisa menuliskan URL secara manual.`
      )
    } finally {
      if (isImage) {
        setImageUploading(false)
      } else {
        setVideoUploading(false)
      }
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate based on mediaType selection
    if (mediaType === 'image' && !formData.image) {
      alert('Silakan pilih/unggah foto terlebih dahulu.')
      setLoading(false)
      return
    }
    if (mediaType === 'video' && !formData.video_url) {
      alert('Silakan pilih/unggah video terlebih dahulu.')
      setLoading(false)
      return
    }

    try {
      const supabase = createClient()

      if (mode === 'create') {
        const insertData: Database['public']['Tables']['gallery']['Insert'] = {
          title: formData.title,
          description: formData.description || null,
          image: mediaType === 'image' ? formData.image : null,
          video_url: mediaType === 'video' ? formData.video_url : null,
          category: formData.category || null,
          is_active: formData.is_active,
          sort_order: formData.sort_order,
        }

        const { error } = await supabase.from('gallery').insert(insertData as any)

        if (error) {
          alert('Gagal menambah foto/video: ' + error.message)
          setLoading(false)
          return
        }
      } else {
        const updateData: Database['public']['Tables']['gallery']['Update'] = {
          title: formData.title,
          description: formData.description || null,
          image: mediaType === 'image' ? formData.image : null,
          video_url: mediaType === 'video' ? formData.video_url : null,
          category: formData.category || null,
          is_active: formData.is_active,
          sort_order: formData.sort_order,
        }

        const { error } = await supabase.from('gallery')
          .update(updateData as any)
          .eq('id', gallery!.id)

        if (error) {
          alert('Gagal mengupdate foto/video: ' + error.message)
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
              {mode === 'create' ? 'Tambah Galeri (Foto/Video)' : 'Edit Galeri (Foto/Video)'}
            </h1>
          </div>
        </div>
        <button
          type="submit"
          disabled={loading || imageUploading || videoUploading}
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
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Ruang Cold Storage atau Proses Produksi"
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
            placeholder="Deskripsi singkat tentang foto/video..."
          />
        </div>

        {/* Tipe Media Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipe Media <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setMediaType('image')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium border text-center transition-colors ${
                mediaType === 'image'
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Foto (Gambar)
            </button>
            <button
              type="button"
              onClick={() => setMediaType('video')}
              className={`flex-1 py-3 px-4 rounded-lg font-medium border text-center transition-colors ${
                mediaType === 'video'
                  ? 'bg-primary/10 border-primary text-primary'
                  : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              Video
            </button>
          </div>
        </div>

        {/* Image Upload & URL */}
        {mediaType === 'image' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-200 pb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Gambar {mode === 'create' && <span className="text-red-500">*</span>}
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 text-center px-4">
                      <span className="font-semibold">Klik untuk upload</span> gambar
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG (Max 2MB)</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file, 'image')
                    }}
                    disabled={imageUploading}
                  />
                </label>
              </div>
              {imageUploading && (
                <p className="text-sm text-primary mt-2 animate-pulse">Mengunggah gambar...</p>
              )}
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Atau Input URL Gambar <span className="text-red-500">*</span>
              </label>
              <input
                id="image"
                type="text"
                required={mediaType === 'image'}
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://example.com/foto.jpg atau /gambar/foto.jpg"
              />
              {formData.image && (
                <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden h-28 relative bg-gray-100 flex items-center justify-center">
                  <img
                    src={formData.image}
                    alt="Preview Gambar"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Video Upload & URL */}
        {mediaType === 'video' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b border-gray-200 pb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Video {mode === 'create' && <span className="text-red-500">*</span>}
              </label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 text-center px-4">
                      <span className="font-semibold">Klik untuk upload</span> video
                    </p>
                    <p className="text-xs text-gray-500">MP4, WebM, OGG (Max 20MB)</p>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file, 'video')
                    }}
                    disabled={videoUploading}
                  />
                </label>
              </div>
              {videoUploading && (
                <p className="text-sm text-primary mt-2 animate-pulse">Mengunggah video...</p>
              )}
            </div>

            <div>
              <label htmlFor="video_url" className="block text-sm font-medium text-gray-700 mb-2">
                Atau Input URL Video <span className="text-red-500">*</span>
              </label>
              <input
                id="video_url"
                type="text"
                required={mediaType === 'video'}
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="https://example.com/video.mp4 atau /gambar/video.mp4"
              />
              {formData.video_url && (
                <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden h-28 relative bg-black flex items-center justify-center">
                  <video
                    src={formData.video_url}
                    className="max-h-full max-w-full"
                    controls
                    preload="metadata"
                  />
                </div>
              )}
            </div>
          </div>
        )}

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
            Aktifkan galeri (tampilkan di website)
          </label>
        </div>
      </div>
    </form>
  )
}
