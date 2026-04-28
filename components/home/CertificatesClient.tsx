'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Award, X } from 'lucide-react'
import type { Certificate } from '@/lib/supabase/types'

export default function CertificatesClient({ initialCertificates }: { initialCertificates: Certificate[] }) {
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
          {initialCertificates.map((cert) => (
            <div
              key={cert.id}
              className="bg-gradient-to-br from-primary/5 to-ocean/5 rounded-xl p-4 hover:shadow-lg transition-shadow cursor-pointer group"
              onClick={() => cert.image && setSelectedImage(cert.image)}
            >
              <div className="aspect-[3/4] bg-white rounded-lg overflow-hidden mb-3 shadow-sm relative">
                {cert.image ? (
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    quality={80}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                    <Award className="w-12 h-12" />
                  </div>
                )}
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
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <div className="relative w-full h-full max-w-4xl max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedImage}
              alt="Certificate"
              fill
              className="object-contain"
              sizes="90vw"
              quality={95}
            />
          </div>
        </div>
      )}
    </section>
  )
}
