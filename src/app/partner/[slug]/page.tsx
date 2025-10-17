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
    description: `Benvenuto ospite di ${partner.name}. Allenati con Tribù Studio con SCONTO 20% esclusivo e scopri esperienze wellness a Verona.`,
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

        {/* Info Sconto Tribù Studio */}
        <section className="mb-8">
          <div className="card max-w-4xl mx-auto bg-gradient-to-r from-accent-100 to-accent-50 border-2 border-accent-500">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-4xl">🎁</span>
              <h2 className="text-2xl md:text-3xl font-bold text-center">Vantaggi Esclusivi Ospiti {partner.name}</h2>
            </div>
            <div className="bg-white rounded-lg p-6 max-w-2xl mx-auto">
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-primary-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  20%
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Sconto Tribù Studio</h3>
                  <p className="text-gray-700 text-sm mb-3">
                    Allenati con personal trainer certificati e risparmia il <strong>20% su tutte le sessioni</strong>!
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Lezioni individuali Personal Training</li>
                    <li>✓ Sessioni di coppia</li>
                    <li>✓ Prima lezione con massaggio incluso</li>
                  </ul>
                </div>
              </div>
              <p className="text-xs text-gray-500 text-center mt-4">
                * Menziona di essere ospite di {partner.name} quando prenoti
              </p>
            </div>
          </div>
        </section>

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
              Altre Esperienze Wellness
            </h3>
            <p className="text-gray-600 mb-6">
              Spa, ristoranti healthy, attività outdoor e molto altro nel territorio veronese. Alcune con sconti dedicati!
            </p>
            <a
              href="/esperienze"
              className="btn-primary inline-flex items-center"
            >
              Esplora Tutte le Esperienze
            </a>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}