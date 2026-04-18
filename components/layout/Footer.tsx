import Link from "next/link";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const footerLinks = {
  navigasi: [
    { href: "/", label: "Beranda" },
    { href: "/tentang-kami", label: "Tentang Kami" },
    { href: "/layanan", label: "Layanan" },
    { href: "/kontak", label: "Kontak" },
  ],
  layanan: [
    { href: "/layanan/cold-storage", label: "Cold Storage" },
    { href: "/layanan/pembekuan-ikan", label: "Pembekuan Ikan" },
    { href: "/layanan/sewa-thermoking", label: "Sewa Thermoking" },
  ],
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/gambar/logo.jpeg"
                alt="Logo Koperasi Sukses Mina Bahari"
                className="h-12 w-auto object-contain bg-white rounded-lg p-1"
              />
            </div>
            <h3 className="text-xl font-bold mb-4">
              Koperasi Jasa Sukses Mina Bahari
            </h3>

            <p className="text-gray-300 text-sm mb-4">
              Koperasi terpercaya di Kota Pekalongan untuk solusi cold storage,
              pembekuan ikan, dan distribusi berpendingin.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h4 className="font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2">
              {footerLinks.navigasi.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-semibold mb-4">Layanan Kami</h4>
            <ul className="space-y-2">
              {footerLinks.layanan.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-accent text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Kontak Info */}
          <div>
            <h4 className="font-semibold mb-4">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Jl. Pantai Sari No. 13, Pekalongan, Jawa Tengah</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone size={16} className="mt-1 flex-shrink-0" />
                <div>
                  <div className="mb-1">
                    <a href="tel:+6281565675877" className="hover:text-accent">
                      0815-6567-587
                    </a>
                    <span className="text-xs ml-2">(Ketua)</span>
                  </div>
                  <div>
                    <a href="tel:+6281568471106" className="hover:text-accent">
                      0815-6847-1106
                    </a>
                    <span className="text-xs ml-2">(GM)</span>
                  </div>
                </div>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={16} className="flex-shrink-0" />
                <a
                  href="mailto:kopjasa.suksesminabaharipkl@gmail.com"
                  className="hover:text-accent break-all"
                >
                  kopjasa.suksesminabaharipkl@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <Clock size={16} className="mt-1 flex-shrink-0" />
                <span>Senin - Sabtu: 08:00 - 17:00</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>
            &copy; {currentYear} Koperasi Sukses Mina Bahari. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
