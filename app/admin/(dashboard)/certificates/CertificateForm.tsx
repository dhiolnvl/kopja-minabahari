'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { Certificate, Database } from '@/lib/supabase/types'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

interface CertificateFormProps {
  certificate?: Certificate
  mode: 'create' | 'edit'
}

export default function CertificateForm({ certificate, mode }: CertificateFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: certificate?.title || '',
    issuer: certificate?.issuer || '',
    issue_date: certificate?.issue_date || '',
    description: certificate?.description || '',
    image: certificate?.image || '',
    certificate_number: certificate?.certificate_number || '',
    is_active: certificate?.is_active ?? true,
    sort_order: certificate?.sort_order || 0,
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const supabase = createClient()

      if (mode === 'create') {
        const insertData: Database['public']['Tables']['certificates']['Insert'] = {
          title: formData.title,
          issuer: formData.issuer,
          issue_date: formData.issue_date || null,
          description: formData.description || null,
          image: formData.image || null,
          certificate_number: formData.certificate_number || null,
          is_active: formData.is_active,
          sort_order: formData.sort_order,
        }

        const { error } = await supabase.from('certificates').insert(insertData as any)

        if (error) {
          alert('Gagal menambah sertifikat: ' + error.message)
          setLoading(false)
          return
        }
      } else {
        const updateData: Database['public']['Tables']['certificates']['Update'] = {
          title: formData.title,
          issuer: formData.issuer,
          issue_date: formData.issue_date || null,
          description: formData.description || null,
          image: formData.image || null,
          certificate_number: formData.certificate_number || null,
          is_active: formData.is_active,
          sort_order: formData.sort_order,
          updated_at: new Date().toISOString(),
        }

        const { error } = await supabase
          .from('certificates')
          .update(updateData as any)
          .eq('id', certificate!.id)

        if (error) {
          alert('Gagal mengupdate sertifikat: ' + error.message)
          setLoading(false)
          return
        }
      }

      router.push('/admin/certificates')
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
            href="/admin/certificates"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {mode === 'create' ? 'Tambah Sertifikat' : 'Edit Sertifikat'}
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
            Nama Sertifikat <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Sertifikat Kelayakan Pengolahan (SKP)"
          />
        </div>

        {/* Issuer */}
        <div>
          <label htmlFor="issuer" className="block text-sm font-medium text-gray-700 mb-2">
            Lembaga Penerbit <span className="text-red-500">*</span>
          </label>
          <input
            id="issuer"
            type="text"
            required
            value={formData.issuer}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Kementerian Kelautan dan Perikanan RI"
          />
        </div>

        {/* Issue Date & Certificate Number */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="issue_date" className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal Terbit
            </label>
            <input
              id="issue_date"
              type="date"
              value={formData.issue_date || ''}
              onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label
              htmlFor="certificate_number"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nomor Sertifikat
            </label>
            <input
              id="certificate_number"
              type="text"
              value={formData.certificate_number || ''}
              onChange={(e) =>
                setFormData({ ...formData, certificate_number: e.target.value })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="SKP/2024/001"
            />
          </div>
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
            placeholder="Deskripsi singkat tentang sertifikat..."
          />
        </div>

        {/* Image URL */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            URL Gambar Sertifikat
          </label>
          <input
            id="image"
<<<<<<< HEAD
            type="text"
=======
            type="url"
>>>>>>> 0aa480254ce8f70487edba9b33c619998aaba6d3
            value={formData.image || ''}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="https://example.com/sertifikat.jpg"
          />
          {formData.image && (
            <div className="mt-4 border border-gray-200 rounded-lg overflow-hidden">
              <img
                src={formData.image}
                alt="Preview"
                className="w-full h-64 object-contain bg-gray-50"
              />
            </div>
          )}
        </div>

        {/* Sort Order & Active Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="flex items-center pt-8">
            <input
              id="is_active"
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
              className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <label htmlFor="is_active" className="ml-3 text-sm font-medium text-gray-700">
              Aktifkan sertifikat (tampilkan di website)
            </label>
          </div>
        </div>
      </div>
    </form>
  )
}
