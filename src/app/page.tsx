import Footer from '@/components/Footer'
import StudioSection from '@/components/StudioSection'
import PartnershipForm from '@/components/PartnershipForm'
import ExperienceCard from '@/components/ExperienceCard'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { ArrowRight, Info } from 'lucide-react'
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
  
  // Escludi Tribù Studio dalle featured
  const otherActivities = featuredActivities.filter(
    a => !a.title.toLowerCase().includes('tribù studio')
  )

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Tribù Wellness
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Il portale che connette ospiti hotel con le migliori esperienze fitness e wellness di Verona
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="#studio" className="btn-primary">
              Allenati con Noi
            </a>
            <a href="#esperienze" className="btn-secondary">
              Scopri le Esperienze
            </a>
          </div>
        </section>

        {/* Tribù Studio Section */}
        <div id="studio" className="scroll-mt-20">
          <StudioSection showDiscount={false} />
        </div>

        {/* Esperienze in Evidenza */}
        {otherActivities.length > 0 && (
          <section id="esperienze" className="mb-16 scroll-mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Esperienze Wellness Partner</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Scopri spa, ristoranti healthy e attività outdoor selezionati per completare il tuo benessere
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {otherActivities.slice(0, 6).map((activity) => (
                <ExperienceCard key={activity.id} activity={activity} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/esperienze" className="btn-primary inline-flex items-center gap-2">
                Vedi Tutte le Esperienze
                <ArrowRight size={20} />
              </Link>
            </div>
          </section>
        )}

        {/* Come Funziona */}
        <section id="come-funziona" className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Come Funziona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-3">1. Scansiona QR</h3>
              <p className="text-gray-600">
                Gli ospiti scansionano il QR code in hotel e accedono alla landing personalizzata
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-semibold mb-3">2. Scegli Servizio</h3>
              <p className="text-gray-600">
                Allenati con Tribù Studio (sconto 20%) o scopri altre esperienze wellness
              </p>
            </div>
            <div className="card text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3">3. Prenota Subito</h3>
              <p className="text-gray-600">
                Richiedi disponibilità via WhatsApp e inizia il tuo percorso benessere
              </p>
            </div>
          </div>
        </section>

        {/* Vantaggi Partnership */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Perché Diventare Partner</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">🏨</span>
                Per Hotel & B&B
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Servizio wellness esclusivo per ospiti</li>
                <li>✓ Zero costi di gestione giornaliera</li>
                <li>✓ Landing page personalizzata con QR</li>
                <li>✓ Analytics e monitoraggio utilizzo</li>
              </ul>
            </div>
            <div className="card bg-gradient-to-br from-green-50 to-green-100">
              <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                <span className="text-2xl">💆</span>
                Per Spa, Ristoranti & Wellness
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Visibilità a turisti qualificati</li>
                <li>✓ Presenza nel portale wellness</li>
                <li>✓ Network di hotel partner</li>
                <li>✓ Lead generation senza intermediari</li>
              </ul>
            </div>
          </div>

          {/* CTA Info Partner */}
          <div className="text-center mt-8">
            <Link 
              href="/partner-info" 
              className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-lg transition-colors"
            >
              <Info size={20} />
              Scopri Tutti i Vantaggi e i Piani
              <ArrowRight size={20} />
            </Link>
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