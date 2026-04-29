import type { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import ContactForm from '@/components/shared/ContactForm'
import { BreadcrumbJsonLd } from '@/components/seo/JsonLd'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://koperasiminabahari.com'

export const metadata: Metadata = {
  title: 'Hubungi Kami',
  description:
    'Hubungi Koperasi Jasa Sukses Mina Bahari untuk konsultasi dan informasi lebih lanjut tentang layanan cold storage, pembekuan ikan, dan sewa thermoking di Kota Pekalongan.',
  alternates: {
    canonical: `${siteUrl}/kontak`,
  },
  openGraph: {
    title: 'Hubungi Kami - Koperasi Jasa Sukses Mina Bahari',
    description:
      'Hubungi Koperasi Jasa Sukses Mina Bahari untuk konsultasi dan informasi lebih lanjut tentang layanan cold storage, pembekuan ikan, dan sewa thermoking di Kota Pekalongan.',
    type: 'website',
    url: `${siteUrl}/kontak`,
    images: [
      {
        url: `${siteUrl}/gambar/Gedung Tampak Depan 2.jpg`,
        width: 1200,
        height: 630,
        alt: 'Koperasi Jasa Sukses Mina Bahari',
      },
    ],
  },
}

export default function KontakPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Beranda', url: siteUrl },
          { name: 'Kontak', url: `${siteUrl}/kontak` },
        ]}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-ocean py-20 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Hubungi Kami</h1>
            <p className="text-xl text-gray-200">
              Ada pertanyaan atau ingin berkonsultasi? Kami siap membantu Anda
              menemukan solusi terbaik untuk kebutuhan penyimpanan dan distribusi
              produk perikanan.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-8">
                Informasi Kontak
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Alamat</h3>
                    <p className="text-gray-600">
                      Jl. Pantai Sari No. 13
                      <br />
                      Pekalongan, Jawa Tengah
                      <br />
                      Indonesia
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telepon</h3>
                    <div className="space-y-1">
                      <div>
                        <a
                          href="tel:+6281565675877"
                          className="text-primary hover:text-accent"
                        >
                          0815-6567-587
                        </a>
                        <span className="text-sm text-gray-500 ml-2">(Ketua - Pak Kisyono)</span>
                      </div>
                      <div>
                        <a
                          href="tel:+6281568471106"
                          className="text-primary hover:text-accent"
                        >
                          0815-6847-1106
                        </a>
                        <span className="text-sm text-gray-500 ml-2">(GM - Pak Sukamto)</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-ocean/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-ocean" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <a
                      href="mailto:kopjasa.suksesminabaharipkl@gmail.com"
                      className="text-primary hover:text-accent break-all"
                    >
                      kopjasa.suksesminabaharipkl@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Jam Operasional
                    </h3>
                    <p className="text-gray-600">
<<<<<<< HEAD
                      Senin - Sabtu: 08:00 - 17:00 WIB
                      <br />
                      Minggu: Tutup
=======
                      Senin - Sabtu: 08:00 - 16:00 WIB
                      <br />
                      Minggu: Kantor Tutup
>>>>>>> 0aa480254ce8f70487edba9b33c619998aaba6d3
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-8 p-6 bg-gradient-to-br from-accent/10 to-accent/5 rounded-xl border border-accent/20">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Butuh Respon Cepat?
                </h3>
                <p className="text-gray-600 mb-4">
                  Hubungi kami melalui WhatsApp untuk mendapatkan balasan lebih
                  cepat.
                </p>
                <a
                  href="https://wa.me/628156567587"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  Chat WhatsApp
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <div className="bg-light rounded-xl p-8">
                <h2 className="text-2xl font-bold text-primary mb-6">
                  Kirim Pesan
                </h2>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">
            Lokasi Kami
          </h2>
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="w-full overflow-hidden rounded-lg" style={{ height: '450px' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.256033199203!2d109.68793287555779!3d-6.859887393138602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7025ad5e4c3253%3A0xa5bf3cc94766c805!2sKoperasi%20Jasa%20Sukses%20Mina%20Bahari!5e0!3m2!1sid!2sid!4v1776760097720!5m2!1sid!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Lokasi Koperasi Jasa Sukses Mina Bahari"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
