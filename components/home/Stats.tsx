import { createClient } from '@/lib/supabase/server'
import type { CompanyStat } from '@/lib/supabase/types'

export default async function Stats() {
  const supabase = await createClient()

  const { data: stats } = (await supabase
    .from('company_stats')
    .select('*')
    .order('sort_order', { ascending: true })) as { data: CompanyStat[] | null }

  if (!stats || stats.length === 0) {
    return null
  }

  return (
    <section className="bg-light py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat: CompanyStat) => (
            <div key={stat.id} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
                {stat.unit && <span className="text-accent">{stat.unit}</span>}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
