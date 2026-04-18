'use client'

import { useState } from 'react'
import { Award } from 'lucide-react'

export default function CertificateImage({ src, alt }: { src: string; alt: string }) {
  const [imageError, setImageError] = useState(false)

  if (imageError || !src) {
    return (
      <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center border border-gray-200">
        <Award className="w-6 h-6 text-gray-400" />
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-12 h-12 object-cover rounded border border-gray-200"
      onError={() => setImageError(true)}
    />
  )
}
