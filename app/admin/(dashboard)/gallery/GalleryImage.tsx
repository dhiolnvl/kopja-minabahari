'use client'

import { useState } from 'react'
import { ImageIcon } from 'lucide-react'

export default function GalleryImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false)

  if (imageError || !src) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <ImageIcon className="w-12 h-12 text-gray-400" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setImageError(true)}
    />
  )
}
