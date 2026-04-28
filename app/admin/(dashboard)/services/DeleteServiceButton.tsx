'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Trash2 } from 'lucide-react'

export default function DeleteServiceButton({
  serviceId,
  serviceTitle,
}: {
  serviceId: string
  serviceTitle: string
}) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Apakah Anda yakin ingin menghapus layanan "${serviceTitle}"?`)) {
      return
    }

    setDeleting(true)
    try {
      const supabase = createClient()
      const { error } = await supabase.from('services').delete().eq('id', serviceId)

      if (error) {
        alert('Gagal menghapus layanan: ' + error.message)
        setDeleting(false)
        return
      }

      router.refresh()
    } catch (err) {
      alert('Terjadi kesalahan saat menghapus layanan')
      setDeleting(false)
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
      title="Hapus"
    >
      <Trash2 size={18} />
    </button>
  )
}
