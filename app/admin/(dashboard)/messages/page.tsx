import { createClient } from '@/lib/supabase/server'
import { Mail, MailOpen } from 'lucide-react'
import MessageRow from './MessageRow'

export default async function AdminMessagesPage() {
  const supabase = await createClient()

  const { data: messages } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false })

  const unreadCount = messages?.filter((m) => !m.is_read).length || 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Pesan Kontak</h1>
          <p className="text-gray-600 mt-2">
            {unreadCount > 0 && (
              <span className="text-orange-600 font-semibold">
                {unreadCount} pesan belum dibaca
              </span>
            )}
            {unreadCount === 0 && 'Semua pesan sudah dibaca'}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {messages && messages.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {messages.map((message) => (
              <MessageRow key={message.id} message={message} />
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-gray-500">
            Belum ada pesan masuk
          </div>
        )}
      </div>
    </div>
  )
}
