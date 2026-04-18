import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Certificate } from '@/lib/supabase/types'
import CertificateForm from '../../CertificateForm'

type Props = {
  params: Promise<{ id: string }>
}

export default async function EditCertificatePage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: certificate } = (await supabase
    .from('certificates')
    .select('*')
    .eq('id', id)
    .single()) as { data: Certificate | null }

  if (!certificate) {
    notFound()
  }

  return <CertificateForm mode="edit" certificate={certificate} />
}
