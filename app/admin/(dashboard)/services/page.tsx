import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Plus, Edit, Trash2, Eye, CheckCircle, XCircle } from 'lucide-react'
import DeleteServiceButton from './DeleteServiceButton'

export default async function AdminServicesPage() {
  const supabase = await createClient()

  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Kelola Layanan</h1>
          <p className="text-gray-600 mt-2">Tambah, edit, atau hapus layanan koperasi</p>
        </div>
        <Link
          href="/admin/services/new"
          className="inline-flex items-center bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          <Plus size={20} className="mr-2" />
          Tambah Layanan
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services && services.length > 0 ? (
          services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">
                      {service.title}
                    </h3>
                    <p className="text-sm text-gray-500">/{service.slug}</p>
                  </div>
                  <div>
                    {service.is_active ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </div>

                <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                  {service.description}
                </p>

                {service.price_info && (
                  <p className="text-sm text-primary font-medium mb-4">
                    {service.price_info}
                  </p>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <span
                    className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                      service.is_active
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {service.is_active ? 'Aktif' : 'Nonaktif'}
                  </span>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/layanan#${service.slug}`}
                      target="_blank"
                      className="p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                      title="Lihat"
                    >
                      <Eye size={18} />
                    </Link>
                    <Link
                      href={`/admin/services/edit/${service.id}`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit size={18} />
                    </Link>
                    <DeleteServiceButton
                      serviceId={service.id}
                      serviceTitle={service.title}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">
              Belum ada layanan. Klik "Tambah Layanan" untuk mulai.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
