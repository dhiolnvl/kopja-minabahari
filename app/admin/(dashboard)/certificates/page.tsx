import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Plus, Edit, Eye, Award } from 'lucide-react'
import DeleteCertificateButton from './DeleteCertificateButton'
import CertificateImage from './CertificateImage'
import type { Certificate } from '@/lib/supabase/types'

export default async function AdminCertificatesPage() {
  const supabase = await createClient()

  // @ts-ignore - Supabase type inference issue
  const { data } = await supabase
    .from('certificates')
    .select('*')
    .order('sort_order', { ascending: true })

  const certificates = data as Certificate[] | null

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '-'
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Sertifikat</h1>
          <p className="text-gray-600 mt-2">Tambah, edit, atau hapus sertifikat dan penghargaan</p>
        </div>
        <Link
          href="/admin/certificates/new"
          className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Tambah Sertifikat
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Sertifikat
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Penerbit
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Tanggal
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">
                  Urutan
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {certificates && certificates.length > 0 ? (
                certificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        {cert.image ? (
                          <CertificateImage src={cert.image} alt={cert.title} />
                        ) : (
                          <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">
                            <Award className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-900 line-clamp-2">
                            {cert.title}
                          </div>
                          {cert.certificate_number && (
                            <div className="text-xs text-gray-500 mt-1">
                              No. {cert.certificate_number}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {cert.issuer}
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {formatDate(cert.issue_date)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          cert.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {cert.is_active ? 'Aktif' : 'Nonaktif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-gray-600">
                      {cert.sort_order}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/sertifikat`}
                          target="_blank"
                          className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="Lihat"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/admin/certificates/edit/${cert.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <DeleteCertificateButton
                          certificateId={cert.id}
                          certificateTitle={cert.title}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Belum ada sertifikat. Klik "Tambah Sertifikat" untuk mulai.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
