import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Plus, Edit, Eye, CheckCircle, XCircle } from 'lucide-react'
import DeleteGalleryButton from './DeleteGalleryButton'
import GalleryImage from './GalleryImage'
import type { Gallery } from '@/lib/supabase/types'

export default async function AdminGalleryPage() {
  const supabase = await createClient()

  // @ts-ignore - Supabase type inference issue
  const { data } = await supabase
    .from('gallery')
    .select('*')
    .order('sort_order', { ascending: true })

  const gallery = data as Gallery[] | null

  const getCategoryLabel = (category: string | null) => {
    const labels: Record<string, string> = {
      facility: 'Fasilitas',
      activity: 'Kegiatan',
      product: 'Produk',
      other: 'Lainnya',
    }
    return category ? labels[category] || category : '-'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Galeri</h1>
          <p className="text-gray-600 mt-2">Tambah, edit, atau hapus foto galeri</p>
        </div>
        <Link
          href="/admin/gallery/new"
          className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Tambah Foto
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {gallery && gallery.length > 0 ? (
          gallery.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="aspect-video relative overflow-hidden bg-gray-100">
                <GalleryImage src={item.image} alt={item.title} />
                <div className="absolute top-2 right-2 flex gap-2">
                  {item.is_active ? (
                    <div className="bg-green-500 p-1.5 rounded-full">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                  ) : (
                    <div className="bg-gray-500 p-1.5 rounded-full">
                      <XCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 mb-1">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                  )}
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
                    {getCategoryLabel(item.category)}
                  </span>
                  <span className="text-xs text-gray-500">Urutan: {item.sort_order}</span>
                </div>

                <div className="flex items-center gap-2 pt-3 border-t border-gray-200">
                  <Link
                    href="/galeri"
                    target="_blank"
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                    title="Lihat"
                  >
                    <Eye size={16} />
                    <span>Lihat</span>
                  </Link>
                  <Link
                    href={`/admin/gallery/edit/${item.id}`}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit size={16} />
                    <span>Edit</span>
                  </Link>
                  <DeleteGalleryButton galleryId={item.id} galleryTitle={item.title} />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">
              Belum ada foto di galeri. Klik "Tambah Foto" untuk mulai.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
