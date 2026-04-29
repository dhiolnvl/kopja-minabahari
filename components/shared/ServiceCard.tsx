import Link from 'next/link'
import { ArrowRight, Warehouse, Snowflake, Truck } from 'lucide-react'
import type { Service } from '@/lib/supabase/types'

import Image from 'next/image'

const iconMap = {
  Warehouse: Warehouse,
  Snowflake: Snowflake,
  Truck: Truck,
}

interface ServiceCardProps {
  service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const IconComponent = service.icon
    ? iconMap[service.icon as keyof typeof iconMap]
    : Warehouse

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-shadow group">
      <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
        {IconComponent && <IconComponent size={32} className="text-primary group-hover:text-white" />}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>

      <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>

      <Link
        href={`/layanan/${service.slug}`}
        className="inline-flex items-center text-primary hover:text-accent font-semibold group/link"
      >
        Selengkapnya
        <ArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" size={18} />
      </Link>
    </div>
  )
}
