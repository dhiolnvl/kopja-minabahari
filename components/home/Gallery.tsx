'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

const images = [
  { src: '/gambar/Gedung Tampa Depan.jpg', title: 'Gedung Tampak Depan', category: 'Fasilitas' },
  { src: '/gambar/Ruang Proses Gudang 100ton.jpg', title: 'Ruang Proses Gudang 100 Ton', category: 'Fasilitas' },
  { src: '/gambar/Ruang Proses Gudang 30 Ton.jpg', title: 'Ruang Proses Gudang 30 Ton', category: 'Fasilitas' },
  { src: '/gambar/Gudang Penyimpanan Karton & Plastik.jpg', title: 'Gudang Penyimpanan', category: 'Fasilitas' },
  { src: '/gambar/Bahan Baku.jpg', title: 'Bahan Baku Ikan Segar', category: 'Proses' },
  { src: '/gambar/Sortir.jpg', title: 'Sortir Ikan', category: 'Proses' },
  { src: '/gambar/Penyortiran.jpg', title: 'Penyortiran', category: 'Proses' },
  { src: '/gambar/Penimbangan.jpg', title: 'Penimbangan', category: 'Proses' },
  { src: '/gambar/Pencucian.jpg', title: 'Pencucian', category: 'Proses' },
  { src: '/gambar/Penirisan.jpg', title: 'Penirisan', category: 'Proses' },
  { src: '/gambar/Pengepakan.jpg', title: 'Pengepakan', category: 'Proses' },
  { src: '/gambar/penyusunan di troli.jpg', title: 'Penyusunan di Troli', category: 'Proses' },
  { src: '/gambar/Peralatan Proses.jpg', title: 'Peralatan Proses', category: 'Peralatan' },
  { src: '/gambar/Jaket Headless .jpg', title: 'Jaket Headless', category: 'Peralatan' },
]

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('Semua')

  const categories = ['Semua', 'Fasilitas', 'Proses', 'Peralatan']

  const filteredImages = filter === 'Semua'
    ? images
    : images.filter(img => img.category === filter)

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
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-shadow"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <p className="font-semibold">{image.title}</p>
                  <p className="text-sm text-gray-300">{image.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <X size={32} />
          </button>
          <img
            src={selectedImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
