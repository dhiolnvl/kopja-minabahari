'use client'

import { useState } from 'react'
import { Award, X } from 'lucide-react'

const certificates = [
  {
    title: 'NIB (Nomor Induk Berusaha)',
    image: '/sertifikat/NIB.jpeg',
  },
  {
    title: 'SKP Ikan Pelagis Beku',
    image: '/sertifikat/skp yg ikan pelagis beku.jpeg',
  },
  {
    title: 'SKP Ikan Demersal Beku',
    image: '/sertifikat/ikan demersal beku.jpeg',
  },
  {
    title: 'SKP Cumi-Cumi Beku',
    image: '/sertifikat/skp cumi2 beku.jpeg',
  },
  {
    title: 'SKP Gurita Beku',
    image: '/sertifikat/skp gurita beku.jpeg',
  },
  {
    title: 'SKP Scallop Beku',
    image: '/sertifikat/skp scallop beku.jpeg',
  },
]

export default function Certificates() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Award className="text-primary w-12 h-12" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Sertifikat & Legalitas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Kami telah memiliki izin dan sertifikasi resmi untuk menjamin
            kualitas dan kepercayaan layanan kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-primary/5 to-ocean/5 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => setSelectedImage(cert.image)}
            >
              <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden mb-3 shadow-sm">
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-sm font-semibold text-gray-900 text-center">
                {cert.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Certificate"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
