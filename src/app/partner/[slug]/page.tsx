import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import Footer from '@/components/Footer'
import PartnerHero from '@/components/PartnerHero'
import StudioSection from '@/components/StudioSection'
import EventsWidget from '@/components/EventsWidget'
import ExperienceCard from '@/components/ExperienceCard'
import { Sparkles } from 'lucide-react'
import type { Partner, Activity } from '@/types'

interface PageProps {
  params: {
    slug: string
  }
}

async function getPartner(slug: string): Promise<Partner | null> {
  const { data } = await supabase
    .from('partners')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  return data
}

async function getActivities(): Promise<Activity[]> {
  const { data } = await supabase
    .from('activities')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  return data || []
}

export default async function PartnerLandingPage({ params }: PageProps) {
  const partner = await getPartner(params.slug)

  if (!partner) {
    notFound()
  }

  const activities = await getActivities()

  // Filtra Tribù Studio dalle altre esperienze
  const tribuStudio = activities.find(a => a.title.toLowerCase().includes('tribù studio'))
  const otherActivities = activities.filter(a => a.id !== tribuStudio?.id)

  return (
    <>
      <PartnerHero partner={partner} />

      <div className="container mx-auto px-4 py-16">
        {/* Tribù Studio con Sconto 20% */}
        <StudioSection 
          showDiscount={true} 
          partnerName={partner.name}
        />

        {/* NUOVO: Widget Eventi Verona Daily */}
        <EventsWidget />

        {/* Altre Esperienze Wellness */}
        {otherActivities.length > 0 && (
          <section className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Scopri Anche...</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Altre esperienze wellness selezionate per completare il tuo soggiorno
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherActivities.slice(0, 6).map((activity) => (
                <ExperienceCard key={activity.id} activity={activity} />
              ))}
            </div>
          </section>
        )}

        {/* Box Vantaggi Esclusivi Ospiti */}
        <section className="card max-w-3xl mx-auto bg-gradient-to-br from-primary-50 to-accent-50 border-2 border-primary-200">
          <div className="flex items-start gap-4">
            <div className="bg-primary-600 text-white p-3 rounded-full">
              <Sparkles size={28} />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3">Vantaggi Esclusivi Ospiti {partner.name}</h3>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">💪</span>
                  <div>
                    <strong className="block">Sconto 20% Tribù Studio</strong>
                    <p className="text-sm">Personal training e lezioni di gruppo con trainer qualificati</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎭</span>
                  <div>
                    <strong className="block">Eventi Verona Daily</strong>
                    <p className="text-sm">Scopri opera, concerti, teatro e sagre durante il soggiorno</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🧘</span>
                  <div>
                    <strong className="block">Esperienze Wellness</strong>
                    <p className="text-sm">Spa, ristoranti healthy e attività outdoor selezionate</p>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-4 italic">
                💡 Menziona di essere ospite di {partner.name} quando prenoti per ottenere gli sconti dedicati
              </p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  )
}