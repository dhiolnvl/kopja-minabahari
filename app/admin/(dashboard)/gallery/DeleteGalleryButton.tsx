'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Trash2 } from 'lucide-react'

export default function DeleteGalleryButton({
  galleryId,
  galleryTitle,
}: {
  galleryId: string
  galleryTitle: string
}) {
  const router = useRouter()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Apakah Anda yakin ingin menghapus foto "${galleryTitle}"?`)) {
      return
    }

    setDeleting(true)
    try {
      const supabase = createClient()
      // @ts-ignore - Supabase type inference issue
      const { error } = await supabase.from('gallery').delete().eq('id', galleryId)

      if (error) {
        alert('Gagal menghapus foto: ' + error.message)
        setDeleting(false)
        return
      }

      router.refresh()
    } catch (err) {
      alert('Terjadi kesalahan saat menghapus foto')
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
      <Trash2 size={16} />
    </button>
  )
}
