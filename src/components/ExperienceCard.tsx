import { MapPin, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import type { Activity } from '@/types'
import { getStaticPlaceholder } from '@/lib/unsplash'

interface ExperienceCardProps {
  activity: Activity
}

export default function ExperienceCard({ activity }: ExperienceCardProps) {
  const imageUrl = activity.image_url || getStaticPlaceholder(activity.category)
  const hasDiscount = activity.discount_percentage > 0

  return (
    <div className="card relative">
      {/* Badge Sconto */}
      {hasDiscount && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-accent-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
            -{activity.discount_percentage}% OSPITI
          </span>
        </div>
      )}

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
      
      {hasDiscount && (
        <div className="bg-accent-50 border border-accent-200 rounded-lg p-2 mb-4">
          <p className="text-xs text-accent-700 font-semibold">
            🎁 Sconto {activity.discount_percentage}% per ospiti hotel partner
          </p>
        </div>
      )}
      
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