'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Trash2 } from 'lucide-react'

export default function DeleteCertificateButton({
  certificateId,
  certificateTitle,
}: {
  certificateId: string
  certificateTitle: string
}) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Apakah Anda yakin ingin menghapus sertifikat "${certificateTitle}"?`)) {
      return
    }

    setDeleting(true)
    try {
      const supabase = createClient()
      // @ts-ignore - Supabase type inference issue
      const { error } = await supabase.from('certificates').delete().eq('id', certificateId)

      if (error) {
        alert('Gagal menghapus sertifikat: ' + error.message)
        setDeleting(false)
        return
      }

      router.refresh()
    } catch (err) {
      alert('Terjadi kesalahan saat menghapus sertifikat')
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
