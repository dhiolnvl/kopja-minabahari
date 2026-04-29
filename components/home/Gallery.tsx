import { createClient } from '@/lib/supabase/server'
import GalleryClient from './GalleryClient'
import type { Gallery as GalleryType } from '@/lib/supabase/types'

export default async function Gallery() {
  const supabase = await createClient()

  const { data: galleryItems } = (await supabase
    .from('gallery')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })) as { data: GalleryType[] | null }

  if (!galleryItems || galleryItems.length === 0) {
    return null
  }

  return <GalleryClient initialImages={galleryItems} />
}
