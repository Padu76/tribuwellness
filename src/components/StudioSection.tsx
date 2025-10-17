import WhatsAppCTA from '@/components/WhatsAppCTA'
import { Dumbbell, Users, Heart, Sparkles } from 'lucide-react'
import { WHATSAPP_MESSAGES } from '@/lib/constants'
import Image from 'next/image'

interface StudioSectionProps {
  partnerName?: string
  showDiscount?: boolean
}

export default function StudioSection({ partnerName, showDiscount = true }: StudioSectionProps) {
  const services = [
    {
      icon: Dumbbell,
      title: 'Personal Training',
      description: 'Allenamento personalizzato 1-1 con trainer certificato',
      image: '/images/studio/personal.jpg',
    },
    {
      icon: Users,
      title: 'Sessioni di Coppia',
      description: 'Allenati insieme al partner con programmi dedicati',
      image: '/images/studio/couple.jpg',
    },
    {
      icon: Heart,
      title: 'Pilates',
      description: 'Rinforza il core e migliora postura e flessibilità',
      image: '/images/studio/group.jpg',
    },
    {
      icon: Sparkles,
      title: 'Funzionale',
      description: 'Allenamento dinamico per forza e resistenza',
      image: '/images/studio/functional.jpg',
    },
  ]

  const message = partnerName 
    ? WHATSAPP_MESSAGES.requestSession(partnerName)
    : WHATSAPP_MESSAGES.requestInfo()

  return (
    <section className="mb-16">
      <div className="card max-w-6xl mx-auto bg-gradient-to-br from-primary-50 via-white to-accent-50 overflow-hidden">
        {/* Header con logo e badge */}
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <Image
              src="/images/logos/logo.png"
              alt="Tribù Studio Logo"
              width={200}
              height={80}
              className="h-16 w-auto"
            />
          </div>
          
          {showDiscount && (
            <div className="mb-6">
              <span className="inline-block bg-accent-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-md">
                🎁 SCONTO 20% PER OSPITI HOTEL
              </span>
            </div>
          )}

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Allenati con Tribù Studio
          </h2>
          <p className="text-lg text-gray-600">
            Personal training, Pilates e allenamento funzionale nel cuore di Verona
          </p>
        </div>

        {/* Immagine Studio */}
        <div className="mb-8 -mx-6 md:mx-0 md:rounded-xl overflow-hidden">
          <Image
            src="/images/studio/interior.jpg"
            alt="Interno Tribù Studio"
            width={1200}
            height={600}
            className="w-full h-64 md:h-80 object-cover"
          />
        </div>

        {/* Servizi Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="relative h-48 bg-gray-100">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="p-4 flex gap-4 items-start">
                  <div className="bg-primary-100 p-3 rounded-lg flex-shrink-0">
                    <Icon className="text-primary-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Vantaggi */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="font-bold text-lg mb-4 text-center">Cosa Include</h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-primary-600 font-bold">✓</span>
              <span>Consulenza gratuita</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-600 font-bold">✓</span>
              <span>Programmi personalizzati</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary-600 font-bold">✓</span>
              <span>Orari flessibili</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <WhatsAppCTA
            message={message}
            label="Richiedi Disponibilità"
          />
          <a
            href="https://www.tribustudio.it"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Scopri lo Studio
          </a>
        </div>
      </div>
    </section>
  )
}