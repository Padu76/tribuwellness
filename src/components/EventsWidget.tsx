import { getVeronaEvents, getCategoryEmoji } from '@/lib/verona-daily'
import { Calendar, MapPin, ExternalLink } from 'lucide-react'
import Image from 'next/image'

export default async function EventsWidget() {
  const events = await getVeronaEvents(5)

  if (events.length === 0) return null

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2">📅 Eventi Oggi a Verona</h2>
          <p className="text-gray-600">
            Scopri cosa fare durante il tuo soggiorno
          </p>
        </div>
        <a
          href="https://verona-daily.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary text-sm flex items-center gap-2"
        >
          Vedi Tutti
          <ExternalLink size={16} />
        </a>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.slice(0, 3).map((event) => (
          <div key={event.id} className="card group hover:shadow-xl transition-all">
            {/* Immagine */}
            <div className="relative h-48 -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-xl">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                <span>{getCategoryEmoji(event.category)}</span>
                <span className="capitalize">{event.category}</span>
              </div>
            </div>

            {/* Contenuto */}
            <div>
              <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors">
                {event.title}
              </h3>

              <div className="flex items-center gap-2 text-gray-600 text-sm mb-2">
                <Calendar size={14} />
                <span>{event.date}</span>
              </div>

              <div className="flex items-center gap-2 text-gray-600 text-sm mb-3">
                <MapPin size={14} />
                <span className="line-clamp-1">{event.location}</span>
              </div>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {event.excerpt}
              </p>

              {event.price && (
                <div className="inline-block bg-accent-100 text-accent-700 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                  {event.price}
                </div>
              )}

              {event.url && event.url !== '#' && (
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 font-semibold text-sm flex items-center gap-1"
                >
                  Info e Biglietti
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Banner Verona Daily */}
      <div className="card mt-6 bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 text-center">
        <p className="text-gray-700 mb-3">
          <strong>Vuoi scoprire tutti gli eventi di Verona?</strong>
        </p>
        <a
          href="https://verona-daily.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary inline-flex items-center gap-2"
        >
          Visita Verona Daily
          <ExternalLink size={18} />
        </a>
      </div>
    </section>
  )
}