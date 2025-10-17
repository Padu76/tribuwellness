import WhatsAppCTA from '@/components/WhatsAppCTA'
import Footer from '@/components/Footer'
import StudioSection from '@/components/StudioSection'
import { WHATSAPP_MESSAGES } from '@/lib/constants'

export default function HomePage() {
  return (
    <>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Tribu Wellness
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Connetti il mondo turistico con fitness e benessere locale
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#partnership" className="btn-primary">
              Diventa Partner
            </a>
            <a href="#studio" className="btn-secondary">
              Il Nostro Studio
            </a>
          </div>
        </section>

        {/* Tribù Studio Section */}
        <div id="studio">
          <StudioSection showDiscount={false} />
        </div>

        {/* Come Funziona */}
        <section id="come-funziona" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Come Funziona per gli Hotel</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3">Scansiona QR</h3>
              <p className="text-gray-600">
                Gli ospiti scansionano il QR code in hotel e accedono alla landing personalizzata
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-semibold mb-3">Prenota Sessione</h3>
              <p className="text-gray-600">
                Richiedono disponibilità per allenamenti o esperienze wellness via WhatsApp
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">Esperienza Locale</h3>
              <p className="text-gray-600">
                Scoprono spa, ristoranti healthy e attività outdoor della zona
              </p>
            </div>
          </div>
        </section>

        {/* CTA Partnership */}
        <section id="partnership" className="card max-w-3xl mx-auto text-center bg-gradient-to-r from-primary-50 to-accent-50">
          <h2 className="text-3xl font-bold mb-4">Sei un hotel, B&B o resort?</h2>
          <p className="text-gray-700 mb-6">
            Offri ai tuoi ospiti un servizio wellness esclusivo senza costi di gestione
          </p>
          <WhatsAppCTA
            message={WHATSAPP_MESSAGES.requestInfo()}
            label="Richiedi Info Partnership"
          />
        </section>
      </div>

      <Footer />
    </>
  )
}