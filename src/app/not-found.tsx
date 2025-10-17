import Link from 'next/link'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <div className="container mx-auto px-4 py-16 min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-2xl">
          <div className="text-8xl mb-6">🤔</div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Pagina non trovata
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            Ops! Sembra che questa pagina non esista o il partner che stai cercando non è più attivo.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/" className="btn-primary">
              Torna alla Home
            </Link>
            <Link href="/esperienze" className="btn-secondary">
              Esplora Esperienze
            </Link>
          </div>
          
          <div className="mt-12 p-6 bg-primary-50 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">Sei un hotel?</h2>
            <p className="text-gray-700 mb-4">
              Se stai cercando informazioni sulla partnership Tribu Wellness, contattaci direttamente!
            </p>
            <Link href="/#partnership" className="text-primary-600 font-semibold hover:underline">
              Scopri la Partnership →
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  )
}