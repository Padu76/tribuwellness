import Footer from '@/components/Footer'
import StudioSection from '@/components/StudioSection'
import PartnershipForm from '@/components/PartnershipForm'
import ExperienceCard from '@/components/ExperienceCard'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Activity } from '@/types'

async function getFeaturedActivities(): Promise<Activity[]> {
  const { data } = await supabase
    .from('activities')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })
    .limit(6)

  return data || []
}

export default async function HomePage() {
  const featuredActivities = await getFeaturedActivities()

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Tribu Wellness
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Il portale che connette ospiti hotel con le migliori esperienze wellness di Verona
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#esperienze" className="btn-primary">
              Scopri le Esperienze
            </a>
            <a href="#studio" className="btn-secondary">
              Il Nostro Studio
            </a>
          </div>
        </section>

        {/* Esperienze in Evidenza */}
        <section id="esperienze" className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Esperienze Wellness a Verona</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scopri i migliori luoghi per fitness, spa, healthy food e attività outdoor selezionati per te
            </p>
          </div>

          {featuredActivities.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {featuredActivities.map((activity) => (
                  <ExperienceCard key={activity.id} activity={activity} />
                ))}
              </div>

              <div className="text-center">
                <Link href="/esperienze" className="btn-primary inline-flex items-center gap-2">
                  Vedi Tutte le Esperienze
                  <ArrowRight size={20} />
                </Link>
              </div>
            </>
          ) : (
            <div className="card max-w-2xl mx-auto text-center bg-gradient-to-r from-primary-50 to-accent-50">
              <h3 className="text-2xl font-bold mb-4">Esperienze in Arrivo</h3>
              <p className="text-gray-600 mb-6">
                Stiamo selezionando i migliori partner wellness di Verona per offrirti esperienze uniche
              </p>
              <Link href="/esperienze" className="btn-primary">
                Scopri di Più
              </Link>
            </div>
          )}
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
              <h3 className="text-xl font-semibold mb-3">1. Scansiona QR</h3>
              <p className="text-gray-600">
                Gli ospiti scansionano il QR code in hotel e accedono alla landing personalizzata
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold mb-3">2. Scopri Esperienze</h3>
              <p className="text-gray-600">
                Vedono fitness, spa, ristoranti healthy e attività outdoor selezionate
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-semibold mb-3">3. Prenota Servizio</h3>
              <p className="text-gray-600">
                Richiedono disponibilità via WhatsApp per allenamenti o altre esperienze
              </p>
            </div>
          </div>
        </section>

        {/* Vantaggi Partnership */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Vantaggi per Hotel & Esperienze Partner</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">🏨</span>
                Per Hotel & B&B
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Servizio esclusivo per i tuoi ospiti</li>
                <li>✓ Zero costi di gestione</li>
                <li>✓ Landing page personalizzata</li>
                <li>✓ Analytics dettagliate</li>
              </ul>
            </div>
            <div className="card bg-gradient-to-br from-green-50 to-green-100">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">💆</span>
                Per Spa, Ristoranti & Wellness
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Visibilità a turisti selezionati</li>
                <li>✓ Presenza nel portale wellness</li>
                <li>✓ Network di hotel partner</li>
                <li>✓ Nuovi clienti qualificati</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Form Partnership */}
        <section id="partnership">
          <PartnershipForm />
        </section>
      </div>

      <Footer />
    </>
  )
}