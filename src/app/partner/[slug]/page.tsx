import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Footer from '@/components/Footer'
import PartnerHero from '@/components/PartnerHero'
import StudioSection from '@/components/StudioSection'
import type { Partner } from '@/types'

async function getPartner(slug: string): Promise<Partner | null> {
  const { data, error } = await supabase
    .from('partners')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) return null
  return data
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const partner = await getPartner(params.slug)
  
  if (!partner) {
    return {
      title: 'Partner non trovato | Tribu Wellness',
    }
  }

  return {
    title: `${partner.name} | Tribu Wellness`,
    description: `Benvenuto ospite di ${partner.name}. Scopri allenamenti personalizzati e esperienze wellness a Verona con sconto 20%.`,
  }
}

export default async function PartnerPage({ params }: { params: { slug: string } }) {
  const partner = await getPartner(params.slug)

  if (!partner) {
    notFound()
  }

  // Track visit
  await supabase
    .from('analytics_events')
    .insert({
      partner_slug: partner.slug,
      event_type: 'visit',
    })

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Partner */}
        <PartnerHero partner={partner} />

        {/* Tribù Studio con sconto 20% */}
        <StudioSection partnerName={partner.name} showDiscount={true} />

        {/* Esperienze Locali */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Scopri Anche...
          </h2>
          <div className="card max-w-3xl mx-auto text-center">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-2xl font-semibold mb-3">
              Esperienze Locali
            </h3>
            <p className="text-gray-600 mb-6">
              Spa, ristoranti healthy, attività outdoor e molto altro nel territorio veronese.
            </p>
            <a
              href="/esperienze"
              className="btn-primary inline-flex items-center"
            >
              Esplora Tutte le Esperienze
            </a>
          </div>
        </section>

        {/* Info Aggiuntive */}
        <section className="card max-w-3xl mx-auto bg-gradient-to-r from-primary-50 to-accent-50">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Vantaggi Esclusivi Ospiti {partner.name}
          </h2>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-2">💪 Fitness</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Sconto 20% allenamenti</li>
                <li>✓ Consulenza gratuita</li>
                <li>✓ Programmi personalizzati</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4">
              <h3 className="font-semibold mb-2">🌟 Esperienze</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>✓ Accesso esperienze partner</li>
                <li>✓ Sconti esclusivi spa & wellness</li>
                <li>✓ Guida locale attività outdoor</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600">
            Mostra il QR code del tuo hotel per usufruire dei vantaggi
          </p>
        </section>
      </div>

      <Footer />
    </>
  )
}