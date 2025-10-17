const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY

const categoryQueries: Record<string, string> = {
  spa: 'spa wellness massage',
  outdoor: 'hiking outdoor nature',
  food: 'healthy food restaurant',
  wellness: 'yoga wellness meditation',
  fitness: 'fitness gym workout',
}

export async function getUnsplashImage(category: string): Promise<string> {
  if (!UNSPLASH_ACCESS_KEY) {
    console.warn('Unsplash API key not configured')
    return getFallbackImage(category)
  }

  const query = categoryQueries[category] || 'wellness'
  
  try {
    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(query)}&orientation=landscape&content_filter=high`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
        next: { revalidate: 86400 }, // Cache 24h
      }
    )

    if (!response.ok) {
      throw new Error('Unsplash API error')
    }

    const data = await response.json()
    return data.urls.regular || getFallbackImage(category)
  } catch (error) {
    console.error('Error fetching Unsplash image:', error)
    return getFallbackImage(category)
  }
}

function getFallbackImage(category: string): string {
  // Gradient placeholder basato su categoria
  const colors: Record<string, string> = {
    spa: 'from-blue-400 to-cyan-300',
    outdoor: 'from-green-400 to-emerald-300',
    food: 'from-orange-400 to-amber-300',
    wellness: 'from-purple-400 to-pink-300',
    fitness: 'from-red-400 to-rose-300',
  }
  
  const gradient = colors[category] || 'from-gray-400 to-gray-300'
  
  // Unsplash placeholder con gradiente
  return `https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop&q=80`
}

export function getStaticPlaceholder(category: string): string {
  // Immagini statiche per build time
  const placeholders: Record<string, string> = {
    spa: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=600&fit=crop&q=80',
    outdoor: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&h=600&fit=crop&q=80',
    food: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop&q=80',
    wellness: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=600&fit=crop&q=80',
    fitness: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop&q=80',
  }
  
  return placeholders[category] || placeholders.wellness
}