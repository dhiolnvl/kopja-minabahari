import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Service } from '@/lib/supabase/types'
import ServiceForm from '../../ServiceForm'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditServicePage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: service } = (await supabase
    .from('services')
    .select('*')
    .eq('id', id)
    .single()) as { data: Service | null }

  if (!service) {
    notFound()
  }

  return <ServiceForm mode="edit" service={service} />
}
