'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/tentang-kami', label: 'Tentang Kami' },
  { href: '/layanan', label: 'Layanan' },
  { href: '/kontak', label: 'Kontak' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <img
              src="/gambar/logo.jpeg"
              alt="Logo Koperasi Sukses Mina Bahari"
              className="h-12 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <div className="text-primary font-bold text-base leading-tight">
                Koperasi Jasa Sukses Mina Bahari
              </div>
              <div className="text-xs text-gray-600">Kota Pekalongan</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <Link
              href="/kontak"
              className="bg-accent hover:bg-accent-dark text-white px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Hubungi Kami
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-gray-700 hover:text-primary font-medium py-2"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/kontak"
              className="block bg-accent hover:bg-accent-dark text-white px-6 py-2 rounded-lg font-semibold text-center transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Hubungi Kami
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
