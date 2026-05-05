import Link from 'next/link'
import { Phone, Mail } from 'lucide-react'

export default function ContactCTA() {
  return (
    <section className="py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap Bekerja Sama dengan Kami?
          </h2>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Hubungi kami sekarang untuk konsultasi gratis dan penawaran terbaik
            untuk kebutuhan cold storage Anda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              href="/kontak"
              className="inline-flex items-center bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              <Mail className="mr-2" size={20} />
              Kirim Pesan
            </Link>
            <a
              href="tel:+6281565675877"
              className="inline-flex items-center bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
            >
              <Phone className="mr-2" size={20} />
              0815-6567-587
            </a>
          </div>

          <p className="text-gray-300 text-sm">
            Jam Operasional: Senin - Sabtu, 08:00 - 16:00 WIB
          </p>
        </div>
      </div>
    </section>
  )
}
