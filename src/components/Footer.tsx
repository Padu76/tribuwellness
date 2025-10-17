import { Instagram, Facebook, Globe } from 'lucide-react'
import { SOCIAL_LINKS } from '@/lib/constants'
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white text-xl font-bold mb-4">Tribù Wellness</h3>
            <p className="text-sm">
              Connetti il mondo turistico con fitness e benessere locale
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Link Utili</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/studio" className="hover:text-white transition-colors">
                  Tribù Studio
                </Link>
              </li>
              <li>
                <Link href="/esperienze" className="hover:text-white transition-colors">
                  Esperienze
                </Link>
              </li>
              <li>
                <Link href="/#come-funziona" className="hover:text-white transition-colors">
                  Come Funziona
                </Link>
              </li>
              <li>
                <Link href="/partner-info" className="hover:text-white transition-colors font-semibold">
                  Info Partner
                </Link>
              </li>
              <li>
                <Link href="/#partnership" className="hover:text-white transition-colors">
                  Diventa Partner
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Seguici</h4>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
              <a
                href={SOCIAL_LINKS.website}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
                aria-label="Sito Web"
              >
                <Globe size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>© {currentYear} Tribù Wellness. Tutti i diritti riservati.</p>
        </div>
      </div>
    </footer>
  )
}