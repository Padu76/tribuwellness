import { supabase } from '@/lib/supabase'
import Footer from '@/components/Footer'
import { MapPin, ExternalLink } from 'lucide-react'
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

  // Group by category
  const categorizedActivities = activities.reduce((acc, activity) => {
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

        {/* Activities by category */}
        {Object.keys(categorizedActivities).length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Nuove esperienze in arrivo...
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
                  <div key={activity.id} className="card">
                    {activity.image_url && (
                      <div className="mb-4 -mx-6 -mt-6 rounded-t-xl overflow-hidden">
                        <img
                          src={activity.image_url}
                          alt={activity.title}
                          className="w-full h-48 object-cover"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold mb-2">
                      {activity.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                      <MapPin size={16} />
                      <span>{activity.location}</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      {activity.description}
                    </p>
                    <div className="flex gap-2">
                      {activity.website_url && (
                        <a
                          href={activity.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-sm flex items-center gap-2"
                        >
                          <ExternalLink size={16} />
                          Sito Web
                        </a>
                      )}
                      {activity.maps_url && (
                        <a
                          href={activity.maps_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-sm flex items-center gap-2"
                        >
                          <MapPin size={16} />
                          Mappa
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>

      <Footer />
    </>
  )
}