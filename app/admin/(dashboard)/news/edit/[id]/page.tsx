import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { News } from '@/lib/supabase/types'
import NewsForm from '../../NewsForm'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditNewsPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: news } = (await supabase
    .from('news')
    .select('*')
    .eq('id', id)
    .single()) as { data: News | null }

  if (!news) {
    notFound()
  }

  return <NewsForm mode="edit" news={news} />
}
