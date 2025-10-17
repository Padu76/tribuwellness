export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '393478881515'
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://tribuwellness.vercel.app'

export const WHATSAPP_MESSAGES = {
  requestSession: (partnerName: string) => 
    `Ciao! Sono ospite di ${partnerName} e vorrei informazioni sulla disponibilità per una sessione di allenamento con lo SCONTO 20% dedicato agli ospiti hotel.`,
  
  requestInfo: () => 
    `Ciao! Vorrei maggiori informazioni sui servizi Tribu Wellness e sullo sconto 20% per ospiti hotel.`,
  
  partnershipRequest: (hotelName: string, contactName: string) => 
    `Ciao! Sono ${contactName} di ${hotelName}. Vorrei informazioni sulla partnership Tribu Wellness.`,
  
  requestStudioInfo: () =>
    `Ciao! Vorrei prenotare una sessione presso Tribù Studio. Sono un turista e ho visto che c'è uno sconto del 20%.`,
}

export const getWhatsAppLink = (message: string) => {
  const encodedMessage = encodeURIComponent(message)
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`
}

export const PARTNER_TIERS = {
  FREEMIUM: 'freemium',
  PRO: 'pro',
  AMBASSADOR: 'ambassador',
} as const

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/tribustudio',
  facebook: 'https://www.facebook.com/tribustudio',
  website: 'https://www.tribustudio.it',
}

export const DISCOUNT_INFO = {
  percentage: 20,
  description: 'Sconto dedicato esclusivamente agli ospiti degli hotel partner Tribu Wellness',
  validFor: [
    'Lezioni individuali Personal Training',
    'Sessioni di coppia',
    'Prima lezione con massaggio incluso'
  ],
}