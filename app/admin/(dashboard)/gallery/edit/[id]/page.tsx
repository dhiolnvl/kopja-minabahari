import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Gallery } from '@/lib/supabase/types'
import GalleryForm from '../../GalleryForm'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditGalleryPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  // @ts-ignore - Supabase type inference issue
  const { data: gallery } = (await supabase
    .from('gallery')
    .select('*')
    .eq('id', id)
    .single()) as { data: Gallery | null }

  if (!gallery) {
    notFound()
  }

  return <GalleryForm mode="edit" gallery={gallery} />
}
