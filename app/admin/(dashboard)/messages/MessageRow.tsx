'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import type { ContactMessage } from '@/lib/supabase/types'
import { ChevronDown, ChevronUp, Mail, MailOpen, Trash2 } from 'lucide-react'

export default function MessageRow({ message }: { message: ContactMessage }) {
  const router = useRouter()
  const [expanded, setExpanded] = useState(false)
  const [loading, setLoading] = useState(false)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  const toggleRead = async () => {
    setLoading(true)
    const supabase = createClient()
    await supabase
      .from('contact_messages')
      // @ts-ignore - Supabase type inference issue
      .update({ is_read: !message.is_read })
      .eq('id', message.id)

    router.refresh()
    setLoading(false)
  }

  const handleDelete = async () => {
    if (!confirm('Apakah Anda yakin ingin menghapus pesan ini?')) {
      return
    }

    setLoading(true)
    const supabase = createClient()
    await supabase.from('contact_messages')
      // @ts-ignore - Supabase type inference issue
      .delete().eq('id', message.id)

    router.refresh()
  }

  const handleExpand = async () => {
    if (!expanded && !message.is_read) {
      // Mark as read when opening
      const supabase = createClient()
      await supabase.from('contact_messages')
        // @ts-ignore - Supabase type inference issue
        .update({ is_read: true }).eq('id', message.id)
      router.refresh()
    }
    setExpanded(!expanded)
  }

  return (
    <div className={`${!message.is_read ? 'bg-blue-50' : 'bg-white'}`}>
      <div className="px-6 py-4">
        <div className="flex items-start justify-between gap-4">
          <button
            onClick={handleExpand}
            className="flex-1 text-left group"
            disabled={loading}
          >
            <div className="flex items-center gap-3 mb-2">
              {message.is_read ? (
                <MailOpen size={18} className="text-gray-400 flex-shrink-0" />
              ) : (
                <Mail size={18} className="text-orange-500 flex-shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <h3
                  className={`font-semibold group-hover:text-primary transition-colors ${
                    !message.is_read ? 'text-gray-900' : 'text-gray-700'
                  }`}
                >
                  {message.name}
                </h3>
                <p className="text-sm text-gray-600">{message.email}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm text-gray-500">{formatDate(message.created_at)}</p>
                {message.service && (
                  <span className="inline-block mt-1 px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                    {message.service}
                  </span>
                )}
              </div>
            </div>
            <p className="text-gray-600 line-clamp-2">{message.message}</p>
          </button>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={toggleRead}
              disabled={loading}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              title={message.is_read ? 'Tandai belum dibaca' : 'Tandai sudah dibaca'}
            >
              {message.is_read ? <Mail size={18} /> : <MailOpen size={18} />}
            </button>
            <button
              onClick={handleDelete}
              disabled={loading}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Hapus"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={handleExpand}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>
          </div>
        </div>

        {expanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-semibold text-gray-700">Nama:</label>
                <p className="text-gray-900">{message.name}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-700">Email:</label>
                <p className="text-gray-900">
                  <a
                    href={`mailto:${message.email}`}
                    className="text-primary hover:underline"
                  >
                    {message.email}
                  </a>
                </p>
              </div>
              {message.phone && (
                <div>
                  <label className="text-sm font-semibold text-gray-700">Telepon:</label>
                  <p className="text-gray-900">
                    <a href={`tel:${message.phone}`} className="text-primary hover:underline">
                      {message.phone}
                    </a>
                  </p>
                </div>
              )}
              {message.service && (
                <div>
                  <label className="text-sm font-semibold text-gray-700">Layanan:</label>
                  <p className="text-gray-900">{message.service}</p>
                </div>
              )}
              <div>
                <label className="text-sm font-semibold text-gray-700">Pesan:</label>
                <p className="text-gray-900 whitespace-pre-wrap">{message.message}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
