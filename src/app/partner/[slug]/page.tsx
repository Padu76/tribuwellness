import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import WhatsAppCTA from '@/components/WhatsAppCTA'
import Footer from '@/components/Footer'
import PartnerHero from '@/components/PartnerHero'
import { WHATSAPP_MESSAGES } from '@/lib/constants'
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
    description: `Benvenuto ospite di ${partner.name}. Scopri allenamenti personalizzati e esperienze wellness a Verona.`,
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

        {/* Servizi */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Cosa Puoi Fare
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Allenamento */}
            <div className="card">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-2xl font-semibold mb-3">
                Allenati con Tribù Studio
              </h3>
              <p className="text-gray-600 mb-6">
                Personal training, Pilates, allenamento funzionale. Sessioni personalizzate per ogni livello.
              </p>
              <WhatsAppCTA
                message={WHATSAPP_MESSAGES.requestSession(partner.name)}
                label="Richiedi Disponibilità"
                className="w-full justify-center"
              />
            </div>

            {/* Esperienze */}
            <div className="card">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-2xl font-semibold mb-3">
                Scopri Esperienze Locali
              </h3>
              <p className="text-gray-600 mb-6">
                Spa, ristoranti healthy, attività outdoor e molto altro nel territorio veronese.
              </p>
              <a
                href="/esperienze"
                className="btn-secondary w-full justify-center inline-flex items-center"
              >
                Esplora Esperienze
              </a>
            </div>
          </div>
        </section>

        {/* Vantaggi */}
        <section className="card max-w-3xl mx-auto text-center bg-gradient-to-r from-primary-50 to-accent-50">
          <h2 className="text-2xl font-bold mb-4">
            Vantaggi Esclusivi per Ospiti {partner.name}
          </h2>
          <ul className="text-left max-w-md mx-auto mb-6 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">✓</span>
              <span>Sconto 10% sulla prima sessione</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">✓</span>
              <span>Consulenza fitness gratuita</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary-600 font-bold">✓</span>
              <span>Accesso alle esperienze partner</span>
            </li>
          </ul>
          <WhatsAppCTA
            message={WHATSAPP_MESSAGES.requestSession(partner.name)}
            label="Prenota Ora"
          />
        </section>
      </div>

      <Footer />
    </>
  )
}