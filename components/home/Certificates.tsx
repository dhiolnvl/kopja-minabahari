import { createClient } from '@/lib/supabase/server'
import CertificatesClient from './CertificatesClient'
import type { Certificate } from '@/lib/supabase/types'

export default async function Certificates() {
  const supabase = await createClient()

  const { data: certificates } = (await supabase
    .from('certificates')
    .select('*')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })) as { data: Certificate[] | null }

  if (!certificates || certificates.length === 0) {
    return null
  }

  return <CertificatesClient initialCertificates={certificates} />
}
