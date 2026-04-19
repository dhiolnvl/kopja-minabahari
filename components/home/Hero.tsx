'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Phone, ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    image: '/gambar/Penyortiran.jpg',
    title: 'Solusi Cold Storage',
    highlight: 'Terpercaya',
    subtitle: 'di Pekalongan',
    description: 'Fasilitas penyimpanan dan pembekuan ikan berstandar tinggi dengan armada distribusi berpendingin untuk menjaga kualitas produk perikanan Anda.',
  },
  {
    image: '/gambar/Ruang Proses Gudang 100ton.jpg',
    title: 'Kapasitas',
    highlight: '100 Ton',
    subtitle: 'Cold Storage',
    description: 'Gudang penyimpanan berkapasitas besar dengan sistem pendingin modern dan monitoring suhu 24 jam untuk menjaga kesegaran ikan Anda.',
  },
  {
    image: '/gambar/Ruang Proses Gudang 30 Ton.jpg',
    title: 'Teknologi',
    highlight: 'Modern',
    subtitle: 'Blast Freezing',
    description: 'Proses pembekuan cepat dengan standar internasional untuk mempertahankan kualitas, tekstur, dan nilai gizi produk perikanan.',
  },
  {
    image: '/gambar/Bahan Baku.jpg',
    title: 'Kualitas',
    highlight: 'Terjamin',
    subtitle: 'Ikan Segar',
    description: 'Proses penanganan ikan segar dengan standar mutu tinggi dari bahan baku hingga penyimpanan untuk hasil terbaik.',
  },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
              loading={index === 0 ? undefined : 'lazy'}
              quality={85}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/40 z-10"></div>
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 z-10">
        <div className="max-w-3xl">
          <div className="text-white">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`transition-all duration-500 ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4 absolute'
                }`}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  {slide.title}{' '}
                  <span className="text-accent">{slide.highlight}</span>{' '}
                  {slide.subtitle}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl">
                  {slide.description}
                </p>
              </div>
            ))}

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

            {/* Tagline */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <p className="text-accent font-semibold text-sm md:text-base italic">
                "Membangun Ekonomi Kerakyatan di Masyarakat Pesisir Pantai Kota Pekalongan"
              </p>
            </div>

            {/* Quick Contact */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3 text-gray-200">
              <div className="flex items-center space-x-2">
                <Phone size={20} />
                <span className="text-sm">Hotline:</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                <a
                  href="tel:+6281565675877"
                  className="text-accent hover:text-accent-dark font-semibold"
                >
                  0815-6567-587 <span className="text-xs">(Ketua)</span>
                </a>
                <a
                  href="tel:+6281568471106"
                  className="text-accent hover:text-accent-dark font-semibold"
                >
                  0815-6847-1106 <span className="text-xs">(GM)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-colors pointer-events-auto"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full backdrop-blur-sm transition-colors pointer-events-auto"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3 pointer-events-auto">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide
                ? 'bg-accent w-8'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
