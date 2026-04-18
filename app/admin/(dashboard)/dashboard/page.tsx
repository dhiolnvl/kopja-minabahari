import { createClient } from '@/lib/supabase/server'
import { Newspaper, Package, Award, Image as ImageIcon, MessageSquare } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Get counts
  const [
    { count: newsCount },
    { count: messagesCount },
    { count: unreadMessagesCount },
  ] = await Promise.all([
    supabase.from('news').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
  ])

  // Get recent news
  const { data: recentNews } = await supabase
    .from('news')
    .select('id, title, published_at, is_published')
    .order('published_at', { ascending: false })
    .limit(5)

  // Get recent messages
  const { data: recentMessages } = await supabase
    .from('contact_messages')
    .select('id, name, email, message, is_read, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const stats = [
    {
      label: 'Total Berita',
      value: newsCount || 0,
      icon: Newspaper,
      color: 'bg-blue-500',
    },
    {
      label: 'Total Pesan',
      value: messagesCount || 0,
      icon: MessageSquare,
      color: 'bg-green-500',
    },
    {
      label: 'Pesan Belum Dibaca',
      value: unreadMessagesCount || 0,
      icon: MessageSquare,
      color: 'bg-orange-500',
    },
  ]

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

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Selamat datang di Admin Panel</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm p-6 border border-gray-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-4 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent News */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Berita Terbaru</h2>
          <div className="space-y-4">
            {recentNews && recentNews.length > 0 ? (
              recentNews.map((news) => (
                <div
                  key={news.id}
                  className="flex items-start justify-between pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 line-clamp-1">
                      {news.title}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(news.published_at)}
                    </p>
                  </div>
                  <span
                    className={`ml-4 px-3 py-1 text-xs font-semibold rounded-full ${
                      news.is_published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {news.is_published ? 'Published' : 'Draft'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">Belum ada berita</p>
            )}
          </div>
        </div>

        {/* Recent Messages */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Pesan Terbaru</h2>
          <div className="space-y-4">
            {recentMessages && recentMessages.length > 0 ? (
              recentMessages.map((message) => (
                <div
                  key={message.id}
                  className="pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-medium text-gray-900">{message.name}</h3>
                    {!message.is_read && (
                      <span className="ml-2 w-2 h-2 bg-orange-500 rounded-full" />
                    )}
                  </div>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                    {message.message}
                  </p>
                  <p className="text-xs text-gray-500">{formatDate(message.created_at)}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">Belum ada pesan</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
