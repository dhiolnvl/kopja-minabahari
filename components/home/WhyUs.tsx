import { Award, Shield, MapPin, Zap } from 'lucide-react'

const benefits = [
  {
    icon: Award,
    title: 'Berpengalaman',
    description: 'Lebih dari 10 tahun melayani industri perikanan Pekalongan',
  },
  {
    icon: Zap,
    title: 'Teknologi Modern',
    description: 'Fasilitas cold storage dengan sistem monitoring suhu 24/7',
  },
  {
    icon: Shield,
    title: 'Terpercaya',
    description: 'Telah dipercaya oleh ratusan mitra nelayan dan eksportir',
  },
  {
    icon: MapPin,
    title: 'Lokasi Strategis',
    description: 'Berlokasi di Pekalongan, pusat industri perikanan Jawa Tengah',
  },
]

export default function WhyUs() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-ocean/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Mengapa Memilih Kami?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Komitmen kami adalah menjaga kualitas produk perikanan Anda dengan
            layanan terbaik.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.title}
                className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="text-accent" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
