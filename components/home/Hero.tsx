import Link from 'next/link'
import { ArrowRight, Phone } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary via-primary-dark to-ocean min-h-[600px] flex items-center">
      {/* Wave Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1440 320">
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,154.7C384,149,480,107,576,90.7C672,75,768,85,864,106.7C960,128,1056,160,1152,154.7C1248,149,1344,107,1392,85.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-white">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Solusi Cold Storage{' '}
              <span className="text-accent">Terpercaya</span> di Pekalongan
            </h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Fasilitas penyimpanan dan pembekuan ikan berstandar tinggi dengan
              armada distribusi berpendingin untuk menjaga kualitas produk
              perikanan Anda.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/kontak"
                className="inline-flex items-center justify-center bg-accent hover:bg-accent-dark text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors group"
              >
                Hubungi Kami
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Link>
              <Link
                href="/layanan"
                className="inline-flex items-center justify-center bg-white hover:bg-gray-100 text-primary px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                Lihat Layanan
              </Link>
            </div>

            {/* Quick Contact */}
            <div className="mt-8 flex items-center space-x-2 text-gray-200">
              <Phone size={20} />
              <span className="text-sm">Hotline:</span>
              <a
                href="tel:+6281234567890"
                className="text-accent hover:text-accent-dark font-semibold"
              >
                +62 812-3456-7890
              </a>
            </div>
          </div>

          {/* Image/Illustration Placeholder */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="aspect-square bg-gradient-to-br from-accent/20 to-ocean/20 rounded-xl flex items-center justify-center">
                  <svg
                    className="w-64 h-64 text-white/80"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
