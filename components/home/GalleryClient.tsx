'use client'

import { useState } from 'react'
import Image from 'next/image'
import { X, Play } from 'lucide-react'
import type { Gallery } from '@/lib/supabase/types'

export default function GalleryClient({ initialImages }: { initialImages: Gallery[] }) {
  const [selectedItem, setSelectedItem] = useState<Gallery | null>(null)
  const [filter, setFilter] = useState<string>('Semua')

  // Extract unique categories from data
  const dynamicCategories = Array.from(
    new Set(initialImages.map((img) => img.category).filter(Boolean))
  ) as string[]
  const categories = ['Semua', ...dynamicCategories]

  const filteredImages =
    filter === 'Semua'
      ? initialImages
      : initialImages.filter((img) => img.category === filter)

  const getCategoryLabel = (cat: string | null) => {
    if (!cat) return '-'
    const labels: Record<string, string> = {
      facility: 'Fasilitas',
      activity: 'Kegiatan',
      product: 'Produk',
      other: 'Lainnya',
      Semua: 'Semua'
    }
    return labels[cat] || cat
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Fasilitas & Proses Produksi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Lihat fasilitas modern dan proses produksi kami yang menjaga kualitas
            produk perikanan Anda.
          </p>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  filter === category
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {getCategoryLabel(category)}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={image.id || index}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow bg-gray-100"
              onClick={() => setSelectedItem(image)}
            >
              {image.image ? (
                <Image
                  src={image.image}
                  alt={image.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  loading="lazy"
                  quality={75}
                />
              ) : image.video_url ? (
                <video
                  src={image.video_url}
                  className="w-full h-full object-cover"
                  preload="metadata"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-400 text-xs">Tidak Ada Media</span>
                </div>
              )}
              
              {/* Play icon overlay for videos */}
              {image.video_url && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors z-10">
                  <div className="bg-white/90 p-4 rounded-full shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-primary fill-primary ml-0.5" />
                  </div>
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
                  <p className="font-semibold">{image.title}</p>
                  <p className="text-sm text-gray-300">{getCategoryLabel(image.category)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelectedItem(null)}
        >
          <button
            onClick={() => setSelectedItem(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-50 p-2 bg-black/40 rounded-full hover:bg-black/60"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>
          
          <div 
            className="relative w-full h-full max-w-5xl max-h-[80vh] flex flex-col justify-center items-center" 
            onClick={(e) => e.stopPropagation()}
          >
            {selectedItem.video_url ? (
              <div className="w-full h-full flex items-center justify-center bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <video
                  src={selectedItem.video_url}
                  className="max-h-full max-w-full w-auto h-auto outline-hidden"
                  controls
                  autoPlay
                  preload="auto"
                />
              </div>
            ) : selectedItem.image ? (
              <div className="relative w-full h-full">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title || ""}
                  fill
                  className="object-contain"
                  sizes="90vw"
                  quality={90}
                  priority
                />
              </div>
            ) : (
              <div className="text-white text-center">Tidak ada media</div>
            )}
            
            {/* Metadata caption in lightbox */}
            <div className="absolute -bottom-16 left-0 right-0 text-center text-white px-4 py-2.5 bg-black/60 backdrop-blur-xs rounded-lg max-w-lg mx-auto">
              <h3 className="font-semibold text-lg leading-tight">{selectedItem.title}</h3>
              {selectedItem.description && (
                <p className="text-sm text-gray-300 mt-1">{selectedItem.description}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
