// Helper per fetch eventi da Verona Daily

interface VeronaEvent {
  id: string
  title: string
  excerpt: string
  image: string
  source: string
  category: string
  location: string
  date: string
  url: string
  price?: string
}

const VERONA_DAILY_API = 'https://verona-daily.vercel.app/api/events'
const CACHE_DURATION = 1000 * 60 * 30 // 30 minuti

let cachedEvents: VeronaEvent[] | null = null
let cacheTimestamp: number | null = null

/**
 * Fetch eventi da Verona Daily API
 * Con cache di 30 minuti per performance
 * 
 * NOTA: Temporaneamente usa eventi fallback finché API Verona Daily è pubblica
 */
export async function getVeronaEvents(limit: number = 5): Promise<VeronaEvent[]> {
  // TEMPORANEO: Usa sempre fallback finché API non è pronta
  // TODO: Rimuovi questo quando https://verona-daily.vercel.app/api/events è pubblico
  return getFallbackEvents(limit)

  /* CODICE ORIGINALE - Riattiva quando API è pronta
  try {
    // Check cache
    const now = Date.now()
    if (cachedEvents && cacheTimestamp && (now - cacheTimestamp) < CACHE_DURATION) {
      return cachedEvents.slice(0, limit)
    }

    // Fetch fresh data
    const response = await fetch(VERONA_DAILY_API, {
      next: { revalidate: 1800 }
    })

    if (!response.ok) {
      console.warn(`Verona Daily API returned ${response.status}, using fallback events`)
      return getFallbackEvents(limit)
    }

    const events: VeronaEvent[] = await response.json()

    if (!events || events.length === 0) {
      console.warn('Verona Daily API returned no events, using fallback')
      return getFallbackEvents(limit)
    }

    // Update cache
    cachedEvents = events
    cacheTimestamp = now

    return events.slice(0, limit)

  } catch (error) {
    console.warn('Error fetching Verona Daily events, using fallback:', error)
    return getFallbackEvents(limit)
  }
  */
}

/**
 * Eventi fallback in caso di errore API
 */
function getFallbackEvents(limit: number): VeronaEvent[] {
  const fallback: VeronaEvent[] = [
    {
      id: 'fallback-1',
      title: 'Arena di Verona - Opera Festival',
      excerpt: 'Stagione lirica all\'anfiteatro romano',
      image: 'https://images.unsplash.com/photo-1574784914708-4c5a0f7d78b1?w=600&h=400&fit=crop',
      source: 'Arena di Verona',
      category: 'opera',
      location: 'Arena di Verona',
      date: 'Giugno-Settembre 2025',
      url: 'https://www.arena.it',
      price: 'Da €25'
    },
    {
      id: 'fallback-2',
      title: 'Vinitaly 2025',
      excerpt: 'Salone internazionale del vino',
      image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?w=600&h=400&fit=crop',
      source: 'Fiera di Verona',
      category: 'enogastronomia',
      location: 'Fiera di Verona',
      date: 'Aprile 2025',
      url: 'https://www.vinitaly.com',
      price: 'Ingresso professionisti'
    },
    {
      id: 'fallback-3',
      title: 'Teatro Romano - Estate Teatrale',
      excerpt: 'Spettacoli Shakespeare sotto le stelle',
      image: 'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&h=400&fit=crop',
      source: 'Teatro Romano',
      category: 'teatro',
      location: 'Teatro Romano',
      date: 'Luglio-Agosto 2025',
      url: 'https://www.comune.verona.it',
      price: 'Da €18'
    }
  ]

  return fallback.slice(0, limit)
}

/**
 * Emoji per categoria evento
 */
export function getCategoryEmoji(category: string): string {
  const emojiMap: Record<string, string> = {
    'opera': '🎭',
    'teatro': '🎪',
    'concerti': '🎵',
    'sport': '⚽',
    'enogastronomia': '🍷',
    'feste': '🎉',
    'cultura': '🎨',
    'mostre': '🖼️',
    'fiere': '🏛️',
  }

  return emojiMap[category.toLowerCase()] || '📅'
}