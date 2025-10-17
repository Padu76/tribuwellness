import { supabase } from '@/lib/supabase'
import Footer from '@/components/Footer'
import ExperienceCard from '@/components/ExperienceCard'
import { MapPin, ExternalLink, Dumbbell, Home, ArrowLeft } from 'lucide-react'
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
  
  // Altre attività (quelle importanti per trovare partner!)
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
      {/* Navigation Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center group-hover:bg-primary-700 transition-colors">
                <Dumbbell className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                Tribù Wellness
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="flex items-center gap-4">
              <Link 
                href="/" 
                className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                <Home size={18} />
                <span className="hidden sm:inline">Home</span>
              </Link>
              <Link 
                href="/studio" 
                className="flex items-center gap-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
              >
                <Dumbbell size={18} />
                <span className="hidden sm:inline">Tribù Studio</span>
              </Link>
              <Link 
                href="/#partnership" 
                className="btn-primary text-sm"
              >
                Diventa Partner
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Torna alla Home</span>
          </Link>
        </div>

        {/* Hero */}
        <section className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Esperienze Wellness Verona
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Scopri i migliori luoghi per benessere, fitness e healthy lifestyle a Verona e dintorni
          </p>
        </section>

        {/* Grid con Tribù Studio + prime 2 esperienze */}
        <section className="mb-16">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Tribù Studio - Featured */}
            {tribuStudio && (
              <div className="card border-2 border-primary-500 bg-gradient-to-br from-primary-50 to-white relative overflow-hidden">
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    -20% OSPITI
                  </span>
                </div>
                <div className="relative h-48 -mx-6 -mt-6 mb-4">
                  <Image
                    src={tribuStudio.image_url || '/images/studio/interior.jpg'}
                    alt={tribuStudio.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-primary-600 text-white p-2 rounded-lg">
                    <Dumbbell size={20} />
                  </div>
                  <h3 className="text-xl font-bold">{tribuStudio.title}</h3>
                </div>
                <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                  <MapPin size={14} />
                  <span>{tribuStudio.location}</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{tribuStudio.description}</p>
                <div className="flex gap-2">
                  <Link href="/studio" className="btn-primary text-sm w-full justify-center">
                    Scopri
                  </Link>
                </div>
              </div>
            )}

            {/* Prime 2 altre esperienze in evidenza */}
            {otherActivities.slice(0, 2).map((activity) => (
              <ExperienceCard key={activity.id} activity={activity} />
            ))}
          </div>
        </section>

        {/* Tutte le Esperienze per Categoria */}
        {Object.keys(categorizedActivities).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nuove esperienze partner in arrivo...
            </p>
          </div>
        ) : (
          Object.entries(categorizedActivities).map(([category, items]) => (
            <section key={category} className="mb-16">
              <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <span>{categoryEmojis[category]}</span>
                {categoryLabels[category]}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((activity) => (
                  <ExperienceCard key={activity.id} activity={activity} />
                ))}
              </div>
            </section>
          ))
        )}

        {/* CTA Partner */}
        <section className="card max-w-3xl mx-auto text-center bg-gradient-to-r from-accent-50 to-primary-50 mt-16">
          <h2 className="text-3xl font-bold mb-4">Vuoi essere in questa lista?</h2>
          <p className="text-gray-700 mb-6">
            Se gestisci una spa, ristorante healthy, centro wellness o attività outdoor a Verona, entra nel network Tribù Wellness!
          </p>
          <a href="/#partnership" className="btn-primary">
            Diventa Partner
          </a>
        </section>
      </div>

      <Footer />
    </>
  )
}