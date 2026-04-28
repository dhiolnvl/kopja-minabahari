import { createClient } from '@/lib/supabase/server'
import ServiceCard from '@/components/shared/ServiceCard'
import type { Service } from '@/lib/supabase/types'

export default async function Services() {
  const supabase = await createClient()

  const { data: services } = (await supabase
    .from('services')
    .select('*')
    .eq('is_active', true)) as { data: Service[] | null }

  if (!services || services.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Layanan Kami
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Solusi lengkap untuk kebutuhan penyimpanan, pembekuan, dan
            distribusi produk perikanan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
