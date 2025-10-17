import { supabase } from '@/lib/supabase'
import Footer from '@/components/Footer'
import ExperienceCard from '@/components/ExperienceCard'
import { MapPin, ExternalLink, Dumbbell } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Activity } from '@/types'

export const metadata = {
  title: 'Esperienze Wellness | Tribu Wellness',
  description: 'Scopri spa, ristoranti healthy, attività outdoor e esperienze benessere a Verona e dintorni.',
}

async function getActivities(): Promise<Activity[]> {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (error || !data) return []
  return data
}

const categoryLabels: Record<string, string> = {
  spa: 'SPA & Relax',
  outdoor: 'Outdoor',
  food: 'Food & Healthy',
  wellness: 'Wellness',
  fitness: 'Fitness',
}

const categoryEmojis: Record<string, string> = {
  spa: '💆',
  outdoor: '🏃',
  food: '🥗',
  wellness: '🧘',
  fitness: '💪',
}

export default async function EsperienzePage() {
  const activities = await getActivities()

  // Trova Tribù Studio
  const tribuStudio = activities.find(a => a.title.toLowerCase().includes('tribù studio'))
  
  // Altre attività
  const otherActivities = activities.filter(a => a.id !== tribuStudio?.id)

  // Group by category
  const categorizedActivities = otherActivities.reduce((acc, activity) => {
    if (!acc[activity.category]) {
      acc[activity.category] = []
    }
    acc[activity.category].push(activity)
    return acc
  }, {} as Record<string, Activity[]>)

  return (
    <>
      <div className="container mx-auto px-4 py-16">
        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Esperienze Wellness
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scopri i migliori luoghi per benessere, fitness e healthy lifestyle a Verona e dintorni
          </p>
        </section>

        {/* Tribù Studio Evidenziato */}
        {tribuStudio && (
          <section className="mb-16">
            <div className="card max-w-5xl mx-auto bg-gradient-to-br from-primary-50 via-white to-accent-50 border-2 border-primary-500 overflow-hidden">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                  ⭐ SERVIZIO PRINCIPALE
                </div>
                <div className="bg-accent-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                  SCONTO 20% OSPITI HOTEL
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="relative h-64 md:h-full min-h-[300px] rounded-xl overflow-hidden">
                  <Image
                    src={tribuStudio.image_url || '/images/studio/interior.jpg'}
                    alt={tribuStudio.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <Dumbbell className="text-primary-600" size={32} />
                    </div>
                    <h2 className="text-3xl font-bold">{tribuStudio.title}</h2>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin size={18} />
                    <span>{tribuStudio.location}</span>
                  </div>

                  <p className="text-gray-700 mb-6 text-lg">
                    {tribuStudio.description}
                  </p>

                  <div className="flex gap-3 flex-wrap">
                    <Link href="/studio" className="btn-primary flex items-center gap-2">
                      <Dumbbell size={18} />
                      Scopri di Più
                    </Link>
                    {tribuStudio.website_url && (
                      <a
                        href={tribuStudio.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary flex items-center gap-2"
                      >
                        <ExternalLink size={18} />
                        Sito Web
                      </a>
                    )}
                    {tribuStudio.maps_url && (
                      <a
                        href={tribuStudio.maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-secondary flex items-center gap-2"
                      >
                        <MapPin size={18} />
                        Mappa
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Altre Esperienze */}
        <section>
          <h2 className="text-3xl font-bold mb-8">Altre Esperienze Locali</h2>
          
          {Object.keys(categorizedActivities).length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Nuove esperienze in arrivo...
              </p>
            </div>
          ) : (
            Object.entries(categorizedActivities).map(([category, items]) => (
              <div key={category} className="mb-16">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <span>{categoryEmojis[category]}</span>
                  {categoryLabels[category]}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((activity) => (
                    <ExperienceCard key={activity.id} activity={activity} />
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      </div>

      <Footer />
    </>
  )
}