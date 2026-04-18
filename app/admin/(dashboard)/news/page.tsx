import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import DeleteNewsButton from './DeleteNewsButton'

export default async function AdminNewsPage() {
  const supabase = await createClient()

  const { data: news } = await supabase
    .from('news')
    .select('*')
    .order('published_at', { ascending: false })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Berita</h1>
          <p className="text-gray-600 mt-2">Tambah, edit, atau hapus berita</p>
        </div>
        <Link
          href="/admin/news/new"
          className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Tambah Berita
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Judul
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Tanggal
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                  Status
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {news && news.length > 0 ? (
                news.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 line-clamp-2">
                        {item.title}
                      </div>
                      <div className="text-sm text-gray-500 mt-1">/{item.slug}</div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {formatDate(item.published_at)}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          item.is_published
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {item.is_published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/berita/${item.slug}`}
                          target="_blank"
                          className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                          title="Lihat"
                        >
                          <Eye size={18} />
                        </Link>
                        <Link
                          href={`/admin/news/edit/${item.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit size={18} />
                        </Link>
                        <DeleteNewsButton newsId={item.id} newsTitle={item.title} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    Belum ada berita. Klik "Tambah Berita" untuk mulai.
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
