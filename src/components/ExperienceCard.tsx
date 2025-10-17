import { MapPin, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import type { Activity } from '@/types'
import { getStaticPlaceholder } from '@/lib/unsplash'

interface ExperienceCardProps {
  activity: Activity
}

export default function ExperienceCard({ activity }: ExperienceCardProps) {
  const imageUrl = activity.image_url || getStaticPlaceholder(activity.category)

  return (
    <div className="card">
      <div className="mb-4 -mx-6 -mt-6 rounded-t-xl overflow-hidden relative h-48">
        <Image
          src={imageUrl}
          alt={activity.title}
          fill
          className="object-cover"
        />
      </div>
      
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
  )
}