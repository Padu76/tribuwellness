import type { Partner } from '@/types'

interface PartnerHeroProps {
  partner: Partner
}

export default function PartnerHero({ partner }: PartnerHeroProps) {
  const tierBadges = {
    freemium: 'Partner Tribu Wellness',
    pro: 'Partner Pro Tribu Wellness',
    ambassador: 'Ambassador Tribu Wellness',
  }

  const tierColors = {
    freemium: 'bg-primary-100 text-primary-700',
    pro: 'bg-accent-100 text-accent-700',
    ambassador: 'bg-gradient-to-r from-primary-600 to-accent-600 text-white',
  }

  return (
    <section className="text-center mb-16">
      {/* Badge tier */}
      <div className="mb-6">
        <span className={`inline-block ${tierColors[partner.tier]} px-4 py-2 rounded-full text-sm font-semibold`}>
          {tierBadges[partner.tier]}
        </span>
      </div>

      {/* Logo (se presente) */}
      {partner.logo_url && (
        <div className="mb-6 flex justify-center">
          <img
            src={partner.logo_url}
            alt={`Logo ${partner.name}`}
            className="h-20 object-contain"
          />
        </div>
      )}

      {/* Titolo */}
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
        Benvenuto ospite di<br />
        <span className="text-primary-600">{partner.name}</span>
      </h1>

      {/* Descrizione */}
      {partner.description && (
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
          {partner.description}
        </p>
      )}

      {/* Location */}
      {partner.location && (
        <p className="text-gray-500">
          📍 {partner.location}
        </p>
      )}
    </section>
  )
}